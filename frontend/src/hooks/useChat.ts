"use client";

import { useState } from "react";
import type { Message } from "@/types/chat";

const INITIAL_MESSAGE: Message = {
  id: "0",
  role: "assistant",
  content:
    "Привет! Я UniPath AI — помогу разобраться с поступлением в немецкие вузы. Спроси про uni-assist, APS, визу или заблокированный счёт 🎓",
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const historyForApi = messages
      .slice(1)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: historyForApi,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Ошибка соединения с сервером. Попробуй ещё раз 🔄",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return { messages, input, setInput, loading, sendMessage };
}