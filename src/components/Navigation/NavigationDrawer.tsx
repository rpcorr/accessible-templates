import { useRef, useEffect } from 'react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './Navigation.module.css';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type NavigationDrawerProps = {
  open: boolean;
  onClose: () => void;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
};

export function NavigationDrawer({
  open,
  onClose,
  closeButtonRef,
  children,
}: NavigationDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap({
    active: open,
    containerRef: drawerRef,
  });

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useLockBodyScroll(open);

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${
          open ? styles.drawerOverlayOpen : ''
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.drawerClose}
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          X
        </button>

        {children}
      </div>
    </>
  );
}
