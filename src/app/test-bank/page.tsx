'use client';

import { useState } from 'react';

export default function TestBankPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('منتظر تست...');

  const handleTest = async () => {
    setLoading(true);
    setStatus('در حال ارسال درخواست...');

    try {
      // ارسال یک درخواست تستی ثابت
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // دیتای تستی برای فریب دادن API
          customer: {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            phone: '05555555555',
            address: 'Test Address',
            city: 'Istanbul',
            country: 'Turkey',
            zip: '34000'
          },
          items: [{ name: 'Test Product', price: 10, quantity: 1 }],
          total: 10,
          currency: 'TRY'
        }),
      });

      const result = await response.json();

      if (result.success && result.formHtml) {
        setStatus('✅ موفقیت! فرم بانک دریافت شد.');
        
        // نمایش فرم دریافتی
        const div = document.createElement('div');
        div.innerHTML = result.formHtml;
        document.body.appendChild(div);
        
        // تلاش برای رفتن به بانک
        setTimeout(() => {
             const form = div.querySelector('form');
             if(form) form.submit();
        }, 1000);
      } else {
        setStatus('❌ خطا: ' + JSON.stringify(result));
      }
    } catch (error: any) {
      setStatus('❌ خطای اتصال: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 50, direction: 'rtl', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>🧪 صفحه تست اضطراری درگاه</h1>
      <p>این صفحه مستقل از بقیه سایت است.</p>
      
      <div style={{ margin: '20px 0', padding: 20, background: '#eee', borderRadius: 10 }}>
        وضعیت: <strong>{status}</strong>
      </div>

      <button 
        onClick={handleTest}
        disabled={loading}
        style={{
            padding: '15px 30px',
            fontSize: 20,
            background: loading ? '#ccc' : 'blue',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
        }}
      >
        {loading ? 'در حال تست...' : 'تست اتصال به بانک (۱۰ لیر)'}
      </button>
    </div>
  );
}