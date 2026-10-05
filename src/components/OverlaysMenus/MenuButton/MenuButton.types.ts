import type { ReactNode } from 'react';

export interface MenuButtonItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  onSelect?: () => void;
}

export interface MenuButtonProps {
  label: string;
  items: MenuButtonItem[];
  disabled?: boolean;
  id?: string;
  className?: string;
  menuClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
}
