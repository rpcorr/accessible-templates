import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
};

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
