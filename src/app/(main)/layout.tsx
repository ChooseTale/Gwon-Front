"use client";

import React from "react";
import NavBar from "./_components/NavBar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const notMarginPath = ["/main/builder/new-game"];
  const isEndingPage = pathname.includes("/ending");

  return (
    <>
      <div className="flex w-[calc(100%-40px)] min-w-[280px] max-w-[560px] flex-col ml-[20px] mr-[20px] ">
        <div
          id="margin-bottom-NavBar"
          className={`flex flex-col relative h-full ${
            notMarginPath.includes(pathname) || isEndingPage
              ? "mb-0"
              : "mb-[4rem]"
          } overflow-y-auto overflow-x-hidden`}
        >
          {children}
        </div>
      </div>

      <NavBar />
    </>
  );
}
