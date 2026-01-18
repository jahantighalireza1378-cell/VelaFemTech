'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Globe, LayoutDashboard } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // زبان پیش‌فرض را انگلیسی (EN) یا فارسی (FA) بگذارید
  const [lang, setLang] = useState('EN'); 

  // دیکشنری کلمات برای ترجمه
  const translations: any = {
    EN: {
      products: 'Products',
      story: 'Our Story',
      dashboard: 'My Dashboard',
      cart: 'Cart',
      login: 'Login / Sign Up',
      manage: 'Manage Account'
    },
    FA: {
      products: 'محصولات',
      story: 'داستان ما',
      dashboard: 'داشبورد من',
      cart: 'سبد خرید',
      login: 'ورود / ثبت‌نام',
      manage: 'مدیریت حساب'
    },
    TR: {
      products: 'Ürünler',
      story: 'Hikayemiz',
      dashboard: 'Panelim',
      cart: 'Sepetim',
      login: 'Giriş / Kayıt',
      manage: 'Hesap Ayarları'
    },
    RU: {
      products: 'Продукты',
      story: 'О нас',
      dashboard: 'Мой кабинет',
      cart: 'Корзина',
      login: 'Войти',
      manage: 'Управление'
    }
  };

  useEffect(() => {
    // خواندن زبان ذخیره شده از حافظه مرورگر
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = () => {
    const langs = ['EN', 'FA', 'TR', 'RU'];
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    const nextLang = langs[nextIndex];
    setLang(nextLang);
    localStorage.setItem('vela-lang', nextLang);
    
    // ارسال پیام به کل سایت برای تغییر زبان (اختیاری)
    window.dispatchEvent(new Event('vela-language-change'));
  };

  // انتخاب متن‌ها بر اساس زبان فعلی
  const t = translations[lang] || translations['EN'];
  const isRTL = lang === 'FA'; // برای راست‌چین کردن فارسی

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-[#D4AF37]/20 shadow-sm" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-[#1A2A3A]">
          VELA<span className="text-[#D4AF37]">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex gap-8 text-[#1A2A3A]/80 font-medium items-center ${isRTL ? 'font-sans' : ''}`}>
          <Link href="/products" className="hover:text-[#D4AF37] transition">{t.products}</Link>
          <Link href="/about" className="hover:text-[#D4AF37] transition">{t.story}</Link>
          
          <SignedIn>
            <Link href="/dashboard" className="flex items-center gap-2 text-[#D4AF37] font-semibold hover:text-[#1A2A3A] transition">
              <LayoutDashboard size={18} />
              {t.dashboard}
            </Link>
          </SignedIn>

          <button onClick={changeLanguage} className="flex items-center gap-1 hover:text-[#D4AF37] min-w-[50px]">
             <Globe size={18}/> {lang}
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-full border border-[#1A2A3A] text-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white transition text-sm">
                  {t.login}
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
                <div className="flex items-center gap-4">
                    <Link href="/checkout" className="relative p-2 text-[#1A2A3A] hover:text-[#D4AF37]">
                        <ShoppingBag size={24}/>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Link>
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#1A2A3A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden bg-white border-t border-gray-100 absolute w-full p-6 flex flex-col gap-6 shadow-xl h-screen ${isRTL ? 'text-right' : 'text-left'}`}>
          <Link href="/products" className="text-xl font-medium text-[#1A2A3A]" onClick={() => setIsOpen(false)}>{t.products}</Link>
          
          <SignedIn>
             <Link href="/dashboard" className="flex items-center gap-3 text-xl font-medium text-[#D4AF37]" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={20} />
                {t.dashboard}
             </Link>
             <Link href="/checkout" className="flex items-center gap-3 text-xl font-medium text-[#1A2A3A]" onClick={() => setIsOpen(false)}>
                <ShoppingBag size={20} />
                {t.cart}
             </Link>
          </SignedIn>

          <Link href="/about" className="text-xl font-medium text-[#1A2A3A]" onClick={() => setIsOpen(false)}>{t.story}</Link>
          
          <div className="mt-4 border-t pt-6">
             <SignedOut>
                <SignInButton mode="modal">
                    <button className="w-full py-3 bg-[#1A2A3A] text-white rounded-xl text-lg">{t.login}</button>
                </SignInButton>
             </SignedOut>
             
             <SignedIn>
                <div className="flex items-center gap-3 justify-center">
                    <UserButton afterSignOutUrl="/"/>
                    <span className="text-gray-500">{t.manage}</span>
                </div>
             </SignedIn>
             
             {/* دکمه تغییر زبان در موبایل */}
             <button onClick={changeLanguage} className="w-full mt-4 py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2">
                <Globe size={20}/> Change Language ({lang})
             </button>
          </div>
        </div>
      )}
    </header>
  );
}