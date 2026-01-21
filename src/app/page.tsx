'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Gift, Clock, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState('EN');

  const content: any = {
    EN: {
      productsTitle: "VELA Packages",
      productsSub: "Choose the care level you need.",
      ecoName: "Essential",
      ecoTag: "ECO FRIENDLY",
      ecoDesc: "Minimal & Essential. High quality organic pads.",
      careName: "Care",
      careTag: "BEST SELLER",
      careDesc: "Perfect balance of hygiene and pain relief.",
      blissName: "Bliss",
      blissTag: "LUXURY SPA",
      blissDesc: "Ultimate home spa experience & self-care.",
      btnSelect: "Select",
      
      heroBadge: "✨ New Period Experience",
      heroTitle: "Sail Through It.",
      heroSub: "We don't stop periods, but we change the experience. Personalized organic care delivered to your door.",
      btnStart: "Start Building",
      btnGift: "Gift to Friend",
    },
    FA: {
      productsTitle: "پکیج‌های VELA",
      productsSub: "سطح مراقبتی که نیاز دارید را انتخاب کنید.",
      ecoName: "Essential",
      ecoTag: "بسته اقتصادی",
      ecoDesc: "پکیج ضروری و مینیمال. شامل نیازهای اولیه با کیفیت عالی.",
      careName: "Care",
      careTag: "محبوب‌ترین",
      careDesc: "تعادل کامل بین بهداشت و تسکین درد. برای حمایت بیشتر.",
      blissName: "Bliss",
      blissTag: "لوکس و کامل",
      blissDesc: "تجربه اسپا در خانه. نهایت آرامش و ناز کشیدن از خودتان.",
      btnSelect: "انتخاب",
      
      heroBadge: "✨ تجربه جدید پریود با VELA",
      heroTitle: "Sail Through It.",
      heroSub: "ما پریود را متوقف نمی‌کنیم، اما تجربه آن را تغییر می‌دهیم. پکیج‌های شخصی‌سازی شده و ارگانیک.",
      btnStart: "ساخت باکس شخصی",
      btnGift: "هدیه به دوست",
    },
    TR: {
      productsTitle: "VELA Paketleri",
      productsSub: "İhtiyacınız olan bakım seviyesini seçin.",
      ecoName: "Essential",
      ecoTag: "EKONOMİK",
      ecoDesc: "Minimal ve Gerekli. Yüksek kaliteli organik pedler.",
      careName: "Care",
      careTag: "ÇOK SATAN",
      careDesc: "Hijyen ve ağrı kesici desteğin mükemmel dengesi.",
      blissName: "Bliss",
      blissTag: "LÜKS SPA",
      blissDesc: "Evde spa deneyimi ve tam bakım.",
      btnSelect: "Seç",
      
      heroBadge: "✨ Yeni Regl Deneyimi",
      heroTitle: "Sail Through It.",
      heroSub: "Regl dönemini durdurmuyoruz, ama deneyimi değiştiriyoruz. Kapınıza gelen kişiselleştirilmiş bakım.",
      btnStart: "Paketini Oluştur",
      btnGift: "Arkadaşına Hediye Et",
    },
    RU: {
      productsTitle: "Пакеты VELA",
      productsSub: "Выберите необходимый уровень заботы.",
      ecoName: "Essential",
      ecoTag: "ЭКОНОМ",
      ecoDesc: "Минимальный и необходимый набор. Органическое качество.",
      careName: "Care",
      careTag: "ХИТ ПРОДАЖ",
      careDesc: "Идеальный баланс гигиены и облегчения боли.",
      blissName: "Bliss",
      blissTag: "РОСКОШЬ SPA",
      blissDesc: "Спа-салон у вас дома и полная забота о себе.",
      btnSelect: "Выбрать",
      
      heroBadge: "✨ Новый опыт с VELA",
      heroTitle: "Sail Through It.",
      heroSub: "Мы меняем ваше представление о критических днях. Персональная забота с доставкой.",
      btnStart: "Собрать бокс",
      btnGift: "Подарить подруге",
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);

    const handleLangChange = () => {
       const newLang = localStorage.getItem('vela-lang');
       if (newLang) setLang(newLang);
    };

    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  return (
    <div className="flex flex-col min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 1. Products Section (محصولات بالا) */}
      <section className="py-24 px-6 bg-[#F9F7F2] pt-32">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-4">{t.productsTitle}</h2>
                <p className="text-xl text-gray-600">{t.productsSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                
                {/* ECO Box */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition duration-500 group border border-gray-100 flex flex-col h-full">
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-100">
                        <Image src="/images/essential.jpg" alt="Essential" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-2 text-center">{t.ecoName}</h3>
                    <p className="text-[#D4AF37] font-bold text-sm text-center mb-4 uppercase tracking-wider">{t.ecoTag}</p>
                    <p className="text-gray-500 mb-6 text-sm text-center leading-relaxed">{t.ecoDesc}</p>
                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <div className="text-3xl font-bold text-[#1A2A3A] mb-4">380 TL</div>
                        <Link href="/box-builder" className="block w-full py-3 rounded-xl border-2 border-[#1A2A3A] text-[#1A2A3A] font-bold hover:bg-[#1A2A3A] hover:text-white transition">
                            {t.btnSelect} {t.ecoName}
                        </Link>
                    </div>
                </div>

                {/* CARE Box */}
                <div className="bg-white rounded-[2rem] p-6 shadow-2xl transition duration-500 group border-2 border-[#D4AF37] flex flex-col h-full transform md:-translate-y-8 z-10 relative">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg tracking-wide uppercase">
                        {t.careTag}
                    </div>
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-100 mt-4">
                        <Image src="/images/care.jpg" alt="Care" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2 text-center">{t.careName}</h3>
                    <p className="text-gray-500 mb-6 text-sm text-center leading-relaxed">{t.careDesc}</p>
                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <div className="text-3xl font-bold text-[#1A2A3A] mb-4">680 TL</div>
                        <Link href="/box-builder" className="block w-full py-4 rounded-xl bg-[#D4AF37] text-white font-bold hover:bg-[#b5952f] transition shadow-lg shadow-[#D4AF37]/30">
                            {t.btnSelect} {t.careName}
                        </Link>
                    </div>
                </div>

                {/* BLISS Box */}
                <div className="bg-[#1A2A3A] text-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition duration-500 group border border-[#1A2A3A] flex flex-col h-full">
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-800">
                        <Image src="/images/bliss.jpg" alt="Bliss" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 text-center">{t.blissName}</h3>
                    <p className="text-[#D4AF37] font-bold text-sm text-center mb-4 uppercase tracking-wider">{t.blissTag}</p>
                    <p className="text-gray-300 mb-6 text-sm text-center leading-relaxed">{t.blissDesc}</p>
                    <div className="mt-auto pt-6 border-t border-gray-700 text-center">
                        <div className="text-3xl font-bold text-white mb-4">1350 TL</div>
                        <Link href="/box-builder" className="block w-full py-3 rounded-xl bg-white text-[#1A2A3A] font-bold hover:bg-[#D4AF37] hover:text-white transition">
                            {t.btnSelect} {t.blissName}
                        </Link>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 2. Hero Section (بخش شروع پایین) */}
      <section className="relative px-6 py-20 bg-white text-center max-w-5xl mx-auto flex flex-col items-center border-t border-gray-100">
        <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-6 py-2 rounded-full text-sm font-semibold mb-8 border border-[#D4AF37]/20">
          {t.heroBadge}
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2A3A] mb-8 leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full max-w-md mx-auto">
          <Link href="/box-builder" className="w-full md:w-auto bg-[#1A2A3A] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#2a4a6a] transition flex items-center justify-center gap-2 shadow-lg shadow-[#1A2A3A]/20">
            {t.btnStart} <ArrowRight size={20} />
          </Link>
          <Link href="/gift" className="w-full md:w-auto bg-white border-2 border-[#1A2A3A]/10 text-[#1A2A3A] px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Gift size={20} /> {t.btnGift}
          </Link>
        </div>
      </section>

      {/* بخش تماس حذف شد چون Footer اصلی در layout برگشت */}

    </div>
  );
}