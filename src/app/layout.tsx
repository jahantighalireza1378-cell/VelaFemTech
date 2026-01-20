// توجه: دیگر ClerkProvider را مستقیم ایمپورت نمی‌کنیم
import ClerkWrapper from '../components/ClerkWrapper'; 
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VELA | Sail Through It',
  description: 'Premium Period Care & FemTech Subscription',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F9F7F2]`}>
        {/* استفاده از مبدل هوشمند زبان */}
        <ClerkWrapper>
          <Header />
          <main className="pt-28 min-h-screen">
            {children}
          </main>
        </ClerkWrapper>
      </body>
    </html>
  );
}