import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Check, Star, MapPin, Phone, Mail, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (بخش اصلی بالا) */}
      <section className="relative px-6 py-20 md:py-32 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-6 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up border border-[#D4AF37]/20">
          ✨ تجربه جدید پریود با VELA
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A2A3A] mb-8 leading-tight">
          Sail Through It<span className="text-[#D4AF37]">.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          ما پریود را متوقف نمی‌کنیم، اما تجربه آن را تغییر می‌دهیم.
          <br className="hidden md:block"/>
          پکیج‌های شخصی‌سازی شده، محصولات ارگانیک و مراقبت‌هایی که شایسته آن هستید.
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full max-w-md mx-auto">
          <Link href="/box-builder" className="w-full md:w-auto bg-[#1A2A3A] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#2a4a6a] transition flex items-center justify-center gap-2 shadow-lg shadow-[#1A2A3A]/20">
            شروع کنید <ArrowRight size={20} />
          </Link>
          <Link href="/gift" className="w-full md:w-auto bg-white border-2 border-[#1A2A3A]/10 text-[#1A2A3A] px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Gift size={20} /> هدیه به دوست
          </Link>
        </div>
      </section>

      {/* بخش وسط (ویژگی‌ها) حذف شد ❌ */}

      {/* 2. Products Preview (سه محصول با لینک اصلاح شده) */}
      <section className="py-24 px-6 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-4">پکیج‌های VELA</h2>
                <p className="text-xl text-gray-600">انتخاب کنید کدام سطح از مراقبت را نیاز دارید.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                
                {/* 1. ESSENTIAL Box (ECO) - 380 TL */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition duration-500 group border border-gray-100 flex flex-col h-full">
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-100">
                        <Image src="/images/essential.jpg" alt="VELA Essential Box" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-2 text-center">Essential</h3>
                    <p className="text-[#D4AF37] font-bold text-sm text-center mb-4 uppercase tracking-wider">بسته اقتصادی (ECO)</p>
                    <p className="text-gray-500 mb-6 text-sm text-center leading-relaxed">پکیج ضروری و مینیمال. شامل تمام نیازهای اولیه بهداشتی با کیفیت عالی.</p>
                    
                    <ul className="space-y-3 mb-8 text-gray-600 flex-grow px-4">
                        <li className="flex gap-3 text-sm items-center"><Check size={16} className="text-[#D4AF37]"/> ۱۰ عدد پد روزانه بالدار</li>
                        <li className="flex gap-3 text-sm items-center"><Check size={16} className="text-[#D4AF37]"/> ۵ عدد پد شبانه ویژه</li>
                        <li className="flex gap-3 text-sm items-center"><Check size={16} className="text-[#D4AF37]"/> تامپون ارگانیک (اختیاری)</li>
                    </ul>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <div className="text-3xl font-bold text-[#1A2A3A] mb-4">380 TL</div>
                        {/* لینک اصلاح شد: به باکس بیلدر می‌رود تا ارور ندهد */}
                        <Link href="/box-builder" className="block w-full py-3 rounded-xl border-2 border-[#1A2A3A] text-[#1A2A3A] font-bold hover:bg-[#1A2A3A] hover:text-white transition">
                            انتخاب Essential
                        </Link>
                    </div>
                </div>

                {/* 2. CARE Box (BEST SELLER) - 680 TL */}
                <div className="bg-white rounded-[2rem] p-6 shadow-2xl transition duration-500 group border-2 border-[#D4AF37] flex flex-col h-full transform md:-translate-y-8 z-10 relative">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg tracking-wide uppercase">
                        محبوب‌ترین
                    </div>
                    
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-100 mt-4">
                        <Image src="/images/care.jpg" alt="VELA Care Box" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2 text-center">Care</h3>
                    <p className="text-[#D4AF37] font-bold text-sm text-center mb-4 uppercase tracking-wider">پرفروش‌ترین (Best Seller)</p>
                    <p className="text-gray-500 mb-6 text-sm text-center leading-relaxed">تعادل کامل بین بهداشت و مراقبت. برای روزهایی که نیاز به حمایت بیشتری دارید.</p>
                    
                    <ul className="space-y-3 mb-8 text-gray-700 flex-grow px-4">
                        <li className="flex gap-3 text-sm items-center font-medium"><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/> تمام محتویات بسته Essential</li>
                        <li className="flex gap-3 text-sm items-center font-medium"><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/> دمنوش‌های گیاهی آرام‌بخش</li>
                        <li className="flex gap-3 text-sm items-center font-medium"><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/> پچ حرارتی ضد درد (Heat Patch)</li>
                        <li className="flex gap-3 text-sm items-center font-medium"><Star size={16} className="text-[#D4AF37] fill-[#D4AF37]"/> شکلات تلخ و قرص مسکن</li>
                    </ul>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <div className="text-3xl font-bold text-[#1A2A3A] mb-4">680 TL</div>
                        {/* لینک اصلاح شد */}
                        <Link href="/box-builder" className="block w-full py-4 rounded-xl bg-[#D4AF37] text-white font-bold hover:bg-[#b5952f] transition shadow-lg shadow-[#D4AF37]/30">
                            انتخاب Care
                        </Link>
                    </div>
                </div>

                {/* 3. BLISS Box (LUXURY) - 1350 TL */}
                <div className="bg-[#1A2A3A] text-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition duration-500 group border border-[#1A2A3A] flex flex-col h-full">
                    <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gray-800">
                        <Image src="/images/bliss.jpg" alt="VELA Bliss Box" fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-2 text-center">Bliss</h3>
                    <p className="text-[#D4AF37] font-bold text-sm text-center mb-4 uppercase tracking-wider">لوکس و کامل (Luxury)</p>
                    <p className="text-gray-300 mb-6 text-sm text-center leading-relaxed">تجربه اسپا در خانه. نهایت آرامش و ناز کشیدن از خودتان در دوران سخت.</p>
                    
                    <ul className="space-y-3 mb-8 text-gray-300 flex-grow px-4">
                        <li className="flex gap-3 text-sm items-center"><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> تمام محتویات بسته Care</li>
                        <li className="flex gap-3 text-sm items-center"><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> شمع معطر دست‌ساز</li>
                        <li className="flex gap-3 text-sm items-center"><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> کارت‌های حال خوب (Mood Cards)</li>
                        <li className="flex gap-3 text-sm items-center"><span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> رولر صورت یشمی (Jade Roller)</li>
                    </ul>
                    
                    <div className="mt-auto pt-6 border-t border-gray-700 text-center">
                        <div className="text-3xl font-bold text-white mb-4">1350 TL</div>
                        {/* لینک اصلاح شد */}
                        <Link href="/box-builder" className="block w-full py-3 rounded-xl bg-white text-[#1A2A3A] font-bold hover:bg-[#D4AF37] hover:text-white transition">
                            انتخاب Bliss
                        </Link>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 3. Contact & Info Section (اطلاعات تماس و لوکیشن - اضافه شد) */}
      <section className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                
                {/* Contact Info */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-12 h-12 bg-[#F9F7F2] rounded-full flex items-center justify-center text-[#1A2A3A] mb-4">
                        <Phone size={24}/>
                    </div>
                    <h4 className="text-lg font-bold text-[#1A2A3A] mb-2">تماس با ما</h4>
                    <p className="text-gray-500" dir="ltr">+90 545 199 39 96</p>
                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                        <Mail size={16}/>
                        <span>support@velafemtech.com</span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-12 h-12 bg-[#F9F7F2] rounded-full flex items-center justify-center text-[#1A2A3A] mb-4">
                        <MapPin size={24}/>
                    </div>
                    <h4 className="text-lg font-bold text-[#1A2A3A] mb-2">دفتر مرکزی</h4>
                    <p className="text-gray-500">Istanbul, Turkey</p>
                    <p className="text-gray-500 text-sm mt-1">Maslak, Büyükdere Cd. No:23</p>
                </div>

                {/* Legal Info */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="w-12 h-12 bg-[#F9F7F2] rounded-full flex items-center justify-center text-[#1A2A3A] mb-4">
                        <FileText size={24}/>
                    </div>
                    <h4 className="text-lg font-bold text-[#1A2A3A] mb-2">اطلاعات حقوقی</h4>
                    <p className="text-gray-500">VELA FemTech Inc.</p>
                    <p className="text-gray-500 text-sm mt-1">Reg No: 8821-3342-TR</p>
                    <p className="text-[#D4AF37] text-sm mt-2 font-medium">تمامی حقوق محفوظ است © ۲۰۲۶</p>
                </div>

            </div>
        </div>
      </section>

    </div>
  );
}