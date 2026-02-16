'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

const content: any = {
  EN: {
    title: "Payment Successful!",
    desc: "Thank you for your purchase. Your order has been received and is being processed.",
    note: "We will contact you via Telegram/WhatsApp for shipping updates.",
    btn: "Return to Home"
  },
  FA: {
    title: "پرداخت با موفقیت انجام شد!",
    desc: "با تشکر از خرید شما. سفارش شما دریافت شد و در حال پردازش است.",
    note: "برای هماهنگی ارسال، از طریق تلگرام یا واتس‌اپ با شما تماس خواهیم گرفت.",
    btn: "بازگشت به صفحه اصلی"
  },
  TR: {
    title: "Ödeme Başarılı!",
    desc: "Satın aldığınız için teşekkür ederiz. Siparişiniz alındı ve işleniyor.",
    note: "Kargo güncellemeleri için Telegram/WhatsApp üzerinden sizinle iletişime geçeceğiz.",
    btn: "Ana Sayfaya Dön"
  },
  RU: {
    title: "Оплата прошла успешно!",
    desc: "Спасибо за покупку. Ваш заказ принят и находится в обработке.",
    note: "Мы свяжемся с вами через Telegram/WhatsApp для обновлений по доставке.",
    btn: "Вернуться на главную"
  }
};

export default function SuccessPage() {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    // 1. تنظیم زبان
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);

    // 2. پاک کردن سبد خرید موقت (چون خرید انجام شده)
    localStorage.removeItem('vela-temp-order');
    
    // اگر سبد خرید اصلی هم دارید، می‌توانید اینجا پاک کنید
    // localStorage.removeItem('vela-cart'); 
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-green-100 animate-scale-in">
        
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-pulse">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-4">{t.title}</h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed text-lg">
          {t.desc}
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-8 text-sm text-gray-400 border border-gray-100">
          {t.note}
        </div>

        <Link href="/" className="block w-full bg-[#1A2A3A] text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
          {lang === 'FA' ? <ArrowLeftHome/> : <Home size={20}/>} {t.btn}
        </Link>

      </div>
    </div>
  );
}

// کامپوننت کوچک برای آیکون خانه در حالت فارسی (چون آیکون باید برعکس باشد)
function ArrowLeftHome() {
    return <Home size={20} className="order-last"/>;
}