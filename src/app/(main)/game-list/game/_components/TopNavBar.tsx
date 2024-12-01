"use client";
import Svg from "@/common/Svg";
import React, { useState, useEffect } from "react";
import GenreBottomSheet from "./GenreBottomSheet";

export default function TopNavBar() {
  const [isGenreBottomSheetOpen, setIsGenreBottomSheetOpen] = useState(false);

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
          handleClose={() => setIsGenreBottomSheetOpen(false)}
        />
      )}
      <div className="text-green-500 text-2xl font-bold mb-[16px]">
        ChooseTale
      </div>
      <div className="flex  w-full mb-[20px] justify-between items-center">
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
        <div className="flex flex-row justify-center items-center">
          <span className="body-rg text-white">최신순</span>
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
        </div>
      </div>
    </div>
  );
}
