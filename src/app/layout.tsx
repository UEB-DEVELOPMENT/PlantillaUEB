import type { Metadata } from "next";
import { Public_Sans } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { ThemeProvider } from '@/context/ThemeContext';
import TranslateNavGuard from '@/components/TranslateNavGuard';

export const metadata: Metadata = {
  title: "UEB - Plantilla Institucional",
  description: "Plantilla institucional de la Universidad Estatal de Bolívar",
  icons: "/favicon.png",
  openGraph: {
    title: "UEB - Plantilla Institucional",
    description: "Plantilla institucional de la Universidad Estatal de Bolívar",
    images: "/images/logo/logo.png",
  },
};

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${publicSans.className} `}>
        <TranslateNavGuard />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
