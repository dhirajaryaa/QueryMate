"use client";
import { createNewChatAction } from "@/actions/chat";
import ChatInput from "@/components/chat/chat-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function NewChat() {
  const router = useRouter();
  const sendMessage = async (message: string) => {
    // post api call for new conversion id [chat id ] create
    try {
      const dbId = localStorage.getItem("querymate_selected_db");
      if (!dbId) {
        toast.error("Please Select Database First!");
        return;
      }
      const res = await createNewChatAction({ prompt: message, dbId });

      if (!res.success) {
        toast.error(res?.error);
        return;
      }

      router.push(`/chat/${res?.data?.chatId}`);
    } catch (error: any) {
      toast.error("Network error");
    }
  };

  const examplesPrompt = [
    "Users created last 7 days",
    "Orders count by status",
    "Top 5 customers by revenue",
    "Products out of stock",
  ];
  return (
    <>
      {/* Example Prompts */}
      <section className="flex flex-wrap items-center justify-center gap-3">
        {examplesPrompt.map((q) => (
          <Button
          key={q}
            variant={"secondary"}
            onClick={() => sendMessage(q)}
            className="cursor-pointer text-sm"
          >
            {q}
          </Button>
        ))}
      </section>

      {/* Chat Input */}
      <ChatInput sendMessage={sendMessage} />
    </>
  );
}
