import type { UIMessage, UIMessagePart } from "ai";
import { SafeMessage } from "@/modules/message/types/message.types";

export function convertMessageToUIMessage(messages: SafeMessage[]): UIMessage[] {

    return messages.map((message: SafeMessage): UIMessage => ({
        id: message.id,
        role: message.role as
            | "user"
            | "assistant"
            | "system",
        parts: [
            {
                type: "text",
                text: message.content,
            },
        ],
    }))
}


export function convertMessageToTextContent(message: UIMessage): string {
    const content = message.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("");

    return content;
}