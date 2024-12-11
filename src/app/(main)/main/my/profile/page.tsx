"use client";

import React from "react";
import Profile from "./_components/Profile";

import ProfileInput from "./_components/Input";
import ProfileTopNav from "./_components/TopNav";
import Button from "@/common/Button";

export default function ProfilePage() {
  return (
    <div className="relative h-full ">
      <ProfileTopNav />
      <div className="mt-[32px]" />
      <Profile />
      <div className="mt-[60px]" />
      <ProfileInput />
      <div className="absolute bottom-0 left-0 right-0 mb-[32px]">
        <Button value="저장하기" onClick={() => {}} />
      </div>
    </div>
  );
}
