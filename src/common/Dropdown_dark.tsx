"use client";

// 빌드페이지의 새로운 게임 버튼 클릭 시 장르에 사용
import React, { useState } from "react";
import Svg from "./Svg";

interface Dropdown_darkProps {
  values: {
    key: string;
    value: string;
  }[];
  currentValue: string;
  onChange: (value: string) => void;
}

export default function Dropdown_dark({
  values,
  currentValue,
  onChange,
}: Dropdown_darkProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-[105px]">
      <div className="flex flex-row items-center">
        <div className="headline-sb text-white">장르</div>
        <span className="text-red-500 ml-[2px]">*</span>
      </div>
      <div
        className="w-full mt-3 h-[50px] border rounded-[6px] border-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between text-white ml-[10px] headline-md h-[48px]">
          {currentValue}
          <div className="flex items-center justify-center mr-[12px]">
            <Svg
              icon="chevronDownIcon"
              options={{ size: { width: 24, height: 24 }, color: "gray-500" }}
            />
          </div>
        </div>
      </div>
      {/* 박스 */}
      {isOpen && (
        <div className="flex absolute w-full flex-col mt-2 h-[308px] overflow-y-auto rounded-[8px] bg-gray-800">
          <div className="flex flex-col mt-[10px]">
            {values.map((value) => (
              <div
                key={value.key}
                className="flex flex-col"
                onClick={() => {
                  onChange(value.key);
                  setIsOpen(false);
                }}
              >
                <div
                  className="flex items-center text-white ml-[10px]
            headline-md h-[48px] "
                >
                  {value.value}
                </div>
                <div className="border-b border-gray-600"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
