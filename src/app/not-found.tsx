'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-serif font-bold text-[#D4AF37]/20">404</h1>
      <h2 className="text-3xl font-bold text-[#1A2A3A] mt-4">مسیر را گم کرده‌اید؟</h2>
      <p className="text-gray-500 mt-4 mb-8 max-w-md">
        متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
      </p>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 px-8 py-4 bg-[#1A2A3A] text-white rounded-xl font-bold hover:bg-[#D4AF37] transition-all"
      >
        <Home size={20}/> بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}