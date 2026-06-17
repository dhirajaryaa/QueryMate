"use client";

import { useEffect, useRef } from "react";
import ChatInputBox from "@/modules/chat/components/chat-input";
import { useParams } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";
import { useChat } from "@ai-sdk/react";
import { Message } from "@/modules/message/types/message.types";
import { MessageList } from "./message-list";
import { handleClientError } from "@/utils/handle-errors";
import { generateAndSaveChatTitle } from "@/modules/chat/actions/chat-title";
import { genChatTitle } from "@/modules/chat/types/chat.types";

export function Conversation({ initialMessages }: { initialMessages: Message[] }) {
    const { chatId }: { chatId: string } = useParams();
    const pendingMessage = useChatStore((s) => s.pendingMessage);
    const updateHistoryTitle = useChatStore((s) => s.updateHistoryTitle);
    const bottomRef = useRef<HTMLDivElement>(null);
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
        messages: initialMessages as any,
        onFinish: () => {

        },
        onError: (err) => {
            handleClientError(err);
        }
    });


    useEffect(() => {

        if (pendingMessage && status === "ready" && !hasSent.current) {
            hasSent.current = true;
            //* title generation call */
            generateAndSaveChatTitle({
                chatId,
                message: pendingMessage,
            }).then((res: genChatTitle) => {
                if (res.success) {
                    updateHistoryTitle(chatId, res.data.title);
                };
                return;
            });

            //* chat generation call */
            sendMessage({ text: pendingMessage ?? "" });
            clearPendingMessage();
        };
    }, []);


    // auto scroll to bottom when messages or status changes
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: status === "streaming" ? "smooth" : "auto",
        });
    }, [messages, status]);


    return (
        <div className="w-full h-full relative flex flex-col">
            <section
                className="p-4 flex-1 h-full overflow-y-auto"
            >
                {/* chat list  */}
                <MessageList messages={messages} status={status} />
                <div ref={bottomRef} className="w-full h-1" />

            </section>
            <section className="w-full sticky bottom-0 bg-background z-10 inset-x-0 mask-t-from-90% p-4"
            >
                <ChatInputBox sendMessage={sendMessage} status={status} stop={stop} />
            </section>
        </div>
    )
}
