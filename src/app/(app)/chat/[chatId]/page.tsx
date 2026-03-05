"use client";
import ChatInput from "@/components/chat/chat-input";
import { AssistantChatMessage, UserChatMessage } from "@/components/chat/chat-message";

export default function ChatPage() {

    const sendMessage = (message: string) => {
        console.log("Form submitted 😊 =>", message);

        return message;
    };

const message = `
# Markdown Test

Hello **world**

Inline code: \`const x = 10\`

## JavaScript Example

\`\`\`js
function greet(name) {
  console.log("Hello " + name);
}

greet("Dhiraj")
\`\`\`

## List

- item 1
- item 2
- item 3
`;

    return (
        <div className="w-full flex flex-1 flex-col items-center overflow-hidden">
            <section className="flex flex-1 flex-col w-full h-full overflow-y-auto">
                {/* chat list  */}
                <div className="flex flex-col gap-4 flex-1 w-full max-w-3xl mx-auto px-6 py-4">
                    {/* user message  */}
                    <UserChatMessage message={`who are you?`} />

                    {/* assistant  message  */}
                    <AssistantChatMessage message={message} />

                </div>
            </section>
            {/* input box  */}
            <section className="w-full sticky bottom-0 bg-background z-1 max-w-3xl mx-auto px-4 pb-4">
                <ChatInput sendMessage={sendMessage} />
            </section>
        </div>
    )
};