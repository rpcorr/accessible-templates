import type { TreeViewItem } from '../components/Navigations/TreeView';

export const basicItems: TreeViewItem[] = [
  {
    id: 'documents',
    label: 'Documents',
    children: [
      {
        id: 'work',
        label: 'Work',
        children: [
          { id: 'report', label: 'Annual Report.docx' },
          { id: 'presentation', label: 'Presentation.pptx' },
        ],
      },
      {
        id: 'personal',
        label: 'Personal',
        children: [
          { id: 'resume', label: 'Resume.pdf' },
          { id: 'notes', label: 'Notes.txt' },
        ],
      },
    ],
  },
  {
    id: 'pictures',
    label: 'Pictures',
    children: [
      { id: 'vacation', label: 'Vacation' },
      { id: 'family', label: 'Family' },
    ],
  },
  { id: 'downloads', label: 'Downloads' },
];

export const organizationItems: TreeViewItem[] = [
  {
    id: 'executive',
    label: 'Executive',
    children: [
      { id: 'director', label: 'Director' },
      {
        id: 'operations',
        label: 'Operations',
        children: [
          { id: 'finance', label: 'Finance' },
          { id: 'human-resources', label: 'Human Resources' },
        ],
      },
      {
        id: 'technology',
        label: 'Technology',
        children: [
          { id: 'development', label: 'Development' },
          { id: 'accessibility', label: 'Accessibility' },
        ],
      },
    ],
  },
];

export const disabledItems: TreeViewItem[] = [
  {
    id: 'available',
    label: 'Available section',
    children: [
      { id: 'item-one', label: 'Item One' },
      { id: 'item-two', label: 'Item Two' },
    ],
  },
  {
    id: 'restricted',
    label: 'Restricted section',
    disabled: true,
    children: [{ id: 'restricted-one', label: 'Restricted Item One' }],
  },
  { id: 'archived', label: 'Archived item', disabled: true },
];
