import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;

// تابع ساخت فرم
function generateShopierForm(order: any, customer: any, total: any) {
  // اگر مشتری ناقص باشد، مقادیر پیش‌فرض می‌گذارد تا فرم نسوزد
  const firstName = customer?.first_name || 'Guest';
  const lastName = customer?.last_name || '';
  const email = customer?.email || 'no-email@test.com';
  const phone = customer?.phone || '0000000000';
  const address = customer?.address || 'No Address';
  const city = customer?.city || 'Istanbul';
  const country = customer?.country || 'Turkey';
  const zip = customer?.zip || '00000';

  const args = {
    API_KEY: SHOPIER_API_KEY,
    website_index: 1,
    platform_order_id: order.id,
    product_name: 'Vela Order',
    product_type: 1,
    buyer_name: firstName,
    buyer_surname: lastName,
    buyer_email: email,
    buyer_account_age: 0,
    buyer_id_nr: 0,
    buyer_phone: phone,
    billing_address: address,
    billing_city: city,
    billing_country: country,
    billing_postcode: zip,
    shipping_address: address,
    shipping_city: city,
    shipping_country: country,
    shipping_postcode: zip,
    total_order_value: total,
    currency: 0,
    platform: 0,
    is_in_frame: 0,
    current_language: 0,
    modul_version: '1.0.4',
    random_nr: Math.floor(Math.random() * 999999) + 100000,
  };

  const data = [args.API_KEY, args.website_index, args.platform_order_id, args.total_order_value, args.currency, args.random_nr];
  const signatureString = data.join('') + SHOPIER_API_SECRET;
  const signature = crypto.createHash('sha256').update(signatureString).digest('base64');

  return `
    <!DOCTYPE html>
    <html>
    <head><title>Redirecting...</title></head>
    <body onload="document.forms[0].submit()">
      <form action="https://www.shopier.com/ShowProduct/api_pay4.php" method="post">
        <input type="hidden" name="API_KEY" value="${args.API_KEY}">
        <input type="hidden" name="website_index" value="${args.website_index}">
        <input type="hidden" name="platform_order_id" value="${args.platform_order_id}">
        <input type="hidden" name="product_name" value="${args.product_name}">
        <input type="hidden" name="product_type" value="${args.product_type}">
        <input type="hidden" name="buyer_name" value="${args.buyer_name}">
        <input type="hidden" name="buyer_surname" value="${args.buyer_surname}">
        <input type="hidden" name="buyer_email" value="${args.buyer_email}">
        <input type="hidden" name="buyer_phone" value="${args.buyer_phone}">
        <input type="hidden" name="billing_address" value="${args.billing_address}">
        <input type="hidden" name="billing_city" value="${args.billing_city}">
        <input type="hidden" name="billing_country" value="${args.billing_country}">
        <input type="hidden" name="billing_postcode" value="${args.billing_postcode}">
        <input type="hidden" name="shipping_address" value="${args.shipping_address}">
        <input type="hidden" name="shipping_city" value="${args.shipping_city}">
        <input type="hidden" name="shipping_country" value="${args.shipping_country}">
        <input type="hidden" name="shipping_postcode" value="${args.shipping_postcode}">
        <input type="hidden" name="total_order_value" value="${args.total_order_value}">
        <input type="hidden" name="currency" value="${args.currency}">
        <input type="hidden" name="platform" value="${args.platform}">
        <input type="hidden" name="is_in_frame" value="${args.is_in_frame}">
        <input type="hidden" name="current_language" value="${args.current_language}">
        <input type="hidden" name="modul_version" value="${args.modul_version}">
        <input type="hidden" name="random_nr" value="${args.random_nr}">
        <input type="hidden" name="signature" value="${signature}">
      </form>
    </body>
    </html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Incoming Request Body:", body); // <--- لاگ برای دیباگ

    // تلاش برای پیدا کردن اطلاعات مشتری (چه فرمت جدید، چه قدیم)
    let customer = body.customer;

    // اگر فرمت قدیم بود (بدون customer)، دستی میسازیم
    if (!customer) {
        console.warn("⚠️ Old format detected or missing customer data");
        if (body.firstName || body.first_name) {
             customer = {
                first_name: body.firstName || body.first_name || 'Unknown',
                last_name: body.lastName || body.last_name || '',
                email: body.email || '',
                phone: body.phone || '',
                address: body.address || '',
                city: body.city || '',
                country: body.country || ''
             };
        } else {
            // اگر واقعا هیچ دیتایی نبود، ارور بده (کرش نکن)
            return NextResponse.json({ error: "Missing customer data" }, { status: 400 });
        }
    }

    const { items, total } = body;

    // 1. ذخیره در Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        customer_name: `${customer.first_name} ${customer.last_name}`,
        customer_email: customer.email,
        customer_phone: customer.phone,
        total_price: total.toString(),
        items: items,
        status: 'pending',
        payment_id: null
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // 2. ارسال تلگرام (Safe Mode)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        try {
            const message = `🛒 New Order: #${order.id}\n💰 Total: ${total} TL\n👤 ${customer.first_name}`;
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
            });
        } catch (e) { console.error('Telegram failed', e); }
    }

    // 3. تولید فرم
    const formHtml = generateShopierForm(order, customer, total);

    return NextResponse.json({ success: true, formHtml });

  } catch (error) {
    console.error('Checkout Fatal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}