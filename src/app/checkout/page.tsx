'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// بدون هیچ آیکون یا پکیج اضافی که باعث ارور شود
export default function CheckoutPage() {
  const { cart, clearCart, total } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customBoxOrder, setCustomBoxOrder] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: ''
  });

  useEffect(() => {
    const savedBox = localStorage.getItem('vela-final-order');
    if (savedBox) {
        try {
            setCustomBoxOrder(JSON.parse(savedBox));
        } catch(e) { console.error(e); }
    }
  }, []);

  const finalTotal = customBoxOrder ? customBoxOrder.totalPrice : total;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let requestBody: any = {};
    // ساخت درخواست با ساده‌ترین حالت ممکن
    if (customBoxOrder) {
        requestBody = {
            formData: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email, phone: formData.phone, address: formData.address, zip: formData.zip
            },
            totalPrice: finalTotal,
            orderDetails: {
                boxName: 'Custom Box',
                subscription: customBoxOrder.cycle,
                pads: 'Selected Pads',
                tampons: 'Selected Tampons',
                extras: 'Custom'
            }
        };
    } else {
        requestBody = {
            customer: {
                first_name: formData.firstName, last_name: formData.lastName,
                email: formData.email, phone: formData.phone, address: formData.address,
                city: 'Istanbul', country: 'Turkey', zip: formData.zip,
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

      if (result.success && result.formHtml) {
            clearCart();
            localStorage.removeItem('vela-final-order');
            
            // روش انتحاری: کل صفحه را سفید کن و فرم را بنویس
            document.body.innerHTML = result.formHtml;
            setTimeout(() => {
                const form = document.querySelector('form');
                if (form) form.submit();
            }, 100);
      } else {
            alert('Error: ' + JSON.stringify(result));
            setLoading(false);
      }
    } catch (error: any) {
      alert('Connection Error: ' + error.message);
      setLoading(false);
    }
  };

  // طراحی با استایل ساده HTML (بدون کلاس‌های پیچیده)
  return (
    <div style={{ padding: '40px', background: '#e0f7fa', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '15px', maxWidth: '500px', width: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ color: '#006064', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
           ✅ تست نهایی (نسخه بدون آیکون)
        </h1>
        
        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input required placeholder="نام" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
            <input required placeholder="نام خانوادگی" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
            <input required placeholder="ایمیل" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
            <input required placeholder="تلفن" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />
            <textarea required placeholder="آدرس" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} />

            <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '8px', border: '1px solid #ffcc80' }}>
                <p style={{ fontWeight: 'bold', color: '#e65100', margin: 0 }}>مبلغ کل: {finalTotal} TL</p>
            </div>

            <button type="submit" disabled={loading} style={{ background: '#006064', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', marginTop: '10px' }}>
                {loading ? 'در حال انتقال به بانک...' : 'پرداخت نهایی'}
            </button>
        </form>

        <button onClick={() => router.push('/')} style={{ marginTop: '20px', background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', width: '100%' }}>
            بازگشت به خانه
        </button>
      </div>
    </div>
  );
}