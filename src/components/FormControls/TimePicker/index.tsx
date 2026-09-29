import { forwardRef, useId, type ChangeEvent } from 'react';
import styles from './TimePicker.module.css';

type TimePickerProps = {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: string;
  max?: string;
  step?: number;
  autoComplete?: string;
};

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      onChange,
      description,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      min,
      max,
      step,
      autoComplete,
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange?.(event.target.value);
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

        <input
          ref={ref}
          id={inputId}
          name={name}
          type="time"
          className={styles.input}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          step={step}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={handleChange}
        />

        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';
