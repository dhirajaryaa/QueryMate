
import { handlePageError } from "@/utils/handle-errors";
import MessageLoading from "@/modules/message/components/message-loading";
import { getAllMessages } from "@/modules/message/actions/message";
import { Conversation } from "@/modules/message/components/conversation";

export const maxDuration = 30; 

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  // await ensureAuth(); //TODO: remove add layout level

  const res = await getAllMessages({ chatId });
  if (!res.success) {
    handlePageError(res.error);
  };

  const messages = res.data;

  return (
    <div className="w-full flex flex-1 items-center overflow-hidden">
      <Conversation initialMessages={messages}/>
    </div>
  );
}
