'use client';
import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/layout/Header';
import { Gift, CheckCircle, CreditCard, ArrowRight, Plus, Minus, Package, Loader2, Star, Crown, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GiftPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [mounted, setMounted] = useState(false);

  const [loading, setLoading] = useState(false);
  
  // انتخاب‌ها
  const [plan, setPlan] = useState('care'); 
  const [addons, setAddons] = useState<any>({ chocolate: 0, tea: 0, bottle: 0 });
  
  // فرم اطلاعات (آدرس و نام)
  const [formData, setFormData] = useState({ 
    senderName: '', 
    recipientName: '', 
    message: '',
    phone: '', // اضافه شده برای تماس
    address: '' // اضافه شده برای ارسال
  });

  useEffect(() => {
    setMounted(true);
    setLang(localStorage.getItem('vela-lang') || 'FA');
    
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  // 💰 تنظیم قیمت‌ها (فقط لیر)
  const PRICES_TL: any = { essential: 380, care: 680, bliss: 1350 };
  const ADDONS_TL: any = { chocolate: 100, tea: 80, bottle: 250 };

  const planPrice = PRICES_TL[plan];
  const addonsPrice = 
      (addons.chocolate * ADDONS_TL.chocolate) +
      (addons.tea * ADDONS_TL.tea) +
      (addons.bottle * ADDONS_TL.bottle);
  
  const totalPrice = planPrice + addonsPrice;

  const formatPrice = (p: number) => {
    return p.toLocaleString('en-US') + ' TL';
  };

  const updateAddon = (key: string, delta: number) => {
      setAddons((prev: any) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const t: any = {
    FA: {
        title: 'هدیه اختصاصی VELA', sub: 'یک پکیج کامل سلامتی هدیه دهید',
        step1: '۱. انتخاب پکیج هدیه', step2: '۲. افزودنی‌های جذاب', step3: '۳. مشخصات هدیه',
        plans: {
            essential: { name: 'Essential', sub: 'پایه و اقتصادی', features: ['۱۰ عدد نوار بهداشتی', 'بسته‌بندی اکو'] },
            care: { name: 'Care', sub: 'محبوب‌ترین', features: ['۱۵ عدد نوار بهداشتی', '۱ دمنوش VELA', '۱ شکلات دست‌ساز'] },
            bliss: { name: 'Bliss', sub: 'لوکس و کامل', features: ['۲۰ عدد نوار لوکس', 'باکس هدیه', 'ید گرمایی هدیه', 'اکسسوری'] }
        },
        items: { chocolate: 'شکلات اضافه', tea: 'دمنوش اضافه', bottle: 'کیسه آب گرم' },
        inputs: { sender: 'نام شما', recipient: 'نام گیرنده', msg: 'پیام محبت‌آمیز شما...', phone: 'شماره تماس گیرنده', address: 'آدرس گیرنده' },
        total: 'مبلغ قابل پرداخت:', payBtn: 'تایید و پرداخت'
    },
    EN: {
        title: 'VELA Exclusive Gift', sub: 'Give the gift of wellness',
        step1: '1. Select Gift Plan', step2: '2. Add-ons', step3: '3. Details',
        plans: {
            essential: { name: 'Essential', sub: 'Basic & Eco', features: ['10 Pads', 'Eco Packaging'] },
            care: { name: 'Care', sub: 'Most Popular', features: ['15 Pads', '1 VELA Tea', '1 Chocolate'] },
            bliss: { name: 'Bliss', sub: 'Luxury & Full', features: ['20 Luxury Pads', 'Gift Box', 'Heat Pad', 'Accessory'] }
        },
        items: { chocolate: 'Extra Chocolate', tea: 'Extra Tea', bottle: 'Hot Water Bottle' },
        inputs: { sender: 'Your Name', recipient: 'Recipient Name', msg: 'Your Message...', phone: 'Recipient Phone', address: 'Recipient Address' },
        total: 'Total Amount:', payBtn: 'Confirm & Pay'
    },
    TR: {
        title: 'VELA Özel Hediye', sub: 'Sevdiklerinize sağlık hediye edin',
        step1: '1. Paket Seçimi', step2: '2. Ekstralar', step3: '3. Detaylar',
        plans: {
            essential: { name: 'Essential', sub: 'Temel & Eko', features: ['10 Ped', 'Eko Paket'] },
            care: { name: 'Care', sub: 'En Popüler', features: ['15 Ped', '1 VELA Çayı', '1 Çikolata'] },
            bliss: { name: 'Bliss', sub: 'Lüks & Tam', features: ['20 Lüks Ped', 'Hediye Kutusu', 'Isı Bandı', 'Aksesuar'] }
        },
        items: { chocolate: 'Ekstra Çikolata', tea: 'Ekstra Çay', bottle: 'Sıcak Su Torbası' },
        inputs: { sender: 'Adınız', recipient: 'Alıcı Adı', msg: 'Mesajınız...', phone: 'Alıcı Telefon', address: 'Alıcı Adres' },
        total: 'Toplam:', payBtn: 'Öde ve Onayla'
    },
    RU: {
        title: 'Подарок VELA', sub: 'Подарите здоровье',
        step1: '1. Выбор плана', step2: '2. Дополнения', step3: '3. Детали',
        plans: {
            essential: { name: 'Essential', sub: 'Базовый', features: ['10 Прокладок', 'Эко упаковка'] },
            care: { name: 'Care', sub: 'Популярный', features: ['15 Прокладок', 'Чай', 'Шоколад'] },
            bliss: { name: 'Bliss', sub: 'Люкс', features: ['20 Прокладок', 'Подарочный бокс', 'Грелка', 'Аксессуар'] },
        },
        items: { chocolate: 'Шоколад', tea: 'Чай', bottle: 'Грелка' },
        inputs: { sender: 'Ваше имя', recipient: 'Имя получателя', msg: 'Сообщение...', phone: 'Телефон получателя', address: 'Адрес получателя' },
        total: 'Итого:', payBtn: 'Оплатить'
    }
  };

  const text = t[lang] || t.EN;

  // 🔴🔴🔴 تغییر اصلی: هدایت به صفحه پرداخت جدید 🔴🔴🔴
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // ساخت دیتای سفارش برای ارسال به صفحه Checkout
    const orderPayload = {
        selectedBoxId: `GIFT-${plan.toUpperCase()}`,
        subscription: 1, // گیفت یک‌بار خرید است
        hasTampon: false, // پیش‌فرض
        tamponCount: 0,
        extras: addons,
        formData: {
            name: formData.senderName, // نام خریدار
            phone: formData.phone, // تلفن برای تماس
            address: `${formData.address} (To: ${formData.recipientName})`, // آدرس گیرنده + نامش
            message: formData.message
        },
        totalPrice: totalPrice,
        lang: lang 
    };

    // ذخیره در مرورگر
    localStorage.setItem('vela-temp-order', JSON.stringify(orderPayload));

    // ریدارکت اجباری
    window.location.href = '/checkout';
  };

  if (!mounted) return <div className="min-h-screen bg-[#F9F7F2]"></div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] pb-20">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]"><Gift size={32} /></div>
            <h1 className="text-3xl font-serif text-[#1A2A3A] font-bold mb-2">{text.title}</h1>
            <p className="text-gray-500">{text.sub}</p>
        </div>

        <div className="space-y-8 animate-fade-in-up">
            
            {/* 1. انتخاب پکیج */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1A2A3A] mb-4 flex items-center gap-2"><Package size={20} className="text-[#D4AF37]"/> {text.step1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Essential */}
                    <button onClick={() => setPlan('essential')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'essential' ? 'border-gray-500 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-2"><span className="font-bold text-gray-700">{text.plans.essential.name}</span><Leaf size={16} className="text-green-600"/></div>
                        <div className="text-xs text-gray-500 mb-2">{text.plans.essential.sub}</div>
                        <div className="font-bold text-lg text-[#1A2A3A]">{formatPrice(PRICES_TL.essential)}</div>
                    </button>

                    {/* Care */}
                    <button onClick={() => setPlan('care')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'care' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded-br-lg">Best Seller</div>
                        <div className="flex justify-between items-start mb-2"><span className="font-bold text-[#1A2A3A]">{text.plans.care.name}</span><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/></div>
                        <div className="text-xs text-gray-500 mb-2">{text.plans.care.sub}</div>
                        <div className="font-bold text-lg text-[#1A2A3A]">{formatPrice(PRICES_TL.care)}</div>
                    </button>

                    {/* Bliss */}
                    <button onClick={() => setPlan('bliss')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'bliss' ? 'border-[#1A2A3A] bg-[#1A2A3A] text-white' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded-br-lg">Luxury</div>
                        <div className="flex justify-between items-start mb-2"><span className="font-bold">{text.plans.bliss.name}</span><Crown size={16} className="text-[#D4AF37]"/></div>
                        <div className="text-xs opacity-70 mb-2">{text.plans.bliss.sub}</div>
                        <div className="font-bold text-lg">{formatPrice(PRICES_TL.bliss)}</div>
                    </button>
                </div>
                {/* نمایش ویژگی‌ها */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                    <ul className="grid grid-cols-2 gap-2">
                        {text.plans[plan].features.map((f: string, i: number) => (
                            <li key={i} className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> {f}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 2. افزودنی ها */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#1A2A3A] mb-4 flex items-center gap-2"><Plus size={20} className="text-[#D4AF37]"/> {text.step2}</h3>
                <div className="space-y-3">
                    {[
                        { key: 'chocolate', icon: '🍫', name: text.items.chocolate, price: ADDONS_TL.chocolate },
                        { key: 'tea', icon: '🍵', name: text.items.tea, price: ADDONS_TL.tea },
                        { key: 'bottle', icon: '🔥', name: text.items.bottle, price: ADDONS_TL.bottle },
                    ].map((item: any) => (
                        <div key={item.key} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="text-lg">{item.icon}</div>
                                <div className="text-sm font-medium">{item.name} <span className="text-xs text-gray-400">({formatPrice(item.price)})</span></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateAddon(item.key, -1)} className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center"><Minus size={14}/></button>
                                <span className="font-bold w-4 text-center text-sm">{addons[item.key]}</span>
                                <button onClick={() => updateAddon(item.key, 1)} className="w-7 h-7 bg-[#1A2A3A] text-white rounded-full shadow flex items-center justify-center"><Plus size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. فرم و پرداخت */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#D4AF37]/20">
                <h3 className="font-bold text-[#1A2A3A] mb-4">{text.step3}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <input required placeholder={text.inputs.sender} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, senderName: e.target.value})} />
                         <input required placeholder={text.inputs.recipient} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, recipientName: e.target.value})} />
                    </div>
                    
                    {/* اضافه شدن فیلدهای آدرس و تلفن */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         <input required type="tel" placeholder={text.inputs.phone} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, phone: e.target.value})} />
                         <input required placeholder={text.inputs.address} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, address: e.target.value})} />
                    </div>

                    <textarea rows={2} placeholder={text.inputs.msg} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>

                    <div className="pt-4 border-t mt-2 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-gray-500">{text.total}</div>
                            <div className="text-xl font-bold text-[#1A2A3A]">{formatPrice(totalPrice)}</div>
                        </div>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1A2A3A] font-bold rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                            {loading ? <Loader2 className="animate-spin"/> : <>{text.payBtn} <CreditCard size={18}/></>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}