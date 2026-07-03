import React from 'react';

export type DropdownItemProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ children, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
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
