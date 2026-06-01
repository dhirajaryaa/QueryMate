import { Streamdown } from "streamdown";
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { cn } from "@/lib/utils";
// @ts-ignore
import "streamdown/styles.css"; // for streamdown styling

type Props = {
    content: string;
    className?: string;
    loadingLabel?: string;
    isLoading?: boolean;
};

const markdown = `
# Hello World
Here's some code:
\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
And a diagram:
\`\`\`mermaid
graph LR
    A[Start] --> B[End]
\`\`\`
And some math: $$E = mc^2$$
  `;


export function UserMessage({ content, className }: Props) {
    return (
        <div className={cn("self-end bg-secondary text-foreground px-4 py-2 rounded-lg max-w-xs w-fit text-sm sm:text-base text-right", className)}>
            {content}
        </div>
    )
};

export function AIMessage({ content, className, isLoading, loadingLabel }: Props) {
    return (
        <div className="space-y-2">
            {isLoading && <div className="text-sm text-muted-foreground animate-pulse">{loadingLabel || "AI is typing..."}</div>}
            <Streamdown
                controls={{ code: { download: false } }}
                plugins={{
                    code: code,
                    mermaid: mermaid
                }}
                isAnimating={true}
                className={cn(
                    "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ",
                    className
                )}
            >
                {content}
            </Streamdown>
        </div>
    )
};


