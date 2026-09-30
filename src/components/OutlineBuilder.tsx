import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  HelpCircle, 
  Copy, 
  Printer, 
  Download, 
  CheckCircle2, 
  Eye, 
  Ear, 
  Wind, 
  Hand, 
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { OutlineData } from '../types';

const INITIAL_OUTLINE: OutlineData = {
  studentName: '',
  studentClass: '5A',
  topicTitle: 'Cảnh dòng sông quê em vào một buổi chiều hè êm ả',
  sceneType: 'Dòng sông',
  location: 'Quê nội em ở vùng đồng bằng Bắc Bộ',

  // I. Mở bài
  introQuote: '“Quê hương tôi có con sông xanh biếc / Nước gương trong soi tóc những hàng tre” (Tế Hanh)',
  introDetails: 'Giới thiệu con sông Đáy hiền hòa chảy qua làng quê em; em thường ra ngắm sông vào những buổi chiều hè sau giờ học; cảnh sông mang lại cảm giác bình yên và mát rượi.',

  // II. Thân bài
  // 1. Tả bao quát
  overviewImpression: 'Ấn tượng đầu tiên là dòng sông êm ả, mềm mại như một dải lụa hiền từ ôm lấy xóm làng.',
  overviewLocationSource: 'Bắt nguồn từ thượng nguồn xa xôi, chảy qua cánh đồng làng rồi đổ ra dòng sông lớn; là dòng sông tự nhiên ngàn đời gắn bó.',
  overviewNameStory: 'Tên con sông gắn liền với câu chuyện truyền đời của các cụ già trong làng, nơi ghi dấu bao thế hệ.',
  overviewDimensionComparison: 'Lòng sông rộng chừng hai trăm mét, đủ cho hai chiếc thuyền nan tránh nhau; nước sâu vừa phải nhưng mùa mưa nước dâng cao.',
  overviewGeneralAtmosphere: 'Bầu trời chiều hè cao vợi, mây trắng bồng bềnh lững lờ trôi, không khí thoáng đãng, gió nam thổi lồng lộng.',

  // 2. Tả chi tiết
  detailPerspective: 'Từ trên mặt đê cao nhìn xuống (thấy toàn cảnh dòng sông uốn lượn) -> rồi bước dần xuống mép nước ven bờ kè (nhìn thấy rõ từng gợn sóng).',
  detailTimeSeasonalChange: 'Mùa khô nước sông trong xanh biếc ngọc, mùa mưa lũ nước đỏ quạch phù sa cuồn cuộn; buổi chiều mặt nước dịu dàng hơn sáng sớm.',
  detailWaterSurface: 'Nước màu xanh ngọc bích; sóng lăn tăn xô nhẹ vào bờ kè đá; ánh nắng chiều rọi xuống lấp loáng như dát vàng dát bạc.',
  detailFiveSenses: 'Thị giác: màu đỏ hoàng hôn, bóng tre nghiêng soi; Thính giác: tiếng sóng vỗ ì oạp vào mạn thuyền; Khứu giác: thoang thoảng mùi bùn non ngai ngái hòa mùi gió đồng; Xúc giác: làn gió mát rượi mơn man làn da.',
  detailFigurativeDevices: 'So sánh: "Dòng sông như dải lụa đào vắt ngang cánh đồng lúa"; Nhân hóa: "Hàng tre già nghiêng mình soi gương, khẽ thì thầm câu chuyện ngàn đời".',
  detailLivingCreatures: 'Những đàn cá mương nhỏ lấp lánh tung tăng đớp bọt nước; khóm lục bình trôi dập dềnh hoa tím ngát.',
  detailBanksAndTrees: 'Đôi bờ là bãi ngô xanh mướt, rặng phi lao rì rào trong gió, có bờ kè đá và bậc tam cấp dẫn xuống bến tắm.',
  detailStructures: 'Chiếc cầu bê tông nối hai bờ sông nhộn nhịp xe cộ; bến đò xưa nằm trầm mặc dưới bóng cây đa cổ thụ.',
  detailFavoriteSpot: 'Thích nhất khúc sông uốn cong quanh chân đê, nơi mặt nước phẳng lặng nhất và đón trọn ánh hoàng hôn buông xuống.',
  detailPersonalReflections: 'Cảm giác thời gian như trôi chậm lại, lòng thanh thản, tự hào vì quê mình có dòng sông quá đỗi nên thơ.',

  // 3. Sự vật, hiện tượng nổi bật
  peopleActivities: 'Mấy bác nông dân thong thả dắt trâu về; người dân ra bờ kè hóng mát, trò chuyện râm ran; vài bác buông cần câu cá.',
  animalsNature: 'Đàn vịt bơi lội bì bõm dưới gốc bèo; đàn chim én chao liệng trên không trung trước khi về tổ.',
  benefitsToHometown: 'Dòng sông cung cấp nguồn nước ngọt mát tưới tắm ruộng đồng, mang phù sa màu mỡ cho hoa màu tốt tươi, là nguồn tôm cá dồi dào.',
  memoriesAndFeelings: 'Nhớ kỷ niệm cùng ông nội ngồi câu cá chiều hè và được nghe ông kể chuyện ngày xưa đánh giặc trên dòng sông.',

  // III. Kết bài
  endingFeelings: 'Em vô cùng yêu quý và gắn bó tha thiết với dòng sông quê hương như người bạn tuổi thơ.',
  endingSignificance: 'Dòng sông là linh hồn, là biểu tượng trù phú và thanh bình của làng quê em qua năm tháng.',
  endingActionPledge: 'Em mong dòng sông mãi trong lành; em tự hứa không bao giờ xả rác bừa bãi và sẽ cùng các bạn tham gia nhặt rác dọn vệ sinh đôi bờ.'
};

export const OutlineBuilder: React.FC = () => {
  const [outline, setOutline] = useState<OutlineData>(() => {
    const saved = localStorage.getItem('hatmam_outline_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_OUTLINE;
      }
    }
    return INITIAL_OUTLINE;
  });

  const [activeAccordion, setActiveAccordion] = useState<string>('intro');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSparking, setIsSparking] = useState<boolean>(false);
  const [sparkResponse, setSparkResponse] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('hatmam_outline_v1', JSON.stringify(outline));
  }, [outline]);

  const updateField = (key: keyof OutlineData, value: string) => {
    setOutline(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (window.confirm('Bạn có muốn bắt đầu dàn ý mới không? Các nội dung hiện tại sẽ được làm mới.')) {
      setOutline({
        ...INITIAL_OUTLINE,
        studentName: '',
        topicTitle: '',
        location: '',
        introQuote: '',
        introDetails: '',
        overviewImpression: '',
        overviewLocationSource: '',
        overviewNameStory: '',
        overviewDimensionComparison: '',
        overviewGeneralAtmosphere: '',
        detailPerspective: '',
        detailTimeSeasonalChange: '',
        detailWaterSurface: '',
        detailFiveSenses: '',
        detailFigurativeDevices: '',
        detailLivingCreatures: '',
        detailBanksAndTrees: '',
        detailStructures: '',
        detailFavoriteSpot: '',
        detailPersonalReflections: '',
        peopleActivities: '',
        animalsNature: '',
        benefitsToHometown: '',
        memoriesAndFeelings: '',
        endingFeelings: '',
        endingSignificance: '',
        endingActionPledge: ''
      });
    }
  };

  const handleApplyPreset = (type: 'sông' | 'hồ' | 'biển' | 'suối') => {
    if (type === 'sông') {
      setOutline(INITIAL_OUTLINE);
    } else if (type === 'hồ') {
      setOutline({
        ...INITIAL_OUTLINE,
        topicTitle: 'Tả cảnh Hồ Gươm - Trái tim xanh của thủ đô',
        sceneType: 'Hồ nước',
        location: 'Trung tâm quận Hoàn Kiếm, thủ đô Hà Nội',
        introQuote: '“Hồ Gươm soi bóng tháp Rùa / Nước xanh trong vắt bốn mùa rêu phong”',
        introDetails: 'Hồ Gươm gắn liền với truyền thuyết vua Lê Lợi trả gươm báu; em được bố mẹ cho đi dạo quanh hồ vào một sáng mùa thu trong trẻo.',
        overviewImpression: 'Mặt hồ phẳng lặng và xanh biếc tựa như một tấm gương ngọc khổng lồ của mây trời.',
        overviewLocationSource: 'Nằm giữa lòng thành phố náo nhiệt nhưng không gian lại tĩnh lặng, cổ kính.',
        overviewDimensionComparison: 'Hồ rộng mênh mông, chu vi chừng gần hai cây số, đường dạo lát đá sạch bóng quanh bờ.',
        overviewGeneralAtmosphere: 'Không khí mát mẻ, thoang thoảng gió thu heo may, bầu trời thu trong xanh ngắt.',
        detailWaterSurface: 'Nước hồ có màu xanh lục đặc trưng quanh năm, mặt nước phẳng như gương in bóng râm cây cối.',
        detailFiveSenses: 'Thị giác: màu đỏ tươi cầu Thê Húc, tháp Rùa rêu phong; Thính giác: chim hót lảnh lót; Khứu giác: thoang thoảng hương lộc vừng; Xúc giác: gió se lạnh mơn man.',
        detailFigurativeDevices: 'So sánh: "Cầu Thê Húc cong cong như con tôm màu son"; Nhân hóa: "Những rặng liễu thướt tha nghiêng mình rủ mái tóc dài chải xuống làn nước biếc".',
        detailStructures: 'Tháp Rùa rêu phong giữa lòng hồ; Cầu Thê Húc dẫn vào đền Ngọc Sơn linh thiêng; tháp Bút sừng sững tạc vào trời xanh.',
        benefitsToHometown: 'Lá phổi xanh điều hòa không khí cho thủ đô, điểm tham quan du lịch nổi tiếng muôn phương.',
        endingFeelings: 'Tự hào khôn xiết về vẻ đẹp ngàn năm văn hiến của thủ đô yêu dấu.',
        endingSignificance: 'Hồ Gươm là viên ngọc quý của non sông Việt Nam.',
        endingActionPledge: 'Em mong hồ mãi xanh sạch, em sẽ luôn giữ gìn vệ sinh và nhắc nhở mọi người không vứt rác xuống lòng hồ.'
      });
    } else if (type === 'biển') {
      setOutline({
        ...INITIAL_OUTLINE,
        topicTitle: 'Tả cảnh bình minh rực rỡ trên bãi biển Mỹ Khê quê em',
        sceneType: 'Bãi biển',
        location: 'Bờ biển Đà Nẵng',
        introQuote: '“Biển một bên và em một bên / Biển mênh mông như tình thương của mẹ”',
        introDetails: 'Bãi biển Mỹ Khê từng lọt top bãi biển quyến rũ nhất hành tinh; em được bố đưa đi ngắm mặt trời mọc vào sáng sớm kỳ nghỉ hè.',
        overviewImpression: 'Biển cả bao la, khoáng đạt, mở ra trước mắt một không gian vô tận đầy sức sống diệu kỳ.',
        overviewDimensionComparison: 'Bờ cát trắng mịn trải dài tít tắp, từng con sóng nhấp nhô nối nhau ra tận chân trời xanh.',
        overviewGeneralAtmosphere: 'Gió biển lồng lộng mang vị mặn nồng nàn; bầu trời chuyển dần từ màu tím thẫm sang ửng hồng rồi rực rỡ vàng cam.',
        detailWaterSurface: 'Nước biển trong xanh biếc ngọc, từng đợt sóng bạc đầu xô vào bờ cát tung bọt trắng xóa như tuyết.',
        detailFiveSenses: 'Thị giác: vầng thái dương đỏ ối như quả cầu lửa; Thính giác: tiếng sóng vỗ ì ầm dạt dào; Khứu giác & Vị giác: mằn mặn vị muối biển; Xúc giác: cát biển mịn màng mát lạnh dưới chân.',
        detailFigurativeDevices: 'So sánh: "Mặt trời như lòng đỏ quả trứng gà khổng lồ nhô lên từ đáy biển"; Nhân hóa: "Những con sóng tinh nghịch rượt đuổi nhau vào bờ cát trắng rồi vỗ tay reo vang".',
        peopleActivities: 'Đoàn thuyền đánh cá cập bến với tôm cá đầy khoang; tiếng người mua bán tấp nập, rộn rã; người tắm biển hòa mình vào sóng nước.',
        endingFeelings: 'Trái tim rộn rã niềm tự hào và tình yêu mãnh liệt dành cho biển đảo quê hương.',
        endingSignificance: 'Biển đem lại nguồn hải sản quý giá và vẻ đẹp thiên nhiên diệu kỳ nuôi sống người dân xứ biển.',
        endingActionPledge: 'Chung tay giữ gìn bãi cát luôn sạch đẹp, không dùng đồ nhựa một lần xả ra môi trường biển.'
      });
    } else {
      setOutline({
        ...INITIAL_OUTLINE,
        topicTitle: 'Tả con suối róc rách trong rừng xanh mùa hạ',
        sceneType: 'Con suối',
        location: 'Con suối gần bản làng vùng cao Tây Bắc',
        introQuote: '“Tiếng suối trong như tiếng hát xa / Trăng lồng cổ thụ bóng lồng hoa” (Hồ Chí Minh)',
        introDetails: 'Con suối nhỏ mát lành chảy qua bìa rừng đầu bản; nơi ghi dấu bao kỷ niệm tuổi thơ cùng lũ bạn chăn trâu.',
        overviewImpression: 'Con suối nhỏ nhắn, trong vắt như một dải ngân hà rơi xuống giữa thung lũng xanh mướt.',
        overviewDimensionComparison: 'Suối rộng chỉ khoảng mươi bước chân, len lỏi qua từng ghềnh đá tròn trĩnh nhẵn thín.',
        detailWaterSurface: 'Nước suối trong veo nhìn thấu tận đáy cát vàng và những viên cuội ngũ sắc óng ánh.',
        detailFiveSenses: 'Thính giác: tiếng nước róc rách như tiếng đàn tơ líu lo; Xúc giác: nước mát rượi tê tê đầu ngón chân; Khứu giác: thoang thoảng mùi hương hoa tràm rừng.',
        detailFigurativeDevices: 'So sánh: "Nước suối trong như mắt trẻ thơ"; Nhân hóa: "Con suối vừa chảy vừa cất khúc ca reo vui của đại ngàn hoang dã".',
        peopleActivities: 'Những cô thôn nữ gánh nước ngọt ngào về bản; trẻ con lội suối bắt ốc, tiếng cười vang cả góc rừng.',
        endingFeelings: 'Yêu quý con suối như một người bạn thân thiết, trong sáng và ngọt lành.',
        endingActionPledge: 'Bảo vệ rừng đầu nguồn để giữ gìn dòng nước suối mãi tuôn trào trong vắt.'
      });
    }
  };

  const handleCopy = () => {
    const text = `Họ và tên: ${outline.studentName || '................................'}    Lớp: ${outline.studentClass || '5'}
DÀN Ý BÀI VĂN TẢ CẢNH
Đề bài: ${outline.topicTitle}
Địa điểm: ${outline.location}

I. MỞ BÀI:
- Câu thơ/hát/ca dao dẫn dắt: ${outline.introQuote}
- Giới thiệu địa điểm, dịp quan sát & ấn tượng ban đầu: ${outline.introDetails}

II. THÂN BÀI:
1. Tả bao quát:
- Ấn tượng đầu tiên: ${outline.overviewImpression}
- Vị trí, nguồn gốc: ${outline.overviewLocationSource}
- Tên gọi, câu chuyện: ${outline.overviewNameStory}
- Kích thước & so sánh trực quan: ${outline.overviewDimensionComparison}
- Quang cảnh chung (bầu trời, không khí, không gian): ${outline.overviewGeneralAtmosphere}

2. Tả chi tiết:
- Trình tự quan sát (từ xa đến gần / theo thời gian): ${outline.detailPerspective}
- Cảnh sắc thay đổi theo thời gian/mùa: ${outline.detailTimeSeasonalChange}
- Mặt nước, dòng nước (màu sắc, sóng, ánh sáng): ${outline.detailWaterSurface}
- Quan sát bằng 5 giác quan: ${outline.detailFiveSenses}
- Hình ảnh so sánh, nhân hóa: ${outline.detailFigurativeDevices}
- Thế giới sinh vật (cá, rong, bèo, sen...): ${outline.detailLivingCreatures}
- Cảnh hai bên bờ & cây cối: ${outline.detailBanksAndTrees}
- Các công trình liên quan (cầu, bến, đền...): ${outline.detailStructures}
- Chi tiết đặc biệt thích nhất: ${outline.detailFavoriteSpot}
- Cảm nhận lồng ghép: ${outline.detailPersonalReflections}

3. Sự vật, hiện tượng nổi bật & con người:
- Hoạt động của con người (hóng mát, câu cá, giặt giũ, buôn bán): ${outline.peopleActivities}
- Các loài vật đặc trưng: ${outline.animalsNature}
- Ích lợi của cảnh đối với quê hương: ${outline.benefitsToHometown}
- Kỷ niệm đáng nhớ: ${outline.memoriesAndFeelings}

III. KẾT BÀI:
- Tình cảm dành cho cảnh: ${outline.endingFeelings}
- Ý nghĩa của cảnh đối với quê hương & em: ${outline.endingSignificance}
- Mong muốn tốt đẹp & việc làm cụ thể bảo vệ: ${outline.endingActionPledge}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = `Họ và tên: ${outline.studentName || 'Chưa điền'} - Lớp: ${outline.studentClass}\nDÀN Ý BÀI VĂN TẢ CẢNH (GDPT 2018)\nĐề bài: ${outline.topicTitle}\n\n[MỞ BÀI]\n- Dẫn dắt: ${outline.introQuote}\n- Giới thiệu: ${outline.introDetails}\n\n[THÂN BÀI]\n1. Bao quát: ${outline.overviewImpression}\n- Kích thước: ${outline.overviewDimensionComparison}\n- Không gian: ${outline.overviewGeneralAtmosphere}\n2. Chi tiết: ${outline.detailWaterSurface}\n- Giác quan: ${outline.detailFiveSenses}\n- Tu từ: ${outline.detailFigurativeDevices}\n- Đôi bờ: ${outline.detailBanksAndTrees}\n3. Hoạt động: ${outline.peopleActivities}\n- Ích lợi: ${outline.benefitsToHometown}\n\n[KẾT BÀI]\n- Tình cảm: ${outline.endingFeelings}\n- Ý nghĩa & Hành động: ${outline.endingActionPledge}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dan-y-ta-canh-${outline.studentName || 'lop5'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Spark AI helper
  const handleSparkIdeas = async (section: string) => {
    setIsSparking(true);
    try {
      const res = await fetch('/api/spark-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sceneName: outline.topicTitle || 'Dòng sông quê em',
          sceneType: outline.sceneType,
          sectionType: section
        })
      });
      const data = await res.json();
      setSparkResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSparking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Nhiệm vụ 1: Tìm ý & Lập dàn ý 5 Giác quan
          </div>
          <h2 className="font-['Quicksand'] text-2xl sm:text-3xl font-bold tracking-tight">
            Xây Dựng Khung Dàn Ý Chuẩn GDPT 2018
          </h2>
          <p className="mt-2 text-emerald-50 text-sm sm:text-base leading-relaxed">
            Một bài văn sinh động bắt đầu từ một dàn ý vững chắc! Hạt mầm sẽ gợi mở từng góc nhìn (xa - gần, cao - thấp) và 5 giác quan (thị giác, thính giác, khứu giác, xúc giác) để bạn tự tay gieo những câu chữ tuyệt đẹp.
          </p>

          {/* Quick Preset Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-amber-200 mr-1">Mẫu gợi ý sẵn:</span>
            <button
              onClick={() => handleApplyPreset('sông')}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-all border border-white/20"
            >
              🌊 Dòng sông quê em
            </button>
            <button
              onClick={() => handleApplyPreset('hồ')}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-all border border-white/20"
            >
              🏞️ Hồ Gươm cổ kính
            </button>
            <button
              onClick={() => handleApplyPreset('biển')}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-all border border-white/20"
            >
              🌅 Bình minh bãi biển
            </button>
            <button
              onClick={() => handleApplyPreset('suối')}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-all border border-white/20"
            >
              💧 Con suối mát lành
            </button>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-slate-800 text-sm">Bản ghi dàn ý học sinh</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">Tự động lưu nháp</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all"
            title="Sao chép toàn bộ dàn ý để dán vào bài làm"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép dàn ý'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Tải về (.txt)</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">In dàn ý</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 transition-all"
            title="Xóa trắng để làm lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Student Meta Information */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-amber-900 mb-1">Họ và tên học sinh:</label>
          <input
            type="text"
            value={outline.studentName}
            onChange={(e) => updateField('studentName', e.target.value)}
            placeholder="Ví dụ: Nguyễn Phương Mai"
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-amber-900 mb-1">Lớp:</label>
          <input
            type="text"
            value={outline.studentClass}
            onChange={(e) => updateField('studentClass', e.target.value)}
            placeholder="Ví dụ: 5A, 5B..."
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-amber-900 mb-1">Cảnh định tả thuộc loại:</label>
          <select
            value={outline.sceneType}
            onChange={(e) => updateField('sceneType', e.target.value as any)}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
          >
            <option value="Dòng sông">Dòng sông (Sông quê, sông Hồng, sông Hương...)</option>
            <option value="Hồ nước">Hồ nước (Hồ Gươm, Hồ Tây, hồ công viên...)</option>
            <option value="Bãi biển">Bãi biển (Biển Sầm Sơn, Nha Trang, Đà Nẵng...)</option>
            <option value="Con suối">Con suối núi rừng (Suối vùng cao, suối thác...)</option>
            <option value="Ao sen / Ao làng">Ao sen / Ao làng quê</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-amber-900 mb-1">Đề bài / Nhan đề bài viết:</label>
          <input
            type="text"
            value={outline.topicTitle}
            onChange={(e) => updateField('topicTitle', e.target.value)}
            placeholder="Ví dụ: Tả con sông quê em vào một buổi chiều hè"
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm font-bold text-emerald-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-amber-900 mb-1">Địa điểm cụ thể:</label>
          <input
            type="text"
            value={outline.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="Ví dụ: Làng quê em / Bến đò xưa..."
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Main Accordion Sections */}
      <div className="space-y-4">
        
        {/* ================= SECTION I: MỞ BÀI ================= */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
          <div
            onClick={() => setActiveAccordion(activeAccordion === 'intro' ? '' : 'intro')}
            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-gradient-to-r from-emerald-50/60 to-white hover:bg-emerald-50/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                I
              </span>
              <div>
                <h3 className="font-['Quicksand'] font-bold text-base sm:text-lg text-emerald-950">
                  Mở Bài (Giới thiệu cảnh định tả)
                </h3>
                <p className="text-xs text-slate-500">
                  Gợi ý: Mở bài gián tiếp bằng câu thơ, ca dao, bài hát hoặc ấn tượng đặc biệt
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSparkIdeas('opening');
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Hạt mầm gợi ý</span>
              </button>
              {activeAccordion === 'intro' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {activeAccordion === 'intro' && (
            <div className="p-5 border-t border-amber-100 space-y-4 bg-amber-50/20">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Câu thơ / câu hát / tục ngữ, ca dao / câu văn hay dẫn dắt:
                  </label>
                  <span className="text-[11px] text-emerald-700 italic">Mở bài gián tiếp rất được khuyến khích</span>
                </div>
                <textarea
                  rows={2}
                  value={outline.introQuote}
                  onChange={(e) => updateField('introQuote', e.target.value)}
                  placeholder="Gợi ý: “Quê hương tôi có con sông xanh biếc...” hoặc “Tiếng sóng biển muôn đời vỗ về bờ cát...”"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Các ý giới thiệu địa điểm (Tên ao hồ/sông suối, ở đâu, quan sát dịp nào, cảm nhận ban đầu):
                </label>
                <textarea
                  rows={2}
                  value={outline.introDetails}
                  onChange={(e) => updateField('introDetails', e.target.value)}
                  placeholder="Ví dụ: Tên dòng sông, con sông nằm ở đâu, em ngắm vào dịp nghỉ hè hoặc buổi chiều tà, đem đến cảm xúc gì..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION II: THÂN BÀI ================= */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
          <div
            onClick={() => setActiveAccordion(activeAccordion === 'body' ? '' : 'body')}
            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-gradient-to-r from-teal-50/60 to-white hover:bg-teal-50/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                II
              </span>
              <div>
                <h3 className="font-['Quicksand'] font-bold text-base sm:text-lg text-teal-950">
                  Thân Bài (Trọng tâm miêu tả sinh động)
                </h3>
                <p className="text-xs text-slate-500">
                  Gồm 3 phần: 1. Tả bao quát • 2. Tả chi tiết (5 giác quan, tu từ) • 3. Con người & hoạt động
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSparkIdeas('details');
                }}
                className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold hover:bg-teal-200 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-teal-700" />
                <span>Hạt mầm gợi ý</span>
              </button>
              {activeAccordion === 'body' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {activeAccordion === 'body' && (
            <div className="p-5 border-t border-amber-100 space-y-6 bg-slate-50/40">
              
              {/* II.1. Tả bao quát */}
              <div className="bg-white rounded-xl p-4.5 border border-teal-200/80 space-y-3">
                <div className="flex items-center gap-2 border-b border-teal-100 pb-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">1</span>
                  <h4 className="font-bold text-sm text-teal-900">Tả bao quát (Ấn tượng chung, vị trí, kích thước, bầu không khí)</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Ấn tượng đầu tiên của em khi nhìn cảnh:
                    </label>
                    <input
                      type="text"
                      value={outline.overviewImpression}
                      onChange={(e) => updateField('overviewImpression', e.target.value)}
                      placeholder="Ví dụ: Rộng lớn mênh mông, êm ả như dải lụa mềm mại..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Vị trí, nguồn gốc (tự nhiên hay nhân tạo, chảy qua đâu):
                    </label>
                    <input
                      type="text"
                      value={outline.overviewLocationSource}
                      onChange={(e) => updateField('overviewLocationSource', e.target.value)}
                      placeholder="Ví dụ: Bắt nguồn từ vùng núi cao, chảy qua triền đê..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Chiều dài, độ rộng, độ sâu (ước lượng hoặc so sánh trực quan):
                    </label>
                    <input
                      type="text"
                      value={outline.overviewDimensionComparison}
                      onChange={(e) => updateField('overviewDimensionComparison', e.target.value)}
                      placeholder="Ví dụ: Lòng sông rộng chừng hai trăm mét, đủ cho thuyền bè tránh nhau..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Quang cảnh chung (bầu trời, mây gió, không khí, không gian):
                    </label>
                    <input
                      type="text"
                      value={outline.overviewGeneralAtmosphere}
                      onChange={(e) => updateField('overviewGeneralAtmosphere', e.target.value)}
                      placeholder="Ví dụ: Bầu trời cao vợi, mây trắng bồng bềnh, gió thổi mát rượi..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* II.2. Tả chi tiết */}
              <div className="bg-white rounded-xl p-4.5 border border-amber-200/90 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">2</span>
                    <h4 className="font-bold text-sm text-amber-950">Tả chi tiết (Góc nhìn, thời gian, mặt nước, 5 giác quan & phép tu từ)</h4>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Phần quan trọng nhất chiếm 4 điểm
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Trình tự quan sát (từ xa đến gần / từ trên cao xuống thấp):
                    </label>
                    <input
                      type="text"
                      value={outline.detailPerspective}
                      onChange={(e) => updateField('detailPerspective', e.target.value)}
                      placeholder="Từ xa nhìn lại thấy dòng nước lấp lánh -> bước lại gần thấy bọt sóng..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Cảnh thay đổi theo thời gian trong ngày / theo mùa:
                    </label>
                    <input
                      type="text"
                      value={outline.detailTimeSeasonalChange}
                      onChange={(e) => updateField('detailTimeSeasonalChange', e.target.value)}
                      placeholder="Sáng sớm sương phủ bàng bạc -> trưa nắng dát vàng -> chiều tà tím thẫm..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Mặt nước, dòng nước (màu sắc, trong/đục, độ ấm lạnh, ánh sáng phản chiếu, sóng):
                    </label>
                    <input
                      type="text"
                      value={outline.detailWaterSurface}
                      onChange={(e) => updateField('detailWaterSurface', e.target.value)}
                      placeholder="Nước xanh biếc ngọc, sóng lăn tăn xô bờ kè, ánh chiều rọi xuống lấp loáng..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  {/* 5 Senses Highlight Box */}
                  <div className="md:col-span-2 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-amber-50/60 p-3.5 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-900">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <Ear className="w-4 h-4 text-teal-600" />
                      <Wind className="w-4 h-4 text-amber-600" />
                      <Hand className="w-4 h-4 text-rose-600" />
                      <span>Chi tiết quan sát bằng 5 Giác quan (Thị giác, Thính giác, Khứu giác, Xúc giác, Vị giác):</span>
                    </div>
                    <textarea
                      rows={2}
                      value={outline.detailFiveSenses}
                      onChange={(e) => updateField('detailFiveSenses', e.target.value)}
                      placeholder="Thị giác (màu sắc, ánh sáng); Thính giác (tiếng sóng rì rào, tiếng suối róc rách); Khứu giác (thoang thoảng mùi bùn non/hương sen); Xúc giác (nước mát rượi, gió mơn man)..."
                      className="w-full p-2.5 rounded-lg border border-emerald-300 bg-white text-sm"
                    />
                  </div>

                  {/* Figurative Devices Box */}
                  <div className="md:col-span-2 bg-purple-50/60 p-3.5 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        Hình ảnh So sánh, Nhân hóa, Liên tưởng độc đáo:
                      </span>
                      <span className="text-[11px] text-purple-700 italic">Tạo điểm sáng tạo (2 điểm)</span>
                    </div>
                    <textarea
                      rows={2}
                      value={outline.detailFigurativeDevices}
                      onChange={(e) => updateField('detailFigurativeDevices', e.target.value)}
                      placeholder="Ví dụ: 'Mặt nước phẳng như tấm gương khổng lồ', 'Hàng tre già nghiêng mình soi bóng chải tóc', 'Con sóng tinh nghịch rượt đuổi nhau'..."
                      className="w-full p-2.5 rounded-lg border border-purple-300 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Thế giới sinh vật (tôm, cua, cá, bèo tây, hoa sen, rong rêu...):
                    </label>
                    <input
                      type="text"
                      value={outline.detailLivingCreatures}
                      onChange={(e) => updateField('detailLivingCreatures', e.target.value)}
                      placeholder="Đàn cá nhỏ tung tăng bơi lội, cụm bèo tây dập dềnh hoa tím..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Cảnh hai bên bờ (cây cối, bờ kè đá, ruộng đồng, lối đi...):
                    </label>
                    <input
                      type="text"
                      value={outline.detailBanksAndTrees}
                      onChange={(e) => updateField('detailBanksAndTrees', e.target.value)}
                      placeholder="Rặng phi lao rì rào, bãi ngô xanh mướt, bậc đá dẫn xuống dòng sông..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Công trình liên quan (cầu bắc qua, bến thuyền, đền tháp...):
                    </label>
                    <input
                      type="text"
                      value={outline.detailStructures}
                      onChange={(e) => updateField('detailStructures', e.target.value)}
                      placeholder="Cây cầu nối liền đôi bờ, bến đò xưa, tháp cổ..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Chi tiết đặc biệt em muốn tả kĩ nhất + cảm nhận lồng ghép:
                    </label>
                    <input
                      type="text"
                      value={outline.detailFavoriteSpot}
                      onChange={(e) => updateField('detailFavoriteSpot', e.target.value)}
                      placeholder="Khúc sông uốn cong đón hoàng hôn, lòng bỗng thấy bình yên lạ kỳ..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* II.3. Sự vật & Con người nổi bật */}
              <div className="bg-white rounded-xl p-4.5 border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">3</span>
                  <h4 className="font-bold text-sm text-blue-900">Sự vật, hiện tượng nổi bật & Hoạt động con người</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Hoạt động của con người (câu cá, giặt giũ, bến thuyền, hóng mát, thể dục...):
                    </label>
                    <input
                      type="text"
                      value={outline.peopleActivities}
                      onChange={(e) => updateField('peopleActivities', e.target.value)}
                      placeholder="Người lớn thong thả dạo mát trò chuyện râm ran, vài người buông cần câu..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Các loài vật đặc trưng (đàn vịt bơi lội, trâu đầm mình, chim chao lượn...):
                    </label>
                    <input
                      type="text"
                      value={outline.animalsNature}
                      onChange={(e) => updateField('animalsNature', e.target.value)}
                      placeholder="Đàn vịt bơi bì bõm, chú trâu đầm mình thong dong nhai cỏ..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Ích lợi của cảnh đối với quê hương em:
                    </label>
                    <input
                      type="text"
                      value={outline.benefitsToHometown}
                      onChange={(e) => updateField('benefitsToHometown', e.target.value)}
                      placeholder="Cung cấp nước ngọt tưới tiêu, bồi đắp phù sa màu mỡ, cho tôm cá dồi dào..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      • Kỷ niệm đẹp hoặc cảm nhận gắn bó của em:
                    </label>
                    <input
                      type="text"
                      value={outline.memoriesAndFeelings}
                      onChange={(e) => updateField('memoriesAndFeelings', e.target.value)}
                      placeholder="Kỷ niệm những buổi chiều thả diều bên bờ đê lộng gió..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ================= SECTION III: KẾT BÀI ================= */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
          <div
            onClick={() => setActiveAccordion(activeAccordion === 'ending' ? '' : 'ending')}
            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-gradient-to-r from-rose-50/60 to-white hover:bg-rose-50/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                III
              </span>
              <div>
                <h3 className="font-['Quicksand'] font-bold text-base sm:text-lg text-rose-950">
                  Kết Bài (Kết bài mở rộng 3 bước chuẩn GDPT 2018)
                </h3>
                <p className="text-xs text-slate-500">
                  Tình cảm sâu đậm • Ý nghĩa với quê hương • Mong muốn & hành động thiết thực
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSparkIdeas('ending');
                }}
                className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-200 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-rose-700" />
                <span>Hạt mầm gợi ý</span>
              </button>
              {activeAccordion === 'ending' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {activeAccordion === 'ending' && (
            <div className="p-5 border-t border-amber-100 space-y-4 bg-amber-50/20">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  1. Tình cảm sâu đậm của em dành cho cảnh:
                </label>
                <textarea
                  rows={2}
                  value={outline.endingFeelings}
                  onChange={(e) => updateField('endingFeelings', e.target.value)}
                  placeholder="Yêu mến, tự hào, coi dòng sông như người bạn tuổi thơ không thể thiếu..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  2. Ý nghĩa của cảnh đối với bản thân em và quê hương:
                </label>
                <textarea
                  rows={2}
                  value={outline.endingSignificance}
                  onChange={(e) => updateField('endingSignificance', e.target.value)}
                  placeholder="Là biểu tượng thanh bình, nuôi dưỡng tâm hồn trẻ thơ và sự ấm no của làng xóm..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  3. Mong ước tốt đẹp và việc làm cụ thể để bảo vệ dòng nước:
                </label>
                <textarea
                  rows={2}
                  value={outline.endingActionPledge}
                  onChange={(e) => updateField('endingActionPledge', e.target.value)}
                  placeholder="Ước mong dòng sông mãi trong lành; tự hứa không vứt rác, cùng bạn bè trồng cây giữ bờ kè..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* AI Spark Modal / Drawer if triggered */}
      {sparkResponse && (
        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 shadow-md relative">
          <button
            onClick={() => setSparkResponse(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-bold bg-white px-2 py-1 rounded-md border"
          >
            Đóng
          </button>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h4 className="font-['Quicksand'] font-bold text-emerald-950 text-base">
              Lời gợi mở của Hạt mầm văn chương
            </h4>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            {sparkResponse.guidingQuestions && sparkResponse.guidingQuestions.length > 0 && (
              <div>
                <p className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1">
                  💡 Câu hỏi gợi mở quan sát:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {sparkResponse.guidingQuestions.map((q: string, i: number) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {sparkResponse.sensoryKeywords && (
              <div>
                <p className="font-bold text-teal-900 text-xs uppercase tracking-wider mb-1">
                  🌿 Từ gợi cảm 5 giác quan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sparkResponse.sensoryKeywords.sight?.map((w: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-teal-200 text-xs font-semibold text-teal-800">
                      👁️ {w}
                    </span>
                  ))}
                  {sparkResponse.sensoryKeywords.sound?.map((w: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-xs font-semibold text-amber-800">
                      👂 {w}
                    </span>
                  ))}
                  {sparkResponse.sensoryKeywords.scent?.map((w: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-xs font-semibold text-rose-800">
                      👃 {w}
                    </span>
                  ))}
                  {sparkResponse.sensoryKeywords.touch?.map((w: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-xs font-semibold text-purple-800">
                      🖐️ {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sparkResponse.figurativeIdeas && (
              <div>
                <p className="font-bold text-purple-900 text-xs uppercase tracking-wider mb-1">
                  ✨ Ý tưởng so sánh & nhân hóa:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {sparkResponse.figurativeIdeas.similes?.map((s: string, i: number) => (
                    <li key={i}><span className="font-bold">So sánh:</span> {s}</li>
                  ))}
                  {sparkResponse.figurativeIdeas.personifications?.map((p: string, i: number) => (
                    <li key={i}><span className="font-bold">Nhân hóa:</span> {p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checklist Reminder */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-slate-800">Đã đủ 3 phần: Mở bài (1đ) - Thân bài (4đ) - Kết bài (1đ)</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <span>✓ Đầy đủ 5 giác quan</span>
          <span>✓ Có so sánh & nhân hóa</span>
          <span>✓ Có lồng ghép cảm xúc & kỷ niệm</span>
        </div>
      </div>
    </div>
  );
};
