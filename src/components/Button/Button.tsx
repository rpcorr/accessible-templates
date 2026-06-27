import { forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled = false,
      variant = 'primary',
      type = 'button',
      ariaLabel,
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${styles.button} ${styles[variant]}`}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
