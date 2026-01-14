const fs = require('fs');
const path = require('path');

const customizePageContent = `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingCart, ArrowRight, Flame, MapPin, ThermometerSun } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [market, setMarket] = useState('IR'); 
  const [basePackage, setBasePackage] = useState<any>(null);
  
  // بازگرداندن تمام گزینه‌ها (برند و تعداد)
  const [selections, setSelections] = useState({
    pads: { count: 0, brand: '' },
    tampons: { count: 0, brand: '' },
    chocolate: { count: 0 },
    tea: { count: 0 },
    heatPatch: { count: 0 },
    wipes: { count: 0 },
    hotWaterBottle: { count: 0 }
  });

  // لیست برندها (بازگردانی شده)
  const brands = {
    IR: {
      pads: ["پنبه‌ریز (Panberes)", "مای‌لدی (MyLady)", "تافته (Tafteh)"],
      tampons: ["تامپکس (Tampax)", "کوتکس (Kotex)", "او.بی (o.b.)"] 
    },
    TR: {
      pads: ["Orkid (Always)", "Kotex", "Molped"],
      tampons: ["Tampax", "Kotex", "o.b."]
    }
  };

  // قیمت‌ها (شامل کیسه آب گرم)
  const unitPrices = {
    pads: { IR: 5000, TR: 5 },
    tampons: { IR: 8000, TR: 8 },
    chocolate: { IR: 45000, TR: 40 },
    tea: { IR: 30000, TR: 30 },
    heatPatch: { IR: 25000, TR: 25 },
    wipes: { IR: 20000, TR: 20 },
    hotWaterBottle: { IR: 190000, TR: 200 }
  };

  useEffect(() => {
    // ۱. لود زبان و تنظیمات اولیه
    const savedLang = localStorage.getItem('vela-lang') || 'FA';
    setLang(savedLang);

    const defaultMarket = savedLang === 'FA' ? 'IR' : 'TR';
    setMarket(defaultMarket);
    const initialBrands = defaultMarket === 'IR' ? brands.IR : brands.TR;

    // ۲. لود سبد خرید
    const savedCart = localStorage.getItem('vela-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setBasePackage(parsedCart);
      
      // تنظیم مقادیر پیش‌فرض بر اساس پکیج
      let defaults = { pads: 0, tampons: 0, chocolate: 0, tea: 0, heatPatch: 0, wipes: 0, hotWaterBottle: 0 };
      if (parsedCart.id === 1) defaults = { ...defaults, pads: 10, tampons: 5 };
      if (parsedCart.id === 2) defaults = { ...defaults, pads: 15, tampons: 10, chocolate: 1, tea: 1 };
      if (parsedCart.id === 3) defaults = { ...defaults, pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1 };

      setSelections({
        pads: { count: defaults.pads, brand: initialBrands.pads[0] },
        tampons: { count: defaults.tampons, brand: initialBrands.tampons[0] },
        chocolate: { count: defaults.chocolate },
        tea: { count: defaults.tea },
        heatPatch: { count: defaults.heatPatch },
        wipes: { count: defaults.wipes },
        hotWaterBottle: { count: defaults.hotWaterBottle }
      });
    }

    // لیسنر تغییر زبان
    const handleLangChange = () => {
        const newLang = localStorage.getItem('vela-lang') || 'FA';
        setLang(newLang);
    };
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
      items: { 
        pads: 'نوار بهداشتی', tampons: 'تامپون', chocolate: 'شکلات تلخ', tea: 'دمنوش', 
        heatPatch: 'پد گرمایی (یکبار مصرف)', wipes: 'دستمال مرطوب', 
        hotWaterBottle: 'کیسه آب گرم فانتزی' 
      },
      labels: { brand: 'انتخاب برند:', market: 'موقعیت فروشگاه:' },
      markets: { IR: 'ایران (تومان)', TR: 'ترکیه (لیر)' },
      currency: market === 'IR' ? 'تومان' : 'TL',
      total: 'مبلغ نهایی', checkout: 'تایید و پرداخت', back: 'بازگشت'
    },
    EN: {
      title: 'Customize Your Box', subtitle: 'Select your preferred brands and quantities.',
      sections: { sanitary: 'Sanitary Products', care: 'Care & Relax', addons: 'Special Add-ons' },
      items: { 
        pads: 'Sanitary Pads', tampons: 'Tampons', chocolate: 'Dark Chocolate', tea: 'Herbal Tea', 
        heatPatch: 'Heat Patch', wipes: 'Intimate Wipes', 
        hotWaterBottle: 'Hot Water Bottle' 
      },
      labels: { brand: 'Brand:', market: 'Store Region:' },
      markets: { IR: 'Iran (Toman)', TR: 'Turkey (TL)' },
      currency: 'TL',
      total: 'Total Amount', checkout: 'Checkout', back: 'Back'
    },
    TR: {
      title: 'Paketini Kişiselleştir', subtitle: 'Tercih ettiğiniz markaları ve adetleri seçin.',
      sections: { sanitary: 'Hijyen Ürünleri', care: 'Bakım ve Rahatlama', addons: 'Özel Ekstralar' },
      items: { 
        pads: 'Hijyenik Ped', tampons: 'Tampon', chocolate: 'Bitter Çikolata', tea: 'Bitki Çayı', 
        heatPatch: 'Isı Bandı', wipes: 'İntim Mendil', 
        hotWaterBottle: 'Sıcak Su Torbası' 
      },
      labels: { brand: 'Marka:', market: 'Mağaza Bölgesi:' },
      markets: { IR: 'İran (Toman)', TR: 'Türkiye (TL)' },
      currency: 'TL',
      total: 'Toplam Tutar', checkout: 'Ödemeye Geç', back: 'Geri'
    },
    RU: {
      title: 'Настройка бокса', subtitle: 'Выберите бренды и количество.',
      sections: { sanitary: 'Гигиена', care: 'Уход и релакс', addons: 'Дополнительно' },
      items: { 
        pads: 'Прокладки', tampons: 'Тампоны', chocolate: 'Шоколад', tea: 'Чай', 
        heatPatch: 'Термопластырь', wipes: 'Салфетки', 
        hotWaterBottle: 'Водяная грелка' 
      },
      labels: { brand: 'Бренд:', market: 'Регион:' },
      markets: { IR: 'Иран', TR: 'Турция' },
      currency: 'TL',
      total: 'Итого', checkout: 'Оформить', back: 'Назад'
    }
  };

  const text = t[lang] || t.FA;

  const handleCountChange = (item: string, change: number) => {
    setSelections(prev => {
      // @ts-ignore
      const current = prev[item].count !== undefined ? prev[item].count : prev[item].count; 
      // @ts-ignore
      const newVal = (prev[item].count ?? prev[item].count) + change; 
      const newItem = { ...(prev as any)[item], count: newVal < 0 ? 0 : newVal };
      return { ...prev, [item]: newItem };
    });
  };

  const handleBrandChange = (item: string, newBrand: string) => {
    setSelections(prev => ({ ...prev, [item]: { ...(prev as any)[item], brand: newBrand } }));
  };

  // محاسبه قیمت نهایی (با بازگردانی منطق دقیق)
  const calculateTotal = () => {
    if (!basePackage) return 0;
    let total = market === 'IR' ? basePackage.rawPrice.fa : basePackage.rawPrice.other;
    
    const defaults = basePackage.id === 1 ? { pads: 10, tampons: 5 } :
                     basePackage.id === 2 ? { pads: 15, tampons: 10, chocolate: 1, tea: 1 } :
                                            { pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1 };

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
    
    // ذخیره سفارش کامل برای صفحه بعد
    const finalOrder = {
      ...basePackage,
      finalQuantities: selections,
      market: market,
      totalPrice: finalTotal // ✅ فیکس شدن قیمت در صفحه بعد
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
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy text-sm">
            <ArrowRight size={14} className={lang === 'FA' ? '' : 'rotate-180'} />
            {text.back}
          </button>
          
          <button onClick={toggleMarket} className="flex items-center gap-2 px-3 py-1 bg-white border border-vela-gold/50 rounded-full text-xs text-vela-navy hover:bg-vela-gold/10 transition-colors">
            <MapPin size={12} />
            {text.labels.market} <strong>{market === 'IR' ? text.markets.IR : text.markets.TR}</strong>
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.title}</h1>
          <p className="text-gray-500">{text.subtitle}</p>
        </div>

        <div className="space-y-4">
          {/* ۱. بهداشتی + برند */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">{text.sections.sanitary}</h3>
            <BrandItemRow label={text.items.pads} count={selections.pads.count} onCountChange={(v: number) => handleCountChange('pads', v)} brand={selections.pads.brand} brandsList={activeBrands.pads} onBrandChange={(b: string) => handleBrandChange('pads', b)} brandLabel={text.labels.brand} />
            <BrandItemRow label={text.items.tampons} count={selections.tampons.count} onCountChange={(v: number) => handleCountChange('tampons', v)} brand={selections.tampons.brand} brandsList={activeBrands.tampons} onBrandChange={(b: string) => handleBrandChange('tampons', b)} brandLabel={text.labels.brand} />
          </div>

          {/* ۲. مراقبت */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">{text.sections.care}</h3>
            <SimpleItemRow label={text.items.chocolate} count={selections.chocolate.count} onChange={(v: number) => handleCountChange('chocolate', v)} />
            <SimpleItemRow label={text.items.tea} count={selections.tea.count} onChange={(v: number) => handleCountChange('tea', v)} />
          </div>

          {/* ۳. افزودنی‌ها + کیسه آب گرم */}
          <div className="bg-gradient-to-r from-vela-navy/5 to-vela-gold/10 rounded-2xl p-6 shadow-md border border-vela-gold/30">
            <div className="flex items-center gap-2 mb-4 border-b border-vela-gold/20 pb-2">
              <Flame size={18} className="text-vela-gold" />
              <h3 className="font-bold text-vela-navy">{text.sections.addons}</h3>
            </div>
            <SimpleItemRow label={text.items.heatPatch} count={selections.heatPatch.count} onChange={(v: number) => handleCountChange('heatPatch', v)} isUpsell />
            <SimpleItemRow label={text.items.wipes} count={selections.wipes.count} onChange={(v: number) => handleCountChange('wipes', v)} isUpsell />
            
            <div className="mt-4 pt-4 border-t border-vela-gold/10">
                <SimpleItemRow label={text.items.hotWaterBottle} count={selections.hotWaterBottle.count} onChange={(v: number) => handleCountChange('hotWaterBottle', v)} isUpsell isSpecial />
            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-2xl z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">{text.total}</div>
            <div className="text-2xl font-bold text-vela-navy font-sans">
              {formatPrice(calculateTotal())} <span className="text-sm font-light">{text.currency}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="bg-vela-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-vela-navy/90 transition-all flex items-center gap-2 shadow-lg">
            <span>{text.checkout}</span>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BrandItemRow({ label, count, onCountChange, brand, brandsList, onBrandChange, brandLabel }: any) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 gap-3 border-b border-gray-50 last:border-0">
      <div className="flex flex-col gap-1 w-full md:w-auto">
        <span className="font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-xs">{brandLabel}</span>
          <select value={brand} onChange={(e) => onBrandChange(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-vela-gold text-vela-navy font-sans text-sm w-full md:w-auto">
            {brandsList.map((b: string) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200 self-end md:self-auto">
        <button onClick={() => onCountChange(-1)} disabled={count <= 0} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-500 hover:text-red-500 shadow-sm disabled:opacity-30"><Minus size={14} /></button>
        <span className="w-8 text-center font-bold font-sans text-lg">{count}</span>
        <button onClick={() => onCountChange(1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-vela-navy hover:bg-vela-gold hover:text-white shadow-sm"><Plus size={14} /></button>
      </div>
    </div>
  );
}

function SimpleItemRow({ label, count, onChange, isUpsell, isSpecial }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2">
        {isUpsell && <div className={\`w-2 h-2 rounded-full animate-pulse \${isSpecial ? 'bg-red-500' : 'bg-vela-gold'}\`}></div>}
        <div className="flex items-center gap-2">
            {isSpecial && <ThermometerSun size={18} className="text-red-400" />}
            <span className={isUpsell ? 'font-medium text-vela-navy' : 'text-gray-700'}>{label}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button onClick={() => onChange(-1)} disabled={count <= 0} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-500 hover:text-red-500 shadow-sm disabled:opacity-30"><Minus size={14} /></button>
        <span className="w-6 text-center font-bold font-sans text-lg">{count}</span>
        <button onClick={() => onChange(1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-vela-navy hover:bg-vela-gold hover:text-white shadow-sm"><Plus size={14} /></button>
      </div>
    </div>
  );
}`;

const targetPath = path.join(__dirname, 'src/app/customize/page.tsx');
fs.writeFileSync(targetPath, customizePageContent);
console.log("✅ صفحه شخصی‌سازی بازسازی شد: همه گزینه‌ها برگشتند + قیمت درست کار می‌کند.");