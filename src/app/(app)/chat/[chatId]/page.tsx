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
      if(!data.data){
        toast.error("Chat not found!");
        router.push("/new");
      };
      const fetchedMessages = data.data;
      setMessages(fetchedMessages);

      const lastMessage = fetchedMessages.at(-1);

      if (lastMessage && lastMessage.role === "user") {
        //! call llm
        console.log("calling LLM code here");
      }

    } catch (error) {
      console.error(error);
    }
  }

  const sendMessage = (message: string, dbId: string) => {
    console.log("Form submitted 😊 =>", message, dbId);

    return message;
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
              <UserChatMessage message={message.content} key={message.id}/>
            ) : (
              <AssistantChatMessage message={message.content} key={message.id}/>
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
