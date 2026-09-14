# Status

A reusable status component for communicating non-urgent updates to users, including dynamic changes, form submissions, loading states, processing updates, and other informational feedback.

## Features

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

## Accessibility

The `Status` component uses `role="status"` for non-urgent updates that should be communicated to assistive technology without interrupting the user's current task.

The live region uses `aria-live="polite"` and `aria-atomic="true"` so that updates are announced politely and the complete status message is available to the screen reader.

A status region should remain present in the DOM when it is being used for dynamic updates. Its content can initially be empty and populated when an update occurs.

Polite announcements are not guaranteed to be announced immediately or individually. Assistive technologies may defer, combine, or skip intermediate updates depending on the user's current activity. Applications should therefore avoid relying on every individual polite update being announced.

The `Status` component does not move focus when its content changes. Focus management should be handled by the surrounding interaction when necessary.

## Usage

The `Status` component accepts content as its children:

```tsx
import { Status } from './components/Status';

function Example() {
  return <Status>Changes saved successfully.</Status>;
}
```
