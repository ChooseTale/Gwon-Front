import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-layout" className="flex w-full h-full flex-col  bg-white ">
      {children}
    </div>
  );
}
