import React, { useState, useRef, useEffect } from 'react';
import { 
  Sprout, 
  Send, 
  Sparkles, 
  X, 
  Bot, 
  User, 
  Lightbulb, 
  RotateCcw,
  MessageCircleQuestion
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBuddyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBuddy: React.FC<ChatBuddyProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'model',
      text: 'Chào bạn nhỏ thân mến! Tớ là Hạt mầm văn chương đây 🌿. Bạn đang chuẩn bị viết bài văn tả cảnh ao hồ, dòng sông hay bãi biển nào thế? Bạn đang muốn tìm từ ngữ hay, lập dàn ý hay cần gợi mở điều gì, cứ chia sẻ với tớ nhé!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '🌊 Gợi ý từ ngữ tả dòng sông quê em',
    '✨ Cách so sánh mặt nước hồ như chiếc gương',
    '🏖️ Làm sao để tả tiếng sóng biển sinh động?',
    '🌾 Tìm hình ảnh nhân hóa cho rặng tre ven bờ',
    '🪶 Gợi ý mở bài gián tiếp bằng câu thơ',
    '💚 Cách viết kết bài có hành động bảo vệ môi trường'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.reply || 'Hạt mầm rất vui được cùng bạn suy nghĩ! Bạn thử đặt thêm một câu hỏi nữa nhé.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Hạt mầm đang lắng nghe bạn đây! Bạn hãy thử tưởng tượng khi đứng trước cảnh ấy, mắt bạn thấy màu sắc gì đầu tiên và tai bạn nghe thấy âm thanh nào nhé?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-['Quicksand'] font-bold text-base leading-tight">
              Hạt Mầm Văn Chương
            </h3>
            <p className="text-[11px] text-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              Bạn đồng hành viết văn tả cảnh Lớp 5
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
            title="Bắt đầu cuộc trò chuyện mới"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rules Notice */}
      <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-100 text-[11px] text-amber-900 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Hạt mầm chỉ gợi ý từ ngữ, hình ảnh và câu hỏi gợi mở, không viết hộ bài để bạn tự sáng tạo!</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((m) => {
          const isBot = m.role === 'model';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isBot
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-amber-600 text-white'
              }`}>
                {isBot ? <Sprout className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                isBot
                  ? 'bg-white text-slate-800 border border-slate-200'
                  : 'bg-emerald-600 text-white'
              }`}>
                <p className="whitespace-pre-line">{m.text}</p>
                <span className={`block text-[10px] mt-1.5 ${isBot ? 'text-slate-400' : 'text-emerald-100'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic pl-10">
            <Sprout className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>Hạt mầm đang suy nghĩ gợi ý cho bạn...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isSending}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 text-[11px] font-medium whitespace-nowrap transition-colors border border-slate-200 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-amber-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi Hạt mầm về từ ngữ, dàn ý, mở bài..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
