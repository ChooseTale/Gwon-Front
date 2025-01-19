import React from "react";

interface BottomSheetButtonProps {
  text: string;
  onClick: () => void;
}

const cardStyle =
  "flex  h-[36px]  justify-center items-center rounded-[48px] body-md ";

export function BottomSheetButton({ text, onClick }: BottomSheetButtonProps) {
  return (
    <div
      className={`${cardStyle} w-[67px] border border-gray-100 p-[8px_12px_8px_12px]`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export function BottomSheetGradientButton({
  text,
  onClick,
}: BottomSheetButtonProps) {
  return (
    <div
      className={`${cardStyle} p-[1px] ending-gradiant-90 z-10`}
      onClick={onClick}
    >
      <div className="flex h-full w-full bg-white  rounded-[48px] p-[8px_12px_8px_12px]  justify-center items-center z-20">
        <p className=" text-transparent bg-clip-text ending-gradiant-90 font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}
