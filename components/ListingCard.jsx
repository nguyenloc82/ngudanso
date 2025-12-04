import Link from 'next/link';

export default function ListingCard({ item }) {
  // Hàm định dạng tiền tệ
  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

  return (
    <Link href={`/listings/${item.id}`} className="block h-full">
      <div className="bg-white rounded border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        {/* Ảnh sản phẩm */}
        <div className="relative w-full pt-[66%] bg-gray-200">
          <img 
            src={item.image} 
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-t"
          />
        </div>
        
        {/* Thông tin */}
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {item.name}
          </h3>
          
          <div className="mt-auto">
            <p className="text-red-600 font-bold text-lg">
              {formatPrice(item.price)} đ/{item.unit}
            </p>
            
            <div className="flex justify-between items-end mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="bg-gray-100 px-1 rounded">🚢 {item.boat}</span>
              </div>
              <span>{item.eta}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">📍 {item.port}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}