import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // گرفتن اطلاعاتی که شاپیر می‌فرستد (به صورت Form Data)
    const formData = await req.formData();
    const paymentId = formData.get('payment_id') as string;
    const status = formData.get('status') as string; // 'success'
    const price = formData.get('price') as string; // مبلغ پرداختی

    // اتصال به دیتابیس
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    console.log(`🔔 Payment Callback: ID=${paymentId}, Status=${status}, Price=${price}`);

    if (status?.toLowerCase() === 'success') {
        // 🧠 تطبیق هوشمند: پیدا کردن آخرین سفارش "در انتظار" با همین قیمت
        // چون لینک ثابت است، ما order_id نداریم، پس با قیمت و زمان مچ می‌کنیم.
        
        const { data: matchedOrder, error: findError } = await supabase
            .from('orders')
            .select('id')
            .eq('status', 'pending_payment')      // فقط سفارش‌های پرداخت نشده
            .eq('paid_amount', price)             // که مبلغشان دقیقاً همین است
            .order('created_at', { ascending: false }) // جدیدترین سفارش
            .limit(1)
            .single();

        if (matchedOrder && !findError) {
            // آپدیت کردن سفارش پیدا شده
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    status: 'paid',
                    // در دیتابیس باید ستون payment_id را هم ساخته باشید، اگر ندارید این خط را پاک کنید
                    // payment_id: paymentId, 
                    created_at: new Date().toISOString() // آپدیت زمان پرداخت (اختیاری)
                })
                .eq('id', matchedOrder.id);

            if (!updateError) {
                console.log(`✅ Order ${matchedOrder.id} marked as PAID.`);
            } else {
                console.error("❌ Update Failed:", updateError);
            }
        } else {
            console.warn("⚠️ No matching pending order found for this price.");
        }
    }

    // شاپیر انتظار دارد ما فقط متن "OK" برگردانیم
    return new NextResponse('OK');

  } catch (error) {
    console.error("Callback Error:", error);
    return new NextResponse('Error', { status: 500 });
  }
}