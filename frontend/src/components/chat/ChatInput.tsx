import { Send } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled: boolean;
};

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  return (
    <div className="border-t border-slate-800 px-4 py-4">
      <div className="max-w-3xl mx-auto flex gap-3">
        <input
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500 transition-colors"
          placeholder="Спроси про uni-assist, APS, визу..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // Enter отправляет сообщение — стандартный UX паттерн
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-4 py-3 rounded-xl text-white"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}