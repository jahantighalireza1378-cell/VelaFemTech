import { NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trackingCode, customer, order } = body;

    // ساخت متن پیام با فرمت HTML (طبق تنظیمات قبلی شما)
    const message = `
<b>📦 سفارش جدید در VELA ثبت شد!</b>
<code>${trackingCode}</code>

<b>👤 اطلاعات مشتری:</b>
<b>نام:</b> ${customer.name}
<b>تلفن:</b> ${customer.phone}
<b>آدرس:</b> ${customer.address}
<b>کد پستی:</b> ${customer.zip}

<b>🛒 جزئیات سفارش:</b>
▪️ <b>باکس:</b> ${order.box}
▪️ <b>اشتراک:</b> ${order.plan}
▪️ <b>پدها:</b> ${order.pads}
▪️ <b>تامپون:</b> ${order.tampons}
▪️ <b>بسته‌بندی اکو:</b> ${order.eco}
▪️ <b>اقلام اضافه:</b> ${order.extras}

💰 <b>مبلغ کل:</b> ${order.totalPrice} لیر
    `;

    // ارسال به تلگرام
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML', // تنظیم روی HTML طبق عکس شما
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Telegram API Error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}