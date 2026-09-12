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

## 🧩 Components

The following components have been completed and are designed with accessibility as a first-class concern.

| Component          | Status   | Accessibility Features                                                                                                                                                                                                                                                                              |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button             | Complete | Semantic HTML, keyboard accessibility, focus-visible styling                                                                                                                                                                                                                                        |
| Modal Dialog       | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                                                                                                                                                                                    |
| Dropdown           | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                                                                                                                                                                                       |
| Navigation         | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management                                                                                                                                                                                                                   |
| Tooltip            | Complete | Keyboard focus support, aria-describedby, Escape dismissal, responsive positioning                                                                                                                                                                                                                  |
| Tabs               | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                                                                                                                                                                                          |
| Accordion          | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                                                                                                                                                                                       |
| Breadcrumbs        | Complete | Semantic navigation, aria-current, keyboard accessibility, responsive wrapping, decorative separators                                                                                                                                                                                               |
| Pagination         | Complete | Semantic navigation, aria-current, keyboard accessibility, focus-visible styling, disabled controls                                                                                                                                                                                                 |
| Alert              | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration                                                                                                                                                                 |
| Status             | Complete | Polite live region, dynamic updates, aria-atomic, screen reader support                                                                                                                                                                                                                             |
| Progress Indicator | Complete | ARIA progressbar semantics, determinate and indeterminate states, linear, circular, icon, and fill-container variants, reduced-motion support                                                                                                                                                       |
| Loading Spinner    | Complete | ARIA status semantics, accessible labels, decorative animation hidden from assistive technology, multiple animation variants, reduced-motion support                                                                                                                                                |
| Checkbox           | Complete | Native checkbox semantics, label association, keyboard accessibility, checked and indeterminate states, disabled and required states, description support, visible focus styling, screen reader support                                                                                             |
| Radio Group        | Complete | Native radio semantics, fieldset/legend grouping, keyboard accessibility, vertical and horizontal orientations, controlled and uncontrolled selection, disabled and required states, description support, visible focus styling, screen reader support                                              |
| Select             | Complete | Native select semantics, label association, keyboard accessibility, single and multiple selection, placeholder support, controlled and uncontrolled selection, disabled options, disabled state, required state, description support, error messaging, visible focus styling, screen reader support |
| Combobox           | Complete | Editable typeahead filtering, combobox and listbox semantics, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description support, no-results feedback, visible focus styling, screen reader support                                       |
| Switch             | Complete | Native checkbox semantics with switch role, keyboard accessibility, on/off states, controlled and uncontrolled values, disabled and required states, description support, visible focus styling, screen reader support                                                                              |
| Slider             | Complete | Native range input semantics, keyboard accessibility, horizontal and vertical orientations, custom ranges and step values, controlled and uncontrolled values, disabled state, description support, visible value output, colour variants, visible focus styling, screen reader support             |

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

## Status

A reusable status component for communicating non-urgent updates to users, including dynamic changes, form submissions, loading states, processing updates, and other informational feedback.

### Features

- Semantic `role="status"` live region
- Polite announcements using `aria-live="polite"`
- `aria-atomic="true"` so the complete status message is announced
- Supports static and dynamically updated messages
- Suitable for form submission feedback
- Suitable for loading and processing updates
- Suitable for copy-to-clipboard confirmations
- Supports multiple updates to the same status region
- Remains empty without displaying or announcing content when no message is available
- Does not move keyboard focus when the status changes
- Screen reader-friendly live-region behavior

### Accessibility

The `Status` component uses `role="status"` for non-urgent updates that should be communicated to assistive technology without interrupting the user's current task.

The live region uses `aria-live="polite"` and `aria-atomic="true"` so that updates are announced politely and the complete status message is available to the screen reader.

A status region should remain present in the DOM when it is being used for dynamic updates. Its content can initially be empty and populated when an update occurs.

Polite announcements are not guaranteed to be announced immediately or individually. Assistive technologies may defer, combine, or skip intermediate updates depending on the user's current activity. Applications should therefore avoid relying on every individual polite update being announced.

The `Status` component does not move focus when its content changes. Focus management should be handled by the surrounding interaction when necessary.

### Usage

The `Status` component accepts content as its children:

```tsx
import { Status } from './components/Status';

function Example() {
  return <Status>Changes saved successfully.</Status>;
}
```

---

## 📊 Progress Indicator

An accessible progress indicator for communicating the progress of ongoing operations. The component supports determinate and indeterminate progress, multiple visual presentations, accessible labels, optional visible progress values, colour variants, an optional wavy leading edge, and reduced-motion support.

### Features

- Determinate and indeterminate progress
- Linear progress bar
- Circular progress indicator
- Icon-based progress indicator
- Fill-container progress indicator
- Optional wavy leading edge for linear and fill progress
- Colour variants
- Custom maximum values
- Optional visible percentage values
- Accessible `role="progressbar"` semantics
- `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for determinate progress
- Accessible labels using the `label` prop
- Decorative icons excluded from the accessibility tree
- Dynamic progress updates
- `prefers-reduced-motion` support
- Screen reader support with NVDA

### Usage

```
import { ProgressIndicator } from './components/ProgressIndicator';

<ProgressIndicator value={50} label="Uploading files" showValue />;
```

---

## 🔄 Loading Spinner

An accessible loading indicator for communicating that an operation is currently in progress when the amount of progress cannot be determined. The component supports multiple animation variants, different visual sizes, colour variants, accessible labels, optional visible loading messages, and reduced-motion support.

### Features

\- Spinner animation

\- Dots animation

\- Pulse animation

\- Bars animation

\- Orbit animation

\- Comet animation

\- Small, medium, and large sizes

\- Colour variants

\- Accessible `role="status"` semantics

\- Accessible labels using the `label` prop

\- Optional visible loading messages using the `showLabel` prop

\- Decorative animations excluded from the accessibility tree

\- Non-interactive and does not receive keyboard focus

\- `prefers-reduced-motion` support

\- Screen reader support with NVDA

### Usage

```
import { LoadingSpinner } from './components/LoadingSpinner';

<LoadingSpinner label="Loading content" />;
```

---

## ☑️ Checkbox

An accessible checkbox component for allowing users to select one or more options from a set of choices. The component uses a native HTML checkbox while providing consistent styling, accessible labels and descriptions, checked and indeterminate states, and disabled and required states.

### Features

- Native `<input type="checkbox">` semantics
- Checked and unchecked states
- Indeterminate state
- Disabled state
- Required state
- Accessible label association
- Optional description text
- Controlled and uncontrolled usage
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support
- Accessible state announcements

### Usage

```tsx
import { Checkbox } from './components/FormControls/Checkbox';

<Checkbox label="I agree to the terms and conditions" />;
```

---

## 📻 Radio Group

An accessible radio group component for allowing users to select one option from a set of mutually exclusive choices. The component uses native HTML radio buttons grouped with a `fieldset` and `legend`, while providing consistent styling, accessible descriptions, vertical and horizontal layouts, and support for controlled and uncontrolled selection.

### Features

- Native `<input type="radio">` semantics
- `fieldset` and `legend` grouping
- One-option selection within a group
- Vertical and horizontal orientations
- Controlled and uncontrolled usage
- Default selection
- Disabled options
- Disabled groups
- Required groups
- Optional description text
- Accessible label association
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

### Accessibility

The Radio Group uses native radio inputs with a shared `name` attribute, providing built-in keyboard interaction and screen reader support.

The radio buttons are grouped using a `fieldset` and `legend`, providing an accessible name for the group.

Users can press `Tab` to move focus into the radio group. The arrow keys move between radio options and select the focused option. `Space` can also be used to select the focused radio button.

Disabled options cannot be selected, and a disabled group prevents all of its radio buttons from being interacted with.

Optional descriptions are associated with the radio group using `aria-describedby`.

### Usage

```tsx
import { RadioGroup } from './components/FormControls/RadioGroup';

<RadioGroup
  label="Choose a size"
  name="size"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>;
```

### Orientation

Radio groups are displayed vertically by default. Set the `orientation` prop to `horizontal` to display the options in a row.

```tsx
<RadioGroup
  label="Choose a size"
  name="size"
  orientation="horizontal"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>
```

Horizontal options wrap when necessary to remain usable at smaller screen sizes.

### Controlled Usage

The `value` and `onChange` props can be used to control the selected option.

```tsx
const [selected, setSelected] = useState('medium');

<RadioGroup
  label="Choose a size"
  name="size"
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>;
```

---

## 🔽 Select

An accessible select component for allowing users to choose one option from a list of choices. The component uses a native HTML `<select>` element while providing consistent styling, accessible labels and descriptions, placeholder support, selection states, disabled and required states, and error messaging.

### Features

- Native `<select>` semantics
- Single and multiple selection
- Accessible label association
- Placeholder option support
- Default selection
- Controlled and uncontrolled usage
- Disabled options
- Disabled select
- Required state
- Optional description text
- Error message support
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

### Accessibility

The Select component uses a native HTML `<select>` element, providing built-in keyboard interaction, selection behaviour, and screen reader support.

The select is associated with its visible label using a `<label>` element. Optional descriptions and error messages are associated with the select using `aria-describedby`.

The component supports required and disabled states using native HTML attributes. Individual options can also be disabled.

The select provides a visible focus indicator for keyboard users and supports screen readers such as NVDA.

Keyboard interaction is provided by the browser's native select behaviour, including moving between options and selecting an option.

### Usage

```tsx
import { Select } from './components/FormControls/Select';

<Select
  label="Choose a country"
  name="country"
  options={[
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>;
```

### Placeholder

A placeholder can be provided for selects where the user must make a selection.

```tsx
<Select
  label="Choose a department"
  name="department"
  placeholder="Select a department"
  required
  options={[
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'development', label: 'Development' },
  ]}
/>
```

The placeholder is disabled and uses an empty value so it cannot be selected as a valid choice.

### Controlled Usage

The `value` and `onChange` props can be used to control the selected option.

```tsx
const [selectedCountry, setSelectedCountry] = useState('canada');

<Select
  label="Choose a country"
  name="country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>;
```

### Multiple Selection

Set the `multiple` prop to `true` to allow users to select more than one option. Multiple selection uses an array of strings for `value`, `defaultValue`, and the `onChange` callback.

```
import { useState } from 'react';
import { Select } from './components/FormControls/Select';

const [selectedSkills, setSelectedSkills] = useState<string[]>([
  'html',
  'css',
]);

<Select
  label="Choose your skills"
  name="skills"
  multiple
  value={selectedSkills}
  onChange={setSelectedSkills}
  options={[
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
  ]}
/>
```

---

## Combobox

The Combobox is an editable form control that allows users to type into an input and filter a list of available options. Users can select an option using the keyboard or mouse.

### Features

- Editable typeahead filtering
- Combobox and listbox ARIA semantics
- Keyboard navigation
- Mouse selection
- Disabled options
- Controlled and uncontrolled values
- Required and disabled states
- Optional description
- No-results feedback
- Visible focus styling
- Screen reader support

### Accessibility

The Combobox uses an input with the `combobox` role and a popup `listbox` containing the available options. ARIA relationships connect the input to the listbox and identify the currently active option for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

When filtering produces no matching options, a polite live region announces **"No options found."** after a short delay. The delayed announcement prevents unnecessary announcements while the user is actively typing.

### Keyboard Support

| Key          | Action                                                      |
| ------------ | ----------------------------------------------------------- |
| `Arrow Down` | Moves to the next available option                          |
| `Arrow Up`   | Moves to the previous available option                      |
| `Enter`      | Selects the active option                                   |
| `Escape`     | Closes the options list                                     |
| `Tab`        | Closes the options list and moves focus out of the Combobox |

Users can type at any time to filter the available options. Disabled options cannot be selected or reached using the arrow-key navigation.

### Usage

```tsx
import { Combobox } from './components/FormControls/Combobox';

const countryOptions = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Ireland', label: 'Ireland' },
];

<Combobox
  label="Choose a country"
  name="country"
  placeholder="Start typing..."
  options={countryOptions}
/>;
```

---

## Switch

The Switch is a form control that allows users to toggle a setting between on and off states. Users can toggle the switch using the keyboard or mouse. The Switch also supports colour variants for different visual styles.

### Features

- Native checkbox semantics with `switch` role
- Keyboard accessibility
- On/off states
- Controlled and uncontrolled values
- Disabled and required states
- Optional description
- Colour variants
- Visible focus styling
- Screen reader support

### Accessibility

The Switch uses a native `<input type="checkbox">` with the `switch` role, providing appropriate semantics for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The visual switch track and thumb are decorative and hidden from assistive technologies using `aria-hidden="true"`.

Colour is used only as a visual indication and does not communicate the switch state by itself. The switch state is communicated through its native semantics and `switch` role.

### States

The Switch supports checked and unchecked states, default values, controlled values, disabled and required states, optional descriptions, and colour variants.

Available colour variants are `default`, `success`, `warning`, `error`, and `info`.

### Keyboard Support

| Key     | Action                                |
| ------- | ------------------------------------- |
| `Space` | Toggles the Switch between on and off |
| `Tab`   | Moves focus to and from the Switch    |

### Usage

```tsx
import { Switch } from './components/FormControls/Switch';

<Switch label="Enable notifications" />;
```

---

## Slider

The Slider is an accessible single-value form control that allows users to select a numeric value from a defined range. It uses the native HTML range input and supports horizontal and vertical orientations.

### Features

- Native `<input type="range">` semantics
- Keyboard accessibility
- Horizontal and vertical orientations
- Custom minimum and maximum values
- Custom step increments
- Controlled and uncontrolled values
- Disabled state
- Optional description
- Optional visible value
- Colour variants
- Visible focus styling
- Screen reader support

### Accessibility

The Slider uses a native `<input type="range">`, which provides the appropriate slider semantics and accessibility information to assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The current value can optionally be displayed alongside the label using the native `<output>` element.

The Slider relies on the native range input for keyboard interaction and does not add custom keyboard handling.

### Values

The Slider supports custom minimum and maximum values, step increments, default values, and controlled values.

By default:

- Minimum: `0`
- Maximum: `100`
- Step: `1`
- Default value: `50`

### Colour Variants

The Slider supports colour variants for different visual styles.

Available colour variants are:

- `default`
- `success`
- `warning`
- `error`
- `info`

Colour is used only as a visual styling option and does not communicate the Slider's value or state by itself. The value and slider semantics remain available through the native range input.

### Orientation

The Slider supports horizontal and vertical orientations.

The default orientation is `horizontal`.

To create a vertical Slider, set the `orientation` prop to `vertical`.

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} />
```

### Keyboard Support

The native range input provides keyboard support.

| Key           | Action                                   |
| ------------- | ---------------------------------------- |
| `Arrow Left`  | Decrease the value                       |
| `Arrow Down`  | Decrease the value                       |
| `Arrow Right` | Increase the value                       |
| `Arrow Up`    | Increase the value                       |
| `Home`        | Move to the minimum value                |
| `End`         | Move to the maximum value                |
| `Page Up`     | Increase the value by a larger increment |
| `Page Down`   | Decrease the value by a larger increment |
| `Tab`         | Move focus to or from the Slider         |

### Usage

```tsx
import { Slider } from './components/FormControls/Slider';

<Slider label="Volume" />;
```

### Custom Range

```tsx
<Slider label="Temperature" min={10} max={30} defaultValue={20} />
```

### Step Values

```tsx
<Slider label="Rating" min={0} max={10} step={1} defaultValue={5} />
```

### Controlled Usage

```tsx
const [volume, setVolume] = useState(50);

<Slider label="Volume" value={volume} onChange={setVolume} />;
```

### Colour Variants

```tsx
<Slider
  label="Default"
  colour="default"
  defaultValue={50}
/>

<Slider
  label="Success"
  colour="success"
  defaultValue={60}
/>

<Slider
  label="Warning"
  colour="warning"
  defaultValue={40}
/>

<Slider
  label="Error"
  colour="error"
  defaultValue={70}
/>

<Slider
  label="Info"
  colour="info"
  defaultValue={30}
/>
```

### Vertical Slider

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} colour="info" />
```

### Description

```tsx
<Slider
  label="Notification volume"
  description="Adjust the volume used for notification sounds."
  defaultValue={60}
/>
```

### Disabled

```tsx
<Slider label="Disabled slider" defaultValue={50} disabled />
```

### Hide Visible Value

```tsx
<Slider label="Brightness" defaultValue={75} showValue={false} />
```

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
- Status
- Progress Indicator
- Loading Spinner
- Checkbox
- Radio Group
- Select
- Switch
- Slider

The project is now focused on expanding the component library while continuing to apply the same accessibility-first development approach.

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

## 🧩 Components

The following components have been completed and are designed with accessibility as a first-class concern.

| Component          | Status   | Accessibility Features                                                                                                                                                                                                                                                                              |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button             | Complete | Semantic HTML, keyboard accessibility, focus-visible styling                                                                                                                                                                                                                                        |
| Modal Dialog       | Complete | Focus management, focus trap, Escape handling, focus restoration                                                                                                                                                                                                                                    |
| Dropdown           | Complete | Keyboard navigation, nested submenus, typeahead, disabled items, separators, focus management                                                                                                                                                                                                       |
| Navigation         | Complete | Keyboard navigation, nested submenus, mobile drawer, focus trap, focus management                                                                                                                                                                                                                   |
| Tooltip            | Complete | Keyboard focus support, aria-describedby, Escape dismissal, responsive positioning                                                                                                                                                                                                                  |
| Tabs               | Complete | Keyboard navigation, horizontal and vertical orientations, disabled tabs, focus management                                                                                                                                                                                                          |
| Accordion          | Complete | Keyboard navigation, expand/collapse, disabled items, focus management, screen reader support                                                                                                                                                                                                       |
| Breadcrumbs        | Complete | Semantic navigation, aria-current, keyboard accessibility, responsive wrapping, decorative separators                                                                                                                                                                                               |
| Pagination         | Complete | Semantic navigation, aria-current, keyboard accessibility, focus-visible styling, disabled controls                                                                                                                                                                                                 |
| Alert              | Complete | Semantic HTML, keyboard-accessible dismissal, customizable dismiss label, configurable heading levels, ARIA live-region integration                                                                                                                                                                 |
| Status             | Complete | Polite live region, dynamic updates, aria-atomic, screen reader support                                                                                                                                                                                                                             |
| Progress Indicator | Complete | ARIA progressbar semantics, determinate and indeterminate states, linear, circular, icon, and fill-container variants, reduced-motion support                                                                                                                                                       |
| Loading Spinner    | Complete | ARIA status semantics, accessible labels, decorative animation hidden from assistive technology, multiple animation variants, reduced-motion support                                                                                                                                                |
| Checkbox           | Complete | Native checkbox semantics, label association, keyboard accessibility, checked and indeterminate states, disabled and required states, description support, visible focus styling, screen reader support                                                                                             |
| Radio Group        | Complete | Native radio semantics, fieldset/legend grouping, keyboard accessibility, vertical and horizontal orientations, controlled and uncontrolled selection, disabled and required states, description support, visible focus styling, screen reader support                                              |
| Select             | Complete | Native select semantics, label association, keyboard accessibility, single and multiple selection, placeholder support, controlled and uncontrolled selection, disabled options, disabled state, required state, description support, error messaging, visible focus styling, screen reader support |
| Combobox           | Complete | Editable typeahead filtering, combobox and listbox semantics, keyboard navigation, disabled options, controlled and uncontrolled values, required and disabled states, description support, no-results feedback, visible focus styling, screen reader support                                       |
| Switch             | Complete | Native checkbox semantics with switch role, keyboard accessibility, on/off states, controlled and uncontrolled values, disabled and required states, description support, visible focus styling, screen reader support                                                                              |

Slider | Complete | Native range input semantics, keyboard accessibility, horizontal and vertical orientations, custom ranges and step values, controlled and uncontrolled values, disabled state, description support, visible value output, colour variants, visible focus styling, screen reader support |

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

## Status

A reusable status component for communicating non-urgent updates to users, including dynamic changes, form submissions, loading states, processing updates, and other informational feedback.

### Features

- Semantic `role="status"` live region
- Polite announcements using `aria-live="polite"`
- `aria-atomic="true"` so the complete status message is announced
- Supports static and dynamically updated messages
- Suitable for form submission feedback
- Suitable for loading and processing updates
- Suitable for copy-to-clipboard confirmations
- Supports multiple updates to the same status region
- Remains empty without displaying or announcing content when no message is available
- Does not move keyboard focus when the status changes
- Screen reader-friendly live-region behavior

### Accessibility

The `Status` component uses `role="status"` for non-urgent updates that should be communicated to assistive technology without interrupting the user's current task.

The live region uses `aria-live="polite"` and `aria-atomic="true"` so that updates are announced politely and the complete status message is available to the screen reader.

A status region should remain present in the DOM when it is being used for dynamic updates. Its content can initially be empty and populated when an update occurs.

Polite announcements are not guaranteed to be announced immediately or individually. Assistive technologies may defer, combine, or skip intermediate updates depending on the user's current activity. Applications should therefore avoid relying on every individual polite update being announced.

The `Status` component does not move focus when its content changes. Focus management should be handled by the surrounding interaction when necessary.

### Usage

The `Status` component accepts content as its children:

```tsx
import { Status } from './components/Status';

function Example() {
  return <Status>Changes saved successfully.</Status>;
}
```

---

## 📊 Progress Indicator

An accessible progress indicator for communicating the progress of ongoing operations. The component supports determinate and indeterminate progress, multiple visual presentations, accessible labels, optional visible progress values, colour variants, an optional wavy leading edge, and reduced-motion support.

### Features

- Determinate and indeterminate progress
- Linear progress bar
- Circular progress indicator
- Icon-based progress indicator
- Fill-container progress indicator
- Optional wavy leading edge for linear and fill progress
- Colour variants
- Custom maximum values
- Optional visible percentage values
- Accessible `role="progressbar"` semantics
- `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for determinate progress
- Accessible labels using the `label` prop
- Decorative icons excluded from the accessibility tree
- Dynamic progress updates
- `prefers-reduced-motion` support
- Screen reader support with NVDA

### Usage

```
import { ProgressIndicator } from './components/ProgressIndicator';

<ProgressIndicator value={50} label="Uploading files" showValue />;
```

---

## 🔄 Loading Spinner

An accessible loading indicator for communicating that an operation is currently in progress when the amount of progress cannot be determined. The component supports multiple animation variants, different visual sizes, colour variants, accessible labels, optional visible loading messages, and reduced-motion support.

### Features

\- Spinner animation

\- Dots animation

\- Pulse animation

\- Bars animation

\- Orbit animation

\- Comet animation

\- Small, medium, and large sizes

\- Colour variants

\- Accessible `role="status"` semantics

\- Accessible labels using the `label` prop

\- Optional visible loading messages using the `showLabel` prop

\- Decorative animations excluded from the accessibility tree

\- Non-interactive and does not receive keyboard focus

\- `prefers-reduced-motion` support

\- Screen reader support with NVDA

### Usage

```
import { LoadingSpinner } from './components/LoadingSpinner';

<LoadingSpinner label="Loading content" />;
```

---

## ☑️ Checkbox

An accessible checkbox component for allowing users to select one or more options from a set of choices. The component uses a native HTML checkbox while providing consistent styling, accessible labels and descriptions, checked and indeterminate states, and disabled and required states.

### Features

- Native `<input type="checkbox">` semantics
- Checked and unchecked states
- Indeterminate state
- Disabled state
- Required state
- Accessible label association
- Optional description text
- Controlled and uncontrolled usage
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support
- Accessible state announcements

### Usage

```tsx
import { Checkbox } from './components/FormControls/Checkbox';

<Checkbox label="I agree to the terms and conditions" />;
```

---

## 📻 Radio Group

An accessible radio group component for allowing users to select one option from a set of mutually exclusive choices. The component uses native HTML radio buttons grouped with a `fieldset` and `legend`, while providing consistent styling, accessible descriptions, vertical and horizontal layouts, and support for controlled and uncontrolled selection.

### Features

- Native `<input type="radio">` semantics
- `fieldset` and `legend` grouping
- One-option selection within a group
- Vertical and horizontal orientations
- Controlled and uncontrolled usage
- Default selection
- Disabled options
- Disabled groups
- Required groups
- Optional description text
- Accessible label association
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

### Accessibility

The Radio Group uses native radio inputs with a shared `name` attribute, providing built-in keyboard interaction and screen reader support.

The radio buttons are grouped using a `fieldset` and `legend`, providing an accessible name for the group.

Users can press `Tab` to move focus into the radio group. The arrow keys move between radio options and select the focused option. `Space` can also be used to select the focused radio button.

Disabled options cannot be selected, and a disabled group prevents all of its radio buttons from being interacted with.

Optional descriptions are associated with the radio group using `aria-describedby`.

### Usage

```tsx
import { RadioGroup } from './components/FormControls/RadioGroup';

<RadioGroup
  label="Choose a size"
  name="size"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>;
```

### Orientation

Radio groups are displayed vertically by default. Set the `orientation` prop to `horizontal` to display the options in a row.

```tsx
<RadioGroup
  label="Choose a size"
  name="size"
  orientation="horizontal"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>
```

Horizontal options wrap when necessary to remain usable at smaller screen sizes.

### Controlled Usage

The `value` and `onChange` props can be used to control the selected option.

```tsx
const [selected, setSelected] = useState('medium');

<RadioGroup
  label="Choose a size"
  name="size"
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>;
```

---

## 🔽 Select

An accessible select component for allowing users to choose one option from a list of choices. The component uses a native HTML `<select>` element while providing consistent styling, accessible labels and descriptions, placeholder support, selection states, disabled and required states, and error messaging.

### Features

- Native `<select>` semantics
- Single and multiple selection
- Accessible label association
- Placeholder option support
- Default selection
- Controlled and uncontrolled usage
- Disabled options
- Disabled select
- Required state
- Optional description text
- Error message support
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

### Accessibility

The Select component uses a native HTML `<select>` element, providing built-in keyboard interaction, selection behaviour, and screen reader support.

The select is associated with its visible label using a `<label>` element. Optional descriptions and error messages are associated with the select using `aria-describedby`.

The component supports required and disabled states using native HTML attributes. Individual options can also be disabled.

The select provides a visible focus indicator for keyboard users and supports screen readers such as NVDA.

Keyboard interaction is provided by the browser's native select behaviour, including moving between options and selecting an option.

### Usage

```tsx
import { Select } from './components/FormControls/Select';

<Select
  label="Choose a country"
  name="country"
  options={[
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>;
```

### Placeholder

A placeholder can be provided for selects where the user must make a selection.

```tsx
<Select
  label="Choose a department"
  name="department"
  placeholder="Select a department"
  required
  options={[
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'development', label: 'Development' },
  ]}
/>
```

The placeholder is disabled and uses an empty value so it cannot be selected as a valid choice.

### Controlled Usage

The `value` and `onChange` props can be used to control the selected option.

```tsx
const [selectedCountry, setSelectedCountry] = useState('canada');

<Select
  label="Choose a country"
  name="country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>;
```

### Multiple Selection

Set the `multiple` prop to `true` to allow users to select more than one option. Multiple selection uses an array of strings for `value`, `defaultValue`, and the `onChange` callback.

```
import { useState } from 'react';
import { Select } from './components/FormControls/Select';

const [selectedSkills, setSelectedSkills] = useState<string[]>([
  'html',
  'css',
]);

<Select
  label="Choose your skills"
  name="skills"
  multiple
  value={selectedSkills}
  onChange={setSelectedSkills}
  options={[
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
  ]}
/>
```

---

## Combobox

The Combobox is an editable form control that allows users to type into an input and filter a list of available options. Users can select an option using the keyboard or mouse.

### Features

- Editable typeahead filtering
- Combobox and listbox ARIA semantics
- Keyboard navigation
- Mouse selection
- Disabled options
- Controlled and uncontrolled values
- Required and disabled states
- Optional description
- No-results feedback
- Visible focus styling
- Screen reader support

### Accessibility

The Combobox uses an input with the `combobox` role and a popup `listbox` containing the available options. ARIA relationships connect the input to the listbox and identify the currently active option for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

When filtering produces no matching options, a polite live region announces **"No options found."** after a short delay. The delayed announcement prevents unnecessary announcements while the user is actively typing.

### Keyboard Support

| Key          | Action                                                      |
| ------------ | ----------------------------------------------------------- |
| `Arrow Down` | Moves to the next available option                          |
| `Arrow Up`   | Moves to the previous available option                      |
| `Enter`      | Selects the active option                                   |
| `Escape`     | Closes the options list                                     |
| `Tab`        | Closes the options list and moves focus out of the Combobox |

Users can type at any time to filter the available options. Disabled options cannot be selected or reached using the arrow-key navigation.

### Usage

```tsx
import { Combobox } from './components/FormControls/Combobox';

const countryOptions = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Ireland', label: 'Ireland' },
];

<Combobox
  label="Choose a country"
  name="country"
  placeholder="Start typing..."
  options={countryOptions}
/>;
```

---

## Switch

The Switch is a form control that allows users to toggle a setting between on and off states. Users can toggle the switch using the keyboard or mouse. The Switch also supports colour variants for different visual styles.

### Features

- Native checkbox semantics with `switch` role
- Keyboard accessibility
- On/off states
- Controlled and uncontrolled values
- Disabled and required states
- Optional description
- Colour variants
- Visible focus styling
- Screen reader support

### Accessibility

The Switch uses a native `<input type="checkbox">` with the `switch` role, providing appropriate semantics for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The visual switch track and thumb are decorative and hidden from assistive technologies using `aria-hidden="true"`.

Colour is used only as a visual indication and does not communicate the switch state by itself. The switch state is communicated through its native semantics and `switch` role.

### States

The Switch supports checked and unchecked states, default values, controlled values, disabled and required states, optional descriptions, and colour variants.

Available colour variants are `default`, `success`, `warning`, `error`, and `info`.

### Keyboard Support

| Key     | Action                                |
| ------- | ------------------------------------- |
| `Space` | Toggles the Switch between on and off |
| `Tab`   | Moves focus to and from the Switch    |

### Usage

```tsx
import { Switch } from './components/FormControls/Switch';

<Switch label="Enable notifications" />;
```

---

## Slider

The Slider is an accessible single-value form control that allows users to select a numeric value from a defined range. It uses the native HTML range input and supports horizontal and vertical orientations.

### Features

- Native `<input type="range">` semantics
- Keyboard accessibility
- Horizontal and vertical orientations
- Custom minimum and maximum values
- Custom step increments
- Controlled and uncontrolled values
- Disabled state
- Optional description
- Optional visible value
- Colour variants
- Visible focus styling
- Screen reader support

### Accessibility

The Slider uses a native `<input type="range">`, which provides the appropriate slider semantics and accessibility information to assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The current value can optionally be displayed alongside the label using the native `<output>` element.

The Slider relies on the native range input for keyboard interaction and does not add custom keyboard handling.

### Values

The Slider supports custom minimum and maximum values, step increments, default values, and controlled values.

By default:

- Minimum: `0`
- Maximum: `100`
- Step: `1`
- Default value: `50`

### Colour Variants

The Slider supports colour variants for different visual styles.

Available colour variants are:

- `default`
- `success`
- `warning`
- `error`
- `info`

Colour is used only as a visual styling option and does not communicate the Slider's value or state by itself. The value and slider semantics remain available through the native range input.

### Orientation

The Slider supports horizontal and vertical orientations.

The default orientation is `horizontal`.

To create a vertical Slider, set the `orientation` prop to `vertical`.

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} />
```

### Keyboard Support

The native range input provides keyboard support.

| Key           | Action                                   |
| ------------- | ---------------------------------------- |
| `Arrow Left`  | Decrease the value                       |
| `Arrow Down`  | Decrease the value                       |
| `Arrow Right` | Increase the value                       |
| `Arrow Up`    | Increase the value                       |
| `Home`        | Move to the minimum value                |
| `End`         | Move to the maximum value                |
| `Page Up`     | Increase the value by a larger increment |
| `Page Down`   | Decrease the value by a larger increment |
| `Tab`         | Move focus to or from the Slider         |

### Usage

```tsx
import { Slider } from './components/FormControls/Slider';

<Slider label="Volume" />;
```

### Custom Range

```tsx
<Slider label="Temperature" min={10} max={30} defaultValue={20} />
```

### Step Values

```tsx
<Slider label="Rating" min={0} max={10} step={1} defaultValue={5} />
```

### Controlled Usage

```tsx
const [volume, setVolume] = useState(50);

<Slider label="Volume" value={volume} onChange={setVolume} />;
```

### Colour Variants

```tsx
<Slider
  label="Default"
  colour="default"
  defaultValue={50}
/>

<Slider
  label="Success"
  colour="success"
  defaultValue={60}
/>

<Slider
  label="Warning"
  colour="warning"
  defaultValue={40}
/>

<Slider
  label="Error"
  colour="error"
  defaultValue={70}
/>

<Slider
  label="Info"
  colour="info"
  defaultValue={30}
/>
```

### Vertical Slider

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} colour="info" />
```

### Description

```tsx
<Slider
  label="Notification volume"
  description="Adjust the volume used for notification sounds."
  defaultValue={60}
/>
```

### Disabled

```tsx
<Slider label="Disabled slider" defaultValue={50} disabled />
```

### Hide Visible Value

```tsx
<Slider label="Brightness" defaultValue={75} showValue={false} />
```

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
- Status
- Progress Indicator
- Loading Spinner
- Checkbox
- Radio Group
- Select
- Switch
- Slider

The project is now focused on expanding the component library while continuing to apply the same accessibility-first development approach.
