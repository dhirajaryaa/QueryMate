import { SYSTEM_PROMPT } from "@/prompt/system-prompt";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_AI_MODEL || "llama-3.1-8b-instant";

export async function generateChatResponse(history: any[]) {
  // const chat = await getChatCompletions(message);
  const messages: any[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...history,
  ];
  return await groq.chat.completions.create({
    messages,
    model,
    stream: true,
  });
}
