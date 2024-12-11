import React, { useEffect, useState } from "react";

interface InputProps {
  title: string;
  placeholder: string;
  value: string;
  regExp: RegExp;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleError = () => {
      setIsError(!regExp.test(inputValue));
    };
    handleError();
  }, [inputValue, regExp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <input
        className={`w-full h-[48px] mt-[12px] bg-transparent
        border rounded-[6px]
        ${isError ? "border-red-500" : "border-gray-600"}
        outline-none text-white
        placeholder:text-white
        placeholder:text-body-md p-[10px]
        ${isActive ? "placeholder:text-body-2" : "placeholder:text-gray-600"}
        `}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="flex flex-row items-center justify-end">
        <div
          className={`caption-rg mt-[4px] text-white ${
            isError ? "text-red-500" : ""
          }`}
        >
          {inputValue.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}
