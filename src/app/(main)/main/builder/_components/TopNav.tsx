"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

type Status = "BUILDING" | "PUBLISHED";

type Props = {
  status: Status;
  handleStatusChange: (status: Status) => void;
};

export default function BuilderTopNav(props: Props) {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="relative flex items-center justify-center h-[48px]">
        <div className="absolute h-full flex items-center left-0 cursor-pointer"></div>
        <span className="ml-2 text-white flex items-center">빌더</span>
      </div>
      {/* 게임 상태 */}
      <div className="flex mt-4 h-[38px] w-[174px] bg-gray-800 rounded-[10px]">
        {["BUILDING", "PUBLISHED"].map((status) => (
          <div
            key={status}
            className={`flex flex-1 rounded-[8px] mt-[2px] ml-[2px] mb-[2px] mr-[2px]
                 ${
                   status === props.status
                     ? "bg-white text-black"
                     : "bg-gray-800 "
                 } items-center justify-center w-full`}
            onClick={() => props.handleStatusChange(status as Status)}
          >
            {status === "BUILDING" ? "제작중" : "게시중"}
          </div>
        ))}
      </div>
    </div>
  );
}
