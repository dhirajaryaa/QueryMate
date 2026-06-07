import { ChatStatus, UIMessage } from "ai";
import { memo } from "react";
import { Message } from "./message";

export const MessageList = memo(function MessagesList({ messages, status }: { messages: UIMessage[], status: ChatStatus }) {
  return (
    <div className="flex flex-col gap-6 flex-1 w-full max-w-3xl mx-auto mb-36 py-4 px-4">
      {
        messages.map((message, index) => (
          <Message key={message.id} message={message} status={status} isLast={index === messages.length - 1} />
        ))
      }
    </div>
  )
})
