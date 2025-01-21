import React, { useState } from "react";
import {
  BottomSheetButton,
  BottomSheetGradientButton,
} from "./BottomSheet/Button";

const buttons: {
  key: "block" | "choice" | "aiChoice" | "background";
  text: string;
  isGradient: boolean;
}[] = [
  {
    key: "block",
    text: "블럭",
    isGradient: false,
  },
  {
    key: "choice",
    text: "선택지",
    isGradient: false,
  },
  {
    key: "aiChoice",
    text: "AI 선택지",
    isGradient: true,
  },
  {
    key: "background",
    text: "배경",
    isGradient: false,
  },
];

interface BottomSheetProps {
  activeType: {
    key: "block" | "choice" | "aiChoice" | "background";
    isActive: boolean;
  }[];
  onClick: (key: "block" | "choice" | "aiChoice" | "background") => void;
  handleOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export default function BottomSheet({
  onClick,
  activeType,
  handleOpen,
  isOpen,
}: BottomSheetProps) {
  const [startY, setStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null && isOpen) {
      const deltaY = e.touches[0].clientY - startY;

      if (deltaY > 0 && deltaY < 77) {
        setTranslateY(deltaY);
      }
    }
    if (startY !== null && !isOpen) {
      const deltaY = e.touches[0].clientY - startY;

      if (deltaY < 0 && deltaY > -77) {
        setTranslateY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 50 && isOpen) {
      // 일정 비율 이상 내려갔을 때 닫기 처리
      handleOpen(false);
    }
    if (translateY < -50 && !isOpen) {
      // 일정 비율 이상 올라갔을 때 열기 처리
      handleOpen(true);
    }
    setTranslateY(0); // 초기화
    setStartY(null);
  };

  return (
    <div
      className="fixed w-full min-w-[280px] max-w-[600px] h-[92px] bottom-0"
      style={{
        transform: `translateY(${translateY}px)`,
        // top: `${isOpen ? "0px" : "76px"}`,
        bottom: `${isOpen ? "0px" : "-76px"}`,
      }}
    >
      <div
        className={`relative  flex w-full h-full items-center justify-center flex-col`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex w-[100px] h-[16px] bg-white justify-center items-center drop-shadow rounded-t-[20px] z-20">
          {/* 터치 영역 */}
          <div className="flex w-[48px] h-[4px] rounded-[40px] bg-gray-100"></div>
        </div>
        {/* 쉐도우 용 */}
        <div className="flex w-full h-[76px] bg-white rounded-t-[20px] drop-shadow z-10" />
        {/* 쉐도우 문제로 덮어 씌운 콘텐츠 박스 */}
        <div className="absolute bottom-0 flex w-full h-[76px] bg-white rounded-t-[20px] z-30 justify-center gap-[6px] items-center">
          {buttons.map((button) => {
            const isActive = activeType.find(
              (type) => type.key === button.key
            )?.isActive;
            if (isActive === undefined) return null;

            return button.isGradient ? (
              <BottomSheetGradientButton
                key={button.text}
                text={button.text}
                onClick={isActive ? () => onClick(button.key) : undefined}
                isActive={isActive}
              />
            ) : (
              <BottomSheetButton
                key={button.text}
                text={button.text}
                onClick={isActive ? () => onClick(button.key) : undefined}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
