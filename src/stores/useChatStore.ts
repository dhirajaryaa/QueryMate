import { ChatHistory } from "@/modules/chat/types/chat.types";
import { Message, SafeMessage } from "@/modules/message/types/message.types";
import { create } from "zustand";

type ChatStates = {
    chatHistory: ChatHistory[];
    setChatHistory: (chats: ChatHistory[]) => void;
    appendHistory: (chat: ChatHistory) => void;
    removeHistory: (id: string) => void;
    clearHistory: () => void;

    messages: SafeMessage[];

    addMessage: (message: SafeMessage) => void;

    updateAssistantMessage: (
        id: string,
        content: string
    ) => void;

    clearMessages: () => void;
};

export const useChatStore = create<ChatStates>((set) => ({
    chatHistory: [],
    // set chats 
    setChatHistory: (chats: ChatHistory[]) => set((state) => ({ chatHistory: chats })),
    // add one chat 
    appendHistory: (newChat) =>
        set((state) => ({
            chatHistory: [...state.chatHistory, newChat],
        })),
    // remove one chat 
    removeHistory: (id) => set((state) => ({ chatHistory: state.chatHistory.filter(chat => chat.id !== id) })),
    // remove all chat 
    clearHistory: () => set({ chatHistory: [] }),

    messages: [],

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    updateAssistantMessage: (id, content) =>
        set((state) => ({
            messages: state.messages.map((m) =>
                m.id === id ? { ...m, content } : m
            ),
        })),

    clearMessages: () => set({ messages: [] }),
}));