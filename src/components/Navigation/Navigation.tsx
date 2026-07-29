import styles from './Navigation.module.css';

export type NavigationItem = {
  label: string;
  href: string;
  current?: boolean;
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
          <li key={item.href} className={styles.navigationItem}>
            <a
              href={item.href}
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
