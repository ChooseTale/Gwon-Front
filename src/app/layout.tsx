import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./global.css";

import CheckAuth from "./(not-logged-in)/(oauth)/authenticate/CheckAuth";
import SessionProvider from "./(not-logged-in)/(oauth)/authenticate/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/components/LoadingProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChooseTale",
  description:
    "ChooseTale은 텍스트 기반의 게임을 만들고 공유할 수 있어요. AI와 함께 새로운 이야기를 만들어보세요!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChooseTale",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        className={`font-pretendard flex flex-col justify-between w-full h-[100vh] bg-background-dark`}
      >
        <SessionProvider>
          <LoadingProvider>
            <CheckAuth />
            <main className="flex-grow flex justify-center w-full">
              {children}
            </main>

            <Toaster />
          </LoadingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
