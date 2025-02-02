"use client";

import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

interface ThumbnailProps {
  images: File[];
  isThumbnailIdx: number;
  onChange: (images: File[]) => void;
  handleThumbnailClick: (index: number) => void;
}

export default function Thumbnail({
  images,
  isThumbnailIdx,
  onChange,
  handleThumbnailClick,
}: ThumbnailProps) {
  const [currentThumbnails, setCurrentThumbnails] = useState<File[]>(images);

  const handleAddThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCurrentThumbnails([...currentThumbnails, file]);
      onChange([...currentThumbnails, file]);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="headline-sb text-white">썸네일</div>
      </div>
      <div className="flex mt-[12px] h-[75px] border border-gray-600 rounded-[8px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden"
            onChange={handleAddThumbnail}
          />
          <label
            htmlFor="thumbnail"
            className="cursor-pointer"
            // onClick={() => document.getElementById("thumbnail")?.click()}
          >
            <Svg
              icon="imageIcon"
              options={{
                size: { width: 24, height: 24 },

                color: "white",
              }}
            />
            <div className="body-md text-white mt-[2px]">사진추가</div>
          </label>
        </div>
        <div className="bg-gray-600 w-[1px]"></div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Svg
            icon="generateBIcon"
            options={{
              size: { width: 24, height: 24 },
              color: "white",
              fillColor: "white",
            }}
          />
          <div className="body-md text-white mt-[2px]">AI 생성</div>
        </div>
      </div>
      <Swiper
        className="mt-[12px] "
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={10}
        slidesPerView={1}
      >
        {currentThumbnails.map((thumbnail, index) => (
          <SwiperSlide key={index}>
            <div className="w-full aspect-square  relative">
              <Image
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
                className=" object-cover rounded-[8px]"
                fill
              />
              <div className="absolute top-3 right-3 w-[24px] h-[24px] bg-gray-800 rounded-full flex items-center justify-center">
                <Svg
                  icon="xIcon"
                  options={{
                    size: { width: 16, height: 16 },
                    color: "white",
                  }}
                />
              </div>
              {isThumbnailIdx === index ? (
                <div className="absolute bottom-3 left-3 w-[28px] h-[28px]  rounded-full flex items-center justify-center">
                  <Svg
                    icon="checkThumbnailIcon"
                    options={{
                      size: { width: 28, height: 28 },
                      viewBox: "0 0 28 28",
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => handleThumbnailClick(index)}
                  className="absolute bottom-3 left-3 w-[28px] h-[28px] border border-white  rounded-full flex items-center justify-center"
                >
                  <div className="w-full h-full bg-black opacity-10 rounded-full"></div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
