import { useEffect, useId, useRef } from 'react';
import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { NavigationItem as NavigationItemType } from './Navigation.types';
import { useNavigationMenu } from './NavigationContextHook';

type NavigationSubmenuProps = {
  item: NavigationItemType;
  nested?: boolean;
  mobile?: boolean;
  level?: number;
  buttonRefCallback?: (element: HTMLButtonElement | null) => void;
};

export function NavigationSubmenu({
  item,
  nested = false,
  mobile = false,
  level = 0,
  buttonRefCallback,
}: NavigationSubmenuProps) {
  const { openSubmenus, openSubmenu, closeSubmenu } = useNavigationMenu();
  const open = openSubmenus[level] === item.id;
  const submenuId = useId();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const submenuRef = useRef<HTMLUListElement | null>(null);

  const menuItemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>(
    [],
  );

  // function focusFirstItem() {
  //   requestAnimationFrame(() => {
  //     menuItemRefs.current[0]?.focus();
  //   });
  // }

  function openSubmenuHandler() {
    openSubmenu(level, item.id);
  }

  function closeSubmenuHandler() {
    closeSubmenu(level);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  }

  function closeSubmenuWithoutFocus() {
    closeSubmenu(level);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowRight':
        e.preventDefault();
        openSubmenuHandler();
        break;

      case 'ArrowLeft':
      case 'Escape':
        e.preventDefault();
        closeSubmenuHandler();
        break;
    }
  }

  function handleSubmenuBlur(e: React.FocusEvent<HTMLUListElement>) {
    const nextFocusedElement = e.relatedTarget as Node | null;

    if (!nextFocusedElement || !e.currentTarget.contains(nextFocusedElement)) {
      closeSubmenuWithoutFocus();
    }
  }

  function handleSubmenuNavigation(e: React.KeyboardEvent) {
    if (e.key === 'Tab') {
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

      closeSubmenuHandler();
    }
  }

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      menuItemRefs.current[0]?.focus();
    });
  }, [open]);

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
        aria-controls={submenuId}
        onClick={() => {
          if (open) {
            closeSubmenu(level);
          } else {
            openSubmenu(level, item.id);
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
            onBlur={handleSubmenuBlur}
          >
            {item.children?.map((child, index) => (
              <NavigationItem
                key={child.id}
                item={child}
                mobile={mobile}
                level={level + 1}
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
