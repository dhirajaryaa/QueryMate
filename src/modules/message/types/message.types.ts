import { message } from "@/db/schema";
import { AppResponse } from "@/types/app.types";

export type Message = typeof message.$inferSelect;

export type SafeMessage = Pick<Message, "id" | "parts" | "role">;

export type PromptMessage = Pick<Message, "role" | "parts"> & {
  role: "user" | "assistant" | "system" | string;
};

export type GetAllMessages = AppResponse<Message[]>;
