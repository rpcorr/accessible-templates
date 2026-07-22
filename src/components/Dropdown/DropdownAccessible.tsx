import React, { useState, useRef, useEffect, useId, useCallback } from 'react';
import styles from './Dropdown.module.css';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import { createMenuItemRegistry } from './useMenuItemRegistry';
import type { DropdownMenuContextValue } from './DropdownMenuContext';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.RefAttributes<HTMLButtonElement>;

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children: React.ReactNode;
};

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const menuId = useId();
  const buttonId = useId();

  const typeaheadRef = useRef('');
  const typeaheadTimeout = useRef<number | null>(null);
  const [menuRegistry] = useState(createMenuItemRegistry);

  const getItems = useCallback((): HTMLButtonElement[] => {
    return menuRegistry.getMenuItems().map((item) => item.ref);
  }, [menuRegistry]);

  function openMenu(index = 0): void {
    setActiveIndex(index);
    setOpen(true);
  }

  function close(): void {
    setOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }

  function toggle(): void {
    if (open) {
      close();
    } else {
      openMenu();
    }
  }
  // -------------------------
  // CONTEXT VALUE
  // -------------------------

  const closeFnsRef = useRef<Set<() => void>>(new Set());

  const menuContextValue: DropdownMenuContextValue = {
    registerClose: (fn) => {
      closeFnsRef.current.add(fn);

      return () => {
        closeFnsRef.current.delete(fn);
      };
    },

    requestCloseAll: () => {
      closeFnsRef.current.forEach((fn) => fn());
      close();
    },

    registerMenuItem: menuRegistry.registerMenuItem,
    getMenuItems: menuRegistry.getMenuItems,
  };

  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    e.stopPropagation();

    const items = getItems();

    if (items.length === 0) return;

    // TYPEAHEAD
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typeaheadRef.current += e.key.toLowerCase();

      if (typeaheadTimeout.current) {
        window.clearTimeout(typeaheadTimeout.current);
      }

      typeaheadTimeout.current = window.setTimeout(() => {
        typeaheadRef.current = '';
      }, 500);

      const matchIndex = items.findIndex((item) =>
        (item.textContent ?? '').toLowerCase().startsWith(typeaheadRef.current),
      );

      if (matchIndex !== -1) {
        setActiveIndex(matchIndex);
      }

      return;
    }

    // Arrow Down
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (!items.length) return;

      setActiveIndex((i) => {
        const next = (i + 1) % items.length;

        return next;
      });

      return;
    }

    // Arrow Up
    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (!items.length) return;

      setActiveIndex((i) => {
        const prev = (i - 1 + items.length) % items.length;
        return prev;
      });

      return;
    }

    // Home
    if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }

    // End
    if (e.key === 'End') {
      e.preventDefault();
      const last = items.length - 1;
      setActiveIndex(last);
      return;
    }

    // Enter / Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      getItems()[activeIndex]?.click();
      close();

      return;
    }

    // Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  // -------------------------
  // OUTSIDE CLICK
  // -------------------------
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  // -------------------------
  // FOCUS ON OPEN
  // -------------------------

  useEffect(() => {
    if (!open) return;

    const items = getItems();

    const el = items[activeIndex];
    if (!el) return;

    requestAnimationFrame(() => {
      el.focus();
    });
  }, [open, activeIndex, getItems]);

  // -------------------------
  // UPDATE ACTIVE MENU ITEM
  // -------------------------

  useEffect(() => {
    if (!open) return;

    menuRegistry.getMenuItems().forEach((item, index) => {
      item.setActive?.(index === activeIndex);
    });
  }, [open, activeIndex, menuRegistry]);

  // reset typeahead
  useEffect(() => {
    if (open) typeaheadRef.current = '';
  }, [open]);

  return (
    <div ref={rootRef} className={styles.dropdown}>
      {React.cloneElement(trigger, {
        ref: triggerRef,
        id: buttonId,

        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          trigger.props.onClick?.(e);
          toggle();
        },

        onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
          trigger.props.onKeyDown?.(e);

          if (e.defaultPrevented) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              openMenu(0);
              break;

            case 'ArrowUp': {
              e.preventDefault();
              const items = getItems();
              openMenu(Math.max(items.length - 1, 0));
              break;
            }

            case 'Enter':
            case ' ':
              e.preventDefault();
              openMenu();
              break;
          }
        },

        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': menuId,
      })}

      {open && (
        <DropdownMenuProvider value={menuContextValue}>
          <div
            id={menuId}
            role="menu"
            aria-orientation="vertical"
            onKeyDown={handleMenuKeyDown}
            className={styles.dropdownMenu}
            aria-labelledby={buttonId}
          >
            {children}
          </div>
        </DropdownMenuProvider>
      )}
    </div>
  );
}
