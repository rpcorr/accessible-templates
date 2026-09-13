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
        id: 'actions',
        label: 'Buttons & Actions',
        children: [
          {
            id: 'button',
            label: 'Button',
            href: '/button',
          },
        ],
      },
      {
        id: 'overlays-menus',
        label: 'Overlays & Menus',
        children: [
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
            id: 'tooltip',
            label: 'Tooltip',
            href: '/tooltip',
          },
        ],
      },
      {
        id: 'navigation',
        label: 'Navigation',
        children: [
          {
            id: 'navigation-component',
            label: 'Navigation',
            href: '/navigation',
          },
          {
            id: 'breadcrumbs',
            label: 'Breadcrumbs',
            href: '/breadcrumbs',
          },
          {
            id: 'pagination',
            label: 'Pagination',
            href: '/pagination',
          },
        ],
      },
      {
        id: 'content-feedback',
        label: 'Content & Feedback',
        children: [
          {
            id: 'tab',
            label: 'Tabs',
            href: '/tab',
          },
          {
            id: 'accordion',
            label: 'Accordion',
            href: '/accordion',
          },
          {
            id: 'alert',
            label: 'Alert',
            href: '/alert',
          },
          {
            id: 'status',
            label: 'Status',
            href: '/status',
          },
          {
            id: 'progress-indicator',
            label: 'Progress Indicator',
            href: '/progress-indicator',
          },
          {
            id: 'loading-spinner',
            label: 'Loading Spinner',
            href: '/loading-spinner',
          },
        ],
      },
      {
        id: 'form-controls',
        label: 'Form Controls',
        children: [
          {
            id: 'checkbox',
            label: 'Checkbox',
            href: '/checkbox',
          },
          {
            id: 'radio-group',
            label: 'Radio Group',
            href: '/radio-group',
          },
          {
            id: 'select',
            label: 'Select',
            href: '/select',
          },
          {
            id: 'combobox',
            label: 'Combobox',
            href: '/combobox',
          },
          {
            id: 'switch',
            label: 'Switch',
            href: '/switch',
          },
          {
            id: 'slider',
            label: 'Slider',
            href: '/slider',
          },
          {
            id: 'text-input',
            label: 'Text Input',
            href: '/text-input',
          },
        ],
      },
    ],
  },
];
