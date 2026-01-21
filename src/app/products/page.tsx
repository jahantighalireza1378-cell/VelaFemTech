'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Heart, Plus } from 'lucide-react';

export default function ProductsPage() {
  const [lang, setLang] = useState('EN');

  // دیکشنری زبان‌ها
  const content: any = {
    EN: {
      title: "All Products",
      subtitle: "Everything you need for a better cycle, all in one place.",
      secBoxes: "Signature Subscription Boxes",
      secAddons: "Wellness & Self-Care Essentials",
      
      // Boxes
      box1: "Essential Box", box1Desc: "Organic pads + hygiene basics.",
      box2: "Care Box", box2Desc: "Pain relief focus + chocolates.",
      box3: "Bliss Box", box3Desc: "Full spa experience + premium gifts.",
      
      // Items
      item1: "Handmade Chocolate", item1Desc: "Belgian dark chocolate to boost serotonin.",
      item2: "VELA Herbal Tea", item2Desc: "Custom blend to soothe cramps and relax.",
      item3: "Heat Patch", item3Desc: "Instant warmth for lower back pain.",
      item4: "Hot Water Bottle", item4Desc: "Classic comfort for cozy nights.",
      item5: "Organic Pads", item5Desc: "100% organic cotton, toxin-free.",
      item6: "Tampons", item6Desc: "Smooth applicator, ultimate protection.",

      btnBuild: "Build Box",
      btnAdd: "Add to Box",
      price: "TL"
    },
    FA: {
      title: "تمام محصولات",
      subtitle: "هر آنچه برای یک دوره راحت‌تر نیاز دارید، در یک نگاه.",
      secBoxes: "باکس‌های اشتراکی ولا",
      secAddons: "محصولات سلامتی و مراقبتی",
      
      box1: "باکس اسنشیال", box1Desc: "پدهای ارگانیک + نیازهای اولیه.",
      box2: "باکس کِر (Care)", box2Desc: "تمرکز بر تسکین درد + شکلات.",
      box3: "باکس بلیس (Bliss)", box3Desc: "تجربه کامل اسپا + هدایای لوکس.",
      
      item1: "شکلات دست‌ساز", item1Desc: "شکلات تلخ بلژیکی برای افزایش سروتونین.",
      item2: "دمنوش گیاهی ولا", item2Desc: "ترکیب اختصاصی برای آرامش و کاهش درد.",
      item3: "پچ حرارتی", item3Desc: "گرمای فوری برای درد کمر و شکم.",
      item4: "کیسه آب گرم", item4Desc: "آرامش کلاسیک برای شب‌های سخت.",
      item5: "نوار بهداشتی ارگانیک", item5Desc: "۱۰۰٪ کتان خالص، بدون مواد سمی.",
      item6: "تامپون", item6Desc: "اپلیکاتور روان، محافظت حداکثری.",

      btnBuild: "انتخاب باکس",
      btnAdd: "افزودن به باکس",
      price: "لیر"
    },
    TR: {
      title: "Tüm Ürünler",
      subtitle: "Daha iyi bir döngü için ihtiyacınız olan her şey.",
      secBoxes: "İmza Kutularımız",
      secAddons: "Sağlık ve Bakım Ürünleri",
      
      box1: "Essential", box1Desc: "Organik pedler + temel ihtiyaçlar.",
      box2: "Care", box2Desc: "Ağrı kesici odaklı + çikolata.",
      box3: "Bliss", box3Desc: "Tam spa deneyimi + lüks hediyeler.",
      
      item1: "El Yapımı Çikolata", item1Desc: "Serotonin artıran Belçika çikolatası.",
      item2: "VELA Bitki Çayı", item2Desc: "Krampları hafifleten özel karışım.",
      item3: "Isı Bandı", item3Desc: "Bel ağrısı için anında sıcaklık.",
      item4: "Sıcak Su Torbası", item4Desc: "Klasik rahatlık.",
      item5: "Organik Ped", item5Desc: "%100 organik pamuk.",
      item6: "Tampon", item6Desc: "Üstün koruma.",

      btnBuild: "Kutu Oluştur",
      btnAdd: "Kutuya Ekle",
      price: "TL"
    },
    RU: {
      title: "Все товары",
      subtitle: "Все, что нужно для комфортного цикла.",
      secBoxes: "Наши боксы",
      secAddons: "Товары для здоровья",
      
      box1: "Essential", box1Desc: "Базовый набор.",
      box2: "Care", box2Desc: "Облегчение боли + шоколад.",
      box3: "Bliss", box3Desc: "Спа-уход + подарки.",
      
      item1: "Шоколад", item1Desc: "Бельгийский шоколад.",
      item2: "Травяной чай", item2Desc: "Особый сбор.",
      item3: "Пластырь", item3Desc: "От боли в спине.",
      item4: "Грелка", item4Desc: "Классический комфорт.",
      item5: "Прокладки", item5Desc: "100% хлопок.",
      item6: "Тампоны", item6Desc: "Защита.",

      btnBuild: "Выбрать",
      btnAdd: "Добавить",
      price: "TL"
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);
    window.addEventListener('vela-language-change', () => {
        const newLang = localStorage.getItem('vela-lang');
        if (newLang) setLang(newLang);
    });
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  // لیست باکس‌ها
  const boxes = [
    { id: 'essential', name: t.box1, desc: t.box1Desc, price: 380, img: '/images/essential.jpg', tag: 'STARTER' },
    { id: 'care', name: t.box2, desc: t.box2Desc, price: 680, img: '/images/care.jpg', tag: 'POPULAR' },
    { id: 'bliss', name: t.box3, desc: t.box3Desc, price: 1350, img: '/images/bliss.jpg', tag: 'PREMIUM' },
  ];

  // لیست محصولات تکی
  const essentials = [
    { id: 'pads', name: t.item5, desc: t.item5Desc, price: 0, img: '/images/pads.jpg' }, 
    { id: 'tampons', name: t.item6, desc: t.item6Desc, price: 50, img: '/images/tampons.jpg' }, 
    { id: 'chocolate', name: t.item1, desc: t.item1Desc, price: 80, img: '/images/chocolate.jpg' },
    { id: 'tea', name: t.item2, desc: t.item2Desc, price: 60, img: '/images/tea.jpg' },
    { id: 'patch', name: t.item3, desc: t.item3Desc, price: 40, img: '/images/patch.jpg' },
    { id: 'bottle', name: t.item4, desc: t.item4Desc, price: 150, img: '/images/bottle.jpg' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-28 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-serif font-bold text-[#1A2A3A] mb-4">{t.title}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* بخش ۱: باکس‌ها */}
        <div className="mb-24">
            <h2 className="text-3xl font-bold text-[#1A2A3A] mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#D4AF37]"></span> {t.secBoxes}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boxes.map((p) => (
                <div key={p.id} className="bg-white rounded-[2rem] p-4 shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1A2A3A] shadow-sm">
                        {p.tag}
                    </div>
                </div>
                <div className="px-2 mb-4">
                    <h3 className="text-2xl font-serif font-bold text-[#1A2A3A]">{p.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                </div>
                <div className="mt-auto flex justify-between items-center px-2 pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-[#D4AF37]">{p.price} {t.price}</span>
                    <Link href="/box-builder" className="bg-[#1A2A3A] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#D4AF37] transition flex items-center gap-2">
                        {t.btnBuild} <ArrowRight size={16}/>
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* بخش ۲: محصولات تکی */}
        <div>
            <h2 className="text-3xl font-bold text-[#1A2A3A] mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-[#D4AF37]"></span> {t.secAddons}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {essentials.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl p-4 hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-200 group">
                        <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4 bg-gray-50">
                            {/* تصاویر محصولات اینجا لود می‌شوند */}
                            <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition" />
                        </div>
                        <h4 className="font-bold text-[#1A2A3A] text-lg mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-4 h-8 overflow-hidden">{item.desc}</p>
                        
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-[#D4AF37]">{item.price > 0 ? `${item.price} ${t.price}` : '-'}</span>
                            <Link href="/box-builder" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white transition" title={t.btnAdd}>
                                <Plus size={18}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}