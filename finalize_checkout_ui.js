const fs = require('fs');
const path = require('path');

const files = {
  "src/app/checkout/page.tsx": `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowRight, CreditCard, MapPin, User, Phone, CheckCircle, ShieldCheck, CalendarClock, Package } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [order, setOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);

    // بارگذاری سفارش نهایی
    const finalOrder = localStorage.getItem('vela-final-order');
    if (finalOrder) {
      setOrder(JSON.parse(finalOrder));
    }

    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: {
      back: 'بازگشت به شخصی‌سازی',
      title: 'تکمیل اشتراک',
      shippingTitle: 'اطلاعات ارسال',
      summaryTitle: 'خلاصه اشتراک',
      inputs: { name: 'نام و نام خانوادگی', phone: 'شماره تماس', address: 'آدرس دقیق پستی' },
      payBtn: 'تایید و پرداخت',
      secure: 'پرداخت امن زرین‌پال',
      planLabel: 'طرح انتخابی:',
      itemsLabel: 'اقلام افزوده:',
      totalLabel: 'مبلغ قابل پرداخت:',
      cycles: { '1': '۱ ماهه', '3': '۳ ماهه (۵٪ تخفیف)', '6': '۶ ماهه (۱۰٪ تخفیف)' },
      success: { title: 'اشتراک فعال شد!', desc: 'اولین بسته شما آماده ارسال است.', tracking: 'شماره اشتراک: VELA-8829' },
      currency: 'تومان'
    },
    EN: {
      back: 'Back to Customize',
      title: 'Checkout',
      shippingTitle: 'Shipping Details',
      summaryTitle: 'Subscription Summary',
      inputs: { name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address' },
      payBtn: 'Confirm & Pay',
      secure: 'Secure Payment',
      planLabel: 'Selected Plan:',
      itemsLabel: 'Add-ons:',
      totalLabel: 'Total Billed:',
      cycles: { '1': 'Monthly', '3': '3 Months (-5%)', '6': '6 Months (-10%)' },
      success: { title: 'Subscription Active!', desc: 'Your first box is being prepared.', tracking: 'Sub ID: VELA-8829' },
      currency: 'TL'
    },
    TR: {
      back: 'Geri Dön',
      title: 'Ödeme',
      shippingTitle: 'Teslimat Bilgileri',
      summaryTitle: 'Abonelik Özeti',
      inputs: { name: 'Ad Soyad', phone: 'Telefon', address: 'Adres' },
      payBtn: 'Onayla ve Öde',
      secure: 'Güvenli Ödeme',
      planLabel: 'Seçilen Plan:',
      itemsLabel: 'Ekstralar:',
      totalLabel: 'Toplam Tutar:',
      cycles: { '1': 'Aylık', '3': '3 Aylık (-%5)', '6': '6 Aylık (-%10)' },
      success: { title: 'Abonelik Başladı!', desc: 'İlk kutunuz hazırlanıyor.', tracking: 'Abone No: VELA-8829' },
      currency: 'TL'
    },
    RU: {
      back: 'Назад',
      title: 'Оформление',
      shippingTitle: 'Адрес',
      summaryTitle: 'Итог подписки',
      inputs: { name: 'ФИО', phone: 'Телефон', address: 'Адрес' },
      payBtn: 'Оплатить',
      secure: 'Безопасно',
      planLabel: 'План:',
      itemsLabel: 'Добавлено:',
      totalLabel: 'К оплате:',
      cycles: { '1': '1 Месяц', '3': '3 Месяца (-5%)', '6': '6 Месяцев (-10%)' },
      success: { title: 'Успешно!', desc: 'Подписка оформлена.', tracking: 'ID: VELA-8829' },
      currency: 'TL'
    }
  };

  const text = t[lang] || t.FA;
  const currencyLabel = order?.market === 'IR' ? 'تومان' : 'TL';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSuccess(true);
      localStorage.removeItem('vela-cart');
      localStorage.removeItem('vela-final-order');
    }, 1500);
  };

  if (!order && !isSuccess) return <div className="p-20 text-center">Loading Order...</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-vela-marble">
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-serif text-vela-navy font-bold mb-2">{text.success.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{text.success.desc}</p>
          <div className="bg-white px-6 py-3 rounded-xl border border-dashed border-gray-300 font-mono text-gray-500">
            {text.success.tracking}
          </div>
          <button onClick={() => router.push('/')} className="mt-8 text-vela-navy hover:text-vela-gold font-bold underline">
            {lang === 'FA' ? 'بازگشت به خانه' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // محاسبه آیتم‌های اضافه برای نمایش در فاکتور
  const hasAddons = order.finalQuantities && (
      order.finalQuantities.chocolate.count > 0 || 
      order.finalQuantities.tea.count > 0 ||
      order.finalQuantities.hotWaterBottle.count > 0
  );

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
             <ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} />
          </div>
          <span className="text-sm font-medium">{text.back}</span>
        </button>

        <h1 className="text-3xl font-serif text-vela-navy font-bold mb-8">{text.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* فرم */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-vela-gold/10">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <MapPin className="text-vela-gold" />
                <h2 className="text-xl font-bold text-vela-navy">{text.shippingTitle}</h2>
              </div>
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.name}</label><div className="relative"><User className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required type="text" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                  <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.phone}</label><div className="relative"><Phone className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" /><input required type="tel" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" /></div></div>
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-500 pr-1">{text.inputs.address}</label><textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50"></textarea></div>
              </form>
            </div>
          </div>

          {/* فاکتور نهایی */}
          <div className="lg:col-span-1">
            <div className="bg-vela-navy text-white rounded-3xl p-8 shadow-2xl sticky top-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-vela-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-xl font-bold mb-6 font-serif border-b border-white/10 pb-4 relative z-10">{text.summaryTitle}</h2>
              
              <div className="space-y-4 mb-8 relative z-10 text-sm">
                
                {/* نام بسته */}
                <div className="flex justify-between items-center text-white/90">
                  <span className="flex items-center gap-2"><Package size={16} className="text-vela-gold"/> {order.title} Package</span>
                </div>

                {/* نوع اشتراک */}
                <div className="flex justify-between items-center text-white/90 bg-white/5 p-3 rounded-xl">
                  <span className="flex items-center gap-2 opacity-80"><CalendarClock size={16}/> {text.planLabel}</span>
                  {/* @ts-ignore */}
                  <span className="font-bold text-vela-gold">{text.cycles[order.cycle || '1']}</span>
                </div>

                {/* نمایش خلاصه آیتم‌های اضافه */}
                {hasAddons && (
                   <div className="pt-2">
                      <span className="text-xs opacity-60 mb-1 block">{text.itemsLabel}</span>
                      <div className="flex flex-wrap gap-2">
                        {order.finalQuantities.hotWaterBottle.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Hot Water Bottle</span>}
                        {order.finalQuantities.chocolate.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Chocolate</span>}
                        {order.finalQuantities.tea.count > 0 && <span className="bg-white/10 px-2 py-1 rounded text-xs">+ Tea</span>}
                      </div>
                   </div>
                )}
              </div>

              <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end">
                   <span className="text-white/60 text-sm">{text.totalLabel}</span>
                   <div className="text-3xl font-bold font-sans">
                     {formatPrice(order.totalPrice)} 
                     <span className="text-lg font-light opacity-80 ml-1">{currencyLabel}</span>
                   </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full py-4 bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2 relative z-10"
              >
                <span>{text.payBtn}</span>
                <CreditCard size={18} />
              </button>
              
              <div className="mt-4 flex justify-center items-center gap-2 text-white/40 text-xs relative z-10">
                <ShieldCheck size={12} />
                <span>{text.secure}</span>
              </div>

            </div>
          </div>

        </div>
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
console.log("✅ صفحه فاکتور (Checkout) نهایی شد: نمایش جزئیات اشتراک و قیمت کل.");