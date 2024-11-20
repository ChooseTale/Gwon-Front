import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  required: boolean;
  maxCount?: number;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
  maxCount,
  ...props
}: InputProps) {
  const isError = error || (maxCount && value.length / maxCount > 0.8);

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-headline text-white">
        {label}
        {required && (
          <span className="inline-block ml-[3px] -translate-y-[1px] text-red-500">
            *
          </span>
        )}
      </label>
      <div className="w-full">
        <input
          type="text"
          placeholder={placeholder}
          {...props}
          value={value}
          onChange={onChange}
          className={`w-full h-12 text-body text-white bg-transparent border-grey-600 focus:border-grey-400 border-solid border-[1px] rounded-md px-4 py-2 outline-none ${
            isError ? "!border-red-500 !focus:border-red-500 !text-red-500" : ""
          }`}
          maxLength={maxCount}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p className="text-body text-red-500 mt-1 mx-[1px]">{error}</p>
            )}
          </div>
          {maxCount && (
            <p
              className={`text-caption text-grey-600 mt-1 mx-[1px] ${
                isError ? "!text-red-500" : ""
              }`}
            >
              {value.length}/{maxCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
