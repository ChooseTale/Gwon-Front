import React from "react";

interface EndingCardProps {
  endingNumber: number;
  ending: {
    createdAt: Date | null;
    content: string;
  } | null;
}

export default function EndingCard({ ending, endingNumber }: EndingCardProps) {
  if (!ending) {
    return (
      <div className="flex w-full bg-gray-800  min-h-[84px] flex-col rounded-[8px]">
        {/* 엔딩 제목, 날짜 */}
        <div className="flex  h-full flex-col ml-3 mr-3">
          <div className="flex  h-[22px] mt-[16px]   justify-between items-center">
            <span className="flex headline-sb text-gray-300">
              {endingNumber}번 엔딩
            </span>
          </div>
          {/* 엔딩 내용 */}
          <div className="flex headline-rg text-gray-300 mt-2 pb-[16px]">
            ???
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-gray-800   h-fit flex-col rounded-[8px]">
      {/* 엔딩 제목, 날짜 */}
      <div className="flex  h-full flex-col ml-3 mr-3">
        <div className="flex  h-[22px] mt-[16px]   justify-between items-center">
          <span className="flex headline-sb text-transparent bg-clip-text ending-gradiant-90">
            {endingNumber}번 엔딩
          </span>
          <span className="flex caption-rg justify-center items-center  text-gray-200">
            {ending.createdAt
              ? ending.createdAt.toLocaleDateString()
              : "날짜 없음"}
          </span>
        </div>
        {/* 엔딩 내용 */}
        <div className="flex headline-rg text-gray-50 mt-2 pb-[16px]">
          {ending.content}
        </div>
      </div>
    </div>
  );
}
