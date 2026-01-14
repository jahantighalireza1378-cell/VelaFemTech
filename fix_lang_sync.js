const fs = require('fs');
const path = require('path');

const files = {
  // ۱. هدر: فرستنده پیام تغییر زبان
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
    
    // شنیدن تغییرات زبان از تب‌های دیگر یا همین تب
    const handleStorageChange = () => {
       const saved = localStorage.getItem('vela-lang');
       if (saved && saved !== lang) setLang(saved);
    };
    
    window.addEventListener('vela-language-change', handleStorageChange);
    return () => window.removeEventListener('vela-language-change', handleStorageChange);
  }, [lang]);

  const handleLogout = () => {
    document.cookie = "vela-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleLanguage = () => {
    const langs = ['FA', 'EN', 'TR', 'RU'];
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    
    setLang(nextLang);
    localStorage.setItem('vela-lang', nextLang);
    // 📣 اعلام تغییر زبان به کل سایت
    window.dispatchEvent(new Event('vela-language-change'));
  };

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

  // ۲. صفحه اصلی (Hero): شنونده پیام
  "src/components/home/Hero.tsx": `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Gift } from 'lucide-react';

export default function Hero() {
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    // بارگذاری اولیه
    setLang(localStorage.getItem('vela-lang') || 'FA');

    // 👂 گوش دادن به پیام تغییر زبان
    const handleLangChange = () => {
      setLang(localStorage.getItem('vela-lang') || 'FA');
    };
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: { tag: 'PREMIUM FEMTECH CARE', desc: 'مراقبتی هوشمند و لوکس، هماهنگ با ریتم بدن شما.\\nتجربه‌ای که هر ماه منتظرش خواهید بود.', btnDesign: 'طراحی بسته من', subDesign: 'هماهنگ با چرخه شما', btnGift: 'ارسال هدیه', subGift: 'بدون نیاز به تنظیمات' },
    EN: { tag: 'PREMIUM FEMTECH CARE', desc: 'Smart & luxury care, synced with your body rhythm.\\nAn experience you will look forward to every month.', btnDesign: 'Design My Box', subDesign: 'Synced with your cycle', btnGift: 'Send a Gift', subGift: 'No setup required' },
    TR: { tag: 'PREMIUM FEMTECH CARE', desc: 'Vücut ritminizle uyumlu, akıllı ve lüks bakım.\\nHer ay dört gözle bekleyeceğiniz bir deneyim.', btnDesign: 'Paketimi Tasarla', subDesign: 'Döngünüzle senkronize', btnGift: 'Hediye Gönder', subGift: 'Kurulum gerektirmez' },
    RU: { tag: 'PREMIUM FEMTECH CARE', desc: 'Умный и роскошный уход, в ритме с вашим телом.\\nОпыт, который вы будете ждать каждый месяц.', btnDesign: 'Создать Бокс', subDesign: 'Синхронизировано с циклом', btnGift: 'Подарок', subGift: 'Настройка не требуется' }
  };

  const text = t[lang] || t.FA;

  return (
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vela-navy via-[#1e2a4a] to-vela-navy opacity-100 z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <div className="inline-block border border-vela-gold/30 rounded-full px-6 py-1 mb-4 backdrop-blur-sm">
          <span className="text-vela-gold text-xs md:text-sm tracking-[0.2em] font-sans uppercase">{text.tag}</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-vela-gold via-[#fff5d6] to-vela-gold drop-shadow-lg mb-2">VELA</h1>
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 tracking-wide mb-8">.Sail Through It</h2>
        <p className="text-vela-marble/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto whitespace-pre-line font-light">{text.desc}</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
          <Link href="/box-builder">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-3">
              <div className="flex flex-col items-start"><span className="font-bold text-lg">{text.btnDesign}</span><span className="text-xs opacity-70 font-sans">{text.subDesign}</span></div>
              <Sparkles className="animate-spin-slow group-hover:rotate-180 transition-transform duration-700" size={24} />
            </button>
          </Link>
          <span className="text-white/20 font-serif italic text-lg hidden md:block">- or -</span>
          <Link href="/gift">
            <button className="group px-8 py-4 border border-vela-gold/50 text-vela-gold rounded-2xl hover:bg-vela-gold/10 transition-all hover:border-vela-gold flex items-center gap-3">
              <Gift className="group-hover:-translate-y-1 transition-transform" size={24} />
              <div className="flex flex-col items-start text-left"><span className="font-bold text-lg">{text.btnGift}</span><span className="text-xs opacity-60 font-sans">{text.subGift}</span></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}`,

  // ۳. صفحه پرداخت (Checkout): شنونده پیام (چون عکس آخر شما این صفحه بود)
  "src/app/checkout/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowRight, CreditCard, MapPin, User, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [order, setOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // بارگذاری اولیه
    setLang(localStorage.getItem('vela-lang') || 'FA');

    // 👂 شنیدن تغییر زبان
    const handleLangChange = () => {
       setLang(localStorage.getItem('vela-lang') || 'FA');
    };
    window.addEventListener('vela-language-change', handleLangChange);

    // بارگذاری سفارش
    const finalOrder = localStorage.getItem('vela-final-order');
    const cart = localStorage.getItem('vela-cart');
    if (finalOrder) {
      setOrder(JSON.parse(finalOrder));
    } else if (cart) {
      const parsedCart = JSON.parse(cart);
      const savedLang = localStorage.getItem('vela-lang') || 'FA';
      const price = savedLang === 'FA' ? parsedCart.rawPrice?.fa : parsedCart.rawPrice?.other;
      setOrder({ ...parsedCart, totalPrice: price || 0 });
    }

    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []); // حذف وابستگی‌های غیرضروری

  const t: any = {
    FA: { back: 'بازگشت به شخصی‌سازی', title: 'تکمیل خرید', shippingTitle: 'اطلاعات ارسال', summaryTitle: 'خلاصه سفارش', inputs: { name: 'نام و نام خانوادگی', phone: 'شماره تماس', address: 'آدرس دقیق پستی' }, payBtn: 'پرداخت آنلاین', secure: 'پرداخت امن زرین‌پال', success: { title: 'پرداخت موفق!', desc: 'سفارش شما ثبت شد و به زودی ارسال می‌شود.', tracking: 'کد پیگیری: VELA-8829' }, currency: 'تومان' },
    EN: { back: 'Back to Customize', title: 'Checkout', shippingTitle: 'Shipping Details', summaryTitle: 'Order Summary', inputs: { name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address' }, payBtn: 'Pay Now', secure: 'Secure Payment', success: { title: 'Payment Successful!', desc: 'Your order has been placed.', tracking: 'Track ID: VELA-8829' }, currency: 'TL' },
    TR: { back: 'Düzenlemeye Dön', title: 'Ödeme', shippingTitle: 'Teslimat Bilgileri', summaryTitle: 'Sipariş Özeti', inputs: { name: 'Ad Soyad', phone: 'Telefon', address: 'Açık Adres' }, payBtn: 'Ödeme Yap', secure: 'Güvenli Ödeme', success: { title: 'Ödeme Başarılı!', desc: 'Siparişiniz alındı.', tracking: 'Takip No: VELA-8829' }, currency: 'TL' },
    RU: { back: 'Назад к настройкам', title: 'Оформление', shippingTitle: 'Адрес доставки', summaryTitle: 'Ваш заказ', inputs: { name: 'ФИО', phone: 'Телефон', address: 'Адрес' }, payBtn: 'Оплатить', secure: 'Безопасная оплата', success: { title: 'Успешно!', desc: 'Ваш заказ принят.', tracking: 'Трек-код: VELA-8829' }, currency: 'TL' }
  };

  const text = t[lang] || t.FA;
  const currencyLabel = lang === 'FA' ? 'تومان' : 'TL';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    setTimeout(() => { setIsSuccess(true); localStorage.removeItem('vela-cart'); localStorage.removeItem('vela-final-order'); }, 1500);
  };

  if (!order && !isSuccess) return <div className="p-20 text-center">...</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-vela-marble">
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle size={48} /></div>
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.success.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{text.success.desc}</p>
          <div className="bg-white px-6 py-3 rounded-xl border border-dashed border-gray-300 font-mono text-gray-500">{text.success.tracking}</div>
          <button onClick={() => router.push('/')} className="mt-8 text-vela-navy hover:text-vela-gold font-bold underline">{lang === 'FA' ? 'بازگشت به خانه' : 'Back to Home'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /></div>
          <span className="text-sm font-medium">{text.back}</span>
        </button>
        <h1 className="text-3xl font-serif text-vela-navy font-bold mb-8">{text.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-vela-gold/10">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4"><MapPin className="text-vela-gold" /><h2 className="text-xl font-bold text-vela-navy">{text.shippingTitle}</h2></div>
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.name}</label><div className="relative"><User className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required type="text" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.phone}</label><div className="relative"><Phone className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required type="tel" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.address}</label><textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50"></textarea></div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-vela-navy text-white rounded-3xl p-8 shadow-2xl sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-vela-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-xl font-bold mb-6 font-serif border-b border-white/10 pb-4 relative z-10">{text.summaryTitle}</h2>
              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-center text-white/80"><span>{order?.title} Package</span><span>{order?.finalQuantities ? 'Customize' : ''}</span></div>
                {order && order.finalQuantities?.hotWaterBottle > 0 && (<div className="flex justify-between items-center text-vela-gold text-sm"><span>+ {text.items?.hotWaterBottle || 'Hot Water Bottle'}</span><CheckCircle size={14}/></div>)}
              </div>
              <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end"><span className="text-white/60 text-sm">Total</span><div className="text-3xl font-bold font-sans">{order ? formatPrice(order.totalPrice) : '0'} <span className="text-lg font-light opacity-80 ml-1">{currencyLabel}</span></div></div>
              </div>
              <button onClick={handlePayment} className="w-full py-4 bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 relative z-10"><span>{text.payBtn}</span><CreditCard size={18} /></button>
              <div className="mt-4 flex justify-center items-center gap-2 text-white/40 text-xs relative z-10"><ShieldCheck size={12} /><span>{text.secure}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`
};

console.log("⚡️ در حال فعال‌سازی سیستم تغییر زبان آنی...");
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ انجام شد! حالا زبان سایت بلافاصله عوض می‌شود.");