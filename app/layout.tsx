import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revo Qatar | Eco-Friendly Packaging Partner",
  description:
    "Revo Qatar supplies eco-friendly packaging for hotels, F&B, and facilities across Qatar — biodegradable, kraft, bagasse, aluminium, hygiene, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
