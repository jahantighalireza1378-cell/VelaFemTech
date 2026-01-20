import Link from "next/link";
import { ArrowRight, Gift, Package, ShieldCheck, Heart } from "lucide-react";

// نکته مهم: اینجا دیگر Header را ایمپورت نمی‌کنیم چون در layout.tsx هست

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
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

      {/* Features Section (Benefits) */}
      <section className="bg-white py-16 px-6 border-y border-[#1A2A3A]/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Feature 1 */}
            <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <Package size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">ارسال خودکار ماهانه</h3>
                <p className="text-gray-500">
                    دیگر نگران تمام شدن پد نباشید. باکس شما هر ماه دقیقاً سر وقت می‌رسد.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">کیفیت تضمین شده</h3>
                <p className="text-gray-500">
                    استفاده از بهترین برندهای بهداشتی و محصولات ارگانیک و ضدحساسیت.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A3A] mb-2">مراقبت فراتر از نیاز</h3>
                <p className="text-gray-500">
                    همراه با شکلات، دمنوش و اکسسوری‌هایی که حال شما را خوب می‌کنند.
                </p>
            </div>

        </div>
      </section>

    </div>
  );
}