import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import styles from './Combobox.module.css';

type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ComboboxProps = {
  label: string;
  options: ComboboxOption[];
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
};

export function Combobox({
  label,
  options,
  id,
  name,
  value,
  defaultValue = '',
  onChange,
  placeholder,
  description,
  required = false,
  disabled = false,
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

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
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  function updateValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateValue(event.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }

  function handleSelect(option: ComboboxOption) {
    if (option.disabled) {
      return;
    }

    updateValue(option.value);
    setIsOpen(false);
    setActiveIndex(-1);
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
          setIsOpen(false);
          setActiveIndex(-1);
        }

        break;
      }

      case 'Tab': {
        setIsOpen(false);
        setActiveIndex(-1);
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
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          role="combobox"
          className={styles.input}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={activeOptionId}
          aria-describedby={descriptionId}
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => {
            if (!disabled) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />

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
              <div className={styles.noResults}>No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
