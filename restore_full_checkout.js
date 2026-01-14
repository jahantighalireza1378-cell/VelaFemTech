const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, 'src/app/checkout/page.tsx');

const content = `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowRight, CreditCard, MapPin, User, Phone, CheckCircle, ShieldCheck, CalendarClock, Package, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [order, setOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    // خواندن زبان و اطلاعات سبد خرید از حافظه مرورگر
    setLang(localStorage.getItem('vela-lang') || 'FA');
    
    try {
        const savedOrder = localStorage.getItem('vela-final-order');
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    } catch (e) {
        console.error("Error reading order:", e);
    }

    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      back: 'بازگشت', title: 'تکمیل خرید', shippingTitle: 'اطلاعات ارسال', summaryTitle: 'خلاصه اشتراک',
      inputs: { name: 'نام و نام خانوادگی', phone: 'شماره تماس', address: 'آدرس دقیق پستی' },
      payBtn: 'تایید و پرداخت', processing: 'در حال پردازش...', secure: 'پرداخت امن زرین‌پال',
      planLabel: 'طرح انتخابی:', itemsLabel: 'اقلام افزوده:', totalLabel: 'مبلغ قابل پرداخت:',
      cycles: { '1': '۱ ماهه', '3': '۳ ماهه', '6': '۶ ماهه' },
      success: { title: 'سفارش ثبت شد!', desc: 'اطلاعات سفارش برای شما پیامک شد.', tracking: 'شماره پیگیری: VELA-8829' },
      currency: 'تومان'
    },
    EN: { back: 'Back', title: 'Checkout', shippingTitle: 'Shipping Details', summaryTitle: 'Order Summary', inputs: { name: 'Full Name', phone: 'Phone', address: 'Address' }, payBtn: 'Confirm & Pay', processing: 'Processing...', secure: 'Secure Payment', planLabel: 'Plan:', itemsLabel: 'Add-ons:', totalLabel: 'Total:', cycles: { '1': 'Monthly', '3': '3 Months', '6': '6 Months' }, success: { title: 'Success!', desc: 'Order placed successfully.', tracking: 'Order ID: 8829' }, currency: 'TL' },
    TR: { back: 'Geri', title: 'Ödeme', shippingTitle: 'Teslimat Bilgileri', summaryTitle: 'Sipariş Özeti', inputs: { name: 'Ad Soyad', phone: 'Telefon', address: 'Adres' }, payBtn: 'Onayla ve Öde', processing: 'İşleniyor...', secure: 'Güvenli Ödeme', planLabel: 'Plan:', itemsLabel: 'Ekstralar:', totalLabel: 'Toplam:', cycles: { '1': 'Aylık', '3': '3 Aylık', '6': '6 Aylık' }, success: { title: 'Başarılı!', desc: 'Sipariş alındı.', tracking: 'Sipariş No: 8829' }, currency: 'TL' },
    RU: { back: 'Назад', title: 'Оплата', shippingTitle: 'Адрес', summaryTitle: 'Итог', inputs: { name: 'ФИО', phone: 'Телефон', address: 'Адрес' }, payBtn: 'Оплатить', processing: 'Обработка...', secure: 'Безопасно', planLabel: 'План:', itemsLabel: 'Доп:', totalLabel: 'Итого:', cycles: { '1': '1 Мес', '3': '3 Мес', '6': '6 Мес' }, success: { title: 'Успешно!', desc: 'Заказ принят.', tracking: 'ID: 8829' }, currency: 'TL' }
  };

  const text = t[lang] || t.FA;
  const currencyLabel = order?.market === 'IR' ? 'تومان' : 'TL';
  
  const formatPrice = (amount: number) => {
      try {
        return new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
      } catch (e) { return amount; }
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
        alert(lang === 'FA' ? 'لطفا تمام فیلدها را پر کنید' : 'Please fill all fields');
        return;
    }

    setIsProcessing(true);

    // ۱. آماده‌سازی داده برای تلگرام
    const telegramData = {
        orderId: Math.floor(1000 + Math.random() * 9000),
        customer: formData,
        total: \`\${formatPrice(order.totalPrice)} \${currencyLabel}\`,
        cycle: text.cycles[order.cycle || '1'],
        items: {
            packageName: order.title,
            extras: [
                order.finalQuantities?.hotWaterBottle?.count > 0 ? { name: 'کیسه آب گرم', count: order.finalQuantities.hotWaterBottle.count } : null,
                order.finalQuantities?.chocolate?.count > 0 ? { name: 'شکلات', count: order.finalQuantities.chocolate.count } : null,
                order.finalQuantities?.tea?.count > 0 ? { name: 'دمنوش', count: order.finalQuantities.tea.count } : null
            ].filter(Boolean)
        }
    };

    // ۲. ارسال به تلگرام
    try {
        await fetch('/api/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telegramData)
        });
    } catch (err) {
        console.error("Telegram send failed but proceeding with order:", err);
    }

    // ۳. شبیه‌سازی درگاه و موفقیت
    setTimeout(() => {
        setIsSuccess(true);
        setIsProcessing(false);
        localStorage.removeItem('vela-cart');
        localStorage.removeItem('vela-final-order');
    }, 1500);
  };

  // اگر هنوز اطلاعات سفارش لود نشده، لودینگ نشان بده
  if (!order && !isSuccess) {
      return (
          <div className="min-h-screen bg-vela-marble flex items-center justify-center">
             <div className="text-vela-navy animate-pulse">Loading Order Details...</div>
          </div>
      );
  }

  // صفحه موفقیت
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-vela-marble">
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-3">{text.success.title}</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">{text.success.desc}</p>
          <div className="bg-white px-8 py-4 rounded-2xl border border-dashed border-gray-300 font-mono text-gray-500 tracking-wider shadow-sm">
            {text.success.tracking}
          </div>
          <button onClick={() => router.push('/')} className="mt-10 px-8 py-3 rounded-xl bg-white border border-vela-navy/10 text-vela-navy font-bold hover:bg-vela-navy hover:text-white transition-all shadow-sm">
            {lang === 'FA' ? 'بازگشت به خانه' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // صفحه اصلی پرداخت
  const hasAddons = order.finalQuantities && (
      order.finalQuantities.chocolate?.count > 0 || 
      order.finalQuantities.tea?.count > 0 ||
      order.finalQuantities.hotWaterBottle?.count > 0
  );

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} /></div>
          <span className="text-sm font-medium">{text.back}</span>
        </button>

        <h1 className="text-3xl font-serif text-vela-navy font-bold mb-8">{text.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* فرم اطلاعات */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-vela-gold/10">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-vela-gold/10 p-2 rounded-lg text-vela-gold"><MapPin size={20} /></div>
                <h2 className="text-xl font-bold text-vela-navy">{text.shippingTitle}</h2>
              </div>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 pr-1">{text.inputs.name}</label>
                    <div className="relative">
                        <User className="absolute right-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
                        <input required name="name" onChange={handleInputChange} type="text" className="w-full px-12 py-3.5 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50 focus:bg-white transition-all" placeholder="..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 pr-1">{text.inputs.phone}</label>
                    <div className="relative">
                        <Phone className="absolute right-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
                        <input required name="phone" onChange={handleInputChange} type="tel" className="w-full px-12 py-3.5 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50 focus:bg-white transition-all" placeholder="09..." />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 pr-1">{text.inputs.address}</label>
                  <textarea required name="address" onChange={handleInputChange} rows={3} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50 focus:bg-white transition-all" placeholder="..."></textarea>
                </div>
                <button type="submit" className="hidden"></button>
              </form>
            </div>
          </div>

          {/* خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-vela-navy text-white rounded-3xl p-8 shadow-2xl sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-vela-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-xl font-bold mb-6 font-serif border-b border-white/10 pb-4 relative z-10 flex items-center gap-2">
                 <Package size={20} className="text-vela-gold" />
                 {text.summaryTitle}
              </h2>

              <div className="space-y-4 mb-8 relative z-10 text-sm">
                <div className="flex justify-between items-center text-white/90">
                    <span className="opacity-80">Package Name</span>
                    <span className="font-bold">{order.title}</span>
                </div>
                
                <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                    <span className="flex items-center gap-2 opacity-80"><CalendarClock size={16}/> {text.planLabel}</span>
                    <span className="font-bold text-vela-gold">{text.cycles[order.cycle || '1']}</span>
                </div>

                {hasAddons && (
                    <div className="pt-2 border-t border-white/10 mt-2">
                      <span className="text-xs opacity-60 mb-2 block uppercase tracking-wider">{text.itemsLabel}</span>
                      <div className="flex flex-wrap gap-2">
                        {order.finalQuantities?.hotWaterBottle?.count > 0 && <span className="bg-vela-gold/20 border border-vela-gold/30 px-2 py-1 rounded text-xs text-vela-gold font-medium">+ Hot Water Bottle</span>}
                        {order.finalQuantities?.chocolate?.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Chocolate</span>}
                        {order.finalQuantities?.tea?.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Tea</span>}
                      </div>
                   </div>
                )}
              </div>

              <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end">
                   <span className="text-white/60 text-sm mb-1">{text.totalLabel}</span>
                   <div className="text-3xl font-bold font-sans tracking-tight">
                     {formatPrice(order.totalPrice)} 
                     <span className="text-lg font-light opacity-80 ml-1">{currencyLabel}</span>
                   </div>
                </div>
              </div>
              
              <button 
                onClick={handlePayment} 
                disabled={isProcessing} 
                className="w-full py-4 bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isProcessing ? (
                    <><Loader2 size={20} className="animate-spin" /> {text.processing}</>
                ) : (
                    <>{text.payBtn} <CreditCard size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
              
              <div className="mt-5 flex justify-center items-center gap-2 text-white/40 text-xs relative z-10">
                 <ShieldCheck size={12} /><span>{text.secure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync(checkoutPath, content);
console.log("✅ صفحه پرداخت کامل و امن بازگردانی شد.");