import type { Metadata } from 'next';
// import localFont from "next/font/local";
import { Lato } from 'next/font/google';
import '@/styles/globals.css';

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });
const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Buzzline',
  description: 'Live workspace chat service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={lato.className}
      >
        {children}
      </body>
    </html>
  );
}
