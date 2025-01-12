import React from "react";
import NavBar from "./_components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-[calc(100%-40px)] min-w-[280px] max-w-[560px] flex-col ml-[20px] mr-[20px] ">
        <div className="flex flex-col relative h-full mb-[4rem] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>

      <NavBar />
    </>
  );
}
