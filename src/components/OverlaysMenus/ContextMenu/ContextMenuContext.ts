import { createContext, useContext } from 'react';

interface ContextMenuContextValue {
  closeMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export function useContextMenuContext() {
  return useContext(ContextMenuContext);
}

export { ContextMenuContext };
