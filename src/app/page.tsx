'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { ArrowRight, Star, Heart, ShieldCheck, Gift, Leaf, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(localStorage.getItem('vela-lang') || 'FA');
    
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  // 🌍 دیکشنری ۴ زبانه کامل
  const t: any = {
    FA: {
      hero: { title: 'Sail Through It', sub: 'تجربه پریودی راحت، لوکس و بی‌دغدغه با پکیج‌های اختصاصی VELA.', btnMain: 'ساخت باکس شخصی', btnGift: 'هدیه به دوست' },
      products: { title: 'پکیج‌های منتخب VELA', sub: 'بهترین انتخاب‌ها برای شروع یک مراقبت کامل' },
      items: {
        essential: { name: 'Essential', desc: 'پکیج اقتصادی و مینیمال', badge: 'اقتصادی' },
        care: { name: 'Care', desc: 'محبوب‌ترین انتخاب با دمنوش و شکلات', badge: 'محبوب‌ترین' },
        bliss: { name: 'Bliss', desc: 'تجربه فول‌لوکس با هدیه و اکسسوری', badge: 'لاکچری' }
      },
      currency: 'تومان',
      buyBtn: 'مشاهده و خرید'
    },
    EN: {
      hero: { title: 'Sail Through It', sub: 'Experience a comfortable, luxurious period with VELA exclusive boxes.', btnMain: 'Build Your Box', btnGift: 'Send a Gift' },
      products: { title: 'VELA Featured Collections', sub: 'The best choices to start your wellness journey' },
      items: {
        essential: { name: 'Essential', desc: 'Basic & Eco-friendly package', badge: 'Eco' },
        care: { name: 'Care', desc: 'Most popular choice', badge: 'Best Seller' },
        bliss: { name: 'Bliss', desc: 'Full luxury experience', badge: 'Luxury' }
      },
      currency: 'TL',
      buyBtn: 'Order Now'
    },
    TR: {
      hero: { title: 'Sail Through It', sub: 'VELA özel kutuları ile konforlu ve lüks bir regl deneyimi yaşayın.', btnMain: 'Kutunu Tasarla', btnGift: 'Hediye Gönder' },
      products: { title: 'VELA Koleksiyonları', sub: 'Kendinize iyi bakmak için en iyi başlangıç' },
      items: {
        essential: { name: 'Essential', desc: 'Ekonomik ve minimal paket', badge: 'Ekonomik' },
        care: { name: 'Care', desc: 'Çay ve çikolata ile en popüler seçim', badge: 'Çok Satan' },
        bliss: { name: 'Bliss', desc: 'Hediyelerle dolu tam lüks deneyim', badge: 'Lüks' }
      },
      currency: 'TL',
      buyBtn: 'Satın Al'
    },
    RU: {
      hero: { title: 'Sail Through It', sub: 'Комфортный и роскошный опыт с эксклюзивными боксами VELA.', btnMain: 'Собрать бокс', btnGift: 'Подарить' },
      products: { title: 'Коллекции VELA', sub: 'Лучший выбор для заботы о себе' },
      items: {
        essential: { name: 'Essential', desc: 'Базовый и экологичный набор', badge: 'Эконом' },
        care: { name: 'Care', desc: 'Популярный выбор с чаем и шоколадом', badge: 'Хит' },
        bliss: { name: 'Bliss', desc: 'Роскошный опыт с подарками', badge: 'Люкс' }
      },
      currency: 'TL', // واحد پول برای روسیه هم لیر ست شده (مگر اینکه بخواهید دلار باشد)
      buyBtn: 'Купить'
    }
  };

  const text = t[lang] || t.EN;
  const isIR = lang === 'FA';

  // 💰 قیمت‌ها: فقط ایران تومان، بقیه لیر
  const PRICES = isIR 
    ? { essential: 395000, care: 750000, bliss: 1550000 }
    : { essential: 380, care: 680, bliss: 1350 };

  const formatPrice = (p: number) => p.toLocaleString('en-US') + ' ' + text.currency;

  if (!mounted) return <div className="min-h-screen bg-[#F9F7F2]"></div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pb-20 font-sans">
      <Header />

      {/* HERO */}
      <section className="relative px-6 pt-12 pb-20 text-center max-w-5xl mx-auto mt-8">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-bold border border-[#D4AF37]/20 animate-fade-in-up">
          ✨ New Collection 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2A3A] mb-6 leading-tight animate-fade-in-up">
          {text.hero.title}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100">
          {text.hero.sub}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
          <button onClick={() => router.push('/box-builder')} className="w-full md:w-auto px-8 py-4 bg-[#1A2A3A] text-white rounded-xl font-bold hover:bg-[#D4AF37] transition-all shadow-lg flex items-center justify-center gap-2">
            {text.hero.btnMain} <ArrowRight size={18} />
          </button>
          <button onClick={() => router.push('/gift')} className="w-full md:w-auto px-8 py-4 bg-white border-2 border-[#1A2A3A]/10 text-[#1A2A3A] rounded-xl font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2">
            <Gift size={18} /> {text.hero.btnGift}
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2">{text.products.title}</h2>
          <p className="text-gray-400">{text.products.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Essential */}
          <div className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="relative h-72 mb-5 rounded-2xl overflow-hidden bg-gray-50">
               <img src="/essential.jpg" alt="Essential Box" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                 <Leaf size={12}/> {text.items.essential.badge}
               </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2A3A]">{text.items.essential.name}</h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">{text.items.essential.desc}</p>
            <div className="mt-auto pt-4 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#1A2A3A]">{formatPrice(PRICES.essential)}</span>
                <button onClick={() => router.push('/gift')} className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"><ArrowRight size={18}/></button>
              </div>
            </div>
          </div>

          {/* Care */}
          <div className="group bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all border-2 border-[#D4AF37]/30 relative md:-translate-y-6 flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 z-10">
              <Star size={14} fill="currentColor"/> {text.items.care.badge}
            </div>
            <div className="relative h-72 mb-5 rounded-2xl overflow-hidden bg-gray-50">
               <img src="/care.jpg" alt="Care Box" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2A3A]">{text.items.care.name}</h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">{text.items.care.desc}</p>
            <div className="mt-auto pt-4 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#D4AF37]">{formatPrice(PRICES.care)}</span>
                <button onClick={() => router.push('/gift')} className="px-6 py-2 rounded-xl bg-[#D4AF37] text-white font-bold text-sm hover:shadow-lg transition-all">{text.buyBtn}</button>
              </div>
            </div>
          </div>

          {/* Bliss */}
          <div className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
            <div className="relative h-72 mb-5 rounded-2xl overflow-hidden bg-gray-50">
               <img src="/bliss.jpg" alt="Bliss Box" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
               <div className="absolute top-3 right-3 bg-[#1A2A3A] text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                 <Crown size={12}/> {text.items.bliss.badge}
               </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A2A3A]">{text.items.bliss.name}</h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">{text.items.bliss.desc}</p>
            <div className="mt-auto pt-4 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#1A2A3A]">{formatPrice(PRICES.bliss)}</span>
                <button onClick={() => router.push('/gift')} className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"><ArrowRight size={18}/></button>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* (بخش Features را از همان کد قبلی که دارید حفظ کنید یا اگر می‌خواهید آن هم ترجمه شود بگویید) */}
      
    </div>
  );
}