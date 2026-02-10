'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Check, Calendar as CalendarIcon, Package, Sliders, 
  Heart, Coffee, Thermometer, Gift, Sun, Moon, Leaf, Info, ChevronLeft, ChevronRight, Minus, Plus 
} from 'lucide-react';

// --- Utility: Simple Jalaali Converter ---
const jalaali = {
  gregorianToJalali: (gy: number, gm: number, gd: number) => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return { jy, jm, jd };
  },
  jalaliToGregorian: (jy: number, jm: number, jd: number) => {
    let gy = (jy <= 979) ? 621 : 1600;
    jy -= (jy <= 979) ? 0 : 979;
    let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) { gy += 100 * Math.floor(--days / 36524); days %= 36524; if (days >= 365) days++; }
    gy += 4 * Math.floor((days) / 1461);
    days %= 1461;
    gy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    let gd = days + 1;
    const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm;
    for (gm = 0; gm < 13; gm++) {
      const v = sal_a[gm];
      if (gd <= v) break;
      gd -= v;
    }
    return { gy, gm, gd };
  },
  monthNames: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
};

// --- Box Configuration Data ---
const BOX_DATA: any = {
  essential: { id: 'essential', name: 'Essential', basePrice: 380, points: 30 },
  care: { id: 'care', name: 'Care', basePrice: 680, points: 50 },
  bliss: { id: 'bliss', name: 'Bliss', basePrice: 1350, points: 100 },
};

function BoxBuilderContent() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('EN');
  
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  
  const selectedBoxType = BOX_DATA[typeParam || 'care'] || BOX_DATA['care'];

  // Data States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [subscription, setSubscription] = useState(1);
  const [isEco, setIsEco] = useState(false);
  
  // Customization
  const [padBrand, setPadBrand] = useState('Kotex');
  const [dayPads, setDayPads] = useState(10);
  const [nightPads, setNightPads] = useState(5);
  
  const [hasTampon, setHasTampon] = useState(false);
  const [tamponBrand, setTamponBrand] = useState('Tampax');
  const [tamponCount, setTamponCount] = useState(10);
  
  const [extras, setExtras] = useState({ chocolate: 0, tea: 0, heatPatch: 0, hotWaterBottle: 0 });
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', zip: '' });

  const content: any = {
    EN: {
      next: "Next Step", back: "Back", confirm: "Proceed to Checkout", currency: "TL",
      step1Title: "Cycle Tracking", step1Desc: "Select your last period start date.",
      calcNext: "Next Period:", calcShip: "Shipping Date:",
      step2Title: `Customize ${selectedBoxType.name} Box`, 
      subTitle: "Subscription Plan", discount: "OFF",
      ecoTitle: "Eco-Friendly", ecoDesc: `Get +${selectedBoxType.points} Wallet Points!`,
      padConfig: "Pad Selection", brand: "Brand", day: "Day Pads", night: "Night Pads",
      tamponConfig: "Tampons", enableTampon: "Add Tampons", count: "Qty",
      addOns: "Treats & Extras",
      exChoco: "Chocolate", exTea: "Herbal Tea", exPatch: "Heat Patch", exBottle: "Water Bottle",
      priceSummary: "Total", reviewOrder: "Order Summary",
      step3Title: "Shipping", formName: "Full Name", formPhone: "Phone", formAddr: "Address", formZip: "Zip Code",
      successTitle: "Success!", successDesc: "Your order is confirmed.", trackLabel: "Tracking ID", homeBtn: "Home"
    },
    FA: {
      next: "مرحله بعد", back: "بازگشت", confirm: "تایید و پرداخت", currency: "لیر",
      step1Title: "تقویم قاعدگی", step1Desc: "تاریخ شروع آخرین پریود خود را انتخاب کنید.",
      calcNext: "پریود بعدی:", calcShip: "زمان ارسال (۵ روز قبل):",
      step2Title: `شخصی‌سازی باکس ${selectedBoxType.name}`, 
      subTitle: "طرح اشتراک", discount: "تخفیف",
      ecoTitle: "بسته‌بندی اکو", ecoDesc: `دریافت ${selectedBoxType.points} امتیاز کیف پول!`,
      padConfig: "انتخاب نوار بهداشتی", brand: "برند", day: "پد روزانه", night: "پد شبانه",
      tamponConfig: "تامپون", enableTampon: "افزودن تامپون", count: "تعداد",
      addOns: "اقلام هیجان‌انگیز",
      exChoco: "شکلات دست‌ساز", exTea: "دمنوش آرامش", exPatch: "چسب ضد درد", exBottle: "کیسه آب گرم",
      priceSummary: "مبلغ نهایی", reviewOrder: "خلاصه سفارش",
      step3Title: "اطلاعات ارسال", formName: "نام کامل", formPhone: "شماره تماس", formAddr: "آدرس دقیق", formZip: "کد پستی",
      successTitle: "سفارش ثبت شد", successDesc: "بسته شما به زودی ارسال می‌شود.", trackLabel: "کد رهگیری", homeBtn: "بازگشت به خانه"
    },
    TR: {
       next: "İleri", back: "Geri", confirm: "Ödeme Yap", currency: "TL",
       step1Title: "Döngü Takibi", step1Desc: "Son adet tarihini seçin.",
       calcNext: "Sonraki Adet:", calcShip: "Kargo Tarihi:",
       step2Title: `${selectedBoxType.name} Özelleştir`, subTitle: "Abonelik", discount: "İndirim",
       ecoTitle: "Eko Paket", ecoDesc: `+${selectedBoxType.points} Puan Kazan!`,
       padConfig: "Ped Seçimi", brand: "Marka", day: "Gündüz", night: "Gece",
       tamponConfig: "Tampon", enableTampon: "Ekle", count: "Adet",
       addOns: "Ekstralar", exChoco: "Çikolata", exTea: "Çay", exPatch: "Isı Bandı", exBottle: "Su Torbası",
       priceSummary: "Toplam", reviewOrder: "Özet",
       step3Title: "Teslimat", formName: "İsim", formPhone: "Tel", formAddr: "Adres", formZip: "Posta Kodu",
       successTitle: "Başarılı!", successDesc: "Siparişiniz alındı.", trackLabel: "Takip No", homeBtn: "Ana Sayfa"
    },
    RU: {
       next: "Далее", back: "Назад", confirm: "Оплатить", currency: "TL",
       step1Title: "Календарь", step1Desc: "Дата начала цикла.",
       calcNext: "След. цикл:", calcShip: "Дата доставки:",
       step2Title: `Настройка ${selectedBoxType.name}`, subTitle: "Подписка", discount: "Скидка",
       ecoTitle: "Эко", ecoDesc: `+${selectedBoxType.points} баллов!`,
       padConfig: "Прокладки", brand: "Бренд", day: "Дневные", night: "Ночные",
       tamponConfig: "Тампоны", enableTampon: "Добавить", count: "Кол-во",
       addOns: "Дополнения", exChoco: "Шоколад", exTea: "Чай", exPatch: "Пластырь", exBottle: "Грелка",
       priceSummary: "Итого", reviewOrder: "Обзор",
       step3Title: "Доставка", formName: "Имя", formPhone: "Телефон", formAddr: "Адрес", formZip: "Индекс",
       successTitle: "Успешно!", successDesc: "Заказ принят.", trackLabel: "Трек-код", homeBtn: "Домой"
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);
    window.addEventListener('vela-language-change', () => {
        const newLang = localStorage.getItem('vela-lang');
        if (newLang) setLang(newLang);
    });
  }, []);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  const calculateTotal = () => {
      let total = selectedBoxType.basePrice; 
      if (hasTampon) total += (tamponCount * 5);
      total += (extras.chocolate * 80) + (extras.tea * 60) + (extras.heatPatch * 40) + (extras.hotWaterBottle * 150);
      
      total = total * subscription;
      if (subscription === 3) total = total * 0.95;
      if (subscription === 6) total = total * 0.90;
      return Math.round(total);
  };

  const getDates = () => {
      if (!selectedDate) return { next: '-', ship: '-' };
      const nextP = new Date(selectedDate);
      nextP.setDate(selectedDate.getDate() + 28);
      const shipD = new Date(nextP);
      shipD.setDate(nextP.getDate() - 5);

      if (lang === 'FA') {
           const jNext = jalaali.gregorianToJalali(nextP.getFullYear(), nextP.getMonth()+1, nextP.getDate());
           const jShip = jalaali.gregorianToJalali(shipD.getFullYear(), shipD.getMonth()+1, shipD.getDate());
           return {
               next: `${jNext.jd} ${jalaali.monthNames[jNext.jm-1]}`,
               ship: `${jShip.jd} ${jalaali.monthNames[jShip.jm-1]}`
           };
      }
      return {
          next: nextP.toLocaleDateString(),
          ship: shipD.toLocaleDateString()
      };
  };

  // 🔴🔴🔴 ریدارکت اجباری برای حل مشکل 🔴🔴🔴
  const handleProceedToCheckout = () => {
      const orderPayload = {
          selectedBoxId: selectedBoxType.id,
          subscription,
          hasTampon,
          tamponCount,
          extras,
          formData, 
          totalPrice: calculateTotal(),
          lang: lang 
      };

      // ۱. ذخیره اطلاعات
      localStorage.setItem('vela-temp-order', JSON.stringify(orderPayload));
      
      // ۲. ریدارکت سخت (Hard Redirect) که حتما کار می‌کند
      window.location.href = '/checkout';
  };

  const [currentCalDate, setCurrentCalDate] = useState(new Date());

  const renderCalendar = () => {
      const isJalali = lang === 'FA';
      let year, month, daysInMonth, startDayOfWeek;
      let monthName = "";

      if (isJalali) {
          const jDate = jalaali.gregorianToJalali(currentCalDate.getFullYear(), currentCalDate.getMonth() + 1, currentCalDate.getDate());
          year = jDate.jy;
          month = jDate.jm;
          monthName = jalaali.monthNames[month - 1];
          daysInMonth = month <= 6 ? 31 : (month < 12 ? 30 : 29); 
          const gFirstOfMonth = jalaali.jalaliToGregorian(year, month, 1);
          const d = new Date(gFirstOfMonth.gy, gFirstOfMonth.gm - 1, gFirstOfMonth.gd);
          startDayOfWeek = (d.getDay() + 1) % 7; 
      } else {
          year = currentCalDate.getFullYear();
          month = currentCalDate.getMonth();
          monthName = currentCalDate.toLocaleString('default', { month: 'long' });
          daysInMonth = new Date(year, month + 1, 0).getDate();
          startDayOfWeek = new Date(year, month, 1).getDay();
      }

      const days = [];
      for (let i = 0; i < startDayOfWeek; i++) days.push(<div key={`empty-${i}`} className="h-10"></div>);
      
      for (let d = 1; d <= daysInMonth; d++) {
          let dateObj: Date;
          if (isJalali) {
              const g = jalaali.jalaliToGregorian(year, month, d);
              dateObj = new Date(g.gy, g.gm - 1, g.gd);
          } else {
              dateObj = new Date(year, month, d);
          }
          const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
          days.push(
              <button 
                  key={d} onClick={() => setSelectedDate(dateObj)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isSelected ? 'bg-[#D4AF37] text-white shadow-lg scale-110' : 'hover:bg-gray-100 text-[#1A2A3A]'}`}
              >{d}</button>
          );
      }

      const changeMonth = (offset: number) => {
          const newDate = new Date(currentCalDate);
          if (isJalali) { newDate.setDate(newDate.getDate() + (offset * 30)); } 
          else { newDate.setMonth(newDate.getMonth() + offset); }
          setCurrentCalDate(newDate);
      };

      return (
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 max-w-sm mx-auto">
              <div className="flex justify-between items-center mb-6">
                  <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight size={20}/></button>
                  <span className="font-bold text-lg text-[#1A2A3A]">{monthName} {year}</span>
                  <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={20}/></button>
              </div>
              <div className="grid grid-cols-7 text-center mb-2">
                  {isJalali 
                      ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(d => <span key={d} className="text-xs text-gray-400 font-bold">{d}</span>)
                      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} className="text-xs text-gray-400 font-bold">{d}</span>)
                  }
              </div>
              <div className="grid grid-cols-7 gap-1" dir={isJalali ? 'rtl' : 'ltr'}>{days}</div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-8 px-4 pt-28 pb-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-center gap-4 mb-10">
            {[1, 2].map(num => (
                <div key={num} className={`h-2 rounded-full transition-all duration-500 ${step >= num ? 'w-12 bg-[#1A2A3A]' : 'w-4 bg-gray-300'}`}></div>
            ))}
        </div>

        {step === 1 && (
            <div className="animate-fade-in max-w-lg mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-2">{t.step1Title}</h2>
                    <p className="text-gray-500">{t.step1Desc}</p>
                </div>
                {renderCalendar()}
                {selectedDate && (
                    <div className="mt-8 bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#D4AF37] flex flex-col gap-3 animate-fade-in-up">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">{t.calcNext}</span>
                            <span className="font-bold text-[#1A2A3A]">{getDates().next}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">{t.calcShip}</span>
                            <span className="font-bold text-[#D4AF37]">{getDates().ship}</span>
                        </div>
                    </div>
                )}
                <button onClick={() => setStep(2)} disabled={!selectedDate} className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${selectedDate ? 'bg-[#1A2A3A] text-white hover:bg-[#D4AF37] shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    {t.next} {isRTL ? <ArrowLeft/> : <ArrowRight/>}
                </button>
            </div>
        )}

        {step === 2 && (
            <div className="animate-fade-in">
                <h2 className="text-3xl font-serif font-bold text-[#1A2A3A] mb-8 text-center">{t.step2Title}</h2>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 3, 6].map((m) => (
                        <div key={m} onClick={() => setSubscription(m)} className={`cursor-pointer rounded-2xl p-4 text-center border-2 transition relative ${subscription === m ? 'border-[#D4AF37] bg-white shadow-xl scale-105 z-10' : 'border-gray-200 bg-[#F9F7F2] opacity-80'}`}>
                            {m > 1 && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">{m === 3 ? '5%' : '10%'} {t.discount}</div>}
                            <span className="block font-bold text-lg">{m} Month</span>
                        </div>
                    ))}
                </div>

                <div onClick={() => setIsEco(!isEco)} className={`cursor-pointer rounded-3xl p-6 mb-8 flex items-center gap-4 transition-all duration-300 border-2 ${isEco ? 'bg-[#1A2A3A] text-white border-[#1A2A3A]' : 'bg-white border-green-100'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isEco ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'}`}><Leaf/></div>
                    <div className="flex-1">
                        <h4 className="font-bold">{t.ecoTitle}</h4>
                        <p className={`text-sm ${isEco ? 'text-gray-300' : 'text-gray-500'}`}>{t.ecoDesc}</p>
                    </div>
                    {isEco && <Check className="text-[#D4AF37]" size={28}/>}
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                    <h4 className="font-bold text-[#1A2A3A] mb-4 flex items-center gap-2"><Package size={18}/> {t.padConfig}</h4>
                    <div className="flex gap-2 mb-6">
                        {['Kotex', 'Orkid', 'Molped'].map(b => (
                            <button key={b} onClick={() => setPadBrand(b)} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${padBrand === b ? 'bg-[#1A2A3A] text-white border-[#1A2A3A]' : 'bg-white text-gray-500 border-gray-200'}`}>{b}</button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-[#F9F7F2] p-4 rounded-xl">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm"><Sun size={20}/></div><span className="font-bold text-[#1A2A3A] text-sm">{t.day}</span></div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setDayPads(Math.max(0, dayPads - 1))} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100"><Minus size={16}/></button>
                                <span className="font-bold w-6 text-center text-lg">{dayPads}</span>
                                <button onClick={() => setDayPads(dayPads + 1)} className="w-8 h-8 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center hover:bg-[#D4AF37]"><Plus size={16}/></button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#1A2A3A]/5 p-4 rounded-xl">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#1A2A3A] rounded-full flex items-center justify-center text-indigo-300 shadow-sm"><Moon size={20}/></div><span className="font-bold text-[#1A2A3A] text-sm">{t.night}</span></div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setNightPads(Math.max(0, nightPads - 1))} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100"><Minus size={16}/></button>
                                <span className="font-bold w-6 text-center text-lg">{nightPads}</span>
                                <button onClick={() => setNightPads(nightPads + 1)} className="w-8 h-8 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center hover:bg-[#D4AF37]"><Plus size={16}/></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                         <h4 className="font-bold text-[#1A2A3A] flex items-center gap-2"><Sliders size={18}/> {t.tamponConfig}</h4>
                         <button onClick={() => setHasTampon(!hasTampon)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${hasTampon ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-500'}`}>{hasTampon ? 'Active' : 'Enable'}</button>
                    </div>
                    {hasTampon && (
                        <div className="animate-fade-in pt-2">
                             <div className="flex gap-2 mb-4">
                                <select value={tamponBrand} onChange={(e) => setTamponBrand(e.target.value)} className="flex-1 bg-[#F9F7F2] py-3 px-4 rounded-xl text-sm font-bold outline-none"><option>Tampax</option><option>OB</option><option>Kotex</option></select>
                             </div>
                             <div className="flex justify-between items-center bg-[#F9F7F2] p-3 rounded-xl">
                                <span className="text-sm font-bold text-gray-500">{t.count}</span>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setTamponCount(Math.max(5, tamponCount - 5))} className="w-8 h-8 bg-white rounded-full font-bold shadow-sm">-</button>
                                    <span className="font-bold">{tamponCount}</span>
                                    <button onClick={() => setTamponCount(tamponCount + 5)} className="w-8 h-8 bg-[#1A2A3A] text-white rounded-full font-bold shadow-sm">+</button>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                <h4 className="font-bold text-[#1A2A3A] mb-4 px-2">{t.addOns}</h4>
                <div className="grid grid-cols-2 gap-4 mb-24">
                    {[
                        { id: 'chocolate', name: t.exChoco, icon: <Gift className="text-pink-500"/> },
                        { id: 'tea', name: t.exTea, icon: <Coffee className="text-green-600"/> },
                        { id: 'heatPatch', name: t.exPatch, icon: <Thermometer className="text-orange-500"/> },
                        { id: 'hotWaterBottle', name: t.exBottle, icon: <Heart className="text-red-500"/> },
                    ].map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-transparent hover:border-[#D4AF37] transition">
                            <div className="w-10 h-10 bg-[#F9F7F2] rounded-full flex items-center justify-center mb-2">{item.icon}</div>
                            <span className="font-bold text-[#1A2A3A] text-xs mb-3 h-8 flex items-center">{item.name}</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setExtras({...extras, [item.id]: Math.max(0, extras[item.id as keyof typeof extras] - 1)})} className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-400 hover:bg-gray-50"><Minus size={12}/></button>
                                <span className="font-bold text-sm">{extras[item.id as keyof typeof extras]}</span>
                                <button onClick={() => setExtras({...extras, [item.id]: extras[item.id as keyof typeof extras] + 1})} className="w-6 h-6 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center"><Plus size={12}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50 animate-slide-up">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <span className="text-xs text-gray-500 block">{t.priceSummary} ({selectedBoxType.name})</span>
                        <span className="text-2xl font-bold text-[#1A2A3A]">{calculateTotal()} {t.currency}</span>
                    </div>
                    <button onClick={handleProceedToCheckout} className="bg-[#1A2A3A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#D4AF37] transition shadow-lg flex items-center gap-2">
                        {t.confirm} {isRTL ? <ArrowLeft size={18}/> : <ArrowRight size={18}/>}
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

// Wrapper to prevent hydration mismatch with useSearchParams
export default function BoxBuilder() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BoxBuilderContent />
    </Suspense>
  );
}