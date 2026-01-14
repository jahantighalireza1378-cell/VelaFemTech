const fs = require('fs');
const path = require('path');

const files = {
  // ۱. تنظیم مجدد فایل کانفیگ تیلویند (قلب رنگ‌ها)
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vela: {
          navy: { DEFAULT: "#1A233A", light: "#2A3555", dark: "#0F1525" },
          gold: { DEFAULT: "#D4AF37", light: "#E5C55D", dim: "#B08D26" },
          marble: "#F8F9FA",
          eco: "#4A7C59",
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;`,

  // ۲. تنظیم فایل PostCSS (موتور پردازش استایل)
  "postcss.config.mjs": `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;`,

  // ۳. اطمینان از وجود فایل استایل جهانی
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-playfair: 'Times New Roman', serif;
  --font-lato: 'Arial', sans-serif;
}
`
};

console.log("🎨 در حال تعمیر رنگ‌ها و استایل‌ها...");

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`✅ آپدیت شد: ${filePath}`);
}
console.log("🎉 تعمیر گرافیک انجام شد!");