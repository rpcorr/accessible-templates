import { useRef, useState } from 'react';
import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { NavigationItem as NavigationItemType } from './Navigation.types';

type NavigationSubmenuProps = {
  item: NavigationItemType;
  nested?: boolean;
};

export function NavigationSubmenu({
  item,
  nested = false,
}: NavigationSubmenuProps) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const submenuRef = useRef<HTMLUListElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);

  function openSubmenu() {
    setOpen(true);

    requestAnimationFrame(() => {
      const firstLink =
        submenuRef.current?.querySelector<HTMLAnchorElement>('a');

      firstLink?.focus();
    });
  }

  function closeSubmenu() {
    setOpen(false);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSubmenu();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      openSubmenu();

      requestAnimationFrame(() => {
        const firstLink =
          submenuRef.current?.querySelector<HTMLAnchorElement>('a');

        firstLink?.focus();
      });
    }
  }

  function handleSubmenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      closeSubmenu();
    }
  }

  function handleSubmenuNavigation(e: React.KeyboardEvent<HTMLUListElement>) {
    e.stopPropagation();

    const links = Array.from(
      e.currentTarget.querySelectorAll<HTMLAnchorElement>('a'),
    );

    if (!links.length) return;

    const currentIndex = links.indexOf(
      document.activeElement as HTMLAnchorElement,
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      const next = currentIndex === links.length - 1 ? 0 : currentIndex + 1;

      links[next]?.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      const previous = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;

      links[previous]?.focus();
    }

    if (e.key === 'Home') {
      e.preventDefault();

      links[0]?.focus();
    }

    if (e.key === 'End') {
      e.preventDefault();

      links[links.length - 1]?.focus();
    }

    if (e.key === 'Escape') {
      e.preventDefault();

      closeSubmenu();
    }
  }

  return (
    <li className={styles.navigationItem}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.navigationLink}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleKeyDown}
      >
        <>
          {item.label}

          <span className={styles.menuCaret} aria-hidden="true">
            {open ? '▴' : '▾'}
          </span>
        </>
      </button>

      {open && (
        <div
          className={`${styles.submenuWrapper} ${
            nested ? styles.nestedSubmenu : ''
          }`}
        >
          <ul
            ref={submenuRef}
            className={styles.submenuList}
            onKeyDown={handleSubmenuNavigation}
          >
            {item.children?.map((child) => (
              <NavigationItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
