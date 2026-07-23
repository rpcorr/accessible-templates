import { createContext } from 'react';

export type MenuItemRegistration = {
  ref: HTMLButtonElement;
  label: string;
  disabled?: boolean;

  setActive?: (active: boolean) => void;
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
