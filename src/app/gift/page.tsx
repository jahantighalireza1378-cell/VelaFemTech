'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Gift, CheckCircle, CreditCard, ArrowRight, Plus, Minus, Package, Loader2, Star, Crown, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GiftPage() {
  const router = useRouter();
  // برای جلوگیری از ارور، ابتدا زبان را پیش‌فرض FA می‌گیریم و بعد از لود شدن چک می‌کنیم
  const [lang, setLang] = useState('FA');
  const [mounted, setMounted] = useState(false); // استیت جدید برای حل مشکل هایدریشن

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // انتخاب‌ها
  const [plan, setPlan] = useState('care'); 
  const [addons, setAddons] = useState<any>({ chocolate: 0, tea: 0, bottle: 0 });
  const [formData, setFormData] = useState({ senderName: '', recipientName: '', message: '' });
  const [giftCode, setGiftCode] = useState('');

  useEffect(() => {
    setMounted(true); // وقتی صفحه کامل لود شد، این true می‌شود
    setLang(localStorage.getItem('vela-lang') || 'FA');
    
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  // 💰 تنظیم قیمت‌ها
  const isIR = lang === 'FA';

  const PRICES_IR: any = { essential: 395000, care: 750000, bliss: 1550000 };
  const PRICES_TL: any = { essential: 380, care: 680, bliss: 1350 };

  const ADDONS_IR: any = { chocolate: 120000, tea: 95000, bottle: 280000 };
  const ADDONS_TL: any = { chocolate: 100, tea: 80, bottle: 250 };

  const BASE_PRICES = isIR ? PRICES_IR : PRICES_TL;
  const ADDON_PRICES = isIR ? ADDONS_IR : ADDONS_TL;

  const planPrice = BASE_PRICES[plan];
  const addonsPrice = 
      (addons.chocolate * ADDON_PRICES.chocolate) +
      (addons.tea * ADDON_PRICES.tea) +
      (addons.bottle * ADDON_PRICES.bottle);
  
  const totalPrice = planPrice + addonsPrice;

  // ✅ تغییر مهم: استفاده از en-US برای یکسان‌سازی اعداد و رفع ارور
  const formatPrice = (p: number) => {
    return p.toLocaleString('en-US') + ' ' + (isIR ? 'تومان' : 'TL');
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
        inputs: { sender: 'نام شما', recipient: 'نام گیرنده', msg: 'پیام محبت‌آمیز شما...' },
        total: 'مبلغ قابل پرداخت:', payBtn: 'تایید و پرداخت', successTitle: 'هدیه آماده شد!', codeLabel: 'کد پیگیری', back: 'بازگشت به خانه'
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
        inputs: { sender: 'Your Name', recipient: 'Recipient Name', msg: 'Your Message...' },
        total: 'Total Amount:', payBtn: 'Confirm & Pay', successTitle: 'Gift Ready!', codeLabel: 'Tracking Code', back: 'Back to Home'
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
        inputs: { sender: 'Adınız', recipient: 'Alıcı Adı', msg: 'Mesajınız...' },
        total: 'Toplam:', payBtn: 'Öde ve Onayla', successTitle: 'Hediye Hazır!', codeLabel: 'Takip Kodu', back: 'Ana Sayfa'
    },
    RU: {
        title: 'Подарок VELA', sub: 'Подарите здоровье',
        step1: '1. Выбор плана', step2: '2. Дополнения', step3: '3. Детали',
        plans: {
            essential: { name: 'Essential', sub: 'Базовый', features: ['10 Прокладок', 'Эко упаковка'] },
            care: { name: 'Care', sub: 'Популярный', features: ['15 Прокладок', 'Чай', 'Шоколад'] },
            bliss: { name: 'Bliss', sub: 'Люкс', features: ['20 Прокладок', 'Подарочный бокс', 'Грелка', 'Аксессуар'] }
        },
        items: { chocolate: 'Шоколад', tea: 'Чай', bottle: 'Грелка' },
        inputs: { sender: 'Ваше имя', recipient: 'Имя получателя', msg: 'Сообщение...' },
        total: 'Итого:', payBtn: 'Оплатить', successTitle: 'Готово!', codeLabel: 'Код', back: 'Назад'
    }
  };

  const text = t[lang] || t.EN;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = { ...formData, plan, addons, totalPrice, lang };
        const res = await fetch('/api/gift/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            setGiftCode(data.code);
            setStep(2);
        } else { alert('Server Error'); }
    } catch (err) { alert('Network Error'); }
    setLoading(false);
  };

  // اگر هنوز صفحه لود نشده، چیزی نشان نده (جلوگیری از پرش متن)
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

        {step === 1 ? (
            <div className="space-y-8 animate-fade-in-up">
                
                {/* 1. انتخاب پکیج */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#1A2A3A] mb-4 flex items-center gap-2"><Package size={20} className="text-[#D4AF37]"/> {text.step1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Essential */}
                        <button onClick={() => setPlan('essential')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'essential' ? 'border-gray-500 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="flex justify-between items-start mb-2"><span className="font-bold text-gray-700">{text.plans.essential.name}</span><Leaf size={16} className="text-green-600"/></div>
                            <div className="text-xs text-gray-500 mb-2">{text.plans.essential.sub}</div>
                            <div className="font-bold text-lg text-[#1A2A3A]">{formatPrice(BASE_PRICES.essential)}</div>
                        </button>

                        {/* Care */}
                        <button onClick={() => setPlan('care')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'care' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded-br-lg">Best Seller</div>
                            <div className="flex justify-between items-start mb-2"><span className="font-bold text-[#1A2A3A]">{text.plans.care.name}</span><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/></div>
                            <div className="text-xs text-gray-500 mb-2">{text.plans.care.sub}</div>
                            <div className="font-bold text-lg text-[#1A2A3A]">{formatPrice(BASE_PRICES.care)}</div>
                        </button>

                        {/* Bliss */}
                        <button onClick={() => setPlan('bliss')} className={`p-4 rounded-xl border-2 transition-all text-right relative overflow-hidden ${plan === 'bliss' ? 'border-[#1A2A3A] bg-[#1A2A3A] text-white' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded-br-lg">Luxury</div>
                            <div className="flex justify-between items-start mb-2"><span className="font-bold">{text.plans.bliss.name}</span><Crown size={16} className="text-[#D4AF37]"/></div>
                            <div className="text-xs opacity-70 mb-2">{text.plans.bliss.sub}</div>
                            <div className="font-bold text-lg">{formatPrice(BASE_PRICES.bliss)}</div>
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
                            { key: 'chocolate', icon: '🍫', name: text.items.chocolate, price: ADDON_PRICES.chocolate },
                            { key: 'tea', icon: '🍵', name: text.items.tea, price: ADDON_PRICES.tea },
                            { key: 'bottle', icon: '🔥', name: text.items.bottle, price: ADDON_PRICES.bottle },
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
                        <div className="grid grid-cols-2 gap-3">
                             <input required placeholder={text.inputs.sender} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, senderName: e.target.value})} />
                             <input required placeholder={text.inputs.recipient} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, recipientName: e.target.value})} />
                        </div>
                        <textarea rows={2} placeholder={text.inputs.msg} className="w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none focus:border-[#D4AF37]" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>

                        <div className="pt-4 border-t mt-2 flex justify-between items-center">
                            <div>
                                <div className="text-xs text-gray-500">{text.total}</div>
                                <div className="text-xl font-bold text-[#1A2A3A]">{formatPrice(totalPrice)}</div>
                            </div>
                            <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1A2A3A] font-bold rounded-xl shadow-lg flex items-center gap-2">
                                {loading ? <Loader2 className="animate-spin"/> : <>{text.payBtn} <CreditCard size={18}/></>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
                <CheckCircle size={50} className="text-green-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold mb-2">{text.successTitle}</h2>
                <div className="bg-gray-100 p-4 rounded-xl font-mono text-2xl font-bold my-6 tracking-widest">{giftCode}</div>
                <button onClick={() => router.push('/')} className="text-blue-600 font-bold flex items-center justify-center gap-2 mx-auto">بازگشت <ArrowRight size={16}/></button>
            </div>
        )}
      </div>
    </div>
  );
}