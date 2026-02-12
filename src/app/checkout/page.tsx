'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Info, ArrowRight, ArrowLeft, ShieldCheck, Lock, Loader2 } from 'lucide-react';

const content: any = {
    EN: {
      title: "Shipping Details", name: "Full Name", phone: "Phone Number", addr: "Full Address",
      summaryTitle: "Payment Summary", productsTotal: "Total Amount", serviceFee: "Service & Handling Fee",
      totalToPay: "Total to Pay", payBtn: "Pay Securely", secureMsg: "Secured by Shopier Payment Gateway",
      connecting: "Connecting to Secure Gateway", waitMsg: "Please wait while we transfer you to Shopier...", ssl: "256-bit SSL Encrypted Connection"
    },
    FA: {
      title: "اطلاعات ارسال", name: "نام و نام خانوادگی", phone: "شماره تماس", addr: "آدرس دقیق پستی",
      summaryTitle: "خلاصه پرداخت", productsTotal: "مبلغ سفارش", serviceFee: "هزینه خدمات و بسته‌بندی",
      totalToPay: "مبلغ قابل پرداخت", payBtn: "پرداخت امن", secureMsg: "پرداخت امن توسط درگاه Shopier",
      connecting: "در حال انتقال به درگاه امن", waitMsg: "لطفاً صبر کنید، در حال انتقال به صفحه پرداخت شاپرک (Shopier) هستیم...", ssl: "ارتباط امن با رمزنگاری ۲۵۶ بیتی"
    },
    TR: {
      title: "Teslimat Bilgileri", name: "Ad Soyad", phone: "Telefon Numarası", addr: "Açık Adres",
      summaryTitle: "Ödeme Özeti", productsTotal: "Sipariş Tutarı", serviceFee: "Hizmet ve Paketleme Bedeli",
      totalToPay: "Ödenecek Tutar", payBtn: "Güvenli Ödeme", secureMsg: "Shopier ile Güvenli Ödeme",
      connecting: "Güvenli Ödeme Sayfasına Bağlanılıyor", waitMsg: "Lütfen bekleyin, ödemenizi tamamlamak için Shopier'e yönlendiriliyorsunuz.", ssl: "256-bit SSL Şifreli Bağlantı"
    },
    RU: {
      title: "Детали доставки", name: "ФИО", phone: "Номер телефона", addr: "Полный адрес",
      summaryTitle: "Итог оплаты", productsTotal: "Сумма заказа", serviceFee: "Сервисный сбор",
      totalToPay: "К оплате", payBtn: "Оплатить", secureMsg: "Защищено платежным шлюзом Shopier",
      connecting: "Подключение к шлюзу", waitMsg: "Пожалуйста, подождите, мы перенаправляем вас на Shopier...", ssl: "256-битное SSL-шифрование"
    }
};

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [lang, setLang] = useState('EN');
  
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', zip: '' });

  // 🔴 لیست کامل و دقیق لینک‌های شاپیر 🔴
  const PAYMENT_LINKS: { [key: number]: string } = {
    120: 'https://shopier.com/VelaFemTech/44152946',
    180: 'https://shopier.com/VelaFemTech/44152981',
    220: 'https://shopier.com/VelaFemTech/44153006',
    300: 'https://shopier.com/VelaFemTech/44152849',
    400: 'https://shopier.com/VelaFemTech/44133990',
    450: 'https://shopier.com/VelaFemTech/44134077',
    500: 'https://shopier.com/VelaFemTech/44134127',
    550: 'https://shopier.com/VelaFemTech/44134173',
    600: 'https://shopier.com/VelaFemTech/44134207',
    650: 'https://shopier.com/VelaFemTech/44134267',
    700: 'https://shopier.com/VelaFemTech/44134332',
    750: 'https://shopier.com/VelaFemTech/44134379',
    800: 'https://shopier.com/VelaFemTech/44134462',
    850: 'https://shopier.com/VelaFemTech/44135681',
    900: 'https://shopier.com/VelaFemTech/44135719',
    950: 'https://shopier.com/VelaFemTech/44135818',
    1000: 'https://shopier.com/VelaFemTech/44135762',
    1100: 'https://shopier.com/VelaFemTech/44136516',
    1200: 'https://shopier.com/VelaFemTech/44137645',
    1400: 'https://shopier.com/VelaFemTech/44137749',
    1500: 'https://shopier.com/VelaFemTech/44137827',
    1800: 'https://shopier.com/VelaFemTech/44137792',
    2000: 'https://shopier.com/VelaFemTech/44137863',
    2100: 'https://shopier.com/VelaFemTech/44138246',
    2300: 'https://shopier.com/VelaFemTech/44138270',
    2500: 'https://shopier.com/VelaFemTech/44137973',
    3000: 'https://shopier.com/VelaFemTech/44138005',
    3300: 'https://shopier.com/VelaFemTech/44138286',
    3500: 'https://shopier.com/VelaFemTech/44138316',
    3700: 'https://shopier.com/VelaFemTech/44138337',
    3900: 'https://shopier.com/VelaFemTech/44138362',
    4000: 'https://shopier.com/VelaFemTech/44138379',
    5000: 'https://shopier.com/VelaFemTech/44138412',
    6000: 'https://shopier.com/VelaFemTech/44138458',
    7000: 'https://shopier.com/VelaFemTech/44138482',
    7300: 'https://shopier.com/VelaFemTech/44138507',
    7500: 'https://shopier.com/VelaFemTech/44138534',
    8000: 'https://shopier.com/VelaFemTech/44138559'
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('vela-lang');
    if (savedLang) setLang(savedLang);

    const savedOrder = localStorage.getItem('vela-temp-order');
    if (savedOrder) {
        try { 
            const parsed = JSON.parse(savedOrder);
            setOrderData(parsed);
            if(parsed.formData) {
                setFormData(prev => ({
                    ...prev,
                    name: parsed.formData.name || '',
                    phone: parsed.formData.phone || '',
                    address: parsed.formData.address || ''
                }));
            }
        } catch(e) {}
    } else {
        router.push('/');
    }
  }, [router]);

  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  const exactTotal = orderData?.totalPrice || 0;

  // 🧠 لاجیک هوشمند پیدا کردن لینک
  const getPayableAmount = (price: number) => {
    if (!price || price <= 0) return 0;
    const availablePrices = Object.keys(PAYMENT_LINKS).map(Number).sort((a, b) => a - b);
    
    // ۱. اگر دقیق بود
    if (availablePrices.includes(price)) return price;

    // ۲. اگر دقیق نبود، اولین قیمت بالاتر
    const foundPrice = availablePrices.find(p => p >= price);
    
    // ۳. اگر پیدا نشد، آخرین لینک
    return foundPrice || availablePrices[availablePrices.length - 1];
  };

  const finalPayable = getPayableAmount(exactTotal);
  const serviceFee = finalPayable - exactTotal;

  const handleFinalPayment = async () => {
    setLoading(true);

    const link = PAYMENT_LINKS[finalPayable];
    if (!link) {
        alert('Link Error. Contact Support.');
        setLoading(false);
        return;
    }

    try {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...orderData,
                formData, 
                paidAmount: finalPayable,
                realPrice: exactTotal,
                status: 'pending_payment',
                // ارسال مقادیر پد برای اینکه در API در دسترس باشند
                dayPads: orderData.dayPads,
                nightPads: orderData.nightPads,
                tamponCount: orderData.tamponCount,
                hasTampon: orderData.hasTampon
            }),
        });

        // 🔴 بررسی اینکه آیا سرور با موفقیت ذخیره کرد یا خیر
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Server Save Failed');
        }

        localStorage.removeItem('vela-temp-order');
        
        setTimeout(() => {
            window.location.href = link;
        }, 1500);

    } catch (e: any) {
        console.error("Payment Error:", e);
        // نمایش خطای واقعی به کاربر برای دیباگ کردن
        alert(`خطا در ثبت سفارش: ${e.message}`);
        setLoading(false);
    }
  };

  if (!orderData) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#D4AF37]"/></div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-12 px-4 flex justify-center items-start pt-24 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {loading && (
          <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in text-center p-8">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-green-100 shadow-xl">
                  <ShieldCheck size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-3">{t.connecting}</h2>
              <p className="text-gray-500 mb-8 max-w-md text-lg leading-relaxed">
                  {t.waitMsg} <b>Shopier</b>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <Lock size={14} /> {t.ssl}
              </div>
          </div>
      )}

      <div className={`max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${loading ? 'blur-md opacity-40 scale-95' : ''}`}>
        
        {/* فرم آدرس */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-8">{t.title}</h2>
            <div className="space-y-6">
                <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">{t.name}</label>
                    <input value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:border-[#D4AF37] focus:bg-white focus:shadow-md outline-none transition-all"/>
                </div>
                <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">{t.phone}</label>
                    <input value={formData.phone} type="tel" onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:border-[#D4AF37] focus:bg-white focus:shadow-md outline-none transition-all" dir="ltr"/> 
                </div>
                <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">{t.addr}</label>
                    <textarea rows={3} value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 resize-none focus:border-[#D4AF37] focus:bg-white focus:shadow-md outline-none transition-all"/>
                </div>
            </div>
        </div>

        {/* خلاصه پرداخت */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-[#D4AF37]/10 h-fit">
            <h2 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-8 flex items-center gap-3">
                {t.summaryTitle} <div className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={16}/></div>
            </h2>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-medium">
                    <span>{t.productsTotal}</span>
                    <span className="font-mono text-[#1A2A3A]">{exactTotal} TL</span>
                </div>
                
                {serviceFee > 0 && (
                    <div className="flex justify-between text-green-700 text-sm bg-green-50/80 p-4 rounded-xl border border-green-100">
                        <span className="flex items-center gap-2"><Info size={16}/> {t.serviceFee}</span>
                        <span className="font-mono font-bold">+ {serviceFee} TL</span>
                    </div>
                )}

                <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-[#1A2A3A]">{t.totalToPay}</span>
                    <span className="font-bold text-4xl text-[#1A2A3A]">{finalPayable} <span className="text-sm text-gray-400 font-medium">TL</span></span>
                </div>
            </div>

            <button 
                onClick={handleFinalPayment} 
                className="w-full bg-[#1A2A3A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#D4AF37] hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-3 active:scale-95"
            >
                {t.payBtn} {isRTL ? <ArrowLeft size={22}/> : <ArrowRight size={22}/>}
            </button>
            <p className="text-center text-gray-300 text-[10px] uppercase tracking-widest mt-6 font-bold">{t.secureMsg}</p>
        </div>
      </div>
    </div>
  );
}