import { Bot, User } from "lucide-react";
import type { Message } from "@/types/chat";

type Props = {
  message: Message;
};

const styles = {
  user: {
    wrapper: "flex-row-reverse",
    bubble: "bg-brand-600 text-white border border-slate-800",
    avatar: "bg-slate-700",
  },
  assistant: {
    wrapper: "",
    bubble: "bg-slate-800 text-slate-100",
    avatar: "bg-brand-700",
  },
};

export function MessageBubble({ message }: Props) {
  const s = styles[message.role]; // выбираем нужный стиль по роли

  return (
    <div className={`flex gap-3 ${s.wrapper}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.avatar}`}>
        {message.role === "assistant"
          ? <Bot className="w-4 h-4 text-white" />
          : <User className="w-4 h-4 text-white" />}
      </div>

      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${s.bubble}`}>
        {message.content}
      </div>
    </div>
  );
}