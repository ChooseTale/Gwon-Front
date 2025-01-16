"use client";

import Input from "@/common/Input";
import React, { useState } from "react";
import Thumbnail from "./_components/Thumbnail";
import Dropdown_dark from "@/common/Dropdown_dark";
import { GenresKorean } from "@/common/Game/Genre";

export default function NewGameBuilder() {
  const [newGame, setNewGame] = useState<{
    title: string;
    genre: string;
    description: string;
    thumbnail: string | null;
  }>({
    title: "",
    genre: Object.keys(GenresKorean)[0],
    description: "",
    thumbnail: null,
  });

  console.log(newGame);
  return (
    <div className="flex flex-col mt-[20px] gap-6">
      <Input
        title="제목"
        placeholder="제목을 입력해주세요."
        value={newGame.title || ""}
        regExp={/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,30}$/}
        maxLength={30}
        onChange={(value) => {
          setNewGame({ ...newGame, title: value.target.value });
        }}
      />
      {/* <Input
        title="장르는 드롭다운으로 변경할거임 "
        placeholder="장르를 선택해주세요."
        value=""
        regExp={/^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,10}$/}
        maxLength={10}
        onChange={() => {}}

      /> */}

      <Dropdown_dark
        values={Object.entries(GenresKorean).map(([key, value]) => ({
          key,
          value,
        }))}
        currentValue={GenresKorean[newGame.genre as keyof typeof GenresKorean]}
        onChange={(value: string) => {
          setNewGame({
            ...newGame,
            genre: value,
          });
        }}
      />
      <Input
        title="간단한 내용"
        placeholder="간단한 내용을 입력해주세요."
        value={newGame.description || ""}
        regExp={/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]{1,200}$/}
        maxLength={200}
        onChange={(e) => {
          setNewGame({ ...newGame, description: e.target.value });
        }}
      />
      <Thumbnail />
    </div>
  );
}
