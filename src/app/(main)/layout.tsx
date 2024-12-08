import React from "react";
import NavBar from "./_components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col relative h-full mb-[4rem] overflow-y-auto">
        {children}
      </div>

      <NavBar />
    </>
  );
}
