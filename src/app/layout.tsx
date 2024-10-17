import type { Metadata } from "next";
import localFont from "next/font/local";
import "normalize.css";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/providers/RQProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Noto_Sans_KR } from "@next/font/google";

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

const noto_sans_kr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400"] });

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
      <body className={`${noto_sans_kr.className} w-full flex flex-col items-center bg-mainYellow`}>
        <Header />
        <div>
          <ToastContainer position="bottom-right" autoClose={3000} closeOnClick pauseOnHover draggable theme="light" />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
// 18/2 30/2 날씨 맑음 흐림 하나씩
