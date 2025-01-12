"use client";

import React, { useState } from "react";

interface BlockProps {
  text: string;
  isActive: boolean;
}

export default function Block({ text, isActive }: BlockProps) {
  const [editedText, setEditedText] = useState(text);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  if (!isActive) {
    return (
      <div className="flex w-full h-full flex-col gap-0.5 ">
        <div className="flex w-full h-full body-md">{text}</div>
        {/* <터치> */}
        <div className="flex  caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex w-full h-full flex-col gap-0.5 ">
        <textarea
          className="flex w-full h-full body-md"
          value={editedText}
          onChange={handleTextChange}
          autoFocus
        />
      </div>
    );
  }
}
