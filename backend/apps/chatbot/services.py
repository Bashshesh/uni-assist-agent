from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from django.conf import settings

# Системный промпт — определяет личность агента
SYSTEM_PROMPT = """Ты — UniPath AI, экспертный помощник по поступлению в немецкие университеты.

Ты знаешь всё о:
- uni-assist: подача документов, дедлайны, требования
- APS (Academic Evaluation Centre): для студентов из Китая, Вьетнама, Монголии
- Studienkolleg: подготовительные курсы для иностранцев
- Заблокированный счёт (Sperrkonto): минимальная сумма, банки (Fintiba, Coracle, Deutsche Bank)
- Студенческая виза Германии: документы, сроки, консульства
- DAAD стипендии и другие программы финансирования
- Признание дипломов и академических степеней
- Поиск жилья (Studentenwerk, WG-Gesucht, студенческие общежития)

Отвечай конкретно и практично. Если вопрос не связан с поступлением в Германию,
вежливо перенаправь разговор к теме поступления.
Отвечай на том языке, на котором задан вопрос."""


def get_chat_response(user_message: str, history: list[dict]) -> str:
    """
    Отправляет сообщение в Gemini и возвращает ответ.
    
    history — список предыдущих сообщений в формате:
    [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
    """
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",  
        google_api_key=settings.GEMINI_API_KEY,
        temperature=0.7,
    )

    # Собираем историю сообщений для контекста
    messages = [SystemMessage(content=SYSTEM_PROMPT)]

    for msg in history[-10:]:  # берём последние 10 сообщений (экономим токены)
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        else:
            # LangChain принимает AIMessage, но для простоты используем SystemMessage с меткой
            from langchain_core.messages import AIMessage
            messages.append(AIMessage(content=msg["content"]))

    # Добавляем текущее сообщение пользователя
    messages.append(HumanMessage(content=user_message))

    # Вызов Gemini
    response = llm.invoke(messages)
    return response.content