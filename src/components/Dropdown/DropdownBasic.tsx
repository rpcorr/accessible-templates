import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

type DropdownProps = {
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  children: React.ReactNode;
};

export function DropdownBasic({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  function toggle() {
    setOpen((o) => !o);
  }

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className={styles.dropdown}>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          toggle();
        },
      })}

      {open && <div className={styles.dropdownMenu}>{children}</div>}
    </div>
  );
}
