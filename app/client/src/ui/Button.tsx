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
  link: (loading: boolean | undefined) =>
    `inline-flex items-center p-0 border border-transparent text-xs font-medium rounded text-blue-400 ${
      loading
        ? "opacity-50"
        : ""
  }`
};

interface ButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  className?: string
  theme?: 'success' | 'default' | 'error' | 'link'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function getClassName(
  className: string | undefined,
  theme: ButtonProps['theme'] = "default",
  isLoading: boolean | undefined
) {
  const themeClass = typeof ButtonThemes[theme] == "function"
    ? ButtonThemes[theme](isLoading)
    : ""
  return className ? `${className} ${themeClass}` : themeClass
}

export const Button = ({ children, className, isLoading, onClick,  theme = 'default' }: ButtonProps) => {
  return (
    <button
      onClick={(event) => {
        if (onClick) {
          onClick(event)
        }
      }}
      type="button"
      className={getClassName(className, theme, isLoading)}
    >
      {children}
    </button>
  )
}
