import { getAllMessagesAction } from "@/actions/message";
import MessagePage from "@/components/message/message-page";
import { handlePageError } from "@/utils/handle-errors";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  console.log("Chat Page",chatId);
  
  const res = await getAllMessagesAction({ chatId });
  if (!res.success) {
    handlePageError(res.error);
  }
  const messages = res.data;

  return (
    <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
      <MessagePage initialMessages={messages} />
    </div>
  );
}
