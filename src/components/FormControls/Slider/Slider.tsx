import { forwardRef, useId, useState, type ChangeEvent } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  label: string;
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  description?: string;
  showValue?: boolean;
  colour?: 'default' | 'success' | 'warning' | 'error' | 'info';
  orientation?: 'horizontal' | 'vertical';
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      id,
      name,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = 50,
      onChange,
      disabled = false,
      description,
      showValue = true,
      colour = 'default',
      orientation = 'horizontal',
    },
    ref,
  ) => {
    const generatedId = useId();
    const sliderId = id ?? generatedId;
    const descriptionId = description ? `${sliderId}-description` : undefined;

    const [internalValue, setInternalValue] = useState(value ?? defaultValue);

    const currentValue = value ?? internalValue;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const nextValue = Number(event.target.value);

      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    }

    return (
      <div
        className={`${styles.container} ${
          orientation === 'vertical' ? styles.vertical : ''
        }`}
      >
        <div className={styles.header}>
          <label htmlFor={sliderId} className={styles.label}>
            {label}
          </label>

          {showValue && (
            <output htmlFor={sliderId} className={styles.value}>
              {currentValue}
            </output>
          )}
        </div>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <input
          ref={ref}
          id={sliderId}
          name={name}
          type="range"
          className={`${styles.slider} ${styles[colour]} ${
            orientation === 'vertical' ? styles.sliderVertical : ''
          }`}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          disabled={disabled}
          aria-describedby={descriptionId}
          onChange={handleChange}
        />
      </div>
    );
  },
);

Slider.displayName = 'Slider';
