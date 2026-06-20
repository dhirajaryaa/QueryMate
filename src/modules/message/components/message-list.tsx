"use client";
import { ChatStatus, UIMessage } from "ai";
import { memo } from "react";
import { Message } from "./message";

export const MessageList = memo(function MessagesList(
  { messages, regenerate, status }
    : { messages: UIMessage[], regenerate: ({messageId}:{ messageId?: string })=> void, status: ChatStatus }
) {

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 h-fit flex flex-col gap-2" >
      {
        messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isStreaming={
              status === "streaming" &&
              index === messages.length - 1
            }
            regenerate={regenerate}
          />
        ))
      }
      {status === "submitted" && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
          Thinking...
        </div>
      )}
    </div>
  )
})


