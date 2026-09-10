import { forwardRef, useEffect, useId, useRef } from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, id, indeterminate = false, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;

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
            className={styles.checkbox}
            aria-describedby={descriptionId}
          />
          <span>{label}</span>
        </label>

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
