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
        id: 'button',
        label: 'Button',
        href: '/button',
      },
      {
        id: 'modal',
        label: 'Modal Dialog',
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
      {
        id: 'tooltip',
        label: 'Tooltip',
        href: '/tooltip',
      },

      {
        id: 'tab',
        label: 'Tab',
        href: '/tab',
      },
      {
        id: 'accordion',
        label: 'Accordion',
        href: '/accordion',
      },
      {
        id: 'breadcrumbs',
        label: 'Breadcrumbs',
        href: '/breadcrumbs',
      },
    ],
  },
];
