import React from "react";
// import './OutlineButton.scss';

export default function OutlineButton({children, color, ...props}) { 
    const child = typeof children === 'string' ? children.toUpperCase() : children;
    const colorClass = color ? `outline_button--${color}` : '';


    return <button className={`outline_button ${colorClass}`} {...props}>{child}</button>;
}
