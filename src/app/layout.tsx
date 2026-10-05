import type { Metadata } from "next";
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { ThemeProvider } from '@/context/ThemeContext';
import TranslateNavGuard from '@/components/TranslateNavGuard';
import { AccesibilityProvider } from "@ueb-development/ui-core/providers";
import { AccesibilityToolbar } from "@ueb-development/ui-core/components/accessibility-toolbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <TranslateNavGuard />
        <AccesibilityProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <AccesibilityToolbar position="bottom-right" />
        </AccesibilityProvider>
      </body>
    </html>
  );
}
