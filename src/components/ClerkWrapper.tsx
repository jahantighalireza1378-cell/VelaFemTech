'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { faIR, trTR, ruRU, enUS } from '@clerk/localizations';
import { useState, useEffect } from 'react';

export default function ClerkWrapper({ children }: { children: React.ReactNode }) {
  // پیش‌فرض انگلیسی باشد
  const [locale, setLocale] = useState(enUS);

  useEffect(() => {
    // تابعی برای تشخیص زبان انتخاب شده
    const checkLang = () => {
      const savedLang = localStorage.getItem('vela-lang');
      if (savedLang === 'FA') setLocale(faIR);
      else if (savedLang === 'TR') setLocale(trTR);
      else if (savedLang === 'RU') setLocale(ruRU);
      else setLocale(enUS);
    };

    // بار اول چک کن
    checkLang();

    // اگر کاربر زبان را عوض کرد، سریع آپدیت کن
    window.addEventListener('vela-language-change', checkLang);
    return () => window.removeEventListener('vela-language-change', checkLang);
  }, []);

  return (
    <ClerkProvider localization={locale}>
      {children}
    </ClerkProvider>
  );
}