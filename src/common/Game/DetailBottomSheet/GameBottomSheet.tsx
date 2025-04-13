"use client";

import { getIntroScreen } from "@choosetale/nestia-type/lib/functional/game_play/intro/index";
import Button from "@/common/Button";
import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GenresKorean } from "../Genre";
import {
  firstStartGameCall,
  getIntroScreenCall,
} from "@/(actions)/main/play-game/intro";
import { useCommonStore } from "@/store/common.store";
import goldBadge from "@/assets/png/GoldBadge.png";
import silverBadge from "@/assets/png/SilverBadge.png";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type GameBottomSheetProps = {
  gameId: number;
  handleClose: () => void;
};

export default function GameBottomSheet({
  gameId,
  handleClose,
}: GameBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<getIntroScreen.Output>();
  const router = useRouter();
  useEffect(() => {
    const getGame = async () => {
      const res = await getIntroScreenCall({ gameId });

      setGame(res);
    };
    getGame();
  }, [gameId]);

  useEffect(() => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);

    // 바텀시트가 열릴 때 history state 추가
    window.history.pushState(null, "", window.location.pathname);

    // 뒤로가기 이벤트 리스너 등록
    const handlePopState = () => {
      setIsOpen(false);
      useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
      handleClose();
    };

    window.addEventListener("popstate", handlePopState);

    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      setIsOpen(true);
    });

    // 정리 함수에서 이벤트 리스너 제거
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleClose]);

  const handleFirstStartGame = async () => {
    try {
      const res = await firstStartGameCall({ gameId });

      router.push(`/play/${res.playId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!game) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="bottom"
        className="flex flex-col bg-gray-900 w-full min-w-[320px] max-w-[400px] h-[calc(100%-60px)]
         rounded-t-[20px] shadow-lg  justify-self-center border-none "
        onCloseAutoFocus={() => {
          useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
          handleClose();
        }}
      >
        <SheetTitle />
        <div className="flex w-full h-[48px] min-h-[48px]  justify-center items-center  ">
          {/* 닫기 버튼 */}
          <div
            className="absolute flex justify-center items-center slef rounded-full
                      bg-gray-900
              top-3 right-3  w-[28px] h-[28px]"
          >
            <button
              onClick={() => {
                useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
                handleClose();
              }}
              className=" text-gray-500 "
            >
              <Svg
                icon="xIcon"
                options={{
                  size: { width: 24, height: 24 },
                  color: "gray-700",
                }}
              />
            </button>
          </div>
        </div>
        {/* 이미지 */}
        <div className="flex  relative overflow-y-auto h-full ">
          <div className="flex w-[calc(100%+32px)] h-[308px] min-h-[308px] relative">
            <Image
              className="w-full object-cover"
              src={game.game.thumbnailUrl}
              alt="game"
              width={800}
              height={600}
              quality={100}
              priority
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(40, 40, 40, 0) 0%, #282828 100%)",
              }}
            />
            {game.enrichData.completedEnding > 0 &&
              game.enrichData.completedEnding < game.enrichData.totalEnding && (
                <div className="absolute top-[208px] left-[12px]    flex flex-row gap-x-2 items-center ">
                  <div className="flex w-[48px] h-[48px]">
                    <Image
                      src={silverBadge}
                      alt="producer"
                      width={48}
                      height={48}
                      quality={100}
                      priority
                    />
                  </div>
                  <span className="flex body-sb text-transparent bg-clip-text ending-gradiant-90">
                    {game.enrichData.completedEnding}개의 엔딩을 봤어요
                  </span>
                </div>
              )}
            {/* 엔딩 완료 배지 */}
            {game.enrichData.completedEnding ===
              game.enrichData.totalEnding && (
              <div className="absolute top-[208px] left-[12px]   flex flex-row gap-x-2 items-center ">
                <div className="flex w-[48px] h-[48px]">
                  <Image
                    src={goldBadge}
                    alt="producer"
                    width={48}
                    height={48}
                    quality={100}
                    priority
                  />
                </div>
                <span className="flex body-sb text-transparent bg-clip-text ending-gradiant-90">
                  모든 엔딩을 봤어요
                </span>
              </div>
            )}
          </div>
          {/* 박스 쉐도우 */}
          {/* <div className="absolute w-full h-[62px] bottom-sheet left-0 top-[256px]  "></div> */}
          {/* 컨텐츠 내용들 */}
          <div
            className="absolute top-[275px] flex flex-col w-[calc(100%-32px)]  mx-[20px]
          h-fit mb-16 "
          >
            <div className="flex flex-col w-full h-full">
              {/* 장르, 제목, 작성자 */}

              <div className="flex flex-row justify-center items-center "></div>

              <div className="flex flex-col gap-y-2">
                <span className="flex body-rg text-gray-100">
                  {GenresKorean[game.game.genre as keyof typeof GenresKorean]}
                </span>
                <span className="flex title1-sb text-white">
                  {game.game.title}
                </span>
                <div className="flex h-[25px] bg-gray-800 items-center rounded-[4px] w-fit px-2">
                  <span className="flex caption-rg text-white">
                    @{game.game.producer.nickname}
                  </span>
                </div>
              </div>
              {/* 버튼들 */}
              <div className="flex flex-col gap-y-2 mt-8">
                {!game.play && (
                  <Button
                    value="새로하기"
                    onClick={handleFirstStartGame}
                    bgColor="bg-green-500"
                    textColor="black"
                  />
                )}
                {game.play && (
                  <>
                    <Button
                      value="새로하기"
                      onClick={handleFirstStartGame}
                      bgColor="bg-gray-700"
                      textColor="text-gray-100"
                    />
                    <div
                      onClick={() => {
                        router.push(`/play/${game.play?.id ?? 0}`);
                      }}
                      className="flex flex-col w-full h-[52px] justify-center items-center bg-green-500 rounded-[8px] "
                    >
                      <div className="flex headline-sb text-black">
                        이어하기
                      </div>

                      <div className="flex body-rg text-black overflow-hidden line-clamp-1">
                        {game.play.page?.title}
                      </div>
                    </div>
                    {/* <Button
                      value={"이어하기:" + game.play.page?.title}
                      onClick={() => {
                        router.push(`/play/${game.play?.id ?? 0}`);
                      }}
                      bgColor="bg-green-500"
                      textColor="text-black"
                    /> */}
                  </>
                )}
              </div>

              {/* 상세 정보 */}
              <div className="flex flex-col gap-y-2 mt-8 mb-8">
                <span className="flex title2-sb text-white">상세 정보</span>
                {/* 소요시간, 엔딩수 , 엔딩을 본 사람 */}
                <div
                  className="flex flex-row justify-center items-center gap-x-2
                w-full h-[89px] bg-gray-800 rounded-[12px] px-6
                "
                >
                  <div className="flex flex-col w-[90px] gap-1 justify-center items-center">
                    <span className="flex body-md text-gray-200">소요시간</span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.expectPlayTime}분
                    </span>
                  </div>
                  <div className="h-[20px] border-r ml-2 mr-2 border-gray-700" />
                  <div className="flex flex-col w-[90px] gap-1 justify-center items-center">
                    <span className="flex body-md text-gray-200">엔딩수</span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.totalEnding}개
                    </span>
                  </div>
                  <div className="h-[20px] border-r ml-2 mr-2  border-gray-700" />
                  <div className="flex flex-col w-[90px] gap-1 justify-center items-center">
                    <span className="flex body-md text-gray-200">
                      플레이어 수
                    </span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.totalPlayCount}명
                    </span>
                  </div>
                </div>

                {/* 설명 */}
                <div className="flex flex-col gap-y-2 mt-6">
                  <span className="flex body-rg text-gray-200">
                    {game.game.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-[60px]" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
