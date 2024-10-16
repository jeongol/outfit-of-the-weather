import type { Metadata } from "next";
import localFont from "next/font/local";
import "normalize.css";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/providers/RQProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className={`${geistSans.variable} ${geistMono.variable} w-full flex flex-col items-center bg-mainYellow`}>
        <Header />
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            draggable
            theme="light" 
          />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
