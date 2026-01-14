const fs = require('fs');
const path = require('path');

const checkoutContent = `'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowRight, CreditCard, MapPin, User, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');
  const [order, setOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false); // وضعیت پرداخت موفق

  useEffect(() => {
    // ۱. خواندن زبان
    const savedLang = localStorage.getItem('vela-lang') || 'FA';
    setLang(savedLang);

    // ۲. خواندن اطلاعات سفارش از مرحله قبل
    // ما در مرحله شخصی‌سازی، سفارش نهایی را در 'vela-final-order' ذخیره کردیم
    // اگر نبود، از 'vela-cart' استفاده می‌کنیم
    const finalOrder = localStorage.getItem('vela-final-order');
    const cart = localStorage.getItem('vela-cart');
    
    if (finalOrder) {
      setOrder(JSON.parse(finalOrder));
    } else if (cart) {
      // حالت پشتیبان (اگر مستقیماً آمدند)
      const parsedCart = JSON.parse(cart);
      // محاسبه قیمت حدودی برای نمایش
      const price = savedLang === 'FA' ? parsedCart.rawPrice?.fa : parsedCart.rawPrice?.other;
      setOrder({ ...parsedCart, totalPrice: price || 0 });
    }
  }, []);

  const t: any = {
    FA: {
      back: 'بازگشت به شخصی‌سازی',
      title: 'تکمیل خرید',
      shippingTitle: 'اطلاعات ارسال',
      summaryTitle: 'خلاصه سفارش',
      inputs: { name: 'نام و نام خانوادگی', phone: 'شماره تماس', address: 'آدرس دقیق پستی' },
      payBtn: 'پرداخت آنلاین',
      secure: 'پرداخت امن زرین‌پال',
      success: { title: 'پرداخت موفق!', desc: 'سفارش شما ثبت شد و به زودی ارسال می‌شود.', tracking: 'کد پیگیری: VELA-8829' },
      currency: 'تومان'
    },
    EN: {
      back: 'Back to Customize',
      title: 'Checkout',
      shippingTitle: 'Shipping Details',
      summaryTitle: 'Order Summary',
      inputs: { name: 'Full Name', phone: 'Phone Number', address: 'Delivery Address' },
      payBtn: 'Pay Now',
      secure: 'Secure Payment',
      success: { title: 'Payment Successful!', desc: 'Your order has been placed.', tracking: 'Track ID: VELA-8829' },
      currency: 'TL'
    },
    TR: {
      back: 'Düzenlemeye Dön',
      title: 'Ödeme',
      shippingTitle: 'Teslimat Bilgileri',
      summaryTitle: 'Sipariş Özeti',
      inputs: { name: 'Ad Soyad', phone: 'Telefon', address: 'Açık Adres' },
      payBtn: 'Ödeme Yap',
      secure: 'Güvenli Ödeme',
      success: { title: 'Ödeme Başarılı!', desc: 'Siparişiniz alındı.', tracking: 'Takip No: VELA-8829' },
      currency: 'TL'
    },
    RU: {
      back: 'Назад к настройкам',
      title: 'Оформление',
      shippingTitle: 'Адрес доставки',
      summaryTitle: 'Ваш заказ',
      inputs: { name: 'ФИО', phone: 'Телефон', address: 'Адрес' },
      payBtn: 'Оплатить',
      secure: 'Безопасная оплата',
      success: { title: 'Успешно!', desc: 'Ваш заказ принят.', tracking: 'Трек-код: VELA-8829' },
      currency: 'TL'
    }
  };

  const text = t[lang] || t.FA;
  const currencyLabel = lang === 'FA' ? 'تومان' : 'TL'; // ساده‌سازی تشخیص واحد پول

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(lang === 'FA' ? 'fa-IR' : 'en-US').format(amount);
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    // شبیه‌سازی پرداخت
    setTimeout(() => {
      setIsSuccess(true);
      // پاک کردن سبد خرید
      localStorage.removeItem('vela-cart');
      localStorage.removeItem('vela-final-order');
    }, 1500);
  };

  if (!order && !isSuccess) return <div className="p-20 text-center">...</div>;

  // اگر پرداخت موفق بود
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

  return (
    <div className="min-h-screen bg-vela-marble pb-20">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* ۱. دکمه بازگشت (درخواست شما) */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-400 hover:text-vela-navy mb-8 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
             <ArrowRight size={16} className={lang === 'FA' ? '' : 'rotate-180'} />
          </div>
          <span className="text-sm font-medium">{text.back}</span>
        </button>

        <h1 className="text-3xl font-serif text-vela-navy font-bold mb-8">{text.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون راست: فرم اطلاعات */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-vela-gold/10">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <MapPin className="text-vela-gold" />
                <h2 className="text-xl font-bold text-vela-navy">{text.shippingTitle}</h2>
              </div>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500 pr-1">{text.inputs.name}</label>
                    <div className="relative">
                      <User className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" />
                      <input required type="text" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500 pr-1">{text.inputs.phone}</label>
                    <div className="relative">
                      <Phone className="absolute right-4 top-3.5 text-gray-300 w-5 h-5" />
                      <input required type="tel" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-500 pr-1">{text.inputs.address}</label>
                  <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none bg-gray-50/50"></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* ستون چپ: خلاصه فاکتور */}
          <div className="lg:col-span-1">
            <div className="bg-vela-navy text-white rounded-3xl p-8 shadow-2xl sticky top-24 relative overflow-hidden">
              {/* افکت نوری پس‌زمینه */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-vela-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-xl font-bold mb-6 font-serif border-b border-white/10 pb-4 relative z-10">{text.summaryTitle}</h2>
              
              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-center text-white/80">
                  <span>{order?.title} Package</span>
                  <span>
                    {order && order.finalQuantities ? (
                       // اگر جزئیات داریم، تعداد پد را نشان بده به عنوان نمونه
                       \`\${order.finalQuantities.pads} Pads + ...\`
                    ) : ''}
                  </span>
                </div>
                {order && order.finalQuantities?.hotWaterBottle > 0 && (
                   <div className="flex justify-between items-center text-vela-gold text-sm">
                      <span>+ {text.items?.hotWaterBottle || 'Hot Water Bottle'}</span>
                      <CheckCircle size={14}/>
                   </div>
                )}
              </div>

              <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-end">
                   <span className="text-white/60 text-sm">Total</span>
                   <div className="text-3xl font-bold font-sans">
                     {order ? formatPrice(order.totalPrice) : '0'} 
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
}`;

const targetPath = path.join(__dirname, 'src/app/checkout/page.tsx');
fs.writeFileSync(targetPath, checkoutContent);
console.log("✅ صفحه پرداخت کامل با دکمه بازگشت ساخته شد!");