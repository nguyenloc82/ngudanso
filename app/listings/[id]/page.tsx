'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaShip, FaMapMarkerAlt, FaComments, FaPhoneAlt, FaTimes } from 'react-icons/fa';

export default function ListingDetail() {
  const params = useParams();
  const id = params?.id || 'Đang tải...';

  // --- STATE QUẢN LÝ ---
  const [isChatOpen, setIsChatOpen] = useState(false); // Bật tắt Chat
  const [isMapOpen, setIsMapOpen] = useState(false);   // Bật tắt Bản đồ
  
  // --- LOGIC CHAT (Giữ nguyên) ---
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'owner', text: `Chào bạn! Tàu BTH-9888 đang cách bờ khoảng 15 hải lý. Bạn cần giữ bao nhiêu kg?` }
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isChatOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userMsg = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setTimeout(() => {
      const replyMsg = { sender: 'owner', text: 'Ok chốt đơn! Tầm 10h sáng tàu cập bến tôi giao ngay cho tươi nhé.' };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Ảnh lớn */}
        <div className="bg-gray-200 h-80 md:h-full relative group">
          <img 
            src="https://images.unsplash.com/photo-1519783938466-231a47738cb2?auto=format&fit=crop&w=1000&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Product"
          />
          {/* Nút xem bản đồ trên ảnh */}
          <button 
            onClick={() => setIsMapOpen(true)}
            className="absolute bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition transform hover:scale-105"
          >
            <FaShip /> THEO DÕI VỊ TRÍ TÀU
          </button>
        </div>

        {/* Thông tin chi tiết */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Cá Thu Phấn tươi rói (Mã tin: {id})
            </h1>
            <p className="text-3xl font-bold text-red-600 mb-4">
              180.000 đ <span className="text-base font-normal text-gray-500">/ kg</span>
            </p>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span>Chủ tàu:</span>
                <span className="font-semibold text-black">Nguyễn Văn A (BTH-9888)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Cảng cập bến:</span>
                <span className="font-semibold text-black">Cảng Phan Thiết</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Thời gian dự kiến (ETA):</span>
                <span className="font-semibold text-green-600">10:00 Sáng nay</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Trạng thái:</span>
                <span className="font-bold text-blue-600 flex items-center gap-1">
                  <FaShip className="animate-pulse"/> Đang chạy về bờ
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 italic border-l-4 border-gray-300 pl-3">
              "Cá đánh bắt lưới cước trong đêm, đảm bảo tươi xanh. Xem vị trí tàu để biết hàng đang về!"
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="tel:0901234567" className="flex-1 bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 shadow flex items-center justify-center gap-2 no-underline">
              <FaPhoneAlt /> GỌI ĐIỆN
            </a>
            <button onClick={() => setIsChatOpen(true)} className="flex-1 border-2 border-blue-900 text-blue-900 font-bold py-3 rounded hover:bg-blue-50 flex items-center justify-center gap-2">
              <FaComments /> CHAT NGAY
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL BẢN ĐỒ (Tracking) --- */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-orange-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FaShip /> HÀNH TRÌNH TÀU BTH-9888
              </h3>
              <button onClick={() => setIsMapOpen(false)} className="text-white hover:text-gray-200">
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="relative h-[400px] bg-gray-100">
              {/* Google Maps Embed (Giả lập vị trí ngoài khơi Phan Thiết) */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src="https://maps.google.com/maps?q=10.90,108.15&z=13&output=embed"
                className="opacity-90"
              ></iframe>

              {/* Thông số lớp phủ */}
              <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-md text-sm border border-orange-500 backdrop-blur-sm">
                <p className="font-bold text-blue-900">Vị trí hiện tại:</p>
                <p>10°54'00"N - 108°09'00"E</p>
                <hr className="my-2"/>
                <p>🏁 Tốc độ: <span className="font-bold text-orange-600">12 hải lý/h</span></p>
                <p>🌊 Sóng: <span className="font-bold text-blue-600">Cấp 3 (Êm)</span></p>
                <p>⏳ Dự kiến cập bến: <span className="font-bold text-green-600">1h 30p nữa</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CHAT --- */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">A</div>
                <div>
                  <h3 className="font-bold text-sm">Chủ tàu: Nguyễn Văn A</h3>
                  <p className="text-xs text-green-300">● Đang hoạt động</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-2xl hover:text-gray-300">&times;</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none border'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-blue-600"/>
              <button type="submit" className="bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-800">➤</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}