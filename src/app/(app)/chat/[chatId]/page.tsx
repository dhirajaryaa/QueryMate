import MessagePage from "@/modules/message/components/message-page";
import MessageLoading from "@/modules/message/components/message-loading";
import { handlePageError } from "@/utils/handle-errors";
import { ensureAuth } from "@/modules/auth/utils/auth-utils";
import { getAllMessages } from "@/modules/message/actions/message";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  await ensureAuth();

  const res = await getAllMessages({ chatId });
  if (!res.success) {
    handlePageError(res.error);
  }
  const messages = res.data;

  if (!messages) {
    return (
      <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
        <MessageLoading />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
      <MessagePage initialMessages={messages} />
    </div>
  );
}
