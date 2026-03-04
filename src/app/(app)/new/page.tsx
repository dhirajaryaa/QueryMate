'use client'
import ChatInput from "@/components/chat/chat-input";

export default function AppPage() {

  const sendMessage = (message: string) => {
    console.log("Form submitted 😊 =>", message);

    return message;
  };

  return (
    <section className="w-full flex-1 overflow-hidden flex items-center justify-center  py-2 px-4">
      <div className="max-w-3xl w-full space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-muted-foreground">Chat with your Database now.</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </section>
  )
}
