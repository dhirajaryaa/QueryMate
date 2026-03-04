'use client'
import ChatInput from "@/components/chat/chat-input";

export default function AppPage() {

  const sendMessage = (message: string) => {
    console.log("Form submitted 😊 =>", message);

    return message;
  };

  return (
    <section className="w-full h-[92vh] flex items-center justify-center  py-2 px-4">
      <div className="w-3xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-muted-foreground">Chat with your Database now.</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </section>
  )
}
