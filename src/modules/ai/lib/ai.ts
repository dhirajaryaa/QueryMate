import { generateText } from "ai";
import { TitleModel } from "./provider";
import { titlePrompt } from "./prompts";


export const generateChatTitle = async (message: string) => {
    const { text } = await generateText({
        model: TitleModel,
        system: titlePrompt,
        prompt: message,
    });

    return text;
};