'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Heart, Plus, Minus, ShoppingBag, X, Check } from 'lucide-react';

export default function ProductsPage() {
  const [lang, setLang] = useState('EN');
  
  // --- Shopping Cart State ---
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', zip: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const content: any = {
    EN: {
      title: "All Products", subtitle: "Shop essentials & gifts directly.",
      secBoxes: "Signature Subscription Boxes", secAddons: "Shop Individual Items",
      boxBtn: "Customize Plan", 
      item1: "Handmade Chocolate", item1Desc: "Belgian dark chocolate.",
      item2: "VELA Herbal Tea", item2Desc: "Relaxing blend.",
      item3: "Heat Patch", item3Desc: "Instant pain relief.",
      item4: "Hot Water Bottle", item4Desc: "Cozy comfort.",
      item5: "Organic Pads (10x)", item5Desc: "100% Cotton.",
      item6: "Tampons (10x)", item6Desc: "Premium protection.",
      total: "Total:", itemUnit: "items", checkout: "Proceed to Checkout",
      formTitle: "Quick Checkout", formDesc: "Enter your details to complete the purchase.",
      name: "Full Name", phone: "Phone Number", addr: "Address",
      confirm: "Confirm Order", back: "Back to Shop",
      success: "Order Placed!", track: "Tracking Code:",
      currency: "TL"
    },
    FA: {
      title: "فروشگاه محصولات", subtitle: "خرید مستقیم محصولات تکی و هدایا.",
      secBoxes: "باکس‌های اشتراکی ولا", secAddons: "خرید محصولات تکی",
      boxBtn: "شخصی‌سازی اشتراک", 
      item1: "شکلات دست‌ساز", item1Desc: "شکلات تلخ بلژیکی.",
      item2: "دمنوش گیاهی", item2Desc: "ترکیب آرامش‌بخش.",
      item3: "پچ حرارتی", item3Desc: "تسکین فوری درد.",
      item4: "کیسه آب گرم", item4Desc: "آرامش کلاسیک.",
      item5: "نوار بهداشتی (۱۰تایی)", item5Desc: "۱۰۰٪ کتان ارگانیک.",
      item6: "تامپون (۱۰تایی)", item6Desc: "محافظت پریمیوم.",
      total: "مبلغ قابل پرداخت:", itemUnit: "قلم", checkout: "تکمیل خرید",
      formTitle: "تسویه حساب سریع", formDesc: "برای نهایی کردن خرید مشخصات را وارد کنید.",
      name: "نام و نام خانوادگی", phone: "شماره تماس", addr: "آدرس دقیق پستی",
      confirm: "ثبت سفارش و پرداخت", back: "بازگشت به فروشگاه",
      success: "سفارش با موفقیت ثبت شد!", track: "کد رهگیری شما:",
      currency: "لیر"
    },
    TR: {
      title: "Mağaza", subtitle: "Tekli ürünleri hemen satın al.",
      secBoxes: "Abonelik Kutuları", secAddons: "Tekli Ürünler",
      boxBtn: "Planla",
      item1: "El Yapımı Çikolata", item2: "Bitki Çayı", item3: "Isı Bandı", item4: "Su Torbası", item5: "Ped (10lu)", item6: "Tampon (10lu)",
      total: "Toplam:", checkout: "Ödemeye Geç",
      formTitle: "Hızlı Ödeme", name: "İsim Soyisim", phone: "Telefon", addr: "Adres",
      confirm: "Siparişi Onayla", back: "Geri Dön",
      success: "Sipariş Alındı!", track: "Takip Kodu:",
      currency: "TL"
    },
    RU: {
       title: "Магазин", subtitle: "Покупка товаров.",
       secBoxes: "Подписка", secAddons: "Товары",
       boxBtn: "Настроить",
       total: "Итого:", checkout: "Оплатить",
       formTitle: "Оформление", name: "Имя", phone: "Телефон", addr: "Адрес",
       confirm: "Подтвердить", back: "Назад",
       success: "Успешно!", track: "Код:",
       currency: "TL"
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

  // --- Data ---
  const boxes = [
    { id: 'essential', name: 'Essential Box', price: 380, img: '/images/essential.jpg' },
    { id: 'care', name: 'Care Box', price: 680, img: '/images/care.jpg' },
    { id: 'bliss', name: 'Bliss Box', price: 1350, img: '/images/bliss.jpg' },
  ];

  // --- Updated Retail Prices (Higher than Subscription Add-ons) ---
  const essentials = [
    { id: 'pads10', name: t.item5, desc: t.item5Desc, price: 290, img: '/images/pads.jpg' }, 
    { id: 'tampons10', name: t.item6, desc: t.item6Desc, price: 320, img: '/images/tampons.jpg' }, 
    { id: 'chocolate', name: t.item1, desc: t.item1Desc, price: 220, img: '/images/chocolate.jpg' },
    { id: 'tea', name: t.item2, desc: t.item2Desc, price: 180, img: '/images/tea.jpg' },
    { id: 'patch', name: t.item3, desc: t.item3Desc, price: 120, img: '/images/patch.jpg' },
    { id: 'bottle', name: t.item4, desc: t.item4Desc, price: 580, img: '/images/bottle.jpg' },
  ];

  // --- Cart Logic ---
  const updateCart = (id: string, delta: number) => {
      setCart(prev => {
          const newCount = (prev[id] || 0) + delta;
          if (newCount <= 0) {
              const { [id]: _, ...rest } = prev;
              return rest;
          }
          return { ...prev, [id]: newCount };
      });
  };

  const calculateTotal = () => {
      let total = 0;
      essentials.forEach(item => {
          if (cart[item.id]) total += item.price * cart[item.id];
      });
      return total;
  };

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // --- Payment Logic ---
  const handleDirectBuy = async () => {
      if (!formData.name || !formData.phone || !formData.address) {
          alert(lang === 'FA' ? "لطفاً تمام فیلدها را پر کنید" : "Please fill all fields");
          return;
      }

      const code = "SHOP-" + Math.floor(100000 + Math.random() * 900000);
      setTrackingCode(code);

      const itemsList = Object.entries(cart).map(([id, count]) => {
          const product = essentials.find(e => e.id === id);
          return `${product?.name} (${count}x)`;
      }).join(' + ');

      const payload = {
          trackingCode: code,
          formData: formData,
          totalPrice: calculateTotal(),
          orderDetails: {
              boxName: "Direct Shop Order",
              subscription: "One-Time",
              pads: "-",
              tampons: "-",
              extras: itemsList
          }
      };

      try {
          const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
          });
          if (res.ok) setIsSuccess(true);
      } catch (err) {
          console.error(err);
      }
  };

  // --- RENDER ---
  
  if (isSuccess) {
      return (
        <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg"><Check size={48}/></div>
            <h2 className="text-4xl font-serif font-bold text-[#1A2A3A] mb-4">{t.success}</h2>
            <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 mb-8">
                <p className="text-gray-500 text-sm uppercase tracking-widest">{t.track}</p>
                <p className="text-3xl font-mono font-bold text-[#1A2A3A]">{trackingCode}</p>
            </div>
            <Link href="/" className="px-8 py-3 bg-[#1A2A3A] text-white rounded-xl font-bold">{t.back}</Link>
        </div>
      );
  }

  if (isCheckout) {
      return (
          <div className="min-h-screen bg-[#F9F7F2] py-28 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="max-w-md mx-auto bg-white p-8 rounded-[2rem] shadow-2xl animate-scale-in relative">
                  <button onClick={() => setIsCheckout(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition"><X size={20}/></button>
                  
                  <h2 className="text-2xl font-serif font-bold text-[#1A2A3A] mb-2">{t.formTitle}</h2>
                  <p className="text-gray-500 text-sm mb-6">{t.formDesc}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                      {Object.entries(cart).map(([id, count]) => {
                          const item = essentials.find(e => e.id === id);
                          if (!item) return null;
                          return (
                              <div key={id} className="flex justify-between text-sm mb-2 text-[#1A2A3A]">
                                  <span>{item.name} <span className="text-gray-400">x{count}</span></span>
                                  <span className="font-bold">{item.price * count}</span>
                              </div>
                          );
                      })}
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-lg text-[#D4AF37]">
                          <span>{t.total}</span>
                          <span>{calculateTotal()} {t.currency}</span>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <input type="text" placeholder={t.name} className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" onChange={e => setFormData({...formData, name: e.target.value})}/>
                      <input type="tel" placeholder={t.phone} className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" onChange={e => setFormData({...formData, phone: e.target.value})}/>
                      <textarea placeholder={t.addr} rows={3} className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" onChange={e => setFormData({...formData, address: e.target.value})}/>
                      
                      <button onClick={handleDirectBuy} className="w-full bg-[#1A2A3A] text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition shadow-lg flex items-center justify-center gap-2">
                          {t.confirm} <ArrowRight size={18}/>
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  // 3. MAIN SHOP VIEW
  return (
    <div className="min-h-screen bg-[#F9F7F2] py-28 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-serif font-bold text-[#1A2A3A] mb-4">{t.title}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Section 1: Subscription Boxes (Link Only) */}
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-[#1A2A3A] mb-6 border-b pb-2">{t.secBoxes}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {boxes.map((box) => (
                    <div key={box.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4 group">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl relative overflow-hidden shrink-0">
                            <Image src={box.img} alt={box.name} fill className="object-cover"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[#1A2A3A]">{box.name}</h3>
                            <p className="text-sm text-[#D4AF37] font-bold">{box.price} {t.currency} / month</p>
                        </div>
                        <Link href={`/box-builder?type=${box.id}`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1A2A3A] group-hover:bg-[#1A2A3A] group-hover:text-white transition">
                            <ArrowRight size={18}/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* Section 2: Individual Products (Shop) */}
        <div className="mb-32">
            <h2 className="text-2xl font-bold text-[#1A2A3A] mb-6 border-b pb-2">{t.secAddons}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {essentials.map((item) => {
                    const count = cart[item.id] || 0;
                    return (
                        <div key={item.id} className={`bg-white rounded-[2rem] p-4 transition-all duration-300 border-2 ${count > 0 ? 'border-[#D4AF37] shadow-lg scale-105' : 'border-transparent hover:border-gray-200 shadow-sm'}`}>
                            <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4 bg-gray-50">
                                <Image src={item.img} alt={item.name} fill className="object-cover"/>
                                {count > 0 && <div className="absolute top-2 right-2 bg-[#D4AF37] text-white text-xs font-bold px-2 py-1 rounded-full">{count}x</div>}
                            </div>
                            <h4 className="font-bold text-[#1A2A3A] text-lg leading-tight mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 mb-4 h-8 overflow-hidden">{item.desc}</p>
                            
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-[#1A2A3A]">{item.price} {t.currency}</span>
                                
                                {count === 0 ? (
                                    <button onClick={() => updateCart(item.id, 1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white transition">
                                        <Plus size={18}/>
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 bg-[#1A2A3A] rounded-full px-1 py-1">
                                        <button onClick={() => updateCart(item.id, -1)} className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40"><Minus size={14}/></button>
                                        <span className="text-white text-sm font-bold min-w-[10px] text-center">{count}</span>
                                        <button onClick={() => updateCart(item.id, 1)} className="w-6 h-6 rounded-full bg-white text-[#1A2A3A] flex items-center justify-center"><Plus size={14}/></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {cartItemCount > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-[#1A2A3A] text-white p-4 rounded-2xl shadow-2xl z-50 flex justify-between items-center animate-slide-up">
                <div className="flex items-center gap-3">
                    <div className="bg-[#D4AF37] w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#1A2A3A]">{cartItemCount}</div>
                    <div>
                        <span className="text-xs text-gray-300 block">{t.total}</span>
                        <span className="font-bold text-xl">{calculateTotal()} {t.currency}</span>
                    </div>
                </div>
                <button onClick={() => setIsCheckout(true)} className="bg-white text-[#1A2A3A] px-6 py-2 rounded-xl font-bold hover:bg-[#D4AF37] transition flex items-center gap-2">
                    {t.checkout} <ArrowRight size={16}/>
                </button>
            </div>
        )}

      </div>
    </div>
  );
}