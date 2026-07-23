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

### Install dependencies

```bash
npm install
```

---

## 🧩 Components

### DropdownAccessible

An accessible dropdown menu component supporting nested submenus, keyboard navigation, focus management, and mouse/keyboard interaction.

#### Features

- Keyboard accessible
- Nested submenu support
- Focus management
- Mouse and keyboard interaction
- Typeahead support
- Escape key handling
- ARIA menu roles and states

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

#### Example

```tsx
<DropdownAccessible
  trigger={<Button>Open Accessible Menu with Submenus</Button>}
>
  <DropdownItem>New</DropdownItem>

  <DropdownSubmenu label="Open">
    <DropdownItem>Project</DropdownItem>

    <DropdownSubmenu label="Recent">
      <DropdownItem>A</DropdownItem>
      <DropdownItem>B</DropdownItem>
    </DropdownSubmenu>
  </DropdownSubmenu>

  <DropdownItem>Save</DropdownItem>
</DropdownAccessible>
```
