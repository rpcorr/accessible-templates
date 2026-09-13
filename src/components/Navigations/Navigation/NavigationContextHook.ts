import { useContext } from 'react';
import { NavigationContext } from './navigationContext';

export function useNavigationMenu() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigationMenu must be used within NavigationProvider');
  }

  return context;
}
