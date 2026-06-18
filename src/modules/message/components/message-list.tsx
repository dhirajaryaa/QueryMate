"use client";
import { ChatStatus, UIMessage } from "ai";
import { memo } from "react";
import { Message } from "./message";

export const MessageList = memo(function MessagesList({ messages, status, regenerate }: { messages: UIMessage[], status: ChatStatus, regenerate: () => void }) {

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 h-fit flex flex-col gap-2" >
      {
        messages.map((message, index) => (
          <Message 
          key={message.id}
           message={message} 
           status={status} 
           isLast={index === messages.length - 1} 
            regenerate={regenerate}
           />
        ))
      }

      {
        status !== "ready" && (
          <div className="text-sm text- font-medium animate-pulse" >
            {status === "streaming" ? "Generating..." : "Thinking..."}
          </div>
        )
      }

    </div>
  )
})
