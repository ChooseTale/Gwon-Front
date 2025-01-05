"use client";

import React from "react";
import TopVar from "./_components/TopVar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopVar />
      {children}
    </div>
  );
}
