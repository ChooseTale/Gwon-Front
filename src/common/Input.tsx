import React, { useEffect, useState } from "react";

interface InputProps {
  title: string;
  placeholder: string;
  value: string;
  regExp: RegExp;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const getBoxHeight = (maxLength: number) => {
  if (maxLength < 50) return { height: 48, paddingTop: 0 };
  if (maxLength < 100) return { height: 48 * 2, paddingTop: 40 };
  return { height: 189, paddingTop: 100 };
};

export default function Input({
  title,
  placeholder,
  value,
  regExp,
  maxLength,
  onChange,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const boxHeight = getBoxHeight(maxLength);

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
    <div>
      <div className="flex flex-row items-center">
        <div className="headline-sb text-white">{title}</div>
        <span className="text-red-500 ml-[2px]">*</span>
      </div>
      <textarea
        className={`w-full h-[${boxHeight.height}px] mt-[12px] bg-transparent
        border rounded-[6px]

        ${isError ? "border-red-500" : "border-gray-600"}
        outline-none text-white
        p-[10px]
        pb-[${boxHeight.paddingTop}px]
        placeholder:text-body-md

        ${isActive ? "placeholder:text-body-2" : "placeholder:text-gray-600"}
        `}
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
