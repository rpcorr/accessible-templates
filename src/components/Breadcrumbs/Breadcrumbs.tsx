import type { ReactNode } from 'react';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  children: ReactNode;
  ariaLabel?: string;
}

export function Breadcrumbs({
  children,
  ariaLabel = 'Breadcrumb',
}: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label={ariaLabel}>
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}
