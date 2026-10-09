# Popover

An accessible non-modal popover for displaying contextual information, actions, and interactive content without trapping keyboard focus.

## Features

- Keyboard accessible
- Mouse and touch interaction
- Supports interactive content
- Semantic `dialog` role
- Trigger association using `aria-controls`
- Trigger state communicated using `aria-expanded`
- Escape key dismissal
- Outside click and touch dismissal
- Focus restoration when dismissed
- No focus trap
- Supports top, bottom, left, and right placement
- Automatically adjusts its position when space is limited
- Viewport-aware positioning
- Supports controlled and uncontrolled open state
- Supports disabled triggers
- Supports optional titles
- Supports custom trigger components
- Supports configurable Escape and outside-click dismissal

## When to Use

Use a Popover when additional contextual information or actions need to be displayed in relation to a trigger and the content may contain interactive elements.

Examples include:

- Account actions
- Additional settings
- Contextual actions
- Information panels
- Secondary controls
- Short forms
- Help or configuration content that includes interactive controls

A Popover should not be used when the content is purely supplementary and non-interactive. Use a [Tooltip](./tooltip.md) for brief, non-interactive information.

For tasks that require the user's full attention or need to prevent interaction with the rest of the page, use a [Modal Dialog](./modal.md).

## Popover vs. Tooltip vs. Modal

| Component    | Purpose                           | Interactive Content | Focus Trap |
| ------------ | --------------------------------- | ------------------- | ---------- |
| Popover      | Contextual information or actions | Yes                 | No         |
| Tooltip      | Brief supplementary information   | No                  | No         |
| Modal Dialog | Focused task requiring attention  | Yes                 | Yes        |

## Accessibility

The Popover:

- Uses `role="dialog"` for interactive popover content.
- Associates the trigger with the popover using `aria-controls`.
- Communicates the open state using `aria-expanded`.
- Uses an accessible title when one is provided.
- Supports keyboard and pointer interaction.
- Can be dismissed with the Escape key.
- Can be dismissed by interacting outside the popover.
- Restores focus to the element that opened the popover when it is dismissed.
- Does not trap keyboard focus.
- Allows users to move naturally through interactive content.
- Adjusts its position to remain within the viewport when space is limited.

When using interactive content inside a Popover, controls should have accessible names and follow the normal accessibility requirements for their respective controls.

## Keyboard Support

| Key           | Action                                                |
| ------------- | ----------------------------------------------------- |
| `Enter`       | Activates the popover trigger.                        |
| `Space`       | Activates the popover trigger.                        |
| `Tab`         | Moves focus through interactive content.              |
| `Shift + Tab` | Moves focus backward through interactive content.     |
| `Escape`      | Closes the popover and restores focus to the trigger. |

Focus is not trapped inside the Popover. This allows users to continue navigating the surrounding page.

## Usage

The Popover accepts a custom trigger component.

```tsx
import { Button } from '../../../components/ButtonsActions/Button';
import { Popover } from '../../../components/OverlaysMenus/Popover';

<Popover
  trigger={Button}
  triggerContent="Account options"
  title="Account options"
>
  <div>
    <p>Choose an account action.</p>

    <Button>View profile</Button>
    <Button>Sign out</Button>
  </div>
</Popover>;
```

## Interactive Content

Popovers can contain interactive controls such as buttons, links, form controls, and other accessible components.

```tsx
<Popover
  trigger={Button}
  triggerContent="Account options"
  title="Account options"
>
  <div>
    <p>Choose an account action.</p>

    <Button onClick={handleViewProfile}>View profile</Button>

    <Button onClick={handleSignOut}>Sign out</Button>
  </div>
</Popover>
```

When an action closes the Popover, focus can return to the trigger so that keyboard and screen reader users maintain a predictable point of interaction.

## Controlled State

The Popover can be controlled using `open` and `onOpenChange`.

```tsx
const [open, setOpen] = useState(false);

<Popover
  trigger={Button}
  triggerContent="Account options"
  title="Account options"
  open={open}
  onOpenChange={setOpen}
>
  <p>Popover content.</p>
</Popover>;
```

Controlled state is useful when the application needs to respond to Popover state changes or when an action inside the Popover needs to explicitly close it.

## Uncontrolled State

By default, the Popover manages its own open state.

```tsx
<Popover
  trigger={Button}
  triggerContent="More information"
  title="Additional information"
>
  <p>Additional contextual information.</p>
</Popover>
```

An initial open state can be provided using `defaultOpen`.

```tsx
<Popover
  trigger={Button}
  triggerContent="More information"
  defaultOpen
  title="Additional information"
>
  <p>Additional contextual information.</p>
</Popover>
```

## Placement

The Popover supports four preferred placements:

```tsx
<Popover
  trigger={Button}
  triggerContent="Top"
  placement="top"
>
  <p>Top content.</p>
</Popover>

<Popover
  trigger={Button}
  triggerContent="Right"
  placement="right"
>
  <p>Right content.</p>
</Popover>

<Popover
  trigger={Button}
  triggerContent="Bottom"
  placement="bottom"
>
  <p>Bottom content.</p>
</Popover>

<Popover
  trigger={Button}
  triggerContent="Left"
  placement="left"
>
  <p>Left content.</p>
</Popover>
```

The preferred placement is automatically adjusted when there is insufficient space near the viewport edge.

The Popover also constrains its dimensions so that content does not create unnecessary horizontal or vertical viewport overflow.

## Dismissal

By default, the Popover closes when:

- The trigger is activated while the Popover is open.
- `Escape` is pressed.
- The user clicks or taps outside the Popover.
- Focus moves outside the Popover and its trigger.

Escape and outside-click dismissal can be disabled when required.

```tsx
<Popover
  trigger={Button}
  triggerContent="Options"
  closeOnEscape={false}
  closeOnOutsideClick={false}
>
  <p>Popover content.</p>
</Popover>
```

Disabling dismissal should only be done when there is a clear interaction requirement. Users should generally have an obvious way to close or move away from the content.

## Disabled Trigger

The trigger can be disabled using the `disabled` prop.

```tsx
<Popover trigger={Button} triggerContent="Options" disabled>
  <p>Popover content.</p>
</Popover>
```

A disabled Popover cannot be opened.

## API

### `PopoverProps`

| Prop                  | Type                                                           | Default    | Description                                                        |
| --------------------- | -------------------------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| `trigger`             | `ComponentType<PopoverTriggerProps & { children: ReactNode }>` | —          | Component used to render the Popover trigger.                      |
| `triggerContent`      | `ReactNode`                                                    | —          | Content displayed inside the trigger.                              |
| `children`            | `ReactNode`                                                    | —          | Popover content.                                                   |
| `title`               | `string`                                                       | —          | Optional accessible heading displayed within the Popover.          |
| `placement`           | `'top' \| 'bottom' \| 'left' \| 'right'`                       | `'bottom'` | Preferred Popover placement.                                       |
| `open`                | `boolean`                                                      | —          | Controls the Popover open state.                                   |
| `defaultOpen`         | `boolean`                                                      | `false`    | Initial open state for uncontrolled usage.                         |
| `onOpenChange`        | `(open: boolean) => void`                                      | —          | Called when the Popover open state changes.                        |
| `disabled`            | `boolean`                                                      | `false`    | Prevents the Popover from opening.                                 |
| `closeOnEscape`       | `boolean`                                                      | `true`     | Determines whether Escape closes the Popover.                      |
| `closeOnOutsideClick` | `boolean`                                                      | `true`     | Determines whether outside pointer interaction closes the Popover. |
| `className`           | `string`                                                       | `''`       | Additional CSS class applied to the Popover.                       |

## Related Components

- [Context Menu](./context-menu.md) — Provides a menu opened by right-click, the Context Menu key, or `Shift+F10`, with keyboard navigation and typeahead support.
- [Dropdown](./dropdown.md) — Provides contextual menu actions with keyboard navigation, submenus, and typeahead support.
- [Menu Button](./menu-button.md) — A button that controls a menu of actions with keyboard navigation and focus management.
- [Modal Dialog](./modal-dialog.md) — Provides focused interactive content with a focus trap when the user's attention is required.
- [Select](../FormControls/select.md) — A form control for selecting a value from a list of options.
- [Tooltip](./tooltip.md) — Displays brief, supplementary information that does not contain interactive content.
