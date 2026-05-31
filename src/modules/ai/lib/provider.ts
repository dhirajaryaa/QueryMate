import { createGroq } from '@ai-sdk/groq';

export const groq = createGroq({
    apiKey: process.env.LLM_API_KEY
});

export const model = groq('openai/gpt-oss-20b');