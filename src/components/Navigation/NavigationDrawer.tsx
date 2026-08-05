import { useRef } from 'react';
import styles from './Navigation.module.css';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type NavigationDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function NavigationDrawer({
  open,
  onClose,
  children,
}: NavigationDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap({
    active: open,
    containerRef: drawerRef,
  });

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
        {children}
      </div>
    </>
  );
}
