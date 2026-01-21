import Link from "next/link";
import { ArrowRight, Gift, Package, ShieldCheck, Heart, Clock, Star, Droplets } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (بخش اصلی بالا) */}
      <section className="relative px-6 py-20 md:py-32 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        {/* بج (Badge) */}
        <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-6 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up border border-[#D4AF37]/20">
          ✨ تجربه جدید پریود با VELA
        </div>

        {/* تیتر اصلی */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2A3A] mb-8 leading-tight">
          Sail Through It<span className="text-[#D4AF37]">.</span>
        </h1>

        {/* زیرتیتر */}
        <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          ما پریود را متوقف نمی‌کنیم، اما تجربه آن را تغییر می‌دهیم.
          <br className="hidden md:block"/>
          پکیج‌های شخصی‌سازی شده، محصولات ارگانیک و مراقبت‌هایی که شایسته آن هستید.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full max-w-md mx-auto">
          <Link 
            href="/box-builder" 
            className="w-full md:w-auto bg-[#1A2A3A] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#2a4a6a] transition flex items-center justify-center gap-2 shadow-lg shadow-[#1A2A3A]/20"
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

      {/* 2. Features Section (ویژگی‌ها - آیکون‌ها) */}
      <section className="bg-white py-20 px-6 border-y border-[#1A2A3A]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center p-8 rounded-3xl hover:bg-[#F9F7F2] transition duration-300">
                <div className="w-20 h-20 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-inner">
                    <Clock size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2A3A] mb-3">ارسال دقیق و خودکار</h3>
                <p className="text-gray-500 leading-relaxed">
                    هوش مصنوعی ما چرخه شما را یاد می‌گیرد و باکس را دقیقاً ۳ روز قبل از شروع پریود به دستتان می‌رساند.
                </p>
            </div>

            <div className="text-center p-8 rounded-3xl hover:bg-[#F9F7F2] transition duration-300">
                <div className="w-20 h-20 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-inner">
                    <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2A3A] mb-3">محصولات سلامت‌محور</h3>
                <p className="text-gray-500 leading-relaxed">
                    پدهای نخی، تامپون‌های ارگانیک و محصولات بدون مواد شیمیایی مضر. سلامتی شما اولویت ماست.
                </p>
            </div>

            <div className="text-center p-8 rounded-3xl hover:bg-[#F9F7F2] transition duration-300">
                <div className="w-20 h-20 bg-[#F9F7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-inner">
                    <Heart size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2A3A] mb-3">بیشتر از یک پد</h3>
                <p className="text-gray-500 leading-relaxed">
                    شکلات‌های دست‌ساز، دمنوش‌های ضد درد و هدیه‌هایی که حال روحی شما را در دوران سخت خوب می‌کنند.
                </p>
            </div>

        </div>
      </section>

      {/* 3. Products Preview (بخش محصولات) */}
      <section className="py-24 px-6 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-4">پکیج‌های محبوب VELA</h2>
                <p className="text-xl text-gray-600">انتخاب کنید، شخصی‌سازی کنید و لذت ببرید.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Card 1: ECO */}
                <div className="bg-white rounded-[2rem] p-10 shadow-sm hover:shadow-2xl transition duration-500 group relative overflow-hidden border border-gray-100">
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-white px-6 py-2 rounded-bl-2xl text-sm font-bold shadow-lg">پرفروش‌ترین</div>
                    <div className="mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-[#1A2A3A]">
                        <Droplets size={32}/>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2">VELA Essential</h3>
                    <p className="text-gray-500 mb-8 text-lg">باکس ضروری شامل پد روزانه، شبانه و شکلات تلخ برای رفع هوس‌های دوره.</p>
                    
                    <ul className="space-y-3 mb-8 text-gray-600">
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> ۱۰ عدد پد روزانه بالدار</li>
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> ۵ عدد پد شبانه ویژه</li>
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> بسته شکلات دارک ۸۰٪</li>
                    </ul>

                    <div className="flex justify-between items-end mt-auto pt-6 border-t border-gray-100">
                        <div>
                            <span className="text-3xl font-bold text-[#1A2A3A]">299 TL</span>
                            <span className="text-sm text-gray-400 font-normal"> / ماهانه</span>
                        </div>
                        <Link href="/products" className="px-6 py-3 rounded-xl bg-[#1A2A3A] text-white flex items-center gap-2 group-hover:bg-[#D4AF37] transition font-medium">
                            مشاهده و خرید <ArrowRight size={18}/>
                        </Link>
                    </div>
                </div>

                {/* Product Card 2: LUXE */}
                <div className="bg-[#1A2A3A] text-white rounded-[2rem] p-10 shadow-xl hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                    <div className="mb-6 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#D4AF37]">
                        <Package size={32}/>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">VELA Premium Luxe</h3>
                    <p className="text-gray-300 mb-8 text-lg">تجربه اسپا در خانه. کامل‌ترین پکیج برای مراقبت جسمی و روحی.</p>
                    
                    <ul className="space-y-3 mb-8 text-gray-300">
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> تمام محتویات باکس Essential</li>
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> دمنوش‌های گیاهی آرام‌بخش</li>
                        <li className="flex gap-2"><Star size={18} className="text-[#D4AF37]"/> کیسه آب گرم / شمع معطر / نمک حمام</li>
                    </ul>

                    <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/10">
                        <div>
                            <span className="text-3xl font-bold text-white">599 TL</span>
                            <span className="text-sm text-gray-400 font-normal"> / ماهانه</span>
                        </div>
                        <Link href="/products" className="px-6 py-3 rounded-xl bg-white text-[#1A2A3A] flex items-center gap-2 group-hover:bg-[#D4AF37] group-hover:text-white transition font-medium">
                            مشاهده و خرید <ArrowRight size={18}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. Steps Section (مراحل کار) */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-5xl mx-auto text-center">
             <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-16">چطور کار می‌کند؟</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                 {/* خط اتصال (فقط دسکتاپ) */}
                 <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10 transform scale-x-75"></div>
                 
                 <div className="bg-white p-6 relative">
                     <div className="w-24 h-24 bg-[#1A2A3A] text-white rounded-3xl flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-6 shadow-xl shadow-[#1A2A3A]/20">1</div>
                     <h4 className="text-xl font-bold mb-2">انتخاب محصولات</h4>
                     <p className="text-gray-500">پدهای مورد علاقه و محصولات مراقبتی خود را انتخاب کنید.</p>
                 </div>
                 
                 <div className="bg-white p-6 relative">
                     <div className="w-24 h-24 bg-[#D4AF37] text-white rounded-3xl flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-6 shadow-xl shadow-[#D4AF37]/20">2</div>
                     <h4 className="text-xl font-bold mb-2">تنظیم تاریخ</h4>
                     <p className="text-gray-500">تاریخ آخرین پریود خود را وارد کنید تا ما زمان ارسال را تنظیم کنیم.</p>
                 </div>
                 
                 <div className="bg-white p-6 relative">
                     <div className="w-24 h-24 bg-[#1A2A3A] text-white rounded-3xl flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-6 shadow-xl shadow-[#1A2A3A]/20">3</div>
                     <h4 className="text-xl font-bold mb-2">تحویل درب منزل</h4>
                     <p className="text-gray-500">باکس شما، بسته‌بندی شده و محرمانه، هر ماه به دستتان می‌رسد.</p>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
}