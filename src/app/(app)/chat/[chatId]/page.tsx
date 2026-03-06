"use client";
import ChatInput from "@/components/chat/chat-input";
import {
  AssistantChatMessage,
  UserChatMessage,
} from "@/components/chat/chat-message";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = use(params);
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();

  async function getUserChat() {
    try {
      const res = await fetch(`/api/chat/${chatId}/message`);

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error);
        return;
      }

      //data
      const fetchedMessages = data.data;
      setMessages(fetchedMessages);

      const lastMessage = fetchedMessages.at(-1);

      if (lastMessage && lastMessage.role === "user") {
        //! call llm
        console.log("calling LLM code here");

        sendMessage(lastMessage.content);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const sendMessage = async (message: string) => {
    try {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: message },
    ]);
  

      const res = await fetch(`/api/chat/${chatId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!res.body) {
        throw new Error("no response form body");
      }
      let assistantMessage = "";
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      const tempId = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: tempId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader?.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMessage += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, content: assistantMessage } : msg,
          ),
        );
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  // call to get chats
  useEffect(() => {
    getUserChat();
  }, [chatId]);

  return (
    <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
      <section className="flex flex-1 flex-col w-full h-full overflow-y-auto">
        {/* chat list  */}
        <div className="flex flex-col gap-4 flex-1 w-full max-w-3xl mx-auto px-6 py-4">
          {messages?.map((message) =>
            message.role === "user" ? (
              <UserChatMessage message={message.content} key={message.id} />
            ) : (
              <AssistantChatMessage
                message={message.content}
                key={message.id}
              />
            ),
          )}
        </div>
      </section>
      {/* input box  */}
      <section className="w-full sticky bottom-0 bg-background z-1 max-w-3xl mx-auto px-4 pb-4">
        <ChatInput sendMessage={sendMessage} />
      </section>
    </div>
  );
}
