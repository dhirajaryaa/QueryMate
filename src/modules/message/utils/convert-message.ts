import type { UIMessage } from "ai";


export function convertMessageToTextContent(message: UIMessage): string {
    const content = message.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("");

    return content;
};