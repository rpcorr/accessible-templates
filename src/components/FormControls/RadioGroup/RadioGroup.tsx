import { useId } from 'react';
import styles from './RadioGroup.module.css';

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  id?: string;
  label: string;
  options: RadioOption[];
  name?: string;
  value?: string;

  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  error?: string;
};

export function RadioGroup({
  id,
  label,
  options,
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  description,
  orientation = 'vertical',
  error,
}: RadioGroupProps) {
  const generatedId = useId();
  const groupName = name ?? generatedId;
  const descriptionId = description ? `${generatedId}-description` : undefined;
  const errorId = error ? `${generatedId}-error` : undefined;

  return (
    <fieldset
      id={id}
      className={styles.group}
      aria-describedby={
        [descriptionId, errorId].filter(Boolean).join(' ') || undefined
      }
      disabled={disabled}
    >
      <legend className={styles.legend}>{label}</legend>

      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}

      <div
        className={`${styles.options} ${
          orientation === 'horizontal' ? styles.horizontal : ''
        }`}
      >
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              className={error ? styles.inputError : undefined}
              name={groupName}
              value={option.value}
              {...(value !== undefined
                ? { checked: value === option.value }
                : { defaultChecked: defaultValue === option.value })}
              disabled={disabled || option.disabled}
              required={required}
              onChange={(event) => {
                if (event.target.checked) {
                  onChange?.(event.target.value);
                }
              }}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
