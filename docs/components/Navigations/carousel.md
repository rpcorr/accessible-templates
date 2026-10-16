# Carousel

An accessible, reusable carousel component for presenting content, images, and cards one slide at a time. It supports Previous and Next controls, direct slide selection, optional looping, and optional automatic rotation.

The component is designed around WCAG 2.2 AA accessibility goals, with semantic markup, accessible names, keyboard operability, visible focus indicators, and controls for managing automatic rotation.

## Features

- Displays one slide at a time.
- Supports text, images, cards, and custom React content.
- Provides Previous and Next navigation controls.
- Includes optional slide indicators for direct slide selection.
- Supports optional looping between the first and last slides.
- Supports automatic rotation with a configurable interval.
- Provides Pause and Play controls when automatic rotation is enabled.
- Pauses automatic rotation while the pointer hovers over the carousel.
- Stops automatic rotation when keyboard focus enters the carousel.
- Supports controlled and uncontrolled slide selection.
- Supports an active state for pausing rotation when the carousel is inactive.
- Hides inactive slides from display and the accessibility tree.
- Hides unnecessary navigation controls when only one slide is provided.
- Uses CSS Modules for component styling.

## Import

Import the component from its source location in your application. Adjust the path based on the location of the file using it.

```tsx
import {
  Carousel,
  type CarouselSlide,
} from '../../../components/Navigations/Carousel/Carousel';
```

## Basic Usage

```tsx
import {
  Carousel,
  type CarouselSlide,
} from '../../../components/Navigations/Carousel/Carousel';

const slides: CarouselSlide[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    content: <h3>Welcome</h3>,
  },
  {
    id: 'features',
    label: 'Features',
    content: <p>Explore the available features.</p>,
  },
  {
    id: 'getting-started',
    label: 'Getting started',
    content: <p>Learn how to get started.</p>,
  },
];

export function BasicCarousel() {
  return <Carousel label="Getting started" slides={slides} />;
}
```

The carousel displays one slide at a time, with Previous and Next controls and slide indicators enabled by default.

## Automatic Rotation

Automatic rotation is disabled by default. Enable it with `autoPlay`.

```tsx
<Carousel label="Featured content" slides={slides} autoPlay interval={5000} />
```

The `interval` prop specifies the delay between automatic slide changes in milliseconds. Its default is `5000`.

When automatic rotation is enabled:

- A Pause/Play control is available.
- Rotation pauses while the pointer hovers over the carousel and resumes when the pointer leaves, provided rotation has not been stopped.
- Rotation stops when keyboard focus enters the carousel.
- Users can restart rotation using the Play control.

## Active State

Use `isActive` when a carousel is displayed inside tabs, panels, or another interface where it may become inactive.

```tsx
<Carousel
  label="Featured content"
  slides={slides}
  autoPlay
  isActive={activeTabId === 'featured'}
/>
```

The default value of `isActive` is `true`.

When `isActive` is `false`, automatic rotation pauses. When the carousel becomes active again, rotation can resume if it has not been manually stopped.

This prop controls automatic rotation; it does not hide the carousel or change its selected slide.

## Controlled Slide Selection

Use `activeIndex` and `onSlideChange` when the parent component needs to control the selected slide.

```tsx
import { useState } from 'react';
import {
  Carousel,
  type CarouselSlide,
} from '../../../components/Navigations/Carousel/Carousel';

export function ControlledCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      label="Featured content"
      slides={slides}
      activeIndex={activeIndex}
      onSlideChange={setActiveIndex}
    />
  );
}
```

When `activeIndex` is provided, the parent component controls the selected slide. Update the value in response to `onSlideChange` to reflect user navigation.

Without `activeIndex`, the component manages its own selected slide.

Use `initialIndex` to choose the initial slide when using internal state.

## Customizing Navigation

### Hide slide indicators

```tsx
<Carousel label="Featured content" slides={slides} showIndicators={false} />
```

### Hide Previous and Next controls

```tsx
<Carousel label="Featured content" slides={slides} showControls={false} />
```

### Enable looping

```tsx
<Carousel label="Featured content" slides={slides} loop />
```

When looping is disabled, Previous is disabled on the first slide and Next is disabled on the last slide. When looping is enabled, navigation wraps between the first and last slides.

## Props

| Prop             | Type                      | Default  | Description                                                  |
| ---------------- | ------------------------- | -------- | ------------------------------------------------------------ |
| `slides`         | `CarouselSlide[]`         | Required | Array of slides to display.                                  |
| `label`          | `string`                  | Required | Accessible name for the carousel region.                     |
| `initialIndex`   | `number`                  | `0`      | Initial slide index for uncontrolled usage.                  |
| `activeIndex`    | `number`                  | —        | Current slide index for controlled usage.                    |
| `onSlideChange`  | `(index: number) => void` | —        | Callback invoked when the selected slide changes.            |
| `showControls`   | `boolean`                 | `true`   | Displays Previous and Next buttons.                          |
| `showIndicators` | `boolean`                 | `true`   | Displays slide indicator buttons.                            |
| `loop`           | `boolean`                 | `false`  | Enables wrapping between the first and last slides.          |
| `autoPlay`       | `boolean`                 | `false`  | Enables automatic slide rotation.                            |
| `isActive`       | `boolean`                 | `true`   | Allows automatic rotation only while the carousel is active. |
| `interval`       | `number`                  | `5000`   | Delay between automatic slide changes, in milliseconds.      |
| `className`      | `string`                  | —        | Optional CSS class for the carousel container.               |

## CarouselSlide Type

Each slide must have a unique `id` and a `content` value.

```tsx
export type CarouselSlide = {
  id: string;
  label?: string;
  content: React.ReactNode;
};
```

| Property  | Type              | Description                                                   |
| --------- | ----------------- | ------------------------------------------------------------- |
| `id`      | `string`          | Unique identifier used as the slide's React key.              |
| `label`   | `string`          | Optional descriptive label announced with the slide position. |
| `content` | `React.ReactNode` | Content rendered inside the slide.                            |

## Accessibility

The component includes the following accessibility features:

- **Semantic structure:** A named region identifies the carousel, and each slide is represented as a group.
- **Slide identification:** Each slide exposes its position and total slide count, with an optional descriptive label.
- **Inactive slides:** Hidden slides are removed from visual display and the accessibility tree.
- **Accessible controls:** Navigation, slide indicators, and rotation controls have accessible names.
- **Current slide:** The selected indicator uses `aria-current`.
- **Keyboard access:** Native buttons support Tab, Enter, and Space.
- **Visible focus:** Navigation controls provide visible keyboard focus indicators.
- **Predictable boundaries:** Previous and Next are disabled at the first and last slides unless looping is enabled.
- **Rotation controls:** Users can pause or restart automatic rotation.
- **Automatic rotation behaviour:** Rotation pauses while the pointer hovers over the carousel, stops when keyboard focus enters, and pauses while the carousel is inactive. Users can restart rotation with the Play control.

The accessibility of the complete experience also depends on the slide content. For example, images need appropriate alternative text, and interactive content inside slides must remain keyboard accessible.

## Keyboard Support

| Key           | Behavior                                       |
| ------------- | ---------------------------------------------- |
| `Tab`         | Moves focus between enabled carousel controls. |
| `Shift + Tab` | Moves focus backward through enabled controls. |
| `Enter`       | Activates the focused button.                  |
| `Space`       | Activates the focused button.                  |

The component uses native buttons, preserving standard browser keyboard behaviour. Arrow-key navigation between slides is not implemented.

When a navigation button changes the slide, focus normally remains on that button while it remains enabled. At a slide boundary, the corresponding button becomes disabled and is skipped during keyboard navigation. Users can continue through the remaining enabled controls.

### Testing Checklist

- [ ] Verify Previous and Next buttons navigate to the correct slides.
- [ ] Verify slide indicators select the corresponding slide.
- [ ] Verify navigation behavior at the first and last slides with looping enabled and disabled.
- [ ] Verify automatic rotation starts when `autoPlay` is enabled.
- [ ] Verify Pause and Play controls stop and restart automatic rotation.
- [ ] Verify rotation pauses when the pointer enters the carousel and resumes when it leaves, unless manually stopped.
- [ ] Verify rotation stops when keyboard focus enters the carousel.
- [ ] Verify `isActive` pauses rotation when the carousel becomes inactive.
- [ ] Verify rotation can resume when the carousel becomes active again, unless manually stopped.
- [ ] Verify controlled slide selection updates correctly through `activeIndex` and `onSlideChange`.
- [ ] Verify `initialIndex` selects the expected starting slide in uncontrolled mode.
- [ ] Verify a single slide displays correctly without unnecessary navigation controls or indicators.
- [ ] Verify accessible names, roles, slide labels, and position announcements.
- [ ] Verify visible focus indicators on enabled interactive controls.
- [ ] Verify disabled Previous and Next buttons behave correctly at slide boundaries.
- [ ] Test keyboard-only navigation and screen reader announcements.
- [ ] Check responsive layouts at narrow viewport widths.
- [ ] Verify images and captions resize without overflow at 250% and 400% browser zoom.
- [ ] Check that controls wrap appropriately without overlapping or causing unwanted horizontal scrolling.
- [ ] Run automated accessibility checks and the Carousel component test suite.

## Related Components

- **[Multi-Item Carousel](multi-item-carousel.md):** Displays multiple items in a responsive carousel layout, with item-by-item or page-by-page navigation, optional looping, and a CoverFlow presentation.
- **[Pagination](../Navigation/pagination.md):** Supports navigation between separate pages of content.
- **[Progress Indicator](../ContentFeedback/progress-indicator.md):** Communicates progress through a sequence.
- **[Tabs](../ContentFeedback/tabs.md):** Organizes content into selectable panels.

## Accessibility Goal

Built with WCAG 2.2 AA as the target. Manual keyboard and screen-reader testing should be performed alongside automated accessibility checks. The component is designed to support accessible interfaces, but conformance should be verified through testing in the context where it is used.
