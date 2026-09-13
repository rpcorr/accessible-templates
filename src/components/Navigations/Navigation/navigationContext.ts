import { createContext } from 'react';

type NavigationContextType = {
  openSubmenus: Record<number, string | null>;
  openSubmenu: (level: number, id: string) => void;
  closeSubmenu: (level: number) => void;
  closeAllSubmenus: () => void;
};

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);
