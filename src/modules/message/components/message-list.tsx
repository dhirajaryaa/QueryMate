"use client";
import { ChatStatus, UIMessage } from "ai";
import { memo, useRef } from "react";
import { Message } from "./message";

export const MessageList = memo(function MessagesList({ messages, status }: { messages: UIMessage[], status: ChatStatus }) {

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="flex flex-col gap-6 flex-1 w-full max-w-3xl mx-auto mb-36 py-4 px-4" ref={chatContainerRef} onLoad={handleScrollToBottom} onTransitionEnd={handleScrollToBottom}>
      {
        messages.map((message, index) => (
          <Message key={message.id} message={message} status={status} isLast={index === messages.length - 1} />
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
