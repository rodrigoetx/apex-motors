import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Apex Motors | The Apex of Modern Luxury",
  description:
    "Experience the peak of hypercar engineering. Apex Motors — where precision meets artistry.",
  keywords: ["luxury car", "hypercar", "apex motors", "bespoke automotive"],
  openGraph: {
    title: "Apex Motors | The Apex of Modern Luxury",
    description: "Experience the peak of hypercar engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} min-h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <LenisProvider>
          {/* Global custom cursor — desktop only, renders above everything */}
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
