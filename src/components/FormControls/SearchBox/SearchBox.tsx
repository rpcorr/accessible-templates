import { forwardRef, useId, type ChangeEvent, type FormEvent } from 'react';
import styles from './SearchBox.module.css';

type SearchBoxProps = {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  rounded?: boolean;
  showIcon?: boolean;
  iconInside?: boolean;
  inputClassName?: string;
  expandOnFocus?: boolean;
};

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      onChange,
      onSearch,
      placeholder,
      description,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      maxLength,
      minLength,
      autoComplete,
      rounded = false,
      showIcon = false,
      iconInside = false,
      inputClassName,
      expandOnFocus = false,
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const searchValue = event.currentTarget.elements.namedItem(
        name ?? inputId,
      ) as HTMLInputElement | null;

      onSearch?.(searchValue?.value ?? '');
    }

    return (
      <form className={styles.container} onSubmit={handleSubmit} role="search">
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <div
          className={`${styles.inputWrapper} ${rounded ? styles.rounded : ''} ${
            iconInside ? styles.iconInside : ''
          } ${expandOnFocus ? styles.expandable : ''}`}
        >
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="search"
            className={`${styles.input} ${
              iconInside ? styles.inputWithIcon : ''
            } ${inputClassName ?? ''}`}
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
            type="submit"
            className={`${styles.searchButton} ${
              iconInside ? styles.insideIconButton : ''
            }`}
            disabled={disabled}
            aria-label={iconInside || showIcon ? 'Search' : undefined}
          >
            {iconInside || showIcon ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className={styles.searchIcon}
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            ) : (
              'Search'
            )}
          </button>
        </div>
        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </form>
    );
  },
);

SearchBox.displayName = 'SearchBox';
