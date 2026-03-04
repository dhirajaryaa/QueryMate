import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";

type Props = {
    message: string;
};

export function UserChatMessage({ message }: Props) {
    if (!message.trim()) return;
    return (
        <div className="w-auto max-w-xl self-end bg-secondary py-2 px-4 rounded-3xl">
            <ReactMarkdown>
                {message}
            </ReactMarkdown>
        </div>
    )
};

export function AssistantChatMessage({ message }: Props) {
    if (!message.trim()) return;
    return (
        <div className="w-full p-2">
            <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
            >
                {message}
            </ReactMarkdown>
        </div>
    )
};
