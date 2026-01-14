import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("🚀 Gift API Called: Request received");

  try {
    // 1. دریافت داده‌ها
    const body = await req.json();
    console.log("📦 Received Data:", body); // نمایش داده‌ها در ترمینال برای دیباگ

    const { senderName, recipientName, message, plan, addons, totalPrice, lang } = body;

    // بررسی اینکه داده‌ها ناقص نباشند
    if (!plan || !addons) {
        console.error("❌ Error: Missing plan or addons");
        return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 });
    }
    
    // تولید کد تصادفی
    const code = 'VELA-' + Math.floor(10000 + Math.random() * 90000);

    // تنظیمات تلگرام
    const token = '8255435787:AAGJB-01HA8aILUfV42n7SRmNpJdAN15XCQ';
    const chatId = '8183467266';

    // ترجمه و آماده‌سازی پیام تلگرام
    // (از try/catch داخلی استفاده می‌کنیم تا خطای تلگرام کل برنامه را خراب نکند)
    try {
        const addonsList = [];
        if (addons.chocolate > 0) addonsList.push(`🍫 شکلات: ${addons.chocolate}`);
        if (addons.tea > 0) addonsList.push(`🍵 دمنوش: ${addons.tea}`);
        if (addons.bottle > 0) addonsList.push(`🔥 کیسه آب گرم: ${addons.bottle}`);

        const planNames: any = { 
            'essential': 'Essential (پایه)', 
            'care': 'Care (محبوب)', 
            'bliss': 'Bliss (لوکس)' 
        };

        const currency = lang === 'FA' ? 'تومان' : 'TL';

        const telegramMsg = `
<b>🎁 سفارش گیفت کارت جدید</b>

👤 <b>فرستنده:</b> ${senderName}
🎁 <b>گیرنده:</b> ${recipientName}

💎 <b>پکیج:</b> ${planNames[plan] || plan}
🛍 <b>افزودنی‌ها:</b>
${addonsList.length > 0 ? addonsList.join('\n') : '❌ ندارد'}

💰 <b>مبلغ: ${totalPrice ? totalPrice.toLocaleString() : '0'} ${currency}</b>
💌 <b>پیام:</b> ${message || '-'}
🌐 <b>زبان:</b> ${lang}

🎫 <b>کد رهگیری:</b> <code>${code}</code>
`;

        // ارسال به تلگرام
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMsg,
                parse_mode: 'HTML'
            })
        });

        if (!tgRes.ok) {
            const errText = await tgRes.text();
            console.error("⚠️ Telegram Error (but proceeding):", errText);
        } else {
            console.log("✅ Telegram sent successfully.");
        }

    } catch (tgError) {
        console.error("⚠️ Failed to send Telegram message:", tgError);
        // اینجا ارور را نادیده می‌گیریم تا حداقل کد به کاربر داده شود
    }

    // پاسخ نهایی موفقیت‌آمیز به سایت
    return NextResponse.json({ success: true, code });

  } catch (error) {
    console.error('❌ CRITICAL SERVER ERROR:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}