const fs = require('fs');
const path = require('path');

const files = {
  // ۱. هدر (Header) - اضافه شدن RU به دکمه تغییر زبان
  "src/components/layout/Header.tsx": `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, X, Globe, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    const checkStatus = () => {
      const hasAuthToken = document.cookie.includes('vela-auth-token');
      setIsLoggedIn(hasAuthToken);
      const savedLang = localStorage.getItem('vela-lang');
      if (savedLang) setLang(savedLang);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "vela-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleLanguage = () => {
    // چرخه زبان‌ها: فارسی -> انگلیسی -> ترکی -> روسی -> فارسی
    const langs = ['FA', 'EN', 'TR', 'RU'];
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    
    setLang(nextLang);
    localStorage.setItem('vela-lang', nextLang);
  };

  // دیکشنری هدر
  const t: any = {
    FA: { builder: 'طراحی بسته', gift: 'هدیه', login: 'ورود / عضویت', pts: '۱۵۰ امتیاز' },
    EN: { builder: 'BOX BUILDER', gift: 'GIFT', login: 'LOGIN', pts: '150 Pts' },
    TR: { builder: 'PAKET OLUŞTUR', gift: 'HEDİYE', login: 'GİRİŞ', pts: '150 Puan' },
    RU: { builder: 'СОЗДАТЬ БОКС', gift: 'ПОДАРОК', login: 'ВОЙТИ', pts: '150 Баллов' }
  };
  
  const text = t[lang] || t.FA;

  return (
    <header className="sticky top-0 z-50 w-full bg-vela-navy/95 backdrop-blur-md border-b border-vela-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-serif text-3xl text-vela-gold tracking-widest font-bold">VELA</h1>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/box-builder" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">{text.builder}</Link>
            <Link href="/gift" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">{text.gift}</Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-vela-marble/80 hover:text-vela-gold cursor-pointer text-sm transition-all hover:scale-110">
              <Globe size={16} />
              <span className="font-sans font-medium w-6 text-center">{lang}</span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 animate-fade-in">
                <span className="text-vela-gold text-sm font-medium">{text.pts}</span>
                <Link href="/dashboard">
                  <div className="w-10 h-10 rounded-full bg-vela-gold/20 border border-vela-gold flex items-center justify-center text-vela-gold hover:bg-vela-gold hover:text-vela-navy transition-all cursor-pointer">
                    <User size={20} />
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400"><LogOut size={18} /></button>
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="px-6 py-2 border border-vela-gold text-vela-gold rounded-full hover:bg-vela-gold hover:text-vela-navy transition-all duration-300 text-sm font-medium">
                  {text.login}
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-vela-gold hover:text-white transition-colors">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
      </div>
    </header>
  );
}`,

  // ۲. داشبورد (Dashboard) - ترجمه روسی
  "src/components/dashboard/UserDashboard.tsx": `'use client';
import { useState, useEffect } from 'react';
import { Music, AlertCircle, Package } from 'lucide-react';

export default function UserDashboard() {
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
    FA: { greeting: 'سلام، سارا ✨', daysTitle: '۵ روز مانده', daysSub: 'تا ارسال بسته بعدی', sos: 'SOS', track: 'پیگیری', relax: 'اتاق آرامش', relaxSub: 'Relaxing Room' },
    EN: { greeting: 'Hello, Sara ✨', daysTitle: '5 Days Left', daysSub: 'Until next dispatch', sos: 'SOS', track: 'Track Order', relax: 'Relaxing Room', relaxSub: 'Music & Meditation' },
    TR: { greeting: 'Merhaba, Sara ✨', daysTitle: '5 Gün Kaldı', daysSub: 'Sonraki pakete kadar', sos: 'SOS', track: 'Takip Et', relax: 'Rahatlama Odası', relaxSub: 'Müzik ve Meditasyon' },
    RU: { greeting: 'Привет, Сара ✨', daysTitle: 'Осталось 5 дней', daysSub: 'До следующей отправки', sos: 'SOS', track: 'Отследить', relax: 'Комната отдыха', relaxSub: 'Музыка и медитация' }
  };

  const text = t[lang] || t.FA;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-serif text-vela-navy font-bold">{text.greeting}</h2>
      </div>
      <div className="bg-vela-navy rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-vela-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <div>
            <h3 className="text-4xl font-bold mb-2 font-serif">{text.daysTitle}</h3>
            <p className="text-vela-marble/80">{text.daysSub}</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2 transition-colors border border-red-500/30">
                <AlertCircle size={18} /><span className="font-bold">{text.sos}</span>
             </button>
             <button className="bg-vela-gold text-vela-navy px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg flex items-center gap-2">
                <Package size={18} /><span>{text.track}</span>
             </button>
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 cursor-pointer hover:bg-white transition-all">
        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Music size={24} /></div>
        <div><h4 className="font-bold text-vela-navy">{text.relax}</h4><p className="text-sm text-gray-500">{text.relaxSub}</p></div>
      </div>
    </div>
  );
}`,

  // ۳. ماشین حساب (Box Builder) - محصولات روسی
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

  const t: any = {
    FA: {
      title: 'تنظیم تقویم هوشمند', selectTitle: 'انتخاب پکیج ماهانه', desc_init: 'برای شروع، تاریخ آخرین پریود خود را وارد کنید.',
      desc_date: 'بر اساس چرخه شما، بسته بعدی در تاریخ {date} ارسال می‌شود.', back: 'بازگشت', shipping: 'ارسال رایگان',
      products: {
        p1: { title: "پکیج پایه", price: "۱۸۹,۰۰۰ ت", f1: "۱۰ نوار بهداشتی", f2: "۵ تامپون" },
        p2: { title: "پکیج آسایش", price: "۲۹۵,۰۰۰ ت", f1: "۱۵ نوار بهداشتی", f2: "۱۰ تامپون", f3: "دمنوش گیاهی", f4: "شکلات تلخ" },
        p3: { title: "پکیج رویال", price: "۵۵۰,۰۰۰ ت", f1: "پکیج کامل", f2: "روغن ماساژ", f3: "شمع معطر", f4: "سورپرایز" }
      }
    },
    EN: {
      title: 'Smart Cycle Calendar', selectTitle: 'Select Package', desc_init: 'Enter last period date.',
      desc_date: 'Next dispatch date: {date}.', back: 'Back', shipping: 'Free Shipping',
      products: {
        p1: { title: "Essential", price: "$19", f1: "10x Pads", f2: "5x Tampons" },
        p2: { title: "Comfort", price: "$29", f1: "15x Pads", f2: "10x Tampons", f3: "Herbal Tea", f4: "Dark Chocolate" },
        p3: { title: "Royal VELA", price: "$55", f1: "Full Kit", f2: "Massage Oil", f3: "Scented Candle", f4: "Surprise" }
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
        p1: { title: "Базовый", price: "1890 ₽", f1: "10x Прокладок", f2: "5x Тампонов" },
        p2: { title: "Комфорт", price: "2950 ₽", f1: "15x Прокладок", f2: "10x Тампонов", f3: "Травяной чай", f4: "Шоколад" },
        p3: { title: "Королевский", price: "5500 ₽", f1: "Полный набор", f2: "Масло", f3: "Свеча", f4: "Сюрприз" }
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
          </div>
        )}
      </div>
    </div>
  );
}`,

  // ۴. خود ماشین حساب (CycleCalculator)
  "src/components/features/CycleCalculator.tsx": `'use client';
import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props { language?: string; onDateSelected?: (dates: any) => void; }

export default function CycleCalculator({ language = 'FA', onDateSelected }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const t: any = {
    FA: { label: 'تاریخ آخرین پریود؟', btn: 'تنظیم برنامه' },
    EN: { label: 'Last Period Date?', btn: 'Set Schedule' },
    TR: { label: 'Son Regl Tarihi?', btn: 'Programı Ayarla' },
    RU: { label: 'Дата последних месячных?', btn: 'Создать расписание' }
  };
  const text = t[language] || t.FA;

  const calculateDates = () => {
    if (!selectedDate) return;
    const start = new Date(selectedDate);
    const nextPeriod = new Date(start); nextPeriod.setDate(start.getDate() + 28);
    const dispatch = new Date(nextPeriod); dispatch.setDate(nextPeriod.getDate() - 5);
    if (onDateSelected) onDateSelected({ startDate: start, nextPeriodDate: nextPeriod, dispatchDate: dispatch });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 border border-vela-gold/10 mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <label className="block text-vela-navy font-bold text-lg mb-4">{text.label}</label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-3.5 text-vela-gold" size={20} />
            <input type="date" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none text-center bg-gray-50/50" onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
        </div>
        <button onClick={calculateDates} disabled={!selectedDate} className="w-full py-4 bg-vela-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-vela-navy/90 transition-all disabled:opacity-50 group">
          <span>{text.btn}</span>
          <ArrowRight size={18} className={\`transition-transform \${language === 'FA' ? 'rotate-180' : ''}\`} />
        </button>
      </div>
    </div>
  );
}`,

  // ۵. صفحه هدیه (Gift Page)
  "src/app/gift/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Gift } from 'lucide-react';

export default function GiftPage() {
  const [lang, setLang] = useState('FA');
  useEffect(() => {
    const checkLang = () => { const saved = localStorage.getItem('vela-lang') || 'FA'; if (saved !== lang) setLang(saved); };
    checkLang(); const interval = setInterval(checkLang, 500); return () => clearInterval(interval);
  }, [lang]);

  const t: any = {
    FA: { title: 'بخش هدیه', desc: 'به زودی...' },
    EN: { title: 'Gift Section', desc: 'Coming soon...' },
    TR: { title: 'Hediye Bölümü', desc: 'Yakında...' },
    RU: { title: 'Раздел подарков', desc: 'Скоро...' }
  };
  const text = t[lang] || t.FA;

  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <div className="flex items-center justify-center h-[80vh] text-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-vela-gold/20 rounded-full flex items-center justify-center text-vela-gold mb-6 animate-bounce"><Gift size={40} /></div>
          <h1 className="text-4xl font-serif text-vela-navy mb-4 font-bold">{text.title}</h1>
          <p className="text-gray-500">{text.desc}</p>
        </div>
      </div>
    </div>
  );
}`
};

console.log("🇷🇺 در حال اضافه کردن زبان روسی...");
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ زبان روسی با موفقیت اضافه شد!");