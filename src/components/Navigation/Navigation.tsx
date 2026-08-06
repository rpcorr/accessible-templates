import { useRef, useState } from 'react';
import styles from './Navigation.module.css';

import { NavigationToggle } from './NavigationToggle';
import { NavigationItem as NavigationItemComponent } from './NavigationItem';
import { NavigationDrawer } from './NavigationDrawer';

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
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);

  function handleToggle() {
    setMobileOpen((value) => {
      const nextState = !value;

      if (nextState) {
        requestAnimationFrame(() => {
          drawerCloseRef.current?.focus();
        });
      }

      return nextState;
    });
  }

  return (
    <nav
      className={styles.navigation}
      aria-label={ariaLabel}
    >
      <NavigationToggle
        ref={toggleRef}
        open={mobileOpen}
        onClick={handleToggle}
      />

      <NavigationDrawer
        open={mobileOpen}
        closeButtonRef={drawerCloseRef}
        onClose={() => {
          setMobileOpen(false);

          requestAnimationFrame(() => {
            toggleRef.current?.focus();
          });
        }}
      >
        <ul
          id="main-navigation"
          className={`${styles.navigationList} ${styles.mobileNavigationList}`}
        >
          {items.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              mobile={mobileOpen}
            />
          ))}
        </ul>
      </NavigationDrawer>
    </nav>
  );
}
