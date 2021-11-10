import React from "react";
import PropTypes from "prop-types";

const ButtonThemes = {
  success: (loading) =>
    `inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 ${
      loading
        ? "opacity-50"
        : "hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    }`,
  default: (loading) =>
    `inline-flex items-center px-1.5 py-0.5 border border-gray-200 text-xs font-medium rounded ${
      loading
        ? "opacity-50"
        : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
    }`,
  error: (loading) =>
    `inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-white bg-red-500 ${
      loading
        ? "opacity-50"
        : "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
    }`,
};

const Button = ({ theme, onClick, children, isLoading }) => {
  return (
    <button
      onClick={(event) => {
        if (onClick) {
          onClick(event);
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
  );
};

Button.propTypes = {
  theme: PropTypes.oneOf(["success", "default", "error"]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  theme: "default",
};

export default Button;
