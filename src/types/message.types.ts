import { message } from "@/db/schema";

export type Message = typeof message.$inferSelect;

export type SafeMessage = Pick<Message, "id" | "content" | "role"> ;

export type GetAllMessages = {
  success: boolean;
  data?: SafeMessage[] | [];
  error?: string;
};
