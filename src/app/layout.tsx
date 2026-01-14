import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer"; // 👈 اضافه شد

export const metadata: Metadata = {
  title: "VELA | Sail Through It",
  description: "فروشگاه اختصاصی محصولات پریود و بهداشت بانوان",
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex flex-col min-h-screen"> 
        <main className="flex-grow">
          {children}
        </main>
        <Footer /> {/* 👈 اضافه شد: حالا در تمام صفحات دیده می‌شود */}
      </body>
    </html>
  );
}