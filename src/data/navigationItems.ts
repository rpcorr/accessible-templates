import type { NavigationItem } from '../components/Navigations/Navigation/Navigation.types';

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
            href: '/buttons-actions/button',
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
            href: '/overlays-menus/modal',
          },
          {
            id: 'dropdown',
            label: 'Dropdown',
            href: '/overlays-menus/dropdown',
          },
          {
            id: 'tooltip',
            label: 'Tooltip',
            href: '/overlays-menus/tooltip',
          },
        ],
      },
      {
        id: 'navigation',
        label: 'Navigations',
        children: [
          {
            id: 'navigation-component',
            label: 'Navigation',
            href: '/navigations/navigation',
          },
          {
            id: 'breadcrumbs',
            label: 'Breadcrumbs',
            href: '/navigations/breadcrumbs',
          },
          {
            id: 'pagination',
            label: 'Pagination',
            href: '/navigations/pagination',
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
            href: '/content-feedback/tab',
          },
          {
            id: 'accordion',
            label: 'Accordion',
            href: '/content-feedback/accordion',
          },
          {
            id: 'alert',
            label: 'Alert',
            href: '/content-feedback/alert',
          },
          {
            id: 'status',
            label: 'Status',
            href: '/content-feedback/status',
          },
          {
            id: 'progress-indicator',
            label: 'Progress Indicator',
            href: '/content-feedback/progress-indicator',
          },
          {
            id: 'loading-spinner',
            label: 'Loading Spinner',
            href: '/content-feedback/loading-spinner',
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
            href: '/form-controls/checkbox',
          },
          {
            id: 'radio-group',
            label: 'Radio Group',
            href: '/form-controls/radio-group',
          },
          {
            id: 'select',
            label: 'Select',
            href: '/form-controls/select',
          },
          {
            id: 'combobox',
            label: 'Combobox',
            href: '/form-controls/combobox',
          },
          {
            id: 'switch',
            label: 'Switch',
            href: '/form-controls/switch',
          },
          {
            id: 'slider',
            label: 'Slider',
            href: '/form-controls/slider',
          },
          {
            id: 'text-input',
            label: 'Text Input',
            href: '/form-controls/text-input',
          },
        ],
      },
    ],
  },
];
