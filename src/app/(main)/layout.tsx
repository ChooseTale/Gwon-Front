import React from "react";
import NavBar from "./_components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
