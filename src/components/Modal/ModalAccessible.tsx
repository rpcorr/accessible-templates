import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { Button } from '../Button';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  triggerRef?: React.MutableRefObject<HTMLButtonElement | null>;
  disableClose?: boolean;
};

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
  disableClose = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Trap keyboard focus inside the modal
  useFocusTrap({
    active: isOpen,
    containerRef: modalRef,
  });

  useEffect(() => {
    if (!isOpen || disableClose) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, disableClose, onClose]);

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
    <div
      className={styles.overlay}
      onClick={() => {
        if (!disableClose) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {!disableClose && (
          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={onClose} aria-label="Close dialog">
              X
            </Button>
          </div>
        )}

        <h2 id="modal-title">{title}</h2>

        <div>{children}</div>
      </div>
    </div>
  );
}
