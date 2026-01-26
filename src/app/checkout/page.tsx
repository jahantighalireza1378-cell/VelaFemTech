'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Lock, CreditCard, Package } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, total: cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // استیت برای ذخیره سفارش باکس (اگر از صفحه Customize آمده باشد)
  const [customBoxOrder, setCustomBoxOrder] = useState<any>(null);

  // فرم اطلاعات مشتری
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Turkey',
    zip: '',
  });

  // دیکشنری ترجمه
  const t: any = {
    en: {
      title: 'Checkout',
      details: 'Shipping Details',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Full Address',
      city: 'City',
      pay: 'Pay Securely',
      summary: 'Order Summary',
      total: 'Total',
      empty: 'Your cart is empty.',
      back: 'Go back to shop',
      processing: 'Connecting to Bank...',
      boxTitle: 'Custom VELA Box',
    },
    fa: {
      title: 'تسویه حساب',
      details: 'اطلاعات ارسال',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      email: 'آدرس ایمیل',
      phone: 'شماره تماس',
      address: 'آدرس کامل',
      city: 'شهر',
      pay: 'پرداخت امن',
      summary: 'خلاصه سفارش',
      total: 'مجموع',
      empty: 'سبد خرید شما خالی است.',
      back: 'بازگشت به فروشگاه',
      processing: 'در حال اتصال به بانک...',
      boxTitle: 'باکس اختصاصی VELA',
    },
  };

  const lang = 'fa'; // زبان پیش‌فرض
  const text = t[lang] || t.en;

  // بررسی اینکه آیا سفارشی وجود دارد؟ (یا در سبد خرید یا در حافظه باکس)
  useEffect(() => {
    // 1. چک کردن باکس شخصی‌سازی شده
    const savedBox = localStorage.getItem('vela-final-order');
    if (savedBox) {
      try {
        setCustomBoxOrder(JSON.parse(savedBox));
      } catch (e) {
        console.error("Error parsing box order", e);
      }
    }
  }, []);

  // محاسبه قیمت نهایی (یا از سبد خرید یا از باکس)
  const finalTotal = customBoxOrder ? customBoxOrder.totalPrice : cartTotal;
  const hasItem = cart.length > 0 || customBoxOrder;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ساختن بدنه درخواست بر اساس نوع سفارش
    let requestBody: any = {};

    if (customBoxOrder) {
        // --- سناریو ۱: پرداخت باکس شخصی ---
        requestBody = {
            formData: { // فرمت مخصوص باکس که در API هندل کردیم
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                zip: formData.zip
            },
            totalPrice: finalTotal,
            orderDetails: {
                boxName: customBoxOrder.title?.en || 'Custom Box',
                subscription: customBoxOrder.cycle,
                pads: `Pads: ${customBoxOrder.finalQuantities?.pads?.count || 0}`,
                tampons: `Tampons: ${customBoxOrder.finalQuantities?.tampons?.count || 0}`,
                extras: 'Custom Selection'
            }
        };
    } else {
        // --- سناریو ۲: پرداخت سبد خرید معمولی ---
        requestBody = {
            customer: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                zip: formData.zip,
            },
            items: cart,
            total: finalTotal,
            currency: 'TRY'
        };
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.success) {
        clearCart(); // خالی کردن سبد
        localStorage.removeItem('vela-final-order'); // خالی کردن باکس ذخیره شده

        if (result.formHtml) {
            document.open();
            document.write(result.formHtml);
            document.close();
        } else {
            alert('Order Created!');
            router.push('/');
        }
      } else {
        alert('Error: ' + result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (!hasItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2]">
        <h2 className="text-2xl font-bold text-[#1A2A3A] mb-4">{text.empty}</h2>
        <button onClick={() => router.push('/')} className="bg-[#D4AF37] text-white px-6 py-2 rounded-xl">
          {text.back}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ستون چپ: فرم اطلاعات */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-[#E5E7EB]">
          <h1 className="text-2xl font-bold text-[#1A2A3A] mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            {text.details}
          </h1>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder={text.firstName} type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none" />
              <input required placeholder={text.lastName} type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none" />
            </div>
            <input required placeholder={text.email} type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none" />
            <input required placeholder={text.phone} type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none" />
            <textarea required placeholder={text.address} rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none resize-none" />
            <input required placeholder={text.city} type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none" />

            <button type="submit" disabled={loading} className="w-full mt-6 bg-[#1A2A3A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] transition-all flex justify-center items-center gap-2">
              {loading ? <span>{text.processing}</span> : <>{text.pay} - {finalTotal} TL</>}
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Secured by Shopier Payments.</p>
          </form>
        </div>

        {/* ستون راست: خلاصه سفارش */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#1A2A3A] mb-4">{text.summary}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              
              {/* اگر باکس شخصی باشد */}
              {customBoxOrder ? (
                 <div className="flex gap-4 items-start border-b border-gray-100 pb-4">
                    <div className="w-16 h-16 bg-vela-gold/20 rounded-lg flex items-center justify-center text-vela-gold">
                        <Package size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-[#1A2A3A]">{customBoxOrder.title?.fa || text.boxTitle}</h3>
                        <p className="text-sm text-gray-500">Plan: {customBoxOrder.cycle} Month(s)</p>
                        <div className="text-xs text-gray-400 mt-1">
                            Pads: {customBoxOrder.finalQuantities?.pads?.count} | 
                            Tampons: {customBoxOrder.finalQuantities?.tampons?.count}
                        </div>
                    </div>
                    <p className="font-bold text-[#D4AF37]">{customBoxOrder.totalPrice} TL</p>
                 </div>
              ) : (
                // اگر سبد خرید معمولی باشد
                cart.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                        {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1A2A3A]">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#D4AF37]">{item.price} TL</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center gap-1 justify-end"><Trash2 className="w-3 h-3" /> Remove</button>
                      </div>
                    </div>
                ))
              )}

            </div>
            <div className="border-t border-dashed border-gray-300 my-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-[#1A2A3A]">
                <span>{text.total}</span>
                <span>{finalTotal} TL</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}