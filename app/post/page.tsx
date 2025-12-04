'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCamera, FaVideo, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

export default function PostPage() {
  const router = useRouter();

  // Danh sách cảng
  const PORTS = [
    "Cảng Phan Thiết (Bình Thuận)",
    "Cảng Phú Quý (Bình Thuận)",
    "Cảng La Gi (Bình Thuận)",
    "Cảng Cà Ná (Ninh Thuận)",
    "Cảng Nha Trang (Khánh Hòa)",
    "Cảng Vũng Tàu (Bà Rịa - Vũng Tàu)",
    "Cảng Quy Nhơn (Bình Định)",
    "Cảng Đà Nẵng",
    "Khác (Nhập tay...)"
  ];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    quantity: '',
    eta: '',
    port: PORTS[0],
  });

  // State quản lý file
  const [images, setImages] = useState<string[]>([]); // Lưu URL ảnh preview
  const [video, setVideo] = useState<string | null>(null); // Lưu URL video preview
  const [videoDuration, setVideoDuration] = useState(0);

  // Xử lý upload ảnh (Yêu cầu ít nhất 3 ảnh)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => URL.createObjectURL(file));
      
      // Cộng dồn ảnh cũ + ảnh mới
      setImages(prev => [...prev, ...newImages]);
    }
  };

  // Xử lý upload video (Yêu cầu > 5s)
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo phần tử video ảo để kiểm tra thời lượng
      const videoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        if (duration < 5) {
          alert(`Video quá ngắn (${duration.toFixed(1)}s). Vui lòng tải video trên 5 giây để chứng minh hoạt động đánh bắt thật.`);
          setVideo(null);
        } else {
          setVideo(videoUrl);
          setVideoDuration(duration);
        }
      };
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDATION: Kiểm tra đủ điều kiện chưa
    if (images.length < 3) {
      alert("⚠️ YÊU CẦU: Vui lòng tải lên ít nhất 3 hình ảnh chụp thực tế tại tàu.");
      return;
    }
    if (!video) {
      alert("⚠️ YÊU CẦU: Vui lòng tải lên 1 video quay cảnh đánh bắt (trên 5 giây).");
      return;
    }

    // Tạo tin đăng
    const newItem = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      unit: formData.unit,
      boat: 'Tàu Của Bạn (BTH-9999)',
      port: formData.port,
      eta: formData.eta || 'Mới cập nhật',
      // Trong thực tế sẽ upload file lên server. Ở đây ta dùng ảnh đầu tiên làm ảnh đại diện
      image: images[0] || 'https://via.placeholder.com/400', 
    };

    // Lưu vào LocalStorage
    const existingData = JSON.parse(localStorage.getItem('myListings') || '[]');
    const newData = [newItem, ...existingData];
    localStorage.setItem('myListings', JSON.stringify(newData));

    alert('✅ Đăng tin thành công! Tin của bạn đã được xác thực hình ảnh & video.');
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-100">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">Đăng Bán Hải Sản</h1>
      <p className="text-center text-gray-500 mb-8 text-sm">Vui lòng cung cấp hình ảnh & video thực tế để được duyệt nhanh hơn.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- KHU VỰC UPLOAD ẢNH & VIDEO (MỚI) --- */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            1. Hình ảnh & Video xác thực <span className="text-red-500">*</span>
          </h3>
          
          {/* Nút Upload Ảnh */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hình ảnh đánh bắt (Tối thiểu 3 tấm)</label>
            <div className="flex flex-wrap gap-4">
              <label className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white transition text-gray-500 hover:text-blue-600">
                <FaCamera size={20} />
                <span className="text-xs mt-1">Thêm ảnh</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              {/* Preview Ảnh */}
              {images.map((img, index) => (
                <div key={index} className="w-24 h-24 relative rounded-lg overflow-hidden border border-gray-300 group">
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                    <FaTimes size={10} />
                  </button>
                  {/* Badge giả lập GPS */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] px-1 py-0.5 flex items-center gap-1 justify-center">
                    <FaMapMarkerAlt className="text-red-400" /> 10.9°N - 108.2°E
                  </div>
                </div>
              ))}
            </div>
            {images.length < 3 && (
              <p className="text-red-500 text-xs mt-1 italic">Bạn cần thêm {3 - images.length} ảnh nữa.</p>
            )}
          </div>

          {/* Nút Upload Video */}
          <div>
            <label className="block text-sm font-medium mb-1">Video quay tại tàu ({'>'} 5 giây)</label>
            {!video ? (
              <label className="w-full h-12 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white transition gap-2 text-gray-600">
                <FaVideo />
                <span>Tải video lên</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </label>
            ) : (
              <div className="relative w-full max-w-sm bg-black rounded-lg overflow-hidden">
                <video src={video} controls className="w-full h-40" />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
                  Đã xác thực: {videoDuration.toFixed(1)}s
                </div>
                <button type="button" onClick={() => setVideo(null)} className="absolute top-2 left-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                  <FaTimes size={12}/>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- FORM NHẬP LIỆU (NHƯ CŨ) --- */}
        <div>
          <label className="block text-sm font-medium mb-1">Bạn muốn bán gì?</label>
          <input required type="text" placeholder="VD: Cá Thu, Mực Lá..." className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Giá bán (VNĐ)</label>
            <input required type="number" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Đơn vị</label>
             <select className="w-full p-2 border rounded outline-none bg-white" onChange={(e) => setFormData({...formData, unit: e.target.value})}>
               <option value="kg">kg</option>
               <option value="con">con</option>
               <option value="giỏ">giỏ</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sản lượng</label>
            <input type="text" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cảng cập bến</label>
            <select className="w-full p-2 border rounded outline-none bg-white focus:ring-2 focus:ring-blue-500"
              value={formData.port} onChange={(e) => setFormData({...formData, port: e.target.value})}>
              {PORTS.map((port) => <option key={port} value={port}>{port}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Giờ cập bến (ETA)</label>
          <input required type="time" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, eta: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition transform active:scale-95 shadow-md">
          ĐĂNG TIN NGAY
        </button>
      </form>
    </div>
  );
}