import Link from "next/link";
import { ArrowRight, Gift, Package, ShieldCheck, Heart, Droplets, Clock, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (بخش اصلی بالا) */}
      <section className="relative px-6 py-16 md:py-24 text-center max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
          ✨ New Collection 2026
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2A3A] mb-6 leading-tight">
          Sail Through It<span className="text-[#D4AF37]">.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          تجربه پریودی راحت، لوکس و بی‌دغدغه با پکیج‌های اختصاصی VELA.
          <br className="hidden md:block"/>
          ما به تمام جزئیات فکر کرده‌ایم تا شما آسوده باشید.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
          <Link 
            href="/box-builder" 
            className="w-full md:w-auto bg-[#1A2A3A] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#2a4a6a] transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            ساخت باکس شخصی
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            href="/gift" 
            className="w-full md:w-auto bg-white border-2 border-[#1A2A3A]/10 text-[#1A2A3A] px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Gift size={20} />
            هدیه به دوست
          </Link>
        </div>
      </section>

      {/* 2. Features Section (ویژگی‌ها) */}
      <section className="bg-white py-16 px-6 border-y border-[#1A2A3A]/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="text-center p-6 hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">ارسال خودکار ماهانه</h3>
                <p className="text-gray-500">
                    باکس شما همیشه ۳ روز قبل از شروع چرخه به دستتان می‌رسد. دقیق و منظم.
                </p>
            </div>

            <div className="text-center p-6 hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">محصولات ارگانیک</h3>
                <p className="text-gray-500">
                    استفاده از پدهای نخی، ضدحساسیت و برندهای برتر جهانی برای سلامت شما.
                </p>
            </div>

            <div className="text-center p-6 hover:-translate-y-2 transition duration-300">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">خودمراقبتی (Self-Care)</h3>
                <p className="text-gray-500">
                    همراه با شکلات، دمنوش‌های آرام‌بخش و هدیه‌های کوچک برای حال خوب شما.
                </p>
            </div>

        </div>
      </section>

      {/* 3. Product Preview (بخش محصولات - اضافه شد) */}
      <section className="py-20 px-6 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A2A3A] mb-4">پکیج‌های محبوب VELA</h2>
                <p className="text-gray-600">یکی از باکس‌های آماده ما را انتخاب کنید یا خودتان بسازید.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Card 1 */}
                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition group relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-white px-4 py-1 rounded-bl-2xl text-sm font-bold">پرفروش‌ترین</div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-2">باکس اقتصادی (Eco)</h3>
                    <p className="text-gray-500 mb-6">شامل پد روزانه، پد شبانه و شکلات تلخ</p>
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-2xl font-bold text-[#1A2A3A]">299 TL<span className="text-sm text-gray-400 font-normal">/ماه</span></span>
                        <Link href="/products" className="w-12 h-12 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center group-hover:bg-[#D4AF37] transition">
                            <ArrowRight size={20}/>
                        </Link>
                    </div>
                </div>

                {/* Product Card 2 */}
                <div className="bg-[#1A2A3A] text-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition group relative overflow-hidden">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">باکس پریمیوم (Luxe)</h3>
                    <p className="text-gray-400 mb-6">پکیج کامل شامل دمنوش، کیسه آب گرم، شمع و محصولات بهداشتی</p>
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-2xl font-bold text-white">599 TL<span className="text-sm text-gray-400 font-normal">/ماه</span></span>
                        <Link href="/products" className="w-12 h-12 rounded-full bg-white text-[#1A2A3A] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition">
                            <ArrowRight size={20}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. Steps Section (مراحل کار - اضافه شد) */}
      <section className="py-20 px-6 bg-white">
         <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-12">چطور کار می‌کند؟</h2>
             <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                 {/* خط اتصال (فقط دسکتاپ) */}
                 <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
                 
                 <div className="bg-white p-4">
                     <div className="w-16 h-16 bg-[#1A2A3A] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                     <h4 className="font-bold">انتخاب محصولات</h4>
                 </div>
                 <div className="bg-white p-4">
                     <div className="w-16 h-16 bg-[#1A2A3A] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                     <h4 className="font-bold">تنظیم تاریخ پریود</h4>
                 </div>
                 <div className="bg-white p-4">
                     <div className="w-16 h-16 bg-[#1A2A3A] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                     <h4 className="font-bold">دریافت درب منزل</h4>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
}