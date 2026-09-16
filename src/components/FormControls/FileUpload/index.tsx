import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import styles from './FileUpload.module.css';

export interface FileUploadRef {
  clear: () => void;
}

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
  maxFileSize?: number;
  maxFileCount?: number;
  showClearButton?: boolean;
  onChange?: (files: FileList | null) => void;
}

export const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(
  function FileUpload(
    {
      label,
      name,
      accept,
      multiple = false,
      required = false,
      disabled = false,
      helperText,
      errorMessage,
      variant = 'default',
      maxFileSize,
      maxFileCount,
      showClearButton = false,
      onChange,
    },
    ref,
  ) {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [fileSizeError, setFileSizeError] = useState('');
    const [fileCountError, setFileCountError] = useState('');

    const helperTextId = `${inputId}-helper`;
    const errorMessageId = `${inputId}-error`;

    const validationError = fileSizeError || fileCountError;
    const displayedErrorMessage = errorMessage || validationError;

    const describedBy = displayedErrorMessage
      ? errorMessageId
      : helperText
        ? helperTextId
        : undefined;

    function validateFiles(files: FileList | null): boolean {
      setFileSizeError('');
      setFileCountError('');

      if (!files) {
        return true;
      }

      if (maxFileCount !== undefined && files.length > maxFileCount) {
        setFileCountError(
          `Please select no more than ${maxFileCount} file${
            maxFileCount === 1 ? '' : 's'
          }.`,
        );
        return false;
      }

      if (maxFileSize !== undefined) {
        const oversizedFile = Array.from(files).find(
          (file) => file.size > maxFileSize,
        );

        if (oversizedFile) {
          setFileSizeError(
            `"${oversizedFile.name}" exceeds the maximum file size.`,
          );
          return false;
        }
      }

      return true;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const files = event.target.files;

      if (validateFiles(files)) {
        setSelectedFiles(files);
        onChange?.(files);
      }
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

      const files = event.dataTransfer.files;

      if (validateFiles(files)) {
        setSelectedFiles(files);
        onChange?.(files);
      }
    }

    const handleClear = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }

      setSelectedFiles(null);
      setFileSizeError('');
      setFileCountError('');
      onChange?.(null);
    }, [onChange]);

    useImperativeHandle(
      ref,
      () => ({
        clear: handleClear,
      }),
      [handleClear],
    );

    const input = (
      <input
        ref={inputRef}
        id={inputId}
        className={styles.input}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={displayedErrorMessage ? true : undefined}
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

        {showClearButton && selectedFiles && selectedFiles.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            disabled={disabled}
          >
            Clear selection
          </button>
        )}

        {helperText && !displayedErrorMessage && (
          <p id={helperTextId} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {displayedErrorMessage && (
          <p id={errorMessageId} className={styles.errorMessage} role="alert">
            {displayedErrorMessage}
          </p>
        )}
      </div>
    );
  },
);
