import { AssistantChatMessage, UserChatMessage } from "../chat/chat-message";
import { SafeMessage } from "@/types/message.types";
import MessageLoading from "./message-loading";

export default function MessageList({ messages }: { messages: SafeMessage[] }) {
  return (
    <>
      {messages.length === 0 ? (
        <MessageLoading />
      ) : (
        messages.map((message) =>
          message.role === "user" ? (
            <UserChatMessage key={message.id} message={message.content} />
          ) : (
            <AssistantChatMessage key={message.id} message={message.content} />
          ),
        )
      )}
    </>
  );
}
