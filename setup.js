const fs = require('fs');
const path = require('path');

const projectFiles = {
  // ۱. تنظیمات تیلویند و رنگ‌ها
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        vela: {
          navy: { DEFAULT: "#1A233A", light: "#2A3555", dark: "#0F1525" },
          gold: { DEFAULT: "#D4AF37", light: "#E5C55D", dim: "#B08D26" },
          marble: "#F8F9FA", eco: "#4A7C59", error: "#991B1B",
        },
      },
      fontFamily: { serif: ['var(--font-playfair)', 'serif'], sans: ['var(--font-lato)', 'sans-serif'] },
      boxShadow: { 'card': '0 10px 30px -10px rgba(26, 35, 58, 0.15)', 'gold-glow': '0 0 15px rgba(212, 175, 55, 0.3)' }
    },
  },
  plugins: [],
};
export default config;`,

  // ۲. میدلور امنیتی
  "src/middleware.ts": `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PROTECTED_ROUTES = ['/dashboard', '/box-builder', '/checkout', '/account'];
const AUTH_ROUTES = ['/auth/login', '/auth/verify'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('vela-auth-token');
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (AUTH_ROUTES.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'] };`,

  // ۳. هدر سایت
  "src/components/layout/Header.tsx": `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Menu, X, Globe } from 'lucide-react';
const MOCK_USER_LOGGED_IN = false; 
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('FA');
  return (
    <header className="sticky top-0 z-50 w-full bg-vela-navy/95 backdrop-blur-md border-b border-vela-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center gap-2"><h1 className="font-serif text-3xl text-vela-gold tracking-widest font-bold">VELA</h1></Link>
          </div>
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/shop" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">محصولات</Link>
            <Link href="/gift" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">هدیه</Link>
          </nav>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 text-vela-marble/80 hover:text-vela-gold cursor-pointer text-sm"><Globe size={16} /><span className="font-sans font-medium">{lang}</span></div>
            {MOCK_USER_LOGGED_IN ? (
              <div className="flex items-center gap-3"><span className="text-vela-gold text-sm font-medium">50 امتیاز</span><div className="w-10 h-10 rounded-full bg-vela-gold/20 border border-vela-gold flex items-center justify-center text-vela-gold"><User size={20} /></div></div>
            ) : (
              <Link href="/auth/login"><button className="px-6 py-2 border border-vela-gold text-vela-gold rounded-full hover:bg-vela-gold hover:text-vela-navy transition-all duration-300 text-sm font-medium">ورود / عضویت</button></Link>
            )}
          </div>
          <div className="md:hidden flex items-center"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-vela-gold hover:text-white transition-colors">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button></div>
        </div>
      </div>
    </header>
  );
}`,

  // ۴. صفحه اصلی (Hero)
  "src/components/home/Hero.tsx": `import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';
export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-vela-navy">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="relative w-full h-full bg-gray-800">
           {/* Placeholder Image when file is missing */}
           <div className="absolute inset-0 bg-gradient-to-t from-vela-navy via-vela-navy/80 to-transparent" />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up space-y-6">
          <span className="inline-block py-1 px-3 rounded-full border border-vela-gold/30 text-vela-gold text-xs tracking-[0.2em] uppercase bg-vela-navy/50 backdrop-blur-sm mb-4">Premium FemTech Care</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight"><span className="block text-vela-gold mb-2">VELA</span>Sail Through It.</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-light leading-relaxed">مراقبتی هوشمند و لوکس، هماهنگ با ریتم بدن شما. <br className="hidden md:block"/>تجربه‌ای که هر ماه منتظرش خواهید بود.</p>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200">
          <Link href="/box-builder" className="group relative w-full sm:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-vela-gold via-yellow-400 to-vela-gold rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <button className="relative w-full sm:w-auto px-8 py-4 bg-vela-gold text-vela-navy font-bold rounded-full flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 shadow-gold-glow"><Sparkles size={20} className="animate-pulse" /><span>طراحی بسته من</span><ArrowLeft size={18} className="hidden group-hover:block transition-transform duration-300" /></button>
            <p className="mt-2 text-xs text-gray-400 font-light">هماهنگ با چرخه شما</p>
          </Link>
          <span className="sm:hidden text-gray-500 text-sm">- یا -</span>
          <Link href="/gift" className="group w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 border border-vela-gold/50 text-vela-marble rounded-full flex items-center justify-center gap-3 hover:bg-vela-navy/80 hover:border-vela-gold transition-all duration-300 backdrop-blur-sm"><Gift size={20} /><span>ارسال هدیه</span></button>
            <p className="mt-2 text-xs text-gray-400 font-light">بدون نیاز به تنظیمات</p>
          </Link>
        </div>
      </div>
    </section>
  );
}`,

  // ۵. ماشین حساب پریود
  "src/components/features/CycleCalculator.tsx": `'use client';
import { useState } from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Calendar, Truck, ArrowRight } from 'lucide-react';
interface CycleCalculatorProps { language: 'FA' | 'TR' | 'EN' | 'RU'; onDateSelected: (dates: { lastPeriod: string; nextPeriod: string; dispatchDate: string }) => void; }
export default function CycleCalculator({ language, onDateSelected }: CycleCalculatorProps) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [result, setResult] = useState(null);
  const isPersian = language === 'FA';
  const handleCalculation = () => {
    if (!selectedDate) return;
    const lastPeriod = new Date(selectedDate.toDate());
    const nextPeriod = new Date(lastPeriod); nextPeriod.setDate(lastPeriod.getDate() + 28);
    const dispatchDate = new Date(nextPeriod); dispatchDate.setDate(nextPeriod.getDate() - 5);
    setResult({ next: nextPeriod.toLocaleDateString(isPersian ? 'fa-IR' : 'en-US'), dispatch: dispatchDate.toLocaleDateString(isPersian ? 'fa-IR' : 'en-US') });
    onDateSelected({ lastPeriod: lastPeriod.toISOString(), nextPeriod: nextPeriod.toISOString(), dispatchDate: dispatchDate.toISOString() });
  };
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-card p-6 border border-vela-gold/10">
      <div className="text-center mb-6"><h3 className="text-xl font-serif text-vela-navy font-bold">{isPersian ? 'تاریخ آخرین پریود؟' : 'Last period date?'}</h3></div>
      <div className="mb-6"><DatePicker value={selectedDate} onChange={setSelectedDate} calendar={isPersian ? persian : gregorian} locale={isPersian ? persian_fa : gregorian_en} format={isPersian ? "DD MMMM YYYY" : "MMMM DD, YYYY"} containerClassName="w-full" inputClass="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg" maxDate={new Date()} /></div>
      {!result && <button onClick={handleCalculation} disabled={!selectedDate} className="w-full py-3 bg-vela-navy text-white rounded-xl font-bold flex items-center justify-center gap-2">{isPersian ? 'تنظیم برنامه' : 'Set Schedule'}<ArrowRight size={18} /></button>}
      {result && <div className="animate-fade-in-up bg-vela-marble rounded-xl p-4 border border-vela-gold/20"><div className="flex items-start gap-3"><div className="mt-1 text-vela-gold"><Truck size={20} /></div><div><p className="text-sm text-gray-500 mb-1">{isPersian ? 'زمان ارسال بسته شما:' : 'Ships on:'}</p><p className="text-lg font-bold text-vela-navy">{result.dispatch}</p></div></div></div>}
    </div>
  );
}`,

  // ۶. کارت محصول
  "src/components/features/ProductCard.tsx": `import Image from 'next/image';
import { Check, X, Star } from 'lucide-react';
interface ProductCardProps { title: string; price: string; imageSrc: string; features: { text: string; included: boolean }[]; isRecommended?: boolean; isLuxury?: boolean; onSelect: () => void; }
export default function ProductCard({ title, price, imageSrc, features, isRecommended = false, isLuxury = false, onSelect }: ProductCardProps) {
  return (
    <div className={\`relative group rounded-2xl transition-all duration-300 flex flex-col h-full \${isRecommended ? 'bg-white border-2 border-vela-gold shadow-2xl scale-105 z-10' : 'bg-white/80 border border-gray-100'}\`}>
      {isRecommended && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-vela-gold text-vela-navy px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1"><Star size={14} fill="currentColor" /><span>پیشنهاد ما</span></div>}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-gray-50">
        <div className="w-full h-full bg-vela-navy/5 flex items-center justify-center text-vela-navy font-serif">{title}</div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className={\`text-2xl font-serif mb-2 \${isLuxury ? 'text-vela-gold' : 'text-vela-navy'}\`}>{title}</h3>
        <div className="text-3xl font-bold text-vela-navy mb-6">{price} <span className="text-sm font-normal text-gray-400">/ ماهانه</span></div>
        <ul className="space-y-3 mb-8 flex-grow">{features.map((feature, idx) => (<li key={idx} className="flex items-start gap-3 text-sm">{feature.included ? <Check size={12} className="text-vela-navy" /> : <X size={16} className="text-gray-300" />}<span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>{feature.text}</span></li>))}</ul>
        <button onClick={onSelect} className={\`w-full py-3 rounded-xl font-bold transition-all duration-300 \${isRecommended ? 'bg-vela-gold text-vela-navy' : 'bg-vela-navy text-white'}\`}>انتخاب {title}</button>
      </div>
    </div>
  );
}`,

  // ۷. سوییچ اکو
  "src/components/features/EcoToggle.tsx": `'use client';
import { useState } from 'react';
import { Leaf, Gift, CheckCircle } from 'lucide-react';
export default function EcoToggle({ onToggle, language }: { onToggle: (val: boolean) => void, language: string }) {
  const [isEco, setIsEco] = useState(false);
  const handleToggle = () => { setIsEco(!isEco); onToggle(!isEco); };
  return (
    <div className={\`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 \${isEco ? 'border-vela-eco bg-green-50/50' : 'border-gray-100 bg-white'}\`}>
      <div className="p-6 text-center">
        <h4 className="text-lg font-serif font-bold text-vela-navy flex items-center justify-center gap-2 mb-2"><Leaf size={20} />{isEco ? 'دوستدار طبیعت' : 'جعبه لوکس'}</h4>
        <p className="text-sm text-gray-500 mb-6">با انتخاب بسته‌بندی بازیافتی، ۵۰ امتیاز بگیرید.</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isEco} onChange={handleToggle} />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-vela-eco peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">{isEco ? 'بله، اکو میخوام 🌱' : 'خیر'}</span>
        </label>
        {isEco && <div className="mt-4 p-3 bg-vela-gold/10 border border-vela-gold/20 rounded-lg flex items-center justify-center gap-3 text-sm text-vela-navy"><CheckCircle size={18} className="text-vela-gold" /><span>۵۰ امتیاز اضافه شد!</span></div>}
      </div>
    </div>
  );
}`,

  // ۸. API ارسال پیامک
  "src/app/api/auth/send-otp/route.ts": `import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    if (!phoneNumber || phoneNumber.length < 10) return NextResponse.json({ error: 'شماره نامعتبر' }, { status: 400 });
    const otpCode = Math.floor(10000 + Math.random() * 90000).toString();
    console.log(\`[DEV MODE] OTP for \${phoneNumber}: \${otpCode}\`);
    return NextResponse.json({ success: true, message: \`کد ارسال شد\`, debugCode: otpCode });
  } catch (error) { return NextResponse.json({ error: 'خطا در سرور' }, { status: 500 }); }
}`,

  // ۹. فرم لاگین
  "src/components/auth/LoginForm.tsx": `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Loader2 } from 'lucide-react';
export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState('PHONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSendOtp = async (e: any) => {
    e.preventDefault(); setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phoneNumber }) });
      const data = await res.json();
      setStep('OTP');
      console.log('OTP:', data.debugCode);
    } catch (err) {} finally { setIsLoading(false); }
  };
  const handleVerifyOtp = async (e: any) => {
    e.preventDefault(); setIsLoading(true);
    setTimeout(() => { if (otpCode.length === 5) router.push('/dashboard'); }, 1000);
  };
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 border border-vela-gold/10">
      {step === 'PHONE' && <form onSubmit={handleSendOtp} className="space-y-6"><input type="tel" placeholder="شماره موبایل" className="w-full px-4 py-3 rounded-xl border" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><button type="submit" disabled={isLoading} className="w-full py-3 bg-vela-navy text-white rounded-xl flex justify-center gap-2">{isLoading ? <Loader2 className="animate-spin" /> : 'ارسال کد'}</button></form>}
      {step === 'OTP' && <form onSubmit={handleVerifyOtp} className="space-y-6"><input type="text" maxLength={5} className="w-full text-center text-3xl py-3 border-b-2 outline-none" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} /><button type="submit" disabled={isLoading} className="w-full py-3 bg-vela-gold text-vela-navy rounded-xl font-bold flex justify-center gap-2">{isLoading ? <Loader2 className="animate-spin" /> : 'ورود'}</button></form>}
    </div>
  );
}`,

  // ۱۰. داشبورد کاربر
  "src/components/dashboard/UserDashboard.tsx": `'use client';
import { Truck, Music, Leaf } from 'lucide-react';
const MOCK_USER_DATA = { name: "سارا", nextDelivery: "24 بهمن", points: 150 };
export default function UserDashboard() {
  const openRelaxingRoom = () => window.open('https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u', '_blank');
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center"><h1 className="text-3xl font-serif text-vela-navy">سلام، {MOCK_USER_DATA.name} ✨</h1><div className="bg-white border border-vela-gold/30 rounded-xl px-4 py-2 flex items-center gap-3"><Leaf size={18} className="text-vela-eco" /><span className="text-lg font-bold text-vela-navy">{MOCK_USER_DATA.points}</span></div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-vela-navy to-vela-navy/90 rounded-3xl p-6 text-white relative shadow-card"><h2 className="text-3xl font-serif mb-2">۵ روز مانده</h2><p className="text-vela-marble/80 text-sm">تا ارسال بسته بعدی ({MOCK_USER_DATA.nextDelivery})</p><div className="mt-6 flex gap-3"><button className="px-4 py-2 bg-vela-gold text-vela-navy rounded-lg font-bold">پیگیری</button><button className="px-4 py-2 border border-white/20 rounded-lg">SOS 🚨</button></div></div>
        <div onClick={openRelaxingRoom} className="cursor-pointer bg-white border hover:border-vela-gold/50 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"><div className="relative z-10"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-8"><Music size={24} /></div><h3 className="text-xl font-bold text-vela-navy">Relaxing Room</h3></div></div>
      </div>
    </div>
  );
}`,
  
  // ۱۱. صفحه اصلی (Root Page) برای نمایش Hero
  "src/app/page.tsx": `import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
export default function Home() {
  return (
    <main className="min-h-screen bg-vela-marble">
      <Header />
      <Hero />
    </main>
  );
}`
};

console.log("🚀 Starting VELA setup...");
for (const [filePath, content] of Object.entries(projectFiles)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created: ${filePath}`);
}
console.log("\n🎉 Setup Complete!");