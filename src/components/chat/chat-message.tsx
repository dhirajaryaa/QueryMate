"use client";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { ShieldAlertIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  message: string;
};

function MarkdownRenderer({ message }: Props) {
  return (
    <div className="w-full text-sm leading-relaxed wrap-break-word space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          /* HEADINGS */

          h1({ children }) {
            return (
              <h1 className="text-2xl font-semibold mt-6 mb-3 ">{children}</h1>
            );
          },

          h2({ children }) {
            return <h2 className="text-xl font-semibold mt-5 ">{children}</h2>;
          },

          h3({ children }) {
            return <h3 className="text-lg font-semibold mt-4 ">{children}</h3>;
          },

          /* PARAGRAPH */

          p({ children }) {
            return <p className=" text-foreground text-base">{children}</p>;
          },

          /* images */
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="max-w-12 w-full h-auto rounded-md"
              />
            );
          },

          /* LISTS */

          ul({ children }) {
            return <ul className="list-disc ml-6  space-y-1">{children}</ul>;
          },

          ol({ children }) {
            return <ol className="list-decimal ml-6  space-y-1">{children}</ol>;
          },

          li({ className, children }) {
            return (
              <li className={cn("ml-1 text-base list-disc", className)}>
                {children}
              </li>
            );
          },

          /* BLOCKQUOTE */

          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            );
          },

          /* LINKS */

          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-primary underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },

          /* TABLE */

          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="w-full border border-border">
                  {children}
                </table>
              </div>
            );
          },

          th({ children }) {
            return (
              <th className="border border-border bg-muted px-3 py-2 text-left">
                {children}
              </th>
            );
          },

          tr({ children }) {
            return <tr className="border border-border">{children}</tr>;
          },

          td({ children }) {
            return <td className="border border-border p-2">{children}</td>;
          },

          /* CODE BLOCK WRAPPER */

          pre({ children }) {
            return (
              <pre className="bg-muted border border-border rounded-lg p-2 overflow-x-auto my-4">
                {children}
              </pre>
            );
          },

          /* CODE */

          code({ inline, className, children, ...props }: any) {
            if (inline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              );
            }

            return (
              <code
                className={cn("bg-accent px-1 py-0.5 rounded", className)}
                {...props}
              >
                {children}
              </code>
            );
          },

          /* HR */

          hr() {
            return <hr className="my-6 border-border" />;
          },
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
}

export function UserChatMessage({ message }: Props) {
  if (!message.trim()) return;
  return (
    <div className="w-auto max-w-xl self-end bg-secondary py-2 px-4 rounded-3xl">
      <MarkdownRenderer message={message} />
    </div>
  );
}

export function AssistantChatMessage({ message }: Props) {
  if (!message.trim()) return;
  return (
    <div className="w-full p-2 prose dark:prose-invert max-w-none">
      <MarkdownRenderer message={message} />
    </div>
  );
}

export function ErrorMessage({ message }: Props) {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <Item variant="outline" className="border-destructive bg-destructive/10">
      <ItemMedia variant="icon">
        <ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{message}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline" onClick={handleRefresh}>
          Refresh
        </Button>
      </ItemActions>
    </Item>
  );
}
