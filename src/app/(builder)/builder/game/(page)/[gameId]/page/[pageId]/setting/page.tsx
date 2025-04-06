"use client";

import React, { useState } from "react";
import BuilderGamePageSettingTopNav from "./_component/TopNav";
import Input from "@/common/Input";
import { useParams, useRouter } from "next/navigation";
import Svg from "@/common/Svg";

export default function BuilderGamePageSetting() {
  const [title, setTitle] = useState("");
  const { gameId, pageId } = useParams();
  const router = useRouter();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div className="flex w-full h-full flex-col ">
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
            regExp={
              /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s.,!?:;'"~`@#$%^&*()_+\-=[\]{}|<>\/\\]+$/
            }
            maxLength={30}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="flex flex-col ml-[20px] mr-[20px] mt-0.5 bg-gray-10 p-[10px] rounded-[10px] gap-0.5">
          <div className="flex flex-row items-center ">
            <Svg
              icon={"infoIcon"}
              options={{
                size: { width: 16, height: 16 },
                viewBox: "0 0 24 24",
                color: "green-500",
              }}
            />
            <p className="caption-sb text-green-500">작성팁</p>
          </div>
          <p className="caption-rg text-gray-800   break-keep">
            페이지 명이 엔딩 페이지에 나타나기 때문에, 내용을 요약해서
            작성하는걸 권장드려요.
            <br />
            ex &#41; 민수는 좀비를 피해 건물 안으로 들어간다.
          </p>
        </div>
      </div>
    </>
  );
}
