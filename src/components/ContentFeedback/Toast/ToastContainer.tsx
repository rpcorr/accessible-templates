import { createPortal } from 'react-dom';

import type { ToastItem } from './ToastContext';
import { Toast } from './Toast';
import styles from './toast.module.css';

interface ToastContainerProps {
  toasts: ToastItem[];
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  onDismiss: (id: string) => void;
  onDismissAndRestoreFocus: (id: string) => void;
}

const positionClasses = {
  'top-left': styles.toastContainerTopLeft,
  'top-center': styles.toastContainerTopCenter,
  'top-right': styles.toastContainerTopRight,
  'bottom-left': styles.toastContainerBottomLeft,
  'bottom-center': styles.toastContainerBottomCenter,
  'bottom-right': styles.toastContainerBottomRight,
};

export function ToastContainer({
  toasts,
  position,
  onDismiss,
  onDismissAndRestoreFocus,
}: ToastContainerProps) {
  return createPortal(
    <div
      className={`${styles.toastContainer} ${positionClasses[position]}`}
      aria-label="Notifications"
    >
      <div aria-live="polite" aria-atomic="false">
        {toasts
          .filter((toast) => toast.type !== 'error')
          .map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onDismiss={onDismiss}
              onDismissAndRestoreFocus={onDismissAndRestoreFocus}
            />
          ))}
      </div>

      <div aria-live="assertive" aria-atomic="false">
        {toasts
          .filter((toast) => toast.type === 'error')
          .map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onDismiss={onDismiss}
              onDismissAndRestoreFocus={onDismissAndRestoreFocus}
            />
          ))}
      </div>
    </div>,
    document.body,
  );
}
