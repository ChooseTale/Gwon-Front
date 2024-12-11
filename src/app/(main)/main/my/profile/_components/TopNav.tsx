"use client";

import Svg from "@/common/Svg";
import Link from "next/link";
import React from "react";

export default function ProfileTopNav() {
  return (
    <div className="relative flex items-center justify-center h-[48px]">
      <div className="absolute h-full flex items-center left-0 cursor-pointer">
        <Link href="/main/my">
          <Svg
            icon="chevronLeftIcon"
            options={{ size: { width: 24, height: 24 }, color: "white" }}
          />
        </Link>
      </div>
      <span className="ml-2 text-white flex items-center">프로필 수정</span>
    </div>
  );
}
