"use client";

import UserImage from "@/assets/png/UserImage.png";
import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useState } from "react";

import { useMeStore } from "@/store/User/Me/Me.store";
import compressImage from "@/common/Image/ImageCompression";

interface ProfileProps {
  userData: ReturnType<typeof useMeStore.getState>["me"];
  handleFileChange: (file: File) => void;
}

export default function Profile({ userData, handleFileChange }: ProfileProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleCurrentFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await compressImage(file);

      if (compressedFile) {
        setFile(compressedFile);
        handleFileChange(compressedFile);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <Image
          className="w-[84px] h-[84px] rounded-[18px] object-cover cursor-pointer"
          src={
            file
              ? URL.createObjectURL(file)
              : userData.profileImage?.url
              ? userData.profileImage.url
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
          onChange={handleCurrentFileChange}
        />
      </div>
    </div>
  );
}
