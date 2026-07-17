import { forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  ariaLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ariaLabel, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
