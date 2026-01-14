const fs = require('fs');
const path = require('path');

const headerContent = `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, X, Globe, LogOut, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState('FA'); // حالت پیش‌فرض فارسی

  useEffect(() => {
    // خواندن وضعیت لاگین و زبان از مرورگر
    const checkStatus = () => {
      const hasAuthToken = document.cookie.includes('vela-auth-token');
      setIsLoggedIn(hasAuthToken);
      
      // اگر قبلا زبانی انتخاب شده، آن را بخوان
      const savedLang = localStorage.getItem('vela-lang');
      if (savedLang) setLang(savedLang);
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "vela-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push('/');
  };

  // تابع تغییر زبان (چرخشی)
  const toggleLanguage = () => {
    const langs = ['FA', 'EN', 'TR'];
    const currentIndex = langs.indexOf(lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    
    setLang(nextLang);
    localStorage.setItem('vela-lang', nextLang); // ذخیره تا بعد از رفرش هم بماند
    
    // نمایش پیام موقت (چون هنوز ترجمه کامل متون را نداریم)
    alert(\`زبان سایت به \${nextLang === 'FA' ? 'فارسی' : nextLang === 'EN' ? 'English' : 'Türkçe'} تغییر کرد.\\n(ترجمه کامل متون در نسخه بعدی اضافه می‌شود)\`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-vela-navy/95 backdrop-blur-md border-b border-vela-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-serif text-3xl text-vela-gold tracking-widest font-bold">VELA</h1>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/box-builder" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">
              {lang === 'FA' ? 'طراحی بسته' : lang === 'TR' ? 'PAKET OLUŞTUR' : 'BOX BUILDER'}
            </Link>
            <Link href="/gift" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">
              {lang === 'FA' ? 'هدیه' : lang === 'TR' ? 'HEDİYE' : 'GIFT'}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {/* دکمه تغییر زبان فعال شده */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-vela-marble/80 hover:text-vela-gold cursor-pointer text-sm transition-all hover:scale-110"
              title="تغییر زبان / Change Language"
            >
              <Globe size={16} />
              <span className="font-sans font-medium w-6 text-center">{lang}</span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 animate-fade-in">
                <span className="text-vela-gold text-sm font-medium">
                  {lang === 'FA' ? '۱۵۰ امتیاز' : '150 Pts'}
                </span>
                <Link href="/dashboard">
                  <div className="w-10 h-10 rounded-full bg-vela-gold/20 border border-vela-gold flex items-center justify-center text-vela-gold hover:bg-vela-gold hover:text-vela-navy transition-all cursor-pointer">
                    <User size={20} />
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="px-6 py-2 border border-vela-gold text-vela-gold rounded-full hover:bg-vela-gold hover:text-vela-navy transition-all duration-300 text-sm font-medium">
                  {lang === 'FA' ? 'ورود / عضویت' : lang === 'TR' ? 'GİRİŞ YAP' : 'LOGIN'}
                </button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-vela-gold hover:text-white transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}`;

const targetPath = path.join(__dirname, 'src/components/layout/Header.tsx');
fs.writeFileSync(targetPath, headerContent);
console.log("✅ دکمه تغییر زبان فعال شد (با ترجمه منوها)!");