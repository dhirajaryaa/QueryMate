import { Streamdown } from "streamdown";
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { cn } from "@/lib/utils";
import { ComponentProps, memo } from "react";
import { ChatStatus, UIMessage } from "ai";
import { convertMessageToTextContent } from "@/modules/message/utils/convert-message";
// @ts-ignore
import "streamdown/styles.css"; // for streamdown styling


export const Message = memo(function Message({ message, status, isLast }: { message: UIMessage, status: ChatStatus, isLast: boolean }) {

    const isStreaming = status === "streaming" && isLast;

    {

    }

    // render user message 
    if (message.role === "user") {
        return (
            <div className={"self-end bg-secondary text-foreground px-4 py-2 rounded-lg max-w-1/2 w-fit h-fit text-sm sm:text-base"}>
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
                            <div key={`${message.id}-${i}`} className="w-full whitespace-break-spaces bg-yellow-700/20 text-yellow-400">
                                {JSON.stringify(part, null, 2)}
                            </div>
                        );
                }
            })}
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