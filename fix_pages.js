const fs = require('fs');
const path = require('path');

const pages = {
  // ۱. صفحه ورود (Login)
  "src/app/auth/login/page.tsx": `import LoginForm from '@/components/auth/LoginForm';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vela-marble p-4">
      <div className="absolute top-0 left-0 p-8"><h1 className="text-2xl font-serif text-vela-navy font-bold">VELA</h1></div>
      <LoginForm />
    </div>
  );
}`,

  // ۲. صفحه ساخت بسته (Box Builder)
  "src/app/box-builder/page.tsx": `'use client';
import Header from '@/components/layout/Header';
import CycleCalculator from '@/components/features/CycleCalculator';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-serif text-vela-navy mb-8 text-center">تنظیم تقویم هوشمند</h1>
        <CycleCalculator language="FA" onDateSelected={(dates) => console.log(dates)} />
      </div>
    </div>
  );
}`,

  // ۳. صفحه هدیه (Gift)
  "src/app/gift/page.tsx": `import Header from '@/components/layout/Header';

export default function GiftPage() {
  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <div className="flex items-center justify-center h-[80vh] text-center">
        <div>
          <h1 className="text-4xl font-serif text-vela-gold mb-4">بخش هدیه</h1>
          <p className="text-vela-navy">این بخش به زودی لیست پکیج‌های هدیه را نمایش می‌دهد.</p>
        </div>
      </div>
    </div>
  );
}`,

  // ۴. صفحه داشبورد (Dashboard)
  "src/app/dashboard/page.tsx": `import UserDashboard from '@/components/dashboard/UserDashboard';
import Header from '@/components/layout/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-vela-marble">
      <Header />
      <UserDashboard />
    </div>
  );
}`
};

console.log("🚀 در حال ساخت صفحات گم شده...");

for (const [filePath, content] of Object.entries(pages)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    
    // ساخت پوشه اگر وجود ندارد
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // ساخت فایل
    fs.writeFileSync(fullPath, content);
    console.log(`✅ صفحه ساخته شد: ${filePath}`);
}

console.log("🎉 تمام صفحات بازیابی شدند! حالا دکمه‌ها کار می‌کنند.");