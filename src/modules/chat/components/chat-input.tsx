"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DbSelect from "@/modules/chat/components/db-select";
import { CornerDownLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function ChatInputBox({
  sendMessage,
  isLoading,
}: {
  isLoading?: boolean;
  sendMessage: ({text}:{text:string}) => void;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  // handle input auto resize of textarea
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const submitMessage = () => {
    const message = textareaRef.current?.value;

    if (!message || !message.trim()) return;

    const id = localStorage.getItem("querymate_selected_db");
    if (!id) {
      toast.info("select Database to start Conversation.");
      return;
    };
  
    console.log("sending message", message);

    sendMessage({text: message});

    if (textareaRef.current && !isLoading) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  //? form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  //? handle submit on ctrl + enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter (Windows/Linux) OR Cmd + Enter (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as any); // reuse same logic
    }
  };

  return (
    <section className="flex flex-col gap-2 w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-center justify-between gap-2 rounded-2xl border shadow p-2 w-auto dark:bg-secondary bg-secondary/50">
          <textarea
            onInput={handleInput}
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows={1}
            className="w-full resize-none overflow-hidden rounded-lg border-0  outline-none max-h-40 bg-transparent dark:bg-transparent p-2 overflow-y-auto scrollbar-thin text-sm sm:text-base"
          />
          <div className="w-full flex flex-1 items-center justify-between">
            <DbSelect />
            <Button size={"sm"} type="submit" className="rounded-lg items-center" disabled={isLoading} >
              {isLoading ? "Sending..." : "Send"}
              {isLoading ? <Spinner /> : <CornerDownLeft />}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ChatInputBox;
