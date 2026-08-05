import styles from './Navigation.module.css';
import { NavigationSubmenu } from './NavigationSubmenu';
import type { NavigationItem as NavigationItemType } from './Navigation.types';

type NavigationItemProps = {
  item: NavigationItemType;
  mobile?: boolean;
  itemRef?: (element: HTMLAnchorElement | HTMLButtonElement | null) => void;
};

export function NavigationItem({
  item,
  itemRef,
  mobile = false,
}: NavigationItemProps) {
  if (item.children && item.children.length > 0) {
    return (
      <NavigationSubmenu
        item={item}
        buttonRefCallback={itemRef}
        mobile={mobile}
      />
    );
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
