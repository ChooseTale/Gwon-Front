"use client";
import Svg from "@/common/Svg";
import React, { useState, useEffect } from "react";

import DropDown from "@/common/DropDown";
import { useGameOrderStore } from "@/store/Game/GameOrder.store";
import { useContinuedGameOrderStore } from "@/store/Game/continued/ContinuedGameOrder.store";
import GenreBottomSheet from "../../../../../../common/Game/GenreBottomSheet";
import { useContinuedGameFilterStore } from "@/store/Game/continued/ContinuedGameFilter.store";
import { GenresKorean } from "@/common/Game/Genre";

export default function TopNavBar() {
  const [isGenreBottomSheetOpen, setIsGenreBottomSheetOpen] = useState(false);
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);

  const handleSortBottomSheet = () => {
    setIsSortBottomSheetOpen(!isSortBottomSheetOpen);
  };

  useEffect(() => {
    if (isGenreBottomSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트가 언마운트될 때 스크롤을 복원합니다.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isGenreBottomSheetOpen]);

  const handleGenreBottomSheetOpen = () => {
    setIsGenreBottomSheetOpen(true);
  };

  return (
    <div className="">
      {isGenreBottomSheetOpen && (
        <GenreBottomSheet
          userSelectedGenres={
            useContinuedGameFilterStore.getState().selectedGenres
          }
          handleClose={() => setIsGenreBottomSheetOpen(false)}
          handleApply={(selectedGenres: (keyof typeof GenresKorean)[]) => {
            useContinuedGameFilterStore
              .getState()
              .setStoreSelectedGenres(selectedGenres);
          }}
        />
      )}

      <div className="flex  w-full  justify-between items-center">
        <div
          onClick={handleGenreBottomSheetOpen}
          className="flex flex-row justify-center items-center w-[92px] h-[38px] border border-gray-700 rounded-[8px]"
        >
          <Svg
            icon="slidersIcon"
            options={{
              size: { width: 18, height: 18 },
              viewBox: "0 0 18 18",
              color: "white",
            }}
          />
          <span className="headline-md text-white ml-[6px]">장르</span>
        </div>
        <div
          onClick={handleSortBottomSheet}
          className="flex flex-row justify-center items-center "
        >
          <span className="body-rg text-white">
            {useGameOrderStore.getState().selectedOrderValue}
          </span>
          <div className="flex flex-row w-[18px] h-[18px] justify-center items-center ">
            <Svg
              icon="chevronDownIcon"
              options={{
                size: { width: 9, height: 4.5 },
                viewBox: "6 10 12 6",
                color: "white",
              }}
            />
          </div>
          {isSortBottomSheetOpen && (
            <div className="flex  relative top-[15px] right-[116px] z-30">
              <DropDown
                values={[
                  {
                    key: "LATEST",
                    value: "최신순",
                  },
                  {
                    key: "OLDEST",
                    value: "오래된순",
                  },
                ]}
                onChange={(key) => {
                  const currentOrder =
                    useContinuedGameOrderStore.getState().selectedOrder;
                  if (currentOrder === key) {
                    return;
                  }

                  useContinuedGameOrderStore.setState({
                    selectedOrder: key as "LATEST" | "OLDEST",
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
