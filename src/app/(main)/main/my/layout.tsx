import React from "react";
import MarginWrapper from "../_component/MarginWrapper";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MarginWrapper>
      <div className="flex flex-col w-full">{children}</div>
    </MarginWrapper>
  );
}
