"use client";

import { forwardRef, useMemo, useState } from "react";

import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";

interface InputBaseProps {
  id?: string;
  name: string;
  placeHolder?: string;
  variant?: "bordered" | "underline" | "light";
  type?:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "number"
    | "date"
    | "tel"
    | "week"
    | "image";
  value?: string | number;
  defaultValue?: string | number;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  cornerHint?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  prefixIcon?: React.ReactElement;
  className?: string;
  prefixIconClassName?: string;
  required?: boolean;
  maxLength?: number;
}

const InputField = forwardRef(function Input(
  {
    id,
    name,
    placeHolder = "",
    variant = "bordered",
    type = "text",
    value,
    size = "md",
    rounded,
    disabled,
    label,
    helperText,
    cornerHint,
    error,
    errorMessage = "Whoops, we need valid details to continue.",
    success,
    prefixIcon,
    prefixIconClassName,
    className,
    required,
    ...rest
  }: InputBaseProps,
  ref: any
): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const inputProps = useMemo(() => {
    return {
      ref,
      name,
      placeholder: placeHolder,
      disabled,
      className: classNames(
        "form-input block w-full text-sm dark:bg-slate-900 dark:text-gray-400 border-gray-200 box-border",
        size === "md"
          ? "py-3 px-4"
          : size === "lg"
          ? "py-3 px-4 sm:py-5 sm:px-5"
          : "py-2 px-3",
        rounded ? "rounded-full" : "rounded-md",
        disabled && "opacity-70 pointer-events-none bg-gray-200",
        error
          ? "focus:border-red-500 focus:ring-red-500 border-red-500"
          : success
          ? "focus:border-green-500 focus:ring-green-500 border-teal-500"
          : "focus:ring-blue-500 border-blue-500 ",
        prefixIcon && type !== "textarea" && "sm:pl-10 pl-10",
        variant === "bordered"
          ? "dark:border-gray-700"
          : variant === "light"
          ? "bg-gray-50 shadow-sm"
          : "border-b border-x-0 border-t-0 rounded-none",
        className
      ),
      value,
      required,
      ...rest,
    };
  }, [
    className,
    disabled,
    error,
    name,
    placeHolder,
    prefixIcon,
    ref,
    required,
    rest,
    rounded,
    size,
    success,
    type,
    value,
    variant,
  ]);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <div>
      <div className="flex justify-between items-center">
        {label && (
          <label
            htmlFor="input-label"
            className="inline-block text-sm font-medium mb-2 text-gray-800 dark:text-white"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {cornerHint && (
          <span className="block text-sm text-gray-500 mb-2 leading-4">
            {cornerHint}
          </span>
        )}
      </div>

      {type !== "textarea" ? (
        <div className="relative">
          {prefixIcon && (
            <button
              className={classNames(
                "absolute inset-y-0 left-3 text-gray-500",
                prefixIconClassName
              )}
            >
              {prefixIcon}
            </button>
          )}
          <input
            type={!showPassword ? type : "text"}
            id={id}
            autoComplete="off"
            {...inputProps}
          />
          {type === "password" && !error && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 dark:text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          )}
          {error && (
            <div className="flex items-center absolute inset-y-0 right-0 pr-3">
              <RiErrorWarningFill className="text-red-500" />
            </div>
          )}
          {success && (
            <div className="flex items-center absolute inset-y-0 right-0 pr-3">
              <BsCheckLg className="text-teal-600" />
            </div>
          )}
        </div>
      ) : (
        <textarea id={id} {...inputProps} />
      )}
      {error && (
        <p className="text-sm text-red-400 mt-2 leading-3 tracking-tight">
          {errorMessage}
        </p>
      )}
      {success && (
        <p className="text-sm text-teal-600 mt-2 leading-3 tracking-tight">
          Looks good!
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-400 mt-2 leading-3 tracking-tight">
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
});

export default InputField;
