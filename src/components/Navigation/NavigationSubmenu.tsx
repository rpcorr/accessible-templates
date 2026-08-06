import { useId, useRef, useState } from 'react';
import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { NavigationItem as NavigationItemType } from './Navigation.types';

type NavigationSubmenuProps = {
  item: NavigationItemType;
  nested?: boolean;
  mobile?: boolean;
  buttonRefCallback?: (element: HTMLButtonElement | null) => void;
};

export function NavigationSubmenu({
  item,
  nested = false,
  mobile = false,
  buttonRefCallback,
}: NavigationSubmenuProps) {
  const [open, setOpen] = useState(false);
  const submenuId = useId();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const submenuRef = useRef<HTMLUListElement | null>(null);

  const menuItemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>(
    [],
  );

  function focusFirstItem() {
    requestAnimationFrame(() => {
      menuItemRefs.current[0]?.focus();
    });
  }

  function openSubmenu() {
    setOpen(true);
    focusFirstItem();
  }

  function closeSubmenu() {
    setOpen(false);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  }

  function closeSubmenuWithoutFocus() {
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowRight':
        e.preventDefault();
        openSubmenu();
        break;

      case 'ArrowLeft':
      case 'Escape':
        e.preventDefault();
        closeSubmenu();
        break;
    }
  }

  function handleSubmenuNavigation(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key === 'Tab' && !mobile) {
      closeSubmenuWithoutFocus();
      return;
    }
    e.stopPropagation();

    const menuItems = menuItemRefs.current.filter(
      (item): item is HTMLAnchorElement | HTMLButtonElement => item !== null,
    );

    if (!menuItems.length) return;

    const currentIndex = menuItems.indexOf(
      document.activeElement as HTMLAnchorElement,
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const next = currentIndex === menuItems.length - 1 ? 0 : currentIndex + 1;

      requestAnimationFrame(() => {
        menuItems[next]?.focus();
      });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      const previous =
        currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;

      requestAnimationFrame(() => {
        menuItems[previous]?.focus();
      });
    }

    if (e.key === 'Home') {
      e.preventDefault();

      requestAnimationFrame(() => {
        menuItems[0]?.focus();
      });
    }

    if (e.key === 'End') {
      e.preventDefault();

      requestAnimationFrame(() => {
        menuItems[menuItems.length - 1]?.focus();
      });
    }

    if (e.key === 'Escape' || e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();

      closeSubmenu();
    }
  }

  return (
    <li className={styles.navigationItem}>
      <button
        ref={(element) => {
          buttonRef.current = element;

          buttonRefCallback?.(element);
        }}
        type="button"
        className={styles.navigationLink}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={submenuId}
        onClick={() => {
          if (open) {
            closeSubmenu();
          } else {
            openSubmenu();
          }
        }}
        onKeyDown={handleKeyDown}
      >
        {item.label}

        <span className={styles.menuCaret} aria-hidden="true">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div
          className={`${styles.submenuWrapper} ${
            nested ? styles.nestedSubmenu : ''
          }`}
        >
          <ul
            id={submenuId}
            ref={submenuRef}
            className={styles.submenuList}
            onKeyDown={handleSubmenuNavigation}
          >
            {item.children?.map((child, index) => (
              <NavigationItem
                key={child.id}
                item={child}
                mobile={mobile}
                itemRef={(element) => {
                  menuItemRefs.current[index] = element;
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
