import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import styles from './ContextMenu.module.css';

export interface ContextMenuSubmenuProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function ContextMenuSubmenu({
  label,
  children,
  disabled = false,
}: ContextMenuSubmenuProps) {
  const submenuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const handlePointerEnter = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handlePointerLeave = () => {
    setIsOpen(false);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    setIsOpen((currentOpen) => !currentOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setIsOpen(true);

      requestAnimationFrame(() => {
        submenuRef.current
          ?.querySelector<HTMLElement>(
            '[role="menuitem"]:not(:disabled):not([aria-disabled="true"])',
          )
          ?.focus();
      });
    }

    if (event.key === 'ArrowLeft' || event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleSubmenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const menu = submenuRef.current;

    if (!menu) {
      return;
    }

    const items = Array.from(
      menu.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ),
    ).filter((item) => item.closest('[role="menu"]') === menu);

    if (items.length === 0) {
      return;
    }

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();

      const nextIndex =
        currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;

      items[nextIndex]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();

      const previousIndex =
        currentIndex < 0
          ? items.length - 1
          : (currentIndex - 1 + items.length) % items.length;

      items[previousIndex]?.focus();
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      event.stopPropagation();

      const targetIndex = event.key === 'Home' ? 0 : items.length - 1;
      items[targetIndex]?.focus();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();

      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      className={styles.submenuWrapper}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        role="menuitem"
        tabIndex={-1}
        className={styles.submenuTrigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span>{label}</span>
        <span aria-hidden="true" className={styles.submenuIndicator}>
          ▶
        </span>
      </button>

      {isOpen && !disabled && (
        <div
          ref={submenuRef}
          id={submenuId}
          className={styles.submenu}
          role="menu"
          aria-label={label}
          onKeyDown={handleSubmenuKeyDown}
        >
          {children}
        </div>
      )}
    </div>
  );
}
