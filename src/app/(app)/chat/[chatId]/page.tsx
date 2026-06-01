
import { handlePageError } from "@/utils/handle-errors";
import { ensureAuth } from "@/modules/auth/utils/auth-utils";
import MessageLoading from "@/modules/message/components/message-loading";
import { getAllMessages } from "@/modules/message/actions/message";
import { Conversation } from "@/modules/message/components/conversation";

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
  };

  console.log("messages", res.data);
  const messages = res.data;

  // if (!messages) {
  //   return (
  //     <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
  //       <MessageLoading />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full flex flex-1 items-center overflow-hidden">
      {/* <MessagePage initialMessages={messages} /> */}
      <Conversation />
    </div>
  );
}
