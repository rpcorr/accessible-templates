import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ContextMenuContext } from './ContextMenuContext';
import type {
  ComponentType,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';

import styles from './ContextMenu.module.css';

export interface ContextMenuTriggerProps {
  'aria-haspopup': 'menu';
  'aria-expanded': boolean;
  onContextMenu: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export interface ContextMenuProps {
  trigger: ComponentType<
    ContextMenuTriggerProps & {
      children: ReactNode;
    }
  >;
  triggerContent: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export default function ContextMenu({
  trigger: Trigger,
  triggerContent,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: ContextMenuProps) {
  const menuId = useId();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const typeaheadRef = useRef('');
  const typeaheadTimeoutRef = useRef<number | null>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const VIEWPORT_MARGIN = 8;

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const openMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      event.preventDefault();

      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        restoreFocusRef.current = activeElement;
      }

      setPosition({
        top: event.clientY,
        left: event.clientX,
      });

      setOpen(true);
    },
    [disabled, setOpen],
  );

  const openMenuFromKeyboard = useCallback(() => {
    if (disabled) {
      return;
    }

    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      restoreFocusRef.current = activeElement;
    }

    const trigger = wrapperRef.current?.querySelector<HTMLElement>(
      '[aria-haspopup="menu"]',
    );

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();

    setPosition({
      top: rect.bottom,
      left: rect.left,
    });

    setOpen(true);
  }, [disabled, setOpen]);

  const closeMenu = useCallback(
    (restoreFocus = true) => {
      if (restoreFocus && !restoreFocusRef.current) {
        const activeElement = document.activeElement;

        if (activeElement instanceof HTMLElement) {
          restoreFocusRef.current = activeElement;
        }
      }

      setOpen(false);
    },
    [setOpen],
  );

  useEffect(() => {
    return () => {
      if (typeaheadTimeoutRef.current !== null) {
        window.clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  /*
   * Focus the first menu item when the menu opens.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    requestAnimationFrame(() => {
      const firstItem = menuRef.current?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      );

      firstItem?.focus();
    });
  }, [isOpen]);

  /*
   * Restore focus when the menu closes.
   */
  useEffect(() => {
    if (isOpen || !restoreFocusRef.current) {
      return;
    }

    const elementToFocus = restoreFocusRef.current;

    restoreFocusRef.current = null;

    requestAnimationFrame(() => {
      if (document.contains(elementToFocus)) {
        elementToFocus.focus();
      }
    });
  }, [isOpen]);

  /*
   * Close when clicking outside the Context Menu.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, closeMenu]);

  /*
   * Close when focus leaves the Context Menu.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleFocusIn = (event: globalThis.FocusEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (wrapperRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen, closeMenu]);

  /*
   * Escape closes the Context Menu.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();
      closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    const updatePosition = () => {
      const rect = menu.getBoundingClientRect();

      let top = position.top;
      let left = position.left;

      if (left + rect.width > window.innerWidth - VIEWPORT_MARGIN) {
        left = window.innerWidth - rect.width - VIEWPORT_MARGIN;
      }

      if (top + rect.height > window.innerHeight - VIEWPORT_MARGIN) {
        top = window.innerHeight - rect.height - VIEWPORT_MARGIN;
      }

      left = Math.max(VIEWPORT_MARGIN, left);
      top = Math.max(VIEWPORT_MARGIN, top);

      setPosition((currentPosition) => {
        if (currentPosition.top === top && currentPosition.left === left) {
          return currentPosition;
        }

        return {
          top,
          left,
        };
      });
    };

    requestAnimationFrame(updatePosition);

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, position.top, position.left]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    const isContextMenuKey =
      event.key === 'ContextMenu' || event.code === 'ContextMenu';

    const isShiftF10 =
      (event.key === 'F10' || event.code === 'F10') && event.shiftKey;

    if (!isContextMenuKey && !isShiftF10) {
      return;
    }

    openMenuFromKeyboard();
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    // Let a nested submenu handle its own keyboard navigation.
    if (target.closest('[role="menu"]') !== menuRef.current) {
      return;
    }

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ) ?? [],
    ).filter((item) => item.closest('[role="menu"]') === menuRef.current);

    if (items.length === 0) {
      return;
    }

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const nextIndex =
        currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;

      items[nextIndex]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      const previousIndex =
        currentIndex < 0
          ? items.length - 1
          : (currentIndex - 1 + items.length) % items.length;

      items[previousIndex]?.focus();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
      return;
    }

    if (
      event.key.length !== 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    const character = event.key.toLocaleLowerCase();

    const previousBuffer = typeaheadRef.current;
    const nextBuffer = `${previousBuffer}${character}`;

    typeaheadRef.current = nextBuffer;

    if (typeaheadTimeoutRef.current !== null) {
      window.clearTimeout(typeaheadTimeoutRef.current);
    }

    typeaheadTimeoutRef.current = window.setTimeout(() => {
      typeaheadRef.current = '';
      typeaheadTimeoutRef.current = null;
    }, 500);

    const getLabel = (item: HTMLElement) =>
      item.textContent?.trim().toLocaleLowerCase() ?? '';

    const isRepeatedCharacter =
      nextBuffer.length > 1 &&
      nextBuffer.split('').every((value) => value === character);

    const searchText = isRepeatedCharacter ? character : nextBuffer;

    const startIndex = currentIndex < 0 ? 0 : currentIndex + 1;

    const matchingIndexes = items
      .map((item, index) => ({
        index,
        label: getLabel(item),
      }))
      .filter(({ label }) => label.startsWith(searchText));

    if (matchingIndexes.length === 0) {
      if (nextBuffer.length > 1) {
        typeaheadRef.current = character;

        const fallbackMatch = items.findIndex(
          (item, index) =>
            index !== currentIndex && getLabel(item).startsWith(character),
        );

        if (fallbackMatch >= 0) {
          items[fallbackMatch]?.focus();
        }
      }

      return;
    }

    const nextMatch =
      matchingIndexes.find(({ index }) => index >= startIndex) ??
      matchingIndexes[0];

    items[nextMatch.index]?.focus();
  };

  const triggerProps: ContextMenuTriggerProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    onContextMenu: openMenu,
    onKeyDown: handleTriggerKeyDown,
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <Trigger {...triggerProps}>{triggerContent}</Trigger>

      {isOpen && (
        <ContextMenuContext.Provider value={{ closeMenu }}>
          <div
            ref={menuRef}
            id={menuId}
            className={styles.menu}
            role="menu"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            onKeyDown={handleMenuKeyDown}
          >
            {children}
          </div>
        </ContextMenuContext.Provider>
      )}
    </div>
  );
}
