"use client";

import ChatInput from "../chat/chat-input";
import { useState } from "react";
import { SafeMessage } from "@/types/message.types";
import MessageList from "./message-list";
import { toast } from "sonner";


export default function MessagePage({ initialMessages }: {initialMessages: SafeMessage[]}) {

  const [messages, setMessages] = useState<SafeMessage[]>(initialMessages);

  const sendMessage = async (message: string) => {
    toast.info(message);
    // try {
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: Date.now(), role: "user", content: message },
    //   ]);

    //   const res = await fetch(`/api/chat/${chatId}/message`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt: message }),
    //   });

    //   if (!res.body) {
    //     throw new Error("no response form body");
    //   }
    //   let assistantMessage = "";
    //   const reader = res.body?.getReader();
    //   const decoder = new TextDecoder();

    //   const tempId = Date.now();
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: tempId, role: "assistant", content: "" },
    //   ]);

    //   while (true) {
    //     const { done, value } = await reader?.read();
    //     if (done) break;
    //     const chunk = decoder.decode(value, { stream: true });
    //     assistantMessage += chunk;
    //     setMessages((prev) =>
    //       prev.map((msg) =>
    //         msg.id === tempId ? { ...msg, content: assistantMessage } : msg,
    //       ),
    //     );
    //   }
    // } catch (error) {
    //   console.error("Network error", error);
    // }
  };

  return (
    <>
      <section className="flex flex-1 flex-col w-full h-full overflow-y-auto">
        {/* chat list  */}
        <div className="flex flex-col gap-4 flex-1 w-full max-w-3xl mx-auto px-6 py-4">
          {/* message list  */}
          <MessageList messages={messages}/>
        </div>
      </section>
      {/* input box  */}
      <section className="w-full sticky bottom-0 bg-background z-1 max-w-3xl mx-auto px-4 pb-4">
        <ChatInput sendMessage={sendMessage} />
      </section>
    </>
  );
}
