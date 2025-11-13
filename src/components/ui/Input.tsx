import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  value: string;
  onChange: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      iconPosition = 'left',
      disabled = false,
      required = false,
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const baseInputStyles = 'w-full h-11 px-4 bg-surface border rounded-md text-text-primary placeholder:text-text-tertiary transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed';

    const errorStyles = error
      ? 'border-error focus:ring-error focus:border-error'
      : 'border-border';

    const iconPaddingStyles = icon
      ? iconPosition === 'left'
        ? 'pl-11'
        : 'pr-11'
      : '';

    const inputClassName = `${baseInputStyles} ${errorStyles} ${iconPaddingStyles} ${className}`.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-text-primary">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span
              className={`absolute top-1/2 -translate-y-1/2 ${
                iconPosition === 'left' ? 'left-3' : 'right-3'
              } text-text-secondary material-symbols-outlined text-xl pointer-events-none`}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            className={inputClassName}
            disabled={disabled}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
          />
        </div>

        {helperText && !error && (
          <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
        )}

        {error && (
          <p className="mt-1 text-sm text-error flex items-center gap-1">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
