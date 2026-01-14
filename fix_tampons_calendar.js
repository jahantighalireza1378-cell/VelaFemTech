const fs = require('fs');
const path = require('path');

const files = {
  // ۱. آپدیت صفحه طراحی (Box Builder) برای نمایش تاریخ شمسی
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      title: 'تنظیم تقویم هوشمند', selectTitle: 'انتخاب پکیج ماهانه', desc_init: 'برای شروع، تاریخ آخرین پریود خود را وارد کنید.',
      desc_date: 'بر اساس چرخه شما، بسته بعدی در تاریخ {date} ارسال می‌شود.', back: 'بازگشت', shipping: 'ارسال رایگان به سراسر ایران',
      btnPrefix: 'انتخاب', btnSuffix: '',
      badges: { popular: 'محبوب‌ترین', luxury: 'لوکس' },
      features: {
        p1: ["۱۰ عدد نوار بهداشتی ارگانیک", "۵ عدد تامپون سایز مخلوط"],
        p2: ["۱۵ عدد نوار بهداشتی ارگانیک", "۱۰ عدد تامپون اپلیکاتوردار", "دمنوش مخصوص VELA", "شکلات تلخ ۷۰٪"],
        p3: ["پکیج کامل بهداشتی (نامحدود)", "روغن ماساژ گیاهی", "شمع معطر دست‌ساز", "اکسسوری سورپرایز ماهانه"]
      }
    },
    EN: {
      title: 'Smart Cycle Calendar', selectTitle: 'Select Your Package', desc_init: 'Enter last period date.',
      desc_date: 'Next dispatch date: {date}.', back: 'Back', shipping: 'Free Shipping',
      btnPrefix: 'Select', btnSuffix: '',
      badges: { popular: 'Most Popular', luxury: 'Luxury' },
      features: {
        p1: ["10x Organic Pads", "5x Mixed Tampons"],
        p2: ["15x Organic Pads", "10x Applicator Tampons", "VELA Herbal Tea", "Dark Chocolate 70%"],
        p3: ["Full Sanitary Kit (Unlimited)", "Herbal Massage Oil", "Handmade Scented Candle", "Monthly Surprise Accessory"]
      }
    },
    TR: {
      title: 'Akıllı Döngü Takvimi', selectTitle: 'Paketini Seç', desc_init: 'Son regl tarihini girin.',
      desc_date: 'Sonraki gönderim: {date}.', back: 'Geri', shipping: 'Ücretsiz Kargo',
      btnPrefix: '', btnSuffix: 'Seç',
      badges: { popular: 'En Popüler', luxury: 'Lüks' },
      features: {
        p1: ["10x Organik Ped", "5x Karışık Tampon"],
        p2: ["15x Organik Ped", "10x Aplikatörlü Tampon", "VELA Bitki Çayı", "Bitter Çikolata %70"],
        p3: ["Tam Hijyen Seti (Sınırsız)", "Bitkisel Masaj Yağı", "El Yapımı Kokulu Mum", "Aylık Sürpriz Aksesuar"]
      }
    },
    RU: {
      title: 'Умный календарь', selectTitle: 'Выберите бокс', desc_init: 'Введите дату последних месячных.',
      desc_date: 'Дата следующей отправки: {date}.', back: 'Назад', shipping: 'Бесплатная доставка',
      btnPrefix: 'Выбрать', btnSuffix: '',
      badges: { popular: 'Популярное', luxury: 'Люкс' },
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
  const getButtonLabel = (name: string) => lang === 'TR' ? \`\${name} \${text.btnSuffix}\` : \`\${text.btnPrefix} \${name}\`;
  
  const rawPrices = { p1: { fa: 285000, other: 249 }, p2: { fa: 580000, other: 490 }, p3: { fa: 1250000, other: 950 } };

  const products = [
    { id: 1, title: "Essential", rawPrice: rawPrices.p1, price: getPrice("۲۸۵,۰۰۰", "249"), features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] },
    { id: 2, title: "Care", rawPrice: rawPrices.p2, price: getPrice("۵۸۰,۰۰۰", "490"), isRecommended: true, features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] },
    { id: 3, title: "Bliss", rawPrice: rawPrices.p3, price: getPrice("۱,۲۵۰,۰۰۰", "950"), isLuxury: true, features: [{text:f.p3[0],included:true}, {text:f.p3[1],included:true}, {text:f.p3[2],included:true}, {text:f.p3[3],included:true}] }
  ];

  // ✅ تابع تبدیل تاریخ هوشمند (شمسی برای فارسی)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === 'FA') {
       return new Intl.DateTimeFormat('fa-IR', { calendar: 'persian', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
    return date.toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'TR' ? 'tr-TR' : 'en-US');
  };

  const handleSelectProduct = (product: any) => {
    localStorage.setItem('vela-cart', JSON.stringify({ ...product, dispatchDate: dates.dispatchDate, isEco: isEco }));
    router.push('/customize');
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
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-8"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span></button>
            <div className="flex justify-center"><EcoToggle language={lang} onToggle={setIsEco} /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title} price={product.price} imageSrc="" features={product.features} 
                    isRecommended={product.isRecommended} isLuxury={product.isLuxury} 
                    actionLabel={getButtonLabel(product.title)} 
                    onSelect={() => handleSelectProduct(product)}
                    popularLabel={text.badges.popular}
                    luxuryLabel={text.badges.luxury}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,

  // ۲. آپدیت صفحه شخصی‌سازی: تنظیم پیش‌فرض تامپون روی صفر
  "src/app/customize/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingCart, ArrowRight, Flame, MapPin, ThermometerSun, Moon, Sun } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [market, setMarket] = useState('IR'); 
  const [basePackage, setBasePackage] = useState<any>(null);
  
  const [selections, setSelections] = useState({
    pads: { count: 0, brand: '', nightCount: 0 },
    tampons: { count: 0, brand: '' },
    chocolate: { count: 0 },
    tea: { count: 0 },
    heatPatch: { count: 0 },
    wipes: { count: 0 },
    hotWaterBottle: { count: 0 }
  });

  const brands = {
    IR: { pads: ["پنبه‌ریز (Panberes)", "مای‌لدی (MyLady)", "تافته (Tafteh)"], tampons: ["تامپکس (Tampax)", "کوتکس (Kotex)", "او.بی (o.b.)"] },
    TR: { pads: ["Orkid (Always)", "Kotex", "Molped"], tampons: ["Tampax", "Kotex", "o.b."] }
  };

  const unitPrices = {
    pads: { IR: 5000, TR: 5 }, tampons: { IR: 8000, TR: 8 }, chocolate: { IR: 45000, TR: 40 },
    tea: { IR: 30000, TR: 30 }, heatPatch: { IR: 25000, TR: 25 }, wipes: { IR: 20000, TR: 20 }, hotWaterBottle: { IR: 190000, TR: 200 }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang') || 'FA';
    setLang(savedLang);
    const defaultMarket = savedLang === 'FA' ? 'IR' : 'TR';
    setMarket(defaultMarket);
    const initialBrands = defaultMarket === 'IR' ? brands.IR : brands.TR;

    const savedCart = localStorage.getItem('vela-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setBasePackage(parsedCart);
      
      // ✅ تنظیم مقادیر پیش‌فرض جدید (تامپون = ۰)
      let defaults = { pads: 0, tampons: 0, chocolate: 0, tea: 0, heatPatch: 0, wipes: 0, hotWaterBottle: 0 };
      if (parsedCart.id === 1) defaults = { ...defaults, pads: 10, tampons: 0 }; // Essential
      if (parsedCart.id === 2) defaults = { ...defaults, pads: 15, tampons: 0, chocolate: 1, tea: 1 }; // Care
      if (parsedCart.id === 3) defaults = { ...defaults, pads: 20, tampons: 0, chocolate: 2, tea: 2, heatPatch: 1 }; // Bliss

      const defaultNight = Math.floor(defaults.pads / 3);

      setSelections({
        pads: { count: defaults.pads, brand: initialBrands.pads[0], nightCount: defaultNight },
        tampons: { count: defaults.tampons, brand: initialBrands.tampons[0] }, // اینجا صفر شده
        chocolate: { count: defaults.chocolate },
        tea: { count: defaults.tea },
        heatPatch: { count: defaults.heatPatch },
        wipes: { count: defaults.wipes },
        hotWaterBottle: { count: defaults.hotWaterBottle }
      });
    }

    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const toggleMarket = () => {
    const newMarket = market === 'IR' ? 'TR' : 'IR';
    setMarket(newMarket);
    const newBrands = newMarket === 'IR' ? brands.IR : brands.TR;
    setSelections(prev => ({
      ...prev,
      pads: { ...prev.pads, brand: newBrands.pads[0] },
      tampons: { ...prev.tampons, brand: newBrands.tampons[0] }
    }));
  };

  const t: any = {
    FA: {
      title: 'شخصی‌سازی بسته', subtitle: 'برند و تعداد مورد نظر خود را انتخاب کنید.',
      sections: { sanitary: 'محصولات بهداشتی', care: 'مراقبت و آرامش', addons: 'پیشنهاد ویژه' },
      items: { pads: 'نوار بهداشتی', tampons: 'تامپون', chocolate: 'شکلات تلخ', tea: 'دمنوش', heatPatch: 'پد گرمایی', wipes: 'دستمال مرطوب', hotWaterBottle: 'کیسه آب گرم فانتزی' },
      labels: { brand: 'انتخاب برند:', market: 'موقعیت فروشگاه:', day: 'روزانه', night: 'شبانه' },
      markets: { IR: 'ایران (تومان)', TR: 'ترکیه (لیر)' },
      currency: market === 'IR' ? 'تومان' : 'TL',
      total: 'مبلغ نهایی', checkout: 'تایید و پرداخت', back: 'بازگشت'
    },
    EN: {
      title: 'Customize Your Box', subtitle: 'Select your preferred brands and quantities.',
      sections: { sanitary: 'Sanitary Products', care: 'Care & Relax', addons: 'Special Add-ons' },
      items: { pads: 'Sanitary Pads', tampons: 'Tampons', chocolate: 'Dark Chocolate', tea: 'Herbal Tea', heatPatch: 'Heat Patch', wipes: 'Intimate Wipes', hotWaterBottle: 'Hot Water Bottle' },
      labels: { brand: 'Brand:', market: 'Store Region:', day: 'Day', night: 'Night' },
      markets: { IR: 'Iran (Toman)', TR: 'Turkey (TL)' },
      currency: 'TL',
      total: 'Total Amount', checkout: 'Checkout', back: 'Back'
    },
    TR: {
      title: 'Paketini Kişiselleştir', subtitle: 'Tercih ettiğiniz markaları ve adetleri seçin.',
      sections: { sanitary: 'Hijyen Ürünleri', care: 'Bakım ve Rahatlama', addons: 'Özel Ekstralar' },
      items: { pads: 'Hijyenik Ped', tampons: 'Tampon', chocolate: 'Bitter Çikolata', tea: 'Bitki Çayı', heatPatch: 'Isı Bandı', wipes: 'İntim Mendil', hotWaterBottle: 'Sıcak Su Torbası' },
      labels: { brand: 'Marka:', market: 'Mağaza Bölgesi:', day: 'Gündüz', night: 'Gece' },
      markets: { IR: 'İran (Toman)', TR: 'Türkiye (TL)' },
      currency: 'TL',
      total: 'Toplam Tutar', checkout: 'Ödemeye Geç', back: 'Geri'
    },
    RU: {
      title: 'Настройка бокса', subtitle: 'Выберите бренды и количество.',
      sections: { sanitary: 'Гигиена', care: 'Уход и релакс', addons: 'Дополнительно' },
      items: { pads: 'Прокладки', tampons: 'Тампоны', chocolate: 'Шоколад', tea: 'Чай', heatPatch: 'Термопластырь', wipes: 'Салфетки', hotWaterBottle: 'Водяная грелка' },
      labels: { brand: 'Бренд:', market: 'Регион:', day: 'День', night: 'Ночь' },
      markets: { IR: 'Иран', TR: 'Турция' },
      currency: 'TL',
      total: 'Итого', checkout: 'Оформить', back: 'Назад'
    }
  };

  const text = t[lang] || t.FA;

  const handleCountChange = (item: string, change: number) => {
    setSelections(prev => {
      // @ts-ignore
      const currentCount = prev[item].count;
      const newCount = currentCount + change < 0 ? 0 : currentCount + change;
      let newItem = { ...(prev as any)[item], count: newCount };
      if (item === 'pads') { if (newItem.nightCount > newCount) newItem.nightCount = newCount; }
      return { ...prev, [item]: newItem };
    });
  };

  const handleNightChange = (change: number) => {
    setSelections(prev => {
        const currentNight = prev.pads.nightCount;
        const total = prev.pads.count;
        let newNight = currentNight + change;
        if (newNight < 0) newNight = 0;
        if (newNight > total) newNight = total;
        return { ...prev, pads: { ...prev.pads, nightCount: newNight } };
    });
  };

  const handleBrandChange = (item: string, newBrand: string) => {
    setSelections(prev => ({ ...prev, [item]: { ...(prev as any)[item], brand: newBrand } }));
  };

  const calculateTotal = () => {
    if (!basePackage) return 0;
    let total = market === 'IR' ? basePackage.rawPrice.fa : basePackage.rawPrice.other;
    // محاسبه پیش‌فرض‌ها (برای محاسبه مابه التفاوت قیمت)
    const defaults = basePackage.id === 1 ? { pads: 10, tampons: 0 } :
                     basePackage.id === 2 ? { pads: 15, tampons: 0, chocolate: 1, tea: 1 } :
                                            { pads: 20, tampons: 0, chocolate: 2, tea: 2, heatPatch: 1 };

    Object.keys(selections).forEach(key => {
        const k = key as keyof typeof selections;
        // @ts-ignore
        const count = selections[k].count;
        const def = (defaults as any)[k] || 0;
        const extra = count - def;
        if (extra > 0) {
            const price = (unitPrices as any)[k][market];
            total += extra * price;
        }
    });
    return total;
  };

  const formatPrice = (amount: number) => new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);

  const handleCheckout = () => {
    const finalTotal = calculateTotal();
    const finalOrder = {
      ...basePackage,
      finalQuantities: selections,
      market: market,
      totalPrice: finalTotal
    };
    localStorage.setItem('vela-final-order', JSON.stringify(finalOrder));
    router.push('/checkout');
  };

  if (!basePackage) return <div className="p-10 text-center">Loading...</div>;
  const activeBrands = market === 'IR' ? brands.IR : brands.TR;

  return (
    <div className="min-h-screen bg-vela-marble pb-32">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy text-sm"><ArrowRight size={14} className={lang === 'FA' ? '' : 'rotate-180'} />{text.back}</button>
          <button onClick={toggleMarket} className="flex items-center gap-2 px-3 py-1 bg-white border border-vela-gold/50 rounded-full text-xs text-vela-navy hover:bg-vela-gold/10 transition-colors"><MapPin size={12} />{text.labels.market} <strong>{market === 'IR' ? text.markets.IR : text.markets.TR}</strong></button>
        </div>
        <div className="text-center mb-10"><h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.title}</h1><p className="text-gray-500">{text.subtitle}</p></div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">{text.sections.sanitary}</h3>
            <div className="border-b border-gray-50 last:border-0 pb-4 mb-4">
                 <BrandItemRow label={text.items.pads} count={selections.pads.count} onCountChange={(v: number) => handleCountChange('pads', v)} brand={selections.pads.brand} brandsList={activeBrands.pads} onBrandChange={(b: string) => handleBrandChange('pads', b)} brandLabel={text.labels.brand} />
                 <div className="mt-3 bg-gray-50/80 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2 text-vela-navy"><Sun size={16} className="text-orange-400" /><span>{text.labels.day}: <strong>{selections.pads.count - selections.pads.nightCount}</strong></span></div>
                    <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                    <div className="flex items-center gap-3"><div className="flex items-center gap-2 text-vela-navy"><Moon size={16} className="text-indigo-400" /><span>{text.labels.night}:</span></div><div className="flex items-center bg-white rounded-lg border border-gray-200"><button onClick={() => handleNightChange(-1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"><Minus size={12}/></button><span className="w-6 text-center font-bold">{selections.pads.nightCount}</span><button onClick={() => handleNightChange(1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100"><Plus size={12}/></button></div></div>
                 </div>
            </div>
            <BrandItemRow label={text.items.tampons} count={selections.tampons.count} onCountChange={(v: number) => handleCountChange('tampons', v)} brand={selections.tampons.brand} brandsList={activeBrands.tampons} onBrandChange={(b: string) => handleBrandChange('tampons', b)} brandLabel={text.labels.brand} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">{text.sections.care}</h3>
            <SimpleItemRow label={text.items.chocolate} count={selections.chocolate.count} onChange={(v: number) => handleCountChange('chocolate', v)} />
            <SimpleItemRow label={text.items.tea} count={selections.tea.count} onChange={(v: number) => handleCountChange('tea', v)} />
          </div>

          <div className="bg-gradient-to-r from-vela-navy/5 to-vela-gold/10 rounded-2xl p-6 shadow-md border border-vela-gold/30">
            <div className="flex items-center gap-2 mb-4 border-b border-vela-gold/20 pb-2"><Flame size={18} className="text-vela-gold" /><h3 className="font-bold text-vela-navy">{text.sections.addons}</h3></div>
            <SimpleItemRow label={text.items.heatPatch} count={selections.heatPatch.count} onChange={(v: number) => handleCountChange('heatPatch', v)} isUpsell />
            <SimpleItemRow label={text.items.wipes} count={selections.wipes.count} onChange={(v: number) => handleCountChange('wipes', v)} isUpsell />
            <div className="mt-4 pt-4 border-t border-vela-gold/10"><SimpleItemRow label={text.items.hotWaterBottle} count={selections.hotWaterBottle.count} onChange={(v: number) => handleCountChange('hotWaterBottle', v)} isUpsell isSpecial /></div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-2xl z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div><div className="text-xs text-gray-500">{text.total}</div><div className="text-2xl font-bold text-vela-navy font-sans">{formatPrice(calculateTotal())} <span className="text-sm font-light">{text.currency}</span></div></div>
          <button onClick={handleCheckout} className="bg-vela-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-vela-navy/90 transition-all flex items-center gap-2 shadow-lg"><span>{text.checkout}</span><ShoppingCart size={18} /></button>
        </div>
      </div>
    </div>
  );
}

function BrandItemRow({ label, count, onCountChange, brand, brandsList, onBrandChange, brandLabel }: any) {
  return (<div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 gap-3"><div className="flex flex-col gap-1 w-full md:w-auto"><span className="font-medium text-gray-700">{label}</span><div className="flex items-center gap-2 text-sm text-gray-500"><span className="text-xs">{brandLabel}</span><select value={brand} onChange={(e) => onBrandChange(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-vela-gold text-vela-navy font-sans text-sm w-full md:w-auto">{brandsList.map((b: string) => <option key={b} value={b}>{b}</option>)}</select></div></div><div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200 self-end md:self-auto"><button onClick={() => onCountChange(-1)} disabled={count <= 0} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-500 hover:text-red-500 shadow-sm disabled:opacity-30"><Minus size={14} /></button><span className="w-8 text-center font-bold font-sans text-lg">{count}</span><button onClick={() => onCountChange(1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-vela-navy hover:bg-vela-gold hover:text-white shadow-sm"><Plus size={14} /></button></div></div>);
}

function SimpleItemRow({ label, count, onChange, isUpsell, isSpecial }: any) {
  return (<div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"><div className="flex items-center gap-2">{isUpsell && <div className={\`w-2 h-2 rounded-full animate-pulse \${isSpecial ? 'bg-red-500' : 'bg-vela-gold'}\`}></div>}<div className="flex items-center gap-2">{isSpecial && <ThermometerSun size={18} className="text-red-400" />}<span className={isUpsell ? 'font-medium text-vela-navy' : 'text-gray-700'}>{label}</span></div></div><div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200"><button onClick={() => onChange(-1)} disabled={count <= 0} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-500 hover:text-red-500 shadow-sm disabled:opacity-30"><Minus size={14} /></button><span className="w-6 text-center font-bold font-sans text-lg">{count}</span><button onClick={() => onChange(1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-vela-navy hover:bg-vela-gold hover:text-white shadow-sm"><Plus size={14} /></button></div></div>);
}`
};

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ تامپون‌ها صفر شدند + تقویم شمسی شد!");