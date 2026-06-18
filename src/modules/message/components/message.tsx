import { Streamdown } from "streamdown";
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { cn } from "@/lib/utils";
import { ComponentProps, memo, useState } from "react";
import { ChatStatus, UIMessage } from "ai";
import { convertMessageToTextContent } from "@/modules/message/utils/convert-message";
// @ts-ignore
import "streamdown/styles.css"; // for streamdown styling
import { Tool } from "./tool";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";


export const Message = memo(function Message({ message, status, isLast }: { message: UIMessage, status: ChatStatus, isLast: boolean }) {

    const isStreaming = status === "streaming" && isLast;

    {

    }

    // render user message 
    if (message.role === "user") {
        return (
            <div className={"my-4 self-end bg-secondary text-foreground px-4 py-2 rounded-lg max-w-1/2 w-fit h-fit text-sm sm:text-base"}>
                {convertMessageToTextContent(message)}
            </div>
        )
    };



    return (
        <>
            {message.parts.map((part, i) => {
                switch (part.type) {
                    case "text":
                        return (
                            <StreamResponse
                                key={`${message.id}-${i}`}
                                isAnimating={isStreaming}
                                animated={{ animation: "blurIn" }}
                                mode={isStreaming ? "streaming" : "static"}
                            >
                                {part.text}
                            </StreamResponse>
                        )

                    case 'tool-dbInfo':
                        return (
                            <Tool
                                key={part.toolCallId}
                                part={part}
                            />
                        )
                    case 'tool-dbSchema':
                        return (
                            <Tool
                                key={part.toolCallId}
                                part={part}
                            />
                        )

                    default: null
                }
            })}
            <MessageAction message={message} />
        </>
    )
});

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

const streamdownPlugins = { code, mermaid };

export const StreamResponse = memo(
    ({ className, ...props }: MessageResponseProps) => (
        <Streamdown
            className={cn(
                "size-full h-fit [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
                className
            )}
            plugins={streamdownPlugins}
            {...props}
        />
    ),
    (prevProps, nextProps) => prevProps.children === nextProps.children
);


// message action 
export const MessageAction = ({ message }: { message: UIMessage }) => {

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

            {/* // TODO: pass regenerate func and call it later  */}
            <Button size={"icon-sm"} type="button" variant={"ghost"} title="Regenerate Message">
                <RotateCcwIcon />
            </Button>
        </div>
    )
};