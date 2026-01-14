'use client';
import { useState } from 'react';
import { Leaf, Check } from 'lucide-react';

interface Props {
  language: string;
  onToggle: (isActive: boolean) => void;
}

export default function EcoToggle({ language = 'FA', onToggle }: Props) {
  const [isActive, setIsActive] = useState(false);

  const t: any = {
    FA: { title: 'دوستدار طبیعت', desc: 'با انتخاب بسته‌بندی بازیافتی، ۵۰ امتیاز بگیرید.', label: 'بله، اکو' },
    EN: { title: 'Eco Friendly', desc: 'Choose recyclable packaging to earn 50 points.', label: 'Yes, Eco' },
    TR: { title: 'Doğa Dostu', desc: 'Geri dönüştürülebilir paket seçerek 50 puan kazan.', label: 'Evet, Eko' },
    RU: { title: 'Эко-выбор', desc: 'Выберите эко-упаковку и получите 50 баллов.', label: 'Да, Эко' }
  };

  const text = t[language] || t.FA;

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };

  return (
    <div 
      onClick={handleToggle}
      className={`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer p-6 ${isActive ? 'bg-vela-eco/10 border-vela-eco' : 'bg-gray-50 border-dashed border-gray-300 hover:border-vela-eco/50'}`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-vela-eco text-white' : 'bg-gray-200 text-gray-400'}`}>
            <Leaf size={24} />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isActive ? 'text-vela-navy' : 'text-gray-500'}`}>{text.title}</h3>
            <p className="text-sm text-gray-400 max-w-[200px] md:max-w-xs">{text.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold transition-colors ${isActive ? 'text-vela-eco' : 'text-gray-400'}`}>{text.label}</span>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-vela-eco' : 'bg-gray-300'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isActive ? 'left-7' : 'left-1'}`}></div>
          </div>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute top-2 left-2 text-vela-eco animate-scale-in">
          <Check size={16} />
        </div>
      )}
    </div>
  );
}