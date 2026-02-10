import { NextResponse } from 'next/server';
// 👇 مسیردهی نسبی برای حل قطعی مشکل ایمپورت
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, orderDetails, paidAmount, realPrice, status } = body;

    console.log("📝 New Box Order Received from:", formData.name);

    // ۱. ذخیره در Supabase
    const { data: orderData, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: formData.name,
          customer_phone: formData.phone,
          shipping_address: `${formData.address}`,
          total_price: realPrice,
          paid_amount: paidAmount,
          order_details: orderDetails,
          status: status || 'pending_payment'
        }
      ])
      .select()
      .single();

    if (dbError) {
        console.error("❌ Supabase Error:", dbError);
        return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    // ۲. ارسال پیام به تلگرام (مخصوص باکس بیلدر)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && chatId) {
        const message = `
📦 <b>سفارش جدید (کاستوم باکس)</b>
--------------------------------
👤 <b>مشتری:</b> ${formData.name}
📞 <b>تلفن:</b> ${formData.phone}
💰 <b>مبلغ:</b> ${paidAmount} TL
📍 <b>آدرس:</b> ${formData.address}

📝 <b>جزئیات سفارش:</b>
- باکس: ${orderDetails.selectedBoxId}
- اشتراک: ${orderDetails.subscription} ماهه
- پدها: ${orderDetails.dayPads} روز / ${orderDetails.nightPads} شب
- تامپون: ${orderDetails.hasTampon ? orderDetails.tamponCount : 'ندارد'}
- اکسترا: ${JSON.stringify(orderDetails.extras)}

🆔 کد پیگیری: <code>${orderData.id}</code>
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

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}