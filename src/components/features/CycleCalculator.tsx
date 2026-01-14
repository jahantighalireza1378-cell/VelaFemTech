'use client';
import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props { language?: string; onDateSelected?: (dates: any) => void; }

export default function CycleCalculator({ language = 'FA', onDateSelected }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const t: any = {
    FA: { label: 'تاریخ آخرین پریود؟', btn: 'تنظیم برنامه' },
    EN: { label: 'Last Period Date?', btn: 'Set Schedule' },
    TR: { label: 'Son Regl Tarihi?', btn: 'Programı Ayarla' },
    RU: { label: 'Дата последних месячных?', btn: 'Создать расписание' }
  };
  const text = t[language] || t.FA;

  const calculateDates = () => {
    if (!selectedDate) return;
    const start = new Date(selectedDate);
    const nextPeriod = new Date(start); nextPeriod.setDate(start.getDate() + 28);
    const dispatch = new Date(nextPeriod); dispatch.setDate(nextPeriod.getDate() - 5);
    if (onDateSelected) onDateSelected({ startDate: start, nextPeriodDate: nextPeriod, dispatchDate: dispatch });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 border border-vela-gold/10 mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <label className="block text-vela-navy font-bold text-lg mb-4">{text.label}</label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-3.5 text-vela-gold" size={20} />
            <input type="date" className="w-full px-12 py-3 rounded-xl border border-gray-200 focus:border-vela-gold outline-none text-center bg-gray-50/50" onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
        </div>
        <button onClick={calculateDates} disabled={!selectedDate} className="w-full py-4 bg-vela-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-vela-navy/90 transition-all disabled:opacity-50 group">
          <span>{text.btn}</span>
          <ArrowRight size={18} className={`transition-transform ${language === 'FA' ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}