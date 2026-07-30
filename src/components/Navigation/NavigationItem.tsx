import styles from './Navigation.module.css';
import type { NavigationItem } from './Navigation.types';

type NavigationItemProps = {
  item: NavigationItem;
};

export function NavigationItem({ item }: NavigationItemProps) {
  return (
    <li className={styles.navigationItem}>
      <a
        href={item.href ?? '#'}
        className={styles.navigationLink}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.label}
      </a>
    </li>
  );
}
