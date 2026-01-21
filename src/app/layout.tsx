import ClerkWrapper from '../components/ClerkWrapper'; 
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer'; // 👈 ایمپورت فوتر

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
        <ClerkWrapper>
          
          {/* هدر ثابت بالا */}
          <Header />
          
          {/* بدنه اصلی سایت */}
          <main className="pt-28 min-h-screen">
            {children}
          </main>

          {/* 👇 فوتر اصلی که گم شده بود */}
          <Footer />

        </ClerkWrapper>
      </body>
    </html>
  );
}