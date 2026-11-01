import { useId, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './ColourPicker.module.css';
import type { ColourPickerProps } from './ColourPicker.types';

const DEFAULT_COLOUR = '#000000';

export function ColourPicker({
  label,
  value,
  defaultValue = DEFAULT_COLOUR,
  onChange,
  instructions,
  error,
  required = false,
  disabled = false,
  showHexInput = true,
  name,
  className,
  id,
  ...rest
}: ColourPickerProps) {
  const generatedId = useId();
  const inputId = id ?? `colour-picker-${generatedId}`;
  const hexInputId = `${inputId}-hex`;
  const instructionsId = `${inputId}-instructions`;
  const errorId = `${inputId}-error`;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const selectedColour = value ?? internalValue;

  const [hexState, setHexState] = useState({
    sourceColour: selectedColour,
    draft: selectedColour.toUpperCase(),
  });

  if (hexState.sourceColour !== selectedColour) {
    setHexState({
      sourceColour: selectedColour,
      draft: selectedColour.toUpperCase(),
    });
  }

  const hexDraft = hexState.draft;

  const describedBy =
    [instructions ? instructionsId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColour = event.target.value;

    if (value === undefined) {
      setInternalValue(newColour);
    }

    setHexState({
      sourceColour: newColour,
      draft: newColour.toUpperCase(),
    });

    onChange?.(newColour);
  };

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColour = event.target.value.toUpperCase();

    const isValidColour = /^#[0-9A-F]{6}$/.test(newColour);

    setHexState({
      sourceColour: isValidColour ? newColour : selectedColour,
      draft: newColour,
    });

    if (isValidColour) {
      if (value === undefined) {
        setInternalValue(newColour);
      }

      onChange?.(newColour);
    }
  };

  const handleHexBlur = () => {
    if (!/^#[0-9A-F]{6}$/.test(hexDraft)) {
      setHexState({
        sourceColour: selectedColour,
        draft: selectedColour.toUpperCase(),
      });
    }
  };

  const containerClassName = [
    styles.container,
    disabled && styles.disabled,
    error && styles.hasError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} {...rest}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.inputGroup}>
        <input
          id={inputId}
          type="color"
          name={name}
          value={selectedColour}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={styles.colourInput}
        />

        {showHexInput && (
          <div className={styles.hexInputWrapper}>
            <label htmlFor={hexInputId} className={styles.visuallyHidden}>
              {`${label} hexadecimal value`}
            </label>

            <input
              id={hexInputId}
              type="text"
              value={hexDraft}
              onChange={handleHexChange}
              onBlur={handleHexBlur}
              disabled={disabled}
              className={styles.hexInput}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              pattern="^#[0-9A-Fa-f]{6}$"
              maxLength={7}
            />
          </div>
        )}
      </div>

      {instructions && (
        <p id={instructionsId} className={styles.instructions}>
          {instructions}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default ColourPicker;
