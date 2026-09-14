# Breadcrumbs

An accessible breadcrumb navigation component that helps users understand their location within a website hierarchy. It uses semantic navigation, native links, current-page identification, responsive wrapping, and multiple visual styles.

## Features

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

## Keyboard Support

| Key         | Action                               |
| ----------- | ------------------------------------ |
| Tab         | Move to the next breadcrumb link     |
| Shift + Tab | Move to the previous breadcrumb link |
| Enter       | Activate the focused breadcrumb link |
| Space       | Activate the focused breadcrumb link |

The current page is not focusable because it is represented as a non-interactive element rather than a link.

Breadcrumbs use native HTML links, so no custom keyboard event handling is required.

## Usage

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
