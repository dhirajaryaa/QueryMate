import { Groq } from "groq-sdk";
import { AgentMessage, Tool } from "@/types/agent.types";
import { classifierSchema } from "@/schema/agent.schems";
import z from "zod";
import { AppError } from "../errors";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_AI_MODEL ?? "llama-3.1-8b-instant";

//? ================ Classification Agent ==================
export async function classifierAgent(messages: AgentMessage[]) {
  try {
    const lastMessage = messages.at(-1);
    if (!lastMessage) return;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `Your are classifier. your task is Decide if the user's message needs a database query. only db related query and normal conversation allowed. Response Format: valid json, no extra any expiation.
           Examples:
           what types db support -> conversation
           what user in database -> db_related
           `,
        },
        lastMessage, //user message last pushed from messages array
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "tool_use_classifier",
          schema: z.toJSONSchema(classifierSchema),
        },
      },
    });

    const rawResult = JSON.parse(response.choices[0].message.content || "{}");
    const result = classifierSchema.safeParse(rawResult);
    return result.data;
  } catch (error) {
    throw new AppError("internal:api", "classifier agent failed");
  }
}

//? ================ Tool Agent ==================
export async function toolAgent({
  messages,
  tools,
}: {
  messages: AgentMessage[];
  tools: Tool[];
}) {
  try {
    return groq.chat.completions.create({
      model,
      messages,
      tools,
      tool_choice: "auto",
    });
  } catch (error) {
    throw new AppError("internal:api", "Tool agent execution failed");
  }
}

//? ================ Answer Agent ==================
export async function answerAgent(messages: AgentMessage[]) {
  try {
    return groq.chat.completions.create({
      model,
      messages,
      tool_choice: "none",
      stream: true,
    });
  } catch (error) {
    throw new AppError("internal:stream", "LLM streaming failed");
  }
}
