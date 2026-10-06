import { useEffect, useRef, useState } from 'react';

import type { ToastItem } from './ToastContext';
import styles from './toast.module.css';

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
  onDismissAndRestoreFocus?: (id: string) => void;
}

const typeClasses = {
  info: styles.toastInfo,
  success: styles.toastSuccess,
  warning: styles.toastWarning,
  error: styles.toastError,
};

export function Toast({
  toast,
  onDismiss,
  onDismissAndRestoreFocus,
}: ToastProps) {
  const [isPaused, setIsPaused] = useState(false);
  const remainingTime = useRef(toast.duration ?? 0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0 || isPaused) {
      return;
    }

    startTime.current = Date.now();

    const timer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, remainingTime.current);

    return () => {
      window.clearTimeout(timer);

      if (startTime.current !== null) {
        remainingTime.current -= Date.now() - startTime.current;
      }
    };
  }, [toast.duration, toast.id, isPaused, onDismiss]);

  const handleDismiss = () => {
    if (onDismissAndRestoreFocus) {
      onDismissAndRestoreFocus(toast.id);
    } else {
      onDismiss(toast.id);
    }
  };

  const handleAction = () => {
    toast.action?.onClick();

    if (onDismissAndRestoreFocus) {
      onDismissAndRestoreFocus(toast.id);
    } else {
      onDismiss(toast.id);
    }
  };

  return (
    <article
      className={`${styles.toast} ${typeClasses[toast.type]}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.toastContent}>
        <strong className={styles.toastTitle}>{toast.title}</strong>

        {toast.message && (
          <p className={styles.toastMessage}>{toast.message}</p>
        )}

        {toast.action && (
          <button
            type="button"
            className={styles.toastAction}
            onClick={handleAction}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        className={styles.toastDismiss}
        aria-label="Dismiss notification"
        onClick={handleDismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </article>
  );
}
