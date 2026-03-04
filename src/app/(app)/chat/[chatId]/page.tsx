"use client";
import ChatInput from "@/components/chat/chat-input";
import { AssistantChatMessage, UserChatMessage } from "@/components/chat/chat-message";

export default function ChatPage() {
    const sendMessage = (message: string) => {
        console.log("Form submitted 😊 =>", message);

        return message;
    };
    return (
        <div className="w-full py-2 px-4 flex flex-1">
            <section className="max-w-3xl mx-auto flex flex-1 flex-col">
                {/* chat list  */}
                <div className="flex flex-col gap-4 flex-1">
                    {/* user message  */}
                    <UserChatMessage message={`who are you?`} />

                    {/* assistant  message  */}
                    <AssistantChatMessage message={"Enim veniam autem **doloribus** quae nam eos `similique` modi repudiandae fugit "} />
                   
                </div>
                {/* input box  */}
                <div className="w-full sticky bottom-0 bg-background z-1">
                    <ChatInput sendMessage={sendMessage} />
                </div>
            </section>
        </div>
    )
};