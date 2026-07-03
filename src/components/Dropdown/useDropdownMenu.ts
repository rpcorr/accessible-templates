import { useContext } from 'react';
import { DropdownMenuContext } from './DropdownMenuContext';

export function useDropdownMenu() {
  const ctx = useContext(DropdownMenuContext);

  if (!ctx) {
    throw new Error('useDropdownMenu must be used inside DropdownAccessible');
  }

  return ctx;
}
