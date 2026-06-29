import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
};

type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  role?: string;
  tabIndex?: number;
};

type DropdownProps = {
  trigger: React.ReactElement<TriggerProps>;
  children:
    | React.ReactElement<MenuItemProps>
    | React.ReactElement<MenuItemProps>[];
};

export function DropdownAccessible({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeIndexRef = useRef(activeIndex);

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

  const items = React.Children.toArray(children).filter(React.isValidElement);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;
    if (!items.length) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        const el =
          menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]')[
            activeIndexRef.current
          ];

        el?.click();

        close();
        return;
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        close();
        return;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, items.length, items]);

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      const items =
        menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');

      if (!items?.length) return;

      const el = items[activeIndexRef.current];
      el?.focus();
    });
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
          {React.Children.map(children, (child) => {
            if (!React.isValidElement<MenuItemProps>(child)) return child;

            return React.cloneElement(child, {
              role: 'menuitem',
              tabIndex: -1,
              onClick: (e) => {
                child.props.onClick?.(e);
                close();
              },
            });
          })}
        </div>
      )}
    </div>
  );
}
