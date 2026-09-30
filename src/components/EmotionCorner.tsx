import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Smile, 
  Compass, 
  Sun, 
  Quote, 
  Lightbulb, 
  ArrowRight,
  Send,
  CheckCircle2
} from 'lucide-react';

export const EmotionCorner: React.FC = () => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('peaceful');
  const [plainSentence, setPlainSentence] = useState<string>('Dòng sông chảy qua cánh đồng lúa chín.');
  const [emotionSentence, setEmotionSentence] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const emotionPatterns = [
    {
      id: 'peaceful',
      title: 'Bình yên & Thư thái',
      icon: Smile,
      badge: 'Thư thái tâm hồn',
      description: 'Cảm giác tâm hồn được thanh lọc, êm đềm khi đứng trước không gian sông nước trong lành.',
      sampleStarters: [
        'Đứng trước dòng nước phẳng lặng, mọi mệt mỏi âu lo trong em dường như tan biến hết...',
        'Hít thật sâu làn gió mát rượi, lòng em bỗng thấy thanh thản và nhẹ nhõm lạ kỳ...',
        'Khung cảnh buổi chiều tà êm ả mang lại cho em cảm giác bình yên không gì sánh được...'
      ]
    },
    {
      id: 'memory',
      title: 'Gắn bó & Kỷ niệm tuổi thơ',
      icon: Heart,
      badge: 'Ấm áp hoài niệm',
      description: 'Lồng ghép hình ảnh bạn bè, người thân, những ngày chăn trâu, tắm sông, thả diều.',
      sampleStarters: [
        'Mỗi khúc sông uốn cong đều lưu giữ biết bao tiếng cười rộn rã của lũ trẻ chúng em...',
        'Ngắm nhìn con thuyền nan lướt nhẹ, em lại bồi hồi nhớ về những buổi theo ông đi câu cá chiều hè...',
        'Dòng sông như người bạn tuổi thơ chứng kiến em lớn lên từng ngày...'
      ]
    },
    {
      id: 'pride',
      title: 'Tự hào & Yêu tha thiết',
      icon: Sun,
      badge: 'Tình yêu quê hương',
      description: 'Niềm hãnh diện về vẻ đẹp trù phú, lịch sử ngàn đời và sự sống mà nguồn nước mang lại.',
      sampleStarters: [
        'Em thầm tự hào vì quê hương mình được mẹ thiên nhiên ưu ái ban tặng một dòng sông tươi đẹp dường này...',
        'Dòng sông mang nặng phù sa đỏ quạch như tấm lòng người mẹ chắt chiu nuôi sống bao thế hệ người dân quê em...',
        'Càng ngắm nhìn vẻ đẹp tráng lệ của biển cả, em càng thêm yêu tha thiết từng tấc đất, tấc biển của Tổ quốc...'
      ]
    }
  ];

  const handleTransformSentence = async () => {
    if (!plainSentence.trim()) return;
    setIsGenerating(true);
    setEmotionSentence(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              text: `Chào Hạt mầm văn chương! Em có câu văn tả thực hơi khô khan: "${plainSentence}". 
Em muốn lồng ghép cảm xúc của người viết vào câu này theo phong cách "${selectedFeeling}". 
Hạt mầm hãy gợi ý cho em:
1. Đặt 1-2 câu hỏi gợi mở để em tự cảm nhận.
2. Gợi ý 2-3 từ ngữ bộc lộ cảm xúc (xao xuyến, bồi hồi, mát rượi, thanh thản...).
3. Chỉ dẫn mẫu cách ghép cảm xúc vào câu mà không viết hộ nguyên bài nhé!`
            }
          ]
        })
      });

      const data = await res.json();
      setEmotionSentence(data.reply || 'Hạt mầm gợi ý bạn hãy thêm cảm xúc của chính mình khi đứng nhìn dòng nước trôi nhé!');
    } catch (e) {
      console.error(e);
      setEmotionSentence('Bạn hãy thử thêm từ ngữ cảm xúc: "Ngắm dòng sông... lòng em bỗng thấy bồi hồi và tha thiết yêu quê hương mình biết bao!"');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Heart className="w-3.5 h-3.5 text-pink-200" />
            Nhiệm vụ 6: Góc Bày Tỏ Cảm Xúc Của Người Viết
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Văn Có Tình - Câu Chữ Mới Chạm Tới Trái Tim
          </h2>
          <p className="mt-2 text-pink-50 text-sm sm:text-base leading-relaxed">
            Nếu chỉ tả cảnh mà không có cảm xúc, bài văn sẽ khô khan như một bản liệt kê. Điểm sáng tạo lớn nhất trong thang điểm GDPT 2018 (2 điểm) chính là: <strong>"Có những lời bày tỏ cảm xúc hoặc nhận xét của người viết xen vào lời tả một cách hợp lí"</strong>!
          </p>
        </div>
      </div>

      {/* 3 Main Emotion Themes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {emotionPatterns.map((pat) => {
          const Icon = pat.icon;
          const isSelected = selectedFeeling === pat.id;
          return (
            <div
              key={pat.id}
              onClick={() => setSelectedFeeling(pat.id)}
              className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all ${
                isSelected
                  ? 'border-pink-500 ring-2 ring-pink-400/40 shadow-md bg-pink-50/20'
                  : 'border-slate-200 hover:border-pink-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                  {pat.badge}
                </span>
              </div>

              <h3 className="font-['Quicksand'] font-bold text-slate-900 text-base mb-1">
                {pat.title}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                {pat.description}
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 block">
                  Mẫu câu gieo cảm xúc:
                </span>
                {pat.sampleStarters.map((starter, sIdx) => (
                  <div key={sIdx} className="bg-slate-50 p-2 rounded-lg text-xs text-slate-700 italic border border-slate-100">
                    "{starter}"
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Emotion Transformer */}
      <div className="bg-gradient-to-br from-pink-50/70 via-white to-amber-50/60 rounded-2xl p-6 border-2 border-pink-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-pink-100 pb-3">
          <Sparkles className="w-5 h-5 text-pink-600" />
          <h3 className="font-['Quicksand'] font-bold text-pink-950 text-lg">
            Xưởng Ươm Cảm Xúc: Thổi Hồn Vào Câu Văn Miêu Tả
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Câu văn thuần tả thực của em (chưa có cảm xúc):
            </label>
            <input
              type="text"
              value={plainSentence}
              onChange={(e) => setPlainSentence(e.target.value)}
              placeholder="Ví dụ: Nước hồ trong xanh, có vài con sóng nhỏ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-hidden bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Cảm xúc em muốn truyền tải:
            </label>
            <select
              value={selectedFeeling}
              onChange={(e) => setSelectedFeeling(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-pink-500 focus:outline-hidden bg-white"
            >
              <option value="peaceful">Bình yên, thư thái tâm hồn</option>
              <option value="memory">Gắn bó, nhớ kỷ niệm tuổi thơ</option>
              <option value="pride">Tự hào, tha thiết yêu quê hương</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleTransformSentence}
            disabled={isGenerating || !plainSentence.trim()}
            className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? <span>Hạt mầm đang cảm nhận...</span> : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Hạt mầm hướng dẫn lồng cảm xúc</span>
              </>
            )}
          </button>
        </div>

        {emotionSentence && (
          <div className="bg-white rounded-xl p-4.5 border border-pink-200 shadow-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-pink-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-pink-600" />
              <span>Gợi ý gieo cảm xúc từ Hạt Mầm:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-6">
              {emotionSentence}
            </p>
          </div>
        )}
      </div>

      {/* Secret Tips */}
      <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs space-y-3">
        <h4 className="font-['Quicksand'] font-bold text-slate-900 text-base flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Bí Quyết Xen Kẽ Cảm Xúc Hợp Lý Dành Cho Học Sinh Lớp 5
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
            <span className="font-bold text-amber-900 block">✨ Nguyên tắc "Tả một bước, cảm một bước":</span>
            <p>Sau 2 - 3 câu tả chi tiết mặt nước hay cây cối, hãy thêm một câu bộc lộ cảm nhận ("Ngắm nhìn cảnh ấy, em thấy lòng bỗng rộn rã...").</p>
          </div>
          <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1">
            <span className="font-bold text-teal-900 block">✨ Cảm xúc từ 5 giác quan:</span>
            <p>Đừng chỉ nói "em thích", hãy diễn tả cảm giác xúc giác (mát rượi), khứu giác (thoang thoảng mùi sen) để cảm xúc thêm chân thật.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
