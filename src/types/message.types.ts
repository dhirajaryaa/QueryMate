import { message } from "@/db/schema";
import { AppResponse } from "./app.types";

export type Message = typeof message.$inferSelect;

export type SafeMessage = Pick<Message, "id" | "content" | "role">;

export type PromptMessage = Pick<Message, "role" | "content"> & {
  role: "user" | "assistant" | "system" | string;
};

export type GetAllMessages = AppResponse<SafeMessage[]>;
