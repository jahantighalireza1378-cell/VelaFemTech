const fs = require('fs');
const path = require('path');

const files = {
  // ۱. آپدیت کارت محصول: دریافت متن برچسب‌ها از بیرون (برای ترجمه پذیر بودن)
  "src/components/features/ProductCard.tsx": `'use client';
import { Check, Star, Crown } from 'lucide-react';

interface Feature { text: string; included: boolean; }

interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  features: Feature[];
  isRecommended?: boolean;
  isLuxury?: boolean;
  onSelect: () => void;
  actionLabel: string;
  // ویژگی‌های جدید برای ترجمه برچسب‌ها
  popularLabel?: string;
  luxuryLabel?: string;
}

export default function ProductCard({ 
  title, price, features, isRecommended, isLuxury, onSelect, actionLabel, popularLabel, luxuryLabel
}: ProductCardProps) {
  return (
    <div className={\`relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 hover:scale-105 \${isLuxury ? 'bg-vela-navy text-white shadow-2xl border border-vela-gold' : isRecommended ? 'bg-white shadow-xl border-2 border-vela-gold relative z-10' : 'bg-white/60 shadow-lg border border-white'}\`}>
      
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-gold text-vela-navy px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
          <Star size={14} fill="currentColor" />
          <span>{popularLabel || 'محبوب‌ترین'}</span>
        </div>
      )}

      {isLuxury && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-navy border border-vela-gold text-vela-gold px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap">
          <Crown size={14} fill="currentColor" />
          <span>{luxuryLabel || 'لوکس'}</span>
        </div>
      )}

      <div className="text-center mb-6 mt-4">
        <h3 className="text-xl font-serif font-bold mb-2 opacity-90">{title}</h3>
        <div className="text-3xl font-bold font-sans">{price}</div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <div className={\`mt-1 min-w-[18px] \${feature.included ? (isLuxury ? 'text-vela-gold' : 'text-green-500') : 'text-gray-300'}\`}>
              <Check size={18} className={feature.included ? '' : 'opacity-0'} />
            </div>
            <span className={feature.included ? 'opacity-90' : 'opacity-40 decoration-slice line-through'}>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={\`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 \${isLuxury ? 'bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-vela-navy text-white hover:bg-vela-navy/90'}\`}
      >
        {actionLabel}
      </button>
    </div>
  );
}`,

  // ۲. آپدیت صفحه انتخاب (Builder): ارسال ترجمه برچسب‌ها به کارت
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
      badges: { popular: 'محبوب‌ترین', luxury: 'لوکس' }, // ترجمه برچسب‌ها
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

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'FA' ? 'fa-IR' : lang === 'TR' ? 'tr-TR' : 'en-US');

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
                    popularLabel={text.badges.popular} // ارسال متن ترجمه شده
                    luxuryLabel={text.badges.luxury}   // ارسال متن ترجمه شده
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

  // ۳. آپدیت صفحه شخصی‌سازی: محاسبه دقیق قیمت قبل از رفتن به پرداخت
  "src/app/customize/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingCart, ArrowRight, Flame, MapPin, ThermometerSun } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [market, setMarket] = useState('IR'); 
  const [basePackage, setBasePackage] = useState<any>(null);
  const [selections, setSelections] = useState({
    pads: { count: 0, brand: '' }, tampons: { count: 0, brand: '' },
    chocolate: { count: 0 }, tea: { count: 0 }, heatPatch: { count: 0 }, wipes: { count: 0 }, hotWaterBottle: { count: 0 }
  });

  const brands = { IR: { pads: ["پنبه‌ریز", "مای‌لدی", "تافته"], tampons: ["Tampax", "Kotex", "o.b."] }, TR: { pads: ["Orkid", "Kotex", "Molped"], tampons: ["Tampax", "Kotex", "o.b."] } };
  const unitPrices = { pads: { IR: 5000, TR: 5 }, tampons: { IR: 8000, TR: 8 }, chocolate: { IR: 45000, TR: 40 }, tea: { IR: 30000, TR: 30 }, heatPatch: { IR: 25000, TR: 25 }, wipes: { IR: 20000, TR: 20 }, hotWaterBottle: { IR: 190000, TR: 200 } };

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const defaultMarket = (localStorage.getItem('vela-lang') || 'FA') === 'FA' ? 'IR' : 'TR';
    setMarket(defaultMarket);
    
    // بازخوانی اطلاعات سبد خرید
    const savedCart = localStorage.getItem('vela-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setBasePackage(parsedCart);
      // تنظیم مقادیر اولیه (اگر قبلا ست نشده بود)
      const initialBrands = defaultMarket === 'IR' ? brands.IR : brands.TR;
      let defaults = { pads: 0, tampons: 0, chocolate: 0, tea: 0, heatPatch: 0, wipes: 0, hotWaterBottle: 0 };
      if (parsedCart.id === 1) defaults = { ...defaults, pads: 10, tampons: 5 };
      if (parsedCart.id === 2) defaults = { ...defaults, pads: 15, tampons: 10, chocolate: 1, tea: 1 };
      if (parsedCart.id === 3) defaults = { ...defaults, pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1 };
      setSelections({ pads: { count: defaults.pads, brand: initialBrands.pads[0] }, tampons: { count: defaults.tampons, brand: initialBrands.tampons[0] }, chocolate: { count: defaults.chocolate }, tea: { count: defaults.tea }, heatPatch: { count: defaults.heatPatch }, wipes: { count: defaults.wipes }, hotWaterBottle: { count: defaults.hotWaterBottle } });
    }
    
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const toggleMarket = () => { const newMarket = market === 'IR' ? 'TR' : 'IR'; setMarket(newMarket); };

  const handleCountChange = (item: string, change: number) => {
    setSelections(prev => {
      // @ts-ignore
      const newVal = (prev[item].count ?? prev[item].count) + change; 
      const newItem = { ...(prev as any)[item], count: newVal < 0 ? 0 : newVal };
      return { ...prev, [item]: newItem };
    });
  };

  const calculateTotal = () => {
    if (!basePackage) return 0;
    let total = market === 'IR' ? basePackage.rawPrice.fa : basePackage.rawPrice.other;
    const defaults = basePackage.id === 1 ? { pads: 10, tampons: 5 } : basePackage.id === 2 ? { pads: 15, tampons: 10, chocolate: 1, tea: 1 } : { pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1 };
    Object.keys(selections).forEach(key => {
        const k = key as keyof typeof selections;
        // @ts-ignore
        const count = selections[k].count; const def = (defaults as any)[k] || 0; const extra = count - def;
        if (extra > 0) { const price = (unitPrices as any)[k][market]; total += extra * price; }
    });
    return total;
  };

  const handleCheckout = () => {
    // محاسبه دقیق قیمت نهایی
    const finalTotal = calculateTotal();
    
    // ذخیره سفارش نهایی با قیمت محاسبه شده
    const finalOrder = {
      ...basePackage,
      finalQuantities: selections,
      market: market, // ذخیره بازار انتخابی
      totalPrice: finalTotal // این قیمت باید به صفحه بعد برود
    };
    
    localStorage.setItem('vela-final-order', JSON.stringify(finalOrder));
    router.push('/checkout');
  };

  const t: any = {
    FA: { title: 'شخصی‌سازی بسته', subtitle: 'برند و تعداد را تنظیم کنید', currency: market === 'IR' ? 'تومان' : 'TL', total: 'مبلغ نهایی', checkout: 'تایید و پرداخت', back: 'بازگشت', items: { pads: 'نوار بهداشتی', tampons: 'تامپون', chocolate: 'شکلات', tea: 'دمنوش', heatPatch: 'پد گرمایی', wipes: 'دستمال مرطوب', hotWaterBottle: 'کیسه آب گرم' } },
    EN: { title: 'Customize Box', subtitle: 'Adjust items and brands', currency: 'TL', total: 'Total', checkout: 'Checkout', back: 'Back', items: { pads: 'Pads', tampons: 'Tampons', chocolate: 'Chocolate', tea: 'Tea', heatPatch: 'Heat Patch', wipes: 'Wipes', hotWaterBottle: 'Hot Water Bottle' } },
    TR: { title: 'Paketi Düzenle', subtitle: 'Ürün ve adetleri seçin', currency: 'TL', total: 'Toplam', checkout: 'Ödemeye Geç', back: 'Geri', items: { pads: 'Ped', tampons: 'Tampon', chocolate: 'Çikolata', tea: 'Çay', heatPatch: 'Isı Bandı', wipes: 'Mendil', hotWaterBottle: 'Sıcak Su Torbası' } },
    RU: { title: 'Настройка бокса', subtitle: 'Выберите количество', currency: 'TL', total: 'Итого', checkout: 'Оформить', back: 'Назад', items: { pads: 'Прокладки', tampons: 'Тампоны', chocolate: 'Шоколад', tea: 'Чай', heatPatch: 'Грелка', wipes: 'Салфетки', hotWaterBottle: 'Водяная грелка' } }
  };
  const text = t[lang] || t.FA;
  const formatPrice = (amount: number) => new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
  if (!basePackage) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-vela-marble pb-32">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between mb-8"><button onClick={() => router.back()} className="flex gap-2 text-gray-500"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'}/>{text.back}</button><button onClick={toggleMarket} className="flex gap-2 px-3 py-1 bg-white border rounded-full text-xs"><MapPin size={12}/>{market}</button></div>
        <h1 className="text-3xl font-serif text-center font-bold text-vela-navy mb-8">{text.title}</h1>
        {/* خلاصه لیست برای تست */}
        <div className="space-y-4">
             <div className="bg-white p-4 rounded-xl border"><ItemRow label={text.items.pads} count={selections.pads.count} onChange={(v:number)=>handleCountChange('pads',v)}/></div>
             <div className="bg-white p-4 rounded-xl border"><ItemRow label={text.items.hotWaterBottle} count={selections.hotWaterBottle.count} onChange={(v:number)=>handleCountChange('hotWaterBottle',v)} isUpsell isSpecial/></div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-2xl z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div><div className="text-xs text-gray-500">{text.total}</div><div className="text-2xl font-bold text-vela-navy">{formatPrice(calculateTotal())} <span className="text-sm">{text.currency}</span></div></div>
          <button onClick={handleCheckout} className="bg-vela-navy text-white px-8 py-3 rounded-xl font-bold flex gap-2"><span>{text.checkout}</span><ShoppingCart size={18}/></button>
        </div>
      </div>
    </div>
  );
}
function ItemRow({ label, count, onChange, isUpsell, isSpecial }: any) {
  return (<div className="flex justify-between items-center py-2"><div className="flex gap-2 items-center">{isUpsell && <div className={\`w-2 h-2 rounded-full \${isSpecial?'bg-red-500':'bg-vela-gold'}\`}></div>}<span>{label}</span></div><div className="flex gap-3 bg-gray-50 rounded-lg p-1 border"><button onClick={()=>onChange(-1)} disabled={count<=0} className="w-8 h-8 flex justify-center items-center bg-white"><Minus size={14}/></button><span className="w-6 text-center font-bold">{count}</span><button onClick={()=>onChange(1)} className="w-8 h-8 flex justify-center items-center bg-white"><Plus size={14}/></button></div></div>);
}`
};

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ تعمیرات انجام شد: ۱. برچسب‌های ترجمه شده ۲. انتقال صحیح قیمت نهایی");