"use client";

import ChatInput from "../chat/chat-input";
import { useEffect, useRef, useState } from "react";
import { SafeMessage } from "@/types/message.types";
import MessageList from "./message-list";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { handleClientError } from "@/utils/handle-errors";
import { AppErrorPayload } from "@/types/app.types";

export default function MessagePage({
  initialMessages,
}: {
  initialMessages: SafeMessage[];
}) {
  const router = useRouter();
  const { chatId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [messages, setMessages] = useState<SafeMessage[]>(initialMessages);

  // last message llm call
  const lastMessage = messages.at(-1);
  const calledRef = useRef(false);
  useEffect(() => {
    if (lastMessage?.role === "user" && !calledRef.current) {
      calledRef.current = true;
      sendMessage(lastMessage.content, true);
    }
  }, []);

  // auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(message: string, isInitial = false) {
    // update state for message
    if (!isInitial) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content: message },
      ]);
    }
    try {
      const res = await fetch(`/api/chat/${chatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });
      // error mapping
      if (!res.ok) {
        const error: AppErrorPayload = await res.json();

        res.status === 429 &&
          toast.error("Too many requests. Please wait a moment.");

        switch (error.code) {
          case "unauthorized:auth":
            toast.error(error.message);
            router.push("/login");

          case "not_found:chat":
            toast.error(error.message);
            router.push("/new");

          case "rate_limit:chat":
            toast.error(error.message);
            return;

          default:
            toast.error(error.message || "Something went wrong");
            return;
        }
      }

      if (!res.body) {
        throw new Error("Stream missing from response");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = "";
      let buffer = "";

      const tempId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: tempId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader?.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");

          const type = lines[0]?.replace("event: ", "").trim();
          const rawData = lines[1]?.replace("data: ", "").trim();

          if (!type || !rawData) continue;
          const data = JSON.parse(rawData);

          if (type === "text") {
            assistantMessage += data;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempId ? { ...msg, content: assistantMessage } : msg,
              ),
            );
          }

          if (type === "status") {
            setStatus(data);
          }
          if (type === "error") {
            setStatus(null);
            toast.error(data);
          }
          if (type === "done") {
            setStatus(null);
            await reader.cancel();
            return;
          }
        }
      }
    } catch (error) {
      if (!navigator.onLine) {
        toast.error("You appear to be offline.");
        return;
      }
      setStatus(null);
      handleClientError(error);
    }
  }

  return (
    <>
      <section
        className="flex flex-1 flex-col w-full h-full overflow-y-auto"
        ref={chatContainerRef}
      >
        {/* chat list  */}
        <div className="flex flex-col gap-4 flex-1 w-full max-w-3xl mx-auto px-6 py-4">
          {/* message list  */}
          <MessageList messages={messages} status={status} />
        </div>
      </section>
      {/* input box  */}
      <section className="w-full sticky bottom-0 bg-background z-1 max-w-3xl mx-auto px-4 pb-4">
        <ChatInput sendMessage={sendMessage} />
      </section>
    </>
  );
}
