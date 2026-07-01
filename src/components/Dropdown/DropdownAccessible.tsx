import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
};

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children:
    | React.ReactElement<DropdownItemProps>
    | React.ReactElement<DropdownItemProps>[];
};

type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  role?: string;
  tabIndex?: number;
};

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, onClick, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const menuId = useId();
  const buttonId = useId();

  function toggle() {
    setOpen((o) => {
      const next = !o;

      if (next) {
        setActiveIndex(0);
      }

      return next;
    });
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, itemRefs.current.length - 1));
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        itemRefs.current[activeIndex]?.click();
        close();

        return;
      }

      if (e.key === 'Escape' || e.key === 'Tab') {
        close();
        return;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
  }, [activeIndex, open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    itemRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  return (
    <div ref={ref} className={styles.dropdown}>
      {React.cloneElement(trigger, {
        ref: triggerRef,
        id: buttonId,
        onClick: (e) => {
          trigger.props.onClick?.(e);
          toggle();
        },
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': menuId,
      })}

      {open && (
        <div
          id={menuId}
          role="menu"
          ref={menuRef}
          className={styles.dropdownMenu}
          aria-labelledby={buttonId}
        >
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child;

            return React.cloneElement(child, {
              ref: (el: HTMLButtonElement | null) => {
                itemRefs.current[index] = el;
              },
            });
          })}
        </div>
      )}
    </div>
  );
}
