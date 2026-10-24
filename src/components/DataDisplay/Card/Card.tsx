import styles from './Card.module.css';
import type { CardProps } from './Card.types';

export function Card({
  children,
  header,
  footer,
  variant = 'default',
  className,
  ...rest
}: CardProps) {
  const cardClasses = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClasses} {...rest}>
      {header !== undefined && <div className={styles.header}>{header}</div>}

      <div className={styles.content}>{children}</div>

      {footer !== undefined && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
