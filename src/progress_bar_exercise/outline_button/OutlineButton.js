import React from "react";
// import './OutlineButton.scss';

export default function OutlineButton({ children, className, ...props }) {
  const child =
    typeof children === "string" ? children.toUpperCase() : children;

  return (
    <button className={`outline_button ${className}`} {...props}>
      {child}
    </button>
  );
}
