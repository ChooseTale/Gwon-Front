"use client";

import React from "react";
import Input from "@/common/Input";
import { useMeStore } from "@/store/User/Me/Me.store";

interface ProfileInputProps {
  userData: ReturnType<typeof useMeStore.getState>["me"];
  handleInputChange: (
    key: "nickname",
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function ProfileInput({
  userData,
  handleInputChange,
}: ProfileInputProps) {
  return (
    <Input
      title="닉네임"
      placeholder="닉네임을 입력해주세요."
      value={userData.nickname}
      regExp={/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,20}$/}
      maxLength={20}
      onChange={(e: any) => handleInputChange("nickname", e)}
    />
  );
}
