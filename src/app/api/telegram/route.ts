import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trackingCode, customer, order } = body;

    // خواندن توکن‌ها از همان جایی که بخش هدیه می‌خواند
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("❌ تنظیمات تلگرام یافت نشد!");
      return NextResponse.json({ error: 'Config Missing' }, { status: 500 });
    }

    // ساخت متن پیام
    const message = `
<b>📦 سفارش جدید (باکس سفارشی):</b>
<code>${trackingCode}</code>

<b>👤 مشتری:</b> ${customer.name}
📞 <b>تلفن:</b> ${customer.phone}
📍 <b>آدرس:</b> ${customer.address}

<b>🛒 سفارش:</b>
▪️ ${order.box} | ${order.plan}
▪️ پد: ${order.pads}
▪️ تامپون: ${order.tampons}
▪️ اکو: ${order.eco}
▪️ اقلام: ${order.extras}

💰 <b>مبلغ:</b> ${order.totalPrice} لیر
    `;

    // ارسال به تلگرام
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
      console.log("✅ Telegram sent successfully (Box Builder)."); // همان پیام موفقیتی که در عکس دیدید
      return NextResponse.json({ success: true });
    } else {
      const err = await response.text();
      console.error("❌ Telegram Error:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}