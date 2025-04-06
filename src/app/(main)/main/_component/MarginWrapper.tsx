import React from "react";

export default function MarginWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[calc(100%-40px)] min-w-[280px] max-w-[560px] ml-[20px] mr-[20px] items-center justify-center flex-col  ">
      {children}
    </div>
  );
}
