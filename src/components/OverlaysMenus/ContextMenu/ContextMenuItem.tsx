import type { ButtonHTMLAttributes, MouseEvent } from 'react';

import { useContextMenuContext } from './ContextMenuContext';

export interface ContextMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function ContextMenuItem({
  disabled = false,
  tabIndex = -1,
  type = 'button',
  role = 'menuitem',
  onClick,
  ...props
}: ContextMenuItemProps) {
  const contextMenu = useContextMenuContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented && !disabled) {
      contextMenu?.closeMenu();
    }
  };

  return (
    <button
      {...props}
      type={type}
      role={role}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
    />
  );
}
