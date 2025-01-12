"use client";

import React, { useState } from "react";

export default function PageTitle() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <textarea
        className={`w-full h-[48px] mt-[12px] bg-transparent
              border rounded-[6px]


              outline-none text-white
              p-[10px]

              placeholder:text-body-md
              `}
        placeholder={"페이지 제목을 입력해주세요."}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
