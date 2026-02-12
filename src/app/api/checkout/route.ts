import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, selectedBoxId, subscription, extras, totalPrice, paidAmount, status, dayPads, nightPads, tamponCount, hasTampon } = body;

    console.log("🚀 New Order Request for:", formData.name);

    // ۱. ساخت آبجکت جزئیات
    const orderDetailsJson = {
      box_id: selectedBoxId,
      subscription: subscription,
      pads: { day: dayPads || 0, night: nightPads || 0 },
      tampons: hasTampon ? tamponCount : 0,
      extras: extras,
      client_lang: body.lang
    };

    // ۲. تلاش برای ذخیره در Supabase
    const { data: orderData, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: formData.name,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          total_price: totalPrice,
          paid_amount: paidAmount,
          order_details: orderDetailsJson,
          status: status || 'pending_payment'
        }
      ])
      .select()
      .single();

    // ۳. ارسال به تلگرام (همراه با گزارش خطای احتمالی)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && chatId) {
        // اگر ارور دیتابیس داشتیم، متنش را می‌گیریم
        const dbStatusMsg = dbError 
            ? `❌ <b>DATABASE ERROR:</b>\n<pre>${JSON.stringify(dbError.message, null, 2)}</pre>` 
            : `✅ <b>Saved to DB:</b> <code>${orderData?.id}</code>`;

        const message = `
📦 <b>سفارش جدید (${selectedBoxId})</b>
--------------------------------
👤 <b>مشتری:</b> ${formData.name}
📞 <b>تلفن:</b> ${formData.phone}
💰 <b>مبلغ:</b> ${paidAmount} TL
📍 <b>آدرس:</b> ${formData.address}

📝 <b>جزئیات:</b>
- پد: ${dayPads || 0} روز / ${nightPads || 0} شب
- تامپون: ${hasTampon ? tamponCount : 'ندارد'}
- اکسترا: ${extras}

${dbStatusMsg}
        `;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
    }

    // اگر دیتابیس ارور داشت، به فرانت‌اند هم میگوییم که الرت بدهد
    if (dbError) {
        console.error("Supabase Error:", dbError);
        return NextResponse.json({ success: false, error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, orderId: orderData?.id });

  } catch (error: any) {
    console.error("🔥 Server Crash:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}