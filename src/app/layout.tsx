import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";

import CheckAuth from "./(not-logged-in)/(oauth)/authenticate/CheckAuth";
import SessionProvider from "./(not-logged-in)/(oauth)/authenticate/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChooseTale",
  description:
    "ChooseTale은 텍스트 기반의 게임을 만들고 공유할 수 있어요. AI와 함께 새로운 이야기를 만들어보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        className={`font-pretendard flex justify-center w-full h-[100vh] bg-background-dark`}
      >
        <SessionProvider>
          <CheckAuth />

          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
