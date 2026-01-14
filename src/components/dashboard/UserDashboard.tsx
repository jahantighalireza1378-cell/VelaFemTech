'use client';
import { useState, useEffect } from 'react';
import { Music, AlertCircle, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [lang, setLang] = useState('FA');

  useEffect(() => {
    // لود اولیه
    setLang(localStorage.getItem('vela-lang') || 'FA');
    // شنیدن تغییر زبان
    const handleLangChange = () => setLang(localStorage.getItem('vela-lang') || 'FA');
    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t: any = {
    FA: { greeting: 'سلام، سارا ✨', daysTitle: '۵ روز مانده', daysSub: 'تا ارسال بسته بعدی', sos: 'SOS', track: 'پیگیری', relax: 'اتاق آرامش', relaxSub: 'Relaxing Room' },
    EN: { greeting: 'Hello, Sara ✨', daysTitle: '5 Days Left', daysSub: 'Until next dispatch', sos: 'SOS', track: 'Track Order', relax: 'Relaxing Room', relaxSub: 'Music & Meditation' },
    TR: { greeting: 'Merhaba, Sara ✨', daysTitle: '5 Gün Kaldı', daysSub: 'Sonraki pakete kadar', sos: 'SOS', track: 'Takip Et', relax: 'Rahatlama Odası', relaxSub: 'Müzik ve Meditasyon' },
    RU: { greeting: 'Привет, Сара ✨', daysTitle: 'Осталось 5 дней', daysSub: 'До следующей отправки', sos: 'SOS', track: 'Отследить', relax: 'Комната отдыха', relaxSub: 'Музыка и медитация' }
  };

  const text = t[lang] || t.FA;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-serif text-vela-navy font-bold">{text.greeting}</h2>
      </div>
      <div className="bg-vela-navy rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-vela-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
          <div>
            <h3 className="text-4xl font-bold mb-2 font-serif">{text.daysTitle}</h3>
            <p className="text-vela-marble/80">{text.daysSub}</p>
          </div>
          <div className="flex gap-3">
             {/* دکمه SOS فعال شد */}
             <button 
                onClick={() => router.push('/sos')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-2 transition-colors border border-red-500/30 active:scale-95"
             >
                <AlertCircle size={18} /><span className="font-bold">{text.sos}</span>
             </button>
             {/* دکمه پیگیری فعال شد */}
             <button 
                onClick={() => router.push('/tracking')}
                className="bg-vela-gold text-vela-navy px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg flex items-center gap-2 active:scale-95"
             >
                <Package size={18} /><span>{text.track}</span>
             </button>
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4 cursor-pointer hover:bg-white transition-all">
        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Music size={24} /></div>
        <div><h4 className="font-bold text-vela-navy">{text.relax}</h4><p className="text-sm text-gray-500">{text.relaxSub}</p></div>
      </div>
    </div>
  );
}