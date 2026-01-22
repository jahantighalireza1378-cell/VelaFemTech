'use client';

import { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
  }, []);

  const content: any = {
    FA: {
      title: "سیاست حفظ حریم خصوصی",
      updated: "آخرین بروزرسانی: ژانویه ۲۰۲۶",
      p1: "ما در VELA به حریم خصوصی شما احترام می‌گذاریم. اطلاعاتی که از شما دریافت می‌کنیم (مانند نام، آدرس و شماره تماس) صرفاً برای پردازش سفارشات و ارسال باکس‌ها استفاده می‌شود.",
      p2: "ما اطلاعات شما را با هیچ شخص ثالثی به اشتراک نمی‌گذاریم، مگر شرکت‌های حمل و نقل برای تحویل مرسوله.",
      p3: "تمامی تراکنش‌های مالی از طریق درگاه‌های امن رمزگذاری شده انجام می‌شود و ما اطلاعات کارت بانکی شما را ذخیره نمی‌کنیم."
    },
    EN: {
      title: "Privacy Policy",
      updated: "Last Updated: January 2026",
      p1: "At VELA, we respect your privacy. The information we collect (name, address, contact info) is used solely for processing orders and shipping boxes.",
      p2: "We do not share your personal data with third parties, except for shipping carriers required to deliver your package.",
      p3: "All financial transactions are processed through encrypted secure gateways. We do not store your credit card details."
    },
    TR: {
      title: "Gizlilik Politikası",
      updated: "Son Güncelleme: Ocak 2026",
      p1: "VELA olarak gizliliğinize saygı duyuyoruz. Topladığımız bilgiler (isim, adres, iletişim) sadece sipariş işleme ve kargo için kullanılır.",
      p2: "Kişisel verilerinizi, kargo şirketleri dışında üçüncü taraflarla paylaşmayız.",
      p3: "Tüm finansal işlemler şifreli güvenli ağ geçitleri üzerinden yapılır. Kredi kartı bilgilerinizi saklamıyoruz."
    },
    RU: {
      title: "Политика конфиденциальности",
      updated: "Обновлено: Январь 2026",
      p1: "В VELA мы уважаем вашу конфиденциальность. Мы используем ваши данные только для обработки заказов.",
      p2: "Мы не передаем ваши данные третьим лицам, за исключением служб доставки.",
      p3: "Все платежи защищены шифрованием. Мы не храним данные ваших карт."
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