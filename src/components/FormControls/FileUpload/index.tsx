import { useId, type ChangeEvent } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  errorMessage?: string;
  onChange?: (files: FileList | null) => void;
}

export function FileUpload({
  label,
  name,
  accept,
  multiple = false,
  required = false,
  disabled = false,
  helperText,
  errorMessage,
  onChange,
}: FileUploadProps) {
  const inputId = useId();
  const helperTextId = `${inputId}-helper`;
  const errorMessageId = `${inputId}-error`;

  const describedBy = errorMessage
    ? errorMessageId
    : helperText
      ? helperTextId
      : undefined;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.files);
  }

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={inputId}
        className={styles.input}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={errorMessage ? true : undefined}
        onChange={handleChange}
      />

      {helperText && !errorMessage && (
        <p id={helperTextId} className={styles.helperText}>
          {helperText}
        </p>
      )}

      {errorMessage && (
        <p id={errorMessageId} className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
