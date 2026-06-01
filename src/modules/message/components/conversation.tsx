"use client";

import { useRef, useState } from "react";
import ChatInputBox from "@/modules/chat/components/chat-input";
import { useParams, useRouter } from "next/navigation";
import { AIMessage, UserMessage } from "@/modules/message/components/message";
import { useChatStore } from "@/stores/useChatStore";

export function Conversation() {
    const router = useRouter();
    const { chatId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);



    function sendMessage(message: string) { }


    const messages = useChatStore(state => state.messages);
    // console.log(messages);



    return (
        <div className="w-full h-full relative">
            <section
                className="flex flex-1 flex-col w-full h-full overflow-y-auto  relative p-4"
                ref={chatContainerRef}
            >
                {/* chat list  */}
                <div className="flex flex-col gap-6 flex-1 w-full max-w-3xl mx-auto mb-36 py-4 px-4">
                    {
                        messages?.map((message) => {
                            return (
                                message.role === "user" ?
                                    <UserMessage key={message.id} content={message.content} />
                                    : <AIMessage key={message.id} content={message.content} isLoading={true} />
                            )
                        })
                    }
                </div>
            </section>
            <section className="w-full sticky bottom-0 bg-background z-10 inset-x-0 mask-t-from-90% p-4">
                <ChatInputBox sendMessage={sendMessage} isLoading={isLoading} />
            </section>
        </div>
    )
}
