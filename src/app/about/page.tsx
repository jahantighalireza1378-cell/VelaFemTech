'use client';

import Header from '@/components/layout/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A2A3A] mb-8">Sail Through It.</h1>
        <div className="text-lg text-gray-600 leading-8 space-y-6 text-justify" dir="rtl">
          <p>
            داستان <strong>VELA</strong> از یک نیاز ساده شروع شد: چرا محصولات مراقبت از قاعدگی نمی‌توانند همزمان «باکیفیت»، «زیبا» و «شخصی‌سازی شده» باشند؟
          </p>
          <p>
            ما تیمی متشکل از جوانان ایرانی و ترک هستیم که با هدف تغییر نگاه به دوران پریود، گرد هم آمده‌ایم. ما باور داریم که هر زنی حق دارد در این دوران، نه تنها احساس راحتی، بلکه احساس ارزشمندی کند.
          </p>
          <p>
            پکیج‌های VELA فقط نوار بهداشتی نیستند؛ آن‌ها مجموعه‌ای از شکلات، دمنوش، کیسه آب گرم و اکسسوری‌های حال‌خوب‌کن هستند که دقیقاً بر اساس نیاز شما چیده شده‌اند.
          </p>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#D4AF37]/30 mt-12">
            <h3 className="text-xl font-bold text-[#D4AF37] mb-4">ماموریت ما</h3>
            <p>
              ساختن دنیایی که در آن هیچ زنی به خاطر پریود، از فعالیت‌های روزانه‌اش عقب نماند. ما اینجا هستیم تا طوفان را آرام کنیم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}