"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import DbSelect from "./db-select";

export default function ChatInput({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) {
  const [isPrompt, setIsPrompt] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPrompt.trim()) return;

    sendMessage(isPrompt);

    setIsPrompt("");
  };
  return (
    <div className="flex w-full flex-col gap-2">
      <DbSelect />

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-2 rounded-2xl border shadow py-1 px-1.5 w-auto">
          <Input
            value={isPrompt}
            placeholder="Ask you Query?"
            onChange={(e) => setIsPrompt(e.target.value)}
            className="border-0 outline-0 focus-visible:ring-0 bg-transparent shadow-none dark:bg-transparent font-medium sm:text-base text-sm"
          />
          <Button type="submit" size={"icon-sm"} className="rounded-xl">
            <ArrowRight className="size-5" />
            <span className="sr-only">Enter</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
