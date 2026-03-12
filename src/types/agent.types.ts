import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "groq-sdk/resources/chat/completions.mjs";

export type AgentMessage = ChatCompletionMessageParam;

export type Tool = ChatCompletionTool;
