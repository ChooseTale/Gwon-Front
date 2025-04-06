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
      <div className="flex  flex-col items-center  w-full">
        <div
          id="margin-bottom-NavBar"
          className={`flex flex-col relative items-center w-full h-full ${
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
