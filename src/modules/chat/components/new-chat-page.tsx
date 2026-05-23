"use client";

import { toast } from "sonner";
import ChatInputBox from "./chat-input";
import { useRouter } from "next/navigation";
import { handleClientError } from "@/utils/handle-errors";
import { createNewChat } from "@/modules/chat/actions/create-chat";
import { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";

function NewChatPage() {
  const router = useRouter();
  const appendChatHistory = useChatStore((state) => state.appendHistory);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    // post api call for new conversion id [chat id ] create
    const dbId = localStorage.getItem("querymate_selected_db");
    if (!dbId) {
      toast.error("Please Select Database First!");
      return;
    }
    if (!prompt) return;
    try {
      setIsLoading(true);
      const res = await createNewChat({ prompt: message, dbId });
      if (res.success) {
        appendChatHistory({ id: res.data.chatId, title: "New Chat" }); // Append new chat to history
        router.push(`/chat/${res.data.chatId}`);
      } else {
        toast.error(res.error?.message || "Failed to create chat.");
      }
    } catch (error) {
      return handleClientError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <ChatInputBox sendMessage={sendMessage} isLoading={isLoading} />
    </section>
  );
}

export default NewChatPage;
