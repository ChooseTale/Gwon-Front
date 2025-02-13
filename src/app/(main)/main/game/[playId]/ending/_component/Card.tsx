import React from "react";

interface EndingCardProps {
  title: string;
  endings: {
    title: string;
    percentage: number;
    isSelected: boolean;
  }[];
}

export default function EndingCard({ title, endings }: EndingCardProps) {
  return (
    <div className="flex flex-col bg-gray-900 w-full rounded-[8px]">
      <div className="flex flex-col py-[20px] px-[16px]">
        {/* 선택지 제목 */}
        <div className="flex text-title2 text-white">{title}</div>
        {/* 선택지 목록 */}
        <div className="flex flex-col mt-[32px] gap-[24px]">
          {endings.map((ending, idx) => (
            <div className="flex flex-row justify-between" key={idx}>
              <div
                className={`flex  body-rg ${
                  ending.isSelected ? "text-white" : "text-gray-400"
                } `}
              >
                {ending.title}
              </div>
              <div
                className={`flex  headline-sb ${
                  ending.isSelected ? "text-green-500" : "text-gray-400"
                } `}
              >
                {ending.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
