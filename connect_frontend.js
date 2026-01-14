const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, 'src/app/checkout/page.tsx');

const checkoutContent = `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowRight, CreditCard, MapPin, User, Phone, CheckCircle, ShieldCheck, CalendarClock, Package } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [order, setOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // نگهداری اطلاعات فرم (نام، تلفن، آدرس)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);

    const finalOrder = localStorage.getItem('vela-final-order');
    if (finalOrder) {
      setOrder(JSON.parse(finalOrder));
    }

    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      back: 'بازگشت', title: 'تکمیل خرید', shippingTitle: 'اطلاعات ارسال', summaryTitle: 'خلاصه',
      inputs: { name: 'نام کامل', phone: 'تلفن تماس', address: 'آدرس دقیق' },
      payBtn: 'تایید و پرداخت', processing: 'در حال پردازش...', secure: 'پرداخت امن',
      planLabel: 'طرح:', itemsLabel: 'افزودنی:', totalLabel: 'مبلغ کل:',
      cycles: { '1': '۱ ماهه', '3': '۳ ماهه', '6': '۶ ماهه' },
      success: { title: 'پرداخت موفق!', desc: 'سفارش شما ثبت شد.', tracking: 'کد پیگیری: 8829' },
      currency: 'تومان'
    },
    EN: { back: 'Back', title: 'Checkout', shippingTitle: 'Shipping', summaryTitle: 'Summary', inputs: { name: 'Full Name', phone: 'Phone', address: 'Address' }, payBtn: 'Pay Now', processing: 'Processing...', secure: 'Secure Payment', planLabel: 'Plan:', itemsLabel: 'Add-ons:', totalLabel: 'Total:', cycles: { '1': 'Monthly', '3': '3 Mo', '6': '6 Mo' }, success: { title: 'Success!', desc: 'Order placed.', tracking: 'ID: 8829' }, currency: 'TL' },
    TR: { back: 'Geri', title: 'Ödeme', shippingTitle: 'Teslimat', summaryTitle: 'Özet', inputs: { name: 'Ad Soyad', phone: 'Telefon', address: 'Adres' }, payBtn: 'Öde', processing: 'İşleniyor...', secure: 'Güvenli Ödeme', planLabel: 'Plan:', itemsLabel: 'Ekstralar:', totalLabel: 'Toplam:', cycles: { '1': 'Aylık', '3': '3 Ay', '6': '6 Ay' }, success: { title: 'Başarılı!', desc: 'Sipariş alındı.', tracking: 'No: 8829' }, currency: 'TL' },
    RU: { back: 'Назад', title: 'Оплата', shippingTitle: 'Адрес', summaryTitle: 'Итог', inputs: { name: 'ФИО', phone: 'Телефон', address: 'Адрес' }, payBtn: 'Оплатить', processing: 'Обработка...', secure: 'Безопасно', planLabel: 'План:', itemsLabel: 'Доп:', totalLabel: 'Итого:', cycles: { '1': '1 Мес', '3': '3 Мес', '6': '6 Мес' }, success: { title: 'Успешно!', desc: 'Заказ принят.', tracking: 'ID: 8829' }, currency: 'TL' }
  };

  const text = t[lang] || t.FA;
  const currencyLabel = order?.market === 'IR' ? 'تومان' : 'TL';
  const formatPrice = (amount: number) => new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);

  // گرفتن ورودی‌های کاربر
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔔 تابع اصلی پرداخت
  const handlePayment = async (e: any) => {
    e.preventDefault();
    
    // اعتبارسنجی ساده
    if (!formData.name || !formData.phone || !formData.address) {
        alert("لطفا اطلاعات ارسال را کامل کنید.");
        return;
    }

    setIsProcessing(true);

    // ۱. آماده‌سازی بسته اطلاعاتی برای تلگرام
    const telegramData = {
        orderId: Math.floor(1000 + Math.random() * 9000),
        customer: formData,
        total: \`\${formatPrice(order.totalPrice)} \${currencyLabel}\`,
        cycle: text.cycles[order.cycle || '1'],
        items: {
            packageName: order.title,
            extras: [
                order.finalQuantities.hotWaterBottle.count > 0 ? { name: 'کیسه آب گرم', count: order.finalQuantities.hotWaterBottle.count } : null,
                order.finalQuantities.chocolate.count > 0 ? { name: 'شکلات', count: order.finalQuantities.chocolate.count } : null,
                order.finalQuantities.tea.count > 0 ? { name: 'دمنوش', count: order.finalQuantities.tea.count } : null
            ].filter(Boolean) // حذف آیتم‌های خالی
        }
    };

    // ۲. ارسال بی سروصدا به تلگرام
    // ما منتظر جواب نمی‌مانیم تا سرعت کاربر گرفته نشود
    fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramData)
    });

    // ۳. شبیه‌سازی تاخیر درگاه (۱.۵ ثانیه)
    setTimeout(() => {
        setIsSuccess(true);
        setIsProcessing(false);
        // پاک کردن سبد خرید
        localStorage.removeItem('vela-cart');
        localStorage.removeItem('vela-final-order');
    }, 1500);
  };

  if (!order && !isSuccess) return <div className="p-20 text-center">...</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-vela-marble">
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle size={48} /></div>
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.success.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{text.success.desc}</p>
          <div className="bg-white px-6 py-3 rounded-xl border border-dashed border-gray-300 font-mono text-gray-500">{text.success.tracking}</div>
          <button onClick={() => router.push('/')} className="mt-8 text-vela-navy hover:text-vela-gold font-bold underline">{lang === 'FA' ? 'بازگشت به خانه' : 'Back to Home'}</button>
        </div>
      </div>
    );
  }

  const hasAddons = order.finalQuantities && (order.finalQuantities.chocolate.count > 0 || order.finalQuantities.tea.count > 0 || order.finalQuantities.hotWaterBottle.count > 0);

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mb-8 transition-colors"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} />{text.back}</button>
        <h1 className="text-3xl font-serif text-vela-navy font-bold mb-8">{text.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-vela-gold/10">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4"><MapPin className="text-vela-gold" /><h2 className="text-xl font-bold text-vela-navy">{text.shippingTitle}</h2></div>
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.name}</label><div className="relative"><User className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required name="name" onChange={handleInputChange} type="text" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.phone}</label><div className="relative"><Phone className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required name="phone" onChange={handleInputChange} type="tel" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.address}</label><textarea required name="address" onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50"></textarea></div>
                
                {/* دکمه مخفی برای سابمیت با اینتر */}
                <button type="submit" className="hidden"></button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-vela-navy text-white rounded-3xl p-8 shadow-2xl sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-vela-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-xl font-bold mb-6 font-serif border-b border-white/10 pb-4 relative z-10">{text.summaryTitle}</h2>
              <div className="space-y-4 mb-8 relative z-10 text-sm">
                <div className="flex justify-between items-center text-white/90"><span className="flex items-center gap-2"><Package size={16} className="text-vela-gold"/> {order.title} Package</span></div>
                <div className="flex justify-between items-center text-white/90 bg-white/5 p-3 rounded-xl"><span className="flex items-center gap-2 opacity-80"><CalendarClock size={16}/> {text.planLabel}</span><span className="font-bold text-vela-gold">{text.cycles[order.cycle || '1']}</span></div>
                {hasAddons && (<div className="pt-2"><span className="text-xs opacity-60 mb-1 block">{text.itemsLabel}</span><div className="flex flex-wrap gap-2">{order.finalQuantities.hotWaterBottle.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Hot Water Bottle</span>}{order.finalQuantities.chocolate.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Chocolate</span>}{order.finalQuantities.tea.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Tea</span>}</div></div>)}
              </div>
              <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end"><span className="text-white/60 text-sm">{text.totalLabel}</span><div className="text-3xl font-bold font-sans">{formatPrice(order.totalPrice)} <span className="text-lg font-light opacity-80 ml-1">{currencyLabel}</span></div></div>
              </div>
              
              {/* دکمه اصلی پرداخت که الان به فرم وصل شده */}
              <button 
                onClick={handlePayment} 
                disabled={isProcessing} 
                className="w-full py-4 bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 relative z-10 disabled:opacity-70 disabled:cursor-wait"
              >
                {isProcessing ? text.processing : <>{text.payBtn} <CreditCard size={18} /></>}
              </button>
              
              <div className="mt-4 flex justify-center items-center gap-2 text-white/40 text-xs relative z-10"><ShieldCheck size={12} /><span>{text.secure}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync(checkoutPath, checkoutContent);
console.log("✅ صفحه پرداخت آپدیت شد (اتصال به تلگرام + فرم اجباری).");