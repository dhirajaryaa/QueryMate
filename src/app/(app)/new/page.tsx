"use client";
import ChatInput from "@/components/chat/chat-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AppPage() {
  const router = useRouter();
  const sendMessage = async (message: string, dbId: string) => {
    // post api call for new conversion id [chat id ] create
    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
          dbId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error);
      }
      router.push(`/chat/${data.chatId}`);
    } catch (error: any) {
      toast.error("Network error");
    }
  };

  return (
    <section className="w-full flex-1 overflow-hidden flex items-center justify-center  py-2 px-4">
      <div className="max-w-3xl w-full space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-muted-foreground">
          Chat with your Database now.
        </h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </section>
  );
}
