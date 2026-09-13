import type { ReactNode } from 'react';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  current?: boolean;
}

export function BreadcrumbItem({
  children,
  href,
  current = false,
}: BreadcrumbItemProps) {
  return (
    <li className={`${styles.item} ${current ? styles.currentItem : ''}`}>
      {current ? (
        <span className={styles.current} aria-current="page">
          {children}
        </span>
      ) : (
        <a className={styles.link} href={href}>
          {children}
        </a>
      )}
    </li>
  );
}
