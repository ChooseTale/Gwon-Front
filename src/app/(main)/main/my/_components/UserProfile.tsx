"use client";

import Image from "next/image";
import React from "react";
import UserImage from "@/assets/png/UserImage.png";
import Svg from "@/common/Svg";

export default function UserProfile() {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="headline-md h-[54px] flex items-center text-white mt-[15px]">
        마이페이지
      </div>
      <div
        className="flex flex-col justify-start items-center    w-[135px]  rounded-[8px] mt-[32px]"
        style={{ aspectRatio: "7 / 8" }}
      >
        <div className="flex w-[84px] aspect-square rounded-[18px] ">
          <Image
            className="w-full h-full"
            src={UserImage}
            alt="user"
            width={100}
            height={100}
          />
        </div>

        <div className="flex relative flex-row w-full items-center justify-center mt-[16px]">
          <span className="flex title1-sb w-[calc(100%-24px)] justify-center text-white ">
            왕굴장굴대
          </span>
          <div className=" right-0">
            <Svg
              icon="chevronRightIcon"
              options={{ size: { width: 24, height: 24 }, color: "gray-500" }}
            />
          </div>
        </div>

        <div className="flex flex-row w-full items-center justify-center mt-[4px]">
          <span className="body1-sb text-gray-500 ">email@email.com</span>
        </div>
      </div>
    </div>
  );
}
