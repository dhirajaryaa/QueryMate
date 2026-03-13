import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "groq-sdk/resources/chat/completions.mjs";

export type AgentMessage = ChatCompletionMessageParam;

export type Tool = ChatCompletionTool;

export type AgentEvent =
  | { type: "status"; data: string|null }
  | { type: "error"; data: string|null }
  | { type: "text"; data: string }
  | { type: "done"; data: null };
