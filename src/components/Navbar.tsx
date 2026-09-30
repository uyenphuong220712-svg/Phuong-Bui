import React from 'react';
import { 
  Sprout, 
  FileText, 
  Sparkles, 
  BookMarked, 
  Camera, 
  Heart, 
  MessageCircleQuestion
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenChat }) => {
  const tabs = [
    { id: 'outline', label: '1. Dàn ý 5 Giác quan', icon: FileText, color: 'text-emerald-700 bg-emerald-50' },
    { id: 'vocab', label: '2. Kho Từ Đắt Giá', icon: BookMarked, color: 'text-amber-700 bg-amber-50' },
    { id: 'devices', label: '3. So Sánh - Nhân Hóa', icon: Sparkles, color: 'text-purple-700 bg-purple-50' },
    { id: 'open-close', label: '4. Mở & Kết Bài', icon: Sprout, color: 'text-teal-700 bg-teal-50' },
    { id: 'review', label: '5. Phân Tích Bài (Ảnh/Chữ)', icon: Camera, color: 'text-rose-700 bg-rose-50' },
    { id: 'emotion', label: '6. Góc Cảm Xúc', icon: Heart, color: 'text-pink-700 bg-pink-50' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & Mascot */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('outline')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 flex items-center justify-center shadow-md shadow-emerald-500/20 ring-2 ring-emerald-200">
              <Sprout className="w-7 h-7 text-white stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Quicksand'] font-bold text-xl sm:text-2xl text-emerald-950 tracking-tight">
                  Hạt Mầm Văn Chương
                </span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Lớp 5 • GDPT 2018
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Người bạn đồng hành viết văn tả cảnh sinh động • Khơi gợi cảm xúc và câu chữ
              </p>
            </div>
          </div>

          {/* Quick Help & Chat with Mascot */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircleQuestion className="w-4 h-4" />
              <span className="hidden md:inline">Trò chuyện cùng Hạt Mầm</span>
              <span className="md:hidden">Hỏi Hạt Mầm</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2.5 border-t border-amber-100/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600'
                    : 'text-slate-700 hover:bg-amber-100/60 hover:text-emerald-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
