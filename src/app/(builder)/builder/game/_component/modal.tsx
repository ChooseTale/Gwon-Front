import React from "react";

interface BuilderModalProps {
  title: string;
  description: string;
  closeText: string;
  onClose: () => void;
  confirmText: string;
  onConfirm: () => void;
}

export default function BuilderModal({
  title,
  description,
  closeText,
  onClose,
  confirmText,
  onConfirm,
}: BuilderModalProps) {
  return (
    <div className="fixed flex inset-0  justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="flex w-full h-full flex-col justify-center items-center relative">
        <div
          className="flex flex-col  w-[300px] h-[200px]   bg-white rounded-[12px]
        pt-[32px] px-[20px] pb-[20px]  shadow-lg z-30"
        >
          <div className="flex w-full h-[100px] justify-between items-center flex-col">
            <span className="title2-sb text-black">{title}</span>
            <span className="body-rg text-gray-500 mb-8">{description}</span>
          </div>
          <div className="flex w-full h-[48px] gap-2 justify-between items-center">
            <button
              className="w-full h-full bg-gray-400 text-white rounded-[12px] title2-md"
              onClick={onClose}
            >
              {closeText}
            </button>
            <button
              className="w-full h-full bg-green-500 text-white rounded-[12px] title2-md"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
