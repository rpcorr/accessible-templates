# Number Input

The Number Input is an accessible form control that allows users to enter and edit numeric values using the keyboard or the browser's built-in number controls.

## Features

- Native `<input type="number">` semantics
- Label association
- Keyboard accessibility
- Controlled and uncontrolled values
- Required state
- Disabled state
- Read-only state
- Description support
- Error messaging
- Minimum and maximum value constraints
- Custom step increments
- Visible focus styling
- Screen reader support

## Accessibility

The Number Input uses a native `<input type="number">` element, providing built-in support for numeric input, validation, and browser accessibility features.

The input is associated with its visible label using a native `<label>` element. An optional description and error message are associated with the input using `aria-describedby`.

When an error is provided, the input uses `aria-invalid="true"` to communicate its invalid state to assistive technologies. The error message also uses `role="alert"` so that dynamically displayed errors can be announced by screen readers.

## Validation

The Number Input supports the native `min`, `max`, and `step` attributes to define valid numeric values and increments.

These attributes are handled by the browser's native form validation. Users can enter values that fall outside the configured range, but the browser prevents form submission when the value does not satisfy the applicable constraints.

Custom error messages can also be provided through the `error` prop. This allows the consuming application to determine when an error should be displayed and what message should be communicated to the user.

## States

The Number Input supports:

- Default and uncontrolled values
- Controlled values
- Required fields
- Disabled inputs
- Read-only inputs
- Descriptions
- Custom error messages
- Minimum and maximum constraints
- Custom step increments

## Keyboard Support

Users can enter a number using the keyboard. When supported by the browser, `Arrow Up` and `Arrow Down` can be used to increase or decrease the value according to the configured `step`.

`Tab` moves focus to and from the input. The native number input behavior is preserved so users can interact with the control using their preferred input method.

## Usage

```tsx
import { NumberInput } from './components/FormControls/NumberInput';

<NumberInput label="Age" name="age" placeholder="Enter your age" />;
```

## Example with Constraints

```tsx
<NumberInput
  label="Quantity"
  name="quantity"
  description="Enter a quantity between 1 and 10."
  min={1}
  max={10}
  step={1}
/>
```

## Example with Custom Error

```tsx
<NumberInput
  label="Score"
  name="score"
  value={score}
  onChange={setScore}
  error={scoreError}
  min={0}
  max={100}
/>
```
