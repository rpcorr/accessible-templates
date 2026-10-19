# Skip Link

## Overview

The Skip Link component provides keyboard-accessible links that allow users to bypass repetitive content and navigate directly to important sections of a page, such as the main content or footer.

Skip links are particularly useful for keyboard users and people who use screen readers. They reduce the need to navigate through repeated navigation menus and other content on every page.

The component supports a centered **Skip to main content** link and an optional **Skip to footer** link that can appear below the previously focused element.

## Features

- Keyboard-accessible skip links.
- Skip directly to the main content or another page section.
- Centered or left-aligned link positioning.
- Option to position a link below the previously focused element.
- Visible links when they receive keyboard focus.
- Screen-reader support through semantic anchor elements.
- Reduced-motion support that respects the user's system preferences.
- Configurable link labels and destinations.

## Installation

Import the component into your React application:

```tsx
import { SkipLink } from '../../../components/Navigations/SkipLink/SkipLink';
```

Adjust the import path to match your project's directory structure.

## Basic Usage

The component renders a default link to the main content when no custom links are provided.

```tsx
<SkipLink />
```

The destination must exist on the page:

```tsx
<main id="main-content" tabIndex={-1}>
  <h1>Main content</h1>
  <p>This is the main content of the page.</p>
</main>
```

The `tabIndex={-1}` attribute allows the main element to receive programmatic focus without adding it to the normal Tab sequence.

## Custom Skip Link

You can provide custom links to navigate to other sections of the page.

```tsx
<SkipLink
  links={[
    {
      label: 'Skip to main content',
      href: '#main-content',
      position: 'center',
    },
    {
      label: 'Skip to footer',
      href: '#page-footer',
      position: 'left',
    },
  ]}
/>
```

Ensure each link's `href` references an existing element ID.

```tsx
<main id="main-content" tabIndex={-1}>
  <h1>Main content</h1>
</main>

<footer id="page-footer" tabIndex={-1}>
  <h2>Footer</h2>
</footer>
```

## Positioning a Skip Link Below the Previously Focused Element

Set `positionBelowPrevious` to `true` to position a skip link below the element that previously had focus.

```tsx
<SkipLink
  links={[
    {
      label: 'Skip to footer',
      href: '#page-footer',
      position: 'left',
      positionBelowPrevious: true,
    },
  ]}
/>
```

This option is useful when you want the footer skip link to appear in relation to the user's current keyboard-navigation position.

## Props

### SkipLinksProps

| Prop        | Type             | Default                | Description                                         |
| ----------- | ---------------- | ---------------------- | --------------------------------------------------- |
| `links`     | `SkipLinkItem[]` | Main content skip link | Defines the skip links to render.                   |
| `className` | `string`         | `undefined`            | Adds a custom CSS class to the component container. |

### SkipLinkItem

| Property                | Type                 | Default     | Description                                                           |
| ----------------------- | -------------------- | ----------- | --------------------------------------------------------------------- |
| `label`                 | `string`             | Required    | The accessible text displayed for the link.                           |
| `href`                  | `string`             | Required    | The target element's ID, expressed as a fragment URL.                 |
| `position`              | `'center' \| 'left'` | `undefined` | Controls the link's visual entry position.                            |
| `positionBelowPrevious` | `boolean`            | `false`     | Positions the link below the previously focused element when enabled. |

## Accessibility

The Skip Link component is designed to support accessible keyboard navigation and screen-reader use.

### Keyboard Navigation

- Press **Tab** to reveal and focus a skip link.
- Press **Enter** to activate the link and navigate to its target.
- Continue navigating through the page using the keyboard.

### Screen Readers

Skip links use native HTML anchor elements, allowing assistive technologies to announce their labels and destinations.

Use clear, descriptive labels such as "Skip to main content" and "Skip to footer".

### Focus Management

Ensure each destination exists and can receive focus when necessary. For example, a main content or footer element can use `tabIndex={-1}` to support programmatic focus without adding another stop to the normal Tab sequence.

### Visual Focus

The focused link should be clearly visible and distinguishable from surrounding content. Focus indicators must have sufficient contrast and must not be obscured by other page elements.

### Motion Preferences

The component's entrance transitions should respect the user's reduced-motion preferences. Avoid unnecessary movement when the user has requested reduced motion.

## Best Practices

- Place the main content
