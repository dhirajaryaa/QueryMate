import { answerAgent, classificationAgent, QueryAgent } from "@/lib/ai/ai-client";
import { injectDBContext, injectDBResultContext } from "@/lib/db/context-inject";
import { runDBQuery } from "@/lib/db/query-run";
import { AgentEvent, AgentMessage } from "@/types/agent.types";

//* answerAgent stream support 
async function* streamAnswer(
  messages: AgentMessage[]
): AsyncGenerator<AgentEvent> {
  const stream = await answerAgent(messages);

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) {
      yield { type: "text", data: text };
    }
  }

  yield { type: "done", data: null };
};


//? run ai agent
export async function* runAIAgent(
  history: AgentMessage[],
  connId: string,
): AsyncGenerator<AgentEvent> {
  //* status send
  yield { type: "status", data: "🧠 Thinking..." };

  const recentHistory = history.slice(-4);

  //! classifier agent
  const classifier = await classificationAgent(history);

  //! run query agent calling
  if (classifier === "db_query") {
    // get update message
    yield { type: "status", data: "🔗 Connecting to database..." };
    const messages = await injectDBContext(recentHistory, connId);

    yield { type: "status", data: "⚙️ Running query..." };
    const completion = await QueryAgent(messages);

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    if (result?.type === "query" || result?.type === "result") {
      yield { type: "status", data: "📦 Fetching results..." };
      const dbResult = await runDBQuery({ query: result?.action, connId });
      const messages = injectDBResultContext(recentHistory, dbResult);

      // answer agent
      yield { type: "status", data: "✍️ Formatting your answer..." };
      yield* streamAnswer(messages);
      return;

    }
    else {
      yield { type: "status", data: "✍️ Writing answer..." };
      const messages = injectDBResultContext(recentHistory, result?.action);
      yield* streamAnswer(messages);
      return;

    }
  };

  //! run answer agent
  if (classifier === "conversation") {
    yield { type: "status", data: "✍️ Writing answer..." };
    yield* streamAnswer(recentHistory);
    return;
  }
}
