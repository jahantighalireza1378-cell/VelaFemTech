const fs = require('fs');
const path = require('path');

// محتویات فایل‌های گم شده
const files = {
  // ۱. ساخت فایل استایل در پوشه درست
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;`,

  // ۲. ساخت لایوت اصلی در پوشه درست
  "src/app/layout.tsx": `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELA",
  description: "FemTech Care Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`
};

console.log("🛠 در حال تعمیر ساختار پروژه...");

// ۱. ساخت فایل‌های جدید
for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`✅ فایل ساخته شد: ${filePath}`);
}

// ۲. تغییر نام پوشه مزاحم (app قدیمی) تا سایت اشتباه نکند
const oldAppPath = path.join(__dirname, 'app');
const backupAppPath = path.join(__dirname, 'app_OLD_BACKUP');

if (fs.existsSync(oldAppPath)) {
    try {
        fs.renameSync(oldAppPath, backupAppPath);
        console.log("🗑️ پوشه مزاحم 'app' غیرفعال شد (به app_OLD_BACKUP تغییر نام داد).");
    } catch (err) {
        console.log("⚠️ نتوانستیم پوشه قدیمی را تغییر نام دهیم. لطفا خودتان پوشه 'app' (در ریشه) را پاک کنید.");
    }
}

console.log("\n🎉 تعمیر تمام شد! حالا سایت باید درست کار کند.");