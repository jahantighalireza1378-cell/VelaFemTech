'use client';

import { useState, useEffect } from 'react';

export default function TermsPage() {
  const [lang, setLang] = useState('EN');

  const content: any = {
    EN: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: January 2026",
      introTitle: "1. Introduction",
      introText: "Welcome to VELA. By accessing our website and purchasing our subscription boxes or products, you agree to be bound by these Terms of Service. Our services are provided from Alanya, Turkey.",
      subTitle: "2. Subscriptions & Payments",
      subText: "By subscribing to VELA, you agree to recurring billing. Your payment method will be charged automatically according to your selected plan (monthly, 3-month, or 6-month). You can cancel your subscription at any time from your dashboard before the next billing cycle.",
      shipTitle: "3. Shipping",
      shipText: "We currently ship primarily within Turkey and select regions. Shipping times are estimates and may vary. We are not responsible for delays caused by customs or local carriers.",
      contactTitle: "4. Contact Us",
      contactText: "For any questions regarding these terms, please contact us at hello@velacare.com."
    },
    FA: {
      title: "شرایط و قوانین استفاده",
      lastUpdated: "آخرین بروزرسانی: ژانویه ۲۰۲۶",
      introTitle: "۱. مقدمه",
      introText: "به VELA خوش آمدید. با دسترسی به وب‌سایت ما و خرید باکس‌های اشتراکی یا محصولات، شما موافقت می‌کنید که به این شرایط و قوانین پایبند باشید. خدمات ما از شهر آلانیا، ترکیه ارائه می‌شود.",
      subTitle: "۲. اشتراک‌ها و پرداخت‌ها",
      subText: "با عضویت در VELA، شما با پرداخت دوره‌ای موافقت می‌کنید. روش پرداخت شما به طور خودکار بر اساس طرح انتخابی (ماهانه، ۳ ماهه یا ۶ ماهه) شارژ خواهد شد. شما می‌توانید اشتراک خود را هر زمان قبل از دوره صورتحساب بعدی از طریق داشبورد لغو کنید.",
      shipTitle: "۳. ارسال",
      shipText: "ما در حال حاضر عمدتاً در داخل ترکیه و مناطق منتخب ارسال داریم. زمان‌های ارسال تخمینی هستند و ممکن است متغیر باشند.",
      contactTitle: "۴. تماس با ما",
      contactText: "برای هرگونه سوال در مورد این شرایط، لطفاً با ما از طریق ایمیل hello@velacare.com تماس بگیرید."
    },
    TR: {
      title: "Hizmet Şartları",
      lastUpdated: "Son Güncelleme: Ocak 2026",
      introTitle: "1. Giriş",
      introText: "VELA'ya hoş geldiniz. Web sitemize erişerek ve ürünlerimizi satın alarak bu Hizmet Şartlarına uymayı kabul edersiniz. Hizmetlerimiz Alanya, Türkiye'den sağlanmaktadır.",
      subTitle: "2. Abonelikler ve Ödemeler",
      subText: "VELA'ya abone olarak, tekrarlayan ödemeleri kabul edersiniz. Seçtiğiniz plana göre (aylık, 3 aylık veya 6 aylık) ödeme yönteminizden otomatik olarak tahsilat yapılacaktır.",
      shipTitle: "3. Kargo",
      shipText: "Şu anda öncelikle Türkiye içinde ve belirli bölgelere gönderim yapıyoruz. Gönderim süreleri tahminidir.",
      contactTitle: "4. İletişim",
      contactText: "Bu şartlarla ilgili sorularınız için lütfen hello@velacare.com adresinden bizimle iletişime geçin."
    },
    RU: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: Январь 2026",
      introTitle: "1. Введение",
      introText: "Добро пожаловать в VELA. Используя наш сайт и покупая продукты, вы соглашаетесь с этими условиями. Наши услуги предоставляются из Алании, Турция.",
      subTitle: "2. Подписки и платежи",
      subText: "Оформляя подписку VELA, вы соглашаетесь на регулярные платежи. Списание происходит автоматически согласно выбранному плану.",
      shipTitle: "3. Доставка",
      shipText: "Мы осуществляем доставку преимущественно по Турции. Сроки доставки являются приблизительными.",
      contactTitle: "4. Контакты",
      contactText: "По всем вопросам обращайтесь на hello@velacare.com."
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);
    window.addEventListener('vela-language-change', () => {
        const newLang = localStorage.getItem('vela-lang');
        if (newLang) setLang(newLang);
    });
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-32 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in">
        <h1 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-4">{t.title}</h1>
        <p className="text-gray-500 mb-12 text-sm uppercase tracking-wider">{t.lastUpdated}</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold text-[#1A2A3A] mb-4">{t.introTitle}</h2>
                <p>{t.introText}</p>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-[#1A2A3A] mb-4">{t.subTitle}</h2>
                <p>{t.subText}</p>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-[#1A2A3A] mb-4">{t.shipTitle}</h2>
                <p>{t.shipText}</p>
            </section>
            <section className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-bold text-[#1A2A3A] mb-4">{t.contactTitle}</h2>
                <p className="text-gray-600">{t.contactText}</p>
            </section>
        </div>
      </div>
    </div>
  );
}