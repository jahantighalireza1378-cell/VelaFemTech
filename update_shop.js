const fs = require('fs');
const path = require('path');

const shopPageContent = `'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function BuilderPage() {
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);

  // داده‌های محصولات (ماک)
  const products = [
    {
      id: 1,
      title: "پکیج پایه (Essential)",
      price: "۱۸۹,۰۰۰ تومان",
      features: [
        { text: "۱۰ عدد نوار بهداشتی ارگانیک", included: true },
        { text: "۵ عدد تامپون سایز مخلوط", included: true },
        { text: "دمنوش آرامش‌بخش", included: false },
        { text: "شکلات تلخ ۷۰٪", included: false },
      ]
    },
    {
      id: 2,
      title: "پکیج آسایش (Comfort)",
      price: "۲۹۵,۰۰۰ تومان",
      isRecommended: true,
      features: [
        { text: "۱۵ عدد نوار بهداشتی ارگانیک", included: true },
        { text: "۱۰ عدد تامپون اپلیکاتوردار", included: true },
        { text: "بسته دمنوش زعفران و گل‌گاوزبان", included: true },
        { text: "شکلات تلخ بلژیکی", included: true },
      ]
    },
    {
      id: 3,
      title: "پکیج رویال (Royal VELA)",
      price: "۵۵۰,۰۰۰ تومان",
      isLuxury: true,
      features: [
        { text: "پکیج کامل بهداشتی (نامحدود)", included: true },
        { text: "روغن ماساژ گیاهی", included: true },
        { text: "شمع معطر دست‌ساز", included: true },
        { text: "اکسسوری سورپرایز ماهانه", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif text-vela-navy mb-4 text-center font-bold">
            {dates ? 'انتخاب پکیج ماهانه' : 'تنظیم تقویم هوشمند'}
          </h1>
          <p className="text-gray-500 max-w-lg text-center text-lg">
            {dates 
              ? 'بر اساس چرخه شما، بسته بعدی در تاریخ ' + new Date(dates.dispatchDate).toLocaleDateString('fa-IR') + ' ارسال می‌شود.'
              : 'برای شروع، تاریخ آخرین پریود خود را در ماشین حساب وارد کنید.'}
          </p>
        </div>

        {/* مرحله ۱: ماشین حساب */}
        <div className={\`transition-all duration-500 \${dates ? 'opacity-50 scale-95 pointer-events-none hidden md:block' : 'opacity-100'}\`}>
           {!dates && <CycleCalculator language="FA" onDateSelected={setDates} />}
        </div>

        {/* مرحله ۲: نمایش محصولات (فقط بعد از محاسبه ظاهر می‌شود) */}
        {dates && (
          <div className="animate-fade-in-up space-y-12 mt-8">
            
            {/* دکمه بازگشت */}
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-8">
              <ArrowRight size={16} />
              <span>بازگشت به تقویم و اصلاح تاریخ</span>
            </button>

            {/* سوییچ محیط زیست */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <EcoToggle language="FA" onToggle={setIsEco} />
              </div>
            </div>

            {/* کارت‌های محصول */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title}
                    price={product.price}
                    imageSrc=""
                    features={product.features}
                    isRecommended={product.isRecommended}
                    isLuxury={product.isLuxury}
                    onSelect={() => alert(\`شما پکیج \${product.title} را انتخاب کردید.\\n(اتصال به درگاه پرداخت در مرحله بعد...)\`)}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center text-gray-400 text-sm mt-12">
              <ShoppingBag className="inline-block mb-1 mx-1" size={14}/>
              همه پکیج‌ها شامل ارسال رایگان در تاریخ‌های محاسبه شده هستند.
            </div>

          </div>
        )}
      </div>
    </div>
  );
}`;

const targetPath = path.join(__dirname, 'src/app/box-builder/page.tsx');
fs.writeFileSync(targetPath, shopPageContent);
console.log("✅ فروشگاه به صفحه اضافه شد!");