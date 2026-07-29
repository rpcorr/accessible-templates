import styles from './Navigation.module.css';

export type NavigationItem = {
  id: string;
  label: string;

  href?: string;

  current?: boolean;
  disabled?: boolean;
  external?: boolean;

  children?: NavigationItem[];
};

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
          <li key={item.id} className={styles.navigationItem}>
            <a
              href={item.href ?? '#'}
              className={styles.navigationLink}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
