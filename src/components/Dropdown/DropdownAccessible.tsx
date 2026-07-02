import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children:
    | React.ReactElement<DropdownItemProps>
    | React.ReactElement<DropdownItemProps>[];
};

type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  role?: string;
  tabIndex?: number;
};

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, onClick, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      aria-selected={false}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const menuId = useId();
  const buttonId = useId();

  const typeaheadRef = useRef('');
  const typeaheadTimeout = useRef<number | null>(null);

  function toggle() {
    setOpen((o) => !o);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;

      // ✅ HARD GUARD: only respond if focus is inside menu
      if (!menuRef.current?.contains(active)) return;

      const items = itemRefs.current.filter(
        (el): el is HTMLButtonElement => el instanceof HTMLButtonElement,
      );

      // Guard: no items = nothing to navigate
      if (items.length === 0) return;

      const currentIndex = items.indexOf(active as HTMLButtonElement);

      // fallback if nothing is focused yet
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;

      // -------------------------
      // TYPEAHEAD
      // -------------------------
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

      // -------------------------
      // ARROW DOWN
      // -------------------------
      if (e.key === 'ArrowDown') {
        e.preventDefault();

        const next = (safeIndex + 1) % items.length;
        items[next]?.focus();

        return;
      }

      // -------------------------
      // ARROW UP
      // -------------------------
      if (e.key === 'ArrowUp') {
        e.preventDefault();

        const prev = (safeIndex - 1 + items.length) % items.length;
        items[prev]?.focus();

        return;
      }

      // -------------------------
      // HOME
      // -------------------------
      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
        return;
      }

      // -------------------------
      // END
      // -------------------------
      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }

      // -------------------------
      // ENTER / SPACE
      // -------------------------
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        const current = document.activeElement;

        if (current instanceof HTMLButtonElement) {
          current.click();
          close();
        }

        return;
      }

      // -------------------------
      // ESC
      // -------------------------
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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const items = itemRefs.current.filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement,
    );

    if (items.length === 0) return;

    const lastFocusedIndex = items.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (lastFocusedIndex !== -1) {
      items[lastFocusedIndex]?.focus();
    } else {
      items[0]?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      typeaheadRef.current = '';
    }
  }, [open]);

  return (
    <div ref={ref} className={styles.dropdown}>
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
        <div
          id={menuId}
          role="menu"
          ref={menuRef}
          className={styles.dropdownMenu}
          aria-labelledby={buttonId}
        >
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement<DropdownItemProps>(child)) return child;

            return React.cloneElement(
              child as React.ReactElement<
                DropdownItemProps & React.RefAttributes<HTMLButtonElement>
              >,
              {
                ref: (el) => {
                  itemRefs.current[index] = el;
                },

                onMouseEnter: () => {
                  itemRefs.current[index]?.focus();
                },
              },
            );
          })}
        </div>
      )}
    </div>
  );
}
