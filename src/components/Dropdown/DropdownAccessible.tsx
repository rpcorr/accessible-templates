import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';
import { DropdownItem } from './DropdownItem';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import type { DropdownMenuContextValue } from './DropdownMenuContext';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children: React.ReactNode;
};

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const menuId = useId();
  const buttonId = useId();

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const typeaheadRef = useRef('');
  const typeaheadTimeout = useRef<number | null>(null);

  function toggle() {
    setOpen((v) => !v);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  // -------------------------
  // CONTEXT VALUE
  // -------------------------

  const closeFnsRef = useRef<Set<() => void>>(new Set());

  const menuContextValue: DropdownMenuContextValue = {
    registerClose: (fn: () => void) => {
      closeFnsRef.current.add(fn);

      return () => {
        closeFnsRef.current.delete(fn);
      };
    },

    requestCloseAll: () => {
      closeFnsRef.current.forEach((fn) => fn());
      close();
    },
  };

  // -------------------------
  // KEYBOARD NAVIGATION (FLAT LIST ONLY)
  // -------------------------
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;

      if (!menuRef.current?.contains(active)) return;

      // If focus is inside a nested menu (not root items), ignore root navigation
      const isInsideRootItems =
        active instanceof HTMLButtonElement &&
        itemRefs.current.includes(active);

      if (!isInsideRootItems) return;

      const items = itemRefs.current.filter(
        (el): el is HTMLButtonElement =>
          el instanceof HTMLButtonElement && el.dataset?.menuitem === 'true',
      );

      if (items.length === 0) return;

      const currentIndex = items.indexOf(active as HTMLButtonElement);
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;

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
          item.textContent?.toLowerCase().startsWith(typeaheadRef.current),
        );

        if (matchIndex !== -1) {
          items[matchIndex]?.focus();
        }

        return;
      }

      // Arrow Down
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(safeIndex + 1) % items.length]?.focus();
        return;
      }

      // Arrow Up
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(safeIndex - 1 + items.length) % items.length]?.focus();
        return;
      }

      // Home
      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
        return;
      }

      // End
      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }

      // Enter / Space
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (active instanceof HTMLButtonElement) {
          active.click();
          close();
        }
        return;
      }

      // Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // -------------------------
  // OUTSIDE CLICK
  // -------------------------
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // -------------------------
  // FOCUS ON OPEN
  // -------------------------
  useEffect(() => {
    if (!open) return;

    const items = itemRefs.current.filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement,
    );

    if (items.length === 0) return;

    const last = items.indexOf(document.activeElement as HTMLButtonElement);

    if (last !== -1) {
      items[last]?.focus();
    } else {
      items[0]?.focus();
    }
  }, [open]);

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
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': menuId,
      } as TriggerProps)}

      {open && (
        <DropdownMenuProvider value={menuContextValue}>
          <div
            id={menuId}
            role="menu"
            ref={menuRef}
            className={styles.dropdownMenu}
            aria-labelledby={buttonId}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child;

              const element = child as React.ReactElement<
                React.ComponentProps<typeof DropdownItem>
              >;

              if (element.type === DropdownItem) {
                return React.cloneElement(element, {
                  ref: (el: HTMLButtonElement | null) => {
                    itemRefs.current[index] = el;
                  },
                  onMouseEnter: () => {
                    itemRefs.current[index]?.focus();
                  },
                });
              }

              return element;
            })}
          </div>
        </DropdownMenuProvider>
      )}
    </div>
  );
}
