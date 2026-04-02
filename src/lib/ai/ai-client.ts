import { Groq } from "groq-sdk";
import { AgentMessage } from "@/types/agent.types";
import z from "zod";
import { AppError } from "../errors";
import { ANSWER_AGENT_SYSTEM_PROMPT, QUERY_AGENT_SYSTEM_PROMPT } from "./prompts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_AI_MODEL ?? "llama-3.1-8b-instant";


//! ================  Classification Agent ==================
export async function classificationAgent(
  messages: AgentMessage[],
): Promise<"conversation" | "db_query" | "error"> {
  const lastMessage = messages.at(-1);
  if (!lastMessage) return "error";

  const toolSchema = z.object({ type: z.enum(["conversation", "db_query"]) });

  const response = await groq.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Your are classifier. your task to decide user query any type of database query need or not.no extra expiation. Return valid json Like { type: 'conversation'|'db_query' }",
      },
      lastMessage,
    ],
    temperature: 0,
    response_format: { type: "json_object" },
  });

  const rawResult = JSON.parse(response.choices[0].message.content || "{}");
  const result = toolSchema.safeParse(rawResult);
  if (!result.success) {
    return "error";
  }
  return result.data.type;
}

//! ================  Query Agent ==================
export async function QueryAgent(messages: AgentMessage[]) {
  const response = await groq.chat.completions.create({
    model,
    messages: [
      { role: "system", content: QUERY_AGENT_SYSTEM_PROMPT },
      ...messages,
    ],
    max_completion_tokens: 1000,
    temperature: 0,
    response_format: { type: "json_object" },
  });

  return response;
}

//! ================ Answer Agent ==================
export async function answerAgent(messages: AgentMessage[]) {
  try {
    return groq.chat.completions.create({
      model,
      messages: [
      { role: "system", content: ANSWER_AGENT_SYSTEM_PROMPT },
      ...messages,
    ],
      stream: true,
      temperature: 0.3,
      max_completion_tokens: 1000,
      response_format: {type: 'text'}
    });
  } catch (error) {
    throw new AppError("internal:stream", "LLM streaming failed");
  }
}