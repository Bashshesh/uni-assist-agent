import Link from "next/link";
import { MessageCircle, FileText, CheckSquare, Zap } from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-brand-500" />,
    title: "AI-чатбот",
    desc: "Ответы на любые вопросы об uni-assist, APS, визе и дедлайнах",
  },
  {
    icon: <FileText className="w-6 h-6 text-brand-500" />,
    title: "Анализ документов",
    desc: "Загрузи мотивационное письмо — получи фидбэк от AI",
  },
  {
    icon: <CheckSquare className="w-6 h-6 text-brand-500" />,
    title: "Персональный чеклист",
    desc: "Список задач под твою страну, специальность и университет",
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-500" />,
    title: "Быстрые ответы",
    desc: "RAG по реальным FAQ университетов и гайдам поступления",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-brand-900 text-brand-100 text-sm font-medium">
          Бесплатно · Без регистрации
        </span>
        <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Поступи в немецкий вуз<br />с помощью AI
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          UniPath Germany — твой персональный AI-агент. Отвечает на вопросы,
          проверяет документы и строит чеклист поступления под тебя.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 transition-colors text-white font-semibold px-8 py-4 rounded-xl text-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Начать разговор
        </Link>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand-700 transition-colors"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold text-white text-lg mb-1">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}