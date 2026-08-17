import type { NavigationItem } from '../components/Navigation/Navigation.types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'components',
    label: 'Components',
    children: [
      {
        id: 'buttons',
        label: 'Buttons',
        href: '/buttons',
      },
      {
        id: 'modal',
        label: 'Modals',
        href: '/modal',
      },
      {
        id: 'dropdown',
        label: 'Dropdown',
        href: '/dropdown',
      },
      {
        id: 'navigation',
        label: 'Navigation',
        href: '/navigation',
      },
    ],
  },
];
