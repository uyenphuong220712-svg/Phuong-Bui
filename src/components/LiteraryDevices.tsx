import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  Send, 
  Wand2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { LITERARY_DEVICES } from '../data/mockEducationalData';
import { LiteraryDeviceItem } from '../types';

export const LiteraryDevices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'so_sanh' | 'nhan_hoa' | 'lien_tuong'>('all');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  
  // Interactive practice state
  const [practiceObject, setPracticeObject] = useState<string>('Dòng sông');
  const [studentSentence, setStudentSentence] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const filteredDevices = LITERARY_DEVICES.filter(item => {
    const matchType = activeTab === 'all' || item.type === activeTab;
    const matchTarget = selectedTarget === 'all' || item.target === selectedTarget;
    return matchType && matchTarget;
  });

  const practiceTargets = [
    { name: 'Dòng sông', prompt: 'Nếu dòng sông là một con người, dòng sông sẽ hiền từ như ai? Nhìn từ xa, dòng sông giống dải gì?' },
    { name: 'Mặt nước hồ', prompt: 'Mặt nước phẳng lặng giống chiếc gì của mây trời? Khi có nắng rọi xuống trông như được phủ thứ gì?' },
    { name: 'Con sóng biển', prompt: 'Những con sóng xô vào bờ giống như lũ trẻ con đang chơi trò gì? Hay giống đàn vật nào phi nước đại?' },
    { name: 'Hàng tre / Cây cối đôi bờ', prompt: 'Những rặng cây soi bóng xuống dòng nước trông như đang làm gì? (Chải tóc, thì thầm, nghiêng mình ngắm dung nhan...)' },
    { name: 'Ánh nắng bình minh', prompt: 'Ánh nắng xuyên qua làn nước lấp loáng như những vật phẩm lấp lánh nào? (Sợi chỉ vàng, nốt nhạc, kim cương...)' },
    { name: 'Khóm bèo tây trôi dạt', prompt: 'Khóm hoa tím dập dềnh trên sông như những con thuyền nhỏ hay những người lãng khách đi chu du?' }
  ];

  const currentPracticeTarget = practiceTargets.find(t => t.name === practiceObject) || practiceTargets[0];

  const handleEvaluateSentence = async () => {
    if (!studentSentence.trim()) return;
    setIsEvaluating(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              text: `Chào Hạt mầm văn chương! Em là học sinh lớp 5, em vừa thử viết một câu văn có sử dụng biện pháp tu từ tả "${practiceObject}": "${studentSentence}". 
Hạt mầm hãy nhận xét giúp em:
1. Khen ngợi điểm hay trong câu (từ ngữ, hình ảnh).
2. Gợi ý cách để câu văn sinh động hơn nữa (gợi ý thêm từ láy, từ gợi cảm hoặc cách nối câu).
3. Đặt một câu hỏi gợi mở cho em tự nâng cấp.
LƯU Ý: Không chấm điểm số và không viết lại cả câu hoàn chỉnh thay em nhé!`
            }
          ]
        })
      });

      const data = await res.json();
      setFeedback(data.reply || 'Hạt mầm rất thích câu văn của bạn! Bạn đã dùng hình ảnh rất giàu trí tưởng tượng.');
    } catch (err) {
      console.error(err);
      setFeedback('Hạt mầm rất vui vì bạn đã mạnh dạn sáng tạo! Câu văn của bạn đã có hình ảnh so sánh rất đẹp. Bạn hãy thử thêm một từ láy như "lăn tăn" hay "mềm mại" xem sao nhé!');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            Nhiệm vụ 3: Biện pháp nghệ thuật (So sánh, Nhân hóa & Liên tưởng)
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Thổi Hồn Cho Cảnh Vật Bằng Phép Tu Từ
          </h2>
          <p className="mt-2 text-purple-100 text-sm sm:text-base leading-relaxed">
            Nhờ có <span className="font-bold text-amber-200">So sánh</span>, dòng sông trở thành dải lụa mềm; nhờ có <span className="font-bold text-amber-200">Nhân hóa</span>, con sóng biết cười đùa, rặng tre già biết thì thầm tâm sự. Hãy biến cảnh sông hồ, biển suối thành một thế giới sinh động, có linh hồn!
          </p>
        </div>
      </div>

      {/* Interactive Practice Sandbox */}
      <div className="bg-gradient-to-br from-purple-50/80 via-white to-amber-50/50 rounded-2xl p-6 border-2 border-purple-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-purple-100 pb-3">
          <Wand2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-['Quicksand'] font-bold text-purple-950 text-lg">
            Vườn Ươm Thử Sức: Tự Tạo Câu Văn So Sánh & Nhân Hóa
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 ml-auto hidden sm:inline">
            Hạt mầm đồng hành cùng bạn
          </span>
        </div>

        {/* Step 1: Select object */}
        <div>
          <label className="block text-xs font-bold text-purple-900 mb-2">
            Bước 1: Chọn sự vật em muốn miêu tả:
          </label>
          <div className="flex flex-wrap gap-2">
            {practiceTargets.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setPracticeObject(item.name);
                  setFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  practiceObject === item.name
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                    : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Guiding question */}
        <div className="bg-white p-4 rounded-xl border border-purple-200 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-purple-900 block mb-0.5">Hạt mầm gợi ý suy nghĩ:</span>
            {currentPracticeTarget.prompt}
          </div>
        </div>

        {/* Step 3: Write your sentence */}
        <div>
          <label className="block text-xs font-bold text-purple-900 mb-1.5">
            Bước 2: Viết thử câu văn của em (có dùng "như / tựa như" hoặc từ ngữ chỉ người):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={studentSentence}
              onChange={(e) => setStudentSentence(e.target.value)}
              placeholder="Ví dụ: Dòng sông quê em hiền hòa như người mẹ ôm ấp xóm làng thân yêu..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
            />
            <button
              onClick={handleEvaluateSentence}
              disabled={isEvaluating || !studentSentence.trim()}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isEvaluating ? (
                <span>Hạt mầm đang đọc...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Hạt mầm nhận xét</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback box */}
        {feedback && (
          <div className="bg-white rounded-xl p-4 border border-emerald-300 shadow-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Lời nhận xét ôn tồn của Hạt Mầm Văn Chương:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-6">
              {feedback}
            </p>
          </div>
        )}
      </div>

      {/* Filter Tabs for Device Bank */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            Tất cả hình ảnh tu từ ({LITERARY_DEVICES.length})
          </button>
          <button
            onClick={() => setActiveTab('so_sanh')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'so_sanh'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            Phép So sánh (như, tựa như...)
          </button>
          <button
            onClick={() => setActiveTab('nhan_hoa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'nhan_hoa'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            Phép Nhân hóa (tính cách, hành động)
          </button>
          <button
            onClick={() => setActiveTab('lien_tuong')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'lien_tuong'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            Liên tưởng độc đáo
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Đối tượng:</span>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">Tất cả đối tượng</option>
            <option value="Dòng sông">Dòng sông</option>
            <option value="Mặt nước">Mặt nước</option>
            <option value="Sóng biển">Sóng biển</option>
            <option value="Con suối">Con suối</option>
            <option value="Cây cối bờ sông">Cây cối bờ sông</option>
            <option value="Ánh nắng">Ánh nắng</option>
            <option value="Thuyền bè">Thuyền bè</option>
          </select>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDevices.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
                {item.target}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                item.type === 'so_sanh'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : item.type === 'nhan_hoa'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {item.type === 'so_sanh' ? 'Phép So sánh' : item.type === 'nhan_hoa' ? 'Phép Nhân hóa' : 'Liên tưởng độc đáo'}
              </span>
            </div>

            <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-200/80">
              <p className="font-['Quicksand'] font-bold text-slate-900 text-sm leading-relaxed">
                "{item.phrase}"
              </p>
            </div>

            <p className="text-xs text-slate-600">
              <span className="font-bold text-purple-900">Giải thích cái hay:</span> {item.explanation}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50/60 p-2.5 rounded-xl">
              <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Hạt mầm mách nước bạn tự nghĩ:</span>
                {item.hintForStudent}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
