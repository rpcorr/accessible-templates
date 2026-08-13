import { useState } from 'react';
import { NavigationContext } from './navigationContext';

type NavigationProviderProps = {
  children: React.ReactNode;
};

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [openSubmenus, setOpenSubmenus] = useState<
    Record<number, string | null>
  >({});

  function openSubmenu(level: number, id: string) {
    setOpenSubmenus((current) => {
      const updated = { ...current };

      Object.keys(updated).forEach((key) => {
        const menuLevel = Number(key);

        if (menuLevel >= level) {
          delete updated[menuLevel];
        }
      });

      return {
        ...updated,
        [level]: id,
      };
    });
  }

  function closeSubmenu(level: number) {
    setOpenSubmenus((current) => {
      const updated = { ...current };

      Object.keys(updated).forEach((key) => {
        const menuLevel = Number(key);

        if (menuLevel >= level) {
          delete updated[menuLevel];
        }
      });

      return updated;
    });
  }

  function closeAllSubmenus() {
    setOpenSubmenus({});
  }

  return (
    <NavigationContext.Provider
      value={{
        openSubmenus,
        openSubmenu,
        closeSubmenu,
        closeAllSubmenus,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
