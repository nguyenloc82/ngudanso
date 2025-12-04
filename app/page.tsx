'use client';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // 1. Import hook lấy tham số URL

// Dữ liệu mẫu
const DUMMY_DATA = [
  { id: 1, name: 'Cá Thu Phấn tươi rói vừa cập bến', price: 180000, unit: 'kg', boat: 'BTH-9888', port: 'Cảng Phan Thiết', eta: '10:00 hôm nay', image: 'https://images.unsplash.com/photo-1519783938466-231a47738cb2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Tôm Hùm Bông size lớn (2 con/kg)', price: 1250000, unit: 'kg', boat: 'PY-7766', port: 'Cảng Vũng Rô', eta: '14:30 chiều nay', image: 'https://images.unsplash.com/photo-1552528186-218274352724?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Mực Lá đại dương câu tay', price: 320000, unit: 'kg', boat: 'KH-1234', port: 'Cảng Nha Trang', eta: '08:00 sáng mai', image: 'https://images.unsplash.com/photo-1627660639088-724d2047589d?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Cá Ngừ Đại Dương nguyên con (40kg+)', price: 110000, unit: 'kg', boat: 'BĐ-5555', port: 'Cảng Quy Nhơn', eta: 'Đang cập bến', image: 'https://images.unsplash.com/photo-1587841315758-2947b746a5dc?auto=format&fit=crop&w=600&q=80' },
];

// Tạo component con để xử lý Search (để tránh lỗi Suspense khi build)
function SearchResults() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search'); // Lấy từ khóa từ URL
  const [listings, setListings] = useState(DUMMY_DATA);

  useEffect(() => {
    // 1. Lấy dữ liệu từ LocalStorage + Dữ liệu mẫu
    const savedListings = localStorage.getItem('myListings');
    let allData = DUMMY_DATA;
    
    if (savedListings) {
      const parsedData = JSON.parse(savedListings);
      allData = [...parsedData, ...DUMMY_DATA];
    }

    // 2. Nếu có từ khóa tìm kiếm -> Lọc dữ liệu
    if (searchKeyword) {
      const filtered = allData.filter((item: any) => 
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setListings(filtered);
    } else {
      // Nếu không tìm kiếm -> Hiển thị tất cả
      setListings(allData);
    }
  }, [searchKeyword]); // Chạy lại khi từ khóa thay đổi

  return (
    <div id="listings">
      <h3 className="font-bold text-lg mb-4 text-gray-700 flex items-center gap-2">
        {searchKeyword ? `Kết quả tìm kiếm: "${searchKeyword}"` : 'Tin đăng mới nhất'}
        
        {/* Chỉ hiện badge "Mới" khi không tìm kiếm */}
        {!searchKeyword && listings.length > DUMMY_DATA.length && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
            Có tin mới!
          </span>
        )}
      </h3>
      
      {listings.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((item: any) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>Không tìm thấy hải sản nào phù hợp.</p>
          <Link href="/" className="text-blue-600 underline mt-2 inline-block">Xem tất cả sản phẩm</Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-blue-900 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg">
        <div>
          <h2 className="text-xl font-bold">Chợ Hải Sản Đang Cập Bến</h2>
          <p className="text-sm opacity-90">Đặt trước ngay để có giá tốt nhất tại cảng!</p>
        </div>
        <Link href="/" className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300">
          Xem tất cả
        </Link>
      </div>

      {/* Bọc component tìm kiếm trong Suspense để tránh lỗi build */}
      <Suspense fallback={<p>Đang tải danh sách...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}