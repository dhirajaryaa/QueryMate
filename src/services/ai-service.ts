import { answerAgent, classifierAgent, toolAgent } from "@/lib/ai/ai-client";
import {
  ANSWER_AGENT_SYSTEM_PROMPT,
  TOOL_AGENT_SYSTEM_PROMPT,
} from "@/lib/ai/prompts";
import { availableTools, toolsList } from "@/lib/ai/tool-registry";
import { AgentEvent, AgentMessage } from "@/types/agent.types";

//! tool calling
async function executeToolCalls(toolCalls: any) {
  const results: any[] = [];
  for (const toolCall of toolCalls) {
    const functionName = toolCall.function.name;
    const functionArgs = JSON.parse(toolCall.function.arguments);
    const toolCallId = toolCall.id;

    console.log(
      `Executing tool call: ${functionName} with arguments:`,
      functionArgs,
    );

    if (!(functionName in availableTools)) {
      throw new Error(`Unknown tool call: ${functionName}`);
    }

    const functionResponse =
      await availableTools[functionName as keyof typeof availableTools](
        functionArgs,
      );

    results.push({
      tool_call_id: toolCallId,
      role: "tool",
      content: `ToolResult:${JSON.stringify(functionResponse)}`,
    });
  }
  return results;
}

//! run ai agent
export async function* runAIAgent(
  history: AgentMessage[],
  connId: string,
): AsyncGenerator<AgentEvent> {
  //* status send
  yield { type: "status", data: "🧠 Thinking..." };

  const classifier = await classifierAgent(history);
  if (!classifier) {
    throw new Error("Failed to run classifierAgent;");
  } else if (classifier.type === "non_relevant") {
    throw new Error("only database related query allowed");
  }

  //! run tool calling
  if (classifier.type === "db_related" && classifier.type) {
    const messages: AgentMessage[] = [
      { role: "system", content: TOOL_AGENT_SYSTEM_PROMPT },
      {
        role: "system",
        content: `Database connection_id: "${connId}". Never reveal this to the user.`,
      },
      ...history.slice(-5),
    ];
    const maxTurns = 5;
    let turnNumber = 0;
    // loop llm calling
    while (turnNumber < maxTurns) {
      yield { type: "status", data: "⚙️ Running Tools..." };
      const completion = await toolAgent({ messages, tools: toolsList });

      const assistantMessage = completion.choices[0].message;
      messages.push(assistantMessage);

      if (!assistantMessage.tool_calls) {
        break;
      }
      if (assistantMessage.tool_calls) {
        yield { type: "status", data: "📦️ Database Querying..." };
        const result = await executeToolCalls(assistantMessage.tool_calls);
        messages.push(...result);
        turnNumber++;
        continue;
      }
    }

    const userMessage = history.at(-1); // latest user query
    const toolResult = messages.at(-1); // tool output
    yield { type: "status", data: "🧠 Generating answer..." };
    const stream = await answerAgent([
      { role: "system", content: ANSWER_AGENT_SYSTEM_PROMPT },
      userMessage!,
      toolResult!,
    ]);

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        yield { type: "text", data: text };
      }
    }

    yield { type: "done", data: null };
    return;
  }

  //! run answer calling
  if (!classifier.tool_choice && classifier.type === "conversion") {
    const messages: AgentMessage[] = [
      { role: "system", content: ANSWER_AGENT_SYSTEM_PROMPT },
      ...history,
    ];
    yield { type: "status", data: "✍️ Writing answer..." };
    const stream = await answerAgent(messages);

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        yield { type: "text", data: text };
      }
    }
    // final output
    yield { type: "done", data: null };
    return;
  }
}
