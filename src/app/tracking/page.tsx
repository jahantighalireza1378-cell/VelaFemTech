'use client';

import Header from '@/components/layout/Header';
import { useState } from 'react';
import { Search, PackageCheck, AlertCircle } from 'lucide-react';

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<any>(null);

  const checkOrder = () => {
    // شبیه‌سازی سیستم پیگیری
    if (code.toUpperCase().startsWith('VELA')) {
      setStatus({ success: true, msg: 'سفارش در مرحله آماده‌سازی و بسته‌بندی است.', date: '۱۴۰۳/۱۰/۲۴' });
    } else {
      setStatus({ success: false, msg: 'کد سفارش یافت نشد. لطفاً دوباره بررسی کنید.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <Header />
      <div className="max-w-md mx-auto mt-20 px-6 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-4">پیگیری سفارش</h1>
        <p className="text-gray-500 mb-8">کد پیگیری (مثل VELA-1234) را وارد کنید</p>
        
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2 mb-8">
          <input 
            type="text" 
            placeholder="کد سفارش..." 
            className="flex-1 px-4 py-3 outline-none text-left font-mono uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={checkOrder} className="bg-[#1A2A3A] text-white p-3 rounded-lg hover:bg-[#D4AF37] transition-colors">
            <Search size={20}/>
          </button>
        </div>

        {status && (
          <div className={`p-6 rounded-2xl border ${status.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex flex-col items-center gap-3">
              {status.success ? <PackageCheck size={40} className="text-green-600"/> : <AlertCircle size={40} className="text-red-600"/>}
              <h3 className={`font-bold ${status.success ? 'text-green-800' : 'text-red-800'}`}>
                {status.success ? 'سفارش پیدا شد' : 'خطا'}
              </h3>
              <p className="text-sm text-gray-600">{status.msg}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}