import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { availableTools, toolsList } from "@/lib/ai/tool-registry";
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_AI_MODEL ?? "llama-3.1-8b-instant";

//? tool calling
async function executeToolCalls(toolCalls: any) {
  const results = [];
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
      content: functionResponse,
    });
  }
  return results;
}

//? llm calling
export async function* generateChatResponse(history: any[]) {
  const messages: any[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...history,
  ];

  const maxTurns = 10;
  let turnNumber = 0;
  // loop llm calling
  while (turnNumber < maxTurns) {
    // llm client call
    const stream = await groq.chat.completions.create({
      messages,
      model,
      tools: toolsList,
      stream: true,
    });

    let collectedContent = "";
    let collectedToolCalls = [];
    let finishReason = null;

    for await (const chunk of stream) {
      // check output
      if (chunk.choices[0].delta.content) {
        const text = chunk.choices[0]?.delta?.content || "";
        collectedContent += text;
        yield text; // send chunk to route
      }
      // check tool calling
      if (chunk.choices[0].delta.tool_calls) {
        collectedToolCalls.push(...chunk.choices[0].delta.tool_calls);
      }
      // check finish reason
      if (chunk.choices[0].finish_reason) {
        finishReason = chunk.choices[0].finish_reason;
      }
    }

    messages.push({
      role: "assistant",
      content: collectedContent,
      tool_calls: collectedToolCalls,
    });

    // validates
    if (collectedToolCalls.length > 0 && finishReason === "tool_calls") {
      console.log("✈️ Tool calling");
      const result = await executeToolCalls(collectedToolCalls);
      messages.push(...result);
      turnNumber++;
      continue;
    }
  }
}
