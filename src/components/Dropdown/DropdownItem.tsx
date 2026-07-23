import React, { useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';

export type DropdownItemProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, onKeyDown, onClick, disabled, ...props }, ref) => {
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
      disabled,

      setActive: (active) => {
        if (buttonRef.current && !disabled) {
          buttonRef.current.tabIndex = active ? 0 : -1;
        }
      },
    });
  }, [registerMenuItem, children, disabled]);

  return (
    <button
      {...props}
      ref={setRefs}
      type="button"
      role="menuitem"
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled || undefined}
      data-menuitem="true"
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        onClick?.(e);

        if (e.defaultPrevented) return;

        requestCloseAll();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);

        if (e.defaultPrevented || disabled) return;

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
