import React, { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  trigger: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  children: React.ReactNode;
};

export function Dropdown({ trigger, children }: DropdownProps) {
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
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {React.cloneElement(trigger, {
        onClick: toggle,
      })}

      {open && <div>{children}</div>}
    </div>
  );
}
