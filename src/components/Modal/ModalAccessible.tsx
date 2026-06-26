import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { Button } from '../Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  triggerRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ESC + focus trap setup
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      // ESC closes modal
      if (e.key === 'Escape') {
        onClose();
      }

      // TAB trap
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }

    if (wasOpenRef.current && triggerRef?.current) {
      triggerRef.current.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>

        <div>{children}</div>

        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
