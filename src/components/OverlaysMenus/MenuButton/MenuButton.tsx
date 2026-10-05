import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import type { MenuButtonProps } from './MenuButton.types';

import styles from './MenuButton.module.css';

export function MenuButton({
  label,
  items,
  disabled = false,
  id,
  className = '',
  menuClassName = '',
  onOpen,
  onClose,
}: MenuButtonProps) {
  const generatedId = useId();

  const buttonId = id ?? `menu-button-${generatedId}`;
  const menuId = `${buttonId}-menu`;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const typeaheadRef = useRef('');
  const typeaheadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const enabledIndexes = items.reduce<number[]>((indexes, item, index) => {
    if (!item.disabled) {
      indexes.push(index);
    }

    return indexes;
  }, []);

  const closeMenu = useCallback(
    (returnFocus = true) => {
      setIsOpen(false);
      setFocusedIndex(-1);
      onClose?.();

      if (returnFocus) {
        requestAnimationFrame(() => {
          buttonRef.current?.focus();
        });
      }
    },
    [onClose],
  );

  const openMenu = (initialIndex?: number) => {
    if (disabled || enabledIndexes.length === 0) {
      return;
    }

    setIsOpen(true);
    onOpen?.();

    setFocusedIndex(initialIndex ?? enabledIndexes[0]);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const moveFocus = (direction: 1 | -1) => {
    if (enabledIndexes.length === 0) {
      return;
    }

    const currentPosition = enabledIndexes.indexOf(focusedIndex);

    const nextPosition =
      currentPosition === -1
        ? direction === 1
          ? 0
          : enabledIndexes.length - 1
        : (currentPosition + direction + enabledIndexes.length) %
          enabledIndexes.length;

    setFocusedIndex(enabledIndexes[nextPosition]);
  };

  const handleTypeahead = (character: string) => {
    if (enabledIndexes.length === 0) {
      return;
    }

    const searchTerm = `${typeaheadRef.current}${character.toLowerCase()}`;

    const currentPosition = enabledIndexes.indexOf(focusedIndex);

    const orderedIndexes =
      currentPosition === -1
        ? enabledIndexes
        : [
            ...enabledIndexes.slice(currentPosition + 1),
            ...enabledIndexes.slice(0, currentPosition + 1),
          ];

    const matchingIndex = orderedIndexes.find((index) =>
      items[index].label.toLowerCase().startsWith(searchTerm),
    );

    if (matchingIndex !== undefined) {
      setFocusedIndex(matchingIndex);
      typeaheadRef.current = searchTerm;
    } else {
      const singleCharacterMatch = orderedIndexes.find((index) =>
        items[index].label.toLowerCase().startsWith(character.toLowerCase()),
      );

      if (singleCharacterMatch !== undefined) {
        setFocusedIndex(singleCharacterMatch);
        typeaheadRef.current = character.toLowerCase();
      }
    }

    if (typeaheadTimeoutRef.current) {
      clearTimeout(typeaheadTimeoutRef.current);
    }

    typeaheadTimeoutRef.current = setTimeout(() => {
      typeaheadRef.current = '';
    }, 500);
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        toggleMenu();
        break;

      case 'ArrowDown':
        event.preventDefault();

        if (!isOpen) {
          openMenu();
        } else {
          moveFocus(1);
        }

        break;

      case 'ArrowUp':
        event.preventDefault();

        if (!isOpen) {
          openMenu(enabledIndexes[enabledIndexes.length - 1]);
        } else {
          moveFocus(-1);
        }

        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeMenu();
        }

        break;

      default:
        break;
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        moveFocus(-1);
        break;

      case 'Home':
        event.preventDefault();

        if (enabledIndexes.length > 0) {
          setFocusedIndex(enabledIndexes[0]);
        }

        break;

      case 'End':
        event.preventDefault();

        if (enabledIndexes.length > 0) {
          setFocusedIndex(enabledIndexes[enabledIndexes.length - 1]);
        }

        break;

      case 'Escape':
        event.preventDefault();
        closeMenu();
        break;

      case 'Tab':
        closeMenu(false);
        break;

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          handleTypeahead(event.key);
        }

        break;
    }
  };

  const handleItemSelect = (
    index: number,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const item = items[index];

    if (item.disabled) {
      return;
    }

    item.onSelect?.();
    closeMenu();
  };

  useEffect(() => {
    if (!isOpen || focusedIndex < 0) {
      return;
    }

    itemRefs.current[focusedIndex]?.focus();
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        closeMenu(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    return () => {
      if (typeaheadTimeoutRef.current) {
        clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        className={styles.button}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        disabled={disabled}
        onClick={toggleMenu}
        onKeyDown={handleButtonKeyDown}
      >
        <span>{label}</span>

        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className={`${styles.menu} ${menuClassName}`}
          role="menu"
          aria-labelledby={buttonId}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              role="menuitem"
              className={styles.menuItem}
              disabled={item.disabled}
              tabIndex={focusedIndex === index ? 0 : -1}
              onClick={(event) => handleItemSelect(index, event)}
            >
              {item.icon && (
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
              )}

              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
