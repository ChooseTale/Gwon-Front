import React from "react";
import NavBar from "./_components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative h-full pb-[calc(4rem+32px)]">{children}</div>

      <NavBar />
    </>
  );
}
