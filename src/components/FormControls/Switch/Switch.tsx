import { forwardRef, useId } from 'react';
import styles from './Switch.module.css';

type SwitchProps = {
  label: string;
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  colour?: 'default' | 'success' | 'warning' | 'error' | 'info';
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      id,
      name,
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      required = false,
      description,
      colour = 'default',
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const descriptionId = description ? `${switchId}-description` : undefined;

    return (
      <div className={styles.container}>
        <label htmlFor={switchId} className={styles.label}>
          <span className={styles.control}>
            <input
              ref={ref}
              id={switchId}
              name={name}
              type="checkbox"
              role="switch"
              className={styles.input}
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={disabled}
              required={required}
              aria-describedby={descriptionId}
              onChange={(event) => {
                onChange?.(event.target.checked);
              }}
            />

            <span
              className={`${styles.track} ${styles[colour]}`}
              aria-hidden="true"
            >
              <span className={styles.thumb} />
            </span>
          </span>

          <span className={styles.labelText}>{label}</span>
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
