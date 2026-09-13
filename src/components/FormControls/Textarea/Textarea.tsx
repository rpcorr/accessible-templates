import { forwardRef, useId, type ChangeEvent } from 'react';
import styles from './Textarea.module.css';

type TextareaProps = {
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
  rows?: number;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 4,
      maxLength,
      minLength,
      autoComplete,
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const descriptionId = description ? `${textareaId}-description` : undefined;

    const errorId = error ? `${textareaId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(event.target.value);
    }

    return (
      <div className={styles.container}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          className={styles.textarea}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={handleChange}
        />

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
