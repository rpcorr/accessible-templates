# Menu Button

The **Menu Button** component combines a button with a popup menu of actions or options. It provides accessible keyboard navigation, typeahead support, focus management, disabled menu items, and focus restoration.

## Features

- Semantic `menu` and `menuitem` roles
- `aria-haspopup="menu"`
- `aria-expanded` state
- `aria-controls` association
- Keyboard navigation with Arrow Up and Arrow Down
- Home and End navigation
- Typeahead navigation
- Multi-character typeahead matching
- Repeated-character cycling through matching items
- Disabled menu items
- Escape key handling
- Click-outside dismissal
- Focus management when opening and closing
- Focus restoration to the menu button
- Tab behavior that returns control to normal page navigation
- Optional open and close callbacks
- Optional icons for menu items

## Usage

```tsx
import { MenuButton } from '../../../components/OverlaysMenus/MenuButton';

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
/>;
```

````

## Disabled Items

Individual menu items can be disabled using the `disabled` property.

```tsx
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
```

Disabled menu items:

- Cannot be selected.
- Are skipped during arrow-key navigation.
- Are skipped during typeahead matching.
- Remain visually indicated as unavailable.

## Typeahead

When the menu is open, typing characters moves focus to a matching enabled menu item.

For example, with menu items such as:

- Edit
- Duplicate
- Archive

Typing `E` moves focus to **Edit**.

Typing multiple characters quickly performs a prefix search. For example, typing `Du` moves focus to **Duplicate**.

When multiple menu items begin with the same character, repeatedly typing that character cycles through the matching items.

The typeahead search buffer resets after a short delay.

## Accessibility

The Menu Button follows the ARIA menu button pattern.

### Button

The trigger button uses:

- `aria-haspopup="menu"` to identify the popup menu.
- `aria-expanded` to communicate whether the menu is open.
- `aria-controls` to associate the button with the menu.

### Menu

The popup uses:

```html
role="menu"
```

Each menu item uses:

```html
role="menuitem"
```

Focus is managed so that only the currently active menu item is part of the normal keyboard focus sequence.

### Focus Management

When the menu opens:

1. The menu is displayed.
2. Focus moves to the first enabled menu item by default.
3. Disabled items are skipped.

When the menu closes:

- Escape returns focus to the Menu Button.
- Selecting an item returns focus to the Menu Button.
- Clicking outside closes the menu without unexpectedly moving focus.
- Tab closes the menu and allows normal browser focus navigation to continue.

## Keyboard Support

| Key                 | Behavior                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `Enter`             | Opens or closes the menu.                                                |
| `Space`             | Opens or closes the menu.                                                |
| `Arrow Down`        | Opens the menu and focuses the first item, or moves to the next item.    |
| `Arrow Up`          | Opens the menu and focuses the last item, or moves to the previous item. |
| `Home`              | Moves focus to the first enabled menu item.                              |
| `End`               | Moves focus to the last enabled menu item.                               |
| Character keys      | Moves focus to a matching enabled menu item.                             |
| Multiple characters | Matches menu items by typed label prefix.                                |
| Repeated character  | Cycles through matching menu items.                                      |
| `Escape`            | Closes the menu and restores focus to the button.                        |
| `Tab`               | Closes the menu and continues normal page navigation.                    |

## Props

### MenuButton

| Prop            | Type               | Default        | Description                                            |
| --------------- | ------------------ | -------------- | ------------------------------------------------------ |
| `label`         | `string`           | —              | Accessible label displayed on the menu button.         |
| `items`         | `MenuButtonItem[]` | —              | Menu items displayed in the popup menu.                |
| `disabled`      | `boolean`          | `false`        | Disables the menu button.                              |
| `id`            | `string`           | Auto-generated | Optional ID used to associate the button and menu.     |
| `className`     | `string`           | `''`           | Optional CSS class applied to the component container. |
| `menuClassName` | `string`           | `''`           | Optional CSS class applied to the popup menu.          |
| `onOpen`        | `() => void`       | —              | Called when the menu opens.                            |
| `onClose`       | `() => void`       | —              | Called when the menu closes.                           |

### MenuButtonItem

| Prop       | Type         | Default | Description                                                       |
| ---------- | ------------ | ------- | ----------------------------------------------------------------- |
| `id`       | `string`     | —       | Unique identifier for the menu item.                              |
| `label`    | `string`     | —       | Text displayed for the menu item and used for typeahead matching. |
| `disabled` | `boolean`    | `false` | Disables the menu item.                                           |
| `icon`     | `ReactNode`  | —       | Optional icon displayed before the item label.                    |
| `onSelect` | `() => void` | —       | Called when the menu item is selected.                            |

## Examples

The component documentation page includes examples demonstrating:

- Basic menu button usage
- Disabled menu items
- Open and close callbacks
- Keyboard navigation
- Typeahead navigation

See the live examples at:

`/overlays-menus/menu-button`

## Related Components

- [Dropdown](./dropdown.md)
- [Modal Dialog](./modal-dialog.md)
- [Tooltip](./tooltip.md)
````
