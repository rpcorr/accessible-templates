import { useEffect } from 'react';
import styles from './Modal.module.css';
import { Button } from '../Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function BasicModal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Close</Button>
        </div>
        <h2>{title}</h2>

        <div>{children}</div>
      </div>
    </div>
  );
}
