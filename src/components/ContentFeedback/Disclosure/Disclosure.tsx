import { useId, useState, type ReactNode } from 'react';
import styles from './Disclosure.module.css';

type DisclosureProps = {
  title: string;
  children: ReactNode;
  id?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

export function Disclosure({
  title,
  children,
  id,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: DisclosureProps) {
  const generatedId = useId();
  const contentId = id ?? `${generatedId}-content`;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  function handleToggle() {
    const nextOpen = !isOpen;

    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <div className={styles.disclosure}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        onClick={handleToggle}
      >
        <span>{title}</span>

        <svg
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div id={contentId} className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}
