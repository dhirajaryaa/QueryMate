"use client";

import { useEffect, useRef, useState } from "react";
import ChatInputBox from "@/modules/chat/components/chat-input";
import { useParams } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";
import { useChat } from "@ai-sdk/react";
import { SafeMessage } from "@/modules/message/types/message.types";
import { convertMessageToUIMessage } from "../utils/convert-message";
import { MessageList } from "./message-list";
import { handleClientError } from "@/utils/handle-errors";

export function Conversation({ initialMessages }: { initialMessages: SafeMessage[] }) {
    const { chatId }: { chatId: string } = useParams();
    const pendingMessage = useChatStore((s) => s.pendingMessage);
    const clearPendingMessage = useChatStore((s) => s.clearPendingMessage);

    const hasSent = useRef(false);

    const {
        messages,
        sendMessage,
        status,
        stop,
        error,
        regenerate
    } = useChat({
        id: chatId,
        messages: convertMessageToUIMessage(initialMessages),
        onError: (err) => {
            handleClientError(err);
        }
    });


    useEffect(() => {
        console.info(pendingMessage, status, hasSent.current);

        if (pendingMessage && status === "ready" && !hasSent.current) {
            hasSent.current = true;
            sendMessage({ text: pendingMessage ?? "" });
            clearPendingMessage();
        };
    }, []);


    return (
        <div className="w-full h-full relative">
            <section
                className="flex flex-1 flex-col w-full h-full overflow-y-auto  relative p-4"
            >
                {/* chat list  */}
                <MessageList messages={messages} status={status} />

            </section>
            <section className="w-full sticky bottom-0 bg-background z-10 inset-x-0 mask-t-from-90% p-4">
                <ChatInputBox sendMessage={sendMessage} status={status} stop={stop} />
            </section>
        </div>
    )
}
