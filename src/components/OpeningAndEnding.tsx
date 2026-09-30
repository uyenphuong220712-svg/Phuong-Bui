import React, { useState } from 'react';
import { 
  Sprout, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Send, 
  Heart, 
  ShieldCheck, 
  Compass,
  Music,
  Clock,
  BookOpen
} from 'lucide-react';
import { POETRY_HOOKS } from '../data/mockEducationalData';

export const OpeningAndEnding: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'opening' | 'ending'>('opening');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Practice state
  const [practiceType, setPracticeType] = useState<'open' | 'close'>('open');
  const [studentInput, setStudentInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleFeedback = async () => {
    if (!studentInput.trim()) return;
    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              text: `Chào Hạt mầm! Em là học sinh lớp 5, em vừa tập viết phần ${practiceType === 'open' ? 'Mở bài gián tiếp' : 'Kết bài mở rộng'} cho bài văn tả cảnh nước (sông/hồ/suối/biển):
"${studentInput}"

Hạt mầm hãy nhận xét giúp em:
1. Khen ngợi 1-2 điểm sáng (câu từ, cách dẫn dắt hoặc tình cảm thể hiện).
2. Nhận xét xem đã đạt chuẩn GDPT 2018 chưa (nếu là mở bài thì đã giới thiệu đủ tên cảnh/ở đâu/ấn tượng chưa; nếu kết bài thì đã đủ tình cảm + ý nghĩa + hành động bảo vệ chưa).
3. Đặt câu hỏi gợi mở để em tự hoàn thiện hơn (LƯU Ý: Không chấm điểm số và không viết hộ cả đoạn văn hoàn chỉnh).`
            }
          ]
        })
      });
      const data = await res.json();
      setFeedback(data.reply || 'Hạt mầm rất thích ý tưởng của bạn! Hãy tiếp tục phát huy nhé.');
    } catch (e) {
      console.error(e);
      setFeedback('Hạt mầm thấy bạn đã có cách dẫn dắt rất tự nhiên và tình cảm! Bạn có thể thêm một chút cảm xúc riêng của mình để đoạn văn thêm lắng đọng nhé.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Sprout className="w-3.5 h-3.5 text-amber-200" />
            Nhiệm vụ 4: Nghệ thuật Mở bài Gián tiếp & Kết bài Mở rộng
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Đầu Xuôi Đuôi Lọt - Khởi Đầu Duyên Dáng, Kết Thúc Lắng Đọng
          </h2>
          <p className="mt-2 text-teal-100 text-sm sm:text-base leading-relaxed">
            "Mở bài như tiếng chuông ngân, kết bài như dư âm đọng lại". Hãy tránh mở bài trực tiếp cộc lốc ("Hôm nay em tả...") và kết bài đơn giản ("Em rất thích..."). Hãy học những công thức mở bài gián tiếp cuốn hút và kết bài mở rộng 3 bước chuẩn GDPT 2018!
          </p>
        </div>
      </div>

      {/* Switcher */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1 rounded-2xl border border-amber-200 shadow-xs flex">
          <button
            onClick={() => setActiveSection('opening')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === 'opening'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-teal-900'
            }`}
          >
            🪶 4 Cách Mở Bài Gián Tiếp Hút Hồn
          </button>
          <button
            onClick={() => setActiveSection('ending')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === 'ending'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-teal-900'
            }`}
          >
            🌸 Công Thức Kết Bài Mở Rộng 3 Bước
          </button>
        </div>
      </div>

      {/* SECTION 1: MỞ BÀI GIÁN TIẾP */}
      {activeSection === 'opening' && (
        <div className="space-y-6">
          
          {/* 4 Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Method 1: Poetry & Songs */}
            <div className="bg-white rounded-2xl p-5 border border-teal-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-['Quicksand'] font-bold text-teal-950 text-base flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-teal-600" />
                  Dẫn dắt từ Câu Thơ, Ca Dao, Câu Hát
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mượn những vần thơ ngọt ngào hay điệu dân ca quê hương để gõ cửa trái tim người đọc, sau đó khéo léo dẫn về con sông/hồ nước định tả.
              </p>
              <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-200/80 text-xs">
                <span className="font-bold text-teal-900 block mb-1">Mẫu dẫn dắt tư duy:</span>
                <p className="text-slate-700 italic">
                  "Mỗi khi giai điệu tha thiết của câu thơ '...' vang lên, lòng em lại bồi hồi nhớ về [tên dòng sông/hồ nước] ở [địa danh]. Đó chính là nơi gắn liền với bao kỷ niệm tuổi thơ êm đềm của em."
                </p>
              </div>
            </div>

            {/* Method 2: Sound Hook */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-['Quicksand'] font-bold text-amber-950 text-base flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  Dẫn dắt từ Âm Thanh Đặc Trưng
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bắt đầu bài văn bằng một âm thanh sống động (tiếng suối róc rách, tiếng sóng vỗ ì ầm, tiếng còi tàu khua mái chèo...) để tạo ấn tượng thính giác ngay từ giây đầu tiên.
              </p>
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-xs">
                <span className="font-bold text-amber-900 block mb-1">Mẫu dẫn dắt tư duy:</span>
                <p className="text-slate-700 italic">
                  "Rì rào, rì rào! Đó là khúc hát muôn đời mà ngọn gió và những con sóng biển quê em không bao giờ ngừng cất lên. Giữa bao cảnh đẹp của quê hương, bãi biển [tên biển] lúc bình minh luôn để lại trong em ấn tượng sâu đậm nhất."
                </p>
              </div>
            </div>

            {/* Method 3: Memory */}
            <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-['Quicksand'] font-bold text-purple-950 text-base flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Dẫn dắt từ Kỷ Niệm Tuổi Thơ
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khơi gợi một kỷ niệm đẹp với ông bà, cha mẹ hoặc bè bạn (buổi tắm sông chiều hè, buổi câu cá, chuyến về quê...) để mở ra bài văn.
              </p>
              <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200/80 text-xs">
                <span className="font-bold text-purple-900 block mb-1">Mẫu dẫn dắt tư duy:</span>
                <p className="text-slate-700 italic">
                  "Tuổi thơ của mỗi người thường gắn với cánh diều chao liệng hay cây đa đầu làng. Nhưng với em, hình ảnh thân thương nhất chính là con sông [tên sông] hiền hòa, nơi đã ôm ấp biết bao tiếng cười ròn rã của lũ trẻ chúng em mỗi buổi chiều hè."
                </p>
              </div>
            </div>

            {/* Method 4: Time and Season */}
            <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="font-['Quicksand'] font-bold text-rose-950 text-base flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-600" />
                  Dẫn dắt từ Thời Điểm / Bốn Mùa Chuyển Giao
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tả sự chuyển động của đất trời (mùa thu sang, gió heo may về, một sớm mùa xuân sương mỏng...) để đưa người đọc đến cảnh nước.
              </p>
              <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200/80 text-xs">
                <span className="font-bold text-rose-900 block mb-1">Mẫu dẫn dắt tư duy:</span>
                <p className="text-slate-700 italic">
                  "Khi những làn gió thu se lạnh bắt đầu gõ cửa và cành lộc vừng trút những cánh hoa đỏ thắm, Hồ Gươm như khoác lên mình tấm áo thần tiên mơ màng. Ngắm nhìn mặt hồ lúc ấy, em ngỡ như lạc vào một bức tranh thủy mặc."
                </p>
              </div>
            </div>

          </div>

          {/* Poetry Bank for Hooking */}
          <div className="bg-white rounded-2xl p-6 border border-teal-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-teal-600" />
                <h3 className="font-['Quicksand'] font-bold text-slate-900 text-lg">
                  Kho Thơ Ca Dân Gian Đắt Giá Để Mở Bài
                </h3>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">Bấm nút để chép câu thơ vào bài làm</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {POETRY_HOOKS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-teal-50/40 border border-teal-200 relative group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-200 text-teal-900">
                        {p.scene}
                      </span>
                      {p.author && (
                        <span className="text-[11px] font-semibold text-slate-500 ml-2">
                          — {p.author}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(p.quote, p.id)}
                      className="p-1 rounded-md hover:bg-white text-slate-500 hover:text-teal-700 transition-colors"
                      title="Sao chép câu thơ"
                    >
                      {copiedId === p.id ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="font-['Playfair_Display'] italic text-teal-950 font-bold text-sm my-2.5 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-teal-500">
                    "{p.quote}"
                  </p>

                  <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                    💡 {p.guidingIntro}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: KẾT BÀI MỞ RỘNG */}
      {activeSection === 'ending' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-4">
            <h3 className="font-['Quicksand'] font-bold text-emerald-950 text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Công Thức 3 Tầng Kết Bài Mở Rộng Đạt Điểm Tối Đa Lớp 5
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Theo khung đánh giá môn Tiếng Việt Lớp 5 (GDPT 2018), một kết bài mở rộng xuất sắc cần đạt đủ 3 tầng ý nghĩa sau đây:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Step 1 */}
              <div className="bg-emerald-50/70 p-4.5 rounded-2xl border border-emerald-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  1
                </div>
                <h4 className="font-bold text-sm text-emerald-950">Tầng 1: Tình cảm sâu sắc</h4>
                <p className="text-xs text-slate-600">
                  Bày tỏ tình yêu mến, tự hào, sự gắn bó máu thịt với dòng sông, mặt hồ hay bờ biển quê hương.
                </p>
                <div className="text-[11px] text-emerald-900 bg-white p-2.5 rounded-xl border border-emerald-100 italic">
                  "Em yêu quý con sông quê em tha thiết, như yêu người mẹ hiền thứ hai của tuổi thơ..."
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-teal-50/70 p-4.5 rounded-2xl border border-teal-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  2
                </div>
                <h4 className="font-bold text-sm text-teal-950">Tầng 2: Ý nghĩa lớn lao</h4>
                <p className="text-xs text-slate-600">
                  Khẳng định vị trí của cảnh sắc đối với đời sống quê hương (nguồn sữa mẹ phù sa, lá phổi xanh, biểu tượng bình yên).
                </p>
                <div className="text-[11px] text-teal-900 bg-white p-2.5 rounded-xl border border-teal-100 italic">
                  "Dòng sông không chỉ nuôi dưỡng ruộng đồng tốt tươi mà còn là linh hồn ngàn đời của làng quê..."
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-amber-50/70 p-4.5 rounded-2xl border border-amber-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  3
                </div>
                <h4 className="font-bold text-sm text-amber-950">Tầng 3: Mong ước & Hành động</h4>
                <p className="text-xs text-slate-600">
                  Nêu suy nghĩ, ước mong và việc làm cụ thể của học sinh để bảo vệ môi trường nước trong lành.
                </p>
                <div className="text-[11px] text-amber-900 bg-white p-2.5 rounded-xl border border-amber-100 italic">
                  "Em tự nhủ sẽ luôn giữ gìn bờ sông sạch đẹp, không xả rác bừa bãi để dòng nước mãi xanh trong..."
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Interactive Try-out Sandbox */}
      <div className="bg-gradient-to-br from-amber-50/90 to-emerald-50/70 rounded-2xl p-6 border-2 border-emerald-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <h3 className="font-['Quicksand'] font-bold text-emerald-950 text-base">
              Hạt Mầm Thẩm Định: Thử Viết Mở Bài Hoặc Kết Bài
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-emerald-200 text-xs font-bold">
            <button
              onClick={() => { setPracticeType('open'); setFeedback(null); }}
              className={`px-3 py-1 rounded-md transition-all ${practiceType === 'open' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
            >
              Mở bài
            </button>
            <button
              onClick={() => { setPracticeType('close'); setFeedback(null); }}
              className={`px-3 py-1 rounded-md transition-all ${practiceType === 'close' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
            >
              Kết bài
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Nhập đoạn {practiceType === 'open' ? 'Mở bài gián tiếp' : 'Kết bài mở rộng'} bạn vừa sáng tác:
          </label>
          <textarea
            rows={3}
            value={studentInput}
            onChange={(e) => setStudentInput(e.target.value)}
            placeholder={
              practiceType === 'open'
                ? 'Ví dụ: “Quê hương tôi có con sông xanh biếc...” Mỗi khi nghe câu thơ ấy, lòng em lại nhớ về dòng sông Đáy quê mình...'
                : 'Ví dụ: Em yêu dòng sông quê em biết bao. Dòng sông như người mẹ hiền... Em tự hứa sẽ luôn cùng bạn bè giữ gìn nguồn nước...'
            }
            className="w-full p-3.5 rounded-xl border border-emerald-300 bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleFeedback}
            disabled={isLoading || !studentInput.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <span>Hạt mầm đang đọc bài...</span> : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Nhờ Hạt mầm nhận xét</span>
              </>
            )}
          </button>
        </div>

        {feedback && (
          <div className="bg-white rounded-xl p-4.5 border border-emerald-300 shadow-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Góp ý ân cần từ Hạt Mầm Văn Chương:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-6">
              {feedback}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
