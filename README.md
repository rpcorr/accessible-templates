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

npm  install

```

### Development

```bash

npm  run  dev

```

---

**## 🧩 Components**

The following components have been completed and are designed with accessibility as a first-class concern.

| Component    | Status   | Accessibility Features                                                                                                              |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Button       | Complete | Semantic HTML, keyboard accessibility, focus-visible styling                                                                        |
| Modal Dialog | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                    |
| Dropdown     | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                       |
| Navigation   | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management                                                   |
| Tooltip      | Complete | Keyboard focus support, aria-describedby, Escape dismissal, responsive positioning                                                  |
| Tabs         | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                          |
| Accordion    | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                       |
| Breadcrumbs  | Complete | Semantic navigation, aria-current, keyboard accessibility, responsive wrapping, decorative separators                               |
| Pagination   | Complete | Semantic navigation, aria-current, keyboard accessibility, focus-visible styling, disabled controls                                 |
| Alert        | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration |

Each component includes:

- Accessibility-focused implementation

- Keyboard interaction support

- Usage examples

- Responsive behaviour where applicable

- Focus management where applicable

- Implementation details and supporting utilities where appropriate

---

## Button

An accessible button component providing semantic HTML, keyboard interaction, and visible focus styling.

### Features

- Uses a native `<button>` element

- Keyboard accessible

- Supports focus-visible styling

- Supports button states and variants

- Reusable across the project

### Accessibility

The Button component:

- Uses semantic button HTML

- Is keyboard accessible by default

- Provides a visible focus indicator

- Preserves native button behaviour

- Supports assistive technology through native semantics

### Keyboard Support

| Key | Action |

| ----------- | ---------------------------------- |

| Tab | Move focus to the button |

| Shift + Tab | Move focus to the button backwards |

| Enter | Activate the button |

| Space | Activate the button |

### Usage

```tsx
<Button>Save</Button>
```

---

## Modal Dialog

An accessible modal dialog component that manages keyboard focus, supports Escape key dismissal, traps focus while open, and restores focus to the element that opened the dialog.

### Features

- Semantic dialog implementation

- Focus management

- Focus trap while open

- Escape key handling

- Focus restoration

- Configurable dismissal behaviour

- Keyboard accessible

- Screen reader support

### Accessibility

The Modal Dialog component:

- Uses the semantic `dialog` role

- Uses `aria-modal="true"` while open

- Traps keyboard focus inside the dialog

- Prevents focus from moving to content behind the dialog

- Supports non-dismissible dialogs when required

- Restores focus to the element that opened the dialog

- Provides a visible focus indicator for interactive controls

### Keyboard Support

| Key | Action |

| ----------- | -------------------------------------------- |

| Tab | Move focus to the next focusable element |

| Shift + Tab | Move focus to the previous focusable element |

| Escape | Close the dialog when dismissal is allowed |

Focus remains within the dialog while it is open.

When the dialog closes, focus returns to the element that opened it.

### Usage

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Confirm Action</h2>

  <p>Are you sure you want to continue?</p>

  <Button onClick={() => setIsOpen(false)}>Cancel</Button>

  <Button>Confirm</Button>
</Modal>
```

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

| Key | Action |

| ------------- | ------------------------------ |

| Enter / Space | Open menu |

| Arrow Down | Open menu and focus first item |

| Arrow Up | Open menu and focus last item |

#### Menu Items

| Key | Action |

| ------------- | -------------------------------------- |

| Arrow Down | Move to next enabled item |

| Arrow Up | Move to previous enabled item |

| Home | Move to first enabled item |

| End | Move to last enabled item |

| Enter / Space | Activate item |

| Escape | Close menu and return focus to trigger |

#### Submenus

| Key | Action |

| ------------- | ------------------------------ |

| Arrow Right | Open submenu |

| Arrow Left | Close submenu and return focus |

| Enter / Space | Open submenu |

| Escape | Close submenu and return focus |

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

<DropdownSeparator  />

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

### Usage

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

| Key | Action |

| ------------- | ------------------------------------------ |

| Tab | Move between navigation controls and links |

| Enter / Space | Open submenu |

| Arrow Down | Move into submenu |

| Arrow Right | Open submenu |

| Arrow Left | Close submenu and return focus |

| Escape | Close submenu and return focus |

#### Submenus

| Key | Action |

| ---------- | ------------------------------ |

| Arrow Down | Move to next item |

| Arrow Up | Move to previous item |

| Home | Move to first item |

| End | Move to last item |

| Arrow Left | Close submenu and return focus |

| Escape | Close submenu and return focus |

### Usage

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

---

## Tooltip

An accessible tooltip component that provides contextual information for interactive elements while supporting keyboard focus, mouse interaction, configurable positioning, responsive behaviour, and assistive technology support.

### Features

- Keyboard focus support
- Mouse hover support
- Configurable display delay
- Top, right, bottom, and left positioning
- Automatic positioning when viewport space is limited
- Responsive viewport-aware positioning
- Long content wrapping
- `aria-describedby` association between the trigger and tooltip
- Semantic `role="tooltip"`
- Escape key dismissal
- Tooltip is excluded from keyboard navigation
- Supports browser zoom at 200% and 400%

### Accessibility

The tooltip is associated with its trigger using `aria-describedby` while visible.

The tooltip:

- Uses `role="tooltip"`
- Appears when the trigger receives keyboard focus
- Appears after a configurable hover delay for mouse users
- Does not receive keyboard focus
- Can be dismissed with Escape
- Does not interrupt the user's focus position
- Automatically adjusts its position when space is limited
- Wraps long content to prevent horizontal overflow

### Keyboard Support

| Key | Action |

| Tab | Move focus to the tooltip trigger |

| Shift + Tab | Move focus backward |

| Escape | Dismiss the visible tooltip |

The tooltip itself is not included in the keyboard navigation order.

### Responsive Behaviour

The tooltip automatically adjusts its position based on available viewport space.

- Top tooltips can flip to the bottom when necessary
- Bottom tooltips can flip to the top when necessary
- Left tooltips can flip to the right when necessary
- Right tooltips can flip to the left when necessary
- Tooltip content is constrained to the viewport
- Long tooltip content wraps across multiple lines
- Tooltip positioning is tested at 200% and 400% browser zoom
- Tooltip positioning accounts for the trigger's location within the viewport
- Tooltip positioning is adjusted to prevent content from being cut off

### Usage

```tsx

<Tooltip  content="Tooltip above"  position="top">
	<Button>Top</Button>
</Tooltip>

<Tooltip  content="Tooltip to the right"  position="right">
	<Button>Right</Button>
</Tooltip>

<Tooltip  content="Tooltip below"  position="bottom">
	<Button>Bottom</Button>
</Tooltip>

<Tooltip  content="Tooltip to the left"  position="left">
	<Button>Left</Button>
</Tooltip>

<Tooltip content="This is a deliberately long tooltip message that wraps across multiple lines while remaining within the viewport.">
 <Button>Very Long Tooltip</Button>

</Tooltip>

```

---

## Tabs

An accessible tabs component supporting horizontal and vertical orientations, keyboard navigation, disabled tabs, focus management, screen reader support, and responsive behaviour.

### Features

- Horizontal and vertical orientations
- Keyboard navigation
- Disabled tab support
- Focus management
- Screen reader support
- Accessible tab and tab panel relationships
- Responsive wrapping at increased browser zoom levels
- Support for long tab labels and panel content
- Home and End navigation
- Visible keyboard focus indicators

### Accessibility

The Tabs component uses the semantic `tablist`, `tab`, and `tabpanel` roles.

Each tab is associated with its corresponding panel using:

- `aria-selected` to identify the active tab
- `aria-controls` to identify the associated panel
- `aria-labelledby` to associate the panel with its tab
- `aria-orientation` to identify horizontal or vertical orientation

Disabled tabs remain visible but are excluded from keyboard navigation and cannot be activated.

Tab panels can receive keyboard focus so that screen reader users can access and read their content.

### Keyboard Support

#### Horizontal Tabs

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| Arrow Right | Move to the next enabled tab                |
| Arrow Left  | Move to the previous enabled tab            |
| Home        | Move to the first enabled tab               |
| End         | Move to the last enabled tab                |
| Tab         | Move from the active tab to the tab panel   |
| Shift + Tab | Return from the tab panel to the active tab |

#### Vertical Tabs

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| Arrow Down  | Move to the next enabled tab                |
| Arrow Up    | Move to the previous enabled tab            |
| Home        | Move to the first enabled tab               |
| End         | Move to the last enabled tab                |
| Tab         | Move from the active tab to the tab panel   |
| Shift + Tab | Return from the tab panel to the active tab |

### Disabled Tabs

Disabled tabs:

- Remain visible in the tab list
- Are announced as unavailable by assistive technologies
- Cannot be activated
- Are skipped during arrow-key navigation
- Do not become the active tab

### Responsive Behaviour

Tabs are designed to remain usable at increased browser zoom levels.

Horizontal tabs wrap when necessary rather than creating unnecessary horizontal page scrolling.

The component has been tested at:

- 100% browser zoom
- 200% browser zoom
- 400% browser zoom

Long tab labels and panel content wrap naturally while maintaining access to the full content.

Vertical tabs maintain the tab list beside the panel while remaining usable at increased zoom levels.

### Usage

The `Tabs` component accepts an array of tab objects. Each tab includes an `id`, `label`, and `content`. Tabs can optionally be disabled.

Horizontal tabs are the default orientation. To create vertical tabs, set the `orientation` prop to `vertical`.

```tsx
import { Tabs } from './components/Tab';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <p>Overview content.</p>,
  },
  {
    id: 'details',
    label: 'Details',
    content: <p>Details content.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <p>Settings content.</p>,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    disabled: true,
    content: <p>Advanced settings.</p>,
  },
];

<Tabs tabs={tabs} />;
```

#### Horizontal Tabs

```tsx
<Tabs tabs={horizontalTabs} />
```

#### Vertical Tabs

```tsx
<Tabs tabs={verticalTabs} orientation="vertical" />
```

---

## Accordion

An accessible accordion component supporting expandable and collapsible content sections, keyboard navigation, disabled sections, screen reader support, focus management, and responsive behaviour.

### Features

- Expandable and collapsible panels
- Multiple panels can be open at the same time
- Native button controls
- Keyboard navigation
- Disabled section support
- Focus management
- Screen reader support
- Accessible button and panel relationships
- Visible expand/collapse indicators
- Responsive behaviour at increased browser zoom levels
- Support for long section titles and panel content
- Home and End navigation
- Focus-visible keyboard interaction
- Configurable single-panel or multiple-panel behaviour

### Keyboard Support

| Key         | Action                                               |
| ----------- | ---------------------------------------------------- |
| Tab         | Move to the next focusable element                   |
| Shift + Tab | Move to the previous focusable element               |
| Enter       | Open or close the focused accordion panel            |
| Space       | Open or close the focused accordion panel            |
| Arrow Down  | Move focus to the next enabled accordion trigger     |
| Arrow Up    | Move focus to the previous enabled accordion trigger |
| Home        | Move focus to the first enabled accordion trigger    |
| End         | Move focus to the last enabled accordion trigger     |

Focus remains on the accordion trigger when a panel is opened or closed.

Arrow-key navigation skips disabled accordion sections.

Expanded panel content can be read by screen reader users using Browse Mode reading commands.

### Usage

The `Accordion` component accepts an array of accordion items. Each item includes an `id`, `title`, and `content`. Items can optionally be disabled.

By default, multiple panels can be open at the same time.

```tsx
import { Accordion } from './components/Accordion';

const items = [
  {
    id: 'overview',
    title: 'Overview',
    content: <p>Overview content.</p>,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    content: <p>Accessibility information.</p>,
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    disabled: true,
    content: <p>Advanced settings.</p>,
  },
];

<Accordion items={items} />;
```

---

## Breadcrumbs

An accessible breadcrumb navigation component that helps users understand their location within a website hierarchy. It uses semantic navigation, native links, current-page identification, responsive wrapping, and multiple visual styles.

### Features

- Semantic `<nav>` landmark
- Accessible navigation label
- Ordered list structure for breadcrumb hierarchy
- Native HTML links
- Current page identification with `aria-current="page"`
- Current page is not presented as a link
- Multiple separator styles
- Slash separator
- Chevron separator
- Greater-than separator
- Pill-style breadcrumbs
- Pill breadcrumbs with background
- Pill breadcrumbs with active page styling
- Arrow-shaped breadcrumbs
- Hover styling for interactive breadcrumb links
- Visible focus styling for keyboard interaction
- Decorative separators that are not announced as meaningful content
- Responsive wrapping on smaller screens
- Vertical spacing between wrapped breadcrumb rows
- Support for long breadcrumb labels and wrapped content
- Arrow-shaped breadcrumbs expand to accommodate wrapped content
- Active breadcrumb styling remains unchanged on hover

### Keyboard Support

| Key         | Action                               |
| ----------- | ------------------------------------ |
| Tab         | Move to the next breadcrumb link     |
| Shift + Tab | Move to the previous breadcrumb link |
| Enter       | Activate the focused breadcrumb link |
| Space       | Activate the focused breadcrumb link |

The current page is not focusable because it is represented as a non-interactive element rather than a link.

Breadcrumbs use native HTML links, so no custom keyboard event handling is required.

### Usage

The `Breadcrumbs` component accepts breadcrumb items as children. Each `BreadcrumbItem` can be given an `href` for navigable pages or marked as the current page using the `current` prop.

The `separator` prop controls the visual separator style. Available options are `slash`, `chevron`, `greater-than`, `pill`, and `arrow`.

```tsx
import { Breadcrumbs, BreadcrumbItem } from './components/Breadcrumbs';

<Breadcrumbs separator="chevron">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/accessibility">Accessibility</BreadcrumbItem>
  <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>;
```

The current page is identified using `aria-current="page"` and should not be provided with an `href`.

Visual separators are generated with CSS and are decorative, allowing screen reader users to navigate the breadcrumb links without unnecessary separator announcements.

---

## Pagination

A reusable pagination component for navigating between pages of content, with support for previous and next controls, page selection, current page indication, long page ranges, and visual variants.

### Features

- Previous and Next controls
- Page selection
- Current page indication using `aria-current="page"`
- Long page range support with ellipsis
- Accessible names for pagination controls
- Disabled Previous control on the first page
- Disabled Next control on the last page
- Keyboard accessibility
- Visible focus indicator
- Current page remains keyboard focusable
- Screen reader-friendly ellipsis indicators
- Basic, pill, and outline visual variants
- Responsive wrapping for long pagination ranges

### Keyboard Support

| Key         | Action                                  |
| ----------- | --------------------------------------- |
| Tab         | Move to the next pagination control     |
| Shift + Tab | Move to the previous pagination control |
| Enter       | Activate the focused pagination control |
| Space       | Activate the focused pagination control |

The current page remains keyboard focusable and displays a visible focus indicator when focused using the keyboard.

Disabled Previous and Next controls cannot receive keyboard focus.

Ellipsis indicators are hidden from screen readers because they are visual separators rather than interactive controls.

### Usage

The `Pagination` component accepts the current page, total number of pages, and a callback function that is called when the user selects a different page.

```tsx
import { useState } from 'react';
import { Pagination } from './components/Pagination';

function Example() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}
```

The component supports optional visual variants:

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  variant="pill"
/>
```

Available variants:

- `basic` — standard pagination with a highlighted current page
- `pill` — rounded pagination controls with a highlighted current page
- `outline` — connected outlined pagination controls with a highlighted current page

This version now matches your current `Pagination.tsx` API exactly:

```tsx
type PaginationVariant = 'basic' | 'pill' | 'outline';
```

It also correctly treats **Basic as the default**, so you don't need to specify `variant="basic"` unless you want to be explicit.

---

## Alert

A reusable alert component for communicating informational messages, success feedback, warnings, and errors, with support for optional titles, configurable heading levels, dismissible alerts, and customizable dismiss labels.

### Features

- Info, success, warning, and error variants
- Optional alert titles
- Configurable heading levels from `h2` through `h6`
- Dismissible alerts
- Customizable dismiss button accessible label
- Keyboard-accessible dismissal
- Visible focus indicator
- Type-safe dismissible and non-dismissible configurations
- Native button for dismissal
- Support for application-controlled ARIA live regions
- Screen reader-friendly structure
- Responsive layout

### Keyboard Support

| Key         | Action                                               |
| ----------- | ---------------------------------------------------- |
| Tab         | Move to the dismiss button                           |
| Shift + Tab | Move to the previous focusable element               |
| Enter       | Dismiss the alert when the dismiss button is focused |
| Space       | Dismiss the alert when the dismiss button is focused |

The dismiss button is only present when the alert is configured as dismissible.

The dismiss button uses a customizable accessible label, allowing applications to provide context-specific or localized labels.

### Heading Structure

Alerts with titles use a semantic heading element. The heading level can be configured from `h2` through `h6` to fit the surrounding page structure.

```tsx
<Alert variant="info" title="Information" headingLevel="h3">
  Your profile has been updated.
</Alert>
```

The default heading level is `h2`.

### Dismissible Alerts

A dismissible Alert requires an `onDismiss` callback:

```tsx
import { Alert } from './components/Alert';

function Example() {
  const handleDismiss = () => {
    console.log('Alert dismissed');
  };

  return (
    <Alert
      variant="warning"
      title="Warning"
      dismissible
      onDismiss={handleDismiss}
    >
      You have unsaved changes.
    </Alert>
  );
}
```

The dismiss button can have a custom accessible label:

```tsx
<Alert
  variant="warning"
  title="Warning"
  dismissible
  dismissLabel="Close notification"
  onDismiss={handleDismiss}
>
  You have unsaved changes.
</Alert>
```

### ARIA Live Regions

The `Alert` component does not automatically create an ARIA live region. Applications can place an Alert inside an appropriate live region when dynamically generated messages need to be announced to screen readers.

For polite status messages:

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {successMessage && <Alert variant="success">{successMessage}</Alert>}
</div>
```

For urgent error messages:

```tsx
<div role="alert" aria-atomic="true">
  {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
</div>
```

Keeping live-region behavior outside the `Alert` component allows the consuming application to determine when a message should be announced and which level of urgency is appropriate.

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
- Tab
- Accordion
- Breadcrumbs
- Pagination
- Alerts

The project is now focused on expanding the component library while continuing to apply the same accessibility-first development approach.

```

```
