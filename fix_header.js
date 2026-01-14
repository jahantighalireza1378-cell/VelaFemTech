const fs = require('fs');
const path = require('path');

const headerContent = `'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, X, Globe, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // بررسی وضعیت ورود کاربر
  useEffect(() => {
    // چک کردن اینکه آیا کارت ورود در کوکی‌ها هست یا نه
    const checkLogin = () => {
      const hasAuthToken = document.cookie.includes('vela-auth-token');
      setIsLoggedIn(hasAuthToken);
    };
    
    checkLogin();
    // چک کردن مداوم برای وقتی کاربر لاگین می‌کند
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "vela-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-vela-navy/95 backdrop-blur-md border-b border-vela-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* لوگو */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-serif text-3xl text-vela-gold tracking-widest font-bold">VELA</h1>
            </Link>
          </div>

          {/* منوی وسط */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/box-builder" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">طراحی بسته</Link>
            <Link href="/gift" className="text-vela-marble hover:text-vela-gold transition-colors text-sm uppercase tracking-wide">هدیه</Link>
          </nav>

          {/* منوی سمت چپ (کاربری) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 text-vela-marble/80 hover:text-vela-gold cursor-pointer text-sm">
              <Globe size={16} />
              <span className="font-sans font-medium">FA</span>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 animate-fade-in">
                <span className="text-vela-gold text-sm font-medium">۱۵۰ امتیاز</span>
                <Link href="/dashboard">
                  <div className="w-10 h-10 rounded-full bg-vela-gold/20 border border-vela-gold flex items-center justify-center text-vela-gold hover:bg-vela-gold hover:text-vela-navy transition-all cursor-pointer">
                    <User size={20} />
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-400" title="خروج">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="px-6 py-2 border border-vela-gold text-vela-gold rounded-full hover:bg-vela-gold hover:text-vela-navy transition-all duration-300 text-sm font-medium">
                  ورود / عضویت
                </button>
              </Link>
            )}
          </div>

          {/* منوی موبایل */}
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
console.log("✅ هدر سایت هوشمند شد!");