import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Heart, 
  Award, 
  RefreshCw, 
  Image as ImageIcon,
  Edit3,
  BookOpen
} from 'lucide-react';
import { EssayAnalysisResult } from '../types';
import { SAMPLE_ESSAY_PROMPTS } from '../data/mockEducationalData';

export const EssayAnalyzer: React.FC = () => {
  const [inputMode, setInputMode] = useState<'text' | 'image'>('image');
  const [essayContent, setEssayContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sceneType, setSceneType] = useState<string>('Dòng sông quê em');
  const [focusArea, setFocusArea] = useState<string>('Toàn bài');
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<EssayAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn một tệp hình ảnh (jpg, png, webp...)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApplySample = (index: number) => {
    const sample = SAMPLE_ESSAY_PROMPTS[index];
    setEssayContent(sample.text);
    setSceneType(sample.sceneType);
    setInputMode('text');
  };

  const handleAnalyze = async () => {
    if (!essayContent.trim() && !selectedImage) {
      alert('Bạn ơi, hãy nhập bài làm hoặc tải ảnh chụp bài viết tay lên nhé!');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/analyze-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: essayContent,
          image: selectedImage,
          mimeType: 'image/jpeg',
          sceneType,
          focus: focusArea
        })
      });

      if (!res.ok) {
        throw new Error('Lỗi máy chủ khi đọc bài làm');
      }

      const data: EssayAnalysisResult = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Hạt mầm gặp chút trục trặc khi đọc bài làm. Bạn vui lòng kiểm tra lại ảnh chụp hoặc thử lại sau nhé!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Camera className="w-3.5 h-3.5 text-amber-200" />
            Nhiệm vụ 5: Phòng Phân Tích Bài Làm (Ảnh chụp & Văn bản)
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Soi Sáng Bài Làm - Khích Lệ & Nâng Tầm Câu Chữ
          </h2>
          <p className="mt-2 text-rose-50 text-sm sm:text-base leading-relaxed">
            Bạn có thể chụp ảnh trang vở viết tay hoặc gõ bài làm vào đây. Hạt mầm sẽ cùng bạn tìm ra những viên ngọc sáng trong bài, chỉ ra lỗi diễn đạt và mách bạn cách sửa câu văn hay hơn mà <strong>không chấm điểm số</strong> hay <strong>viết hộ cả bài</strong>!
          </p>
        </div>
      </div>

      {/* Input Options Card */}
      <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs space-y-5">
        
        {/* Toggle Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setInputMode('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                inputMode === 'image'
                  ? 'bg-white text-rose-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-rose-600" />
              <span>Chụp ảnh / Tải ảnh bài viết tay</span>
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                inputMode === 'text'
                  ? 'bg-white text-rose-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span>Nhập văn bản / Dán bài viết</span>
            </button>
          </div>

          {/* Preset Sample Essay */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Chưa có bài sẵn?</span>
            <button
              onClick={() => handleApplySample(0)}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
            >
              Dùng bài mẫu 1
            </button>
            <button
              onClick={() => handleApplySample(1)}
              className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition-all"
            >
              Dùng bài mẫu 2
            </button>
          </div>
        </div>

        {/* Configurations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cảnh nước định tả:</label>
            <input
              type="text"
              value={sceneType}
              onChange={(e) => setSceneType(e.target.value)}
              placeholder="Ví dụ: Dòng sông Đáy quê em, Hồ Gươm, Biển Mỹ Khê..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phần em muốn Hạt mầm tập trung nhận xét:</label>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden bg-white"
            >
              <option value="Toàn bài">Toàn bài (Mở bài, Thân bài, Kết bài)</option>
              <option value="Mở bài">Chỉ nhận xét Mở bài</option>
              <option value="Thân bài - Tả chi tiết">Thân bài: Tả chi tiết 5 giác quan & Tu từ</option>
              <option value="Kết bài">Chỉ nhận xét Kết bài mở rộng</option>
            </select>
          </div>
        </div>

        {/* Input Area based on Mode */}
        {inputMode === 'image' ? (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative rounded-2xl border-2 border-emerald-300 p-3 bg-emerald-50/30 flex flex-col items-center">
                <img
                  src={selectedImage}
                  alt="Ảnh bài làm học sinh"
                  className="max-h-80 w-auto rounded-xl object-contain shadow-xs"
                />
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Chọn ảnh khác
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100"
                  >
                    Xóa ảnh
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/30 hover:bg-rose-50/60 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm text-slate-800">
                  Bấm để tải lên ảnh chụp bài viết tay hoặc trang vở ô ly
                </p>
                <p className="text-xs text-slate-500">
                  Hỗ trợ định dạng JPG, PNG, WEBP. Ảnh rõ chữ sẽ giúp Hạt mầm đọc chính xác nhất!
                </p>
              </div>
            )}

            {/* Optional text notes alongside image */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ghi chú thêm cho Hạt mầm (nếu có đoạn chữ mờ hoặc lưu ý riêng):
              </label>
              <input
                type="text"
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                placeholder="Ví dụ: Đoạn cuối em viết vội, nhờ Hạt mầm đọc kỹ giúp em nhé..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nội dung bài làm của em (khoảng 200 - 250 chữ theo chuẩn lớp 5):
            </label>
            <textarea
              rows={8}
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              placeholder="Dán hoặc gõ bài văn tả cảnh của bạn vào đây..."
              className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden leading-relaxed"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>Độ dài hiện tại: khoảng {essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0} từ</span>
              <span>Chuẩn lớp 5: 200 – 250 từ</span>
            </div>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!essayContent.trim() && !selectedImage)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white font-bold text-sm shadow-md hover:from-rose-700 hover:to-amber-700 transition-all flex items-center gap-2 disabled:opacity-50 hover:scale-[1.01]"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Hạt mầm đang đọc từng dòng bài làm...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Nhờ Hạt mầm soi sáng & nhận xét bài làm</span>
              </>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* ANALYSIS RESULT SECTION */}
      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Friendly encouragement banner */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-6 text-white shadow-md relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-['Quicksand'] font-bold text-lg text-white">
                  Lời Nhắn Gửi Thân Thương Của Hạt Mầm Văn Chương
                </h3>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  "{analysisResult.encouragementMessage}"
                </p>
              </div>
            </div>
          </div>

          {/* Transcribed Text (if OCR from image) */}
          {analysisResult.transcribedText && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Bản số hóa chữ viết tay của bạn:</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-slate-800 text-xs sm:text-sm leading-relaxed border border-slate-200 italic whitespace-pre-line">
                "{analysisResult.transcribedText}"
              </div>
            </div>
          )}

          {/* Praise Points (1-2 Điểm Sáng) */}
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>1. Điểm Sáng Đáng Khen Ngợi Trong Bài Làm</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysisResult.praisePoints?.map((praise, idx) => (
                <div key={idx} className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {praise}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Corrections & Feedback (Lỗi chính tả, dùng từ, câu văn) */}
          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>2. Nhận Xét & Góp Ý Chân Tình (Chính tả, Từ ngữ & Diễn đạt)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Spelling */}
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                  Chính tả & Dấu thanh
                </h4>
                {analysisResult.correctionFeedback?.spelling && analysisResult.correctionFeedback.spelling.length > 0 ? (
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
                    {analysisResult.correctionFeedback.spelling.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-700 italic">Rất tốt! Bài viết gần như không mắc lỗi chính tả.</p>
                )}
              </div>

              {/* Word Choice */}
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                  Dùng từ & Lặp từ
                </h4>
                {analysisResult.correctionFeedback?.wordChoice && analysisResult.correctionFeedback.wordChoice.length > 0 ? (
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
                    {analysisResult.correctionFeedback.wordChoice.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-700 italic">Bạn dùng từ khá chính xác và phù hợp.</p>
                )}
              </div>

              {/* Sentence Structure */}
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide">
                  Cấu trúc câu & Dấu phẩy
                </h4>
                {analysisResult.correctionFeedback?.sentenceStructure && analysisResult.correctionFeedback.sentenceStructure.length > 0 ? (
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
                    {analysisResult.correctionFeedback.sentenceStructure.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-700 italic">Câu văn gãy gọn, đủ các thành phần.</p>
                )}
              </div>
            </div>
          </div>

          {/* Upgrade Suggestions (Gợi ý cách sửa hoặc nâng cấp câu văn - KHÔNG VIẾT HỘ) */}
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2 text-purple-950 font-bold text-base">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <span>3. Gợi Ý Nâng Cấp Câu Văn Hay Hơn (Em tự thử sức nhé!)</span>
              </div>
              <span className="text-[11px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Hạt mầm chỉ gợi ý, không viết hộ cả bài
              </span>
            </div>

            <div className="space-y-4">
              {analysisResult.upgradeSuggestions?.map((item, idx) => (
                <div key={idx} className="bg-purple-50/40 rounded-xl p-4 border border-purple-200 space-y-2.5">
                  <div className="text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Câu văn gốc trong bài:
                    </span>
                    <p className="text-slate-800 font-semibold italic bg-white p-2.5 rounded-lg border border-slate-200">
                      "{item.originalSentence}"
                    </p>
                  </div>

                  <div className="text-xs text-purple-900 space-y-1">
                    <span className="font-bold block">💡 Lời mách nước của Hạt mầm:</span>
                    <p className="leading-relaxed">{item.hint}</p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-purple-100 text-xs">
                    <span className="font-bold text-emerald-800 block mb-0.5">❓ Câu hỏi gợi mở cho bạn tự nghĩ:</span>
                    <p className="text-slate-700">{item.guidingQuestions}</p>
                  </div>

                  {item.recommendedWords && item.recommendedWords.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                      <span className="font-semibold text-slate-600">Từ gợi ý thay thế:</span>
                      {item.recommendedWords.map((word, wIdx) => (
                        <span key={wIdx} className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold">
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emotion Tips (Gợi ý bày tỏ cảm xúc) */}
          {analysisResult.emotionTips && (
            <div className="bg-pink-50/70 rounded-2xl p-5 border border-pink-200 space-y-2">
              <div className="flex items-center gap-2 text-pink-900 font-bold text-sm">
                <Heart className="w-4 h-4 text-pink-600" />
                <span>4. Gợi Ý Bày Tỏ Thêm Cảm Xúc Của Người Viết</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-6">
                {analysisResult.emotionTips}
              </p>
            </div>
          )}

          {/* GDPT 2018 Checklist Comparison */}
          {analysisResult.gdptChecklist && (
            <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-xs space-y-3">
              <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                5. Đối Chiếu Theo Yêu Cầu Cần Đạt Lớp 5 (GDPT 2018)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-1">Bố cục 3 phần:</span>
                  <p className="text-slate-600">{analysisResult.gdptChecklist.structure}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-1">5 Giác quan:</span>
                  <p className="text-slate-600">{analysisResult.gdptChecklist.sensoryDetails}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-1">So sánh, nhân hóa:</span>
                  <p className="text-slate-600">{analysisResult.gdptChecklist.figurativeDevices}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-1">Dung lượng ước tính:</span>
                  <p className="text-slate-600">{analysisResult.gdptChecklist.wordCountEstimate}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
