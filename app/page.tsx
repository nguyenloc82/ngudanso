import ListingCard from '@/components/ListingCard';
import Link from 'next/link'; // Import Link

// ... (Giữ nguyên phần DUMMY_DATA cũ của bạn) ...
const DUMMY_DATA = [
  { id: 1, name: 'Cá Thu Phấn tươi rói vừa cập bến', price: 180000, unit: 'kg', boat: 'BTH-9888', port: 'Cảng Phan Thiết', eta: '10:00 hôm nay', image: 'https://images.unsplash.com/photo-1519783938466-231a47738cb2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Tôm Hùm Bông size lớn (2 con/kg)', price: 1250000, unit: 'kg', boat: 'PY-7766', port: 'Cảng Vũng Rô', eta: '14:30 chiều nay', image: 'https://images.unsplash.com/photo-1552528186-218274352724?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Mực Lá đại dương câu tay', price: 320000, unit: 'kg', boat: 'KH-1234', port: 'Cảng Nha Trang', eta: '08:00 sáng mai', image: 'https://images.unsplash.com/photo-1627660639088-724d2047589d?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Cá Ngừ Đại Dương nguyên con (40kg+)', price: 110000, unit: 'kg', boat: 'BĐ-5555', port: 'Cảng Quy Nhơn', eta: 'Đang cập bến', image: 'https://images.unsplash.com/photo-1587841315758-2947b746a5dc?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Ghẹ Xanh loại 1 bao ăn', price: 450000, unit: 'kg', boat: 'VT-9999', port: 'Cảng Vũng Tàu', eta: '11:00 hôm nay', image: 'https://images.unsplash.com/photo-1583946258123-b684cb4dbd1a?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Bạch tuộc tươi sống nhúng giấm', price: 160000, unit: 'kg', boat: 'KG-1111', port: 'Cảng Rạch Giá', eta: '16:00 chiều nay', image: 'https://images.unsplash.com/photo-1597401309852-c322bdfd0446?auto=format&fit=crop&w=600&q=80' },
];

export default function Home() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-blue-900 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg">
        <div>
          <h2 className="text-xl font-bold">Chợ Hải Sản Đang Cập Bến</h2>
          <p className="text-sm opacity-90">Đặt trước ngay để có giá tốt nhất tại cảng!</p>
        </div>
        
        {/* SỬA NÚT NÀY: Dùng Link thay vì button */}
        <Link href="#listings" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300">
          Xem tất cả
        </Link>
      </div>

      {/* Thêm id="listings" để nút trên cuộn xuống đây */}
      <div id="listings">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Tin đăng mới nhất</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DUMMY_DATA.map(item => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}