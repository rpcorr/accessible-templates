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

- Planned testing: Vitest / Playwright

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
npm  install
```

### Development

```bash
npm  run  dev
```

---

## 🧩 Components

The following components have been completed and are designed with accessibility as a first-class concern.

### Buttons & Actions

| Component                                          | Status   | Accessibility Features                                       |
| -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| [Button](docs/components/ButtonsActions/button.md) | Complete | Semantic HTML, keyboard accessibility, focus-visible styling |

### Content & Feedback

| Component                                                                   | Status   | Accessibility Features                                                                                                                                                                     |
| --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Tabs](docs/components/ContentFeedback/tabs.md)                             | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                                                                                 |
| [Accordion](docs/components/ContentFeedback/accordion.md)                   | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                                                                              |
| [Alert](docs/components/ContentFeedback/alert.md)                           | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration                                                        |
| [Disclosure](docs/components/ContentFeedback/disclosure.md)                 | Complete | Native button trigger, aria-expanded, aria-controls, keyboard accessibility, controlled and uncontrolled states, disabled state, visible focus indicator                                   |
| [Status](docs/components/ContentFeedback/status.md)                         | Complete | Polite live region, dynamic updates, aria-atomic, screen reader support                                                                                                                    |
| [Progress Indicator](docs/components/ContentFeedback/progress-indicator.md) | Complete | ARIA progressbar semantics, determinate and indeterminate states, linear, circular, icon, and fill-container variants, reduced-motion support                                              |
| [Loading Spinner](docs/components/ContentFeedback/loading-spinner.md)       | Complete | ARIA status semantics, accessible labels, decorative animation hidden from assistive technology, multiple animation variants, reduced-motion support                                       |
| [Toast](docs/components/ContentFeedback/toast.md)                           | Complete | Persistent ARIA live regions, polite and assertive announcements, keyboard-accessible actions and dismissal, focus restoration, automatic and persistent dismissal, reduced-motion support |

### Form Controls

| Component                                                          | Status   | Accessibility Features                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Checkbox](docs/components/FormControls/checkbox.md)               | Complete | Native checkbox semantics, label association, keyboard accessibility, checked and indeterminate states, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                                                                                    |
| [Combobox](docs/components/FormControls/combobox.md)               | Complete | Editable typeahead filtering, combobox and listbox semantics, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description support, no-results feedback, visible focus styling, screen reader support                                                                                                                                              |
| [Search Box](docs/components/FormControls/search-box.md)           | Complete | Native search input semantics, search landmark, label association, keyboard accessibility, Enter-to-submit support, search button, optional search icon, icon-inside variant, rounded styling, expanding-on-focus variant, controlled and uncontrolled values, required, disabled, and read-only states, description and error messaging, visible focus styling, screen reader support                     |
| [Search Combobox](docs/components/FormControls/search-combobox.md) | Complete | Search input with combobox and listbox semantics, case-insensitive filtering, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description and error messaging, result count and no-results announcements, polite live region, visible focus styling, screen reader support                                                                        |
| [Date Picker](docs/components/FormControls/date-picker.md)         | Complete | Direct date entry, calendar selection, grid semantics, keyboard navigation, roving focus, month and year navigation, minimum and maximum date constraints, controlled and uncontrolled values, required, disabled, and read-only states, description and error messaging, focus management, screen reader support                                                                                          |
| [File Upload](docs/components/FormControls/file-upload.md)         | Complete | Native file input semantics, accessible labeling, keyboard accessibility, single and multiple file selection, accepted file type hints, required and disabled states, helper and error messaging, maximum file size and file count validation, custom validation callbacks, drag-and-drop enhancement, upload progress, upload completion and error recovery, visible focus styling, screen reader support |
| [Number Input](docs/components/FormControls/number-input.md)       | Complete | Native number input semantics, label association, keyboard accessibility, min, max, and step constraints, controlled and uncontrolled values, required, disabled, and read-only states, description support, error messaging, visible focus styling, screen reader support                                                                                                                                 |
| [Radio Group](docs/components/FormControls/radio-group.md)         | Complete | Native radio semantics, fieldset/legend grouping, keyboard accessibility, vertical and horizontal orientations, controlled and uncontrolled selection, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                                     |
| [Select](docs/components/FormControls/select.md)                   | Complete | Native select semantics, label association, keyboard accessibility, single and multiple selection, placeholder support, controlled and uncontrolled selection, disabled options, disabled state, required state, description support, error messaging, visible focus styling, screen reader support                                                                                                        |
| [Slider](docs/components/FormControls/slider.md)                   | Complete | Native range input semantics, keyboard accessibility, horizontal and vertical orientations, custom ranges and step values, controlled and uncontrolled values, disabled state, description support, visible value output, colour variants, visible focus styling, screen reader support                                                                                                                    |
| [Switch](docs/components/FormControls/switch.md)                   | Complete | Native checkbox semantics with switch role, keyboard accessibility, on/off states, controlled and uncontrolled values, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                                                                     |
| [Text Input](docs/components/FormControls/text-input.md)           | Complete | Native input semantics, label association, multiple input types, controlled and uncontrolled values, required, disabled and read-only states, description support, error messaging, validation constraints, visible focus styling, and screen reader support                                                                                                                                               |
| [Textarea](docs/components/FormControls/textarea.md)               | Complete | Native textarea semantics, accessible labeling, keyboard accessibility, required and disabled states, helper and error messaging, controlled and uncontrolled usage, visible focus styling, screen reader support                                                                                                                                                                                          |
| [Time Picker](docs/components/FormControls/time-picker.md)         | Complete | Native time input semantics, label association, keyboard accessibility, controlled and uncontrolled values, minimum and maximum time constraints, custom step increments, required, disabled, and read-only states, description and error messaging, visible focus styling, screen reader support                                                                                                          |

### Navigation

| Component                                                | Status   | Accessibility Features                                                                                |
| -------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| [Navigation](docs/components/Navigation/navigation.md)   | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management                     |
| [Breadcrumbs](docs/components/Navigation/breadcrumbs.md) | Complete | Semantic navigation, aria-current, keyboard accessibility, responsive wrapping, decorative separators |
| [Pagination](docs/components/Navigation/pagination.md)   | Complete | Semantic navigation, aria-current, keyboard accessibility, focus-visible styling, disabled controls   |

### Overlays & Menus

| Component                                                     | Status   | Accessibility Features                                                                                                               |
| ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Modal Dialog](docs/components/OverlaysMenus/modal-dialog.md) | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                     |
| [Dropdown](docs/components/OverlaysMenus/dropdown.md)         | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                        |
| [Menu Button](docs/components/OverlaysMenus/menu-button.md)   | Complete | Keyboard navigation, typeahead, disabled items, focus management, Escape handling, focus restoration                                 |
| [Popover](docs/components/OverlaysMenus/popover.md)           | Complete | Interactive content, keyboard and pointer support, Escape and outside-click dismissal, focus restoration, viewport-aware positioning |
| [Tooltip](docs/components/OverlaysMenus/tooltip.md)           | Complete | Keyboard focus support, aria-describedby, Escape dismissal, responsive positioning                                                   |

Each component includes:

- Accessibility-focused implementation
- Keyboard interaction support
- Usage examples
- Responsive behaviour where applicable
- Focus management where applicable
- Implementation details and supporting utilities where appropriate

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

The project will continue to expand while maintaining the same accessibility-first development approach, with ongoing improvements to testing, documentation, and component quality.

```

```
