# Navigation

An accessible responsive navigation component supporting nested and multi-level submenus, keyboard navigation, focus management, and a mobile navigation drawer.

## Features

- Keyboard accessible
- Nested and multi-level submenu support
- Focus management and restoration
- Responsive desktop and mobile layouts
- Mobile navigation drawer
- Focus trap within the mobile drawer
- Escape key handling
- Arrow-key submenu navigation
- Home and End navigation
- Screen reader support
- `aria-expanded` and `aria-controls` states
- Closed mobile drawer removed from keyboard navigation using `inert`

## Keyboard Support

### Top-Level Navigation

| Key           | Action                                     |
| ------------- | ------------------------------------------ |
| Tab           | Move between navigation controls and links |
| Enter / Space | Open submenu                               |
| Arrow Down    | Move into submenu                          |
| Arrow Right   | Open submenu                               |
| Arrow Left    | Close submenu and return focus             |
| Escape        | Close submenu and return focus             |

### Submenus

| Key        | Action                         |
| ---------- | ------------------------------ |
| Arrow Down | Move to next item              |
| Arrow Up   | Move to previous item          |
| Home       | Move to first item             |
| End        | Move to last item              |
| Arrow Left | Close submenu and return focus |
| Escape     | Close submenu and return focus |

## Usage

```tsx
<Navigation
  items={[
    {
      label: 'Products',
      children: [
        { label: 'Web Design' },
        { label: 'Development' },
        { label: 'Accessibility' },
      ],
    },
    {
      label: 'Services',
      children: [{ label: 'Consulting' }, { label: 'Training' }],
    },
    {
      label: 'About',
    },
  ]}
/>
```
