# Disclosure

The Disclosure component provides an accessible way to show and hide related content.

It uses a native `<button>` as its trigger and communicates the expanded state using `aria-expanded`. The trigger is associated with the disclosure content using `aria-controls`.

## Features

- Native button trigger
- Keyboard accessible without custom keyboard handlers
- `aria-expanded` communicates the open or closed state
- `aria-controls` identifies the associated content
- Supports controlled and uncontrolled usage
- Supports initially open content
- Supports disabled state
- Accepts rich React content
- Optional custom content ID
- Visible keyboard focus indicator
- Respects `prefers-reduced-motion`

## Accessibility

The Disclosure uses a native `<button>` for its trigger.

This provides standard keyboard interaction without requiring custom keyboard event handling.

When the disclosure is closed:

```html
<button aria-expanded="false" aria-controls="..."></button>
```
