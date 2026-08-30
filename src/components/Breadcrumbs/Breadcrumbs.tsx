import type { ReactNode } from 'react';
import styles from './Breadcrumbs.module.css';

type BreadcrumbSeparator =
  | 'slash'
  | 'chevron'
  | 'greater-than'
  | 'pill'
  | 'arrow';
type BreadcrumbVariant = 'default' | 'pill-background' | 'pill-active';

interface BreadcrumbsProps {
  children: ReactNode;
  ariaLabel?: string;
  separator?: BreadcrumbSeparator;
  variant?: BreadcrumbVariant;
}

export function Breadcrumbs({
  children,
  ariaLabel = 'Breadcrumb',
  separator = 'slash',
  variant = 'default',
}: BreadcrumbsProps) {
  return (
    <nav
      className={`${styles.breadcrumbs} ${styles[separator]} ${styles[variant]}`}
      aria-label={ariaLabel}
    >
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}
