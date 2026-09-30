import React from 'react';
import { Award, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { GDPT_CRITERIA_GUIDE } from '../data/mockEducationalData';

export const RubricReference: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Award className="w-3.5 h-3.5 text-blue-200" />
            Khung Đánh Giá Chuẩn GDPT 2018 (Tiếng Việt Lớp 5)
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Yêu Cầu Cần Đạt Bài Văn Tả Cảnh (Thang Điểm 10)
          </h2>
          <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
            Biết rõ tiêu chí đánh giá sẽ giúp bạn nhỏ định hướng bài viết một cách xuất sắc nhất! Hãy đối chiếu từng phần để bài văn của bạn đạt trọn vẹn cả nội dung, kĩ năng lẫn sự sáng tạo độc đáo.
          </p>
        </div>
      </div>

      {/* General Criteria Box */}
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-xs space-y-4">
        <h3 className="font-['Quicksand'] font-bold text-slate-900 text-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Yêu Cầu Chung Của Bài Văn Tả Cảnh Nước Lớp 5
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="font-bold text-blue-900 block">1. Thể loại & Nội dung:</span>
            <p>Văn miêu tả cảnh đẹp thiên nhiên (ao hồ, dòng sông, bãi biển, con suối quê em hoặc nơi sinh sống).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1">
            <span className="font-bold text-teal-900 block">2. Bố cục 3 phần:</span>
            <p>Mở bài, Thân bài (tả bao quát, tả chi tiết, hoạt động), Kết bài rõ ràng, mạch lạc.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block">3. Dung lượng tiêu chuẩn:</span>
            <p>Độ dài khoảng <strong>200 – 250 chữ</strong> (khoảng 3 – 4 trang vở ô ly viết vừa phải).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
            <span className="font-bold text-purple-900 block">4. Nghệ thuật miêu tả:</span>
            <p>Sử dụng so sánh, nhân hóa, từ gợi tả âm thanh/màu sắc (từ láy, tính từ) làm nổi bật cảnh vật.</p>
          </div>
        </div>
      </div>

      {/* Detailed Rubric Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-slate-50 to-amber-50/40 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-['Quicksand'] font-bold text-slate-900 text-base sm:text-lg">
            Bảng Biểu Điểm Chi Tiết Từng Phần
          </h3>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Tổng điểm tối đa: 10 điểm
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                <th className="p-3.5 font-bold w-1/4">Phần Đánh Giá</th>
                <th className="p-3.5 font-bold w-1/3 bg-emerald-50 text-emerald-950">Mức Điểm Tối Đa (Xuất Sắc)</th>
                <th className="p-3.5 font-bold w-1/4 bg-amber-50 text-amber-950">Mức Điểm Trung Bình</th>
                <th className="p-3.5 font-bold text-rose-950 bg-rose-50">Cần Khắc Phục</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GDPT_CRITERIA_GUIDE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 align-top">
                    {row.section}
                  </td>
                  <td className="p-3.5 bg-emerald-50/30 text-slate-700 align-top leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.score2 !== 'N/A' ? row.score2 : row.score1}</span>
                    </div>
                  </td>
                  <td className="p-3.5 bg-amber-50/30 text-slate-600 align-top leading-relaxed">
                    {row.score1 !== 'N/A' && row.score2 !== 'N/A' ? row.score1 : row.score05}
                  </td>
                  <td className="p-3.5 bg-rose-50/20 text-rose-900/80 align-top leading-relaxed">
                    {row.score0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secret to get 2 points of Creativity */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-amber-50 rounded-2xl p-6 border-2 border-purple-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-purple-900 font-bold text-base">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Bí Quyết Giật Trọn 2 Điểm Sáng Tạo (Mục 6) Cho Bài Văn Lớp 5</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Học sinh lớp 5 thường chỉ đạt mức 1 điểm sáng tạo nếu chỉ dùng 1 biện pháp tu từ đơn giản. Để đạt trọn vẹn <strong>2 điểm sáng tạo</strong>, bài văn cần hội tụ ít nhất 2 trong 3 yếu tố sau:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-1">
            <span className="font-bold text-purple-900 block">1. Lời bày tỏ cảm xúc hợp lý:</span>
            <p className="text-slate-600">Đan xen tự nhiên cảm xúc, nhận xét, kỷ niệm thay vì chỉ kể lể các chi tiết bên ngoài.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-1">
            <span className="font-bold text-purple-900 block">2. Giàu từ gợi tả màu sắc, âm thanh:</span>
            <p className="text-slate-600">Sử dụng nhiều từ láy (lăn tăn, lấp loáng, dập dềnh), từ tượng thanh (rì rào, róc rách).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-1">
            <span className="font-bold text-purple-900 block">3. Biện pháp so sánh, nhân hóa độc đáo:</span>
            <p className="text-slate-600">Có ít nhất 1-2 hình ảnh so sánh mới lạ và gán cho dòng sông, con sóng tâm trạng, hành động của con người.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
