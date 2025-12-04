export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Đăng nhập</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-900 outline-none" placeholder="09xxxxxxx" />
        </div>
        <button className="w-full bg-blue-900 text-white font-bold py-2 rounded hover:bg-blue-800">
          Gửi mã OTP
        </button>
      </form>
    </div>
  );
}