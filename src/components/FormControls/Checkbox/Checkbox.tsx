import { forwardRef, useEffect, useId, useRef } from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, id, indeterminate = false, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;

    const describedBy =
      [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    function setRefs(element: HTMLInputElement | null) {
      inputRef.current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    }

    return (
      <div className={styles.container}>
        <label htmlFor={checkboxId} className={styles.label}>
          <input
            {...props}
            ref={setRefs}
            id={checkboxId}
            type="checkbox"
            className={`${styles.checkbox} ${error ? styles.inputError : ''}`}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
          />
          <span>{label}</span>
        </label>

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}

        {description && (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
