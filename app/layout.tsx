import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ngư Dân Số - Chợ Hải Sản",
  description: "Sàn thương mại điện tử thủy hải sản",
};

// Thêm đoạn ": { children: React.ReactNode }" để sửa lỗi TypeScript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 min-h-screen flex flex-col font-sans text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}