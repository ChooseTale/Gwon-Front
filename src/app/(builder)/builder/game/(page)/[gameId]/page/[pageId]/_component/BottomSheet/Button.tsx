import Svg, { SvgName } from "@/common/Svg";
import React from "react";

interface BottomSheetButtonProps {
  text: string;
  onClick?: () => void;
  svgIconName: SvgName;
  isActive: boolean;
}

const cardStyle =
  "flex flex-col mt-[10px]  h-[36px]  justify-center items-center caption-rg ";

export function BottomSheetButton({
  text,
  onClick,
  isActive,
  svgIconName,
}: BottomSheetButtonProps) {
  return (
    <div
      className={`${cardStyle}   p-[8px_12px_8px_12px] ${
        isActive ? "" : "text-gray-100"
      }`}
      onClick={onClick}
    >
      <Svg
        icon={svgIconName}
        options={{
          size: { width: 24, height: 24 },
          color: isActive ? "gray-500" : "gray-100",
        }}
      />
      <p className={`${isActive ? "text-gray-500" : "text-gray-100"} mt-[2px]`}>
        {text}
      </p>
    </div>
  );
}

export function BottomSheetGradientButton({
  text,
  onClick,
  isActive,
}: // svgIconName,
BottomSheetButtonProps) {
  return (
    <div
      className={`${cardStyle}  p-[1px]  z-10 ${
        isActive ? "ending-gradiant-90" : "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex h-full w-full bg-white   p-[8px_12px_8px_12px]  justify-center items-center z-20">
        <p className={` `}>{text}</p>
      </div>
    </div>
  );
}
