const fs = require('fs');
const path = require('path');

const files = {
  "src/app/sos/page.tsx": `'use client';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Truck, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SOSPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [selectedCity, setSelectedCity] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [coverageType, setCoverageType] = useState<'instant' | 'express' | null>(null);

  // ⚡️ شهرهای دارای انبار فوری (۱ ساعته)
  // طبق دستور شما: تهران و آلانیا
  const instantCities = ['Tehran', 'Alanya']; 

  // 📦 شهرهای ارسال پستی (۲۴ ساعته)
  // طبق دستور شما: گرگان (و شهرهای بزرگ دیگر برای تکمیل لیست)
  const expressCities = ['Gorgan', 'Istanbul', 'Antalya', 'Shiraz', 'Mashhad'];

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
  }, []);

  const t: any = {
    FA: {
      title: 'وضعیت اضطراری؟',
      cityLabel: 'شهر خود را انتخاب کنید:',
      selectCity: 'انتخاب شهر...',
      instantTitle: 'پوشش‌دهی: عالی (ارسال فوری)',
      instantDesc: 'پیک موتوری در دسترس است.',
      expressTitle: 'پوشش‌دهی: محدود (ارسال فردا)',
      expressDesc: 'انبار فوری در این شهر نداریم. ارسال با پست ویژه.',
      kitName: 'کیت نجات اضطراری',
      delivery: 'روش ارسال:',
      deliveryInstant: 'پیک موتوری اختصاصی',
      deliveryExpress: 'پست پیشتاز ویژه (هوایی)',
      timeInstant: 'تحویل زیر ۶۰ دقیقه',
      timeExpress: 'تحویل فردا صبح',
      priceInstant: '۲۹۵,۰۰۰ تومان',
      priceExpress: '۱۹۰,۰۰۰ تومان',
      btnInstant: 'درخواست اعزام فوری',
      btnExpress: 'ثبت سفارش برای فردا',
    },
    EN: {
      title: 'Emergency?',
      cityLabel: 'Select City:',
      selectCity: 'Select City...',
      instantTitle: 'Coverage: Excellent (Instant)',
      instantDesc: 'Moto-courier available.',
      expressTitle: 'Coverage: Limited (Next Day)',
      expressDesc: 'Shipping via Express Post.',
      kitName: 'Emergency Rescue Kit',
      delivery: 'Delivery Method:',
      deliveryInstant: 'Dedicated Moto-Courier',
      deliveryExpress: 'Express Air Mail',
      timeInstant: 'Delivery < 60 Mins',
      timeExpress: 'Delivery Tomorrow Morning',
      priceInstant: '350 TL',
      priceExpress: '200 TL',
      btnInstant: 'Dispatch Now',
      btnExpress: 'Order for Tomorrow',
    },
    TR: {
      title: 'Acil Durum?',
      cityLabel: 'Şehir Seçin:',
      selectCity: 'Şehir Seçin...',
      instantTitle: 'Kapsama: Mükemmel (Anında)',
      instantDesc: 'Moto-kurye mevcut.',
      expressTitle: 'Kapsama: Sınırlı (Yarın)',
      expressDesc: 'Hızlı kargo ile gönderim.',
      kitName: 'Acil Kurtarma Kiti',
      delivery: 'Teslimat:',
      deliveryInstant: 'Özel Moto-Kurye',
      deliveryExpress: 'Hızlı Kargo',
      timeInstant: '60 Dakika Altında',
      timeExpress: 'Yarın Sabah',
      priceInstant: '350 TL',
      priceExpress: '200 TL',
      btnInstant: 'Hemen Gönder',
      btnExpress: 'Yarına Sipariş Ver',
    },
    RU: {
      title: 'Экстренная ситуация?',
      cityLabel: 'Выберите город:',
      selectCity: 'Город...',
      instantTitle: 'Доставка: Мгновенно',
      instantDesc: 'Курьер доступен.',
      expressTitle: 'Доставка: Завтра',
      expressDesc: 'Экспресс-почта.',
      kitName: 'Набор спасения',
      delivery: 'Метод:',
      deliveryInstant: 'Мото-курьер',
      deliveryExpress: 'Экспресс-почта',
      timeInstant: '< 60 мин',
      timeExpress: 'Завтра утром',
      priceInstant: '350 TL',
      priceExpress: '200 TL',
      btnInstant: 'Вызвать курьера',
      btnExpress: 'Заказать на завтра',
    }
  };

  const text = t[lang] || t.FA;

  const handleCityChange = (e: any) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    if (instantCities.includes(city)) {
      setCoverageType('instant');
    } else if (expressCities.includes(city)) {
      setCoverageType('express');
    } else {
      setCoverageType(null);
    }
  };

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      router.push('/tracking');
    }, 2000);
  };

  const allCities = [...instantCities, ...expressCities].sort();

  return (
    <div className="min-h-screen bg-red-50 pb-20">
      <Header />
      <div className="max-w-md mx-auto px-4 py-8 text-center animate-fade-in-up">
        
        <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full bg-red-100 text-red-600 rounded-full flex items-center justify-center border-2 border-red-200">
                <AlertTriangle size={32} />
            </div>
        </div>

        <h1 className="text-3xl font-extrabold text-vela-navy mb-6">{text.title}</h1>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-red-100 mb-6 text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-vela-gold"/>
                {text.cityLabel}
            </label>
            <select 
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-vela-navy transition-colors"
                onChange={handleCityChange}
                value={selectedCity}
            >
                <option value="">{text.selectCity}</option>
                {allCities.map(city => (
                    <option key={city} value={city}>
                        {city} {instantCities.includes(city) ? '⚡️' : '📦'}
                    </option>
                ))}
            </select>

            {selectedCity && coverageType === 'instant' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
                    <Clock size={16} />
                    <div><div className="font-bold">{text.instantTitle}</div><div className="text-xs opacity-80">{text.instantDesc}</div></div>
                </div>
            )}

            {selectedCity && coverageType === 'express' && (
                <div className="mt-4 p-3 bg-orange-50 text-orange-700 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
                    <Truck size={16} />
                    <div><div className="font-bold">{text.expressTitle}</div><div className="text-xs opacity-80">{text.expressDesc}</div></div>
                </div>
            )}
        </div>

        {selectedCity && coverageType && (
            <div className="animate-scale-in">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-red-100 mb-6 text-left relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <span className="font-bold text-lg text-vela-navy">{text.kitName}</span>
                        <span className={\`font-bold text-lg px-3 py-1 rounded-lg \${coverageType === 'instant' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}\`}>
                            {coverageType === 'instant' ? text.priceInstant : text.priceExpress}
                        </span>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Truck size={16} className={coverageType === 'instant' ? 'text-green-500' : 'text-orange-500'}/>
                            <span>{text.delivery} <strong>{coverageType === 'instant' ? text.deliveryInstant : text.deliveryExpress}</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Clock size={16} className={coverageType === 'instant' ? 'text-red-500' : 'text-orange-500'}/>
                            <span>{coverageType === 'instant' ? text.timeInstant : text.timeExpress}</span>
                        </div>
                    </div>
                    <button onClick={handleOrder} disabled={isOrdering} className={\`w-full py-4 text-white rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2 \${coverageType === 'instant' ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/30' : 'bg-gradient-to-r from-orange-500 to-yellow-500 shadow-orange-500/30'}\`}>
                        {isOrdering ? '...' : (<>{coverageType === 'instant' ? text.btnInstant : text.btnExpress} <ArrowRight size={20}/></>)}
                    </button>
                </div>
            </div>
        )}
        <button onClick={() => router.back()} className="mt-4 text-gray-400 text-sm hover:text-vela-navy underline">{lang === 'FA' ? 'بازگشت' : 'Back'}</button>
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
console.log("✅ شهرها آپدیت شدند: تهران/آلانیا (فوری) - گرگان (اکسپرس)");