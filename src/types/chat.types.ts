import { chat } from "@/db/schema";
import { AppErrorPayload, AppResponse } from "./app.types";

export type Chat = typeof chat.$inferSelect;
export type NewChat = typeof chat.$inferInsert;

export type CreateChatProps = {
  prompt: string;
  dbId: string;
};



export type ChatResponse = AppResponse<{chatId: Chat["id"],dbId: Chat["connectionId"]}>;

export type ChatHistory = Pick<Chat, "id" | "title">;

export type GetChatHistory = AppResponse<ChatHistory[]>;
