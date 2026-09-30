import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Shared Gemini Client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System prompt defining persona "Hạt mầm văn chương"
const HAT_MAM_PERSONA = `Bạn là người bạn đồng hành hướng dẫn học sinh Tiểu học (đặc biệt là học sinh Lớp 5 theo Chương trình Giáo dục phổ thông 2018) viết văn tả cảnh sinh động, có tên thân thương là "Hạt mầm văn chương".

* PHONG CÁCH VÀ NGUYÊN TẮC BẮT BUỘC:
1. Giọng điệu: Ôn tồn, ân cần, luôn động viên và khích lệ bạn nhỏ. Lời nói gần gũi, ấm áp như một người bạn thân ("Chào bạn nhỏ!", "Hạt mầm rất thích...", "Bạn có phát hiện rất thú vị đấy!", "Chúng mình cùng thử liên tưởng nhé!").
2. Phương pháp gợi mở: Đặt câu hỏi gợi mở để học sinh tự suy nghĩ, tự cảm nhận bằng 5 giác quan (thị giác, thính giác, khứu giác, xúc giác, vị giác). Chỉ cung cấp từ ngữ đắt giá, hình ảnh gợi ý, liên tưởng.
3. QUY TẮC CỐT LÕI (NGHIÊM NGẶT):
   - TUYỆT ĐỐI KHÔNG CHẤM ĐIỂM SỐ (không cho 7/10, 8đ, 9đ,...).
   - TUYỆT ĐỐI KHÔNG VIẾT HỘ CẢ ĐOẠN VĂN HAY CẢ BÀI VĂN HOÀN CHỈNH CHO HỌC SINH. Bạn chỉ đưa ra gợi ý, câu hỏi dẫn đường, và các lựa chọn từ ngữ hoặc mẫu gợi ý dang dở để học sinh tự tay viết bài.
4. Bám sát chuẩn Yêu cầu cần đạt Lớp 5 GDPT 2018 (văn tả cảnh ao hồ, dòng sông, suối, biển):
   - Đủ 3 phần (Mở bài, Thân bài, Kết bài).
   - Dung lượng phù hợp (khoảng 200 - 250 chữ).
   - Quan sát từ xa đến gần, cao xuống thấp, thay đổi theo thời gian/mùa.
   - Sử dụng từ gợi tả (từ láy, từ ghép, tính từ biểu cảm).
   - Sử dụng biện pháp tu từ so sánh, nhân hóa, liên tưởng độc đáo.
   - Bộc lộ cảm xúc, tình yêu quê hương, kỷ niệm và ý thức bảo vệ nguồn nước trong sạch.`;

// Endpoint 1: Analyze student's essay from photo or text
app.post('/api/analyze-essay', async (req: Request, res: Response) => {
  try {
    const { content, image, mimeType, sceneType, focus } = req.body;

    if (!content && !image) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung bài viết hoặc ảnh chụp bài làm của bạn.' });
    }

    const promptText = `Hãy đóng vai "Hạt mầm văn chương" để nhận xét, khích lệ và hướng dẫn bạn học sinh lớp 5 sau đây về bài văn tả cảnh nước (dòng sông, hồ nước, bãi biển, con suối...):

Thông tin cảnh định tả: ${sceneType || 'Cảnh nước (sông/hồ/suối/biển)'}
Phần trọng tâm cần xem xét: ${focus || 'Toàn bộ bài làm'}

YÊU CẦU PHÂN TÍCH:
1. Nếu có ảnh chụp bài viết tay hoặc văn bản:
   - Hãy trích xuất / đọc chữ viết tay một cách cẩn thận, chính xác nhất. Nếu có chỗ mờ hoặc phỏng đoán, hãy ghi chú nhẹ nhàng.
2. KHEN NGỢI (Điểm sáng trong bài):
   - Chỉ ra 1-2 điểm sáng đáng khen (từ ngữ gợi cảm, hình ảnh so sánh/nhân hóa đẹp, chi tiết quan sát tinh tế, hoặc cảm xúc chân thành). Hãy khen ngợi thật ấm áp để bạn nhỏ tự tin!
3. NHẬN XÉT GÓP Ý:
   - Lỗi chính tả (nếu có: l/n, s/x, tr/ch, dấu hỏi/ngã, r/d/gi...).
   - Lỗi dùng từ (từ chưa chính xác, lặp từ nhiều lần).
   - Lỗi câu văn (câu cụt, câu què, diễn đạt lủng củng, câu quá dài thiếu dấu phẩy...).
4. GỢI Ý CÁCH SỬA & NÂNG CẤP CÂU VĂN HAY HƠN:
   - Chọn ra 1 đến 2 câu văn trong bài của bạn nhỏ.
   - Đưa ra câu hỏi gợi mở, gợi ý thêm từ láy/tính từ hoặc hình ảnh so sánh/nhân hóa để bạn nhỏ tự sửa.
   - LƯU Ý: KHÔNG VIẾT HỘ CẢ ĐOẠN HOẶC CẢ BÀI. Hãy viết mẫu gợi mở dạng: "Nếu câu '...' bạn thử thêm hình ảnh so sánh chiếc gương soi hay dùng từ láy 'lăn tăn', 'lấp loáng', câu văn sẽ lung linh hơn nhiều đấy! Bạn hãy thử viết lại nhé!"
5. GỢI Ý BÀY TỎ CẢM XÚC:
   - Nhắc nhở cách lồng ghép tình cảm của người viết vào cảnh (yêu mến, gắn bó, kỷ niệm tuổi thơ, lòng biết ơn dòng nước quê hương).
6. ĐỐI CHIẾU NHANH THEO YÊU CẦU CẦN ĐẠT LỚP 5:
   - Đã đủ 3 phần (Mở bài - Thân bài - Kết bài) chưa?
   - Độ dài ước lượng đã đạt khoảng 200 - 250 chữ chưa?
   - Đã có góc nhìn xa - gần, đa giác quan chưa?
   - Có biện pháp so sánh, nhân hóa chưa?

QUY TẮC BẮT BUỘC:
- TUYỆT ĐỐI KHÔNG CHẤM ĐIỂM SỐ (không cho 7 điểm, 8 điểm hay bất kỳ con số nào).
- TUYỆT ĐỐI KHÔNG VIẾT THÀNH ĐOẠN VĂN, BÀI VĂN HOÀN CHỈNH.

Định dạng trả về dưới dạng JSON cấu trúc sau:
{
  "transcribedText": "Đoạn văn bản được trích xuất từ ảnh hoặc bài làm (nếu có)",
  "praisePoints": [
    "Điểm sáng 1...",
    "Điểm sáng 2..."
  ],
  "correctionFeedback": {
    "spelling": ["Góp ý chính tả nếu có..."],
    "wordChoice": ["Góp ý về từ ngữ, lặp từ..."],
    "sentenceStructure": ["Góp ý về cấu trúc câu, diễn đạt..."]
  },
  "upgradeSuggestions": [
    {
      "originalSentence": "Câu văn gốc trong bài",
      "hint": "Lời gợi ý ôn tồn của Hạt mầm",
      "guidingQuestions": "Câu hỏi gợi mở cho học sinh tự nghĩ",
      "recommendedWords": ["từ láy 1", "tính từ 2", "hình ảnh gợi ý 3"]
    }
  ],
  "emotionTips": "Lời khuyên ôn tồn về cách lồng cảm xúc vào bài",
  "gdptChecklist": {
    "structure": "Nhận xét về 3 phần (Mở bài, Thân bài, Kết bài)",
    "sensoryDetails": "Nhận xét về các giác quan đã dùng",
    "figurativeDevices": "Nhận xét về so sánh, nhân hóa",
    "wordCountEstimate": "Ước lượng độ dài và lời nhắc"
  },
  "encouragementMessage": "Lời nhắn nhủ thân thương, ấm áp của Hạt mầm văn chương gửi đến bạn nhỏ"
}`;

    const parts: any[] = [];

    if (image) {
      // Clean base64 header if present
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: base64Data,
        },
      });
    }

    if (content) {
      parts.push({
        text: `Nội dung bài viết học sinh nhập vào:\n"""\n${content}\n"""\n\n${promptText}`,
      });
    } else {
      parts.push({
        text: `Dưới đây là ảnh chụp bài viết tay của học sinh. Hãy đọc chữ viết tay và thực hiện phân tích:\n${promptText}`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction: HAT_MAM_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Fallback if formatting contains markdown backticks
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error analyzing essay:', error);
    res.status(500).json({
      error: 'Hạt mầm gặp chút trục trặc khi đọc bài làm. Bạn vui lòng thử lại nhé!',
      details: error?.message,
    });
  }
});

// Endpoint 2: Interactive conversation with Hạt mầm văn chương
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Thiếu lịch sử trò chuyện.' });
    }

    const contextNote = context
      ? `\n[Bối cảnh hiện tại của học sinh: Đang tìm hiểu về "${context.sceneType || 'Cảnh nước sông hồ biển'}", chủ đề/bước: "${context.currentStep || 'Tự do'}"]`
      : '';

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: HAT_MAM_PERSONA + contextNote + `
LƯU Ý KHI TRẢ LỜI:
- Trả lời bằng tiếng Việt trong sáng, câu từ thân mật, giàu hình ảnh.
- Luôn đặt câu hỏi để gợi mở trí tưởng tượng cho bạn nhỏ.
- Cung cấp từ láy, từ gợi tả, hình ảnh so sánh/nhân hóa đắt giá.
- TUYỆT ĐỐI KHÔNG CHẤM ĐIỂM SỐ VÀ KHÔNG VIẾT HỘ NGUYÊN ĐOẠN/BÀI VĂN.`,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Hạt mầm đang tạm suy nghĩ một chút, bạn thử gửi lại tin nhắn nhé!',
      details: error?.message,
    });
  }
});

// Endpoint 3: Spark ideas for specific parts
app.post('/api/spark-ideas', async (req: Request, res: Response) => {
  try {
    const { sceneName, sceneType, sectionType } = req.body;

    const prompt = `Bạn là Hạt mầm văn chương. Hãy đưa ra gợi ý tìm ý, quan sát 5 giác quan và từ ngữ nghệ thuật cho một bạn học sinh lớp 5:
- Tên cảnh: ${sceneName || 'Con sông quê em'}
- Loại cảnh: ${sceneType || 'Dòng sông'}
- Phần muốn tìm ý: ${sectionType || 'Tất cả'}

Hãy trả về định dạng JSON với cấu trúc:
{
  "guidingQuestions": [
    "Câu hỏi 1 để bạn nhỏ quan sát...",
    "Câu hỏi 2 về âm thanh hoặc mùi hương...",
    "Câu hỏi 3 về thời gian hoặc con người..."
  ],
  "sensoryKeywords": {
    "sight": ["từ miêu tả màu sắc, hình dáng 1", "từ 2", "từ 3"],
    "sound": ["từ tượng thanh 1", "từ 2"],
    "scent": ["từ khứu giác 1", "từ 2"],
    "touch": ["từ cảm giác xúc giác 1", "từ 2"]
  },
  "figurativeIdeas": {
    "similes": ["Hình ảnh so sánh 1 (ví như...)", "Hình ảnh so sánh 2"],
    "personifications": ["Ý tưởng nhân hóa 1 (dòng sông như người mẹ...)", "Ý tưởng 2"]
  },
  "openingHooks": [
    "Gợi ý câu ca dao/thơ hoặc cách vào bài gián tiếp 1",
    "Gợi ý cách vào bài gián tiếp 2"
  ],
  "endingHooks": [
    "Gợi ý liên tưởng tình cảm và việc làm thiết thực bảo vệ cảnh đẹp 1",
    "Gợi ý 2"
  ]
}
Chỉ trả về JSON hợp lệ. Không viết thành cả đoạn văn hoàn chỉnh.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: HAT_MAM_PERSONA,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Spark ideas error:', error);
    res.status(500).json({ error: 'Chưa thể tải gợi ý lúc này.', details: error?.message });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🌿 Hạt mầm văn chương server is running on http://0.0.0.0:${port}`);
  });
}

startServer();
