'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Lock, Package } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, total: cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customBoxOrder, setCustomBoxOrder] = useState<any>(null);

  // فرم اطلاعات مشتری
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', country: 'Turkey', zip: '',
  });

  const t: any = {
    en: {
      title: 'Checkout', details: 'Shipping Details', firstName: 'First Name', lastName: 'Last Name',
      email: 'Email', phone: 'Phone', address: 'Address', city: 'City', pay: 'Pay Securely',
      summary: 'Order Summary', total: 'Total', empty: 'Cart is empty', back: 'Back',
      processing: 'Connecting to Bank...', boxTitle: 'Custom VELA Box',
    },
    fa: {
      title: 'تسویه حساب', details: 'اطلاعات ارسال', firstName: 'نام', lastName: 'نام خانوادگی',
      email: 'ایمیل', phone: 'شماره تماس', address: 'آدرس', city: 'شهر', pay: 'پرداخت امن',
      summary: 'خلاصه سفارش', total: 'مجموع', empty: 'سبد خالی است', back: 'بازگشت',
      processing: 'در حال اتصال به بانک...', boxTitle: 'باکس اختصاصی VELA',
    },
  };
  const lang = 'fa';
  const text = t[lang] || t.en;

  useEffect(() => {
    const savedBox = localStorage.getItem('vela-final-order');
    if (savedBox) setCustomBoxOrder(JSON.parse(savedBox));
  }, []);

  const finalTotal = customBoxOrder ? customBoxOrder.totalPrice : cartTotal;
  const hasItem = cart.length > 0 || customBoxOrder;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let requestBody: any = {};
    if (customBoxOrder) {
        requestBody = {
            formData: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email, phone: formData.phone, address: formData.address, zip: formData.zip
            },
            totalPrice: finalTotal,
            orderDetails: {
                boxName: customBoxOrder.title?.en || 'Custom Box',
                subscription: customBoxOrder.cycle,
                pads: `Pads: ${customBoxOrder.finalQuantities?.pads?.count}`,
                tampons: `Tampons: ${customBoxOrder.finalQuantities?.tampons?.count}`,
                extras: 'Custom'
            }
        };
    } else {
        requestBody = {
            customer: {
                first_name: formData.firstName, last_name: formData.lastName,
                email: formData.email, phone: formData.phone, address: formData.address,
                city: formData.city, country: formData.country, zip: formData.zip,
            },
            items: cart, total: finalTotal, currency: 'TRY'
        };
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (result.success) {
        if (result.formHtml) {
            clearCart();
            localStorage.removeItem('vela-final-order');
            
            // ✅ روش استاندارد و امن برای اجرای فرم بانک
            const div = document.createElement('div');
            div.innerHTML = result.formHtml;
            document.body.appendChild(div);
            const form = div.querySelector('form');
            if (form) {
                form.submit();
            } else {
                alert("Bank form received but valid form tag not found.");
            }
        } else {
            alert(`هشدار: سفارش ثبت شد اما لینک بانک دریافت نشد!\nOrder ID: ${result.orderId}`);
            setLoading(false);
        }
      } else {
        alert('Error: ' + result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Connection Error. Check console.');
      setLoading(false);
    }
  };

  if (!hasItem) return <div className="p-10 text-center"><button onClick={() => router.push('/')}>{text.back}</button></div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Lock className="text-[#D4AF37]" /> {text.details}</h1>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder={text.firstName} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none" />
              <input required placeholder={text.lastName} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none" />
            </div>
            <input required placeholder={text.email} type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none" />
            <input required placeholder={text.phone} type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none" />
            <textarea required placeholder={text.address} rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none resize-none" />
            <input required placeholder={text.city} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-3 rounded-lg border bg-gray-50 outline-none" />
            <button type="submit" disabled={loading} className="w-full mt-6 bg-[#1A2A3A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] transition-all">
              {loading ? text.processing : `${text.pay} - ${finalTotal} TL`}
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Secured by Shopier Payments.</p>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
            <h2 className="text-xl font-bold mb-4">{text.summary}</h2>
            {customBoxOrder ? (
               <div className="flex gap-4 items-center border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 bg-vela-gold/20 rounded-lg flex items-center justify-center text-vela-gold"><Package /></div>
                  <div className="flex-1"><h3 className="font-semibold">{text.boxTitle}</h3><p className="text-sm text-gray-500">{customBoxOrder.cycle} Months</p></div>
                  <p className="font-bold text-[#D4AF37]">{customBoxOrder.totalPrice} TL</p>
               </div>
            ) : (
              cart.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 items-center border-b pb-4"><div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">{item.image && <Image src={item.image} fill className="object-cover" alt=""/>}</div><div className="flex-1"><h3>{item.name}</h3></div><p className="font-bold text-[#D4AF37]">{item.price} TL</p><button onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 size={14}/></button></div>
              ))
            )}
            <div className="pt-4 flex justify-between font-bold text-lg"><span>{text.total}</span><span>{finalTotal} TL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}