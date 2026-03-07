import { chat } from "@/db/schema";

export type Chat = typeof chat.$inferSelect;
export type NewChat = typeof chat.$inferInsert;

export type CreateChatProps = {
  prompt: string;
  dbId: string;
};

export type ChatResponse = {
  success: boolean;
  data?: { chatId: string; title: string; dbId: string };
  error?: string;
};

export type ChatHistory = Pick<Chat, "id" | "title">;

export type GetChatHistory = {
  success: boolean;
  data?: ChatHistory[];
  error?: string;
};
