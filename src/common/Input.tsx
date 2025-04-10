import React, { useEffect, useState } from "react";

interface InputProps {
  title: string;
  titleColor?: string;
  placeholder: string;
  value: string;
  regExp: RegExp;
  maxLength: number;
  boxHeight?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input({
  title,
  titleColor = "white",
  placeholder,
  value,
  regExp,
  maxLength,
  boxHeight,
  onChange,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleError = () => {
      if (inputValue.length === 0) {
        setIsError(false);
        return;
      }

      setIsError(!regExp.test(inputValue));
    };
    handleError();
  }, [inputValue, regExp]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) {
      setInputValue(e.target.value.slice(0, maxLength));
      return;
    }
    setInputValue(e.target.value);
    onChange(e);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <div className="headline-sb text-white" style={{ color: titleColor }}>
          {title}
        </div>
        <span className="text-red-500 ml-[2px]">*</span>
      </div>

      <textarea
        className={`w-full  mt-[12px] bg-transparent
        border rounded-[6px] resize-none

        ${isError ? "border-red-500" : "border-gray-800"}
        outline-none text-white

        placeholder:text-body-md

        ${isActive ? "placeholder:text-body-2" : "placeholder:text-gray-600"}
        `}
        style={{
          padding: "10px",
          height: `${boxHeight ? boxHeight : 48}px`,
          color: titleColor,
        }}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="flex flex-row items-center justify-end">
        <div
          className={`caption-rg mt-[4px] text-gray-600 ${
            isError ? "text-red-500" : ""
          }`}
        >
          {inputValue.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}
