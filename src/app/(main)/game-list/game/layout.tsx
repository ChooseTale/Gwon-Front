import React from "react";
import TopNavBar from "./_components/TopNavBar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
}
