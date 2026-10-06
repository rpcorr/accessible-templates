# Toast

An accessible temporary notification component for communicating dynamic information, such as the result of an action or a change in application state.

## Features

- Accessible ARIA live-region announcements
- Polite announcements for informational, successful, and warning notifications
- Assertive announcements for error notifications
- No automatic keyboard focus when a toast appears
- Focus restoration after user-initiated dismissal or action
- No focus movement when a toast auto-dismisses
- Accessible dismiss button
- Optional action button
- Automatic dismissal with configurable duration
- Persistent notifications with `duration={0}`
- Pauses dismissal while hovered or focused
- Multiple simultaneous notifications
- Configurable maximum number of visible toasts
- Six viewport positions
- React portal rendering outside the application layout
- Responsive behavior on smaller screens
- Reduced-motion support
- Type-specific styling
- Screen reader support with NVDA and other assistive technologies

## Accessibility

Toast notifications are announced using persistent ARIA live regions.

Informational, successful, and warning notifications are placed in a polite live region:

```tsx
<div aria-live="polite" aria-atomic="false">
  ...
</div>
```

Error notifications are placed in an assertive live region:

```tsx
<div aria-live="assertive" aria-atomic="false">
  ...
</div>
```

Persistent live-region containers ensure that dynamically added notifications are announced reliably by assistive technologies.

Toasts do not automatically receive keyboard focus when they appear. This prevents a notification from unexpectedly interrupting the user's current interaction.

Interactive elements within a toast, including action and dismiss buttons, remain keyboard accessible.

When a user dismisses a toast or activates its action, focus is restored to the element that had focus when the toast was created. Automatically dismissed toasts do not move keyboard focus.

If the original focus target is no longer available in the document, focus is not forcibly moved elsewhere.

## Usage

Wrap an application or section of the application with `ToastProvider`:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

Use the `useToast` hook to create notifications:

```tsx
const { toast } = useToast();

toast({
  type: 'success',
  title: 'Changes saved',
  message: 'Your changes have been saved successfully.',
});
```

## Toast Types

Four notification types are supported:

- `info` — informational updates
- `success` — successful actions or operations
- `warning` — warnings or conditions that may require attention
- `error` — errors or failed operations

```tsx
toast({
  type: 'info',
  title: 'Information',
});
```

```tsx
toast({
  type: 'success',
  title: 'Changes saved',
});
```

```tsx
toast({
  type: 'warning',
  title: 'Session expiring soon',
});
```

```tsx
toast({
  type: 'error',
  title: 'Unable to save changes',
});
```

The default type is `info`.

## Content

A toast requires a title and can optionally include a message:

```tsx
toast({
  type: 'success',
  title: 'Profile updated',
  message: 'Your profile information has been saved successfully.',
});
```

The title is always displayed. The message is rendered only when provided.

## Actions

Toasts can include an optional action button:

```tsx
toast({
  type: 'success',
  title: 'Item deleted',
  message: 'The item was removed from your list.',
  action: {
    label: 'Undo',
    onClick: () => {
      // Restore the deleted item.
    },
  },
});
```

Activating the action:

1. Runs the action callback.
2. Dismisses the toast.
3. Restores focus to the element that had focus when the toast was created.

The action does not automatically receive focus when the toast appears.

## Dismissal

Users can dismiss a toast using its accessible dismiss button.

```tsx
const { dismissToast } = useToast();

dismissToast(toastId);
```

User-initiated dismissal through the toast's dismiss button restores focus to the original focus target.

Programmatic dismissal does not restore focus.

## Duration

Toasts automatically dismiss after a configurable duration.

The default duration is `5000` milliseconds:

```tsx
toast({
  type: 'info',
  title: 'Changes saved',
});
```

A custom duration can be specified:

```tsx
toast({
  type: 'info',
  title: 'Notification',
  duration: 10000,
});
```

A duration of `0` creates a persistent toast:

```tsx
toast({
  type: 'warning',
  title: 'Important notification',
  duration: 0,
});
```

Persistent toasts remain visible until they are explicitly dismissed.

## Pause Behavior

The dismissal timer pauses while:

- The pointer is over the toast.
- An interactive element within the toast has focus.

The remaining duration is preserved when the timer resumes.

This gives users additional time to read and interact with the notification.

## Multiple Toasts

Multiple notifications can be displayed at the same time.

```tsx
toast({
  type: 'info',
  title: 'First notification',
});

toast({
  type: 'success',
  title: 'Second notification',
});

toast({
  type: 'warning',
  title: 'Third notification',
});
```

The `ToastProvider` limits the number of simultaneously displayed notifications using `maxToasts`.

```tsx
<ToastProvider maxToasts={3}>
  <App />
</ToastProvider>
```

When the maximum is exceeded, the oldest visible notification is removed.

Removing a toast because of the `maxToasts` limit does not move keyboard focus.

## Dismiss All

All active notifications can be dismissed:

```tsx
const { dismissAll } = useToast();

dismissAll();
```

Programmatic dismissal of all notifications does not move keyboard focus.

## Positions

The `ToastProvider` supports six positions:

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

The default position is `top-right`.

```tsx
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>
```

## Keyboard Support

Toast notifications do not move keyboard focus when they appear.

Users can use `Tab` to move to interactive elements within a toast.

The action and dismiss buttons support standard button keyboard interaction:

- `Tab` — move focus to the button
- `Enter` — activate the button
- `Space` — activate the button

After a user-initiated action or dismissal, focus is restored to the element that had focus when the toast was created.

## Focus Management

Toast focus management follows these principles:

| Situation                     | Focus behavior                     |
| ----------------------------- | ---------------------------------- |
| Toast appears                 | Focus does not move                |
| Action button activated       | Toast closes and focus is restored |
| Dismiss button activated      | Toast closes and focus is restored |
| Automatic dismissal           | Focus does not move                |
| `maxToasts` removes a toast   | Focus does not move                |
| `dismissToast()`              | Focus does not move                |
| `dismissAll()`                | Focus does not move                |
| Original focus target removed | Focus is not forcibly moved        |

This prevents notifications from unexpectedly disrupting keyboard users while still providing predictable focus restoration after direct interaction.

## Screen Reader Support

Toast notifications use persistent live regions rather than dynamically assigning live-region roles to individual notifications.

This provides reliable announcements when notifications are added dynamically.

| Toast type | Live region             |
| ---------- | ----------------------- |
| Info       | `aria-live="polite"`    |
| Success    | `aria-live="polite"`    |
| Warning    | `aria-live="polite"`    |
| Error      | `aria-live="assertive"` |

The toast itself does not receive `role="status"` or `role="alert"`.

## Responsive Behavior

Toast containers adapt to smaller viewports.

On narrow screens:

- Toasts use the available viewport width.
- Container padding is reduced.
- Centered positions expand to the viewport edges.
- The maximum notification area is limited to prevent excessive screen coverage.

## Reduced Motion

Toast entrance animation is disabled when the user has enabled a reduced-motion preference.

```css
@media (prefers-reduced-motion: no-preference) {
  .toast {
    animation: toastEnter 180ms ease-out;
  }
}
```

This respects the user's operating-system or browser motion preferences.

## Rendering

Toast notifications are rendered using a React portal directly under `document.body`.

This prevents the toast from being affected by layout containers, stacking contexts, or other component-specific positioning.

```tsx
createPortal(<ToastContainer />, document.body);
```

The toast container uses a high stacking order so notifications remain visible above the application's normal content.

## API

### `ToastProvider`

| Prop        | Type            | Default       | Description                                       |
| ----------- | --------------- | ------------- | ------------------------------------------------- |
| `children`  | `ReactNode`     | —             | Application or content containing toast consumers |
| `position`  | `ToastPosition` | `'top-right'` | Viewport position of the toast container          |
| `maxToasts` | `number`        | `5`           | Maximum number of simultaneously visible toasts   |

### `ToastOptions`

| Property   | Type                                          | Default  | Description                                              |
| ---------- | --------------------------------------------- | -------- | -------------------------------------------------------- |
| `type`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Notification type                                        |
| `title`    | `string`                                      | —        | Toast title                                              |
| `message`  | `string`                                      | —        | Optional notification message                            |
| `duration` | `number`                                      | `5000`   | Duration in milliseconds; `0` creates a persistent toast |
| `action`   | `{ label: string; onClick: () => void }`      | —        | Optional action button                                   |

### `useToast`

The `useToast` hook provides:

```tsx
const { toast, dismissToast, dismissAll } = useToast();
```

| Method             | Description                                   |
| ------------------ | --------------------------------------------- |
| `toast(options)`   | Creates a new notification and returns its ID |
| `dismissToast(id)` | Programmatically dismisses a notification     |
| `dismissAll()`     | Dismisses all active notifications            |

## Example

```tsx
import { ToastProvider } from '../../components/ContentFeedback/Toast';
import { useToast } from '../../hooks/useToast';

function Example() {
  const { toast } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        toast({
          type: 'success',
          title: 'Changes saved',
          message: 'Your changes have been saved successfully.',
        })
      }
    >
      Save Changes
    </button>
  );
}

export function App() {
  return (
    <ToastProvider position="top-right">
      <Example />
    </ToastProvider>
  );
}
```

## Related Components

- [Alert](../Alert/alert.md) — For important information that should remain visible.
- [Status](../Status/status.md) — For persistent status information associated with page content.
- [Progress](../Progress/progress.md) — For communicating the progress of an ongoing operation.
