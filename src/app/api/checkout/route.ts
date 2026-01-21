import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. خواندن تنظیمات
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("❌ Missing Env Vars");
      return NextResponse.json({ error: 'Server Config Missing' }, { status: 500 });
    }

    // 2. دریافت داده‌ها
    const body = await req.json();
    const { trackingCode, formData, orderDetails, totalPrice } = body;

    console.log("📨 Received Order:", trackingCode); // لاگ برای دیباگ

    // 3. ساخت پیام (دقیقاً مشابه فرمت Gift که کار کرد)
    const message = `
<b>🛍 سفارش جدید (باکس بیلدر)</b>
🔖 کد: <code>${trackingCode}</code>

<b>👤 مشتری:</b>
نام: ${formData.name}
تلفن: ${formData.phone}
آدرس: ${formData.address}
کدپستی: ${formData.zip}

<b>📦 بسته انتخابی:</b>
نوع: ${orderDetails.boxName}
اشتراک: ${orderDetails.subscription} ماهه
پدها: ${orderDetails.pads}
تامپون: ${orderDetails.tampons}
اقلام: ${orderDetails.extras}

💰 <b>مبلغ کل:</b> ${totalPrice} لیر
    `;

    // 4. ارسال به تلگرام
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (response.ok) {
      console.log("✅ Telegram Sent!");
      return NextResponse.json({ success: true });
    } else {
      const err = await response.text();
      console.error("❌ Telegram Error:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

  } catch (error) {
    console.error("🔥 Server Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}