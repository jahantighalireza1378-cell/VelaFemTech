'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Calendar, Package } from 'lucide-react';
import Link from 'next/link';

// نکته مهم: هدر را ایمپورت نمی‌کنیم تا دوتا نشود (از layout می‌خواند)

export default function BoxBuilder() {
  const [step, setStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [lastPeriod, setLastPeriod] = useState('');
  const [lang, setLang] = useState('EN'); // پیش‌فرض انگلیسی

  // دیکشنری کامل ۴ زبانه
  const content: any = {
    EN: {
      title: "Build Your VELA Box",
      step1: "Select Box",
      step2: "Set Date",
      step3: "Confirm",
      
      box1Name: "Essential",
      box1Tag: "ECO",
      box2Name: "Care",
      box2Tag: "BEST SELLER",
      box3Name: "Bliss",
      box3Tag: "LUXURY",

      dateTitle: "Last Period Date",
      dateDesc: "Enter the start date of your last cycle for smart scheduling.",
      dateLabel: "Start Date:",

      successTitle: "All Set!",
      successDesc: "Your box is ready to be scheduled.",
      successNote: "Subscription renews monthly. Cancel anytime.",

      btnBack: "Back",
      btnCancel: "Cancel",
      btnNext: "Next Step",
      btnFinish: "Checkout",
    },
    FA: {
      title: "ساخت باکس VELA",
      step1: "انتخاب باکس",
      step2: "تنظیم تاریخ",
      step3: "تایید نهایی",
      
      box1Name: "Essential",
      box1Tag: "اقتصادی",
      box2Name: "Care",
      box2Tag: "محبوب‌ترین",
      box3Name: "Bliss",
      box3Tag: "لوکس",

      dateTitle: "تاریخ آخرین پریود",
      dateDesc: "برای تنظیم زمان ارسال دقیق، تاریخ شروع آخرین دوره خود را وارد کنید.",
      dateLabel: "تاریخ شروع:",

      successTitle: "همه چیز آماده است!",
      successDesc: "باکس شما برای زمان‌بندی آماده شد.",
      successNote: "تمدید ماهانه خودکار. قابلیت لغو در هر زمان.",

      btnBack: "بازگشت",
      btnCancel: "انصراف",
      btnNext: "مرحله بعد",
      btnFinish: "پرداخت و تکمیل",
    },
    TR: {
      title: "VELA Kutunu Oluştur",
      step1: "Kutu Seç",
      step2: "Tarih Seç",
      step3: "Onayla",
      
      box1Name: "Essential",
      box1Tag: "EKONOMİK",
      box2Name: "Care",
      box2Tag: "ÇOK SATAN",
      box3Name: "Bliss",
      box3Tag: "LÜKS",

      dateTitle: "Son Regl Tarihi",
      dateDesc: "Akıllı zamanlama için son döngünüzün başlangıç tarihini girin.",
      dateLabel: "Başlangıç Tarihi:",

      successTitle: "Her Şey Hazır!",
      successDesc: "Kutunuz planlanmak üzere hazır.",
      successNote: "Aylık otomatik yenilenir. İstediğiniz zaman iptal edin.",

      btnBack: "Geri",
      btnCancel: "İptal",
      btnNext: "Sonraki Adım",
      btnFinish: "Ödeme Yap",
    },
    RU: {
      title: "Соберите свой бокс VELA",
      step1: "Выбор бокса",
      step2: "Дата",
      step3: "Подтверждение",
      
      box1Name: "Essential",
      box1Tag: "ЭКОНОМ",
      box2Name: "Care",
      box2Tag: "ХИТ",
      box3Name: "Bliss",
      box3Tag: "LUXURY",

      dateTitle: "Дата последних месячных",
      dateDesc: "Введите дату начала последнего цикла для точного графика.",
      dateLabel: "Дата начала:",

      successTitle: "Все готово!",
      successDesc: "Ваш бокс готов к отправке по графику.",
      successNote: "Ежемесячное продление. Отмена в любое время.",

      btnBack: "Назад",
      btnCancel: "Отмена",
      btnNext: "Далее",
      btnFinish: "Оформить",
    }
  };

  // مدیریت تغییر زبان هوشمند
  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);

    const handleLangChange = () => {
       const newLang = localStorage.getItem('vela-lang');
       if (newLang) setLang(newLang);
    };

    window.addEventListener('vela-language-change', handleLangChange);
    return () => window.removeEventListener('vela-language-change', handleLangChange);
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  // دیتای محصولات (همسان با دیکشنری)
  const boxes = [
    { id: 'essential', name: t.box1Name, price: '380 TL', tag: t.box1Tag, img: '/images/essential.jpg' },
    { id: 'care', name: t.box2Name, price: '680 TL', tag: t.box2Tag, img: '/images/care.jpg' },
    { id: 'bliss', name: t.box3Name, price: '1350 TL', tag: t.box3Tag, img: '/images/bliss.jpg' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-10 px-6 pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        {/* نوار پیشرفت مراحل */}
        <div className="flex justify-between items-center mb-12 px-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
            
            <div className="flex flex-col items-center gap-2 bg-[#F9F7F2] px-2 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= 1 ? 'bg-[#1A2A3A] text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className="text-xs font-bold text-gray-500">{t.step1}</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-[#F9F7F2] px-2 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= 2 ? 'bg-[#1A2A3A] text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className="text-xs font-bold text-gray-500">{t.step2}</span>
            </div>

            <div className="flex flex-col items-center gap-2 bg-[#F9F7F2] px-2 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= 3 ? 'bg-[#1A2A3A] text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <span className="text-xs font-bold text-gray-500">{t.step3}</span>
            </div>
        </div>

        {/* کارت اصلی محتوا */}
        <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[500px] flex flex-col justify-between">
            
            {/* --- مرحله ۱: انتخاب باکس --- */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-8 text-center">{t.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {boxes.map((box) => (
                            <div 
                                key={box.id}
                                onClick={() => setSelectedBox(box.id)}
                                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all hover:shadow-xl hover:scale-[1.02] ${selectedBox === box.id ? 'border-[#D4AF37] bg-yellow-50/30 shadow-md' : 'border-gray-100'}`}
                            >
                                <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
                                   <Image src={box.img} alt={box.name} fill className="object-cover" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-xl text-[#1A2A3A]">{box.name}</h3>
                                    <span className="text-[10px] font-bold bg-[#1A2A3A] text-white px-2 py-1 rounded">{box.tag}</span>
                                </div>
                                <p className="text-[#D4AF37] font-bold text-lg">{box.price}</p>
                                {selectedBox === box.id && (
                                    <div className="mt-2 flex justify-center text-[#D4AF37] animate-bounce"><Check size={24}/></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- مرحله ۲: تنظیم تاریخ --- */}
            {step === 2 && (
                <div className="animate-fade-in text-center max-w-md mx-auto my-auto">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-4">{t.dateTitle}</h2>
                    <p className="text-gray-500 mb-8">{t.dateDesc}</p>
                    
                    <div className="bg-[#F9F7F2] p-6 rounded-2xl border border-gray-200 shadow-inner">
                        <label className="block text-left text-gray-700 font-bold mb-3 mx-1">{t.dateLabel}</label>
                        <div className="relative">
                            <Calendar className={`absolute top-3 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={20}/>
                            <input 
                                type="date" 
                                className={`w-full py-3 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none bg-white text-lg ${isRTL ? 'pr-10' : 'pl-10'}`}
                                value={lastPeriod}
                                onChange={(e) => setLastPeriod(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* --- مرحله ۳: تایید نهایی --- */}
            {step === 3 && (
                <div className="animate-fade-in text-center my-auto">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-green-200 shadow-lg">
                        <Check size={48} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-4">{t.successTitle}</h2>
                    <p className="text-gray-500 mb-8 text-lg">{t.successDesc}</p>
                    
                    <div className="bg-[#F9F7F2] p-4 rounded-xl mb-8 text-sm text-gray-600 inline-block border border-gray-200">
                        {t.successNote}
                    </div>
                </div>
            )}

            {/* دکمه‌های ناوبری پایین */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-gray-500 hover:text-[#1A2A3A] font-medium transition px-4 py-2 rounded-lg hover:bg-gray-50">
                        {isRTL ? <ArrowRight size={20}/> : <ArrowLeft size={20}/>} {t.btnBack}
                    </button>
                ) : (
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition px-4 py-2 rounded-lg hover:bg-red-50">
                        {t.btnCancel}
                    </Link>
                )}

                {step < 3 ? (
                    <button 
                        onClick={() => setStep(step + 1)} 
                        disabled={step === 1 && !selectedBox}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition shadow-md ${
                            (step === 1 && !selectedBox) 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                            : 'bg-[#1A2A3A] text-white hover:bg-[#D4AF37] hover:scale-105'
                        }`}
                    >
                        {t.btnNext} {isRTL ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
                    </button>
                ) : (
                    <Link href="/checkout" className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-lg shadow-[#D4AF37]/30 hover:scale-105 transition">
                        {t.btnFinish} <Package size={20}/>
                    </Link>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}