import Svg from "@/common/Svg";
import React, { useEffect, useState } from "react";
import { GenresKorean } from "@/common/Game/Genre";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCommonStore } from "@/store/common.store";

interface GenreBottomSheetProps {
  userSelectedGenres: (keyof typeof GenresKorean)[];
  handleClose: () => void;
  handleApply: (genres: (keyof typeof GenresKorean)[]) => void;
}

export default function GenreBottomSheet({
  userSelectedGenres,
  handleClose,
  handleApply,
}: GenreBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] =
    useState<(keyof typeof GenresKorean)[]>(userSelectedGenres);

  const handleSelectGenre = (genre: keyof typeof GenresKorean) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres((prev) => prev.filter((g) => g !== genre));
    } else {
      setSelectedGenres((prev) => [...prev, genre]);
    }
  };

  const handleReset = () => {
    setSelectedGenres([]);
  };

  useEffect(() => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      setIsOpen(true);
    });
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="bottom"
        className="flex flex-col bg-gray-900 w-full min-w-[320px] max-w-[400px] h-[65%]
         rounded-t-[20px] shadow-lg justify-self-center border-none p-[20px]"
        onCloseAutoFocus={() => {
          useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
          handleClose();
        }}
      >
        <SheetTitle />
        <div className="flex justify-center items-center mb-4 relative">
          <h2 className="title2-sb text-white">장르</h2>
          <div
            className="absolute flex justify-center items-center rounded-full
                      bg-gray-900
              top-0 right-0 w-[28px] h-[28px]"
          >
            <button
              onClick={() => {
                useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
                handleClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Svg
                icon="xIcon"
                options={{ size: { width: 24, height: 24 }, color: "gray-700" }}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-2 overflow-y-auto max-h-[calc(100%-112px-27px)]">
          {Object.entries(GenresKorean).map(([key, value]) => {
            const isSelected = selectedGenres.includes(
              key as keyof typeof GenresKorean
            );

            return (
              <div
                key={key}
                className={`flex w-[calc(50%-8px)] rounded-[4px] border border-1 h-[48px] ${
                  isSelected ? "border-green-500" : "border-gray-600"
                }`}
              >
                <button
                  key={key}
                  className={`flex w-full h-full justify-center items-center mb-2 title2-md ${
                    isSelected ? "text-green-500" : "text-white"
                  }`}
                  onClick={() =>
                    handleSelectGenre(key as keyof typeof GenresKorean)
                  }
                >
                  {value}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-x-2 justify-center items-center z-30 absolute left-0 bottom-0 w-full h-[112px] bg-gray-900 px-[20px]">
          <div
            className="flex w-[calc(90/390*100%)] h-[48px] justify-center items-center bg-gray-800 text-white title2-md rounded-[8px]"
            onClick={handleReset}
          >
            초기화
          </div>
          <div
            className="flex w-[calc(252/390*100%)] h-[48px] justify-center items-center bg-green-500 text-black title2-md rounded-[8px]"
            onClick={() => {
              handleApply(selectedGenres);
              handleClose();
            }}
          >
            {selectedGenres.length > 0
              ? selectedGenres.length + "건 적용하기"
              : "적용하기"}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
