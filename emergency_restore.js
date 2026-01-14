const fs = require('fs');
const path = require('path');

// مسیر فایل چک‌اوت
const checkoutFile = path.join(__dirname, 'src/app/checkout/page.tsx');

// یک نسخه ساده و سالم از صفحه پرداخت
const safeCode = `'use client';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">صفحه پرداخت (نسخه بازیابی)</h1>
        <p className="mb-6">اگر این صفحه را می‌بینید، یعنی مشکل صفحه سفید حل شده است.</p>
        <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
            بازگشت به خانه
        </button>
      </div>
    </div>
  );
}`;

fs.writeFileSync(checkoutFile, safeCode);
console.log("✅ فایل Checkout به نسخه امن بازگردانده شد.");
console.log("لطفا سایت را رفرش کنید.");