import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full min-w-[280px] max-w-[600px] flex-col  ">
        <div className="flex flex-col relative h-full  overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
