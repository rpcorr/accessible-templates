import React, { useId, useState, useRef, useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';
import { DropdownItem } from './DropdownItem';

type DropdownSubmenuProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

type ItemElement = React.ReactElement<
  React.ComponentProps<typeof DropdownItem>
>;

export function DropdownSubmenu({ label, children }: DropdownSubmenuProps) {
  const [open, setOpen] = useState(false);
  const submenuId = useId();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastParentFocusRef = useRef<HTMLButtonElement | null>(null);

  const { registerClose, requestCloseAll } = useDropdownMenu();

  // register with parent so Escape can cascade
  useEffect(() => {
    const unregister = registerClose(() => setOpen(false));
    return unregister;
  }, [registerClose]);

  function openMenu() {
    lastParentFocusRef.current = buttonRef.current;
    setOpen(true);
  }

  function openMenuWithKeyboard() {
    lastParentFocusRef.current = buttonRef.current;
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);

    requestAnimationFrame(() => {
      lastParentFocusRef.current?.focus();
    });
  }

  // -------------------------
  // KEYBOARD HANDLING
  // -------------------------
  function handleKeyDown(e: React.KeyboardEvent) {
    const active = document.activeElement;

    // ArrowRight → open submenu
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      openMenuWithKeyboard();

      // focus first item after opening
      requestAnimationFrame(() => {
        const first = itemRefs.current.find(Boolean);
        first?.focus();
      });

      return;
    }

    // ArrowLeft → close submenu + return focus
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      closeMenu();
      buttonRef.current?.focus();
      return;
    }

    // Escape → close submenu only
    if (e.key === 'Escape') {
      e.preventDefault();

      if (open) {
        closeMenu();
      } else {
        requestCloseAll();
      }

      return;
    }

    // basic navigation inside submenu
    if (!menuRef.current?.contains(active)) return;

    const items = itemRefs.current.filter(
      (el): el is HTMLButtonElement => el instanceof HTMLButtonElement,
    );

    const index = items.indexOf(active as HTMLButtonElement);
    const safeIndex = index >= 0 ? index : 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(safeIndex + 1) % items.length]?.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(safeIndex - 1 + items.length) % items.length]?.focus();
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={submenuId}
      >
        {label} <span aria-hidden="true">▶</span>
      </button>

      {open && (
        <div
          id={submenuId}
          role="menu"
          ref={menuRef}
          style={{
            position: 'absolute',
            top: 0,
            left: '100%',
            marginLeft: 8,
            padding: 8,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: 6,
            minWidth: 160,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 1000,
          }}
        >
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child) || child.type !== DropdownItem) {
              return child;
            }

            return React.cloneElement(child as ItemElement, {
              ref: (el: HTMLButtonElement | null) => {
                itemRefs.current[index] = el;
              },
              onMouseEnter: () => {
                itemRefs.current[index]?.focus();
              },
            });
          })}
        </div>
      )}
    </div>
  );
}
