import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

type AlertHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface AlertBaseProps {
  variant?: AlertVariant;
  title?: string;
  headingLevel?: AlertHeadingLevel;
  dismissLabel?: string;
  children: ReactNode;
}

interface DismissibleAlertProps extends AlertBaseProps {
  dismissible: true;
  onDismiss: () => void;
}

interface NonDismissibleAlertProps extends AlertBaseProps {
  dismissible?: false;
  onDismiss?: never;
}

type AlertProps = DismissibleAlertProps | NonDismissibleAlertProps;

const Alert = ({
  variant = 'info',
  title,
  headingLevel: Heading = 'h2',
  dismissLabel = 'Dismiss alert',
  children,
  dismissible = false,
  onDismiss,
}: AlertProps) => {
  return (
    <div className={`${styles.alert} ${styles[variant]}`}>
      <div className={styles.content}>
        {title && <Heading className={styles.title}>{title}</Heading>}

        <div className={styles.message}>{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
