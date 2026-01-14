const fs = require('fs');
const path = require('path');

const files = {
  // ۱. کارت محصول: نمایش شفاف قیمت ماهانه و قیمت کل
  "src/components/features/ProductCard.tsx": `'use client';
import { Check, Star, Crown, Gift, Zap, Info } from 'lucide-react';

interface Feature { text: string; included: boolean; }

interface ProductCardProps {
  title: string;
  pricePerMonth: string; // قیمت ماهانه (بعد از تخفیف)
  totalPrice: string;    // قیمت کل دوره (قابل پرداخت)
  billingText: string;
  features: Feature[];
  isRecommended?: boolean;
  isLuxury?: boolean;
  onSelect: () => void;
  actionLabel: string;
  popularLabel?: string;
  luxuryLabel?: string;
  points?: number;
  discountTag?: string;
  cycle: string;         // برای تشخیص نوع نمایش
}

export default function ProductCard({ 
  title, pricePerMonth, totalPrice, billingText, features, isRecommended, isLuxury, onSelect, actionLabel, popularLabel, luxuryLabel, points, discountTag, cycle
}: ProductCardProps) {
  return (
    <div className={\`relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] \${isLuxury ? 'bg-vela-navy text-white shadow-2xl border border-vela-gold' : isRecommended ? 'bg-white shadow-xl border-2 border-vela-gold relative z-10' : 'bg-white/60 shadow-lg border border-white'}\`}>
      
      {/* برچسب‌ها */}
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-gold text-vela-navy px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap z-20">
          <Star size={14} fill="currentColor" />
          <span>{popularLabel || 'محبوب‌ترین'}</span>
        </div>
      )}

      {isLuxury && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-navy border border-vela-gold text-vela-gold px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap z-20">
          <Crown size={14} fill="currentColor" />
          <span>{luxuryLabel || 'لوکس'}</span>
        </div>
      )}

      {/* تگ تخفیف */}
      {discountTag && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse shadow-sm">
          {discountTag}
        </div>
      )}

      <div className="text-center mb-6 mt-6">
        <h3 className="text-2xl font-serif font-bold mb-2 opacity-90">{title}</h3>
        
        {/* قیمت ماهانه */}
        <div className="flex items-baseline justify-center gap-1">
            <div className="text-4xl font-bold font-sans tracking-tight">{pricePerMonth}</div>
            <div className="text-sm opacity-60 font-medium">/ mo</div>
        </div>
        
        {/* قیمت کل دوره (محاسبه شده) */}
        {cycle !== '1mo' && (
            <div className="mt-2 text-sm font-bold bg-black/5 (isLuxury ? 'bg-white/10' : '') rounded-lg py-2 px-3 inline-block border border-black/5">
                Total: {totalPrice}
            </div>
        )}
        
        <div className="text-xs opacity-50 mt-1 font-sans">{billingText}</div>

        {/* امتیاز هوشمند */}
        {points && points > 0 ? (
            <div className="mt-3 flex items-center justify-center gap-1 text-vela-gold text-sm font-bold bg-vela-gold/10 py-1 px-3 rounded-full mx-auto w-fit">
                <Gift size={14} />
                <span>+{points} Pts</span>
            </div>
        ) : (
            <div className="mt-3 h-7"></div>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-grow px-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <div className={\`mt-0.5 min-w-[18px] \${feature.included ? (isLuxury ? 'text-vela-gold' : 'text-green-500') : 'text-gray-300'}\`}>
              <Check size={18} className={feature.included ? '' : 'opacity-0'} />
            </div>
            <span className={feature.included ? 'opacity-90 font-medium' : 'opacity-40 decoration-slice line-through'}>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={\`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 \${isLuxury ? 'bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-vela-navy text-white hover:bg-vela-navy/90'}\`}
      >
        <span>{actionLabel}</span>
      </button>
    </div>
  );
}`,

  // ۲. منطق محاسبات هوشمند (Box Builder)
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);
  const [lang, setLang] = useState('FA');
  const [cycle, setCycle] = useState<'1mo' | '3mo' | '6mo'>('3mo');

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      title: 'تنظیم برنامه اشتراک', selectTitle: 'انتخاب نوع عضویت', desc_init: 'تاریخ آخرین پریود را وارد کنید.',
      desc_date: 'ارسال بعدی: {date}', back: 'تغییر تاریخ', shipping: 'ارسال رایگان VIP',
      btnPrefix: 'انتخاب', btnSuffix: '',
      badges: { popular: 'محبوب‌ترین', luxury: 'لوکس' },
      cycles: { mo1: 'یک ماهه', mo3: '۳ ماهه', mo6: '۶ ماهه' },
      billing: { mo1: 'پرداخت ماهانه', mo3: 'پرداخت هر ۳ ماه', mo6: 'پرداخت هر ۶ ماه' },
      save: 'تخفیف',
      features: {
        p1: ["۱۰ عدد نوار بهداشتی (کاغذ معطر)", "بسته‌بندی اکو و مینیمال"],
        p2: ["۱۵ عدد نوار بهداشتی (کاغذ معطر)", "۱ دمنوش مخصوص VELA", "۱ شکلات تلخ دست‌ساز"],
        p3: ["۲۰ عدد نوار بهداشتی (کاغذ معطر)", "باکس هدیه لوکس", "پد گرمایی هدیه", "اکسسوری سورپرایز"]
      }
    },
    EN: {
      title: 'Setup Subscription', selectTitle: 'Choose Membership', desc_init: 'Enter last period.',
      desc_date: 'Next dispatch: {date}', back: 'Back', shipping: 'VIP Free Shipping',
      btnPrefix: 'Select', btnSuffix: '',
      badges: { popular: 'Most Popular', luxury: 'Luxury' },
      cycles: { mo1: 'Monthly', mo3: '3 Months', mo6: '6 Months' },
      billing: { mo1: 'Billed monthly', mo3: 'Billed every 3 months', mo6: 'Billed every 6 months' },
      save: 'SAVE',
      features: {
        p1: ["10x Scented Premium Pads", "Eco Packaging"],
        p2: ["15x Scented Premium Pads", "1x VELA Herbal Tea", "1x Artisan Chocolate"],
        p3: ["20x Scented Premium Pads", "Luxury Gift Box", "Free Heat Patch", "Surprise Accessory"]
      }
    },
    TR: {
      title: 'Abonelik Ayarla', selectTitle: 'Üyelik Seçin', desc_init: 'Tarih girin.',
      desc_date: 'Sonraki: {date}', back: 'Geri', shipping: 'Ücretsiz VIP Kargo',
      btnPrefix: '', btnSuffix: 'Seç',
      badges: { popular: 'En Popüler', luxury: 'Lüks' },
      cycles: { mo1: 'Aylık', mo3: '3 Aylık', mo6: '6 Aylık' },
      billing: { mo1: 'Aylık ödeme', mo3: '3 ayda bir ödeme', mo6: '6 ayda bir ödeme' },
      save: 'İNDİRİM',
      features: {
        p1: ["10x Parfümlü Premium Ped", "Eko Paket"],
        p2: ["15x Parfümlü Premium Ped", "1x VELA Çayı", "1x El Yapımı Çikolata"],
        p3: ["20x Parfümlü Premium Ped", "Lüks Hediye Kutusu", "Hediye Isı Bandı", "Sürpriz Aksesuar"]
      }
    },
    RU: {
      title: 'Подписка', selectTitle: 'Выберите план', desc_init: 'Введите дату.',
      desc_date: 'След. отправка: {date}', back: 'Назад', shipping: 'VIP Доставка',
      btnPrefix: 'Выбрать', btnSuffix: '',
      badges: { popular: 'Популярное', luxury: 'Люкс' },
      cycles: { mo1: '1 Месяц', mo3: '3 Месяца', mo6: '6 Месяцев' },
      billing: { mo1: 'Ежемесячно', mo3: 'Раз в 3 мес.', mo6: 'Раз в 6 мес.' },
      save: 'СКИДКА',
      features: {
        p1: ["10x Ароматизированных прокладок", "Эко-упаковка"],
        p2: ["15x Прокладок", "1x Чай VELA", "1x Шоколад"],
        p3: ["20x Прокладок", "Подарочный бокс", "Термопластырь", "Сюрприз"]
      }
    }
  };

  const text = t[lang] || t.FA;
  const f = text.features;
  const getButtonLabel = (name: string) => lang === 'TR' ? \`\${name} \${text.btnSuffix}\` : \`\${text.btnPrefix} \${name}\`;
  
  // ⚙️ تنظیمات محاسباتی
  const cycleConfig = {
    '1mo': { months: 1, discount: 0, pointMultiplier: 1 },
    '3mo': { months: 3, discount: 0.05, pointMultiplier: 1.2 }, // ضریب امتیاز ۱.۲ برای ۳ ماه
    '6mo': { months: 6, discount: 0.10, pointMultiplier: 1.5 }  // ضریب امتیاز ۱.۵ برای ۶ ماه
  };

  // 💰 قیمت پایه (بدون تخفیف) و امتیاز پایه (هر ماه)
  const baseData = { 
    p1: { fa: 395000, other: 380, basePoints: 20 },
    p2: { fa: 750000, other: 680, basePoints: 50 }, 
    p3: { fa: 1550000, other: 1350, basePoints: 100 } 
  };

  // 🧮 تابع محاسبات هوشمند
  const calculateSmartPrice = (data: any) => {
    const market = lang === 'FA' ? 'fa' : 'other';
    const currency = lang === 'FA' ? 'تومان' : 'TL';
    const formatter = new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US');
    const basePrice = data[market];

    const { months, discount, pointMultiplier } = cycleConfig[cycle];

    // ۱. قیمت ماهانه با اعمال تخفیف
    const monthlyPrice = Math.floor(basePrice * (1 - discount));

    // ۲. قیمت کل (قابل پرداخت)
    const totalPrice = monthlyPrice * months;

    // ۳. امتیاز کل (پایه * ماه * ضریب تشویقی)
    const totalPoints = Math.floor((data.basePoints * months) * pointMultiplier);

    return {
        displayMonthly: formatter.format(monthlyPrice),
        displayTotal: \`\${formatter.format(totalPrice)} \${currency}\`,
        rawMonthly: monthlyPrice, // برای ذخیره
        points: totalPoints,
        discountTag: discount > 0 ? \`\${text.save} \${discount * 100}%\` : undefined
    };
  };

  const products = [
    { 
        id: 1, title: "Essential", 
        calc: calculateSmartPrice(baseData.p1),
        features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] 
    },
    { 
        id: 2, title: "Care", 
        calc: calculateSmartPrice(baseData.p2),
        isRecommended: true, 
        features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] 
    },
    { 
        id: 3, title: "Bliss", 
        calc: calculateSmartPrice(baseData.p3),
        isLuxury: true, 
        features: [{text:f.p3[0],included:true}, {text:f.p3[1],included:true}, {text:f.p3[2],included:true}, {text:f.p3[3],included:true}] 
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === 'FA') return new Intl.DateTimeFormat('fa-IR', { calendar: 'persian', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    return date.toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'TR' ? 'tr-TR' : 'en-US');
  };

  const handleSelectProduct = (product: any) => {
    localStorage.setItem('vela-cart', JSON.stringify({ 
        ...product, 
        cycle: cycle, 
        rawPrice: { fa: product.calc.rawMonthly, other: product.calc.rawMonthly }, 
        dispatchDate: dates.dispatchDate, 
        isEco: isEco 
    }));
    router.push('/customize');
  };

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-serif text-vela-navy mb-4 text-center font-bold">{dates ? text.selectTitle : text.title}</h1>
          <p className="text-gray-500 max-w-lg text-center text-lg">{dates ? text.desc_date.replace('{date}', formatDate(dates.dispatchDate)) : text.desc_init}</p>
        </div>

        <div className={\`transition-all duration-500 \${dates ? 'hidden md:block opacity-50' : ''}\`}>
           {!dates && <CycleCalculator language={lang} onDateSelected={setDates} />}
        </div>

        {dates && (
          <div className="animate-fade-in-up space-y-6 mt-6">
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-2"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span></button>
            
            <div className="flex justify-center mb-6">
                 <div className="w-full max-w-md transform scale-90">
                    <EcoToggle language={lang} onToggle={setIsEco} />
                 </div>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-sm flex relative">
                    {['1mo', '3mo', '6mo'].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCycle(c as any)}
                            className={\`px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all relative z-10 \${cycle === c ? 'bg-vela-navy text-white shadow-lg' : 'text-gray-500 hover:text-vela-navy'}\`}
                        >
                            {/* @ts-ignore */}
                            {text.cycles[c]}
                            {c !== '1mo' && cycle !== c && <span className="absolute -top-2 -right-2 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full border border-red-200">Save</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title} 
                    pricePerMonth={product.calc.displayMonthly} 
                    totalPrice={product.calc.displayTotal}
                    cycle={cycle}
                    // @ts-ignore
                    billingText={text.billing[cycle]}
                    features={product.features} 
                    isRecommended={product.isRecommended} 
                    isLuxury={product.isLuxury} 
                    actionLabel={getButtonLabel(product.title)} 
                    onSelect={() => handleSelectProduct(product)}
                    popularLabel={text.badges.popular}
                    luxuryLabel={text.badges.luxury}
                    points={product.calc.points}
                    discountTag={product.calc.discountTag}
                  />
                </div>
              ))}
            </div>

            {cycle !== '1mo' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl text-center text-orange-700 text-sm border border-orange-100 flex justify-center items-center gap-2 max-w-2xl mx-auto mt-6">
                    <Info size={16} />
                    <span>
                        {lang === 'FA' 
                         ? 'با خرید اشتراک، امتیاز بیشتری دریافت می‌کنید که برای دریافت هدایا در خرید بعدی استفاده می‌شود.' 
                         : 'Subscriptions earn bonus points! Use them to redeem gifts on your next renewal.'}
                    </span>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
}
console.log("✅ سیستم محاسبات هوشمند اشتراک و امتیازدهی فعال شد!");