'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, Leaf, MapPin, Users } from 'lucide-react';

export default function AboutPage() {
  const [lang, setLang] = useState('EN');

  const content: any = {
    EN: {
      title: "Our Story",
      subtitle: "Redefining menstrual care, one box at a time.",
      
      storyTitle: "Why VELA?",
      storyText: "VELA was born in Alanya with a simple mission: to transform the menstrual experience from a monthly hassle into a moment of self-care. We realized that generic supermarket pads aren't enough. You deserve organic care, pain relief, and a touch of luxury—delivered right to your door.",
      
      val1: "100% Organic", val1Desc: "No toxins, no plastics, just pure cotton.",
      val2: "Personalized", val2Desc: "Curated specifically for your unique flow.",
      val3: "Community", val3Desc: "We are more than a brand; we are a safe space.",
      
      locationTitle: "Based in Alanya",
      locationText: "Our headquarters are located in the beautiful coastal city of Alanya, Turkey. From here, we pack every box with love and ship it across the region.",
    },
    FA: {
      title: "داستان ما",
      subtitle: "تغییر تجربه قاعدگی، با هر جعبه.",
      
      storyTitle: "چرا VELA؟",
      storyText: "برند VELA در آلانیا با یک ماموریت ساده متولد شد: تبدیل تجربه قاعدگی از یک دردسر ماهانه به لحظه‌ای برای مراقبت از خود. ما باور داریم محصولات معمولی سوپرمارکت کافی نیستند. شما لایق محصولات ارگانیک، راهکارهای تسکین درد و کمی حس لوکس هستید که درب منزل تحویل بگیرید.",
      
      val1: "۱۰۰٪ ارگانیک", val1Desc: "بدون مواد سمی و پلاستیک، فقط کتان خالص.",
      val2: "شخصی‌سازی شده", val2Desc: "طراحی شده دقیقاً متناسب با نیاز بدن شما.",
      val3: "جامعه و خانواده", val3Desc: "ما فراتر از یک برند هستیم؛ ما یک فضای امنیم.",
      
      locationTitle: "مستقر در آلانیا",
      locationText: "دفتر مرکزی ما در شهر زیبای ساحلی آلانیا، ترکیه واقع شده است. ما هر باکس را با عشق در اینجا بسته‌بندی کرده و برای شما ارسال می‌کنیم.",
    },
    TR: {
      title: "Hikayemiz",
      subtitle: "Regl bakımını yeniden tanımlıyoruz.",
      
      storyTitle: "Neden VELA?",
      storyText: "VELA, Alanya'da basit bir misyonla doğdu: Regl deneyimini aylık bir zorluktan, kişisel bakım anına dönüştürmek. Marketlerdeki sıradan pedlerin yeterli olmadığını biliyoruz. Siz, kapınıza kadar gelen organik bakımı ve konforu hak ediyorsunuz.",
      
      val1: "%100 Organik", val1Desc: "Toksin yok, plastik yok, sadece saf pamuk.",
      val2: "Kişiselleştirilmiş", val2Desc: "Akışınıza özel olarak hazırlandı.",
      val3: "Topluluk", val3Desc: "Bir markadan fazlası, güvenli bir alanız.",
      
      locationTitle: "Merkezimiz Alanya",
      locationText: "Merkezimiz Türkiye'nin güzel sahil şehri Alanya'da bulunmaktadır. Her kutuyu buradan sevgiyle hazırlayıp gönderiyoruz.",
    },
    RU: {
      title: "О нас",
      subtitle: "Новый взгляд на заботу о себе.",
      
      storyTitle: "Почему VELA?",
      storyText: "VELA родилась в Алании с простой миссией: превратить критические дни в момент заботы о себе. Обычных средств недостаточно. Вы заслуживаете органического качества и комфорта с доставкой на дом.",
      
      val1: "100% Органика", val1Desc: "Без токсинов и пластика.",
      val2: "Персонально", val2Desc: "Подобрано специально для вас.",
      val3: "Сообщество", val3Desc: "Больше, чем просто бренд.",
      
      locationTitle: "Мы в Алании",
      locationText: "Наш офис находится в прекрасной Алании, Турция. Отсюда мы с любовью отправляем каждый бокс.",
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

  return (
    <div className="min-h-screen bg-white text-[#1A2A3A]" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className="bg-[#F9F7F2] py-32 px-6 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4 animate-fade-in">{t.title}</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-up">{t.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in">
                {/* عکس داستان برند */}
                <Image src="/images/story.jpg" alt="VELA Story" fill className="object-cover" />
            </div>
            <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold">{t.storyTitle}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {t.storyText}
                </p>
                <div className="flex gap-4 pt-4">
                    <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37]"><Heart /></div>
                    <div className="bg-[#1A2A3A]/5 p-3 rounded-full text-[#1A2A3A]"><ShieldCheck /></div>
                </div>
            </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
                { title: t.val1, desc: t.val1Desc, icon: <Leaf size={32}/> },
                { title: t.val2, desc: t.val2Desc, icon: <Users size={32}/> },
                { title: t.val3, desc: t.val3Desc, icon: <Heart size={32}/> },
            ].map((val, i) => (
                <div key={i} className="bg-[#F9F7F2] p-8 rounded-[2rem] hover:shadow-lg transition duration-300 text-center border border-transparent hover:border-[#D4AF37]">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#1A2A3A] mb-4 shadow-sm">
                        {val.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                    <p className="text-gray-500">{val.desc}</p>
                </div>
            ))}
        </div>

        {/* Location Section (Vital for Shopier) */}
        <div className="bg-[#1A2A3A] text-white rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1A2A3A] shadow-lg animate-bounce-slow">
                    <MapPin size={40}/>
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">{t.locationTitle}</h2>
                <p className="text-gray-300 max-w-xl mx-auto text-lg">{t.locationText}</p>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

      </div>
    </div>
  );
}