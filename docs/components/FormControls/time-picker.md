# Time Picker

The Time Picker is an accessible form control that allows users to enter and select a time using the keyboard or the browser's built-in time controls.

## Features

- Uses the native `<input type="time">` element
- Label association
- Keyboard accessibility
- Controlled and uncontrolled values
- Required state
- Disabled state
- Read-only state
- Description support
- Error messaging
- Minimum and maximum time constraints
- Custom step increments
- Native browser validation
- Visible focus styling
- Screen reader support

## Accessibility

The Time Picker uses a native `<input type="time">` element, providing built-in time input semantics and browser accessibility support.

The input is associated with its visible label using a native `<label>` element. An optional description and error message are associated with the input using `aria-describedby`.

When an error is provided, the input uses `aria-invalid="true"` to communicate its invalid state to assistive technologies. The error message also uses `role="alert"` so that dynamically displayed errors can be announced by screen readers.

Because the component uses the native time input, the way time segments and controls are presented can vary between browsers and operating systems.

## Time Entry and Selection

Users can enter a time directly using the keyboard or use the browser's built-in time controls to select a time.

Native time inputs commonly provide separate controls for portions of the time, such as hours and minutes. The exact controls and their appearance depend on the browser and operating system.

The component preserves the native browser behavior rather than replacing it with a custom time-selection interface.

## Validation

The Time Picker supports the native `min`, `max`, and `step` attributes.

The `min` and `max` attributes define the earliest and latest valid times. The `step` attribute defines the permitted interval between valid times.

These attributes are handled by the browser's native form validation. Users may be able to enter a value that does not satisfy the configured constraints, but the browser prevents form submission when the value is invalid.

For example, a `step` value of `900` represents 15-minute intervals.

Custom error messages can also be provided through the `error` prop. This allows the consuming application to determine when an error should be displayed and what message should be communicated to the user.

## States

The Time Picker supports:

- Default and uncontrolled values
- Controlled values
- Required fields
- Disabled inputs
- Read-only inputs
- Descriptions
- Custom error messages
- Minimum and maximum time constraints
- Custom step increments

## Keyboard Support

Users can operate the Time Picker using the keyboard.

The native browser time control provides keyboard interaction for entering and changing the time and, depending on the browser, navigating between time segments.

`Tab` moves focus to and from the input. The native time input behavior is preserved so users can interact with the control using their preferred input method.

## Usage

```tsx
import { TimePicker } from './components/FormControls/TimePicker';

<TimePicker label="Start time" name="start-time" />;
```

## Example with Constraints

```tsx
<TimePicker
  label="Appointment time"
  name="appointment-time"
  description="Choose a time between 9:00 AM and 5:00 PM."
  min="09:00"
  max="17:00"
  step={900}
/>
```

The `step` value is specified in seconds. In this example, `900` represents 15-minute intervals.

The browser's native time picker may present available times differently depending on the browser and operating system. The component does not replace the native time-selection interface.

## Example with Custom Error

```tsx
<TimePicker
  label="Appointment time"
  name="appointment-time"
  value={appointmentTime}
  onChange={setAppointmentTime}
  error={appointmentError}
  min="09:00"
  max="17:00"
/>
```

Custom errors are controlled by the consuming application. The component does not prevent users from entering values that fall outside the configured `min` or `max` range.

## Native Browser Behavior

The Time Picker intentionally uses the native HTML time input rather than implementing a custom time-selection interface.

The visual appearance, available controls, keyboard behavior, and whether times are presented using a 12-hour or 24-hour format can vary between browsers, operating systems, and user locale settings.

The component preserves this native behavior while providing consistent labeling, descriptions, error messaging, and form state support.
