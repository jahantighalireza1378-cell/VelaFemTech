'use client';

import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [lang, setLang] = useState('FA');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
  }, []);

  const content: any = {
    FA: {
      title: "تماس با ما",
      subtitle: "ما اینجا هستیم تا به سوالات شما پاسخ دهیم.",
      form: { name: "نام شما", email: "ایمیل", subject: "موضوع", msg: "پیام شما", btn: "ارسال پیام" },
      info: { title: "اطلاعات تماس", addr: "آلانیا، ترکیه - منطقه محموت‌لار", email: "velafemtech@gmail.com" },
      success: "پیام شما دریافت شد! به زودی پاسخ می‌دهیم."
    },
    EN: {
      title: "Contact Us",
      subtitle: "We are here to help and answer any questions.",
      form: { name: "Your Name", email: "Email Address", subject: "Subject", msg: "Your Message", btn: "Send Message" },
      info: { title: "Contact Info", addr: "Alanya, Turkey - Mahmutlar District", email: "velafemtech@gmail.com" },
      success: "Message received! We'll get back to you soon."
    },
    TR: {
      title: "İletişim",
      subtitle: "Sorularınızı yanıtlamak için buradayız.",
      form: { name: "Adınız", email: "E-posta", subject: "Konu", msg: "Mesajınız", btn: "Gönder" },
      info: { title: "İletişim Bilgileri", addr: "Alanya, Türkiye - Mahmutlar", email: "velafemtech@gmail.com" },
      success: "Mesajınız alındı! Yakında döneceğiz."
    },
    RU: {
      title: "Контакты",
      subtitle: "Мы здесь, чтобы ответить на ваши вопросы.",
      form: { name: "Имя", email: "Email", subject: "Тема", msg: "Сообщение", btn: "Отправить" },
      info: { title: "Информация", addr: "Алания, Турция - Махмутлар", email: "velafemtech@gmail.com" },
      success: "Сообщение получено! Мы скоро ответим."
    }
  };

  const t = content[lang] || content.EN;
  const isRTL = lang === 'FA';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setIsSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-32 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Info Section */}
        <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-[#1A2A3A]">{t.title}</h1>
            <p className="text-gray-500 text-lg">{t.subtitle}</p>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm space-y-6">
                <h3 className="font-bold text-[#1A2A3A] text-xl border-b pb-4">{t.info.title}</h3>
                <div className="flex items-start gap-4 text-gray-600">
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37]"><MapPin /></div>
                    <div><p className="font-bold text-[#1A2A3A]">Location</p><p>{t.info.addr}</p></div>
                </div>
                <div className="flex items-start gap-4 text-gray-600">
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37]"><Mail /></div>
                    <div><p className="font-bold text-[#1A2A3A]">Email</p><p>{t.info.email}</p></div>
                </div>
            </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg">
            {isSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><Check size={40}/></div>
                    <h3 className="text-2xl font-bold text-[#1A2A3A] mb-2">{t.success}</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A3A]">{t.form.name}</label>
                            <input required type="text" className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A3A]">{t.form.email}</label>
                            <input required type="email" className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A3A]">{t.form.subject}</label>
                        <input required type="text" className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, subject: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A3A]">{t.form.msg}</label>
                        <textarea required rows={4} className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-[#1A2A3A] text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition flex items-center justify-center gap-2">
                        {loading ? '...' : <>{t.form.btn} <Send size={18}/></>}
                    </button>
                </form>
            )}
        </div>

      </div>
    </div>
  );
}