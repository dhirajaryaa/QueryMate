import { SafeMessage } from "@/types/message.types";
import { AssistantChatMessage, UserChatMessage } from "./chat-message";

export default function ChatList({ messages }: { messages: SafeMessage[]}) {
  return (
    <>
      {messages?.map((message) =>
        message.role === "user" ? (
          <UserChatMessage message={message?.content} key={message?.id} />
        ) : (
          <AssistantChatMessage message={message?.content} key={message?.id} />
        ),
      )}
    </>
  );
}
