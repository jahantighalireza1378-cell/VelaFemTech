import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    // بررسی کد (تست: 12345)
    if (code === '12345') {
        // ساخت توکن مصنوعی
        const token = 'vela-token-' + Math.random().toString(36).substring(7);
        
        const response = NextResponse.json({ success: true, token });
        
        // تنظیم کوکی برای ماندگاری لاگین
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return response;
    } else {
        return NextResponse.json({ success: false, message: 'Invalid Code' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}