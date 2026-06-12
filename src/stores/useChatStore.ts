import { ChatHistory } from "@/modules/chat/types/chat.types";
import { Message, SafeMessage } from "@/modules/message/types/message.types";
import { create } from "zustand";

type ChatStates = {
    // history 
    chatHistory: ChatHistory[];
    setChatHistory: (chats: ChatHistory[]) => void;
    appendHistory: (chat: ChatHistory) => void;
    updateHistoryTitle: (id: string, title: string) => void;
    removeHistory: (id: string) => void;
    clearHistory: () => void;

    // chat message 
    chatMessages: Record<string, SafeMessage[]>;

    pendingMessage: string | null;

    setPendingMessage: (message: string) => void;
    clearPendingMessage: () => void;

    addMessage: ({ message, chatId }: { message: SafeMessage, chatId: string }) => void;
};

export const useChatStore = create<ChatStates>((set) => ({
    chatHistory: [],
    // set chats history
    setChatHistory: (history: ChatHistory[]) => set({ chatHistory: history }),
    // add one chat 
    appendHistory: (newChat) =>
        set((state) => ({
            chatHistory: [...state.chatHistory, newChat],
        })),
    //update chat title 
    updateHistoryTitle: (id: string, title: string) =>
        set((state) => ({
            chatHistory: state.chatHistory.map((chat) =>
                chat.id === id
                    ? { ...chat, title }
                    : chat
            ),
        })),
    // remove one chat 
    removeHistory: (id) => set((state) => ({ chatHistory: state.chatHistory.filter(chat => chat.id !== id) })),

    // remove all chat 
    clearHistory: () => set({ chatHistory: [] }),

    // chatMessages
    chatMessages: {},

    // add message 
    addMessage: ({ chatId, message }) => set((state) => ({
        chatMessages: {
            ...state.chatMessages,
            [chatId]: [...(state.chatMessages[chatId] ?? []), message]
        }
    })),


    // pending message 
    pendingMessage: null,

    setPendingMessage: (message: string) => set((state) => ({ pendingMessage: message })),

    clearPendingMessage: () => set((state) => ({ pendingMessage: null })),

}));