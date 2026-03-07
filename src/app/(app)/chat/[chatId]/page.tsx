import { getAllMessagesAction } from "@/actions/message";
import MessagePage from "@/components/message/message-page";
import { redirect } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const res = await getAllMessagesAction({ chatId });

  if (!res.success) {
    redirect("/new");
  }

  const messages = res.success ? (res.data ?? []) : [];

  return (
    <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
      <MessagePage initialMessages={messages} />
    </div>
  );
}
