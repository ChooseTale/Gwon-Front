"use client";

import Svg from "@/common/Svg";
import React from "react";

interface ChoiceProps {
  isEndingPage: boolean;
  endingOnClick: () => void;
  choices: {
    id: number;
    title: string;
  }[];

  activeChoiceId: number | null;
  handleChoiceClick: (id: number) => void;
}

export default function Choice({
  isEndingPage,
  endingOnClick,
  choices,
  activeChoiceId,
  handleChoiceClick,
}: ChoiceProps) {
  return (
    <>
      {isEndingPage ? (
        <div className="flex w-full  flex-col items-center justify-center h-fit mb-[40px] z-10 gap-3">
          <div className="flex flex-row w-full gap-2">
            <div
              className="flex w-full h-[48px] bg-green-500 rounded-[6px]
                  justify-center items-center
                  text-headline-md text-black  "
              onClick={endingOnClick}
            >
              엔딩 보러가기
              <Svg
                icon="chevronRightIcon"
                options={{
                  size: { width: 24, height: 24 },
                  color: "black",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full  flex-col items-center justify-center h-fit mb-[40px] z-10 gap-3">
          {choices.map((choice, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-full h-[48px] bg-gray-900 rounded-[6px] text-headline-md ${
                activeChoiceId === choice.id
                  ? "text-green-300"
                  : "text-gray-100"
              }`}
              onClick={() => handleChoiceClick(choice.id)}
              style={{
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  activeChoiceId === choice.id
                    ? "0px 3.5px 3.3px 0px rgba(71, 207, 121, 0.24) inset, 0px 0px 15px 0px rgba(71, 207, 121, 0.3), 0px 0px 4px 0px rgba(71, 207, 121, 0.77)"
                    : "0px 3.5px 3.3px 0px rgba(255, 255, 255, 0.24) inset",
                transition: "box-shadow 0.4s ease, color 0.3s ease",
              }}
            >
              <div
                className="absolute inset-0 rounded-[6px]"
                style={{
                  border: "1px solid transparent",
                  background:
                    activeChoiceId === choice.id
                      ? "linear-gradient(0deg, rgba(71, 207, 121, 0.4) 0%, rgba(20, 116, 55, 0.4) 100%) border-box"
                      : "linear-gradient(0deg, rgba(152, 152, 152, 0.4) 0%, rgba(56, 56, 56, 0.4) 100%) border-box",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  pointerEvents: "none",
                  transition: "background 0.5s ease",
                }}
              />
              {choice.title}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
