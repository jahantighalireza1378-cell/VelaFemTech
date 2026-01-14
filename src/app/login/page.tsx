'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Smartphone, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('social'); // social | phone

  const handleSocialLogin = (provider: string) => {
    // اینجا در آینده کد واقعی اتصال به گوگل/اپل قرار می‌گیرد
    alert(`ورود با ${provider} با موفقیت انجام شد (نسخه دمو)`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center px-6">
      
      {/* دکمه بازگشت به خانه */}
      <div className="absolute top-6 right-6">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1A2A3A] transition-colors">
          <ArrowRight size={20}/> بازگشت به خانه
        </Link>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <h1 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-2">VELA</h1>
        <p className="text-gray-500 mb-8">عضویت یا ورود به حساب کاربری</p>

        {step === 'social' ? (
          <div className="space-y-4">
            {/* دکمه گوگل */}
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all group"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              <span className="font-bold text-gray-700">ورود با گوگل</span>
            </button>

            {/* دکمه اپل */}
            <button 
              onClick={() => handleSocialLogin('Apple ID')}
              className="w-full py-3 px-4 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:opacity-80 transition-all"
            >
              <img src="https://www.svgrepo.com/show/445615/apple.svg" className="w-6 h-6 invert" alt="Apple" />
              <span className="font-bold">ورود با اپل آیدی</span>
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">یا</span></div>
            </div>

            {/* دکمه موبایل */}
            <button 
              onClick={() => setStep('phone')}
              className="w-full py-3 bg-[#D4AF37] text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Smartphone size={20}/> ورود با شماره موبایل
            </button>
          </div>
        ) : (
          // فرم شماره موبایل
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-right mb-4">
               <button onClick={() => setStep('social')} className="text-sm text-gray-400 flex items-center gap-1 hover:text-[#1A2A3A]">
                 <ArrowLeft size={14}/> تغییر روش ورود
               </button>
            </div>
            
            <input 
              type="tel" 
              placeholder="شماره موبایل (مثال: 0912...)" 
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-[#D4AF37] text-center text-lg tracking-widest"
            />
            
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-[#1A2A3A] text-white rounded-xl font-bold hover:bg-[#D4AF37] transition-all"
            >
              ارسال کد تایید
            </button>
            
            {/* ✅ دکمه بازگشت که خواسته بودید */}
            <button 
               onClick={() => setStep('social')}
               className="w-full py-3 text-gray-400 font-bold hover:text-gray-600 transition-colors"
            >
              بازگشت
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400">
          با ورود به ولا، <a href="#" className="underline">قوانین و مقررات</a> را می‌پذیرم.
        </p>
      </div>
    </div>
  );
}