import { forwardRef, useId } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
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
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
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
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const descriptionId = description ? `${selectId}-description` : undefined;

    const errorId = error ? `${selectId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={styles.container}>
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && (
            <span aria-hidden="true" className={styles.required}>
              *
            </span>
          )}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <select
          ref={ref}
          id={selectId}
          name={name}
          className={styles.select}
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={(event) => onChange?.(event.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
