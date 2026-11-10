export const basicMenuItems = [
  {
    id: 'edit',
    label: 'Edit',
    onSelect: () => {
      console.log('Edit selected');
    },
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    onSelect: () => {
      console.log('Duplicate selected');
    },
  },
  {
    id: 'archive',
    label: 'Archive',
    onSelect: () => {
      console.log('Archive selected');
    },
  },
];

export const disabledMenuItems = [
  {
    id: 'new',
    label: 'New',
    onSelect: () => {
      console.log('New selected');
    },
  },
  {
    id: 'open',
    label: 'Open',
    onSelect: () => {
      console.log('Open selected');
    },
  },
  {
    id: 'save',
    label: 'Save',
    disabled: true,
  },
  {
    id: 'close',
    label: 'Close',
    onSelect: () => {
      console.log('Close selected');
    },
  },
];

export const callbackMenuItems = [
  {
    id: 'settings',
    label: 'Settings',
    onSelect: () => {
      console.log('Settings selected');
    },
  },
  {
    id: 'preferences',
    label: 'Preferences',
    onSelect: () => {
      console.log('Preferences selected');
    },
  },
];

export const menuButtonCallbacks = {
  onOpen: () => {
    console.log('Menu opened');
  },
  onClose: () => {
    console.log('Menu closed');
  },
};
