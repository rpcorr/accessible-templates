# Countdown Timer

An accessible countdown timer that displays the remaining days, hours, minutes, and seconds until a specified date and time. It supports custom labels, completion messages, standard and flip display styles, and screen reader announcements.

## Features

- Displays remaining days, hours, minutes, and seconds
- Updates the visual countdown every second
- Supports a standard countdown display
- Supports an animated flip timer display
- Animates digit changes using a flip-card effect
- Accepts a JavaScript `Date` object or date string as the target
- Supports a custom heading label
- Supports a custom completion message
- Announces the initial countdown value to screen readers
- Provides periodic, polite screen reader updates
- Announces when the countdown completes
- Responsive four-unit layout
- Uses semantic HTML and accessible labelling
- Respects the user's reduced-motion preferences

## Props

| Prop                | Type                   | Default                      | Description                                                       |
| ------------------- | ---------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `targetDate`        | `string \| Date`       | Required                     | The date and time when the countdown ends.                        |
| `label`             | `string`               | `"Time remaining"`           | The accessible heading label for the countdown section.           |
| `completionMessage` | `string`               | `"The countdown has ended."` | The message displayed and announced when the countdown completes. |
| `variant`           | `'standard' \| 'flip'` | `'standard'`                 | Controls the countdown display style.                             |

## Usage

```tsx
import { CountdownTimer } from './components/ContentFeedback/CountdownTimer';

<CountdownTimer targetDate="2026-12-31T23:59:59" />;
```

## Custom Label and Completion Message

```tsx
<CountdownTimer
  targetDate="2026-12-25T00:00:00"
  label="Time until Christmas"
  completionMessage="Merry Christmas!"
/>
```

## Flip Timer

Use the `variant` prop to display the countdown using animated flip cards. The digits animate when their values change, creating a flip-clock effect.

```tsx
<CountdownTimer targetDate="2026-12-31T23:59:59" variant="flip" />
```

The flip variant:

- Displays days, hours, minutes, and seconds using flip-style digit cards.
- Animates changing digits with a two-part rotation effect.
- Uses a smooth 500ms flip animation.
- Maintains the same countdown functionality and completion message as the standard variant.
- Respects `prefers-reduced-motion` by disabling the flip animations.

The standard countdown remains the default when no `variant` is specified.

## Accessibility

The Countdown Timer is designed to support screen reader users without producing excessive announcements.

### Semantic Structure

- Uses a semantic `<section>` element to group the countdown content.
- Provides an accessible section name through its associated heading.
- Uses a separate live region for screen reader announcements.
- Uses the `timer` role for the visual countdown display.
- The flip display uses `aria-hidden="true"` to prevent animated digits from generating unnecessary screen reader output.

### Screen Reader Announcements

A separate polite live region communicates important countdown changes:

- **Countdown starts:** Announces that the countdown has started and provides the initial remaining time.
- **Periodic updates:** Announces the remaining time periodically without announcing every second.
- **Countdown completes:** Announces the completion message.

The live region uses `role="status"`, `aria-live="polite"`, and `aria-atomic="true"` so announcements are communicated without unnecessarily interrupting other screen reader activity.

The visual countdown continues updating every second independently of the live region. This applies to both standard and flip variants.

### Reduced Motion

The flip animation respects the `prefers-reduced-motion: reduce` media query.

When a user has requested reduced motion through their operating system or browser settings, the flip animations are disabled while the countdown continues updating normally.

### Keyboard Support

The Countdown Timer does not introduce interactive controls and therefore does not require additional keyboard interaction. Its content remains available through normal reading and navigation.

## Accessibility Testing

The component has been tested using:

- NVDA screen reader
- Keyboard and screen reader reading navigation
- Vitest component and utility tests
- ESLint

Manual NVDA testing confirmed that the component announces the initial countdown value, provides polite periodic updates, and announces when the countdown ends.

**Accessibility target:** Designed and tested with WCAG 2.2 Level AA accessibility requirements in mind.
