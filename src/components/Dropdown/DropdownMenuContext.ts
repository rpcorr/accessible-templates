import { createContext } from 'react';

export type MenuItemRegistration = {
  ref: HTMLButtonElement;
  label: string;

  setActive?: (active: boolean) => void;

  hasSubmenu?: boolean;
  openSubmenu?: () => void;
  closeSubmenu?: () => void;
};

export type DropdownMenuContextValue = {
  registerClose: (fn: () => void) => () => void;
  requestCloseAll: () => void;

  registerMenuItem: (item: MenuItemRegistration) => () => void;

  getMenuItems: () => MenuItemRegistration[];
};

export const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);
