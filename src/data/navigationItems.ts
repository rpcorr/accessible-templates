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
        id: 'content-feedback',
        label: 'Content & Feedback',
        children: [
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
            id: 'loading-spinner',
            label: 'Loading Spinner',
            href: '/content-feedback/loading-spinner',
          },
          {
            id: 'progress-indicator',
            label: 'Progress Indicator',
            href: '/content-feedback/progress-indicator',
          },
          {
            id: 'status',
            label: 'Status',
            href: '/content-feedback/status',
          },
          {
            id: 'tab',
            label: 'Tab',
            href: '/content-feedback/tab',
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
            id: 'combobox',
            label: 'Combobox',
            href: '/form-controls/combobox',
          },
          {
            id: 'number-input',
            label: 'Number Input',
            href: '/form-controls/number-input',
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
            id: 'slider',
            label: 'Slider',
            href: '/form-controls/slider',
          },
          {
            id: 'switch',
            label: 'Switch',
            href: '/form-controls/switch',
          },
          {
            id: 'textarea',
            label: 'Textarea',
            href: '/form-controls/textarea',
          },
          {
            id: 'text-input',
            label: 'Text Input',
            href: '/form-controls/text-input',
          },
        ],
      },
      {
        id: 'navigation',
        label: 'Navigations',
        children: [
          {
            id: 'breadcrumbs',
            label: 'Breadcrumbs',
            href: '/navigations/breadcrumbs',
          },
          {
            id: 'navigation-component',
            label: 'Navigation',
            href: '/navigations/navigation',
          },
          {
            id: 'pagination',
            label: 'Pagination',
            href: '/navigations/pagination',
          },
        ],
      },
      {
        id: 'overlays-menus',
        label: 'Overlays & Menus',
        children: [
          {
            id: 'dropdown',
            label: 'Dropdown',
            href: '/overlays-menus/dropdown',
          },
          {
            id: 'modal',
            label: 'Modal Dialog',
            href: '/overlays-menus/modal',
          },
          {
            id: 'tooltip',
            label: 'Tooltip',
            href: '/overlays-menus/tooltip',
          },
        ],
      },
    ],
  },
];
