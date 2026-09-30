import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OutlineBuilder } from './components/OutlineBuilder';
import { VocabularyBank } from './components/VocabularyBank';
import { LiteraryDevices } from './components/LiteraryDevices';
import { OpeningAndEnding } from './components/OpeningAndEnding';
import { EssayAnalyzer } from './components/EssayAnalyzer';
import { EmotionCorner } from './components/EmotionCorner';
import { ChatBuddy } from './components/ChatBuddy';
import { Sprout, MessageCircleQuestion, Heart, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('outline');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-slate-800 font-['Nunito',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'outline' && <OutlineBuilder />}
        {activeTab === 'vocab' && <VocabularyBank />}
        {activeTab === 'devices' && <LiteraryDevices />}
        {activeTab === 'open-close' && <OpeningAndEnding />}
        {activeTab === 'review' && <EssayAnalyzer />}
        {activeTab === 'emotion' && <EmotionCorner />}
      </main>

      {/* Floating Chat Buddy Trigger */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white/60"
          title="Trò chuyện và nhờ Hạt mầm gợi ý"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline font-['Quicksand'] font-bold">Hỏi Hạt Mầm Văn Chương</span>
        </button>
      )}

      {/* Slide-over Chatbot */}
      <ChatBuddy
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Warm Educational Footer */}
      <footer className="bg-white border-t border-amber-200/80 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-['Quicksand'] font-bold text-slate-800 text-sm">
              Hạt Mầm Văn Chương
            </span>
            <span>— Đồng hành cùng học sinh Lớp 5 viết văn tả cảnh sinh động</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Chương trình Giáo dục Phổ thông 2018</span>
            <span>•</span>
            <span>Không chấm điểm số • Không viết hộ cả bài</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
