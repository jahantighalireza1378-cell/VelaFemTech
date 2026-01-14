const fs = require('fs');
const path = require('path');

const files = {
  // ۱. کارت محصول آپدیت شده (نمایش قیمت ماهانه + امتیاز)
  "src/components/features/ProductCard.tsx": `'use client';
import { Check, Star, Crown, Gift, Zap } from 'lucide-react';

interface Feature { text: string; included: boolean; }

interface ProductCardProps {
  title: string;
  pricePerMonth: string; // قیمت هر ماه
  totalPrice?: string;   // قیمت کل دوره (برای شفافیت)
  billingText: string;   // متن دوره (مثلا: پرداخت هر ۳ ماه)
  features: Feature[];
  isRecommended?: boolean;
  isLuxury?: boolean;
  onSelect: () => void;
  actionLabel: string;
  popularLabel?: string;
  luxuryLabel?: string;
  points?: number;       // امتیاز دریافتی
  discountTag?: string;  // برچسب تخفیف (مثلا ۱۰٪)
}

export default function ProductCard({ 
  title, pricePerMonth, totalPrice, billingText, features, isRecommended, isLuxury, onSelect, actionLabel, popularLabel, luxuryLabel, points, discountTag
}: ProductCardProps) {
  return (
    <div className={\`relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] \${isLuxury ? 'bg-vela-navy text-white shadow-2xl border border-vela-gold' : isRecommended ? 'bg-white shadow-xl border-2 border-vela-gold relative z-10' : 'bg-white/60 shadow-lg border border-white'}\`}>
      
      {/* برچسب‌های بالای کارت */}
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

      {/* تخفیف ویژه دوره */}
      {discountTag && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse">
          {discountTag}
        </div>
      )}

      <div className="text-center mb-6 mt-4">
        <h3 className="text-xl font-serif font-bold mb-1 opacity-90">{title}</h3>
        
        {/* قیمت‌گذاری اشتراکی */}
        <div className="flex items-baseline justify-center gap-1">
            <div className="text-3xl font-bold font-sans">{pricePerMonth}</div>
            <div className="text-sm opacity-60">/ mo</div>
        </div>
        <div className="text-xs opacity-50 mt-1 font-sans">{billingText}</div>

        {/* بخش امتیاز (Gamification) */}
        {points && points > 0 ? (
            <div className="mt-3 inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-3 py-1 rounded-full text-sm text-vela-gold border border-vela-gold/30">
                <Gift size={14} />
                <span className="font-bold">+{points} Pts</span>
            </div>
        ) : (
            <div className="mt-3 h-7"></div> // فضای خالی برای تراز ماندن
        )}
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
        className={\`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 \${isLuxury ? 'bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-vela-navy text-white hover:bg-vela-navy/90'}\`}
      >
        <span>{actionLabel}</span>
        {points && points > 0 && <Zap size={16} fill="currentColor" />}
      </button>
      
      {totalPrice && (
         <div className="text-center mt-3 text-xs opacity-40 font-sans">
            Total: {totalPrice}
         </div>
      )}
    </div>
  );
}`,

  // ۲. صفحه انتخاب پکیج (Box Builder) با سیستم تب‌های اشتراک
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, Calendar, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);
  const [lang, setLang] = useState('FA');
  const [cycle, setCycle] = useState<'1mo' | '3mo' | '6mo'>('3mo'); // پیش‌فرض روی ۳ ماهه (تشویق)

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      title: 'تنظیم برنامه اشتراک', selectTitle: 'انتخاب نوع عضویت', desc_init: 'تاریخ آخرین پریود را وارد کنید.',
      desc_date: 'ارسال بعدی: {date}', back: 'تغییر تاریخ', shipping: 'اشتراک شامل ارسال رایگان VIP است',
      btnPrefix: 'عضویت', btnSuffix: '',
      badges: { popular: 'محبوب‌ترین', luxury: 'لوکس' },
      cycles: { 
        mo1: 'یک ماهه', 
        mo3: '۳ ماهه (پیشنهادی)', 
        mo6: '۶ ماهه (به‌صرفه‌ترین)' 
      },
      billing: {
        mo1: 'صورتحساب ماهانه',
        mo3: 'صورتحساب هر ۳ ماه',
        mo6: 'صورتحساب هر ۶ ماه'
      },
      save: 'تخفیف',
      features: {
        p1: ["۱۰ عدد نوار بهداشتی (کاغذ معطر)", "بسته‌بندی اکو و مینیمال"],
        p2: ["۱۵ عدد نوار بهداشتی (کاغذ معطر)", "۱ دمنوش مخصوص VELA", "۱ شکلات تلخ دست‌ساز"],
        p3: ["۲۰ عدد نوار بهداشتی (کاغذ معطر)", "باکس هدیه لوکس", "پد گرمایی هدیه", "اکسسوری سورپرایز"]
      }
    },
    EN: {
      title: 'Setup Subscription', selectTitle: 'Choose Membership', desc_init: 'Enter last period.',
      desc_date: 'Next dispatch: {date}', back: 'Change Date', shipping: 'Subscription includes VIP Shipping',
      btnPrefix: 'Join', btnSuffix: '',
      badges: { popular: 'Most Popular', luxury: 'Luxury' },
      cycles: { mo1: 'Monthly', mo3: '3 Months (Best)', mo6: '6 Months (Saver)' },
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
      desc_date: 'Sonraki: {date}', back: 'Geri', shipping: 'Abonelik VIP Kargo içerir',
      btnPrefix: '', btnSuffix: 'Katıl',
      badges: { popular: 'En Popüler', luxury: 'Lüks' },
      cycles: { mo1: 'Aylık', mo3: '3 Aylık (Önerilen)', mo6: '6 Aylık (Ekonomik)' },
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
      desc_date: 'След. отправка: {date}', back: 'Назад', shipping: 'VIP Доставка включена',
      btnPrefix: 'Купить', btnSuffix: '',
      badges: { popular: 'Популярное', luxury: 'Люкс' },
      cycles: { mo1: '1 Месяц', mo3: '3 Месяца (Хит)', mo6: '6 Месяцев (Выгодно)' },
      billing: { mo1: 'Ежемесячно', mo3: 'Раз в 3 месяца', mo6: 'Раз в 6 месяцев' },
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
  
  // 💰 تنظیمات اشتراک (تخفیف و امتیاز)
  const cycleConfig = {
    '1mo': { discount: 0, pointsMultiplier: 0 },
    '3mo': { discount: 0.05, pointsMultiplier: 1 }, // 5% تخفیف
    '6mo': { discount: 0.10, pointsMultiplier: 2.5 } // 10% تخفیف
  };

  // قیمت‌های پایه ماهانه (بدون تخفیف)
  const baseMonthlyPrices = { 
    p1: { fa: 395000, other: 380, basePoints: 0 },
    p2: { fa: 750000, other: 680, basePoints: 150 }, // امتیاز پایه برای ۳ ماه
    p3: { fa: 1550000, other: 1350, basePoints: 400 } 
  };

  const getPriceData = (rawPrice: any, basePoints: number) => {
    const market = lang === 'FA' ? 'fa' : 'other';
    const base = rawPrice[market];
    
    // اعمال تخفیف
    const discount = cycleConfig[cycle].discount;
    const monthlyPrice = base * (1 - discount);
    
    // محاسبه قیمت کل دوره
    const months = cycle === '1mo' ? 1 : cycle === '3mo' ? 3 : 6;
    const total = monthlyPrice * months;

    // محاسبه امتیاز
    const points = cycle === '1mo' ? 0 : Math.floor(basePoints * cycleConfig[cycle].pointsMultiplier);

    const currency = lang === 'FA' ? 'تومان' : 'TL';
    const formatter = new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US');

    return {
        perMonth: \`\${formatter.format(Math.round(monthlyPrice/1000)*1000)}\`, // گرد کردن
        total: \`\${formatter.format(Math.round(total/1000)*1000)} \${currency}\`,
        points: points,
        discountTag: discount > 0 ? \`\${text.save} \${discount * 100}%\` : undefined
    };
  };

  const products = [
    { 
        id: 1, title: "Essential", 
        data: getPriceData(baseMonthlyPrices.p1, 0),
        features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] 
    },
    { 
        id: 2, title: "Care", 
        data: getPriceData(baseMonthlyPrices.p2, 150),
        isRecommended: true, 
        features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] 
    },
    { 
        id: 3, title: "Bliss", 
        data: getPriceData(baseMonthlyPrices.p3, 200),
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
        cycle: cycle, // ذخیره نوع اشتراک
        rawPrice: { fa: parseInt(product.data.perMonth.replace(/,/g,'')), other: parseInt(product.data.perMonth.replace(/,/g,'')) }, // قیمت ساده برای محاسبات بعدی
        dispatchDate: dates.dispatchDate, 
        isEco: isEco 
    }));
    router.push('/customize');
  };

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif text-vela-navy mb-4 text-center font-bold">{dates ? text.selectTitle : text.title}</h1>
          <p className="text-gray-500 max-w-lg text-center text-lg">{dates ? text.desc_date.replace('{date}', formatDate(dates.dispatchDate)) : text.desc_init}</p>
        </div>

        <div className={\`transition-all duration-500 \${dates ? 'hidden md:block opacity-50' : ''}\`}>
           {!dates && <CycleCalculator language={lang} onDateSelected={setDates} />}
        </div>

        {dates && (
          <div className="animate-fade-in-up space-y-8 mt-8">
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-4"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span></button>
            
            {/* 🔄 انتخابگر سیکل اشتراک (تب‌ها) */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-sm flex relative">
                    {['1mo', '3mo', '6mo'].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCycle(c as any)}
                            className={\`px-6 py-3 rounded-xl text-sm font-bold transition-all relative z-10 \${cycle === c ? 'bg-vela-navy text-white shadow-lg' : 'text-gray-500 hover:text-vela-navy'}\`}
                        >
                            {/* @ts-ignore */}
                            {text.cycles[c]}
                            {c !== '1mo' && cycle !== c && <span className="absolute -top-2 -right-2 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full border border-red-200">Save</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title} 
                    pricePerMonth={product.data.perMonth} 
                    totalPrice={product.data.total}
                    // @ts-ignore
                    billingText={text.billing[cycle]}
                    features={product.features} 
                    isRecommended={product.isRecommended} 
                    isLuxury={product.isLuxury} 
                    actionLabel={getButtonLabel(product.title)} 
                    onSelect={() => handleSelectProduct(product)}
                    popularLabel={text.badges.popular}
                    luxuryLabel={text.badges.luxury}
                    points={product.data.points}
                    discountTag={product.data.discountTag}
                  />
                </div>
              ))}
            </div>

            {/* توضیحات امتیاز */}
            {cycle !== '1mo' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl text-center text-orange-700 text-sm border border-orange-100 flex justify-center items-center gap-2 max-w-2xl mx-auto">
                    <Info size={16} />
                    <span>
                        {lang === 'FA' 
                         ? 'امتیازهای دریافتی برای دریافت «شکلات، دمنوش و اکسسوری رایگان» در خریدهای بعدی قابل استفاده است.' 
                         : 'Use earned points to redeem Free Chocolate, Tea & Accessories on your next renewal.'}
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
console.log("🔄 سیستم اشتراک ماهانه (Subscription) فعال شد!");