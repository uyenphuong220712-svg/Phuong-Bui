import os
import streamlit as st
import google.generativeai as genai
from PIL import Image

# 1. Cấu hình giao diện trang web
st.set_page_config(
    page_title="Góc Văn Sáng Tạo - Hỗ Trợ Viết Văn Tả Cảnh",
    page_icon="✍️",
    layout="centered"
)

st.title("✍️ Góc Văn Sáng Tạo")
st.caption("Trợ lý AI đồng hành hỗ trợ học sinh lập dàn ý, tìm từ ngữ & nhận xét bài văn tả cảnh.")

# 2. Xử lý API Key (Đọc từ Streamlit Secrets hoặc cho phép nhập tay ở Sidebar)
api_key = st.secrets.get("GEMINI_API_KEY") if "GEMINI_API_KEY" in st.secrets else None

if not api_key:
    api_key = st.sidebar.text_input("🔑 Nhập Gemini API Key của bạn:", type="password")
    st.sidebar.markdown("[👉 Bấm vào đây để lấy API Key miễn phí từ Google AI Studio](https://aistudio.google.com/app/apikey)")

if not api_key:
    st.info("👈 Vui lòng cấu hình GEMINI_API_KEY trong Streamlit Secrets hoặc nhập API Key ở thanh bên trái để bắt đầu.")
    st.stop()

# 3. Khởi tạo Gemini Model với System Instructions
genai.configure(api_key=api_key)

system_instruction = """
Bạn là "Góc Văn Sáng Tạo" - một người bạn đồng hành thân thiện, nhiệt tình giúp học sinh tiểu học và trung học cơ sở học tốt môn Viết văn tả cảnh.

MỤC TIÊU CỦA BẠN:
1. Hướng dẫn học sinh tìm ý, lập dàn ý, mở rộng vốn từ miêu tả (màu sắc, âm thanh, hình ảnh, cảm xúc).
2. Tăng cường gợi ý các biện pháp nghệ thuật: So sánh, Nhân hóa, Liên tưởng độc đáo.
3. Nhận xét và chấm bài làm của học sinh (qua tin nhắn chữ hoặc hình ảnh chụp bài viết).

QUY TRÌNH HỖ TRỢ HỌC SINH:
TRƯỜNG HỢP 1: Học sinh xin gợi ý / lập dàn ý / tìm từ ngữ
- Không viết bài làm hoàn chỉnh thay học sinh.
- Đặt câu hỏi gợi mở để học sinh tự tưởng tượng (Ví dụ: "Em thấy bầu trời lúc đó có màu gì? Giống như chiếc áo của ai?").
- Đưa ra 3-4 lựa chọn từ ngữ đắt giá, 2-3 hình ảnh so sánh/nhân hóa mẫu để học sinh tham khảo.

TRƯỜNG HỢP 2: Học sinh gửi bài làm (dạng chữ hoặc hình ảnh chụp)
- Bước 1: Đọc kỹ bài làm (chuyển ảnh chụp thành chữ nếu là hình ảnh).
- Bước 2: Khen ngợi cụ thể 1-2 câu văn hoặc hình ảnh miêu tả hay nhất mà học sinh đã viết.
- Bước 3: Chỉ ra các điểm cần chỉnh sửa (Lỗi chính tả, lặp từ, câu chưa rõ ý).
- Bước 4: Đưa ra gợi ý nâng cấp (Ví dụ: "Nếu câu này em thêm một hình ảnh so sánh như... thì đoạn văn sẽ sinh động hơn rất nhiều!").

PHONG CÁCH GIAO TIẾP:
- Nhẹ nhàng, dùng các từ ngữ thân thiện ("chào em", "bạn nhỏ", "cùng thử nhé").
- Trình bày ngắn gọn, dùng các biểu tượng cảm xúc (emoji) để bài viết sinh động, dễ đọc.
"""

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=system_instruction
)

# 4. Khởi tạo lịch sử trò chuyện
if "messages" not in st.session_state:
    st.session_state.messages = []

# Hiển thị các tin nhắn cũ
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if "image" in msg and msg["image"] is not None:
            st.image(msg["image"], caption="Ảnh bài làm đã gửi", width=250)

# 5. Tải ảnh bài làm (Tuỳ chọn)
uploaded_file = st.file_uploader("📸 Tải lên ảnh chụp bài làm (nếu muốn AI đọc và nhận xét):", type=["jpg", "jpeg", "png"])
image_input = None
if uploaded_file is not None:
    image_input = Image.open(uploaded_file)
    st.image(image_input, caption="Ảnh bài làm bạn đã chọn", use_container_width=True)

# 6. Khung nhập tin nhắn từ học sinh
if user_prompt := st.chat_input("Nhập câu hỏi hoặc yêu cầu hỗ trợ viết văn tại đây..."):
    user_msg = {"role": "user", "content": user_prompt}
    if image_input:
        user_msg["image"] = image_input
    st.session_state.messages.append(user_msg)

    with st.chat_message("user"):
        st.markdown(user_prompt)
        if image_input:
            st.image(image_input, caption="Ảnh bài làm đã gửi", width=250)

    with st.chat_message("assistant"):
        with st.spinner("Góc Văn Sáng Tạo đang suy nghĩ..."):
            try:
                inputs = []
                if image_input:
                    inputs.append(image_input)
                inputs.append(user_prompt)

                response = model.generate_content(inputs)
                st.markdown(response.text)

                st.session_state.messages.append({"role": "assistant", "content": response.text})
            except Exception as e:
                st.error(f"Đã xảy ra lỗi kết nối: {e}")