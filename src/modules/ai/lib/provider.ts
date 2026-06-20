import { createGroq } from '@ai-sdk/groq';

export const groq = createGroq({
    apiKey: process.env.LLM_API_KEY
});


export const ChatModel = groq('openai/gpt-oss-20b');

export const TitleModel = groq('llama-3.1-8b-instant');