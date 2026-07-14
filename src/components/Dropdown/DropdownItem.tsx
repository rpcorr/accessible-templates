import React, { useEffect } from 'react';
import { useDropdownMenu } from './useDropdownMenu';

export type DropdownItemProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, ...props }, ref) => {
  const { registerMenuItem } = useDropdownMenu();

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
    });
  }, [registerMenuItem, children]);

  return (
    <button
      {...props}
      ref={setRefs}
      type="button"
      role="menuitem"
      tabIndex={-1}
      data-menuitem="true"
    >
      {children}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';
