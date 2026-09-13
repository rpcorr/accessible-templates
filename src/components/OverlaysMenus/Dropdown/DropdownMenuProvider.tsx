import React from 'react';
import { DropdownMenuContext } from './DropdownMenuContext';
import type { DropdownMenuContextValue } from './DropdownMenuContext';

export function DropdownMenuProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DropdownMenuContextValue;
}) {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}
