"use client";

import { Bot } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatInput } from "@/components/chat/ChatInput";

export default function ChatPage() {
  // Вся логика — в хуке. Страница только берёт данные и раздаёт компонентам
  const { messages, input, setInput, loading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Bot className="w-6 h-6 text-brand-500" />
        <span className="font-semibold text-white">UniPath AI</span>
        <span className="ml-auto text-xs text-emerald-400 bg-emerald-950 px-2 py-1 rounded-full">
          Online
        </span>
      </header>

      <ChatWindow messages={messages} loading={loading} />

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        disabled={loading}
      />
    </div>
  );
}