import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Filter, 
  Eye, 
  Ear, 
  Wind, 
  Heart, 
  Sun,
  Layers
} from 'lucide-react';
import { VOCABULARY_LIST } from '../data/mockEducationalData';
import { VocabularyItem } from '../types';

export const VocabularyBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedScene, setSelectedScene] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeWordForPractice, setActiveWordForPractice] = useState<VocabularyItem | null>(VOCABULARY_LIST[0]);

  const categories = [
    { id: 'all', label: 'Tất cả chủ đề', icon: Layers },
    { id: 'water', label: 'Mặt nước & Dòng chảy', icon: Wind },
    { id: 'light', label: 'Ánh sáng & Bầu trời', icon: Sun },
    { id: 'sound', label: 'Âm thanh đắt giá', icon: Ear },
    { id: 'trees', label: 'Cây cối & Đôi bờ', icon: Sparkles },
    { id: 'scent_touch', label: 'Khứu giác & Xúc giác', icon: Eye },
    { id: 'emotion', label: 'Cảm xúc người viết', icon: Heart },
  ];

  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter(item => {
      const matchSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.exampleSentence.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchType = selectedType === 'all' || item.type === selectedType;
      const matchScene = selectedScene === 'all' || item.scenes.includes(selectedScene as any);
      return matchSearch && matchCategory && matchType && matchScene;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedScene]);

  const handleCopyWord = (item: VocabularyItem) => {
    navigator.clipboard.writeText(item.word);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <BookMarked className="w-3.5 h-3.5 text-amber-200" />
            Nhiệm vụ 2: Mở rộng vốn từ đắt giá
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Kho Từ Ngữ Miêu Tả Tinh Hoa Lớp 5
          </h2>
          <p className="mt-2 text-amber-50 text-sm sm:text-base leading-relaxed">
            Một từ ngữ đắt giá giống như một giọt sương mai lấp lánh làm bừng sáng cả câu văn! Hãy chọn những từ láy, từ ghép và tính từ gợi hình, gợi cảm để bức tranh sông hồ, biển suối của bạn trở nên sống động như thật.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm từ ngữ, ý nghĩa, câu văn mẫu..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Word Type Filter */}
          <div className="sm:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
            >
              <option value="all">Tất cả loại từ (Từ láy, ghép, tính từ)</option>
              <option value="Từ láy">Chỉ xem: Từ láy gợi tả</option>
              <option value="Từ ghép">Chỉ xem: Từ ghép sinh động</option>
              <option value="Tính từ">Chỉ xem: Tính từ chỉ màu sắc, cảm giác</option>
              <option value="Từ tượng thanh">Chỉ xem: Từ tượng thanh (âm thanh)</option>
            </select>
          </div>

          {/* Scene Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedScene}
              onChange={(e) => setSelectedScene(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
            >
              <option value="all">Tất cả cảnh nước</option>
              <option value="sông">Cảnh Dòng sông</option>
              <option value="hồ">Cảnh Hồ nước / Đầm</option>
              <option value="biển">Cảnh Bãi biển</option>
              <option value="suối">Cảnh Con suối</option>
              <option value="ao">Cảnh Ao làng</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50/70 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Word Grid + Word Practice Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Vocabulary Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>Tìm thấy {filteredWords.length} từ ngữ đắt giá</span>
            <span>Bấm vào từ để xem cách vận dụng</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredWords.map((item) => {
              const isSelected = activeWordForPractice?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveWordForPractice(item)}
                  className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer relative hover:shadow-md ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-400/40 bg-amber-50/20'
                      : 'border-slate-200/80 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Quicksand'] font-bold text-lg text-amber-950">
                          {item.word}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.type === 'Từ láy'
                            ? 'bg-purple-100 text-purple-800'
                            : item.type === 'Tính từ'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.type === 'Từ tượng thanh'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {item.meaning}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyWord(item);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors"
                      title="Chép từ này"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <p className="text-xs text-slate-700 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                      "{item.exampleSentence}"
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Áp dụng cho: {item.scenes.join(', ')}</span>
                    <span className="text-amber-700 font-semibold hover:underline">Thử đặt câu →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWords.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300 text-slate-500">
              <BookMarked className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="font-bold text-slate-700">Chưa tìm thấy từ ngữ phù hợp</p>
              <p className="text-xs mt-1">Bạn thử đổi từ khóa tìm kiếm hoặc chọn "Tất cả chủ đề" nhé!</p>
            </div>
          )}
        </div>

        {/* Right: Word Practice & Upgrading Workbench */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs sticky top-28 space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-['Quicksand'] font-bold text-slate-900 text-base">
                Góc ươm mầm câu văn hay
              </h3>
            </div>

            {activeWordForPractice ? (
              <div className="space-y-4">
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Từ đang chọn:</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold">
                      {activeWordForPractice.type}
                    </span>
                  </div>
                  <h4 className="font-['Quicksand'] font-bold text-xl text-amber-950 mt-1">
                    {activeWordForPractice.word}
                  </h4>
                  <p className="text-xs text-amber-900/80 mt-1">
                    {activeWordForPractice.meaning}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Hạt mầm gợi ý cách đặt câu cho bạn nhỏ:
                  </h5>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-emerald-800 block mb-1">Cách 1: Tả vào buổi sớm mai</span>
                      <p className="text-slate-700 italic">
                        "Khi sương sớm vừa tan, mặt nước mang vẻ đẹp <span className="font-bold text-amber-800">{activeWordForPractice.word}</span> làm lòng em xao xuyến."
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-teal-800 block mb-1">Cách 2: Kết hợp phép so sánh</span>
                      <p className="text-slate-700 italic">
                        "Dòng nước <span className="font-bold text-amber-800">{activeWordForPractice.word}</span> như một tấm lụa mềm mại vắt qua xóm làng."
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-purple-800 block mb-1">Cách 3: Lồng cảm xúc người viết</span>
                      <p className="text-slate-700 italic">
                        "Ngắm nhìn cảnh sắc <span className="font-bold text-amber-800">{activeWordForPractice.word}</span>, em càng thêm yêu quý và tự hào về quê hương mình."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900">
                  <p className="font-bold mb-1">🌿 Lời khuyên của Hạt mầm:</p>
                  <p>
                    Khi viết bài văn lớp 5, bạn đừng dùng một từ quá nhiều lần (tránh lặp từ). Hãy kết hợp đan xen từ tượng hình (lăn tăn, dập dềnh) và từ tượng thanh (rì rào, róc rách) nhé!
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">
                Chọn một từ bên cạnh để xem các gợi ý câu văn sinh động!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
