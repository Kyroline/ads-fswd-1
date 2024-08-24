import React from "react";

const Button = ({ className, children, disabled, buttonStyle, buttonSize, ...props }) => {
    return (
        <button
            disabled={disabled}
            className={`${className ?? 'bg-primary hover:bg-primary-darker disabled:bg-tertiary text-white p-2 text-sm'} w-full transition-colors font-medium cursor-pointer`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
