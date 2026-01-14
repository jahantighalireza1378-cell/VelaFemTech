'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Loader2, Lock } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState('PHONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // شبیه‌سازی ارسال کد
    try {
      const res = await fetch('/api/auth/send-otp', { 
        method: 'POST', 
        body: JSON.stringify({ phoneNumber }) 
      });
      const data = await res.json();
      console.log('کد مخفی برای ورود:', data.debugCode);
      setStep('OTP');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // تاخیر مصنوعی برای واقعی به نظر رسیدن
    setTimeout(() => {
      if (otpCode.length === 5) {
        // ۱. صدور کارت ورود (مهمترین بخش تعمیر شده)
        document.cookie = "vela-auth-token=true; path=/; max-age=86400";
        
        // ۲. بررسی اینکه کاربر کجا می‌خواست برود
        const redirectPath = searchParams.get('redirect_to') || '/dashboard';
        
        // ۳. هدایت کاربر
        window.location.href = redirectPath;
      } else {
        setIsLoading(false);
        alert("کد وارد شده صحیح نیست (کد داخل پنجره سیاه را چک کنید)");
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 border border-vela-gold/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif text-vela-navy font-bold mb-2">
          {step === 'PHONE' ? 'ورود به حساب کاربری' : 'تایید شماره موبایل'}
        </h2>
        <p className="text-gray-400 text-sm">
          {step === 'PHONE' ? 'برای مدیریت بسته‌ها وارد شوید' : `کد ارسال شده به ${phoneNumber}`}
        </p>
      </div>

      {step === 'PHONE' && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="relative">
            <Phone className="absolute right-4 top-3.5 text-gray-300" size={20} />
            <input 
              type="tel" 
              placeholder="شماره موبایل (مثلا 0912...)" 
              className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none transition-colors text-left dir-ltr" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || phoneNumber.length < 10} 
            className="w-full py-4 bg-vela-navy text-white rounded-xl font-bold flex justify-center gap-2 hover:bg-vela-navy/90 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'دریافت کد تایید'}
          </button>
        </form>
      )}

      {step === 'OTP' && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex justify-center gap-2 dir-ltr">
            <input 
              type="text" 
              maxLength={5} 
              autoFocus
              className="w-full text-center text-3xl py-3 border-b-2 border-vela-gold/50 outline-none tracking-[0.5em] text-vela-navy font-bold" 
              value={otpCode} 
              onChange={(e) => setOtpCode(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || otpCode.length < 5} 
            className="w-full py-4 bg-vela-gold text-vela-navy rounded-xl font-bold flex justify-center gap-2 hover:bg-white border border-transparent hover:border-vela-gold transition-all shadow-gold-glow"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'ورود به سیستم'}
          </button>
          <button 
            type="button"
            onClick={() => setStep('PHONE')}
            className="w-full text-sm text-gray-400 hover:text-vela-navy"
          >
            تغییر شماره
          </button>
        </form>
      )}
    </div>
  );
}