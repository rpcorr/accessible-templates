import type { ReactNode } from 'react';
import styles from './Status.module.css';

interface StatusProps {
  children: ReactNode;
}

const Status = ({ children }: StatusProps) => {
  const hasContent =
    typeof children === 'string'
      ? children.trim().length > 0
      : Boolean(children);

  return (
    <div
      className={`${styles.status} ${!hasContent ? styles.empty : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
};

export default Status;
