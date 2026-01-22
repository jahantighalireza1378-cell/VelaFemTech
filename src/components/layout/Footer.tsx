'use client';

import Link from 'next/link';
import { Instagram, Send, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    const updateLang = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    updateLang();
    window.addEventListener('vela-language-change', updateLang);
    return () => window.removeEventListener('vela-language-change', updateLang);
  }, []);

  // 🌍 دیکشنری ترجمه‌ها
  const t: any = {
    FA: {
      desc: 'ما در ولا (VELA) باور داریم که دوران پریود نباید مانعی برای پیشرفت شما باشد. با شعار "Sail Through It"، کنارتان هستیم تا از طوفان‌های هورمونی به آرامی عبور کنید.',
      quickLinks: 'دسترسی سریع',
      contact: 'تماس با ما',
      links: { home: 'خانه', build: 'ساخت باکس', gift: 'کارت هدیه', track: 'پیگیری سفارش' },
      copyright: 'تمامی حقوق محفوظ است.',
      location: 'آلانیا، ترکیه', // اصلاح شده برای شاپیر
      legal: { privacy: 'حریم خصوصی', terms: 'شرایط و قوانین', refund: 'رویه بازگشت کالا' }
    },
    EN: {
      desc: 'At VELA, we believe periods shouldn\'t hold you back. With "Sail Through It", we are here to help you navigate through hormonal storms smoothly.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      links: { home: 'Home', build: 'Build Box', gift: 'Gift Card', track: 'Order Tracking' },
      copyright: 'All rights reserved.',
      location: 'Alanya, Turkey', // Updated for Shopier
      legal: { privacy: 'Privacy Policy', terms: 'Terms of Service', refund: 'Refund Policy' }
    },
    TR: {
      desc: 'VELA olarak regl döneminin sizi durdurmaması gerektiğine inanıyoruz. "Sail Through It" sloganıyla, hormonal fırtınaları sakince atlatmanız için yanınızdayız.',
      quickLinks: 'Hızlı Erişim',
      contact: 'İletişim',
      links: { home: 'Ana Sayfa', build: 'Kutu Yap', gift: 'Hediye Kartı', track: 'Sipariş Takibi' },
      copyright: 'Tüm hakları saklıdır.',
      location: 'Alanya, Türkiye', // Güncellendi
      legal: { privacy: 'Gizlilik Politikası', terms: 'Hizmet Şartları', refund: 'İade Politikası' }
    },
    RU: {
      desc: 'В VELA мы верим, что менструация не должна вас сдерживать. Под девизом "Sail Through It" мы здесь, чтобы помочь вам плавно пройти через гормональные штормы.',
      quickLinks: 'Быстрые ссылки',
      contact: 'Контакты',
      links: { home: 'Главная', build: 'Собрать бокс', gift: 'Подарочная карта', track: 'Отслеживание' },
      copyright: 'Все права защищены.',
      location: 'Алания, Турция', // Обновлено
      legal: { privacy: 'Конфиденциальность', terms: 'Условия использования', refund: 'Возврат товара' }
    }
  };

  const text = t[lang] || t.EN;
  const isRTL = lang === 'FA';

  return (
    <footer className="bg-[#1A2A3A] text-white pt-16 pb-8 border-t border-[#D4AF37]/20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* ستون ۱: درباره */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-4">VELA</h2>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-sm text-justify">
            {text.desc}
          </p>
          <div className="flex gap-4">
            {/* ✅ لینک اینستاگرام */}
            <a 
              href="https://instagram.com/velafemtech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A2A3A] transition-all"
            >
              <Instagram size={20}/>
            </a>

            {/* لینک تلگرام */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A2A3A] transition-all">
              <Send size={20}/>
            </a>
          </div>
        </div>

        {/* ستون ۲: لینک‌ها */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-[#D4AF37]">{text.quickLinks}</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">{text.links.home}</Link></li>
            <li><Link href="/box-builder" className="hover:text-white transition-colors">{text.links.build}</Link></li>
            <li><Link href="/gift" className="hover:text-white transition-colors">{text.links.gift}</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">{text.links.track}</Link></li> {/* اصلاح لینک ترک */}
          </ul>
        </div>

        {/* ستون ۳: تماس */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-[#D4AF37]">{text.contact}</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-2">
                <Mail size={16} className={isRTL ? 'ml-2' : 'mr-2'}/>
                <a href="mailto:VelaFemTech@gmail.com" className="hover:text-[#D4AF37] transition-colors" dir="ltr">
                  VelaFemTech@gmail.com
                </a>
            </li>
            <li className="flex items-center gap-2">
                <span className="text-xl">📍</span> {text.location}
            </li>
          </ul>
        </div>
      </div>

      {/* بخش کپی‌رایت و لینک‌های قانونی (آپدیت شده) */}
      <div className="border-t border-white/10 mt-12 pt-8 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4">
        <div className="text-gray-500 text-center md:text-start">
           © 2026 VELA. {text.copyright} | Sail Through It
        </div>
        
        {/* لینک‌های قانونی جدید */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">{text.legal.privacy}</Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">{text.legal.terms}</Link>
            <Link href="/refund" className="hover:text-[#D4AF37] transition-colors">{text.legal.refund}</Link>
        </div>
      </div>
    </footer>
  );
}