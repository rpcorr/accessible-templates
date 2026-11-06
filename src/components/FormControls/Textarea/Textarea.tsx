import {
  forwardRef,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import styles from './Textarea.module.css';

type TextareaProps = {
  label: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  showCharacterCount?: boolean;
  autoResize?: boolean;
  maxAutoResizeHeight?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      id,
      name,
      value,
      defaultValue,
      onChange,
      placeholder,
      description,
      error,
      required = false,
      disabled = false,
      readOnly = false,
      rows = 4,
      maxLength,
      minLength,
      autoComplete,
      showCharacterCount = false,
      autoResize = false,
      maxAutoResizeHeight,
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? '',
    );

    const currentValue = value ?? uncontrolledValue;
    const characterCount = currentValue.length;

    const descriptionId = description ? `${textareaId}-description` : undefined;

    const errorId = error ? `${textareaId}-error` : undefined;

    const characterCountId =
      showCharacterCount && maxLength !== undefined
        ? `${textareaId}-character-count`
        : undefined;

    const describedBy =
      [descriptionId, errorId, characterCountId].filter(Boolean).join(' ') ||
      undefined;

    useLayoutEffect(() => {
      const textarea = textareaRef.current;

      if (!textarea) return;

      if (!autoResize) {
        textarea.style.height = '';
        textarea.style.overflowY = '';
        return;
      }

      // Reset the height so the textarea can shrink as well as grow.
      textarea.style.height = 'auto';

      const computedStyle = window.getComputedStyle(textarea);

      const borderHeight =
        (parseFloat(computedStyle.borderTopWidth) || 0) +
        (parseFloat(computedStyle.borderBottomWidth) || 0);

      const contentHeight = textarea.scrollHeight + borderHeight;

      const hasMaximumHeight =
        maxAutoResizeHeight !== undefined && maxAutoResizeHeight > 0;

      const targetHeight = hasMaximumHeight
        ? Math.min(contentHeight, maxAutoResizeHeight)
        : contentHeight;

      textarea.style.height = `${targetHeight}px`;

      // Allow scrolling when the maximum height is reached.
      textarea.style.overflowY =
        hasMaximumHeight && contentHeight > maxAutoResizeHeight
          ? 'auto'
          : 'hidden';
    }, [autoResize, currentValue, maxAutoResizeHeight]);

    function setTextareaRef(node: HTMLTextAreaElement | null) {
      textareaRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      const newValue = event.target.value;

      if (value === undefined) {
        setUncontrolledValue(newValue);
      }

      onChange?.(newValue);
    }

    return (
      <div className={styles.container}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <textarea
          ref={setTextareaRef}
          id={textareaId}
          name={name}
          className={`${styles.textarea} ${
            autoResize ? styles.autoResize : ''
          }`}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={handleChange}
        />

        {showCharacterCount && maxLength !== undefined && (
          <p id={characterCountId} className={styles.characterCount}>
            {characterCount} / {maxLength} characters
          </p>
        )}

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
