const https = require('https');

// تنظیمات شما
const token = '8255435787:8255435787:AAEyPfSKyhQB5jeZ2YCAYNaXbbcKtH4jaOo';
const chatId = '8183467266';

const message = encodeURIComponent('👋 سلام! این یک پیام تست مستقیم است. اگر این را می‌خوانید، ربات سالم است.');
const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;

console.log("📡 در حال ارسال پیام تست به تلگرام...");

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const result = JSON.parse(data);
        if (result.ok) {
            console.log("✅ موفقیت! پیام ارسال شد. تلگرام خود را چک کنید.");
        } else {
            console.log("❌ خطا از سمت تلگرام:", result.description);
            if (result.description.includes("chat not found")) {
                console.log("⚠️ راه حل: به ربات پیام دهید و دکمه START را بزنید.");
            }
        }
    });
}).on("error", (err) => {
    console.log("❌ خطای شبکه:", err.message);
});