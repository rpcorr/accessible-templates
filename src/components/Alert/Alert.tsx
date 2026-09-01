import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
}: AlertProps) => {
  const role =
    variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  return (
    <div className={`${styles.alert} ${styles[variant]}`} role={role}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.message}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
