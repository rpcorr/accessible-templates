# Context Menu

An accessible context menu that opens on right-click, the Context Menu key, or `Shift+F10`. It supports keyboard navigation, typeahead search, disabled menu items, nested submenus, focus restoration, and viewport-aware positioning.

## Features

- Opens on right-click, the Context Menu key, or `Shift+F10`.
- Automatically focuses the first enabled menu item when opened.
- Supports arrow-key navigation between enabled menu items.
- Supports `Home` and `End` to move to the first and last enabled items.
- Supports typeahead search to find menu items by their text.
- Supports disabled menu items that cannot be activated or focused.
- Supports nested submenus that open on pointer hover or keyboard interaction.
- Uses `aria-haspopup`, `aria-expanded`, and `aria-controls` to identify submenu triggers and their state.
- Supports `ArrowRight` to open a submenu and focus its first enabled item.
- Supports `ArrowLeft` to close a submenu and return focus to its trigger.
- Supports keyboard navigation within nested submenus.
- Closes when a menu item is activated, unless activation is prevented.
- Closes when the user presses `Escape`.
- Closes when the user clicks outside the menu or moves focus outside it.
- Restores focus when the menu or submenu is dismissed.
- Adjusts its position to remain within the viewport.
- Supports controlled and uncontrolled open state.
- Provides a disabled state for the entire context menu.
- Uses semantic menu and menu item roles.

## Installation

Import the context menu components:

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSubmenu,
} from '../../components/OverlaysMenus/ContextMenu';
```

Adjust the import path as necessary for your project.

## Basic Usage

```tsx
import { useState } from 'react';

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSubmenu,
} from '../../components/OverlaysMenus/ContextMenu';

import styles from './Example.module.css';

export function ContextMenuExample() {
  const [message, setMessage] = useState('');

  const handleAction = (action: string) => {
    setMessage(`${action} selected.`);
  };

  return (
    <>
      <ContextMenu
        trigger={({ children, ...triggerProps }) => (
          <div {...triggerProps} className={styles.contextArea} tabIndex={0}>
            {children}
          </div>
        )}
        triggerContent={
          <p>
            Right-click or press <kbd>Shift</kbd>+<kbd>F10</kbd> to open the
            menu.
          </p>
        }
      >
        <ContextMenuItem onClick={() => handleAction('Edit')}>
          Edit
        </ContextMenuItem>

        <ContextMenuItem disabled>Copy</ContextMenuItem>

        <ContextMenuSubmenu label="Share">
          <ContextMenuItem onClick={() => handleAction('Share by email')}>
            Email
          </ContextMenuItem>

          <ContextMenuItem onClick={() => handleAction('Copy link')}>
            Copy link
          </ContextMenuItem>
        </ContextMenuSubmenu>

        <ContextMenuItem onClick={() => handleAction('Delete')}>
          Delete
        </ContextMenuItem>
      </ContextMenu>

      <p role="status" aria-live="polite">
        {message}
      </p>
    </>
  );
}
```

The trigger must be focusable for keyboard users. The example uses a focusable `div` with `tabIndex={0}`. Provide appropriate visible focus styling for the trigger in your own implementation.

## Keyboard Interaction

| Key                  | Behaviour                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------- |
| Right-click          | Opens the context menu at the pointer position.                                               |
| Context Menu key     | Opens the context menu for the focused trigger.                                               |
| `Shift+F10`          | Opens the context menu for the focused trigger.                                               |
| `ArrowDown`          | Moves focus to the next enabled item, wrapping at the end of the current menu.                |
| `ArrowUp`            | Moves focus to the previous enabled item, wrapping at the beginning of the current menu.      |
| `Home`               | Moves focus to the first enabled item in the current menu.                                    |
| `End`                | Moves focus to the last enabled item in the current menu.                                     |
| Printable characters | Searches menu item labels using typeahead.                                                    |
| `ArrowRight`         | Opens a submenu and moves focus to its first enabled item.                                    |
| `ArrowLeft`          | Closes the submenu and returns focus to its trigger.                                          |
| `Enter` / `Space`    | Activates the focused menu item and closes the menu when activation is not prevented.         |
| `Escape`             | Closes the submenu or context menu and restores focus appropriately.                          |
| `Tab`                | Moves focus according to the browser's normal focus order; the menu closes when focus leaves. |

Disabled menu items are skipped during keyboard navigation and cannot be activated.

## API

### `ContextMenu` Props

| Prop             | Type                                                               | Default     | Description                                                                                             |
| ---------------- | ------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `trigger`        | `ComponentType<ContextMenuTriggerProps & { children: ReactNode }>` | Required    | Component used as the context menu trigger. It receives the required context-menu event and ARIA props. |
| `triggerContent` | `ReactNode`                                                        | Required    | Content rendered inside the trigger.                                                                    |
| `children`       | `ReactNode`                                                        | Required    | Menu items, normally `ContextMenuItem` and `ContextMenuSubmenu` components.                             |
| `open`           | `boolean`                                                          | `undefined` | Controls whether the menu is open. When supplied, the component uses controlled state.                  |
| `defaultOpen`    | `boolean`                                                          | `false`     | Initial open state when using uncontrolled state.                                                       |
| `onOpenChange`   | `(open: boolean) => void`                                          | `undefined` | Callback invoked when the component requests an open-state change.                                      |
| `disabled`       | `boolean`                                                          | `false`     | Prevents the context menu from opening.                                                                 |

### `ContextMenuItem` Props

`ContextMenuItem` supports standard button HTML attributes, with these component defaults:

| Prop       | Type                                              | Default     | Description                                                                                        |
| ---------- | ------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `disabled` | `boolean`                                         | `false`     | Disables the item and excludes it from keyboard navigation.                                        |
| `type`     | `ButtonHTMLAttributes<HTMLButtonElement>['type']` | `button`    | Specifies the button type.                                                                         |
| `role`     | `ButtonHTMLAttributes<HTMLButtonElement>['role']` | `menuitem`  | Sets the ARIA role for the item.                                                                   |
| `tabIndex` | `number`                                          | `-1`        | Keeps individual menu items out of the normal Tab sequence.                                        |
| `onClick`  | `MouseEventHandler<HTMLButtonElement>`            | `undefined` | Handles item activation. The menu closes after activation unless the event's default is prevented. |

Other standard button attributes, including `className`, `aria-label`, and `title`, can also be supplied.

### `ContextMenuSubmenu` Props

| Prop       | Type        | Default  | Description                                                         |
| ---------- | ----------- | -------- | ------------------------------------------------------------------- |
| `label`    | `string`    | Required | Accessible label displayed on the submenu trigger.                  |
| `children` | `ReactNode` | Required | Menu items displayed within the submenu.                            |
| `disabled` | `boolean`   | `false`  | Disables the submenu trigger and prevents the submenu from opening. |

## Accessibility Considerations

- **Keyboard access:** Users can open the menu with the Context Menu key or `Shift+F10` when the trigger has focus.
- **Visible focus:** Both the trigger and menu items should have a clearly visible focus indicator.
- **Menu semantics:** The menu container uses `role="menu"` and items use `role="menuitem"`.
- **Submenu semantics:** Submenu triggers expose `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`.
- **Focus management:** Focus moves to the first enabled item when a menu opens and returns to the appropriate trigger when a submenu closes.
- **Disabled items:** Disabled items are identified and skipped during keyboard navigation.
- **Escape and dismissal:** Users can dismiss the submenu or menu with `Escape`, or dismiss the main menu by clicking outside it or moving focus outside it.
- **Viewport positioning:** The menu adjusts its position to avoid extending beyond the viewport edges.
- **Status feedback:** When an action changes content or state, provide appropriate feedback. Use a live region when the result needs to be announced to assistive technology.
- **Trigger semantics:** Use a suitable, focusable trigger and provide discoverable cues so users know the context menu is available.

The component should be tested with keyboard-only navigation and supported screen readers in the context of the application where it is used.

## Related Components

- [Menu Button](menu-button.md) — Opens a menu from a conventional button.
- [Dropdown](dropdown.md) — Provides a dropdown menu with keyboard interaction.
- [Popover](popover.md) — Displays interactive content in an overlay.
- [Tooltip](tooltip.md) — Provides supplementary information associated with an element.
