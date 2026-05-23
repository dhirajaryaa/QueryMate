"use client";

import { ArrowUp, LockIcon, MoreHorizontal, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const siteLink = `https://querymate.in`;

const chatMessages = [
  {
    type: "user",
    message: "How many users signed up this week?",
  },
  {
    type: "assistant",
    message:
      "This week 1,248 users signed up. That's an 18% increase compared to last week.",
  },
  {
    type: "user",
    message: "How much revenue was generated today?",
  },
  {
    type: "assistant",
    message:
      "Today's revenue reached $2,430 from subscriptions and one-time purchases.",
  },
];

export function PreviewWindow() {
  return (
    <div className=" aspect-video mx-auto border-2 border-muted-foreground/40 rounded-2xl duration-200 transition-all shadow-2xl shadow-foreground/30 overflow-hidden relative">
      {/* header  */}
      <div className="w-full bg-secondary relative flex items-center justify-between md:px-3 md:py-2 px-2 py-1.5">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="bg-red-500 size-3 md:size-4 rounded-full shadow-sm shadow-background/40" />
          <span className="bg-green-500 size-3 md:size-4 rounded-full shadow-sm shadow-background/40" />
          <span className="bg-yellow-500 size-3 md:size-4 rounded-full shadow-sm shadow-background/40" />
        </div>
        <div className="flex gap-1 md:gap-2 items-center bg-muted-foreground/10 border shadow w-3/5 rounded-md px-3 py-1">
          <div className="flex items-center justify-center gap-2">
            <LockIcon className="size-3 text-foreground/60" />
            <span className="text-foreground/60 text-xs md:text-sm block truncate">
              {siteLink}
            </span>
          </div>
        </div>
        <div className="p-1 rounded-full bg-muted-foreground/10">
          <MoreHorizontal size={14} />
        </div>
      </div>
      {/* body  */}
      <div className=" w-full bg-background h-full">
        <div className="flex flex-col max-w-2xl mx-auto py-8 gap-1 md:gap-3 px-4 sm:px-6">
          {chatMessages.map((chat, index) => {
            return chat.type === "user" ? (
              <UserMessage key={index} message={chat.message} />
            ) : (
              <AssistantMessage key={index} message={chat.message} />
            );
          })}
        </div>
        <div className="w-full flex items-center justify-center gap-2 max-w-2xl mx-auto absolute bottom-0 inset-x-0 px-6 bg-background pb-3 md:pb-5">
          <AnimatedInput />
          <Button size={"icon-sm"} className="rounded-full">
            <ArrowUp size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}


export function AnimatedInput() {
  const messages = [
    "What No. of users Signup This week?",
    "How much revenue generated today?",
    "Show recent active users.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl flex items-center gap-2 ">
      <Paperclip className="size-3 md:size-4 text-muted-foreground absolute left-2" />
      <Input className="rounded-xl w-full" readOnly />

      <div className="pointer-events-none absolute inset-x-0 pl-8 flex items-center  ">
        <AnimatePresence mode="wait">
          <motion.span
            key={messages[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-xs md:text-sm text-muted-foreground font-serif"
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export function UserMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <span className="w-auto max-w-xl self-end bg-secondary py-2 px-4 rounded-3xl text-xs sm:text-sm md:text-base font-serif">
      {message}
    </span>
  );
}

export function AssistantMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <span className="w-full p-2 prose dark:prose-invert max-w-none text-xs sm:text-sm md:text-base font-serif">
      {message}
    </span>
  );
}
