# Button

An accessible button component providing semantic HTML, keyboard interaction, and visible focus styling.

## Features

- Uses a native `<button>` element
- Keyboard accessible
- Supports focus-visible styling
- Supports button states and variants
- Reusable across the project

## Accessibility

The Button component:

- Uses semantic button HTML
- Is keyboard accessible by default
- Provides a visible focus indicator
- Preserves native button behaviour
- Supports assistive technology through native semantics

## Keyboard Support

| Key         | Action                             |
| ----------- | ---------------------------------- |
| Tab         | Move focus to the button           |
| Shift + Tab | Move focus to the button backwards |
| Enter       | Activate the button                |
| Space       | Activate the button                |

## Usage

```tsx
<Button>Save</Button>
```
