# Dropdown

An accessible dropdown menu implementing the WAI-ARIA Menu Button pattern with nested submenus, keyboard navigation, typeahead, focus management, disabled menu items, semantic separators, and responsive behaviour.

## Features

- Keyboard accessible
- Nested and multi-level submenu support
- Automatic focus management and restoration
- Mouse and keyboard interaction
- Typeahead character search
- Escape key handling
- Home and End navigation
- ARIA menu roles and states
- Disabled menu item support
- Semantic menu separators
- Responsive submenu behaviour

## Keyboard Support

### Trigger Button

| Key           | Action                         |
| ------------- | ------------------------------ |
| Enter / Space | Open menu                      |
| Arrow Down    | Open menu and focus first item |
| Arrow Up      | Open menu and focus last item  |

### Menu Items

| Key           | Action                                 |
| ------------- | -------------------------------------- |
| Arrow Down    | Move to next enabled item              |
| Arrow Up      | Move to previous enabled item          |
| Home          | Move to first enabled item             |
| End           | Move to last enabled item              |
| Enter / Space | Activate item                          |
| Escape        | Close menu and return focus to trigger |

### Submenus

| Key           | Action                         |
| ------------- | ------------------------------ |
| Arrow Right   | Open submenu                   |
| Arrow Left    | Close submenu and return focus |
| Enter / Space | Open submenu                   |
| Escape        | Close submenu and return focus |

## Disabled Menu Items

Menu items can be disabled while remaining visible in the menu.

Example:

```tsx
<DropdownItem disabled>Rename</DropdownItem>
```
