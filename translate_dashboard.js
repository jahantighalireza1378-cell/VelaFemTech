const fs = require('fs');
const path = require('path');

const dashboardContent = `'use client';
import { useState, useEffect } from 'react';
import { Music, AlertCircle, Package, Calendar } from 'lucide-react';

export default function UserDashboard() {
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    // هماهنگی مداوم با هدر برای تشخیص تغییر زبان
    const checkLang = () => {
      const saved = localStorage.getItem('vela-lang') || 'FA';
      if (saved !== lang) setLang(saved);
    };
    checkLang();
    const interval = setInterval(checkLang, 500);
    return () => clearInterval(interval);
  }, [lang]);

  // دیکشنری کلمات
  const t: any = {
    FA: {
      greeting: 'سلام، سارا ✨',
      daysTitle: '۵ روز مانده',
      daysSub: 'تا ارسال بسته بعدی (۲۴ بهمن)',
      sos: 'SOS',
      track: 'پیگیری',
      relax: 'اتاق آرامش',
      relaxSub: 'Relaxing Room'
    },
    EN: {
      greeting: 'Hello, Sara ✨',
      daysTitle: '5 Days Left',
      daysSub: 'Until next dispatch (Feb 13)',
      sos: 'SOS',
      track: 'Track Order',
      relax: 'Relaxing Room',
      relaxSub: 'Music & Meditation'
    },
    TR: {
      greeting: 'Merhaba, Sara ✨',
      daysTitle: '5 Gün Kaldı',
      daysSub: 'Sonraki pakete kadar (13 Şubat)',
      sos: 'SOS',
      track: 'Takip Et',
      relax: 'Rahatlama Odası',
      relaxSub: 'Müzik ve Meditasyon'
    }
  };

  const text = t[lang] || t.FA;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* خوش‌آمدگویی */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-serif text-vela-navy font-bold">{text.greeting}</h2>
      </div>

      {/* کارت اصلی وضعیت */}
      <div className="bg-vela-navy rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-vela-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <div>
            <h3 className="text-4xl font-bold mb-2 font-serif">{text.daysTitle}</h3>
            <p className="text-vela-marble/80">{text.daysSub}</p>
          </div>
          
          <div className="flex gap-3">
             <button className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2 transition-colors border border-red-500/30">
                <AlertCircle size={18} />
                <span className="font-bold">{text.sos}</span>
             </button>
             <button className="bg-vela-gold text-vela-navy px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg flex items-center gap-2">
                <Package size={18} />
                <span>{text.track}</span>
             </button>
          </div>
        </div>
      </div>

      {/* بخش‌های جانبی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 cursor-pointer hover:bg-white transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Music size={24} />
          </div>
          <div>
            <h4 className="font-bold text-vela-navy">{text.relax}</h4>
            <p className="text-sm text-gray-500">{text.relaxSub}</p>
          </div>
        </div>
      </div>

    </div>
  );
}`;

const targetPath = path.join(__dirname, 'src/components/dashboard/UserDashboard.tsx');
// ساخت پوشه اگر نباشد
const dir = path.dirname(targetPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(targetPath, dashboardContent);
console.log("✅ داشبورد چندزبانه شد!");