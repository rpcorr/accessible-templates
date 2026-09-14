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

| Component                                                                   | Status   | Accessibility Features                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Button](docs/components/ButtonsActions/button.md)                          | Complete | Semantic HTML, keyboard accessibility, focus-visible styling                                                                                                                                                                                                                                        |
| [Modal Dialog](docs/components/OverlaysMenus/modal-dialog.md)               | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                                                                                                                                                                                    |
| [Dropdown](docs/components/OverlaysMenus/dropdown.md)                       | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                                                                                                                                                                                       |
| [Navigation](docs/components/Navigation/navigation.md)                      | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management                                                                                                                                                                                                                   |
| [Tooltip](docs/components/OverlaysMenus/tooltip.md)                         | Complete | Keyboard focus support, aria-describedby, Escape dismissal, responsive positioning                                                                                                                                                                                                                  |
| [Tabs](docs/components/ContentFeedback/tabs.md)                             | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                                                                                                                                                                                          |
| [Accordion](docs/components/ContentFeedback/accordion.md)                   | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                                                                                                                                                                                       |
| [Breadcrumbs](docs/components/Navigation/breadcrumbs.md)                    | Complete | Semantic navigation, aria-current, keyboard accessibility, responsive wrapping, decorative separators                                                                                                                                                                                               |
| [Pagination](docs/components/Navigation/pagination.md)                      | Complete | Semantic navigation, aria-current, keyboard accessibility, focus-visible styling, disabled controls                                                                                                                                                                                                 |
| [Alert](docs/components/ContentFeedback/alert.md)                           | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration                                                                                                                                                                 |
| [Status](docs/components/ContentFeedback/status.md)                         | Complete | Polite live region, dynamic updates, aria-atomic, screen reader support                                                                                                                                                                                                                             |
| [Progress Indicator](docs/components/ContentFeedback/progress-indicator.md) | Complete | ARIA progressbar semantics, determinate and indeterminate states, linear, circular, icon, and fill-container variants, reduced-motion support                                                                                                                                                       |
| [Loading Spinner](docs/components/ContentFeedback/loading-spinner.md)       | Complete | ARIA status semantics, accessible labels, decorative animation hidden from assistive technology, multiple animation variants, reduced-motion support                                                                                                                                                |
| [Checkbox](docs/components/FormControls/checkbox.md)                        | Complete | Native checkbox semantics, label association, keyboard accessibility, checked and indeterminate states, disabled and required states, description support, visible focus styling, screen reader support                                                                                             |
| [Radio Group](docs/components/FormControls/radio-group.md)                  | Complete | Native radio semantics, fieldset/legend grouping, keyboard accessibility, vertical and horizontal orientations, controlled and uncontrolled selection, disabled and required states, description support, visible focus styling, screen reader support                                              |
| [Select](docs/components/FormControls/select.md)                            | Complete | Native select semantics, label association, keyboard accessibility, single and multiple selection, placeholder support, controlled and uncontrolled selection, disabled options, disabled state, required state, description support, error messaging, visible focus styling, screen reader support |
| [Combobox](docs/components/FormControls/combobox.md)                        | Complete | Editable typeahead filtering, combobox and listbox semantics, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description support, no-results feedback, visible focus styling, screen reader support                                       |
| [Number Input](docs/components/FormControls/number-input.md)                | Complete | Native number input semantics, label association, keyboard accessibility, min, max, and step constraints, controlled and uncontrolled values, required, disabled, and read-only states, description support, error messaging, visible focus styling, screen reader support                          |
| [Switch](docs/components/FormControls/switch.md)                            | Complete | Native checkbox semantics with switch role, keyboard accessibility, on/off states, controlled and uncontrolled values, disabled and required states, description support, visible focus styling, screen reader support                                                                              |
| [Slider](docs/components/FormControls/slider.md)                            | Complete | Native range input semantics, keyboard accessibility, horizontal and vertical orientations, custom ranges and step values, controlled and uncontrolled values, disabled state, description support, visible value output, colour variants, visible focus styling, screen reader support             |
| [Text Input](docs/components/FormControls/text-input.md)                    | Complete | Native input semantics, label association, multiple input types, controlled and uncontrolled values, required, disabled and read-only states, description support, error messaging, validation constraints, visible focus styling, and screen reader support                                        |
| [Textarea](docs/components/FormControls/textarea.md)                        | Complete | Native textarea semantics, accessible labeling, keyboard accessibility, required and disabled states, helper and error messaging, controlled and uncontrolled usage, visible focus styling, screen reader support                                                                                   |

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

## 📚 Project Status

The current core component set is complete:

- Button
- Modal Dialog
- Dropdown
- Navigation
- Tooltip
- Tabs
- Accordion
- Breadcrumbs
- Pagination
- Alert
- Status
- Progress Indicator
- Loading Spinner
- Checkbox
- Radio Group
- Select
- Combobox
- Number Input
- Switch
- Slider
- Text Input
- Textarea

The project will continue to expand while maintaining the same accessibility-first development approach, with ongoing improvements to testing, documentation, and component quality.
