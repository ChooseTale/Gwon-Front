import React from "react";

export default function W600Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  min-w-[280px] max-w-[600px] w-full items-center justify-center flex-col  ">
      {children}
    </div>
  );
}
