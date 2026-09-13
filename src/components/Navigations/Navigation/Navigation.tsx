import { useRef, useState } from 'react';
import styles from './Navigation.module.css';

import { NavigationToggle } from './NavigationToggle';
import { NavigationItem as NavigationItemComponent } from './NavigationItem';
import { NavigationDrawer } from './NavigationDrawer';

import type { NavigationItem } from './Navigation.types';
import { NavigationProvider } from './NavigationProvider';
import { useNavigationMenu } from './NavigationContextHook';

type NavigationProps = {
  items: NavigationItem[];
  ariaLabel?: string;
};

function NavigationContent({ items, ariaLabel }: NavigationProps) {
  const { closeAllSubmenus } = useNavigationMenu();

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

  function handleFocusIn(e: React.FocusEvent) {
    const target = e.target as HTMLElement;

    if (target.dataset.restoringFocus === 'true') {
      delete target.dataset.restoringFocus;
      return;
    }

    // Focus is moving into a submenu.
    // Do not close the parent submenu.
    if (target.closest(`.${styles.submenuList}`)) {
      return;
    }

    const relatedTarget = e.relatedTarget as HTMLElement | null;

    const topLevelItem = target.closest(
      `.${styles.navigationList} > .${styles.navigationItem}`,
    );

    if (!topLevelItem) {
      return;
    }

    if (relatedTarget && topLevelItem.contains(relatedTarget)) {
      return;
    }

    if (
      relatedTarget?.closest(`.${styles.submenuList}`) &&
      target instanceof HTMLButtonElement &&
      target.hasAttribute('aria-controls')
    ) {
      return;
    }

    closeAllSubmenus();
  }

  return (
    <nav
      className={styles.navigation}
      aria-label={ariaLabel}
      onFocus={handleFocusIn}
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
        <ul id="main-navigation" className={styles.navigationList}>
          {items.map((item) => (
            <NavigationItemComponent
              key={item.id}
              item={item}
              mobile={mobileOpen}
              onNavigate={() => {
                if (mobileOpen) {
                  setMobileOpen(false);
                }
              }}
            />
          ))}
        </ul>
      </NavigationDrawer>
    </nav>
  );
}

export function Navigation({
  items,
  ariaLabel = 'Main navigation',
}: NavigationProps) {
  return (
    <NavigationProvider>
      <NavigationContent items={items} ariaLabel={ariaLabel} />
    </NavigationProvider>
  );
}
