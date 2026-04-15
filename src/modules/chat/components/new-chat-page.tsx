"use client";

import { handleClientError } from "@/utils/handle-errors";
import { toast } from "sonner";
import ChatInputBox from "./chat-input";
import { useRouter } from "next/navigation";

function NewChatPage() {
  const router = useRouter();
  
  const sendMessage = async (message: string) => {
    // post api call for new conversion id [chat id ] create
    const dbId = localStorage.getItem("querymate_selected_db");
    if (!dbId) {
      toast.error("Please Select Database First!");
      return;
    }
    if (!prompt) return;
    try {
      //   router.push(`/chat/${res?.data?.chatId}`);
    } catch (error) {
      return handleClientError(error);
    }
  };
  return (
    <section>
      <ChatInputBox sendMessage={sendMessage} />
    </section>
  );
}

export default NewChatPage;
