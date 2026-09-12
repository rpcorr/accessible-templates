import { forwardRef, useId } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectBaseProps = {
  label: string;
  options: SelectOption[];
  id?: string;
  name?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

type SingleSelectProps = SelectBaseProps & {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type MultipleSelectProps = SelectBaseProps & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

type SelectProps = SingleSelectProps | MultipleSelectProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      options,
      id,
      name,
      placeholder,
      description,
      error,
      required = false,
      disabled = false,
    } = props;

    const generatedId = useId();
    const selectId = id ?? generatedId;

    const descriptionId = description ? `${selectId}-description` : undefined;

    const errorId = error ? `${selectId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const isMultiple = props.multiple === true;

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
          className={`${styles.select} ${isMultiple ? styles.multiple : ''}`}
          {...(props.multiple
            ? {
                multiple: true,
                ...(props.value !== undefined
                  ? { value: props.value }
                  : { defaultValue: props.defaultValue }),
                onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValues = Array.from(
                    event.target.selectedOptions,
                    (option) => option.value,
                  );

                  props.onChange?.(selectedValues);
                },
              }
            : {
                ...(props.value !== undefined
                  ? { value: props.value }
                  : { defaultValue: props.defaultValue }),
                onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
                  props.onChange?.(event.target.value);
                },
              })}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          disabled={disabled}
        >
          {!isMultiple && placeholder && (
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
