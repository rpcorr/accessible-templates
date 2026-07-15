import React, { useId, useState, useRef, useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';
import { DropdownItem } from './DropdownItem';
import { DropdownMenuProvider } from './DropdownMenuProvider';
import type {
  DropdownMenuContextValue,
  MenuItemRegistration,
} from './DropdownMenuContext';

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

  const submenuItemsRef = useRef<MenuItemRegistration[]>([]);
  const submenuCloseFnsRef = useRef<Set<() => void>>(new Set());

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const parentMenuItemRef = useRef<HTMLButtonElement | null>(null);
  const parentSubmenuCloseRef = useRef<(() => void) | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeTimer = useRef<number | null>(null);

  const {
    registerClose,
    registerMenuItem,
    requestCloseAll: parentRequestCloseAll,
  } = useDropdownMenu();

  // register with parent so Escape can cascade
  useEffect(() => {
    const unregister = registerClose(() => {
      setOpen(false);
    });

    parentSubmenuCloseRef.current = unregister;

    return unregister;
  }, [registerClose]);

  useEffect(() => {
    if (!buttonRef.current) return;

    return registerMenuItem({
      ref: buttonRef.current,
      label: String(label),
      hasSubmenu: true,
      openSubmenu: () => setOpen(true),
      closeSubmenu: () => setOpen(false),
    });
  }, [registerMenuItem, label]);

  function handleMouseEnter() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }

    openMenu();
  }

  function registerSubmenuItem(item: MenuItemRegistration) {
    if (!submenuItemsRef.current.some((x) => x.ref === item.ref)) {
      submenuItemsRef.current.push(item);
    }

    return () => {
      submenuItemsRef.current = submenuItemsRef.current.filter(
        (x) => x.ref !== item.ref,
      );
    };
  }

  function getSubmenuItems() {
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

  function handleMouseLeave() {
    closeTimer.current = window.setTimeout(() => {
      closeMenu();
    }, 150);
  }

  function openMenu() {
    parentMenuItemRef.current = document.activeElement as HTMLButtonElement;

    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);

    requestAnimationFrame(() => {
      parentMenuItemRef.current?.focus();
    });
  }

  function focusFirstItem() {
    requestAnimationFrame(() => {
      const firstItem =
        menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]');

      firstItem?.focus();
    });
  }

  // -------------------------
  // KEYBOARD HANDLING
  // -------------------------
  function handleKeyDown(e: React.KeyboardEvent) {
    const active = document.activeElement;

    if (menuRef.current?.contains(active)) {
      e.stopPropagation();

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    }

    if (e.key === 'Escape' && menuRef.current?.contains(active)) {
      console.log('Submenu Escape');
      e.preventDefault();
      e.stopPropagation();

      closeMenu();

      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();

      openMenu();
      focusFirstItem();

      return;
    }

    // ArrowRight → open submenu
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();

      openMenu();

      // focus first item after opening
      focusFirstItem();

      return;
    }

    // ArrowLeft → close submenu + return focus
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();

      closeMenu();

      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      return;
    }

    // basic navigation inside submenu
    if (!menuRef.current?.contains(active)) return;

    e.stopPropagation();

    const items = getSubmenuItems()
      .map((item) => item.ref)
      .filter((el) => el instanceof HTMLButtonElement);

    const index = items.indexOf(active as HTMLButtonElement);
    const safeIndex = index >= 0 ? index : 0;

    if (e.key === 'Home') {
      e.preventDefault();

      if (items.length === 0) return;

      items[0]?.focus();

      return;
    }

    if (e.key === 'End') {
      e.preventDefault();

      if (items.length === 0) return;

      items[items.length - 1]?.focus();

      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (items.length === 0) return;

      items[(safeIndex + 1) % items.length]?.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (items.length === 0) return;

      items[(safeIndex - 1 + items.length) % items.length]?.focus();
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
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
              if (!React.isValidElement(child)) {
                return child;
              }

              if (child.type === DropdownItem) {
                return React.cloneElement(child as ItemElement, {
                  ref: (el: HTMLButtonElement | null) => {
                    itemRefs.current[index + 1] = el;
                  },
                  onMouseEnter: () => {
                    itemRefs.current[index + 1]?.focus();
                  },
                });
              }

              return child;
            })}
          </div>
        </DropdownMenuProvider>
      )}
    </div>
  );
}
