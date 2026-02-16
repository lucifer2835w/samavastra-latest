import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const classes = ['input-wrapper', fullWidth ? 'input-full' : '', className]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            {label && <label className="input-label">{label}</label>}
            <input className={`input ${error ? 'input-error' : ''}`} {...props} />
            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};
