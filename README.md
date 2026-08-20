# Accessible Templates

A collection of reusable, accessible UI components and templates built with React, TypeScript, and modern web standards.

This project focuses on building reusable React components with accessibility treated as a core requirement rather than an enhancement. Each component is designed with semantic HTML, keyboard interaction, focus management, responsive behaviour, and assistive technology support in mind.

- Keyboard accessible
- Screen reader friendly
- WCAG 2.2 AA focused
- Responsive and modern
- Reusable across projects
- Built with semantic HTML and WAI-ARIA
- Designed and tested with accessibility in mind

---

## 🚀 Tech Stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules
- CSS Variables / Design System
- React Hooks
- Semantic HTML
- WAI-ARIA
- Git / GitHub
- Manual keyboard and screen reader testing
- Future Testing: Vitest / Playwright

---

## 🎯 Project Goals

This project is designed to:

- Build accessible UI components from the ground up
- Provide reusable components and templates for real-world applications
- Demonstrate best practices in semantic HTML, keyboard interaction, focus management, and ARIA
- Explore accessible patterns for complex interactive components
- Provide practical examples of responsive accessible UI
- Serve as a personal component library, portfolio project, and learning resource

---

## 📦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

---

## 🧩 Components

The following components have been completed and are designed with accessibility as a first-class concern.

| Component    | Status   | Accessibility Features                                                                        |
| ------------ | -------- | --------------------------------------------------------------------------------------------- |
| Button       | Complete | Semantic HTML, keyboard accessibility, focus-visible styling                                  |
| Modal Dialog | Complete | Focus management, focus trap, Escape handling, focus restoration                              |
| Dropdown     | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management |
| Navigation   | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management             |

Each component includes:

- Accessibility-focused implementation
- Keyboard interaction support
- Usage examples
- Responsive behaviour where applicable
- Focus management where applicable
- Implementation details and supporting utilities where appropriate

---

## Dropdown

An accessible dropdown menu implementing the WAI-ARIA Menu Button pattern with nested submenus, keyboard navigation, typeahead, focus management, disabled menu items, semantic separators, and responsive behaviour.

### Features

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

### Keyboard Support

#### Trigger Button

| Key           | Action                         |
| ------------- | ------------------------------ |
| Enter / Space | Open menu                      |
| Arrow Down    | Open menu and focus first item |
| Arrow Up      | Open menu and focus last item  |

#### Menu Items

| Key           | Action                                 |
| ------------- | -------------------------------------- |
| Arrow Down    | Move to next enabled item              |
| Arrow Up      | Move to previous enabled item          |
| Home          | Move to first enabled item             |
| End           | Move to last enabled item              |
| Enter / Space | Activate item                          |
| Escape        | Close menu and return focus to trigger |

#### Submenus

| Key           | Action                         |
| ------------- | ------------------------------ |
| Arrow Right   | Open submenu                   |
| Arrow Left    | Close submenu and return focus |
| Enter / Space | Open submenu                   |
| Escape        | Close submenu and return focus |

### Disabled Menu Items

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
- Do not receive initial keyboard focus

### Menu Separators

Menu separators visually and semantically group related menu items.

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
- Use `role="separator"` for semantic meaning

### Responsive Behaviour

The dropdown adapts to smaller screen sizes:

- On larger screens, submenus open beside their parent menu
- At screen widths of 600px or less, submenus stack below their parent item
- Menu widths adapt to the available viewport space
- Long menu labels wrap to prevent content from overflowing
- Nested submenus remain usable at multiple levels on smaller screens

### Example

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
      <DropdownItem>A</DropdownItem>
      <DropdownItem disabled>B (disabled)</DropdownItem>
      <DropdownItem>C</DropdownItem>
    </DropdownSubmenu>
  </DropdownSubmenu>

  <DropdownSeparator />

  <DropdownItem disabled>Rename (disabled)</DropdownItem>

  <DropdownItem>Save</DropdownItem>
</DropdownAccessible>
```

---

## Navigation

An accessible responsive navigation component supporting nested and multi-level submenus, keyboard navigation, focus management, and a mobile navigation drawer.

### Features

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

### Keyboard Support

#### Top-Level Navigation

| Key           | Action                                     |
| ------------- | ------------------------------------------ |
| Tab           | Move between navigation controls and links |
| Enter / Space | Open submenu                               |
| Arrow Down    | Move into submenu                          |
| Arrow Right   | Open submenu                               |
| Arrow Left    | Close submenu and return focus             |
| Escape        | Close submenu and return focus             |

#### Submenus

| Key        | Action                         |
| ---------- | ------------------------------ |
| Arrow Down | Move to next item              |
| Arrow Up   | Move to previous item          |
| Home       | Move to first item             |
| End        | Move to last item              |
| Arrow Left | Close submenu and return focus |
| Escape     | Close submenu and return focus |

---

## ♿ Accessibility Testing

Accessibility is treated as an ongoing part of the development process rather than a final verification step.

Components are manually tested using:

- Keyboard-only navigation
- NVDA screen reader
- Browser zoom at 200%
- Browser zoom at 400%
- Desktop and mobile layouts
- Focus visibility
- Focus management and restoration
- Responsive submenu behaviour
- Disabled control behaviour
- Keyboard interaction in NVDA Browse Mode and Focus Mode where applicable
- Semantic HTML and ARIA attributes

---

## 🧪 Testing Roadmap

Automated testing is planned as the project continues to evolve.

Future testing will include:

- Vitest for component and interaction testing
- Playwright for end-to-end accessibility and keyboard interaction testing
- Automated accessibility checks
- Regression testing for keyboard and focus behaviour

---

## 📚 Project Status

The current core component set is complete:

- Button
- Modal Dialog
- Dropdown
- Navigation

The project is now focused on expanding the component library while continuing to apply the same accessibility-first development approach.
