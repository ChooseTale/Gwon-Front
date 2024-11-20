import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${geistSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}
