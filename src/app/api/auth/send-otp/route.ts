import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    // در نسخه تستی، کد همیشه 12345 است
    console.log(`📨 OTP Request for ${phone}: 12345`);
    return NextResponse.json({ success: true, code: '12345' }); 
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}