"use client";

import Input from "@/common/Input";
import React from "react";
import Thumbnail from "./_components/Thumbnail";

export default function NewGameBuilder() {
  return (
    <div className="flex flex-col mt-[20px] gap-6a">
      <Input
        title="제목"
        placeholder="제목을 입력해주세요."
        value=""
        regExp={/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/}
        maxLength={10}
        onChange={() => {}}
      />
      <Input
        title="장르는 드롭다운으로 변경할거임 "
        placeholder="장르를 선택해주세요."
        value=""
        regExp={/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/}
        maxLength={10}
        onChange={() => {}}
      />
      <Input
        title="간단한 내용"
        placeholder="간단한 내용을 입력해주세요."
        value=""
        regExp={/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/}
        maxLength={200}
        onChange={() => {}}
      />
      <Thumbnail />
    </div>
  );
}
