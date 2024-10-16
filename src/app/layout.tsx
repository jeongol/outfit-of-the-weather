import type { Metadata } from "next";
import localFont from "next/font/local";
import "normalize.css";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/providers/RQProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Outfit Of The Weather",
  description: "Outfit Of The Weather"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} w-full flex flex-col items-center bg-blue-500`}>
        <Header />
        <div className="flex flex-col pt-20 w-full justify-center items-center">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
