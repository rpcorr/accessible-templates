# Alert

A reusable alert component for communicating informational messages, success feedback, warnings, and errors, with support for optional titles, configurable heading levels, dismissible alerts, and customizable dismiss labels.

## Features

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

## Keyboard Support

| Key         | Action                                               |
| ----------- | ---------------------------------------------------- |
| Tab         | Move to the dismiss button                           |
| Shift + Tab | Move to the previous focusable element               |
| Enter       | Dismiss the alert when the dismiss button is focused |
| Space       | Dismiss the alert when the dismiss button is focused |

The dismiss button is only present when the alert is configured as dismissible.

The dismiss button uses a customizable accessible label, allowing applications to provide context-specific or localized labels.

## Heading Structure

Alerts with titles use a semantic heading element. The heading level can be configured from `h2` through `h6` to fit the surrounding page structure.

```tsx
<Alert variant="info" title="Information" headingLevel="h3">
  Your profile has been updated.
</Alert>
```
