const fs = require('fs');
const path = require('path');

const files = {
  "src/app/box-builder/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';
import ProductCard from '@/components/features/ProductCard';
import EcoToggle from '@/components/features/EcoToggle';
import { ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
  const router = useRouter();
  const [dates, setDates] = useState<any>(null);
  const [isEco, setIsEco] = useState(false);
  const [lang, setLang] = useState('FA');
  const [cycle, setCycle] = useState<'1mo' | '3mo' | '6mo'>('3mo'); // پیش‌فرض ۳ ماهه

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      title: 'انتخاب طرح اشتراک', selectTitle: 'مدت زمان اشتراک خود را انتخاب کنید', desc_init: 'تاریخ آخرین پریود را وارد کنید.',
      desc_date: 'زمان‌بندی ارسال بعدی: {date}', back: 'تغییر تاریخ', shipping: 'ارسال رایگان VIP',
      btnPrefix: 'انتخاب', btnSuffix: '',
      badges: { popular: 'محبوب‌ترین', luxury: 'لوکس' },
      cycles: { mo1: 'یک ماهه', mo3: '۳ ماهه', mo6: '۶ ماهه' },
      billing: { mo1: 'پرداخت ماهانه', mo3: 'پرداخت یکجا (۳ ماه)', mo6: 'پرداخت یکجا (۶ ماه)' },
      save: 'تخفیف',
      features: {
        p1: ["۱۰ عدد نوار بهداشتی (کاغذ معطر)", "بسته‌بندی اکو و مینیمال"],
        p2: ["۱۵ عدد نوار بهداشتی (کاغذ معطر)", "۱ دمنوش مخصوص VELA", "۱ شکلات تلخ دست‌ساز"],
        p3: ["۲۰ عدد نوار بهداشتی (کاغذ معطر)", "باکس هدیه لوکس", "پد گرمایی هدیه", "اکسسوری سورپرایز"]
      }
    },
    EN: {
      title: 'Subscription Plan', selectTitle: 'Select Duration', desc_init: 'Enter last period.',
      desc_date: 'Next dispatch: {date}', back: 'Back', shipping: 'VIP Free Shipping',
      btnPrefix: 'Select', btnSuffix: '',
      badges: { popular: 'Most Popular', luxury: 'Luxury' },
      cycles: { mo1: '1 Month', mo3: '3 Months', mo6: '6 Months' },
      billing: { mo1: 'Billed monthly', mo3: 'Billed every 3 months', mo6: 'Billed every 6 months' },
      save: 'SAVE',
      features: {
        p1: ["10x Scented Premium Pads", "Eco Packaging"],
        p2: ["15x Scented Premium Pads", "1x VELA Herbal Tea", "1x Artisan Chocolate"],
        p3: ["20x Scented Premium Pads", "Luxury Gift Box", "Free Heat Patch", "Surprise Accessory"]
      }
    },
    TR: {
      title: 'Abonelik Planı', selectTitle: 'Süre Seçimi', desc_init: 'Tarih girin.',
      desc_date: 'Sonraki: {date}', back: 'Geri', shipping: 'Ücretsiz VIP Kargo',
      btnPrefix: '', btnSuffix: 'Seç',
      badges: { popular: 'En Popüler', luxury: 'Lüks' },
      cycles: { mo1: '1 Ay', mo3: '3 Ay', mo6: '6 Ay' },
      billing: { mo1: 'Aylık ödeme', mo3: '3 ayda bir ödeme', mo6: '6 ayda bir ödeme' },
      save: 'İNDİRİM',
      features: {
        p1: ["10x Parfümlü Premium Ped", "Eko Paket"],
        p2: ["15x Parfümlü Premium Ped", "1x VELA Çayı", "1x El Yapımı Çikolata"],
        p3: ["20x Parfümlü Premium Ped", "Lüks Hediye Kutusu", "Hediye Isı Bandı", "Sürpriz Aksesuar"]
      }
    },
    RU: {
      title: 'Подписка', selectTitle: 'Выберите срок', desc_init: 'Введите дату.',
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
  
  const cycleConfig = {
    '1mo': { months: 1, discount: 0, pointMultiplier: 1 },
    '3mo': { months: 3, discount: 0.05, pointMultiplier: 1.2 }, 
    '6mo': { months: 6, discount: 0.10, pointMultiplier: 1.5 }
  };

  const baseData = { 
    p1: { fa: 395000, other: 380, basePoints: 20 },
    p2: { fa: 750000, other: 680, basePoints: 50 }, 
    p3: { fa: 1550000, other: 1350, basePoints: 100 } 
  };

  const calculateSmartPrice = (data: any) => {
    const market = lang === 'FA' ? 'fa' : 'other';
    const currency = lang === 'FA' ? 'تومان' : 'TL';
    const formatter = new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US');
    const basePrice = data[market];
    const { months, discount, pointMultiplier } = cycleConfig[cycle];
    const monthlyPrice = Math.floor(basePrice * (1 - discount));
    const totalPrice = monthlyPrice * months;
    const totalPoints = Math.floor((data.basePoints * months) * pointMultiplier);

    return {
        displayMonthly: formatter.format(monthlyPrice),
        displayTotal: \`\${formatter.format(totalPrice)} \${currency}\`,
        rawMonthly: monthlyPrice,
        points: totalPoints,
        discountTag: discount > 0 ? \`\${text.save} \${discount * 100}%\` : undefined
    };
  };

  const products = [
    { id: 1, title: "Essential", calc: calculateSmartPrice(baseData.p1), features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] },
    { id: 2, title: "Care", calc: calculateSmartPrice(baseData.p2), isRecommended: true, features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] },
    { id: 3, title: "Bliss", calc: calculateSmartPrice(baseData.p3), isLuxury: true, features: [{text:f.p3[0],included:true}, {text:f.p3[1],included:true}, {text:f.p3[2],included:true}, {text:f.p3[3],included:true}] }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === 'FA') return new Intl.DateTimeFormat('fa-IR', { calendar: 'persian', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    return date.toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'TR' ? 'tr-TR' : 'en-US');
  };

  const handleSelectProduct = (product: any) => {
    localStorage.setItem('vela-cart', JSON.stringify({ 
        ...product, cycle: cycle, rawPrice: { fa: product.calc.rawMonthly, other: product.calc.rawMonthly }, 
        dispatchDate: dates.dispatchDate, isEco: isEco 
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
          <div className="animate-fade-in-up space-y-8 mt-6">
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-4"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span></button>
            
            <div className="flex justify-center mb-4">
                 <div className="w-full max-w-md transform scale-90">
                    <EcoToggle language={lang} onToggle={setIsEco} />
                 </div>
            </div>

            {/* ✅ دکمه‌های بزرگ انتخاب اشتراک (Segmented Control) */}
            <div className="flex justify-center w-full px-2">
                <div className="bg-white p-2 rounded-2xl shadow-md border border-gray-200 inline-flex w-full max-w-2xl">
                    {['1mo', '3mo', '6mo'].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCycle(c as any)}
                            className={\`flex-1 py-4 rounded-xl text-sm md:text-base font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1 relative \${cycle === c ? 'bg-vela-navy text-white shadow-lg transform scale-[1.02]' : 'text-gray-400 hover:bg-gray-50 hover:text-vela-navy'}\`}
                        >
                            {/* @ts-ignore */}
                            <span className="uppercase tracking-wider">{text.cycles[c]}</span>
                            
                            {/* نمایش درصد تخفیف */}
                            {c === '3mo' && <span className={\`text-[10px] px-2 py-0.5 rounded-full \${cycle === c ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}\`}>-5%</span>}
                            {c === '6mo' && <span className={\`text-[10px] px-2 py-0.5 rounded-full \${cycle === c ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600 animate-pulse'}\`}>-10%</span>}
                            
                            {/* آیکون چک مارک برای انتخاب شده */}
                            {cycle === c && <div className="absolute -top-2 -right-2 bg-vela-gold text-vela-navy rounded-full p-1 shadow-sm"><CheckCircle2 size={14}/></div>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title} pricePerMonth={product.calc.displayMonthly} totalPrice={product.calc.displayTotal}
                    // @ts-ignore
                    billingText={text.billing[cycle]}
                    features={product.features} isRecommended={product.isRecommended} isLuxury={product.isLuxury} 
                    actionLabel={getButtonLabel(product.title)} onSelect={() => handleSelectProduct(product)}
                    popularLabel={text.badges.popular} luxuryLabel={text.badges.luxury} points={product.calc.points} discountTag={product.calc.discountTag}
                  />
                </div>
              ))}
            </div>

            {cycle !== '1mo' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl text-center text-orange-700 text-sm border border-orange-100 flex justify-center items-center gap-2 max-w-2xl mx-auto mt-6">
                    <Info size={16} />
                    <span>{lang === 'FA' ? 'با خرید اشتراک، امتیاز بیشتری دریافت می‌کنید.' : 'Subscriptions earn bonus points!'}</span>
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
console.log("✅ دکمه‌های انتخاب طرح (۱، ۳، ۶ ماهه) اضافه شد!");