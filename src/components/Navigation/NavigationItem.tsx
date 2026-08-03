import styles from './Navigation.module.css';
import { NavigationSubmenu } from './NavigationSubmenu';
import type { NavigationItem as NavigationItemType } from './Navigation.types';

type NavigationItemProps = {
  item: NavigationItemType;
  itemRef?: (element: HTMLAnchorElement | HTMLButtonElement | null) => void;
};

export function NavigationItem({ item, itemRef }: NavigationItemProps) {
  if (item.children && item.children.length > 0) {
    return <NavigationSubmenu item={item} buttonRefCallback={itemRef} />;
  }

  return (
    <li className={styles.navigationItem}>
      <a
        ref={itemRef}
        href={item.href ?? '#'}
        className={styles.navigationLink}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.label}
      </a>
    </li>
  );
}
