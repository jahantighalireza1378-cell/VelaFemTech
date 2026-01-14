const fs = require('fs');
const path = require('path');

const files = {
  // ۱. اصلاح صفحه انتخاب بسته (Box Builder) تا به صفحه شخصی‌سازی برود نه چک‌اوت
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
    const checkLang = () => {
      const saved = localStorage.getItem('vela-lang') || 'FA';
      if (saved !== lang) setLang(saved);
    };
    checkLang();
    const interval = setInterval(checkLang, 500);
    return () => clearInterval(interval);
  }, [lang]);

  const t: any = {
    FA: {
      title: 'تنظیم تقویم هوشمند', selectTitle: 'انتخاب پکیج ماهانه', desc_init: 'برای شروع، تاریخ آخرین پریود خود را وارد کنید.',
      desc_date: 'بر اساس چرخه شما، بسته بعدی در تاریخ {date} ارسال می‌شود.', back: 'بازگشت', shipping: 'ارسال رایگان به سراسر ایران',
      btnPrefix: 'انتخاب', btnSuffix: '',
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

  // قیمت‌های خام برای محاسبات بعدی (بدون واحد پول)
  const rawPrices = {
    p1: { fa: 285000, other: 249 },
    p2: { fa: 580000, other: 490 },
    p3: { fa: 1250000, other: 950 }
  };

  const products = [
    { id: 1, title: "Essential", rawPrice: rawPrices.p1, price: getPrice("۲۸۵,۰۰۰", "249"), features: [{text:f.p1[0],included:true}, {text:f.p1[1],included:true}, {text:f.p2[2],included:false}, {text:f.p2[3],included:false}] },
    { id: 2, title: "Care", rawPrice: rawPrices.p2, price: getPrice("۵۸۰,۰۰۰", "490"), isRecommended: true, features: [{text:f.p2[0],included:true}, {text:f.p2[1],included:true}, {text:f.p2[2],included:true}, {text:f.p2[3],included:true}] },
    { id: 3, title: "Bliss", rawPrice: rawPrices.p3, price: getPrice("۱,۲۵۰,۰۰۰", "950"), isLuxury: true, features: [{text:f.p3[0],included:true}, {text:f.p3[1],included:true}, {text:f.p3[2],included:true}, {text:f.p3[3],included:true}] }
  ];

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(lang === 'RU' ? 'ru-RU' : lang === 'FA' ? 'fa-IR' : lang === 'TR' ? 'tr-TR' : 'en-US');

  const handleSelectProduct = (product: any) => {
    localStorage.setItem('vela-cart', JSON.stringify({
        ...product,
        dispatchDate: dates.dispatchDate,
        isEco: isEco
    }));
    // تغییر مسیر به صفحه شخصی‌سازی
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
            <button onClick={() => setDates(null)} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-8">
              <ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /><span>{text.back}</span>
            </button>
            <div className="flex justify-center"><EcoToggle language={lang} onToggle={setIsEco} /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {products.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard 
                    title={product.title} 
                    price={product.price} 
                    imageSrc="" 
                    features={product.features} 
                    isRecommended={product.isRecommended} 
                    isLuxury={product.isLuxury} 
                    actionLabel={getButtonLabel(product.title)} 
                    onSelect={() => handleSelectProduct(product)} 
                  />
                </div>
              ))}
            </div>
            <div className="text-center text-gray-400 text-sm mt-12"><ShoppingBag className="inline-block mb-1 mx-1" size={14}/>{text.shipping}</div>
          </div>
        )}
      </div>
    </div>
  );
}`,

  // ۲. ساخت صفحه جدید شخصی‌سازی (Customize Page)
  "src/app/customize/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingCart, ArrowRight, Flame, Droplet } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [basePackage, setBasePackage] = useState<any>(null);
  
  // مقادیر پیش‌فرض اجناس
  const [quantities, setQuantities] = useState({
    pads: 0,
    tampons: 0,
    chocolate: 0,
    tea: 0,
    heatPatch: 0, // آیتم جدید برای سود بیشتر
    wipes: 0      // آیتم جدید برای سود بیشتر
  });

  useEffect(() => {
    // خواندن زبان
    const savedLang = localStorage.getItem('vela-lang') || 'FA';
    setLang(savedLang);

    // خواندن پکیج انتخاب شده
    const savedCart = localStorage.getItem('vela-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setBasePackage(parsedCart);
      
      // تنظیم مقادیر پیش‌فرض بر اساس نوع بسته
      // Essential: id=1, Care: id=2, Bliss: id=3
      if (parsedCart.id === 1) setQuantities(prev => ({ ...prev, pads: 10, tampons: 5 }));
      if (parsedCart.id === 2) setQuantities(prev => ({ ...prev, pads: 15, tampons: 10, chocolate: 1, tea: 1 }));
      if (parsedCart.id === 3) setQuantities(prev => ({ ...prev, pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1 }));
    }
  }, []);

  // دیکشنری متن‌ها
  const t: any = {
    FA: {
      title: 'شخصی‌سازی بسته',
      subtitle: 'محتویات بسته را دقیقاً مطابق نیازتان تنظیم کنید.',
      items: {
        pads: 'نوار بهداشتی ارگانیک',
        tampons: 'تامپون (سایز مخلوط)',
        chocolate: 'شکلات تلخ ۷۰٪',
        tea: 'دمنوش آرامش‌بخش',
        heatPatch: 'پد گرمایی ضد درد (Add-on)',
        wipes: 'دستمال مرطوب بانوان (Add-on)'
      },
      currency: 'تومان',
      total: 'مبلغ قابل پرداخت',
      checkout: 'تایید و پرداخت',
      back: 'تغییر بسته'
    },
    EN: {
      title: 'Customize Your Box',
      subtitle: 'Adjust quantities to match your flow perfectly.',
      items: {
        pads: 'Organic Pads',
        tampons: 'Tampons (Mixed)',
        chocolate: 'Dark Chocolate 70%',
        tea: 'Relaxing Herbal Tea',
        heatPatch: 'Pain Relief Heat Patch',
        wipes: 'Intimate Wipes'
      },
      currency: 'TL',
      total: 'Total Amount',
      checkout: 'Checkout',
      back: 'Change Package'
    },
    TR: {
      title: 'Paketini Kişiselleştir',
      subtitle: 'Kutunuzu ihtiyaçlarınıza göre ayarlayın.',
      items: {
        pads: 'Organik Ped',
        tampons: 'Tampon (Karışık)',
        chocolate: 'Bitter Çikolata %70',
        tea: 'Rahatlatıcı Çay',
        heatPatch: 'Isı Bandı (Ağrı Kesici)',
        wipes: 'İntim Mendil'
      },
      currency: 'TL',
      total: 'Toplam Tutar',
      checkout: 'Ödemeye Geç',
      back: 'Paketi Değiştir'
    },
    RU: {
      title: 'Настройте свой бокс',
      subtitle: 'Отрегулируйте количество под свои нужды.',
      items: {
        pads: 'Органические прокладки',
        tampons: 'Тампоны (Микс)',
        chocolate: 'Темный шоколад 70%',
        tea: 'Травяной чай',
        heatPatch: 'Согревающая наклейка',
        wipes: 'Интимные салфетки'
      },
      currency: 'TL', // یا روبل
      total: 'Итого',
      checkout: 'Оформить',
      back: 'Изменить бокс'
    }
  };

  const text = t[lang] || t.FA;

  // قیمت واحد اجناس (برای محاسبه مابه التفاوت)
  const unitPrices = {
    pads: { fa: 5000, other: 5 },       // هر عدد پد
    tampons: { fa: 8000, other: 8 },    // هر عدد تامپون
    chocolate: { fa: 45000, other: 40 }, // هر بسته شکلات
    tea: { fa: 30000, other: 30 },       // هر بسته چای
    heatPatch: { fa: 25000, other: 25 }, // پد گرمایی (سود بالا)
    wipes: { fa: 20000, other: 20 }      // دستمال مرطوب
  };

  const handleQuantityChange = (item: string, change: number) => {
    setQuantities(prev => {
      const newValue = (prev as any)[item] + change;
      return { ...prev, [item]: newValue < 0 ? 0 : newValue };
    });
  };

  // محاسبه قیمت نهایی
  const calculateTotal = () => {
    if (!basePackage) return 0;
    
    // قیمت پایه بسته
    let total = lang === 'FA' ? basePackage.rawPrice.fa : basePackage.rawPrice.other;

    // مقادیر پیش‌فرض بسته (برای اینکه فقط بابت "اضافه‌ها" پول بگیریم)
    const defaults = basePackage.id === 1 ? { pads: 10, tampons: 5, chocolate: 0, tea: 0, heatPatch: 0, wipes: 0 } :
                     basePackage.id === 2 ? { pads: 15, tampons: 10, chocolate: 1, tea: 1, heatPatch: 0, wipes: 0 } :
                                            { pads: 20, tampons: 15, chocolate: 2, tea: 2, heatPatch: 1, wipes: 0 };

    // افزودن هزینه موارد اضافه شده
    Object.keys(quantities).forEach((key) => {
      const k = key as keyof typeof quantities;
      const extra = quantities[k] - (defaults as any)[k];
      if (extra > 0) {
        const unitPrice = lang === 'FA' ? (unitPrices as any)[k].fa : (unitPrices as any)[k].other;
        total += extra * unitPrice;
      }
      // اگر کمتر انتخاب کرد، قیمت کم نمی‌شود (سیاست سود) یا می‌توانید کم کنید. فعلا کم نمی‌کنیم.
    });

    return total;
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
  };

  const handleCheckout = () => {
    // ذخیره سفارش نهایی با جزئیات دقیق
    const finalOrder = {
      ...basePackage,
      finalQuantities: quantities,
      totalPrice: calculateTotal()
    };
    localStorage.setItem('vela-final-order', JSON.stringify(finalOrder));
    router.push('/checkout');
  };

  if (!basePackage) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-vela-marble pb-32">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mx-auto mb-4 text-sm">
            <ArrowRight size={14} className={lang === 'FA' ? '' : 'rotate-180'} />
            {text.back}
          </button>
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.title}</h1>
          <p className="text-gray-500">{text.subtitle}</p>
        </div>

        {/* لیست محصولات */}
        <div className="space-y-4">
          
          {/* محصولات اصلی */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">بهداشتی / Sanitary</h3>
            
            <ItemRow label={text.items.pads} count={quantities.pads} onChange={(v) => handleQuantityChange('pads', v)} />
            <ItemRow label={text.items.tampons} count={quantities.tampons} onChange={(v) => handleQuantityChange('tampons', v)} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-vela-navy mb-4 border-b pb-2">مراقبت و آرامش / Care</h3>
            
            <ItemRow label={text.items.chocolate} count={quantities.chocolate} onChange={(v) => handleQuantityChange('chocolate', v)} />
            <ItemRow label={text.items.tea} count={quantities.tea} onChange={(v) => handleQuantityChange('tea', v)} />
          </div>

          {/* بخش سودآور: افزودنی‌های ویژه */}
          <div className="bg-gradient-to-r from-vela-navy/5 to-vela-gold/10 rounded-2xl p-6 shadow-md border border-vela-gold/30">
            <div className="flex items-center gap-2 mb-4 border-b border-vela-gold/20 pb-2">
              <Flame size={18} className="text-vela-gold" />
              <h3 className="font-bold text-vela-navy">پیشنهاد ویژه (Add-ons)</h3>
            </div>
            
            <ItemRow label={text.items.heatPatch} count={quantities.heatPatch} onChange={(v) => handleQuantityChange('heatPatch', v)} isUpsell />
            <ItemRow label={text.items.wipes} count={quantities.wipes} onChange={(v) => handleQuantityChange('wipes', v)} isUpsell />
          </div>

        </div>
      </div>

      {/* نوار پایین ثابت (قیمت و دکمه) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-2xl z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">{text.total}</div>
            <div className="text-2xl font-bold text-vela-navy font-sans">
              {formatPrice(calculateTotal())} <span className="text-sm font-light">{text.currency}</span>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="bg-vela-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-vela-navy/90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span>{text.checkout}</span>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}

// کامپوننت سطر محصول
function ItemRow({ label, count, onChange, isUpsell }: any) {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-2">
        {isUpsell && <div className="w-2 h-2 rounded-full bg-vela-gold animate-pulse"></div>}
        <span className={isUpsell ? 'font-medium text-vela-navy' : 'text-gray-700'}>{label}</span>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
        <button 
          onClick={() => onChange(-1)} 
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm disabled:opacity-30"
          disabled={count <= 0}
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-bold font-sans text-lg">{count}</span>
        <button 
          onClick={() => onChange(1)} 
          className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-vela-navy hover:bg-vela-gold hover:text-white transition-colors shadow-sm"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}`
};

console.log("🛠 در حال ساخت صفحه شخصی‌سازی و سیستم Upselling...");
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`✅ فایل ساخته شد: ${filePath}`);
}
console.log("🎉 تمام! حالا مشتری می‌تواند بسته را تغییر دهد.");