'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Info, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

// --- اطلاعات پایه باکس‌ها (برای محاسبه قیمت دقیق) ---
const BOX_DATA: any = {
  essential: { basePrice: 380 },
  care: { basePrice: 680 },
  bliss: { basePrice: 1350 },
};

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  
  // فرم آدرس (اگر از قبل پر نشده باشد)
  const [formData, setFormData] = useState({ 
    name: '', phone: '', address: '', zip: '' 
  });

  // 🔴 لیست کامل لینک‌های شاپیر شما 🔴
  const PAYMENT_LINKS: { [key: number]: string } = {
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
    // خواندن اطلاعات ذخیره شده از مرحله قبل (BoxBuilder)
    const saved = localStorage.getItem('vela-temp-order');
    if (saved) {
        try { 
            const parsed = JSON.parse(saved);
            setOrderData(parsed);
            // اگر کاربر قبلا فرم را پر کرده بود، اینجا بنشیند
            if(parsed.formData) setFormData(parsed.formData);
        } catch(e) {
            console.error("Error parsing order", e);
        }
    } else {
        // اگر دیتایی نبود برگردد به صفحه اصلی
        router.push('/');
    }
  }, [router]);

  // --- ۱. محاسبه دقیق قیمت (دقیقا مشابه BoxBuilder) ---
  const calculateExactTotal = () => {
    if (!orderData) return 0;

    const { selectedBoxId, hasTampon, tamponCount, extras, subscription } = orderData;
    // اگر باکس پیدا نشد، پیش‌فرض essential
    const box = BOX_DATA[selectedBoxId] || BOX_DATA['essential'];

    let total = box.basePrice;

    // اضافه کردن قیمت تامپون
    if (hasTampon) total += (tamponCount * 5);

    // اضافه کردن قیمت اکستراها
    if (extras) {
        total += (extras.chocolate || 0) * 80;
        total += (extras.tea || 0) * 60;
        total += (extras.heatPatch || 0) * 40;
        total += (extras.hotWaterBottle || 0) * 150;
    }

    // اعمال ضریب اشتراک (۳ ماهه ۵٪ ، ۶ ماهه ۱۰٪)
    total = total * subscription;
    if (subscription === 3) total = total * 0.95;
    if (subscription === 6) total = total * 0.90;

    return Math.round(total);
  };

  const exactTotal = calculateExactTotal();

  // --- ۲. الگوریتم هوشمند: پیدا کردن نزدیک‌ترین لینک بالاتر ---
  const getPayableAmount = (price: number) => {
    // تبدیل کلیدهای آبجکت لینک‌ها به آرایه اعداد و مرتب‌سازی
    const availablePrices = Object.keys(PAYMENT_LINKS)
                            .map(Number)
                            .sort((a, b) => a - b);

    // پیدا کردن اولین قیمتی که بزرگتر یا مساوی قیمت مشتری باشد
    const foundPrice = availablePrices.find(p => p >= price);

    // اگر پیدا شد برگردان، اگر نه (یعنی قیمت خیلی بالاتر است) آخرین لینک (۸۰۰۰) را برگردان
    return foundPrice || availablePrices[availablePrices.length - 1];
  };

  const finalPayable = getPayableAmount(exactTotal);
  const serviceFee = finalPayable - exactTotal;

  // --- ۳. انجام پرداخت و ذخیره در دیتابیس ---
  const handleFinalPayment = async () => {
    setLoading(true);

    // پیدا کردن لینک نهایی
    const link = PAYMENT_LINKS[finalPayable];

    if (!link) {
        alert('Payment link not found. Please contact support.');
        setLoading(false);
        return;
    }

    // ذخیره نهایی در دیتابیس (Supabase)
    try {
        await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...orderData,
                formData, // اطلاعات نهایی آدرس
                paidAmount: finalPayable, // مبلغی که پرداخت کرده
                realPrice: exactTotal, // مبلغ واقعی محصولات
                status: 'pending_payment'
            }),
        });
        
        // پاک کردن حافظه موقت
        localStorage.removeItem('vela-temp-order');

        // هدایت به شاپیر
        window.location.href = link;

    } catch (e) {
        alert('Connection Error. Please try again.');
        setLoading(false);
    }
  };

  if (!orderData) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-12 px-4 flex justify-center items-start pt-24">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* فرم آدرس (قابلیت ویرایش نهایی) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-serif font-bold text-[#1A2A3A] mb-6">Shipping Details</h2>
            <div className="space-y-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                    <input value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[#D4AF37] outline-none"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
                    <input value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 focus:border-[#D4AF37] outline-none"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Address</label>
                    <textarea rows={3} value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 resize-none focus:border-[#D4AF37] outline-none"/>
                </div>
            </div>
        </div>

        {/* کارت خلاصه پرداخت */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-[#D4AF37]/20 h-fit animate-fade-in-up">
            <h2 className="text-xl font-serif font-bold text-[#1A2A3A] mb-6 flex items-center gap-2">
                Payment Summary <Check className="text-green-500" size={20}/>
            </h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Products Total</span>
                    <span className="font-mono font-bold">{exactTotal} TL</span>
                </div>
                
                {/* نمایش شفاف هزینه سرویس (فقط اگر اختلاف وجود داشته باشد) */}
                {serviceFee > 0 && (
                    <div className="flex justify-between text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                        <span className="flex items-center gap-1"><Info size={14}/> Service & Handling Fee</span>
                        <span className="font-mono">+ {serviceFee} TL</span>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-center">
                    <span className="font-bold text-lg text-[#1A2A3A]">Total to Pay</span>
                    <span className="font-bold text-3xl text-[#1A2A3A]">{finalPayable} <span className="text-sm text-gray-400">TL</span></span>
                </div>
            </div>

            <button 
                onClick={handleFinalPayment} 
                disabled={loading}
                className="w-full bg-[#1A2A3A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin"/> : <>Pay Securely <ArrowRight size={20}/></>}
            </button>
            
            <div className="mt-4 flex justify-center gap-4 opacity-50">
               {/* می‌توانید لوگوی ویزا/مسترکارت بگذارید */}
               <span className="text-[10px] text-gray-400">Secured by Shopier Payment Gateway</span>
            </div>
        </div>

      </div>
    </div>
  );
}