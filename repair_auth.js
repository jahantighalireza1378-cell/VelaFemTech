const fs = require('fs');
const path = require('path');

console.log("🚀 شروع تعمیر سیستم احراز هویت (Login)...");

// ۱. مسیرهای حیاتی
const authDir = path.join(__dirname, 'src/app/api/auth');
const sendOtpDir = path.join(authDir, 'send-otp');
const verifyOtpDir = path.join(authDir, 'verify-otp');

// ساخت پوشه‌ها اگر نباشند
[authDir, sendOtpDir, verifyOtpDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ پوشه ساخته شد: ${dir}`);
    }
});

// ۲. فایل ارسال کد (Send OTP)
const sendOtpFile = path.join(sendOtpDir, 'route.ts');
const sendOtpCode = `import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    // در نسخه تستی، کد همیشه 12345 است
    console.log(\`📨 OTP Request for \${phone}: 12345\`);
    return NextResponse.json({ success: true, code: '12345' }); 
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}`;
fs.writeFileSync(sendOtpFile, sendOtpCode);
console.log("✅ فایل send-otp بازسازی شد.");

// ۳. فایل تایید کد (Verify OTP) - احتمالاً این پاک شده بود
const verifyOtpFile = path.join(verifyOtpDir, 'route.ts');
const verifyOtpCode = `import { NextResponse } from 'next/server';

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
}`;
fs.writeFileSync(verifyOtpFile, verifyOtpCode);
console.log("✅ فایل verify-otp بازسازی شد.");

console.log("🎉 تعمیر تمام شد! لطفا مراحل زیر را انجام دهید:");
console.log("1. مرورگر را کامل ببندید و دوباره باز کنید (یا Cache را پاک کنید).");
console.log("2. سرور را ریستارت کنید.");