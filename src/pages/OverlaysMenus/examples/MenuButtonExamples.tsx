import { MenuButton } from '../../../components/OverlaysMenus/MenuButton';

export function MenuButtonExamples() {
  return (
    <section aria-labelledby="menu-button-examples">
      <h3 id="menu-button-examples">Examples</h3>

      <h4>Basic Menu Button</h4>

      <MenuButton
        label="Actions"
        items={[
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
        ]}
      />

      <h4>Menu with Disabled Item</h4>

      <MenuButton
        label="File"
        items={[
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
        ]}
      />

      <h4>Menu with Open and Close Callbacks</h4>

      <MenuButton
        label="Options"
        items={[
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
        ]}
        onOpen={() => {
          console.log('Menu opened');
        }}
        onClose={() => {
          console.log('Menu closed');
        }}
      />
    </section>
  );
}
