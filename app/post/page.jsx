export default function PostPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Đăng bán hải sản</h1>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Bạn muốn bán gì?</label>
          <input type="text" placeholder="VD: Cá Thu, Mực Lá..." className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-400 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Giá bán (VNĐ)</label>
            <input type="number" placeholder="0" className="w-full p-2 border rounded outline-none" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Đơn vị</label>
             <select className="w-full p-2 border rounded outline-none bg-white">
               <option>kg</option>
               <option>con</option>
               <option>giỏ</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sản lượng (kg/con)</label>
            <input type="number" className="w-full p-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giờ cập bến (ETA)</label>
            <input type="time" className="w-full p-2 border rounded outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hình ảnh mô tả</label>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded bg-gray-50 cursor-pointer hover:bg-gray-100">
            <p className="text-gray-500">Bấm để tải ảnh lên</p>
          </div>
        </div>

        <button className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition">
          ĐĂNG TIN NGAY
        </button>
      </form>
    </div>
  );
}