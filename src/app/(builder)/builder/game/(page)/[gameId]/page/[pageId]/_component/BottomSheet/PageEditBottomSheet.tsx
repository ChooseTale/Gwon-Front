"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Svg from "@/common/Svg";

interface PageEditBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleTextChange: (text: string) => void;
  originalText: string;
}
export default function PageEditBottomSheet({
  isOpen,
  onOpenChange,
  handleTextChange,
  originalText,
}: PageEditBottomSheetProps) {
  const [editedText, setEditedText] = useState(originalText);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col bg-white w-full min-w-[320px] max-w-[400px] h-[calc(100%-60px)]
         rounded-t-[20px] shadow-lg  justify-self-center border-none "
        onCloseAutoFocus={() => {
          onOpenChange(false);
        }}
      >
        <SheetTitle />
        <div>
          {/* 헤더 */}
          <div className="flex flex-row justify-between items-end min-h-[48px]">
            <div
              className="flex flex-row ml-[20px] mb-[4px]"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              <Svg
                icon="xIcon"
                options={{ size: { width: 24, height: 24 }, color: "gray-700" }}
              />
            </div>
            <div
              className="flex flex-row mr-[20px] mb-[4px]"
              onClick={() => {
                handleTextChange(editedText);
                onOpenChange(false);
              }}
            >
              <Svg
                icon="checkIcon"
                options={{
                  size: { width: 24, height: 24 },
                  color: "green-500",
                }}
              />
            </div>
          </div>
          {/* 페이지 내용 */}
          <div className="flex flex-col min-h-[390px]  ">
            <div className="flex mt-4 ml-[20px] mr-[20px] headline-sb">
              블럭 내용
            </div>
            <div className="flex min-h-[340px]  ml-[20px] mr-[20px] mt-3 border-[1px] border-gray-200 rounded-[8px]">
              <textarea
                className="flex body-md w-full mx-4 my-4 resize-none"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder={`이건 블럭이에요.
게임을 할 때 터치 한번에 노출될 글을 한 블럭에 적으면 돼요.`}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
