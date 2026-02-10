'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plus, Minus, X } from 'lucide-react';

export default function ProductsPage() {
  const [lang, setLang] = useState('EN');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'EN');
  }, []);

  const content: any = {
    EN: { title: "Shop", total: "Total:", checkout: "Checkout", formTitle: "Quick Checkout", name: "Name", phone: "Phone", addr: "Address", confirm: "Confirm & Pay", currency: "TL" },
    FA: { title: "فروشگاه", total: "مبلغ:", checkout: "تسویه حساب", formTitle: "تکمیل خرید", name: "نام", phone: "تلفن", addr: "آدرس", confirm: "تایید و پرداخت", currency: "لیر" },
  };
  const t = content[lang] || content['EN'];
  const isRTL = lang === 'FA';

  const essentials = [
    { id: 'pads10', name: "Organic Pads (10x)", price: 290, img: '/images/pads.jpg' }, 
    { id: 'tampons10', name: "Tampons (10x)", price: 320, img: '/images/tampons.jpg' }, 
    { id: 'chocolate', name: "Chocolate", price: 220, img: '/images/chocolate.jpg' },
    { id: 'tea', name: "Herbal Tea", price: 180, img: '/images/tea.jpg' },
    { id: 'patch', name: "Heat Patch", price: 120, img: '/images/patch.jpg' },
  ];

  const updateCart = (id: string, delta: number) => {
      setCart(prev => {
          const newCount = (prev[id] || 0) + delta;
          if (newCount <= 0) { const { [id]: _, ...rest } = prev; return rest; }
          return { ...prev, [id]: newCount };
      });
  };

  const calculateTotal = () => {
      let total = 0;
      essentials.forEach(item => { if (cart[item.id]) total += item.price * cart[item.id]; });
      return total;
  };

  // 🔴🔴🔴 FIX REDIRECT 🔴🔴🔴
  const handleDirectBuy = (e: any) => {
      e.preventDefault(); // جلوگیری از رفرش شدن صفحه

      if (!formData.name || !formData.phone || !formData.address) {
          alert("Please fill all fields");
          return;
      }

      const total = calculateTotal();
      if (total === 0) {
          alert("Cart is empty!");
          return;
      }

      const itemsList = Object.entries(cart).map(([id, count]) => {
          const product = essentials.find(e => e.id === id);
          return `${product?.name || id} (x${count})`;
      }).join(', ');

      const payload = {
          selectedBoxId: "SHOP-ORDER",
          subscription: 1, hasTampon: false, tamponCount: 0,
          extras: itemsList, formData: formData, totalPrice: total, lang: lang
      };

      // ذخیره و هدایت اجباری
      localStorage.setItem('vela-temp-order', JSON.stringify(payload));
      
      console.log("Redirecting to checkout with:", payload);
      window.location.href = '/checkout';
  };

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-28 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold text-center mb-10">{t.title}</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {essentials.map((item) => {
              const count = cart[item.id] || 0;
              return (
                  <div key={item.id} className={`bg-white rounded-2xl p-4 border-2 transition ${count > 0 ? 'border-[#D4AF37]' : 'border-transparent'}`}>
                      <div className="relative h-40 w-full bg-gray-100 rounded-xl mb-4 overflow-hidden">
                          <Image src={item.img} alt={item.name} fill className="object-cover"/>
                      </div>
                      <h4 className="font-bold">{item.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-[#D4AF37]">{item.price} {t.currency}</span>
                          <div className="flex items-center gap-2">
                              {count > 0 && <button onClick={() => updateCart(item.id, -1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><Minus size={14}/></button>}
                              {count > 0 && <span className="font-bold">{count}</span>}
                              <button onClick={() => updateCart(item.id, 1)} className="w-8 h-8 bg-[#1A2A3A] text-white rounded-full flex items-center justify-center"><Plus size={14}/></button>
                          </div>
                      </div>
                  </div>
              );
          })}
      </div>

      {/* Checkout Bar */}
      {cartItemCount > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-[#1A2A3A] text-white p-4 rounded-2xl shadow-xl flex justify-between items-center z-40">
              <span className="font-bold text-xl">{calculateTotal()} {t.currency}</span>
              <button onClick={() => setIsCheckout(true)} className="bg-white text-[#1A2A3A] px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                  {t.checkout} <ArrowRight size={16}/>
              </button>
          </div>
      )}

      {/* Checkout Modal */}
      {isCheckout && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-3xl w-full max-w-md relative animate-scale-in">
                  <button onClick={() => setIsCheckout(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"><X size={20}/></button>
                  <h2 className="text-2xl font-bold mb-6">{t.formTitle}</h2>
                  
                  <form onSubmit={handleDirectBuy} className="space-y-4">
                      <input required placeholder={t.name} className="w-full p-4 rounded-xl border bg-gray-50" onChange={e => setFormData({...formData, name: e.target.value})}/>
                      <input required placeholder={t.phone} className="w-full p-4 rounded-xl border bg-gray-50" onChange={e => setFormData({...formData, phone: e.target.value})}/>
                      <textarea required placeholder={t.addr} className="w-full p-4 rounded-xl border bg-gray-50" onChange={e => setFormData({...formData, address: e.target.value})}/>
                      
                      <div className="pt-4 border-t flex justify-between items-center">
                          <span className="text-xl font-bold">{calculateTotal()} {t.currency}</span>
                          <button type="submit" className="bg-[#1A2A3A] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#D4AF37] transition">
                              {t.confirm} <ArrowRight size={18}/>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
}