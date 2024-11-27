import React from "react";
import TopNavBar from "./_components/TopNavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
}
