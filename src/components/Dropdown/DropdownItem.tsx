import React, { useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';

export type DropdownItemProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, onKeyDown, onClick, ...props }, ref) => {
  const { registerMenuItem, requestCloseAll } = useDropdownMenu();

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  function setRefs(element: HTMLButtonElement | null) {
    buttonRef.current = element;

    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }

  useEffect(() => {
    if (!buttonRef.current) return;

    return registerMenuItem({
      ref: buttonRef.current,
      label: String(children),
      setActive: (active) => {
        if (buttonRef.current) {
          buttonRef.current.tabIndex = active ? 0 : -1;
        }
      },
    });
  }, [registerMenuItem, children]);

  return (
    <button
      {...props}
      ref={setRefs}
      type="button"
      role="menuitem"
      data-menuitem="true"
      onClick={(e) => {
        onClick?.(e);

        if (e.defaultPrevented) return;

        requestCloseAll();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);

        if (e.defaultPrevented) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();

          e.currentTarget.click();
        }
      }}
    >
      {children}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';
