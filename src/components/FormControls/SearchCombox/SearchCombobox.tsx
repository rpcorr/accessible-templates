import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import styles from './SearchCombobox.module.css';

type SearchComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SearchComboboxProps = {
  label: string;
  options: SearchComboboxOption[];
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
};

export function SearchCombobox({
  label,
  options,
  id,
  name,
  value,
  defaultValue = '',
  onChange,
  placeholder,
  description,
  error,
  required = false,
  disabled = false,
}: SearchComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const statusId = `${inputId}-status`;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [statusMessage, setStatusMessage] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const statusTimeoutRef = useRef<number | null>(null);

  const currentValue = value ?? internalValue;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(currentValue.toLowerCase()),
  );

  const enabledOptions = filteredOptions.filter((option) => !option.disabled);

  const activeOption =
    activeIndex >= 0 ? enabledOptions[activeIndex] : undefined;

  const activeOptionIndex = activeOption
    ? filteredOptions.indexOf(activeOption)
    : -1;

  const activeOptionId =
    activeOptionIndex >= 0
      ? `${inputId}-option-${activeOptionIndex}`
      : undefined;

  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  useEffect(() => {
    if (activeOptionIndex < 0) {
      return;
    }

    const activeElement = optionRefs.current[activeOptionIndex];

    activeElement?.scrollIntoView({
      block: 'nearest',
    });
  }, [activeOptionIndex]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
        setStatusMessage('');
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current !== null) {
        window.clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  function updateValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;

    updateValue(nextValue);
    setIsOpen(true);
    setActiveIndex(-1);
    setStatusMessage('');

    if (statusTimeoutRef.current !== null) {
      window.clearTimeout(statusTimeoutRef.current);
    }

    const matchingOptions = options.filter((option) =>
      option.label.toLowerCase().includes(nextValue.toLowerCase()),
    );

    statusTimeoutRef.current = window.setTimeout(() => {
      if (matchingOptions.length === 0) {
        setStatusMessage('No results found.');
      } else {
        const resultCount =
          matchingOptions.length === 1
            ? '1 result available.'
            : `${matchingOptions.length} results available.`;

        setStatusMessage(resultCount);
      }

      statusTimeoutRef.current = null;
    }, 300);
  }

  function handleSelect(option: SearchComboboxOption) {
    if (option.disabled) {
      return;
    }

    if (statusTimeoutRef.current !== null) {
      window.clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }

    updateValue(option.value);
    setIsOpen(false);
    setActiveIndex(-1);
    setStatusMessage('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        if (enabledOptions.length === 0) {
          return;
        }

        setActiveIndex((currentIndex) => {
          const nextIndex = currentIndex + 1;

          return nextIndex >= enabledOptions.length ? 0 : nextIndex;
        });

        break;
      }

      case 'ArrowUp': {
        event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        if (enabledOptions.length === 0) {
          return;
        }

        setActiveIndex((currentIndex) => {
          const nextIndex =
            currentIndex <= 0 ? enabledOptions.length - 1 : currentIndex - 1;

          return nextIndex;
        });

        break;
      }

      case 'Enter': {
        if (!isOpen || activeIndex < 0) {
          return;
        }

        event.preventDefault();

        if (activeOption) {
          handleSelect(activeOption);
        }

        break;
      }

      case 'Escape': {
        if (isOpen) {
          event.preventDefault();

          if (statusTimeoutRef.current !== null) {
            window.clearTimeout(statusTimeoutRef.current);
            statusTimeoutRef.current = null;
          }

          setIsOpen(false);
          setActiveIndex(-1);
          setStatusMessage('');
        }

        break;
      }

      case 'Tab': {
        if (statusTimeoutRef.current !== null) {
          window.clearTimeout(statusTimeoutRef.current);
          statusTimeoutRef.current = null;
        }

        setIsOpen(false);
        setActiveIndex(-1);
        setStatusMessage('');
        break;
      }
    }
  }

  return (
    <div ref={wrapperRef} className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}

      <div className={styles.comboboxWrapper}>
        <input
          id={inputId}
          name={name}
          type="search"
          role="combobox"
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={activeOptionId}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : undefined}
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => {
            if (!disabled) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />

        <div
          id={statusId}
          className={styles.status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {isOpen ? statusMessage : ''}
        </div>

        {isOpen && (
          <div className={styles.popup}>
            {filteredOptions.length > 0 ? (
              <ul id={listboxId} role="listbox" className={styles.listbox}>
                {filteredOptions.map((option, index) => {
                  const enabledIndex = enabledOptions.indexOf(option);
                  const isActive = enabledIndex === activeIndex;

                  return (
                    <li
                      key={option.value}
                      id={`${inputId}-option-${index}`}
                      ref={(element) => {
                        optionRefs.current[index] = element;
                      }}
                      role="option"
                      aria-selected={currentValue === option.value}
                      aria-disabled={option.disabled || undefined}
                      className={`${styles.option} ${
                        isActive ? styles.active : ''
                      } ${option.disabled ? styles.disabled : ''}`}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        )}

        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
