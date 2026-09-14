# Modal Dialog

An accessible modal dialog component that manages keyboard focus, supports Escape key dismissal, traps focus while open, and restores focus to the element that opened the dialog.

## Features

- Semantic dialog implementation
- Focus management
- Focus trap while open
- Escape key handling
- Focus restoration
- Configurable dismissal behaviour
- Keyboard accessible
- Screen reader support

## Accessibility

The Modal Dialog component:

- Uses the semantic `dialog` role
- Uses `aria-modal="true"` while open
- Traps keyboard focus inside the dialog
- Prevents focus from moving to content behind the dialog
- Supports non-dismissible dialogs when required
- Restores focus to the element that opened the dialog
- Provides a visible focus indicator for interactive controls

## Keyboard Support

| Key         | Action                                       |
| ----------- | -------------------------------------------- |
| Tab         | Move focus to the next focusable element     |
| Shift + Tab | Move focus to the previous focusable element |
| Escape      | Close the dialog when dismissal is allowed   |

Focus remains within the dialog while it is open.

When the dialog closes, focus returns to the element that opened it.

## Usage

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Confirm Action</h2>
  <p>Are you sure you want to continue?</p>
  <Button onClick={() => setIsOpen(false)}>Cancel</Button>
  <Button>Confirm</Button>
</Modal>
```
