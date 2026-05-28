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

    // 1. Добавляем сообщение пользователя сразу (оптимистичный UI)
    const userMsg: Message = {
      id: Date.now().toString(), // уникальный id через timestamp
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]); // prev — предыдущий массив
    setInput("");      // очищаем инпут
    setLoading(true);  // показываем анимацию

    try {
      // 2. TODO: заменить на реальный fetch к Django
      // const res = await fetch("/api/chat/", { method: "POST", body: ... })
      // const data = await res.json()

      // Пока заглушка
      await new Promise((r) => setTimeout(r, 1000));
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Скоро здесь будет живой AI 🚀",
      };
      // 3. Добавляем ответ бота к существующим сообщениям
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      // finally выполняется всегда — даже если fetch упал с ошибкой
      setLoading(false);
    }
  };

  // Возвращаем всё что нужно компонентам — только это, ничего лишнего (KISS)
  return { messages, input, setInput, loading, sendMessage };
}