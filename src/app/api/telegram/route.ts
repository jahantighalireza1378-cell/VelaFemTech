import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { orderId, customer, items, total, cycle } = data;

    // ✅ تنظیمات نهایی (توکن جدید + آیدی شما)
    const token = '8255435787:AAGJB-01HA8aILUfV42n7SRmNpJdAN15XCQ';
    const chatId = '8183467266';

    // ساخت لیست محصولات
    const extrasList = items.extras
      .filter((i: any) => i !== null)
      .map((i: any) => `▫️ ${i.name}: ${i.count}`)
      .join('\n');

    // متن پیام
    const message = `
<b>🚨 سفارش جدید! (#${orderId})</b>

👤 <b>مشتری:</b> ${customer.name}
📞 <b>تلفن:</b> ${customer.phone}
📍 <b>آدرس:</b> ${customer.address}

📦 <b>جزئیات بسته:</b>
💎 پکیج: ${items.packageName}
🔄 اشتراک: ${cycle}
${extrasList ? `\n🛍 <b>اقلام افزوده:</b>\n${extrasList}` : ''}

💰 <b>مبلغ کل: ${total}</b>
✅ وضعیت: پرداخت موفق
`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // ارسال به تلگرام
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}