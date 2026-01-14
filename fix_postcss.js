const fs = require('fs');
const path = require('path');

// ۱. حذف فایل تنظیمات جدید (که باعث ارور شد)
const badConfig = path.join(__dirname, 'postcss.config.mjs');
if (fs.existsSync(badConfig)) {
    fs.unlinkSync(badConfig);
    console.log("🗑️ فایل ناسازگار postcss.config.mjs حذف شد.");
}

// ۲. ساخت فایل تنظیمات استاندارد (Classic JS)
const goodConfigPath = path.join(__dirname, 'postcss.config.js');
const goodConfigContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync(goodConfigPath, goodConfigContent);
console.log("✅ فایل استاندارد postcss.config.js ساخته شد.");