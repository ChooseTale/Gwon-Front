"use client";

import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useCallback, useState } from "react";

import "swiper/css";
import compressImage from "@/common/Image/ImageCompression";

interface ThumbnailProps {
  images: File[];
  isThumbnailIdx: number;
  onChange: (images: File[]) => void;
  handleThumbnailClick: (index: number) => void;
  recommendThumbnailData: {
    title: string;
    description: string;
    genre: string;
  };
}

export default function Thumbnail({
  images,
  isThumbnailIdx,
  onChange,
  handleThumbnailClick,
}: ThumbnailProps) {
  const [currentThumbnails, setCurrentThumbnails] = useState<File[]>(images);

  const isMaxThumbnail = useCallback(() => {
    return currentThumbnails.length >= 5;
  }, [currentThumbnails]);

  const handleAddThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMaxThumbnail()) {
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await compressImage(file);
      if (compressedFile) {
        setCurrentThumbnails([...currentThumbnails, compressedFile]);
        onChange([...currentThumbnails, compressedFile]);
      }
    }
  };

  const handleDeleteThumbnail = (index: number) => {
    const newThumbnails = currentThumbnails.filter((_, i) => i !== index);
    setCurrentThumbnails(newThumbnails);
    onChange(newThumbnails);

    // input 요소의 value를 초기화하여 같은 파일을 다시 선택할 수 있게 함
    const fileInput = document.getElementById("thumbnail") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // const me = useMeStore((state) => state.me);

  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-row items-center">
          <div className="headline-sb text-white">썸네일 (5장 중 1장 선택)</div>
        </div>
        <div className="flex mt-[12px] h-[75px] border border-gray-800 rounded-[8px]">
          <div className="flex flex-1 flex-col justify-center items-center">
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              className="hidden"
              onChange={handleAddThumbnail}
              disabled={isMaxThumbnail()}
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

                  // color: isMaxThumbnail() ? "gray-600" : "gray-100",
                  fillColor: isMaxThumbnail() ? "gray-600" : "gray-100",
                }}
              />
              <div
                className={`body-md ${
                  isMaxThumbnail() ? "text-gray-600" : "text-gray-100"
                } mt-[2px]`}
              >
                사진추가
              </div>
            </label>
          </div>
          <div className="bg-gray-600 w-[1px]"></div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <Svg
              icon="generateBIcon"
              options={{
                size: { width: 24, height: 24 },
                color: "gray-600",
                fillColor: "gray-600",
              }}
            />
            <div className="body-md text-gray-600 mt-[2px]">AI 생성</div>
          </div>
        </div>
        <div className="flex flex-row gap-[10px] mt-[12px] overflow-x-auto">
          {currentThumbnails.map((thumbnail, index) => (
            <div className="min-w-[140px] aspect-square  relative" key={index}>
              <Image
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
                className=" object-cover rounded-[8px]"
                fill
              />
              <div
                className="absolute top-[6px] right-[6px] w-[24px] h-[24px] bg-gray-800 rounded-full flex items-center justify-center"
                onClick={() => handleDeleteThumbnail(index)}
              >
                <Svg
                  icon="xIcon"
                  options={{
                    size: { width: 16, height: 16 },
                    color: "white",
                  }}
                />
              </div>
              {isThumbnailIdx === index ? (
                <div className="absolute bottom-[6px] left-[6px] w-[20px] h-[20px]  rounded-full flex items-center justify-center">
                  <Svg
                    icon="checkThumbnailIcon"
                    options={{
                      size: { width: 20, height: 20 },
                      viewBox: "0 0 20 20",
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => handleThumbnailClick(index)}
                  className="absolute bottom-[6px] left-[6px] w-[20px] h-[20px] border border-white  rounded-full flex items-center justify-center"
                >
                  <div className="w-full h-full bg-black opacity-10 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
