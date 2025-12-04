'use client';
import Link from 'next/link';
import { FaSearch, FaShoppingBag, FaEdit, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-yellow-400 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO - Bấm vào quay về trang chủ */}
          <Link href="/" className="text-2xl font-black text-blue-900 tracking-tighter uppercase">
            Ngư Dân Số
          </Link>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-2xl hidden md:flex relative">
            <input 
              type="text" 
              placeholder="Tìm cá thu, mực lá, tôm hùm..." 
              className="w-full pl-4 pr-10 py-2 rounded shadow-sm outline-none focus:ring-2 focus:ring-blue-900"
            />
            <button 
              onClick={() => alert("Tính năng tìm kiếm đang phát triển!")}
              className="absolute right-1 top-1 p-1.5 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              <FaSearch />
            </button>
          </div>

          {/* ACTIONS - Đã sửa href="#" thành đường dẫn thật */}
          <div className="flex items-center gap-4 text-blue-900 font-bold text-sm">
            <Link href="/orders" className="flex items-center gap-1 hover:text-white transition hidden sm:flex">
              <FaShoppingBag className="text-xl"/> <span>Đơn hàng</span>
            </Link>
            
            <Link href="/login" className="flex items-center gap-1 hover:text-white transition hidden sm:flex">
              <FaUserCircle className="text-xl"/> <span>Tài khoản</span>
            </Link>
            
            <Link href="/post" className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 shadow-md transition-colors">
              <FaEdit /> <span>ĐĂNG BÁN</span>
            </Link>
          </div>
        </div>
        
        {/* MOBILE SEARCH */}
        <div className="mt-3 md:hidden relative">
          <input type="text" placeholder="Tìm kiếm..." className="w-full pl-4 pr-10 py-2 rounded text-sm outline-none"/>
          <FaSearch className="absolute right-3 top-2.5 text-gray-500"/>
        </div>
      </div>
    </header>
  );
}