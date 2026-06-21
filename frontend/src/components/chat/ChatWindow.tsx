import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

type Props = {
  messages: Message[];
  loading: boolean;
};

export function ChatWindow({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect — выполняется после каждого рендера когда messages меняется
  // Автоскролл вниз при новом сообщении
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
      {/* .map() — проходит по массиву и рендерит компонент для каждого элемента */}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Показываем анимацию только когда loading=true */}
      {loading && <TypingIndicator />}

      {/* Невидимый div в конце — к нему скроллим */}
      <div ref={bottomRef} />
    </div>
  );
}