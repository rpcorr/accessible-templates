import { useId } from 'react';
import styles from './RadioGroup.module.css';

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RadioGroupProps = {
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
};

export function RadioGroup({
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
}: RadioGroupProps) {
  const generatedId = useId();
  const groupName = name ?? generatedId;
  const descriptionId = description ? `${generatedId}-description` : undefined;

  return (
    <fieldset
      className={styles.group}
      aria-describedby={descriptionId}
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
              name={groupName}
              value={option.value}
              checked={value !== undefined ? value === option.value : undefined}
              defaultChecked={
                value === undefined && defaultValue === option.value
              }
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
    </fieldset>
  );
}
