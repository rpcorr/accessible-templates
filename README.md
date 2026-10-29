# Accessible Templates

A collection of reusable, accessible UI components and templates built with React, TypeScript, and modern web standards.

This project focuses on building reusable React components with accessibility treated as a core requirement rather than an enhancement. Each component is designed with semantic HTML, keyboard interaction, focus management, responsive behaviour, and assistive technology support in mind.

- Keyboard accessible
- Screen reader friendly
- Focused on WCAG 2.2 Level AA
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
- CSS Variables and design tokens
- React Hooks
- Semantic HTML
- WAI-ARIA
- Git and GitHub
- Manual keyboard and screen reader testing
- Vitest for component and interaction testing
- Playwright planned for end-to-end testing

---

## 🎯 Project Goals

This project is designed to:

- Build accessible UI components from the ground up
- Provide reusable components and templates for real-world applications
- Demonstrate best practices in semantic HTML, keyboard interaction, focus management, and ARIA
- Explore accessible patterns for complex interactive components
- Provide practical examples of responsive, accessible UI
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

### Run Tests

```bash
npm run test:run
```

---

## 🧩 Components

The following components have been implemented with accessibility as a first-class concern.

### Buttons & Actions

| Component                                          | Status   | Accessibility Features                                       |
| -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| [Button](docs/components/ButtonsActions/button.md) | Complete | Semantic HTML, keyboard accessibility, visible focus styling |

### Content & Feedback

| Component                                                                   | Status   | Accessibility Features                                                                                                                                                                     |
| --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Tabs](docs/components/ContentFeedback/tabs.md)                             | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                                                                                 |
| [Accordion](docs/components/ContentFeedback/accordion.md)                   | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                                                                              |
| [Alert](docs/components/ContentFeedback/alert.md)                           | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration                                                        |
| [Badge](docs/components/ContentFeedback/badge.md)                           | Complete | Semantic text labels, six visual variants, small and medium sizes, meaning communicated without relying on colour alone, configurable styling through design tokens                        |
| [Disclosure](docs/components/ContentFeedback/disclosure.md)                 | Complete | Native button trigger, `aria-expanded`, `aria-controls`, keyboard accessibility, controlled and uncontrolled states, disabled state, visible focus indicator                               |
| [Status](docs/components/ContentFeedback/status.md)                         | Complete | Polite live region, dynamic updates, `aria-atomic`, screen reader support                                                                                                                  |
| [Progress Indicator](docs/components/ContentFeedback/progress-indicator.md) | Complete | ARIA progressbar semantics, determinate and indeterminate states, linear, circular, icon, and fill-container variants, reduced-motion support                                              |
| [Loading Spinner](docs/components/ContentFeedback/loading-spinner.md)       | Complete | ARIA status semantics, accessible labels, decorative animation hidden from assistive technology, multiple animation variants, reduced-motion support                                       |
| [Toast](docs/components/ContentFeedback/toast.md)                           | Complete | Persistent ARIA live regions, polite and assertive announcements, keyboard-accessible actions and dismissal, focus restoration, automatic and persistent dismissal, reduced-motion support |

### Data Display

| Component                                                 | Status   | Accessibility Features                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Bar Chart](docs/components/DataDisplay/bar-chart.md)     | Complete | Semantic figure and caption, accessible chart title and optional description, proportional vertical and horizontal bars, configurable orientation, single-series and grouped bar charts for comparing multiple datasets, category labels and numerical values, distinct series colours and accessible legend, optional grid lines and numerical axis, visually hidden semantic data table supporting single and grouped datasets, support for empty datasets and zero values, responsive layouts with horizontal scrolling, and screen reader support                                                                                |
| [Donut Chart](docs/components/DataDisplay/donut-chart.md) | Complete | Semantic figure and caption, accessible chart title and optional description, proportional SVG donut segments with a hollow centre, standard and exploded chart layouts, category labels with numerical values and percentages, distinguishable segment colours using CSS variables, accessible legend with a two-column layout at viewport widths of 425px and smaller, visually hidden semantic data table with category, value, and percentage columns, customizable value column heading, handling of empty datasets and zero, negative, non-finite, and very large finite values, responsive layouts, and screen reader support |
| [Pie Chart](docs/components/DataDisplay/pie-chart.md)     | Complete | Semantic figure and caption, accessible chart title and optional description, proportional SVG pie slices, standard and exploded chart layouts, category labels with numerical values and percentages, distinguishable slice colours using CSS variables, accessible legend, semantic data table with category, value, and percentage columns, customizable value column heading, handling of empty datasets and zero, negative, non-finite, and very large finite values, responsive layouts, and screen reader support.                                                                                                            |
| [Card](docs/components/DataDisplay/card.md)               | Complete | Semantic content structure, configurable variants, support for headers and footers, flexible content, accessible presentation of related information, and integration with other components                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [List](docs/components/DataDisplay/list.md)               | Complete | Semantic unordered and ordered list markup, configurable list markers, default and custom marker styles, support for rich React content, custom SVG icons, accessible naming and ARIA attributes, natural reading order, and screen reader support                                                                                                                                                                                                                                                                                                                                                                                   |
| [Statistic](docs/components/DataDisplay/statistic.md)     | Complete | Descriptive labels and values, optional supporting descriptions, support for numeric and formatted values, semantic HTML, configurable styling, keyboard accessibility, screen reader support, and integration with Card and Chart components                                                                                                                                                                                                                                                                                                                                                                                        |
| [Table](docs/components/DataDisplay/table.md)             | Complete | Semantic table markup, accessible captions (including visually hidden captions), keyboard-accessible sorting, `aria-sort` support, basic and striped variants, responsive horizontal scrolling with conditional keyboard access, configurable frozen columns with responsive settings, visual frozen-column boundary, custom cell rendering, empty-state messaging, and screen reader support                                                                                                                                                                                                                                        |

### Form Controls

| Component                                                                              | Status      | Accessibility Features                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Checkbox](docs/components/FormControls/checkbox.md)                                   | Complete    | Native checkbox semantics, label association, keyboard accessibility, checked and indeterminate states, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                                                                           |
| [Combobox](docs/components/FormControls/combobox.md)                                   | Complete    | Editable typeahead filtering, combobox and listbox semantics, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description support, no-results feedback, visible focus styling, screen reader support                                                                                                                                     |
| [Search Box](docs/components/FormControls/search-box.md)                               | Complete    | Native search input semantics, search landmark, label association, keyboard accessibility, Enter-to-submit support, search button, optional search icon, icon-inside variant, rounded styling, expand-on-focus variant, controlled and uncontrolled values, required, disabled, and read-only states, description and error messaging, visible focus styling, screen reader support               |
| [Search Combobox](docs/components/FormControls/search-combobox.md)                     | Complete    | Search input with combobox and listbox semantics, case-insensitive filtering, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description and error messaging, result count and no-results announcements, polite live region, visible focus styling, screen reader support                                                               |
| [Date Picker](docs/components/FormControls/date-picker.md)                             | Complete    | Direct date entry, calendar selection, grid semantics, keyboard navigation, roving focus, month and year navigation, minimum and maximum date constraints, controlled and uncontrolled values, required, disabled, and read-only states, description and error messaging, focus management, screen reader support                                                                                 |
| [Date Range Picker](docs/components/FormControls/DateRangePicker/date-range-picker.md) | Complete    | Start and end date selection, calendar grid semantics, keyboard navigation, roving focus, month and year navigation, minimum and maximum date constraints, range validation, controlled and uncontrolled values, required, disabled, and read-only states, descriptions and error messaging, accessible date labels, focus management, and screen reader support                                  |
| [File Upload](docs/components/FormControls/file-upload.md)                             | Complete    | Native file input semantics, accessible labeling, keyboard accessibility, single and multiple file selection, accepted file type hints, required and disabled states, helper and error messaging, file size and count validation, custom validation callbacks, drag-and-drop enhancement, upload progress, completion announcements, error recovery, visible focus styling, screen reader support |
| [Number Input](docs/components/FormControls/number-input.md)                           | Complete    | Native number input semantics, label association, keyboard accessibility, minimum, maximum, and step constraints, controlled and uncontrolled values, required, disabled, and read-only states, description support, error messaging, visible focus styling, screen reader support                                                                                                                |
| [Radio Group](docs/components/FormControls/radio-group.md)                             | Complete    | Native radio semantics, fieldset and legend grouping, keyboard accessibility, vertical and horizontal orientations, controlled and uncontrolled selection, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                        |
| [Select](docs/components/FormControls/select.md)                                       | Complete    | Native select semantics, label association, keyboard accessibility, single and multiple selection, placeholder support, controlled and uncontrolled selection, disabled options, disabled and required states, description support, error messaging, visible focus styling, screen reader support                                                                                                 |
| [Signature Field](docs/components/FormControls/signature-field.md)                     | In Progress | Pointer-based signature drawing with mouse, touch, and stylus support, typed-signature alternative, distinct drawn and typed value types, clear action, required and disabled states, instruction and error messaging, visible focus styling, and accessibility support                                                                                                                           |
| [Slider](docs/components/FormControls/slider.md)                                       | Complete    | Native range input semantics, keyboard accessibility, horizontal and vertical orientations, custom ranges and step values, controlled and uncontrolled values, disabled state, description support, visible value output, colour variants, visible focus styling, screen reader support                                                                                                           |
| [Switch](docs/components/FormControls/switch.md)                                       | Complete    | Native checkbox semantics with switch role, keyboard accessibility, on/off states, controlled and uncontrolled values, disabled and required states, description support, visible focus styling, screen reader support                                                                                                                                                                            |
| [Text Input](docs/components/FormControls/text-input.md)                               | Complete    | Native input semantics, label association, multiple input types, controlled and uncontrolled values, required, disabled, and read-only states, description support, error messaging, validation constraints, visible focus styling, screen reader support                                                                                                                                         |
| [Textarea](docs/components/FormControls/textarea.md)                                   | Complete    | Native textarea semantics, accessible labeling, keyboard accessibility, required and disabled states, helper and error messaging, controlled and uncontrolled usage, visible focus styling, screen reader support                                                                                                                                                                                 |
| [Time Picker](docs/components/FormControls/time-picker.md)                             | Complete    | Native time input semantics, label association, keyboard accessibility, controlled and uncontrolled values, minimum and maximum time constraints, custom step increments, required, disabled, and read-only states, description and error messaging, visible focus styling, screen reader support                                                                                                 |

### Navigation

| Component                                                                 | Status   | Accessibility Features                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Breadcrumbs](docs/components/Navigation/breadcrumbs.md)                  | Complete | Semantic navigation, `aria-current`, keyboard accessibility, responsive wrapping, decorative separators                                                                                                                                                                            |
| [Carousel](docs/components/Navigations/carousel.md)                       | Complete | Semantic carousel region, slide announcements, keyboard-accessible controls, slide indicators, optional looping, automatic rotation with pause/play controls                                                                                                                       |
| [Multi-Item Carousel](docs/components/Navigations/multi-item-carousel.md) | Complete | Semantic carousel region, slide position and live announcements, keyboard-accessible controls and indicators, responsive layouts, hidden and inert inactive slides, optional looping, reduced-motion support, CoverFlow presentation, controlled navigation, no automatic rotation |
| [Navigation](docs/components/Navigation/navigation.md)                    | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap where appropriate, focus management                                                                                                                                                                                |
| [Pagination](docs/components/Navigation/pagination.md)                    | Complete | Semantic navigation, `aria-current`, keyboard accessibility, visible focus styling, disabled controls                                                                                                                                                                              |
| [Skip Link](docs/components/Navigations/skip-link.md)                     | Complete | Keyboard-accessible links to bypass repeated content, skip to main content or the footer, visible focus indicators, screen-reader support, reduced-motion support                                                                                                                  |

### Overlays & Menus

| Component                                                     | Status   | Accessibility Features                                                                                                                                                          |
| ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Context Menu](docs/components/OverlaysMenus/context-menu.md) | Complete | Right-click and keyboard activation, arrow-key navigation, Home/End, typeahead, nested submenus, disabled items, Escape handling, focus restoration, viewport-aware positioning |
| [Dropdown](docs/components/OverlaysMenus/dropdown.md)         | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                                                                   |
| [Menu Button](docs/components/OverlaysMenus/menu-button.md)   | Complete | Keyboard navigation, typeahead, disabled items, focus management, Escape handling, focus restoration                                                                            |
| [Modal Dialog](docs/components/OverlaysMenus/modal-dialog.md) | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                                                                |
| [Popover](docs/components/OverlaysMenus/popover.md)           | Complete | Interactive content, keyboard and pointer support, Escape and outside-click dismissal, focus restoration, viewport-aware positioning                                            |
| [Tooltip](docs/components/OverlaysMenus/tooltip.md)           | Complete | Keyboard focus support, `aria-describedby`, Escape dismissal, responsive positioning                                                                                            |

Each component aims to include:

- Accessibility-focused implementation
- Keyboard interaction support
- Usage examples
- Responsive behaviour where applicable
- Focus management where applicable
- Implementation details and supporting utilities where appropriate

---

## ♿ Accessibility Testing

Accessibility is treated as an ongoing part of development rather than a final verification step.

Manual testing includes:

- Keyboard-only navigation
- NVDA screen reader testing
- Browser zoom at 200% and 400%
- Desktop and mobile layouts
- Focus visibility
- Focus management and restoration
- Responsive submenu behaviour
- Disabled control behaviour
- Keyboard interaction in NVDA Browse Mode and Focus Mode, where applicable
- Inspection of semantic HTML and ARIA attributes

Automated component and interaction tests are run with Vitest. Browser-level testing with Playwright and automated accessibility checks will be expanded as the project evolves.

---

## 🧪 Testing Roadmap

Planned improvements include:

- Expanding Vitest component and interaction test coverage
- Playwright end-to-end testing for keyboard navigation and focus behaviour
- Automated accessibility checks
- Regression testing for keyboard interaction and focus management
- Testing reduced-motion preferences and responsive behaviour across interactive components

---

The project will continue to expand while maintaining an accessibility-first development approach, with ongoing improvements to implementation, testing, documentation, and component quality.
