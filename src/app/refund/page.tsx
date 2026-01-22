'use client';

import { useState, useEffect } from 'react';

export default function RefundPage() {
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
  }, []);

  const content: any = {
    FA: {
      title: "رویه بازگشت کالا و استرداد وجه",
      updated: "آخرین بروزرسانی: ژانویه ۲۰۲۶",
      p1: "به دلیل ماهیت بهداشتی محصولات (نوار بهداشتی، تامپون و...)، امکان بازگشت کالاهایی که بسته‌بندی آنها باز شده است وجود ندارد.",
      p2: "اگر بسته ارسالی آسیب دیده باشد یا اشتباه ارسال شده باشد، لطفاً ظرف ۴۸ ساعت با عکس مستندات با ما تماس بگیرید. ما فوراً یک بسته جدید ارسال کرده یا مبلغ را کامل عودت می‌دهیم.",
      p3: "برای لغو اشتراک، باید حداقل ۳ روز قبل از تاریخ تمدید خودکار اقدام کنید. مبالغ پرداخت شده برای باکس‌های ارسال شده قابل استرداد نیستند."
    },
    EN: {
      title: "Refund & Cancellation Policy",
      updated: "Last Updated: January 2026",
      p1: "Due to the hygienic nature of our products, we cannot accept returns for opened items.",
      p2: "If your box arrives damaged or incorrect, please contact us within 48 hours with photos. We will send a replacement or issue a full refund immediately.",
      p3: "Subscriptions must be cancelled at least 3 days before the renewal date. Refunds are not issued for boxes that have already been shipped."
    },
    TR: {
      title: "İade ve İptal Politikası",
      updated: "Son Güncelleme: Ocak 2026",
      p1: "Ürünlerimizin hijyenik yapısı gereği, açılmış paketlerin iadesini kabul edemiyoruz.",
      p2: "Kutunuz hasarlı veya yanlış gelirse, 48 saat içinde bizimle iletişime geçin. Yenisini gönderir veya ücret iadesi yaparız.",
      p3: "Abonelik iptalleri, yenileme tarihinden en az 3 gün önce yapılmalıdır."
    },
    RU: {
      title: "Возврат и Отмена",
      updated: "Обновлено: Январь 2026",
      p1: "Из-за гигиенического характера товаров мы не принимаем возврат открытых упаковок.",
      p2: "Если посылка повреждена, свяжитесь с нами в течение 48 часов для замены или возврата денег.",
      p3: "Подписку можно отменить за 3 дня до даты продления."
    }
  };

  const t = content[lang] || content.EN;
  const isRTL = lang === 'FA';

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-32 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2">{t.title}</h1>
        <p className="text-gray-400 text-sm mb-8">{t.updated}</p>
        <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
        </div>
      </div>
    </div>
  );
}