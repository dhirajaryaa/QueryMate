"use client";

import { Streamdown } from "streamdown";
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { cn } from "@/lib/utils";
import { ComponentProps, memo, useMemo, useState } from "react";
import { UIMessage } from "ai";
import { convertMessageToTextContent } from "@/modules/message/utils/convert-message";
// @ts-ignore
import "streamdown/styles.css"; // for streamdown styling
import { Tool } from "./tool";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";


export const Message = memo(function Message({
    message,
    isStreaming,
    regenerate }
    : {
        message: UIMessage;
        isStreaming: boolean;
        regenerate: ({ messageId }: { messageId?: string }) => void;
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
    }: {
        message: UIMessage;
        isStreaming: boolean;
        regenerate: ({ messageId }: { messageId?: string }) => void;
    }

    ) {
        return (
            <>
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

                        case "tool-dbInfo":
                        case "tool-dbSchema":
                        case "tool-runQuery":
                            return (
                                <Tool
                                    key={part.toolCallId}
                                    part={part}
                                />
                            );

                        default:
                            return null;
                    }
                })}

                <MessageAction
                    message={message}
                    regenerate={regenerate}
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
export const MessageAction = memo(function MessageAction({ message, regenerate }: { message: UIMessage, regenerate: ({ messageId }: { messageId?: string }) => void }) {

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

            {/* // TODO: edge case handle db prev save time check if regenerate then remove prev message and save new message  */}
            <Button onClick={() => regenerate({ messageId: message.id })} size={"icon-sm"} type="button" variant={"ghost"} title="Regenerate Response">
                <RotateCcwIcon />
            </Button>
        </div>
    )
})