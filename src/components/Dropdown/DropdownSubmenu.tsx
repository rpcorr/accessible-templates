import React, { useId, useState, useRef, useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import styles from './Dropdown.module.css';
import type {
  DropdownMenuContextValue,
  MenuItemRegistration,
} from './DropdownMenuContext';

type DropdownSubmenuProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

export function DropdownSubmenu({ label, children }: DropdownSubmenuProps) {
  const [open, setOpen] = useState(false);
  const submenuId = useId();

  const submenuItemsRef = useRef<MenuItemRegistration[]>([]);
  const submenuCloseFnsRef = useRef<Set<() => void>>(new Set());

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const parentMenuItemRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const {
    registerClose,
    registerMenuItem,
    requestCloseAll: parentRequestCloseAll,
  } = useDropdownMenu();

  // register with parent so Escape can cascade
  useEffect(() => {
    return registerClose(() => {
      setOpen(false);
    });
  }, [registerClose]);

  useEffect(() => {
    if (!buttonRef.current) return;

    return registerMenuItem({
      ref: buttonRef.current,
      label: String(label),
      setActive: (active) => {
        if (buttonRef.current) {
          buttonRef.current.tabIndex = active ? 0 : -1;
        }
      },
    });
  }, [registerMenuItem, label]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  function handleMouseEnter(): void {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }

    openMenu();
  }

  function registerSubmenuItem(item: MenuItemRegistration): () => void {
    if (!submenuItemsRef.current.some((x) => x.ref === item.ref)) {
      submenuItemsRef.current.push(item);
    }

    return () => {
      submenuItemsRef.current = submenuItemsRef.current.filter(
        (x) => x.ref !== item.ref,
      );
    };
  }

  function getSubmenuItems(): MenuItemRegistration[] {
    return submenuItemsRef.current;
  }

  const submenuContextValue: DropdownMenuContextValue = {
    registerClose: (fn) => {
      submenuCloseFnsRef.current.add(fn);

      return () => {
        submenuCloseFnsRef.current.delete(fn);
      };
    },

    requestCloseAll: () => {
      submenuCloseFnsRef.current.forEach((fn) => fn());

      parentRequestCloseAll();
    },

    registerMenuItem: registerSubmenuItem,

    getMenuItems: getSubmenuItems,
  };

  function handleMouseLeave(): void {
    closeTimer.current = window.setTimeout(() => {
      closeMenu();
    }, 150);
  }

  function openMenu(): void {
    const active = document.activeElement;

    if (active instanceof HTMLButtonElement) {
      parentMenuItemRef.current = active;
    }

    setOpen(true);
  }

  function closeMenu(): void {
    setOpen(false);

    requestAnimationFrame(() => {
      parentMenuItemRef.current?.focus();
    });
  }

  function focusFirstItem(): void {
    requestAnimationFrame(() => {
      const firstItem =
        menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]');

      firstItem?.focus();
    });
  }

  // -------------------------
  // KEYBOARD HANDLING
  // -------------------------
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
  ) {
    const active = document.activeElement;
    const onTrigger = active === buttonRef.current;
    const inPanel = menuRef.current?.contains(active) ?? false;

    // -------------------------
    // SUBMENU TRIGGER BUTTON
    // -------------------------
    if (onTrigger) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();

        openMenu();
        focusFirstItem();

        return;
      }

      if (e.key === 'ArrowLeft') {
        if (open) {
          e.preventDefault();
          e.stopPropagation();

          closeMenu();
        }

        return;
      }

      return;
    }

    // -------------------------
    // ITEMS INSIDE SUBMENU PANEL
    // -------------------------
    if (inPanel) {
      e.stopPropagation();

      const items = getSubmenuItems()
        .map((item) => item.ref)
        .filter((el) => el instanceof HTMLButtonElement);

      const index = items.indexOf(active as HTMLButtonElement);
      const safeIndex = index >= 0 ? index : 0;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
        return;
      }

      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(safeIndex + 1) % items.length]?.focus();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(safeIndex - 1 + items.length) % items.length]?.focus();
        return;
      }
    }
  }

  return (
    <div
      className={styles.submenuWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={submenuId}
        onKeyDown={handleKeyDown}
      >
        {label} <span aria-hidden="true">▶</span>
      </button>

      {open && (
        <DropdownMenuProvider value={submenuContextValue}>
          <div
            id={submenuId}
            role="menu"
            ref={menuRef}
            className={styles.submenuMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
          >
            {children}
          </div>
        </DropdownMenuProvider>
      )}
    </div>
  );
}
