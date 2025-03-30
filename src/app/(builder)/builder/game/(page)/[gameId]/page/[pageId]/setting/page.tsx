"use client";

import React, { useState } from "react";
import BuilderGamePageSettingTopNav from "./_component/TopNav";
import Input from "@/common/Input";
import { useParams, useRouter } from "next/navigation";

export default function BuilderGamePageSetting() {
  const [title, setTitle] = useState("");
  const { gameId, pageId } = useParams();
  const router = useRouter();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="relative flex  bg-white ml-[20px] mr-[20px]    flex-col items-center z-10">
        <BuilderGamePageSettingTopNav
          handleComplete={() => {
            router.replace(
              `/builder/game/${gameId}/page/${pageId}?title=${title}`
            );
          }}
        />
      </div>
      <div className="flex   flex-col ml-[20px] mr-[20px] mt-[20px]">
        <Input
          title="페이지 제목"
          titleColor="black"
          placeholder="페이지 제목을 입력해주세요."
          value={title}
          regExp={/^[a-zA-Z0-9가-힣\s]+$/}
          maxLength={30}
          onChange={handleChangeTitle}
        />
      </div>
    </div>
  );
}
