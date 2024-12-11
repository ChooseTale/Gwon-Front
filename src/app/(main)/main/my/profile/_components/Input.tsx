"use client";

import React from "react";
import Input from "@/common/Input";
import { useMeStore } from "@/store/User/Me/Me.store";

export default function ProfileInput() {
  const me = useMeStore((state) => state.me);

  return (
    <Input
      title="닉네임"
      placeholder="닉네임을 입력해주세요."
      value={me?.nickname}
      regExp={/^[a-zA-Z0-9]{2,30}$/}
      maxLength={30}
      onChange={(e) => {
        // console.log(e.target.value);
      }}
    />
  );
}
