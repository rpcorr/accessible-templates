# Multi-Item Carousel

The `MultiItemCarousel` component is a reusable, accessible React component for displaying content, images, and cards in a horizontally navigable carousel. It supports responsive layouts, item-by-item or page-by-page navigation, position indicators, optional looping, and a CoverFlow presentation.

The component is designed with accessibility as a core requirement, supporting keyboard interaction, screen readers, visible focus indicators, and reduced-motion preferences.

## Features

- Semantic carousel region with an accessible name.
- Slide groups with position information and optional descriptive labels.
- Responsive layouts for mobile, tablet, and desktop.
- Item-by-item or page-by-page navigation.
- Previous and Next navigation buttons.
- Optional position indicators for navigating directly to a slide.
- Optional looping from the final position to the beginning and vice versa.
- CoverFlow presentation with a larger, centered active slide and smaller, angled neighbouring slides.
- Controlled and uncontrolled navigation.
- Live announcements when the active slide changes.
- Inactive slides hidden from assistive technology and removed from keyboard interaction.
- Reduced-motion support through the `prefers-reduced-motion` media query.
- No automatic rotation, so users control when content changes.
- Navigation controls omitted when all items fit in the visible area.

## Installation

Import the component and its item type:

```tsx
import {
  MultiItemCarousel,
  type MultiItemCarouselItem,
} from '../../components/Navigations/MultiItemCarousel';
```

Adjust the import path to match the location of the file using the component.

## Basic Usage

```tsx
import {
  MultiItemCarousel,
  type MultiItemCarouselItem,
} from '../../components/Navigations/MultiItemCarousel';

const items: MultiItemCarouselItem[] = [
  {
    id: 'accessibility',
    label: 'Web accessibility',
    content: (
      <article>
        <h3>Web accessibility</h3>
        <p>Build inclusive digital experiences that work for everyone.</p>
      </article>
    ),
  },
  {
    id: 'development',
    label: 'Front-end development',
    content: (
      <article>
        <h3>Front-end development</h3>
        <p>
          Create responsive, maintainable websites with modern technologies.
        </p>
      </article>
    ),
  },
  {
    id: 'testing',
    label: 'Accessibility testing',
    content: (
      <article>
        <h3>Accessibility testing</h3>
        <p>Test keyboard navigation and screen reader support.</p>
      </article>
    ),
  },
];

export function ResourceCarousel() {
  return <MultiItemCarousel items={items} label="Featured resources" />;
}
```

Each item requires a unique `id` and a `content` value. The optional `label` identifies the slide in position and announcement text.

## Examples

### Responsive Multi-Item Layout

Display multiple items at once and configure the number of visible items for different viewport sizes.

```tsx
<MultiItemCarousel
  items={items}
  label="Featured resources"
  itemsPerView={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }}
/>
```

The carousel adapts its visible item count to the configured responsive breakpoints.

### Item-by-Item Navigation

Move through the collection one item at a time.

```tsx
<MultiItemCarousel
  items={items}
  label="Featured resources"
  itemsPerView={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }}
  scrollMode="item"
/>
```

### Page-by-Page Navigation

Move by a page of visible items at a time.

```tsx
<MultiItemCarousel
  items={items}
  label="Featured resources"
  itemsPerView={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }}
  scrollMode="page"
/>
```

### CoverFlow Presentation

The CoverFlow variant displays the active slide in the centre, with smaller, angled neighbouring slides.

```tsx
<MultiItemCarousel
  items={items}
  label="Featured resources"
  variant="coverflow"
  loop
  showSideArrows
  showControls={false}
/>
```

CoverFlow forces a single active slide. The optional side arrows provide additional visual navigation controls, while the component's configured controls and indicators determine the available navigation options.

### Looping Navigation

Enable looping to allow users to move from the final position back to the beginning and from the beginning to the final position.

```tsx
<MultiItemCarousel items={items} label="Featured resources" loop />
```

When looping is disabled, Previous and Next become unavailable at their respective boundaries.

### Controlled Navigation

Use `activeIndex` and `onIndexChange` when the parent component needs to manage the carousel's active position.

```tsx
import { useState } from 'react';

function ControlledCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <MultiItemCarousel
      items={items}
      label="Featured resources"
      itemsPerView={{
        mobile: 1,
        tablet: 1,
        desktop: 1,
      }}
      activeIndex={activeIndex}
      onIndexChange={setActiveIndex}
    />
  );
}
```

Use controlled navigation when the active position must be coordinated with other application state. Otherwise, the component manages its own position.

### Custom Slide Announcements

Provide optional announcement text for additional context when a slide becomes active.

```tsx
const announcementItems: MultiItemCarouselItem[] = [
  {
    id: 'accessibility',
    label: 'Web accessibility',
    announcement:
      'Build inclusive digital experiences with semantic HTML and keyboard support.',
    content: <p>Learn about accessible design and development.</p>,
  },
];
```

The component combines the slide position, optional label, and optional announcement text in its live status region.

## Component API

### `MultiItemCarouselItem`

| Property       | Type              | Required | Description                                                     |
| -------------- | ----------------- | -------- | --------------------------------------------------------------- |
| `id`           | `string`          | Yes      | Unique identifier for the item.                                 |
| `label`        | `string`          | No       | Descriptive slide label used in position and announcement text. |
| `announcement` | `string`          | No       | Additional text announced when the item becomes active.         |
| `content`      | `React.ReactNode` | Yes      | Content rendered inside the slide.                              |

### `MultiItemCarousel` Props

| Property         | Type                                                  | Default           | Description                                                     |
| ---------------- | ----------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| `items`          | `MultiItemCarouselItem[]`                             | Required          | Collection of carousel items.                                   |
| `label`          | `string`                                              | Required          | Accessible name of the carousel region.                         |
| `itemsPerView`   | `{ mobile: number; tablet: number; desktop: number }` | Component default | Number of visible items at each responsive breakpoint.          |
| `scrollMode`     | `'item' \| 'page'`                                    | Component default | Whether navigation advances one item or a page at a time.       |
| `initialIndex`   | `number`                                              | `0`               | Initial position for uncontrolled navigation.                   |
| `activeIndex`    | `number`                                              | —                 | Active position for controlled navigation.                      |
| `onIndexChange`  | `(index: number) => void`                             | —                 | Callback invoked when the requested position changes.           |
| `showControls`   | `boolean`                                             | Component default | Whether to show the Previous and Next controls.                 |
| `showIndicators` | `boolean`                                             | Component default | Whether to show position indicators.                            |
| `showSideArrows` | `boolean`                                             | Component default | Whether to show additional side-arrow controls where supported. |
| `loop`           | `boolean`                                             | `false`           | Whether navigation wraps around the collection.                 |
| `className`      | `string`                                              | —                 | Additional CSS class for the carousel container.                |
| `variant`        | `'default' \| 'coverflow'`                            | `'default'`       | Visual presentation of the carousel.                            |

**Note:** Defaults shown as “Component default” should be confirmed against `MultiItemCarousel.tsx` before treating this table as the definitive API reference.

## Accessibility

### Semantic Structure

- The carousel uses a named region with `role="region"` and `aria-roledescription="carousel"`.
- Each slide uses `role="group"` and `aria-roledescription="slide"`.
- Slide labels communicate the current position within the collection.
- Previous, Next, and position indicator buttons have accessible names.
- The active position indicator is identified using `aria-current`.

### Keyboard Support

| Key or Interaction | Behaviour                                                                           |
| ------------------ | ----------------------------------------------------------------------------------- |
| `Tab`              | Moves focus through available navigation controls and indicators in document order. |
| `Shift + Tab`      | Moves focus backwards through available controls.                                   |
| `Enter`            | Activates the focused navigation button or indicator.                               |
| `Space`            | Activates the focused navigation button or indicator.                               |

The component does not require custom arrow-key navigation between its controls. Native button keyboard behaviour is preserved.

### Screen Reader Support

- The carousel has an accessible name.
- Each slide exposes its position and optional descriptive label.
- A live status region announces changes to the active slide.
- Inactive slides are marked `aria-hidden="true"` and made inert to prevent keyboard interaction with hidden content.
- The active slide remains available to assistive technology.

The live announcement region communicates slide changes without requiring focus to move away from the navigation control.

### Focus Management

- Navigation controls use visible keyboard focus styling.
- Activating Previous, Next, or an indicator does not unnecessarily move focus.
- Inactive slide content is prevented from receiving keyboard focus.
- Native button semantics support keyboard activation.

### Reduced Motion

The component respects the user's `prefers-reduced-motion: reduce` preference through CSS.

When reduced motion is requested, carousel animations and transitions are disabled and smooth scrolling is avoided. Navigation and content remain available.

### No Automatic Rotation

The carousel does not automatically advance slides. Users decide when to change the displayed content, avoiding unexpected movement and changes that could interfere with reading or interaction.

## Accessibility Testing

The component should be tested using:

- Keyboard-only navigation with Tab and Shift+Tab.
- Enter and Space activation for navigation controls and indicators.
- NVDA screen reader testing.
- Correct announcement of slide position and optional descriptions.
- Verification that inactive slides are hidden from the accessibility tree and cannot receive keyboard focus.
- Responsive behaviour at mobile, tablet, and desktop widths.
- Both standard and CoverFlow variants.
- Looping and non-looping navigation.
- Controlled and uncontrolled navigation.
- Reduced-motion settings in a browser.
- Visible focus indicators and disabled control behaviour.
- Empty collections and collections that do not fill the final page.

Automated tests should cover rendering, navigation, indicator state, live announcements, responsive behaviour, and controlled state. Browser-level tests can supplement these checks for computed styles and reduced-motion behaviour.

## Related Components

- [Carousel](carousel.md)
- [Pagination](../Navigation/pagination.md)
- [Tabs](../ContentFeedback/tabs.md)

## Implementation Notes

- Use a unique, meaningful `label` for each carousel instance.
- Give each item a stable, unique `id`.
- Keep slide content concise and ensure headings and controls within each slide remain semantically appropriate.
- Do not place essential content exclusively in slides that users may overlook;
