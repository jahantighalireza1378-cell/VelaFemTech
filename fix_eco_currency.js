const fs = require('fs');
const path = require('path');

const files = {
  // ۱. آپدیت کامپوننت اکو (EcoToggle) برای پشتیبانی از ۴ زبان
  "src/components/features/EcoToggle.tsx": `'use client';
import { useState } from 'react';
import { Leaf, Check } from 'lucide-react';

interface Props {
  language: string;
  onToggle: (isActive: boolean) => void;
}

export default function EcoToggle({ language = 'FA', onToggle }: Props) {
  const [isActive, setIsActive] = useState(false);

  const t: any = {
    FA: { title: 'دوستدار طبیعت', desc: 'با انتخاب بسته‌بندی بازیافتی، ۵۰ امتیاز بگیرید.', label: 'بله، اکو' },
    EN: { title: 'Eco Friendly', desc: 'Choose recyclable packaging to earn 50 points.', label: 'Yes, Eco' },
    TR: { title: 'Doğa Dostu', desc: 'Geri dönüştürülebilir paket seçerek 50 puan kazan.', label: 'Evet, Eko' },
    RU: { title: 'Эко-выбор', desc: 'Выберите эко-упаковку и получите 50 баллов.', label: 'Да, Эко' }
  };

  const text = t[language] || t.FA;

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div 
      onClick={handleToggle}
      className={\`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer p-6 \${isActive ? 'bg-vela-eco/10 border-vela-eco' : 'bg-gray-50 border-dashed border-gray-300 hover:border-vela-eco/50'}\`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={\`w-12 h-12 rounded-full flex items-center justify-center transition-colors \${isActive ? 'bg-vela-eco text-white' : 'bg-gray-200 text-gray-400'}\`}>
            <Leaf size={24} />
          </div>
          <div>
            <h3 className={\`font-bold text-lg \${isActive ? 'text-vela-navy' : 'text-gray-500'}\`}>{text.title}</h3>
            <p className="text-sm text-gray-400 max-w-[200px] md:max-w-xs">{text.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={\`text-sm font-bold transition-colors \${isActive ? 'text-vela-eco' : 'text-gray-400'}\`}>{text.label}</span>
          <div className={\`w-12 h-6 rounded-full transition-colors relative \${isActive ? 'bg-vela-eco' : 'bg-gray-300'}\`}>
            <div className={\`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 \${isActive ? 'left-7' : 'left-1'}\`}></div>
          </div>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute top-2 left-2 text-vela-eco animate-scale-in">
          <Check size={16} />
        </div>
      )}
    </div>
  );
}`,

  // ۲. آپدیت صفحه محصولات (Box Builder) با قیمت‌های لیر برای خارجی‌ها
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function BuilderPage() {
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

  // تنظیم قیمت‌ها: برای FA تومان، برای بقیه لیر (TL)
  const t: any = {
    FA: {
      title: 'تنظیم تقویم هوشمند', selectTitle: 'انتخاب پکیج ماهانه', desc_init: 'برای شروع، تاریخ آخرین پریود خود را وارد کنید.',
      desc_date: 'بر اساس چرخه شما، بسته بعدی در تاریخ {date} ارسال می‌شود.', back: 'بازگشت', shipping: 'ارسال رایگان',
      products: {
        p1: { title: "پکیج پایه", price: "۱۸۹,۰۰۰ تومان", f1: "۱۰ نوار بهداشتی", f2: "۵ تامپون" },
        p2: { title: "پکیج آسایش", price: "۲۹۵,۰۰۰ تومان", f1: "۱۵ نوار بهداشتی", f2: "۱۰ تامپون", f3: "دمنوش گیاهی", f4: "شکلات تلخ" },
        p3: { title: "پکیج رویال", price: "۵۵۰,۰۰۰ تومان", f1: "پکیج کامل", f2: "روغن ماساژ", f3: "شمع معطر", f4: "سورپرایز" }
      }
    },
    EN: {
      title: 'Smart Cycle Calendar', selectTitle: 'Select Package', desc_init: 'Enter last period date.',
      desc_date: 'Next dispatch date: {date}.', back: 'Back', shipping: 'Free Shipping',
      products: {
        p1: { title: "Essential", price: "189 TL", f1: "10x Pads", f2: "5x Tampons" },
        p2: { title: "Comfort", price: "295 TL", f1: "15x Pads", f2: "10x Tampons", f3: "Herbal Tea", f4: "Dark Chocolate" },
        p3: { title: "Royal VELA", price: "550 TL", f1: "Full Kit", f2: "Massage Oil", f3: "Scented Candle", f4: "Surprise" }
      }
    },
    TR: {
      title: 'Akıllı Takvim', selectTitle: 'Paket Seçimi', desc_init: 'Son regl tarihini girin.',
      desc_date: 'Sonraki gönderim: {date}.', back: 'Geri', shipping: 'Ücretsiz Kargo',
      products: {
        p1: { title: "Temel", price: "189 TL", f1: "10x Ped", f2: "5x Tampon" },
        p2: { title: "Konfor", price: "295 TL", f1: "15x Ped", f2: "10x Tampon", f3: "Bitki Çayı", f4: "Çikolata" },
        p3: { title: "Kraliyet", price: "550 TL", f1: "Tam Set", f2: "Masaj Yağı", f3: "Mum", f4: "Sürpriz" }
      }
    },
    RU: {
      title: 'Умный календарь', selectTitle: 'Выберите бокс', desc_init: 'Введите дату последних месячных.',
      desc_date: 'Дата следующей отправки: {date}.', back: 'Назад', shipping: 'Бесплатная доставка',
      products: {
        p1: { title: "Базовый", price: "189 TL", f1: "10x Прокладок", f2: "5x Тампонов" },
        p2: { title: "Комфорт", price: "295 TL", f1: "15x Прокладок", f2: "10x Тампонов", f3: "Травяной чай", f4: "Шоколад" },
        p3: { title: "Королевский", price: "550 TL", f1: "Полный набор", f2: "Масло", f3: "Свеча", f4: "Сюрприз" }
      }
    }
  };

  const text = t[lang] || t.FA;
  const p = text.products;

  const products = [
    { id: 1, title: p.p1.title, price: p.p1.price, features: [{ text: p.p1.f1, included: true }, { text: p.p1.f2, included: true }] },
    { id: 2, title: p.p2.title, price: p.p2.price, isRecommended: true, features: [{ text: p.p2.f1, included: true }, { text: p.p2.f2, included: true }, { text: p.p2.f3, included: true }, { text: p.p2.f4, included: true }] },
    { id: 3, title: p.p3.title, price: p.p3.price, isLuxury: true, features: [{ text: p.p3.f1, included: true }, { text: p.p3.f2, included: true }, { text: p.p3.f3, included: true }, { text: p.p3.f4, included: true }] }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'FA' ? 'fa-IR' : lang === 'TR' ? 'tr-TR' : 'en-US');
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
                  <ProductCard title={product.title} price={product.price} imageSrc="" features={product.features} isRecommended={product.isRecommended} isLuxury={product.isLuxury} onSelect={() => {}} />
                </div>
              ))}
            </div>
             <div className="text-center text-gray-400 text-sm mt-12">
              <ShoppingBag className="inline-block mb-1 mx-1" size={14}/>
              {text.shipping}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`
};

console.log("🛠 در حال اصلاح زبان بخش اکو و تنظیم واحد پول...");
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ انجام شد! قیمت‌های خارجی به لیر تبدیل شدند.");