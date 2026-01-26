'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customBoxOrder, setCustomBoxOrder] = useState<any>(null);

  // فرم ساده
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: ''
  });

  useEffect(() => {
    const savedBox = localStorage.getItem('vela-final-order');
    if (savedBox) setCustomBoxOrder(JSON.parse(savedBox));
  }, []);

  const finalTotal = customBoxOrder ? customBoxOrder.totalPrice : total;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("⚠️ دکمه کلیک شد! (کد جدید فعال است)"); // تست شماره 1
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
                boxName: 'Custom Box', // نام ساده برای جلوگیری از خطا
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
                city: formData.city, country: 'Turkey', zip: formData.zip,
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
      alert(`پاسخ سرور: ${result.success}`); // تست شماره 2

      if (result.success && result.formHtml) {
            clearCart();
            localStorage.removeItem('vela-final-order');
            
            // روش انتحاری و قطعی
            document.documentElement.innerHTML = result.formHtml;
            setTimeout(() => {
                const form = document.querySelector('form');
                if (form) form.submit();
            }, 500);
      } else {
            alert(`خطا: لینک بانک نیامد. (Order: ${result.orderId})`);
            setLoading(false);
      }
    } catch (error: any) {
      alert('خطای اتصال: ' + error.message);
      setLoading(false);
    }
  };

  // اگر صفحه قرمز نشد، یعنی کد آپدیت نشده!
  return (
    <div style={{ backgroundColor: '#ffebee', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h1 style={{ color: 'red', fontWeight: 'bold' }}>⚠️ نسخه تست و عیب‌یابی</h1>
        <p>اگر این کادر قرمز را می‌بینید، یعنی کد آپدیت شده است.</p>
        
        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <input required placeholder="نام" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
            <input required placeholder="نام خانوادگی" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
            <input required placeholder="ایمیل" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
            <input required placeholder="تلفن" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
            <input required placeholder="آدرس" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc' }} />
            
            <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
                <h3>مبلغ قابل پرداخت: {finalTotal} TL</h3>
            </div>

            <button type="submit" disabled={loading} style={{ background: 'red', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }}>
                {loading ? 'در حال اتصال...' : 'ورود به درگاه بانک (تست)'}
            </button>
        </form>
      </div>
    </div>
  );
}