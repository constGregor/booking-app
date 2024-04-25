"use client";
import { ChangeEvent, FC } from "react";

interface Props {
  name: string;
  text: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const InputWithLabel: FC<Props> = ({
  name,
  text,
  type,
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <label htmlFor={name}>
        {text}
        {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        className="w-full h-10 text-slate-900 pl-2 outline-dotted outline-2 outline-offset-2 outline-orange-500 rounded-md focus:outline focus:border-orange-500"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
