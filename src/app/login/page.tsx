'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Smartphone, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('social'); // social | phone | otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // تایمر معکوس برای ارسال مجدد کد
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSocialLogin = (provider: string) => {
    alert(`ورود با ${provider} در نسخه آزمایشی غیرفعال است.`);
  };

  const sendOtp = () => {
    if (phone.length < 10) {
      alert('لطفاً شماره موبایل صحیح وارد کنید');
      return;
    }
    setLoading(true);
    // شبیه‌سازی ارسال پیامک (در آینده اینجا به API پیامک وصل می‌شود)
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(60);
      alert('کد تایید آزمایشی: 12345'); // 👉 کد برای تست شما
    }, 1500);
  };

  const verifyOtp = () => {
    if (otp === '12345') {
      setLoading(true);
      setTimeout(() => {
        router.push('/dashboard'); // ✅ انتقال به داشبورد
      }, 1000);
    } else {
      alert('کد وارد شده اشتباه است! (از کد 12345 استفاده کنید)');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center px-6">
      
      {/* دکمه بازگشت به خانه */}
      <div className="absolute top-6 right-6">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1A2A3A] transition-colors">
          <ArrowRight size={20}/> بازگشت به خانه
        </Link>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100 relative overflow-hidden">
        
        {/* هدر لوگو */}
        <h1 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-2">VELA</h1>
        <p className="text-gray-500 mb-8">
          {step === 'otp' ? 'کد تایید را وارد کنید' : 'عضویت یا ورود به حساب'}
        </p>

        {/* --- مرحله ۱: انتخاب روش ورود --- */}
        {step === 'social' && (
          <div className="space-y-4 animate-fade-in-up">
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              <span className="font-bold text-gray-700">ورود با گوگل</span>
            </button>

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

            <button 
              onClick={() => setStep('phone')}
              className="w-full py-3 bg-[#D4AF37] text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Smartphone size={20}/> ورود با شماره موبایل
            </button>
          </div>
        )}

        {/* --- مرحله ۲: وارد کردن شماره --- */}
        {step === 'phone' && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="text-right mb-4">
               <button onClick={() => setStep('social')} className="text-sm text-gray-400 flex items-center gap-1 hover:text-[#1A2A3A]">
                 <ArrowLeft size={14}/> تغییر روش
               </button>
            </div>
            
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره موبایل (مثال: 0912...)" 
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-[#D4AF37] text-center text-lg tracking-widest dir-ltr"
              autoFocus
            />
            
            <button 
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-4 bg-[#1A2A3A] text-white rounded-xl font-bold hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin"/> : 'ارسال کد تایید'}
            </button>
          </div>
        )}

        {/* --- مرحله ۳: وارد کردن کد (OTP) --- */}
        {step === 'otp' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-right">
               <button onClick={() => setStep('phone')} className="text-sm text-gray-400 flex items-center gap-1 hover:text-[#1A2A3A]">
                 <ArrowLeft size={14}/> ویرایش شماره
               </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
               <p className="text-sm text-gray-500 mb-2">کد ارسال شده به {phone}</p>
               <input 
                 type="text" 
                 maxLength={5}
                 value={otp}
                 onChange={(e) => setOtp(e.target.value)}
                 placeholder="- - - - -" 
                 className="w-full bg-transparent text-center text-3xl font-bold tracking-[1em] outline-none text-[#1A2A3A]"
                 autoFocus
               />
            </div>
            
            <button 
              onClick={verifyOtp}
              disabled={loading}
              className="w-full py-4 bg-[#D4AF37] text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin"/> : <>تایید و ورود <CheckCircle size={20}/></>}
            </button>

            <div className="text-sm text-gray-400">
              {timer > 0 ? (
                <span>ارسال مجدد کد تا {timer} ثانیه دیگر</span>
              ) : (
                <button onClick={sendOtp} className="text-[#D4AF37] font-bold hover:underline">ارسال مجدد کد</button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}