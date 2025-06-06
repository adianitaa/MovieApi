//boton personalziado
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    to?: string;
}
const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    to,
    className,
    children,
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded font-semibold focus:outline-none';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};