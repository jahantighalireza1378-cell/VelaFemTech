'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Settings } from "lucide-react";

export default function Dashboard() {
  const { user, isLoaded } = useUser(); // گرفتن اطلاعات واقعی کاربر
  
  // متغیرهای تاریخ و محاسبات
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [daysRemaining, setDaysRemaining] = useState(0);

  // ۱. خواندن اطلاعات ذخیره شده قبلی (اگر باشد)
  useEffect(() => {
    const savedDate = localStorage.getItem('vela-last-period');
    const savedCycle = localStorage.getItem('vela-cycle-length');
    
    if (savedDate) setLastPeriod(savedDate);
    if (savedCycle) setCycleLength(parseInt(savedCycle));
    
    // اگر تاریخی نبود، تاریخ امروز را پیش‌فرض بگذار
    if (!savedDate) {
        const today = new Date().toISOString().split('T')[0];
        setLastPeriod(today);
    }
  }, []);

  // ۲. محاسبه هوشمند روزهای باقی‌مانده هر بار که تاریخ عوض شود
  useEffect(() => {
    if (!lastPeriod) return;

    const lastDate = new Date(lastPeriod);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);
    
    const today = new Date();
    // محاسبه اختلاف زمانی
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysRemaining(diffDays > 0 ? diffDays : 0);

    // ذخیره در حافظه که با رفرش نپرد
    localStorage.setItem('vela-last-period', lastPeriod);
    localStorage.setItem('vela-cycle-length', cycleLength.toString());

  }, [lastPeriod, cycleLength]);

  if (!isLoaded) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      
      {/* هدر داشبورد با نام واقعی کاربر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#1A2A3A]">
             Hi, {user?.firstName || 'Friend'} 👋
          </h1>
          <p className="text-gray-500 mt-2">Here is your cycle summary</p>
        </div>
      </div>

      {/* کارت اصلی */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#D4AF37]/20 mb-8">
        
        {/* اصلاح چیدمان: در موبایل ستونی (flex-col) و در دسکتاپ ردیفی (md:flex-row) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* دایره روز شمار */}
          <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
             <div className="absolute inset-0 border-4 border-[#F9F7F2] rounded-full"></div>
             {/* چرخش دایره بر اساس روزهای مانده */}
             <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full border-t-transparent animate-spin-slow"></div>
             <div className="text-center">
                <span className="block text-5xl font-bold text-[#1A2A3A]">{daysRemaining}</span>
                <span className="text-sm text-gray-500 font-medium">Days Left</span>
             </div>
          </div>

          {/* فرم تنظیم تاریخ (اصلاح شده برای موبایل) */}
          <div className="w-full bg-[#F9F7F2] p-6 rounded-2xl">
             <h3 className="text-lg font-bold text-[#1A2A3A] mb-4 flex items-center gap-2">
                <Settings size={18} className="text-[#D4AF37]"/>
                Cycle Settings
             </h3>
             
             <div className="flex flex-col gap-4">
                
                {/* ورودی تاریخ */}
                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 text-sm font-medium">Last Period Start Date:</label>
                    <input 
                      type="date" 
                      value={lastPeriod}
                      onChange={(e) => setLastPeriod(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-[#D4AF37] transition-colors text-lg"
                    />
                </div>

                {/* دکمه (تزئینی برای حال حاضر) */}
                <div className="bg-blue-50/50 p-3 rounded-lg text-sm text-[#1A2A3A]/70 text-center border border-blue-100">
                    Auto-calculated based on {cycleLength} days cycle.
                </div>

             </div>
          </div>

        </div>
      </div>

      {/* باکس وضعیت اشتراک */}
      <div className="bg-[#1A2A3A] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full blur-[60px] opacity-20"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h2 className="text-2xl font-serif mb-2">My VELA Box</h2>
               <p className="text-gray-400">Your next box is being prepared.</p>
            </div>
            <button className="w-full md:w-auto bg-[#D4AF37] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b5952f] transition shadow-lg shadow-[#D4AF37]/20">
               Manage Subscription
            </button>
         </div>
      </div>

    </div>
  );
}