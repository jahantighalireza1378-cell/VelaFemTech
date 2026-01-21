'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Calendar, Package, Sliders, Heart, Coffee, Thermometer, Gift, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function BoxBuilder() {
  const [step, setStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [lastPeriod, setLastPeriod] = useState('');
  const [lang, setLang] = useState('EN');

  // --- استیت‌های شخصی‌سازی ---
  const [padBrand, setPadBrand] = useState('Kotex');
  
  // سیستم هوشمند تعادل پدها (مجموع ۱۵ عدد)
  const [dayPads, setDayPads] = useState(10);
  const nightPads = 15 - dayPads; // محاسبه خودکار شبانه بر اساس روزانه

  const [hasTampon, setHasTampon] = useState(false);
  const [tamponBrand, setTamponBrand] = useState('Tampax');
  const [extras, setExtras] = useState({
    chocolate: false,
    tea: false,
    heatPatch: false,
    hotWaterBottle: false
  });

  // دیکشنری زبان‌ها
  const content: any = {
    EN: {
      title: "Build Your VELA Box",
      steps: ["Select Box", "Set Date", "Customize", "Review"],
      box1Tag: "ECO", box2Tag: "BEST SELLER", box3Tag: "LUXURY",
      price: "TL",
      dateTitle: "Cycle Tracking", dateDesc: "Enter the start date of your last period.",
      custTitle: "Customize Your Care", custDesc: "Tailor the box to your specific needs.",
      
      secPads: "Pad Mix (Total 15)",
      lblDay: "Day Pads", lblNight: "Night Pads",
      lblBrand: "Preferred Brand:",
      
      secTampons: "Tampons", lblAddTampons: "Add Tampons?",
      secExtras: "Add-ons & Treats",
      exChoco: "Handmade Chocolate (+80)",
      exTea: "VELA Herbal Tea (+60)",
      exPatch: "Heat Patch (+40)",
      exBottle: "Hot Water Bottle (+150)",
      reviewTitle: "Summary", lblBox: "Box Type", lblDate: "Start Date", lblTotal: "Total Monthly",
      btnBack: "Back", btnNext: "Next Step", btnFinish: "Proceed to Checkout",
    },
    FA: {
      title: "ساخت باکس VELA",
      steps: ["انتخاب باکس", "تاریخ", "شخصی‌سازی", "بررسی"],
      box1Tag: "اقتصادی", box2Tag: "محبوب‌ترین", box3Tag: "لوکس",
      price: "لیر",
      dateTitle: "رهگیری چرخه", dateDesc: "تاریخ شروع آخرین پریود خود را وارد کنید.",
      custTitle: "شخصی‌سازی مراقبت", custDesc: "باکس را دقیقاً طبق سلیقه خود بچینید.",
      
      secPads: "ترکیب پدها (مجموع ۱۵ عدد)",
      lblDay: "پد روزانه", lblNight: "پد شبانه",
      lblBrand: "برند مورد علاقه:",
      
      secTampons: "تامپون", lblAddTampons: "افزودن تامپون؟",
      secExtras: "اقلام اضافه و هدیه",
      exChoco: "شکلات دست‌ساز (+۸۰)",
      exTea: "دمنوش گیاهی ولا (+۶۰)",
      exPatch: "چسب ضد درد (+۴۰)",
      exBottle: "کیسه آب گرم (+۱۵۰)",
      reviewTitle: "خلاصه سفارش", lblBox: "نوع باکس", lblDate: "تاریخ شروع", lblTotal: "مبلغ ماهانه",
      btnBack: "بازگشت", btnNext: "مرحله بعد", btnFinish: "تکمیل خرید",
    },
    // (سایر زبان‌ها مشابه هستند...)
    TR: {
       title: "Kutunu Oluştur", steps: ["Kutu", "Tarih", "Özelleştir", "Onayla"],
       box1Tag: "EKO", box2Tag: "ÇOK SATAN", box3Tag: "LÜKS", price: "TL",
       dateTitle: "Döngü Takibi", dateDesc: "Son adet tarihini giriniz.",
       custTitle: "Özelleştirme", custDesc: "Kutunuzu ihtiyaçlarınıza göre ayarlayın.",
       secPads: "Ped Dengesi (Toplam 15)", lblDay: "Gündüz", lblNight: "Gece", lblBrand: "Marka:",
       secTampons: "Tampon", lblAddTampons: "Tampon Ekle?",
       secExtras: "Ekstralar", exChoco: "Çikolata (+80)", exTea: "VELA Çayı (+60)", exPatch: "Isı Bandı (+40)", exBottle: "Su Torbası (+150)",
       reviewTitle: "Özet", lblBox: "Kutu Tipi", lblDate: "Başlangıç", lblTotal: "Aylık Tutar",
       btnBack: "Geri", btnNext: "İleri", btnFinish: "Ödeme"
    },
    RU: {
       title: "Сборка бокса", steps: ["Бокс", "Дата", "Детали", "Обзор"],
       box1Tag: "ЭКО", box2Tag: "ХИТ", box3Tag: "LUXURY", price: "TL",
       dateTitle: "Цикл", dateDesc: "Дата начала последних месячных.",
       custTitle: "Настройка", custDesc: "Настройте бокс под себя.",
       secPads: "Прокладки (Всего 15)", lblDay: "Дневные", lblNight: "Ночные", lblBrand: "Бренд:",
       secTampons: "Тампоны", lblAddTampons: "Добавить тампоны?",
       secExtras: "Дополнения", exChoco: "Шоколад (+80)", exTea: "Чай (+60)", exPatch: "Пластырь (+40)", exBottle: "Грелка (+150)",
       reviewTitle: "Итог", lblBox: "Тип бокса", lblDate: "Дата", lblTotal: "Итого",
       btnBack: "Назад", btnNext: "Далее", btnFinish: "Оформить"
    }
  };

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

  const boxes = [
    { id: 'essential', name: 'Essential', price: 380, tag: t.box1Tag, img: '/images/essential.jpg' },
    { id: 'care', name: 'Care', price: 680, tag: t.box2Tag, img: '/images/care.jpg' },
    { id: 'bliss', name: 'Bliss', price: 1350, tag: t.box3Tag, img: '/images/bliss.jpg' },
  ];

  // محاسبه قیمت هوشمند
  const calculateTotal = () => {
      const boxPrice = boxes.find(b => b.id === selectedBox)?.price || 0;
      let extraPrice = 0;
      if (hasTampon) extraPrice += 50;
      if (extras.chocolate) extraPrice += 80;
      if (extras.tea) extraPrice += 60;
      if (extras.heatPatch) extraPrice += 40;
      if (extras.hotWaterBottle) extraPrice += 150;
      return boxPrice + extraPrice;
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-10 px-4 pt-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex flex-col items-center gap-2 bg-[#F9F7F2] px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= num ? 'bg-[#1A2A3A] text-white scale-110' : 'bg-gray-200 text-gray-400'}`}>
                        {num}
                    </div>
                    <span className="text-xs font-bold text-gray-500 hidden md:block">{t.steps[num-1]}</span>
                </div>
            ))}
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl min-h-[500px] relative">
            
            {/* --- STEP 1: Select Box --- */}
            {step === 1 && (
                <div className="animate-fade-in">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-8 text-center">{t.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {boxes.map((box) => (
                            <div 
                                key={box.id}
                                onClick={() => setSelectedBox(box.id)}
                                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all hover:scale-[1.02] ${selectedBox === box.id ? 'border-[#D4AF37] bg-yellow-50/50 ring-1 ring-[#D4AF37]' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-100">
                                   <Image src={box.img} alt={box.name} fill className="object-cover" />
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-xl text-[#1A2A3A]">{box.name}</h3>
                                    <span className="text-[10px] font-bold bg-[#1A2A3A] text-white px-2 py-1 rounded">{box.tag}</span>
                                </div>
                                <p className="text-[#D4AF37] font-bold text-lg">{box.price} {t.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- STEP 2: Date --- */}
            {step === 2 && (
                <div className="animate-fade-in text-center max-w-md mx-auto py-10">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-4">{t.dateTitle}</h2>
                    <p className="text-gray-500 mb-8">{t.dateDesc}</p>
                    <div className="bg-[#F9F7F2] p-8 rounded-3xl border border-gray-200">
                        <input 
                            type="date" 
                            className="w-full py-4 px-6 rounded-xl border border-gray-300 focus:border-[#D4AF37] outline-none bg-white text-xl text-center"
                            value={lastPeriod}
                            onChange={(e) => setLastPeriod(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* --- STEP 3: Customization (بالانس هوشمند + قیمت هوشمند) --- */}
            {step === 3 && (
                <div className="animate-fade-in max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2 text-center">{t.custTitle}</h2>
                    <p className="text-gray-500 mb-8 text-center">{t.custDesc}</p>

                    <div className="space-y-6">
                        
                        {/* 1. سیستم بالانس هوشمند پدها */}
                        <div className="bg-[#F9F7F2] p-6 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-[#1A2A3A] flex items-center gap-2">
                                    <Package size={20}/> {t.secPads}
                                </h4>
                                <div className="flex gap-2 text-xs">
                                    {['Kotex', 'Orkid', 'Molped'].map(b => (
                                        <button key={b} onClick={() => setPadBrand(b)} className={`px-3 py-1 rounded-full border transition ${padBrand === b ? 'bg-[#1A2A3A] text-white' : 'bg-white'}`}>
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* اسلایدر تنظیم تعداد */}
                            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                                <div className="text-center w-20">
                                    <Sun className="mx-auto text-orange-400 mb-1" size={24}/>
                                    <span className="text-xs font-bold text-gray-500">{t.lblDay}</span>
                                    <div className="text-xl font-bold text-[#1A2A3A]">{dayPads}</div>
                                </div>
                                
                                <input 
                                    type="range" min="0" max="15" 
                                    value={dayPads} 
                                    onChange={(e) => setDayPads(parseInt(e.target.value))}
                                    className="flex-1 accent-[#D4AF37] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />

                                <div className="text-center w-20">
                                    <Moon className="mx-auto text-indigo-400 mb-1" size={24}/>
                                    <span className="text-xs font-bold text-gray-500">{t.lblNight}</span>
                                    <div className="text-xl font-bold text-[#1A2A3A]">{nightPads}</div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Tampons Selection (Smart Price: +50) */}
                        <div className="bg-[#F9F7F2] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1A2A3A]"><Sliders /></div>
                                <div>
                                    <h4 className="font-bold text-[#1A2A3A]">{t.secTampons} (+50 {t.price})</h4>
                                    <p className="text-sm text-gray-500">{hasTampon ? tamponBrand : 'No Tampons'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">{t.lblAddTampons}</span>
                                <button 
                                    onClick={() => setHasTampon(!hasTampon)}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors ${hasTampon ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${hasTampon ? 'translate-x-6' : ''}`}></div>
                                </button>
                                {hasTampon && (
                                    <select 
                                        value={tamponBrand} 
                                        onChange={(e) => setTamponBrand(e.target.value)}
                                        className="bg-white border rounded-lg px-3 py-1 text-sm outline-none"
                                    >
                                        <option>Tampax</option>
                                        <option>OB</option>
                                        <option>Kotex</option>
                                    </select>
                                )}
                            </div>
                        </div>

                        {/* 3. Add-ons Grid (Smart Price) */}
                        <div>
                            <h4 className="font-bold text-[#1A2A3A] mb-4 mt-6">{t.secExtras}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { key: 'chocolate', label: t.exChoco, icon: <Gift size={20}/> },
                                    { key: 'tea', label: t.exTea, icon: <Coffee size={20}/> },
                                    { key: 'heatPatch', label: t.exPatch, icon: <Thermometer size={20}/> },
                                    { key: 'hotWaterBottle', label: t.exBottle, icon: <Heart size={20}/> },
                                ].map((item: any) => (
                                    <div 
                                        key={item.key}
                                        onClick={() => setExtras({...extras, [item.key]: !extras[item.key as keyof typeof extras]})}
                                        className={`cursor-pointer p-4 rounded-xl border text-center transition ${extras[item.key as keyof typeof extras] ? 'border-[#D4AF37] bg-yellow-50' : 'border-gray-100 bg-white'}`}
                                    >
                                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${extras[item.key as keyof typeof extras] ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-bold text-gray-700 block">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- STEP 4: Review --- */}
            {step === 4 && (
                <div className="animate-fade-in max-w-lg mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-8">{t.reviewTitle}</h2>
                    
                    <div className="bg-[#F9F7F2] p-6 rounded-3xl space-y-4 text-sm md:text-base">
                        <div className="flex justify-between border-b border-gray-200 pb-3">
                            <span className="text-gray-500">{t.lblBox}</span>
                            <span className="font-bold text-[#1A2A3A]">{boxes.find(b=>b.id===selectedBox)?.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-3">
                            <span className="text-gray-500">{t.lblDate}</span>
                            <span className="font-bold text-[#1A2A3A]">{lastPeriod}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-3">
                            <span className="text-gray-500">{t.secPads}</span>
                            <span className="font-bold text-[#1A2A3A]">{dayPads} Day / {nightPads} Night ({padBrand})</span>
                        </div>
                        {hasTampon && (
                             <div className="flex justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-500">Tampons</span>
                                <span className="font-bold text-[#1A2A3A]">{tamponBrand} (+50)</span>
                            </div>
                        )}
                        <div className="pt-2">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {Object.entries(extras).map(([key, value]) => value && (
                                    <span key={key} className="bg-white border px-3 py-1 rounded-full text-xs text-gray-600">
                                        + {key}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t-2 border-[#D4AF37]/20 flex justify-between items-center">
                            <span className="font-bold text-lg">{t.lblTotal}</span>
                            <span className="font-bold text-2xl text-[#1A2A3A]">{calculateTotal()} {t.price}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-gray-500 hover:text-[#1A2A3A] px-4 py-2">
                        {isRTL ? <ArrowRight size={20}/> : <ArrowLeft size={20}/>} {t.btnBack}
                    </button>
                ) : (
                    <Link href="/" className="flex items-center gap-2 text-gray-500 px-4 py-2">Cancel</Link>
                )}

                {step < 4 ? (
                    <button 
                        onClick={() => setStep(step + 1)} 
                        disabled={step === 1 && !selectedBox}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition shadow-lg ${
                            (step === 1 && !selectedBox) 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-[#1A2A3A] text-white hover:bg-[#D4AF37]'
                        }`}
                    >
                        {t.btnNext} {isRTL ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
                    </button>
                ) : (
                    <Link href="/checkout" className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-lg shadow-[#D4AF37]/30">
                        {t.btnFinish} <Package size={20}/>
                    </Link>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}