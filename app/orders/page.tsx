export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Đơn hàng của tôi</h1>
      
      {/* Danh sách đơn hàng giả lập */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50">
            <div>
              <p className="font-bold">Đơn hàng #{1000 + item}</p>
              <p className="text-sm text-gray-500">Cá Thu Phấn - 5kg</p>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Đang vận chuyển</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-red-600">900.000 đ</p>
              <p className="text-xs text-gray-400">10:30 - 05/12/2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}