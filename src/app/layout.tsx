import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
// اگر فونت خاصی دارید اینجا باشد، وگرنه خط پایین را حذف نکنید
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VELA | Sail Through It',
  description: 'Premium Period Care & FemTech Subscription',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="fa" dir="rtl">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}