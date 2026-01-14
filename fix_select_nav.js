const fs = require('fs');
const path = require('path');

const files = {
  // ۱. آپدیت کارت محصول (ProductCard) برای دریافت متن دکمه از بیرون
  "src/components/features/ProductCard.tsx": `'use client';
import { Check, Star, Crown } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  features: Feature[];
  isRecommended?: boolean;
  isLuxury?: boolean;
  onSelect: () => void;
  actionLabel: string; // متن دکمه که حالا داینامیک شده
}

export default function ProductCard({ 
  title, price, features, isRecommended, isLuxury, onSelect, actionLabel 
}: ProductCardProps) {
  return (
    <div className={\`relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 hover:scale-105 \${isLuxury ? 'bg-vela-navy text-white shadow-2xl border border-vela-gold' : isRecommended ? 'bg-white shadow-xl border-2 border-vela-gold relative z-10' : 'bg-white/60 shadow-lg border border-white'}\`}>
      
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-gold text-vela-navy px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
          <Star size={14} fill="currentColor" />
          <span>محبوب‌ترین / Popular</span>
        </div>
      )}

      {isLuxury && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-navy border border-vela-gold text-vela-gold px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
          <Crown size={14} fill="currentColor" />
          <span>لوکس / Luxury</span>
        </div>
      )}

      <div className="text-center mb-6 mt-4">
        <h3 className="text-xl font-serif font-bold mb-2 opacity-90">{title}</h3>
        <div className="text-3xl font-bold font-sans">{price}</div>
        {isLuxury && <div className="text-xs text-vela-gold mt-1 opacity-80">ماهانه / Monthly</div>}
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <div className={\`mt-1 min-w-[18px] \${feature.included ? (isLuxury ? 'text-vela-gold' : 'text-green-500') : 'text-gray-300'}\`}>
              <Check size={18} className={feature.included ? '' : 'opacity-0'} />
            </div>
            <span className={feature.included ? 'opacity-90' : 'opacity-40 decoration-slice line-through'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={\`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 \${isLuxury ? 'bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-vela-navy text-white hover:bg-vela-navy/90'}\`}
      >
        {actionLabel}
      </button>
    </div>
  );
}`,

  // ۲. آپدیت صفحه طراحی (Box Builder) برای ترجمه دکمه و هدایت به صفحه بعد
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation'; // برای تغییر صفحه

export default function BuilderPage() {
  const router = useRouter(); // فعال‌سازی روتر
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    const checkLang = () => {
      const saved = localStorage.getItem('vela-lang') || 'FA';
      if (saved !== lang) setLang(saved);
    };
    checkLang();
    const interval = setInterval(checkLang, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t: any = {
    FA: {
      title: 'تنظیم تقویم هوشمند', selectTitle: 'انتخاب پکیج ماهانه', desc_init: 'برای شروع، تاریخ آخرین پریود خود را وارد کنید.',
      desc_date: 'بر اساس چرخه شما، بسته بعدی در تاریخ {date} ارسال می‌شود.', back: 'بازگشت', shipping: 'ارسال رایگان به سراسر ایران',
      btnPrefix: 'انتخاب', // پیشوند دکمه
      btnSuffix: '',       // پسوند دکمه
      features: {
        p1: ["۱۰ عدد نوار بهداشتی ارگانیک", "۵ عدد تامپون سایز مخلوط"],
        p2: ["۱۵ عدد نوار بهداشتی ارگانیک", "۱۰ عدد تامپون اپلیکاتوردار", "دمنوش مخصوص VELA", "شکلات تلخ ۷۰٪"],
        p3: ["پکیج کامل بهداشتی (نامحدود)", "روغن ماساژ گیاهی", "شمع معطر دست‌ساز", "اکسسوری سورپرایز ماهانه"]
      }
    },
    EN: {
      title: 'Smart Cycle Calendar', selectTitle: 'Select Your Package', desc_init: 'Enter last period date.',
      desc_date: 'Next dispatch date: {date}.', back: 'Back', shipping: 'Free Shipping',
      btnPrefix: 'Select', 
      btnSuffix: '',
      features: {
        p1: ["10x Organic Pads", "5x Mixed Tampons"],
        p2: ["15x Organic Pads", "10x Applicator Tampons", "VELA Herbal Tea", "Dark Chocolate 70%"],
        p3: ["Full Sanitary Kit (Unlimited)", "Herbal Massage Oil", "Handmade Scented Candle", "Monthly Surprise Accessory"]
      }
    },
    TR: {
      title: 'Akıllı Döngü Takvimi', selectTitle: 'Paketini Seç', desc_init: 'Son regl tarihini girin.',
      desc_date: 'Sonraki gönderim: {date}.', back: 'Geri', shipping: 'Ücretsiz Kargo',
      btnPrefix: '',      // در ترکی فعل آخر می‌آید
      btnSuffix: 'Seç',
      features: {
        p1: ["10x Organik Ped", "5x Karışık Tampon"],
        p2: ["15x Organik Ped", "10x Aplikatörlü Tampon", "VELA Bitki Çayı", "Bitter Çikolata %70"],
        p3: ["Tam Hijyen Seti (Sınırsız)", "Bitkisel Masaj Yağı", "El Yapımı Kokulu Mum", "Aylık Sürpriz Aksesuar"]
      }
    },
    RU: {
      title: 'Умный календарь', selectTitle: 'Выберите бокс', desc_init: 'Введите дату последних месячных.',
      desc_date: 'Дата следующей отправки: {date}.', back: 'Назад', shipping: 'Бесплатная доставка',
      btnPrefix: 'Выбрать',
      btnSuffix: '',
      features: {
        p1: ["10x Органических прокладок", "5x Тампонов"],
        p2: ["15x Органических прокладок", "10x Тампонов", "Травяной чай VELA", "Темный шоколад 70%"],
        p3: ["Полный гигиенический набор", "Массажное масло", "Ароматическая свеча", "Сюрприз аксессуар"]
      }
    }
  };

  const text = t[lang] || t.FA;
  const f = text.features;
  const getPrice = (toman: string, lira: string) => lang === 'FA' ? \`\${toman} تومان\` : \`\${lira} TL\`;

  // ساخت متن دکمه بر اساس زبان (مثلاً: Select Care یا Care Seç)
  const getButtonLabel = (name: string) => {
    if (lang === 'TR') return \`\${name} \${text.btnSuffix}\`; // ترکی: Care Seç
    return \`\${text.btnPrefix} \${name}\`; // بقیه: Select Care
  };

  const products = [
    { id: 1, title: "Essential", price: getPrice("۲۸۵,۰۰۰", "249"), features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] },
    { id: 2, title: "Care", price: getPrice("۵۸۰,۰۰۰", "490"), isRecommended: true, features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] },
    { id: 3, title: "Bliss", price: getPrice("۱,۲۵۰,۰۰۰", "950"), isLuxury: true, features: [{text:f.p3[0],included:true}, {text:f.p3[1],included:true}, {text:f.p3[2],included:true}, {text:f.p3[3],included:true}] }
  ];

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'FA' ? 'fa-IR' : lang === 'TR' ? 'tr-TR' : 'en-US');

  // تابع انتخاب محصول و رفتن به صفحه پرداخت
  const handleSelectProduct = (product: any) => {
    // ذخیره در localStorage برای دسترسی در صفحه بعد
    localStorage.setItem('vela-cart', JSON.stringify({
        ...product,
        dispatchDate: dates.dispatchDate,
        isEco: isEco
    }));
    
    // هدایت به صفحه پرداخت
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif text-vela-navy mb-4 text-center font-bold">{dates ? text.selectTitle : text.title}</h1>
          <p className="text-gray-500 max-w-lg text-center text-lg">{dates ? text.desc_date.replace('{date}', formatDate(dates.dispatchDate)) : text.desc_init}</p>
        </div>
        <div className={\`transition-all duration-500 \${dates ? 'hidden md:block opacity-50' : ''}\`}>
           {!dates && <CycleCalculator language={lang} onDateSelected={setDates} />}
        </div>
        {dates && (
          <div className="animate-fade-in-up space-y-12 mt-8">
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-8">
              <ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span>
            </button>
            <div className="flex justify-center"><EcoToggle language={lang} onToggle={setIsEco} /></div>
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
                    actionLabel={getButtonLabel(product.title)} // ارسال متن ترجمه شده
                    onSelect={() => handleSelectProduct(product)} // فعال شدن دکمه
                  />
                </div>
              ))}
            </div>
            <div className="text-center text-gray-400 text-sm mt-12"><ShoppingBag className="inline-block mb-1 mx-1" size={14}/>{text.shipping}</div>
          </div>
        )}
      </div>
    </div>
  );
}`,

  // ۳. ساخت صفحه پرداخت (Checkout) خالی برای اینکه سایت ارور ندهد
  "src/app/checkout/page.tsx": `'use client';
import Header from '@/components/layout/Header';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-serif text-vela-navy">صفحه پرداخت / Checkout Page</h1>
      </div>
    </div>
  );
}`
};

console.log("🛠 در حال تعمیر دکمه‌ها و ساخت مسیر پرداخت...");
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ تعمیر انجام شد! دکمه‌ها ترجمه شدند و لینک کار می‌کند.");