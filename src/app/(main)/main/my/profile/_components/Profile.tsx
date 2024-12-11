"use client";

import UserImage from "@/assets/png/UserImage.png";
import Svg from "@/common/Svg";
import { useMeStore } from "@/store/User/Me/Me.store";
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
  const me = useMeStore((state) => state.me);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <Image
          className="w-[84px] h-[84px] object-cover cursor-pointer"
          src={
            file
              ? URL.createObjectURL(file)
              : me.profileImage?.url
              ? me.profileImage.url
              : UserImage
          }
          alt="user"
          width={100}
          height={100}
          onClick={() => document.getElementById("fileInput")?.click()}
        />
        <div className="absolute w-[24px] h-[24px] bottom-0 right-0">
          <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center">
            <Svg
              icon="cameraFillIcon"
              options={{
                size: { width: 16, height: 16 },
                viewBox: "0 0 24 24",
                color: "white",
                fillColor: "white",
              }}
            />
          </div>
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
