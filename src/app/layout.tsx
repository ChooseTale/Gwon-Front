import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";

import CheckAuth from "./(not-logged-in)/(oauth)/authenticate/CheckAuth";
import SessionProvider from "./(not-logged-in)/(oauth)/authenticate/SessionProvider";

const geistSans = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  style: "normal",
  variable: "--font-sans",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} flex  w-full h-[100vh] bg-background-dark  `}
      >
        <SessionProvider>
          <CheckAuth />
          <div className="flex w-[calc(100%-40px)] flex-col ml-[20px] mr-[20px] ">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
