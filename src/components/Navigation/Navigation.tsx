import { useRef, useState } from 'react';
import styles from './Navigation.module.css';

import { NavigationToggle } from './NavigationToggle';
import { NavigationItem as NavigationItemComponent } from './NavigationItem';

import type { NavigationItem } from './Navigation.types';

type NavigationProps = {
  items: NavigationItem[];
  ariaLabel?: string;
};

export function Navigation({
  items,
  ariaLabel = 'Main navigation',
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
    null,
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape' && mobileOpen) {
      setMobileOpen(false);

      requestAnimationFrame(() => {
        toggleRef.current?.focus();
      });
    }
  }

  function handleToggle() {
    setMobileOpen((value) => {
      const nextState = !value;

      if (nextState) {
        requestAnimationFrame(() => {
          firstItemRef.current?.focus();
        });
      }

      return nextState;
    });
  }

  return (
    <nav
      className={styles.navigation}
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      <NavigationToggle
        ref={toggleRef}
        open={mobileOpen}
        onClick={handleToggle}
      />

      <ul
        id="main-navigation"
        className={`${styles.navigationList} ${
          mobileOpen ? styles.mobileOpen : ''
        }`}
      >
        {items.map((item, index) => (
          <NavigationItemComponent
            key={item.id}
            item={item}
            itemRef={
              index === 0
                ? (element) => {
                    firstItemRef.current = element;
                  }
                : undefined
            }
          />
        ))}
      </ul>
    </nav>
  );
}
