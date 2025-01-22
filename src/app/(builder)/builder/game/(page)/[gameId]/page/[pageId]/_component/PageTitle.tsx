"use client";

import React, { useState } from "react";

interface PageTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

export default function PageTitle({ title, setTitle }: PageTitleProps) {
  const [inputValue, setInputValue] = useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <input
        type="text"
        className={`w-full h-[48px] mt-[12px] bg-transparent
              border rounded-[6px]
              outline-none text-black
              p-[10px]
              placeholder:text-body-md
              `}
        placeholder={"페이지 제목을 입력해주세요."}
        value={inputValue}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
