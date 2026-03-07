import NewChat from "@/components/chat/new-chat";

export default function AppPage() {
  return (
    <div className="w-full flex-1 overflow-hidden flex items-center justify-center  py-2 px-4">
      {/* Heading */}
      <div className="max-w-3xl w-full flex flex-col gap-8">
        <section className="text-center space-y-2">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
            Query your database with AI
          </h1>
          <p className="text-muted-foreground text-[13px] sm:text-sm">
            Ask questions about your database in natural language
          </p>
        </section>
        {/* new chat input  */}
        <NewChat />
      </div>
    </div>
  );
}
