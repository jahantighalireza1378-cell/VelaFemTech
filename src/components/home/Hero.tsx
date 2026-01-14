'use client';
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
    FA: { tag: 'PREMIUM FEMTECH CARE', desc: 'مراقبتی هوشمند و لوکس، هماهنگ با ریتم بدن شما.\nتجربه‌ای که هر ماه منتظرش خواهید بود.', btnDesign: 'طراحی بسته من', subDesign: 'هماهنگ با چرخه شما', btnGift: 'ارسال هدیه', subGift: 'بدون نیاز به تنظیمات' },
    EN: { tag: 'PREMIUM FEMTECH CARE', desc: 'Smart & luxury care, synced with your body rhythm.\nAn experience you will look forward to every month.', btnDesign: 'Design My Box', subDesign: 'Synced with your cycle', btnGift: 'Send a Gift', subGift: 'No setup required' },
    TR: { tag: 'PREMIUM FEMTECH CARE', desc: 'Vücut ritminizle uyumlu, akıllı ve lüks bakım.\nHer ay dört gözle bekleyeceğiniz bir deneyim.', btnDesign: 'Paketimi Tasarla', subDesign: 'Döngünüzle senkronize', btnGift: 'Hediye Gönder', subGift: 'Kurulum gerektirmez' },
    RU: { tag: 'PREMIUM FEMTECH CARE', desc: 'Умный и роскошный уход, в ритме с вашим телом.\nОпыт, который вы будете ждать каждый месяц.', btnDesign: 'Создать Бокс', subDesign: 'Синхронизировано с циклом', btnGift: 'Подарок', subGift: 'Настройка не требуется' }
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
}