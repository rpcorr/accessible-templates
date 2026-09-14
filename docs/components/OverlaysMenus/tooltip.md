# Tooltip

An accessible tooltip component that provides contextual information for interactive elements while supporting keyboard focus, mouse interaction, configurable positioning, responsive behaviour, and assistive technology support.

## Features

- Keyboard focus support
- Mouse hover support
- Configurable display delay
- Top, right, bottom, and left positioning
- Automatic positioning when viewport space is limited
- Responsive viewport-aware positioning
- Long content wrapping
- `aria-describedby` association between the trigger and tooltip
- Semantic `role="tooltip"`
- Escape key dismissal
- Tooltip is excluded from keyboard navigation
- Supports browser zoom at 200% and 400%

## Accessibility

The tooltip is associated with its trigger using `aria-describedby` while visible.

The tooltip:

- Uses `role="tooltip"`
- Appears when the trigger receives keyboard focus
- Appears after a configurable hover delay for mouse users
- Does not receive keyboard focus
- Can be dismissed with Escape
- Does not interrupt the user's focus position
- Automatically adjusts its position when space is limited
- Wraps long content to prevent horizontal overflow

## Keyboard Support

| Key           | Action                            |
| ------------- | --------------------------------- |
| `Tab`         | Move focus to the tooltip trigger |
| `Shift + Tab` | Move focus backward               |
| `Escape`      | Dismiss the visible tooltip       |

The tooltip itself is not included in the keyboard navigation order.

## Responsive Behaviour

The tooltip automatically adjusts its position based on available viewport space.

- Top tooltips can flip to the bottom when necessary
- Bottom tooltips can flip to the top when necessary
- Left tooltips can flip to the right when necessary
- Right tooltips can flip to the left when necessary
- Tooltip content is constrained to the viewport
- Long tooltip content wraps across multiple lines
- Tooltip positioning is tested at 200% and 400% browser zoom
- Tooltip positioning accounts for the trigger's location within the viewport
- Tooltip positioning is adjusted to prevent content from being cut off

## Usage

```tsx
<Tooltip content="Tooltip above" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Tooltip to the right" position="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="Tooltip below" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip to the left" position="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="This is a deliberately long tooltip message that wraps across multiple lines while remaining within the viewport.">
  <Button>Very Long Tooltip</Button>
</Tooltip>
```
