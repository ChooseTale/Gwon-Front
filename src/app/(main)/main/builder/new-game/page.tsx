"use client";

import Input from "@/common/Input";
import React, { useState } from "react";
import Thumbnail from "./_components/Thumbnail";
import Dropdown_dark from "@/common/Dropdown_dark";
import { GenresKorean } from "@/common/Game/Genre";
import TopVar from "./_components/TopVar";
import { useRouter } from "next/navigation";
import {
  createGameCall,
  updateGameCall,
  uploadThumbnailCall,
} from "@/app/(actions)/builder/game/game";
import { Genres } from "@choosetale/nestia-type/lib/structures/Genres";
import { createPageCall } from "@/app/(actions)/builder/page/page";

export default function NewGameBuilder() {
  const router = useRouter();

  const [newGame, setNewGame] = useState<{
    title: string;
    genre: string;
    description: string;
    thumbnail: File[];
    isThumbnailIdx: number;
  }>({
    title: "",
    genre: Object.keys(GenresKorean)[0],
    description: "",
    thumbnail: [],
    isThumbnailIdx: 0,
  });
  console.log(newGame);
  const handleCreateGame = async () => {
    const res = await createGameCall({
      title: newGame.title,
      genre: newGame.genre as Genres,
      description: newGame.description,
    });

    const thumbnailRes = await uploadThumbnailCall({
      gameId: res.id,
      images: newGame.thumbnail.map((thumbnail, index) => ({
        file: thumbnail,
        isThumbnail: index === newGame.isThumbnailIdx,
      })),
    });
    console.log(thumbnailRes);
    const thumnailImageId = thumbnailRes[newGame.isThumbnailIdx].id;

    // 게임을 생성 후 첫 페이지 생성
    await createPageCall(res.id, {});

    await updateGameCall(res.id, {
      title: newGame.title,
      description: newGame.description,
      genre: newGame.genre as Genres,
      thumbnailImageId: thumnailImageId,
      isPrivate: true,
    });

    router.push(`/builder/game/${res.id}`);
  };

  return (
    <>
      <TopVar handleCreateGame={handleCreateGame} />
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
          titleData={{
            title: "장르",
            required: true,
            textColor: "white",
          }}
          bottomSheetData={{
            textColor: "white",
            bgColor: "gray-800",
            borderColor: "gray-600",
          }}
          currentValue={
            GenresKorean[newGame.genre as keyof typeof GenresKorean]
          }
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
        <Thumbnail
          isThumbnailIdx={newGame.isThumbnailIdx}
          handleThumbnailClick={(index: number) => {
            setNewGame({ ...newGame, isThumbnailIdx: index });
          }}
          onChange={(images) => {
            setNewGame({ ...newGame, thumbnail: images });
          }}
          images={[]}
        />
      </div>
    </>
  );
}
