import { ChatHistory } from "@/modules/chat/types/chat.types";
import { create } from "zustand";

type ChatStates = {
    chatHistory: ChatHistory[];
    setChatHistory: (chats: ChatHistory[]) => void;
    addHistory: (chat: ChatHistory) => void;
    removeHistory: (id: string) => void;
    clearHistory: () => void;
};

export const useChatStore = create<ChatStates>((set) => ({
    chatHistory: [],
    // set chats 
    setChatHistory: (chats: ChatHistory[]) => set((state) => ({ chatHistory: chats })),
    // add one chat 
    addHistory: (newChat) =>
        set((state) => ({
            chatHistory: [...state.chatHistory, newChat],
        })),
    // remove one chat 
    removeHistory: (id) => set((state) => ({ chatHistory: state.chatHistory.filter(chat => chat.id !== id) })),
    // remove all chat 
    clearHistory: () => set({ chatHistory: [] }),
}));