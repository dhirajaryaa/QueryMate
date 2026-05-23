import { SafeMessage } from "@/modules/message/types/message.types";
import MessageLoading from "./message-loading";
import { Badge } from "@/components/ui/badge";
import { AssistantChatMessage, UserChatMessage } from "./message-ui";

export default function MessageList({
  messages,
  status,
}: {
  messages: SafeMessage[];
  status: string | null;
}) {
  return (
    <>
      {messages.length === 0 ? (
        <MessageLoading />
      ) : (
        messages.map((message) =>
          message.role === "user" ? (
            <UserChatMessage key={message.id} message={message.content} />
          ) : (
            <AssistantChatMessage key={message.id} message={message.content} />
          ),
        )
      )}
      {status && (
        <Badge className="text-sm mb-3 px-4 py-1.5" variant={"secondary"}>
          {status}
        </Badge>
      )}
    </>
  );
}
