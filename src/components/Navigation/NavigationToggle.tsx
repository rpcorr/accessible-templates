import { forwardRef } from 'react';
import styles from './Navigation.module.css';

type NavigationToggleProps = {
  open: boolean;
  onClick: () => void;
};

export const NavigationToggle = forwardRef<
  HTMLButtonElement,
  NavigationToggleProps
>(function NavigationToggle({ open, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.navigationToggle}
      aria-expanded={open}
      aria-controls="main-navigation"
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      onClick={onClick}
    >
      <span aria-hidden="true">{open ? '✕' : '☰'}</span>
    </button>
  );
});
