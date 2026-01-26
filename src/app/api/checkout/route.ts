import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;

function generateShopierForm(orderId: any, customer: any, total: any) {
  // اگر اسم کامل بود، آن را جدا کن
  let firstName = customer.first_name || 'Guest';
  let lastName = customer.last_name || '';
  
  // ساخت فرمت استاندارد شاپیر
  const args = {
    API_KEY: SHOPIER_API_KEY,
    website_index: 1,
    platform_order_id: orderId,
    product_name: 'Vela Order',
    product_type: 1,
    buyer_name: firstName,
    buyer_surname: lastName,
    buyer_email: customer.email || 'guest@vela.com',
    buyer_phone: customer.phone || '0000000000',
    billing_address: customer.address || 'No Address',
    billing_city: customer.city || 'Istanbul',
    billing_country: customer.country || 'Turkey',
    billing_postcode: customer.zip || '00000',
    shipping_address: customer.address || 'No Address',
    shipping_city: customer.city || 'Istanbul',
    shipping_country: customer.country || 'Turkey',
    shipping_postcode: customer.zip || '00000',
    total_order_value: total,
    currency: 0, // 0 = TRY
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
    <head><title>Redirecting to Bank...</title></head>
    <body onload="document.forms[0].submit()">
      <form action="https://www.shopier.com/ShowProduct/api_pay4.php" method="post">
        ${Object.entries(args).map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`).join('')}
        <input type="hidden" name="signature" value="${signature}">
      </form>
    </body>
    </html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Payment Request:", body);

    let finalCustomer: any = {};
    let finalItems: any = [];
    let finalTotal = 0;

    // --- سناریو ۱: خرید از سبد خرید (Standard Cart) ---
    if (body.customer) {
        finalCustomer = body.customer;
        finalItems = body.items;
        finalTotal = body.total;
    } 
    // --- سناریو ۲: خرید باکس/اشتراک (Box Builder) ---
    else if (body.formData) {
        // تبدیل فرمت "formData" به فرمت استاندارد "customer"
        const nameParts = (body.formData.name || 'Guest User').split(' ');
        finalCustomer = {
            first_name: nameParts[0],
            last_name: nameParts.slice(1).join(' ') || '',
            email: body.formData.email || 'no-email@provided.com',
            phone: body.formData.phone,
            address: body.formData.address,
            city: 'Istanbul', // مقدار پیش‌فرض چون در فرم باکس نیست
            country: 'Turkey',
            zip: body.formData.zip
        };
        // تبدیل "orderDetails" به یک آیتم در لیست
        finalItems = [{
            name: body.orderDetails.boxName || 'Custom Box',
            price: body.totalPrice,
            quantity: 1,
            details: body.orderDetails // ذخیره جزئیات کامل مثل پدها و ...
        }];
        finalTotal = body.totalPrice;
    } 
    else {
        return NextResponse.json({ error: "Unknown data format" }, { status: 400 });
    }

    // 1. ذخیره در Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        customer_name: `${finalCustomer.first_name} ${finalCustomer.last_name}`,
        customer_email: finalCustomer.email,
        customer_phone: finalCustomer.phone,
        total_price: finalTotal.toString(),
        items: finalItems,
        status: 'pending',
        payment_id: body.trackingCode || null // ذخیره کد رهگیری اگر باشد
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
            const message = `🛒 New Order: #${order.id}\n💰 Total: ${finalTotal} TL\n👤 ${finalCustomer.first_name}\n📱 ${finalCustomer.phone}`;
            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
            }).catch(e => console.error("Telegram Error", e));
        } catch (e) {}
    }

    // 3. تولید فرم بانکی
    const formHtml = generateShopierForm(order.id, finalCustomer, finalTotal);

    return NextResponse.json({ success: true, formHtml });

  } catch (error) {
    console.error('Fatal API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}