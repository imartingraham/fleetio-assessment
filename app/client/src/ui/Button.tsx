import React, {MouseEventHandler} from "react";

const ButtonThemes = {
  success: (loading: boolean | undefined) =>
    `inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 ${
      loading
        ? "opacity-50"
        : "hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    }`,
  default: (loading: boolean | undefined) =>
    `inline-flex items-center px-1.5 py-0.5 border border-gray-200 text-xs font-medium rounded ${
      loading
        ? "opacity-50"
        : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
    }`,
  error: (loading: boolean | undefined) =>
    `inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-white bg-red-500 ${
      loading
        ? "opacity-50"
        : "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
    }`,
};

interface ButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  theme: 'success' | 'default' | 'error'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ theme = 'default', onClick, children, isLoading }: ButtonProps) => {
  return (
    <button
      onClick={(event) => {
        if (onClick) {
          onClick(event)
        }
      }}
      type="button"
      className={
        typeof ButtonThemes[theme] == "function"
          ? ButtonThemes[theme](isLoading)
          : ""
      }
    >
      {children}
    </button>
  )
}
