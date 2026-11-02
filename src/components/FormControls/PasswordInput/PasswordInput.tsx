import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import styles from './PasswordInput.module.css';

type PasswordInputProps = {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      onChange,
      placeholder,
      description,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      maxLength,
      minLength,
      autoComplete = 'current-password',
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const [isVisible, setIsVisible] = useState(false);

    const descriptionId = description ? `${inputId}-description` : undefined;

    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange?.(event.target.value);
    }

    function handleToggleMouseDown(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
    }

    return (
      <div className={styles.container}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={isVisible ? 'text' : 'password'}
            className={styles.input}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            onChange={handleChange}
          />

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setIsVisible((previous) => !previous)}
            onMouseDown={handleToggleMouseDown}
            disabled={disabled}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
