'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('FA');

  // لیست زبان‌های پشتیبانی شده
  const languages = ['FA', 'EN', 'TR', 'RU'];

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang && languages.includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    // پیدا کردن زبان بعدی در لیست
    const currentIndex = languages.indexOf(lang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];

    setLang(newLang);
    localStorage.setItem('vela-lang', newLang);
    
    // خبر دادن به کل سایت برای تغییر قیمت‌ها و متون
    window.dispatchEvent(new Event('vela-language-change'));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-3xl font-serif font-bold text-[#1A2A3A]">
          VELA
        </Link>

        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">
            {lang === 'FA' ? 'خانه' : lang === 'TR' ? 'Ana Sayfa' : lang === 'RU' ? 'Главная' : 'Home'}
          </Link>
          <Link href="/box-builder" className="hover:text-[#D4AF37] transition-colors">
             {lang === 'FA' ? 'ساخت باکس' : lang === 'TR' ? 'Kutu Yap' : lang === 'RU' ? 'Собрать бокс' : 'Build Box'}
          </Link>
          <Link href="/gift" className="hover:text-[#D4AF37] transition-colors">
             {lang === 'FA' ? 'هدیه' : lang === 'TR' ? 'Hediye' : lang === 'RU' ? 'Подарок' : 'Gift'}
          </Link>
          <Link href="/tracking" className="hover:text-[#D4AF37] transition-colors">
             {lang === 'FA' ? 'پیگیری' : lang === 'TR' ? 'Takip' : lang === 'RU' ? 'Трекинг' : 'Track'}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#1A2A3A] hover:bg-gray-50 transition-colors"
          >
            <Globe size={14} />
            {lang}
          </button>

          <Link href="/dashboard" className="hidden md:block p-2 hover:bg-gray-100 rounded-full text-[#1A2A3A]"><User size={24} /></Link>
          <Link href="/checkout" className="p-2 hover:bg-gray-100 rounded-full text-[#1A2A3A]"><ShoppingBag size={24} /></Link>
          <button className="md:hidden p-2 text-[#1A2A3A]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 animate-fade-in-down">
           {/* منوی موبایل هم می‌تواند اینجا ترجمه شود ولی برای سادگی فعلا لینک‌ها ثابت‌اند */}
           <Link href="/" className="text-[#1A2A3A] py-2 border-b">Home</Link>
           <Link href="/box-builder" className="text-[#1A2A3A] py-2 border-b">Box Builder</Link>
        </div>
      )}
    </header>
  );
}