import { createContext } from 'react';

export type DropdownMenuContextValue = {
  registerClose: (fn: () => void) => () => void;
  requestCloseAll: () => void;
};

export const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);
