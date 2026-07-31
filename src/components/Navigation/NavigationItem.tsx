import styles from './Navigation.module.css';
import { NavigationSubmenu } from './NavigationSubmenu';
import type { NavigationItem as NavigationItemType } from './Navigation.types';

type NavigationItemProps = {
  item: NavigationItemType;
};

export function NavigationItem({ item }: NavigationItemProps) {
  if (item.children && item.children.length > 0) {
    return <NavigationSubmenu item={item} />;
  }

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
