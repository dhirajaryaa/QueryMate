"use client";

import { useEffect, useRef, useState } from "react";
import ChatInputBox from "@/modules/chat/components/chat-input";
import { useParams, useRouter } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";
import { useChat } from "@ai-sdk/react";
import { SafeMessage } from "@/modules/message/types/message.types";
import { convertMessageToUIMessage } from "../utils/convert-message";
import { MessageList } from "./message-list";

export function Conversation({ initialMessages }: { initialMessages: SafeMessage[] }) {
    const router = useRouter();
    const { chatId }: { chatId: string } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const pendingMessage = useChatStore((s) => s.pendingMessage);
    const clearPendingMessage = useChatStore((s) => s.clearPendingMessage);

    const hasSent = useRef(false);

    const {
        messages,
        sendMessage,
        status,
    } = useChat({
        id: chatId,
        messages: convertMessageToUIMessage(initialMessages),
    });


    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        const needsAIResponse = lastMessage?.role === "user";

        if (needsAIResponse && status === "ready" && !hasSent.current) {
            hasSent.current = true;
            clearPendingMessage();
            sendMessage();
        }
    }, [status]);


    return (
        <div className="w-full h-full relative">
            <section
                className="flex flex-1 flex-col w-full h-full overflow-y-auto  relative p-4"
                ref={chatContainerRef}
            >
                {/* chat list  */}
                <MessageList messages={messages} status={status} />

            </section>
            <section className="w-full sticky bottom-0 bg-background z-10 inset-x-0 mask-t-from-90% p-4">
                <ChatInputBox sendMessage={sendMessage} isLoading={isLoading} />
            </section>
        </div>
    )
}
