import { useId, useState, type ChangeEvent, type DragEvent } from 'react';
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
  variant?: 'default' | 'dropzone';
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
  variant = 'default',
  onChange,
}: FileUploadProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
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

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (!disabled) {
      setIsDragging(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setIsDragging(false);
    onChange?.(event.dataTransfer.files);
  }

  const input = (
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
  );

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {variant === 'dropzone' ? (
        <div
          className={`${styles.dropzone} ${
            isDragging ? styles.dropzoneDragging : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop files here</p>
          <p>or</p>
          {input}
        </div>
      ) : (
        input
      )}

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
