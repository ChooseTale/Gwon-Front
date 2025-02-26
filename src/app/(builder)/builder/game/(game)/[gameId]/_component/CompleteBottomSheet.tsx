import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import React from "react";

export default function CompleteBottomSheet({
  isClickCompleteButton,
  setIsClickCompleteButton,
  handleComplete,
  handleSave,
}: {
  isClickCompleteButton: boolean;
  setIsClickCompleteButton: (isClickCompleteButton: boolean) => void;
  handleComplete: () => void;
  handleSave: () => void;
}) {
  return (
    <Sheet open={isClickCompleteButton} onOpenChange={setIsClickCompleteButton}>
      <SheetContent
        side="bottom"
        className="flex flex-col bg-white w-full min-w-[320px] max-w-[400px] h-[388px]
         rounded-t-[20px] shadow-lg  justify-self-center border-none"
      >
        <SheetTitle />
        <div className="flex flex-col mt-[48px] gap-4 ">
          <div className="flex justify-center title1-sb">
            게임을 게시하시겠어요?
          </div>
          <div className="flex flex-col  bg-gray-10 ml-[20px] mr-[20px] gap-[30px] rounded-[6px] p-4">
            <div className="flex flex-col  ">
              <span className="flex   headline-sb text-green-600">
                저장하기
              </span>
              <span className="flex body-rg text-gray-500">
                이후에 다시 수정하는 것이 가능합니다.
              </span>
            </div>
            <div className="flex flex-col  ">
              <span className="flex   headline-sb text-green-600">
                게시하기
              </span>
              <span className="flex body-rg text-gray-500">
                게시하면 유저가 플레이할 수 있으며, 이후에는 수정할 수 없습니다.
              </span>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex flex-row gap-2 ml-[20px] mr-[20px]">
            <button
              onClick={handleComplete}
              className="flex flex-row w-full h-[48px] rounded-[8px] border border-green-500"
            >
              <span className="flex w-full title2-md justify-center items-center text-green-500">
                게시하기
              </span>
            </button>
            <button
              onClick={handleSave}
              className="flex flex-row bg-green-500 w-full h-[48px] rounded-[8px]"
            >
              <span className="flex w-full title2-md justify-center items-center text-white">
                저장하기
              </span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
