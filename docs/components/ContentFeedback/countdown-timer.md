# Countdown Timer

An accessible countdown timer that displays the remaining days, hours, minutes, and seconds until a specified date and time. It supports custom labels, completion messages, and screen reader announcements.

## Features

- Displays remaining days, hours, minutes, and seconds
- Updates the visual countdown every second
- Accepts a JavaScript `Date` object or date string as the target
- Supports a custom heading label
- Supports a custom completion message
- Announces the initial countdown value to screen readers
- Provides periodic, polite screen reader updates
- Announces when the countdown completes
- Responsive four-unit layout
- Uses semantic HTML and accessible labelling

## Props

| Prop                | Type             | Default                      | Description                                                       |
| ------------------- | ---------------- | ---------------------------- | ----------------------------------------------------------------- |
| `targetDate`        | `string \| Date` | Required                     | The date and time when the countdown ends.                        |
| `label`             | `string`         | `"Time remaining"`           | The accessible heading label for the countdown section.           |
| `completionMessage` | `string`         | `"The countdown has ended."` | The message displayed and announced when the countdown completes. |

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

## Accessibility

The Countdown Timer is designed to support screen reader users without producing excessive announcements.

### Semantic Structure

- Uses a semantic `<section>` element to group the countdown content.
- Provides an accessible section name through its associated heading.
- Uses a separate live region for screen reader announcements.
- Uses the `timer` role for the visual countdown display.

### Screen Reader Announcements

A separate polite live region communicates important countdown changes:

- **Countdown starts:** Announces that the countdown has started and provides the initial remaining time.
- **Periodic updates:** Announces the remaining time periodically without announcing every second.
- **Countdown completes:** Announces the completion message.

The live region uses `role="status"`, `aria-live="polite"`, and `aria-atomic="true"` so announcements are communicated without unnecessarily interrupting other screen reader activity.

The visual countdown continues updating every second independently of the live region.

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
