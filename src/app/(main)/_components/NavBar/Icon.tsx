import Svg, { SvgName } from "@/common/Svg";
import React from "react";

export default function Icon({
  icon,
  label,
  isSelected,
}: {
  icon: SvgName;
  label: string;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex flex-col w-[8rem] justify-center items-center ${
        isSelected ? "text-green-500" : "text-gray-500"
      } caption-sb`}
    >
      <Svg
        icon={icon}
        options={{
          size: { width: 24, height: 24 },
          color: isSelected ? "green-500" : "gray-500",
        }}
      />
      <span className="mt-[2px]">{label}</span>
    </div>
  );
}
