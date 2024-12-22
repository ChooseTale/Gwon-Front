import React from "react";

interface ModalProps {
  modal: {
    title: string;
    content: React.ReactNode;
    confirmButtonStr: string;
  };
  handleCancel: () => void;
  handleConfirm: () => void;
}

export default function Modal({
  modal,
  handleCancel,
  handleConfirm,
}: ModalProps) {
  return (
    <div
      className="flex items-center justify-center fixed inset-0 bg-black/50"
      onClick={handleCancel}
    >
      <div
        className="flex w-full min-w-[280px] max-w-[300px] h-[220px] bg-gray-900 rounded-[12px]
        items-center flex-col "
      >
        <div className="flex w-[calc(100%-40px)] h-[120px] flex-col gap-[24px]  items-center  mt-[32px] ">
          <div className="flex text-white title2-sb ">{modal.title}</div>
          <div className="flex text-gray-100 body-rg justify-center w-[calc(100%-64px)] text-center  ">
            {modal.content}
          </div>
        </div>
        <div className="flex w-[calc(100%-40px)] justify-center gap-2 ">
          <div
            className="flex w-full h-[48px] justify-center items-center bg-gray-800 rounded-[8px] text-white  title2-md"
            onClick={handleCancel}
          >
            취소하기
          </div>
          <div
            className="flex w-full h-[48px] justify-center items-center bg-green-500 rounded-[8px] text-black title2-md"
            onClick={handleConfirm}
          >
            {modal.confirmButtonStr}
          </div>
        </div>
      </div>
    </div>
  );
}
