'use client';

import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Check, Phone } from 'lucide-react';

export default function ContactPage() {
  const [lang, setLang] = useState('FA');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // خواندن زبان از حافظه مرورگر
  useEffect(() => {
    setLang(localStorage.getItem('vela-lang') || 'FA');
  }, []);

  // دیکشنری متن‌ها
  const content: any = {
    FA: {
      title: "تماس با ما",
      subtitle: "ما اینجا هستیم تا به سوالات شما پاسخ دهیم.",
      form: { name: "نام شما", email: "ایمیل", subject: "موضوع", msg: "پیام شما", btn: "ارسال پیام" },
      info: { title: "اطلاعات تماس", addr: "آلانیا، ترکیه - منطقه محموت‌لار", email: "velafemtech@gmail.com" },
      success: "پیام شما با موفقیت ارسال شد! به زودی پاسخ می‌دهیم.",
      error: "خطایی رخ داد. لطفاً دوباره تلاش کنید."
    },
    EN: {
      title: "Contact Us",
      subtitle: "We are here to help and answer any questions.",
      form: { name: "Your Name", email: "Email Address", subject: "Subject", msg: "Your Message", btn: "Send Message" },
      info: { title: "Contact Info", addr: "Alanya, Turkey - Mahmutlar District", email: "velafemtech@gmail.com" },
      success: "Message sent successfully! We'll get back to you soon.",
      error: "Something went wrong. Please try again."
    },
    TR: {
      title: "İletişim",
      subtitle: "Sorularınızı yanıtlamak için buradayız.",
      form: { name: "Adınız", email: "E-posta", subject: "Konu", msg: "Mesajınız", btn: "Gönder" },
      info: { title: "İletişim Bilgileri", addr: "Alanya, Türkiye - Mahmutlar", email: "velafemtech@gmail.com" },
      success: "Mesajınız alındı! Yakında döneceğiz.",
      error: "Bir hata oluştu. Lütfen tekrar deneyin."
    },
    RU: {
      title: "Контакты",
      subtitle: "Мы здесь, чтобы ответить на ваши вопросы.",
      form: { name: "Имя", email: "Email", subject: "Тема", msg: "Сообщение", btn: "Отправить" },
      info: { title: "Информация", addr: "Алания, Турция - Махмутлар", email: "velafemtech@gmail.com" },
      success: "Сообщение отправлено! Мы скоро ответим.",
      error: "Произошла ошибка. Попробуйте еще раз."
    }
  };

  const t = content[lang] || content.EN;
  const isRTL = lang === 'FA';

  // تابع ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // خالی کردن فرم
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-32 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* بخش اطلاعات تماس (سمت چپ/راست بسته به زبان) */}
        <div className="space-y-8 animate-fade-in-left">
            <h1 className="text-4xl font-serif font-bold text-[#1A2A3A]">{t.title}</h1>
            <p className="text-gray-500 text-lg">{t.subtitle}</p>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm space-y-6 border border-gray-100">
                <h3 className="font-bold text-[#1A2A3A] text-xl border-b pb-4 mb-2">{t.info.title}</h3>
                
                <div className="flex items-start gap-4 text-gray-600 group">
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition"><MapPin /></div>
                    <div><p className="font-bold text-[#1A2A3A]">Location</p><p>{t.info.addr}</p></div>
                </div>
                
                <div className="flex items-start gap-4 text-gray-600 group">
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition"><Mail /></div>
                    <div><p className="font-bold text-[#1A2A3A]">Email</p><p>{t.info.email}</p></div>
                </div>
            </div>
        </div>

        {/* بخش فرم (باکس سفید) */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl animate-fade-in-right">
            {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-scale-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-md"><Check size={40}/></div>
                    <h3 className="text-2xl font-bold text-[#1A2A3A] mb-2">{t.success}</h3>
                    <button onClick={() => setStatus('idle')} className="mt-6 text-[#D4AF37] font-bold underline">ارسال پیام جدید</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A3A]">{t.form.name}</label>
                            <input 
                              required 
                              type="text" 
                              value={formData.name}
                              className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" 
                              onChange={e => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A3A]">{t.form.email}</label>
                            <input 
                              required 
                              type="email" 
                              value={formData.email}
                              className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" 
                              onChange={e => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A3A]">{t.form.subject}</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.subject}
                          className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" 
                          onChange={e => setFormData({...formData, subject: e.target.value})} 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A3A]">{t.form.msg}</label>
                        <textarea 
                          required 
                          rows={4} 
                          value={formData.message}
                          className="w-full p-4 rounded-xl border bg-[#F9F7F2] focus:border-[#D4AF37] outline-none transition" 
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>

                    {status === 'error' && <p className="text-red-500 text-sm text-center">{t.error}</p>}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'} 
                      className="w-full bg-[#1A2A3A] text-white py-4 rounded-xl font-bold hover:bg-[#D4AF37] transition flex items-center justify-center gap-2 shadow-lg"
                    >
                        {status === 'loading' ? '...' : <>{t.form.btn} <Send size={18}/></>}
                    </button>
                </form>
            )}
        </div>

      </div>
    </div>
  );
}