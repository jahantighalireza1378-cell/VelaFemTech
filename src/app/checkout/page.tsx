'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
  const t = {
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
    },
  };

  const lang = 'en'; // یا می‌توانید از Context زبان بگیرید
  const text = t[lang] || t.en;

  // اگر سبد خرید خالی بود (اختیاری)
  useEffect(() => {
    if (cart.length === 0) {
       // router.push('/'); 
    }
  }, [cart, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. ارسال اطلاعات به API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          total: total,
          currency: 'TRY'
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ سبد خرید را خالی می‌کنیم چون سفارش ثبت شده
        clearCart();

        // ✅ بررسی می‌کنیم آیا فرم بانک دریافت شده است؟
        if (result.formHtml) {
            // این کد جادویی است که صفحه را پاک می‌کند و فرم شاپیر را می‌نویسد و ارسال می‌کند
            document.open();
            document.write(result.formHtml);
            document.close();
        } else {
            // اگر به هر دلیلی فرم نیامد
            alert('Order Created successfully!');
            router.push('/');
        }

      } else {
        alert('Error: ' + result.error);
        setLoading(false); // اگر خطا داد، دکمه را دوباره فعال کن
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
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
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{text.firstName}</label>
                <input
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{text.lastName}</label>
                <input
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{text.email}</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{text.phone}</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{text.address}</label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>
            
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{text.city}</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full p-3 rounded-lg border bg-gray-50 focus:border-[#D4AF37] outline-none"
                />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#1A2A3A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] transition-all flex justify-center items-center gap-2"
            >
              {loading ? (
                <span>{text.processing}</span>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {text.pay} - {total} TL
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Secured by Shopier Payments. Returns accepted within 14 days.
            </p>
          </form>
        </div>

        {/* ستون راست: خلاصه سفارش */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#1A2A3A] mb-4">{text.summary}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {cart.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                    {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1A2A3A]">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#D4AF37]">{item.price} TL</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center gap-1 justify-end"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-300 my-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-[#1A2A3A]">
                <span>{text.total}</span>
                <span>{total} TL</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}