'use client';
import { Check, Star, Crown, Gift, Zap } from 'lucide-react';

interface Feature { text: string; included: boolean; }

interface ProductCardProps {
  title: string;
  pricePerMonth: string; // قیمت هر ماه
  totalPrice: string;    // قیمت کل دوره (مثلا برای ۶ ماه)
  billingText: string;   // متن توضیحی (مثلا: پرداخت هر ۶ ماه)
  features: Feature[];
  isRecommended?: boolean;
  isLuxury?: boolean;
  onSelect: () => void;
  actionLabel: string;
  popularLabel?: string;
  luxuryLabel?: string;
  points?: number;
  discountTag?: string;
}

export default function ProductCard({ 
  title, pricePerMonth, totalPrice, billingText, features, isRecommended, isLuxury, onSelect, actionLabel, popularLabel, luxuryLabel, points, discountTag
}: ProductCardProps) {
  return (
    <div className={`relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] ${isLuxury ? 'bg-vela-navy text-white shadow-2xl border border-vela-gold' : isRecommended ? 'bg-white shadow-xl border-2 border-vela-gold relative z-10' : 'bg-white/60 shadow-lg border border-white'}`}>
      
      {/* برچسب‌های بالای کارت */}
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-gold text-vela-navy px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap z-20">
          <Star size={14} fill="currentColor" />
          <span>{popularLabel || 'محبوب‌ترین'}</span>
        </div>
      )}

      {isLuxury && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vela-navy border border-vela-gold text-vela-gold px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1 whitespace-nowrap z-20">
          <Crown size={14} fill="currentColor" />
          <span>{luxuryLabel || 'لوکس'}</span>
        </div>
      )}

      {/* برچسب تخفیف */}
      {discountTag && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse shadow-sm">
          {discountTag}
        </div>
      )}

      <div className="text-center mb-6 mt-6">
        <h3 className="text-2xl font-serif font-bold mb-2 opacity-90">{title}</h3>
        
        {/* قیمت درشت (ماهانه) */}
        <div className="flex items-baseline justify-center gap-1">
            <div className="text-4xl font-bold font-sans tracking-tight">{pricePerMonth}</div>
            <div className="text-sm opacity-60 font-medium">/ mo</div>
        </div>
        
        {/* قیمت کل دوره (ریز) */}
        <div className="mt-2 text-sm font-bold bg-black/5 (isLuxury ? 'bg-white/10' : '') rounded-lg py-2 px-3 inline-block border border-black/5">
             Total: {totalPrice}
        </div>
        
        <div className="text-xs opacity-50 mt-1 font-sans">{billingText}</div>

        {/* امتیاز هوشمند */}
        {points && points > 0 ? (
            <div className="mt-3 flex items-center justify-center gap-1 text-vela-gold text-sm font-bold bg-vela-gold/10 py-1 px-3 rounded-full mx-auto w-fit">
                <Gift size={14} />
                <span>+{points} Pts</span>
            </div>
        ) : (
            <div className="mt-3 h-7"></div>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-grow px-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm">
            <div className={`mt-0.5 min-w-[18px] ${feature.included ? (isLuxury ? 'text-vela-gold' : 'text-green-500') : 'text-gray-300'}`}>
              <Check size={18} className={feature.included ? '' : 'opacity-0'} />
            </div>
            <span className={feature.included ? 'opacity-90 font-medium' : 'opacity-40 decoration-slice line-through'}>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2 ${isLuxury ? 'bg-gradient-to-r from-vela-gold to-[#dcb858] text-vela-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-vela-navy text-white hover:bg-vela-navy/90'}`}
      >
        <span>{actionLabel}</span>
      </button>
    </div>
  );
}