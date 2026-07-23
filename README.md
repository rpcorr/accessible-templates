# Accessible Templates

A collection of reusable, accessible UI templates and components built with React, TypeScript, and modern web standards.

This project focuses on building UI that is:

- Keyboard accessible
- Screen reader friendly
- WCAG 2.2 AA compliant (target)
- Responsive and modern
- Reusable across projects

---

## 🚀 Tech Stack

- React
- TypeScript
- Vite
- (Future) Testing: Vitest / Playwright
- (Future) Styling: CSS Variables / Design System

---

## 🎯 Project Goals

This project is designed to:

- Build accessible UI components from the ground up
- Provide reusable templates for real-world applications
- Demonstrate best practices in semantic HTML and ARIA usage
- Serve as a personal component library and learning resource

---

## 📦 Getting Started

### Installation

```bash
npm install
```

---

## 🧩 Components

The following components are designed with accessibility as a first-class concern and follow modern React and WAI-ARIA best practices.

Each component includes:

- Accessibility features
- Keyboard interaction documentation
- Usage examples
- Implementation notes where appropriate

### DropdownAccessible

An accessible dropdown menu component implementing the WAI-ARIA Menu Button pattern with nested submenus, keyboard navigation, focus management, disabled menu items, and semantic separators.

#### Features

- Keyboard accessible
- Nested submenu support
- Automatic focus management and restoration
- Mouse and keyboard interaction
- Typeahead (character search) support
- Escape key handling
- ARIA menu roles and states
- Disabled menu item support
- Menu separators

#### Keyboard Support

##### Trigger Button

| Key           | Action                         |
| ------------- | ------------------------------ |
| Enter / Space | Open menu                      |
| Arrow Down    | Open menu and focus first item |
| Arrow Up      | Open menu and focus last item  |

##### Menu Items

| Key           | Action                      |
| ------------- | --------------------------- |
| Arrow Down    | Move to next item           |
| Arrow Up      | Move to previous item       |
| Home          | Move to first item          |
| End           | Move to last item           |
| Enter / Space | Activate item               |
| Escape        | Close menu and return focus |

##### Submenus

| Key           | Action                         |
| ------------- | ------------------------------ |
| Arrow Right   | Open submenu                   |
| Arrow Left    | Close submenu and return focus |
| Enter / Space | Open submenu                   |
| Escape        | Close submenu and return focus |

#### Disabled Menu Items

Menu items can be disabled while remaining visible in the menu.

Example:

```tsx
<DropdownItem disabled>Rename</DropdownItem>
```

Disabled items:

- Remain visible in the menu
- Are announced as unavailable by assistive technologies
- Cannot be activated with mouse or keyboard
- Are skipped during keyboard navigation
- Are excluded from initial submenu focus

#### Menu Separators

Menu separators can be used to visually and semantically group related menu items.

Example:

```tsx
<DropdownItem>New</DropdownItem>

<DropdownSeparator />

<DropdownItem>Save</DropdownItem>
```

Separators:

- Are not focusable
- Are skipped during keyboard navigation
- Do not affect menu item selection
- Provide semantic grouping with `role="separator"`

#### Example

```tsx
<DropdownAccessible
  trigger={<Button>Open Accessible Menu with Submenus</Button>}
>
  <DropdownItem>New</DropdownItem>

  <DropdownSeparator />

  <DropdownSubmenu label="Open">
    <DropdownItem>Project</DropdownItem>

    <DropdownItem disabled>Sub Project (disabled)</DropdownItem>

    <DropdownSeparator />

    <DropdownSubmenu label="Recent">
      <DropdownItem disabled>A (disabled)</DropdownItem>
      <DropdownItem>B</DropdownItem>
      <DropdownItem>C</DropdownItem>
    </DropdownSubmenu>
  </DropdownSubmenu>

  <DropdownSeparator />

  <DropdownItem disabled>Rename (disabled)</DropdownItem>

  <DropdownItem>Save</DropdownItem>
</DropdownAccessible>
```
