import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';
import { DropdownItem } from './DropdownItem';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import type { DropdownMenuContextValue } from './DropdownMenuContext';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
};

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children: React.ReactNode;
};

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const menuId = useId();
  const buttonId = useId();

  const typeaheadRef = useRef('');
  const typeaheadTimeout = useRef<number | null>(null);

  const getItems = () => {
    if (!menuRef.current) {
      return [];
    }

    return Array.from(
      menuRef.current.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]',
      ),
    );
  };

  function openMenu(index = 0) {
    setActiveIndex(index);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function toggle() {
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
      if (!open) return;

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
          (item.textContent ?? '')
            .toLowerCase()
            .startsWith(typeaheadRef.current),
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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, activeIndex]);

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

    const items = getItems();

    const el = items[activeIndex];
    if (!el) return;

    requestAnimationFrame(() => {
      el.focus();
    });
  }, [open, activeIndex]);

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
      } as TriggerProps)}

      {open && (
        <DropdownMenuProvider value={menuContextValue}>
          <div
            id={menuId}
            role="menu"
            aria-orientation="vertical"
            ref={menuRef}
            className={styles.dropdownMenu}
            aria-labelledby={buttonId}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child;

              const element = child as React.ReactElement<any>;

              if (element.type === DropdownItem) {
                const id = element.props.id ?? `dropdown-item-${index}`;

                return React.cloneElement(element as any, {
                  id,
                  tabIndex: index === activeIndex ? 0 : -1,
                  'aria-selected': index === activeIndex,
                  role: 'menuitem',
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
