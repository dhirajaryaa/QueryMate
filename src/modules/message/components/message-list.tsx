"use client";

import { ChatStatus, UIMessage } from "ai";
import { memo, useMemo } from "react";
import { Message } from "./message";

export const MessageList = memo(function MessagesList(
  { messages, regenerate, status }
    : { messages: UIMessage[], regenerate: ()=> void, status: ChatStatus }
) {

  const lastAssistantIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  }, [messages]);

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 h-fit flex flex-col gap-1" >

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
            isLastMessage={index === lastAssistantIndex}  
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


