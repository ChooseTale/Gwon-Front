import React from "react";
import {
  BottomSheetButton,
  BottomSheetGradientButton,
} from "./BottomSheet/Button";

const buttons = [
  {
    text: "블럭",
    isGradient: false,
  },
  {
    text: "선택지",
    isGradient: false,
  },
  {
    text: "AI 선택지",
    isGradient: true,
  },
  {
    text: "배경",
    isGradient: false,
  },
];

export default function BottomSheet() {
  return (
    <div className="relative flex w-full h-full items-center justify-center flex-col">
      <div className="flex w-[100px] h-[16px] bg-white justify-center items-center drop-shadow rounded-t-[20px] z-20">
        <div className="flex w-[48px] h-[4px] rounded-[40px] bg-gray-100"></div>
      </div>
      {/* 쉐도우 용 */}
      <div className="flex w-full h-[76px] bg-white rounded-t-[20px] drop-shadow z-10" />
      {/* 쉐도우 문제로 덮어 씌운 콘텐츠 박스 */}
      <div className="absolute bottom-0 flex w-full h-[76px] bg-white rounded-t-[20px] z-30 justify-center gap-[6px] items-center">
        {buttons.map((button) =>
          button.isGradient ? (
            <BottomSheetGradientButton key={button.text} text={button.text} />
          ) : (
            <BottomSheetButton key={button.text} text={button.text} />
          )
        )}
      </div>
    </div>
  );
}
