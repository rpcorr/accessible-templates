import styles from './Navigation.module.css';
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
  return (
    <nav className={styles.navigation} aria-label={ariaLabel}>
      <ul className={styles.navigationList}>
        {items.map((item) => (
          <NavigationItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
