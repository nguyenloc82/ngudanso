export default function ListingDetail({ params }) {
  // Vì chưa có Backend, ta hard-code hiển thị giả
  // Trong thực tế sẽ dùng params.id để gọi API lấy dữ liệu chi tiết
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Ảnh lớn */}
        <div className="bg-gray-200 h-80 md:h-full relative">
          <img 
            src="https://images.unsplash.com/photo-1519783938466-231a47738cb2?auto=format&fit=crop&w=1000&q=80" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Product"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cá Thu Phấn tươi rói vừa cập bến (Minh họa)</h1>
            <p className="text-3xl font-bold text-red-600 mb-4">180.000 đ <span className="text-base font-normal text-gray-500">/ kg</span></p>
            
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
                <span>Sẵn có:</span>
                <span className="font-semibold text-black">50 kg</span>
              </div>
            </div>
            
            <p className="text-gray-700 italic">"Cá đánh bắt lưới cước trong đêm, đảm bảo tươi xanh, không ướp urê. Anh chị em đặt gạch em để phần nhé!"</p>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 shadow">
              GỌI ĐIỆN NGAY
            </button>
            <button className="flex-1 border-2 border-green-600 text-green-600 font-bold py-3 rounded hover:bg-green-50">
              CHAT VỚI CHỦ TÀU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}