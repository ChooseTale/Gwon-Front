"use client";

import Image from "next/image";
import React from "react";
import UserImage from "@/assets/png/UserImage.png";
import Svg from "@/common/Svg";
import { useMeStore } from "@/store/User/Me/Me.store";
import Link from "next/link";

export default function UserProfile() {
  const me = useMeStore((state) => state.me);

  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="headline-md h-[54px] flex items-center text-white mt-[15px]">
        마이페이지
      </div>
      <div
        className="flex flex-col justify-start items-center    w-[135px]  rounded-[8px] mt-[32px]"
        style={{ aspectRatio: "7 / 8" }}
      >
        <div className="flex w-[84px] h-[84px]  aspect-square rounded-[18px] ">
          <Image
            className="w-full h-full rounded-[18px] object-cover"
            src={me.profileImage?.url ? me.profileImage.url : UserImage}
            alt="user"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-row w-full items-center justify-center mt-[16px]">
          <div className="flex relative title1-sb  justify-center text-white ">
            {me.nickname}
            <Link href="/main/my/profile">
              <div className="absolute  top-[2px]">
                <Svg
                  icon="chevronRightIcon"
                  options={{
                    size: { width: 24, height: 24 },
                    color: "gray-500",
                  }}
                />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-row w-full items-center justify-center mt-[4px]">
          <span className="body-rg text-gray-500 ">{me.email}</span>
        </div>
      </div>
    </div>
  );
}
