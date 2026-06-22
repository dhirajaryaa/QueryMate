"use client";

import { Streamdown } from "streamdown";
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { cn } from "@/lib/utils";
import { ComponentProps, memo, useMemo, useState } from "react";
import { ToolUIPart, UIMessage } from "ai";
import { convertMessageToTextContent } from "@/modules/message/utils/convert-message";
// @ts-ignore
import "streamdown/styles.css"; // for streamdown styling
import { Tool } from "./tool";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";


export const Message = memo(function Message({
    message,
    isLastMessage,
    isStreaming,
    regenerate }
    : {
        message: UIMessage;
        isLastMessage: boolean;
        isStreaming: boolean;
        regenerate: () => void;
    }) {

    // render user message 
    if (message.role === "user") {
        return (
            <UserMessage
                message={message}
            />
        );
    };


    return (
        <>
            <AssistantMessage
                message={message}
                isStreaming={isStreaming}
                regenerate={regenerate}
                isLastMessage={isLastMessage}
            />
        </>
    )
},
    (prev, next) => {
        return (
            prev.message === next.message &&
            prev.isStreaming === next.isStreaming
        );
    }
);

//? user message 
const UserMessage = memo(function UserMessage({
    message,
}: {
    message: UIMessage;
}) {

    const content = useMemo(
        () => convertMessageToTextContent(message),
        [message]
    );

    return (
        <div className="my-4 self-end bg-secondary px-4 py-2 rounded-lg">
            {content}
        </div>
    );
});

//? assistant message
const AssistantMessage = memo(
    function AssistantMessage({
        message,
        isStreaming,
        regenerate,
        isLastMessage
    }: {
        message: UIMessage;
        isStreaming: boolean;
        regenerate: () => void;
        isLastMessage: boolean;
    }

    ) {
        const toolParts = message.parts.filter(
            (part) =>
                part.type === "tool-dbInfo" ||
                part.type === "tool-dbSchema" ||
                part.type === "tool-runQuery"
        ) as ToolUIPart[];


        return (
            <>
                {
                    toolParts.length > 0 && (
                        <Accordion type="single" collapsible >
                            {
                                toolParts.map((part, index) => (
                                    <Tool part={part} key={part.toolCallId} />
                                ))
                            }
                        </Accordion>
                    )
                }
                {message.parts.map((part, i) => {
                    switch (part.type) {


                        case "text":
                            return (
                                <div key={`${message.id}-${i}`}>
                                    <StreamResponse
                                        isAnimating={isStreaming}
                                        animated={{ animation: "blurIn" }}
                                    >
                                        {part.text}
                                    </StreamResponse>
                                    {isStreaming && (
                                        <div className="text-sm text-muted-foreground animate-pulse">
                                            Generating...
                                        </div>
                                    )}

                                </div>
                            );


                        default:
                            return null;
                    }
                })}

                <MessageAction
                    message={message}
                    regenerate={regenerate}
                    isShow={isLastMessage}
                />
            </>
        );
    }
);



//* stream rending 
type MessageResponseProps = ComponentProps<typeof Streamdown>;
export const StreamResponse = memo(
    ({ className, ...props }: MessageResponseProps) => (
        <Streamdown
            className={cn(
                "size-full h-fit",
                className
            )}
            plugins={{ code, mermaid }}
            {...props}
        />
    ),

    (prev, next) => {
        return (
            prev.children === next.children &&
            prev.mode === next.mode &&
            prev.isAnimating === next.isAnimating
        );
    }
);

// message action 
export const MessageAction = memo(function MessageAction({ message, regenerate, isShow }: { message: UIMessage, regenerate: () => void, isShow: boolean }) {

    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyToClipboard = async () => {
        if (!message) return;

        await navigator.clipboard.writeText(convertMessageToTextContent(message));

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000)

    };


    return (
        <div className="flex items-center gap-1">
            <Button size={"icon-sm"} onClick={handleCopyToClipboard} type="button" variant={"ghost"} title="Copy Response">
                {copied ?
                    <CheckIcon /> :
                    <CopyIcon />
                }
            </Button>

            {isShow && <Button onClick={regenerate} size={"icon-sm"} type="button" variant={"ghost"} title="Regenerate Response">
                <RotateCcwIcon />
            </Button>}
        </div>
    )
})