import { forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
