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

The Number Input uses a native `<input type="number">` element, providing built-in support for numeric input and browser accessibility features.

The input is associated with its visible label using a native `<label>` element. An optional description and error message are associated with the input using `aria-describedby`.

When an error is provided, the input uses `aria-invalid="true"` to communicate its invalid state to assistive technologies.

## Validation

The Number Input supports the native `min`, `max`, and `step` attributes to define valid numeric values and increments.

## States

The Number Input supports default values and controlled values, required fields, descriptions, error messages, disabled inputs, and read-only inputs.

## Keyboard Support

Users can enter a number using the keyboard. When supported by the browser, `Arrow Up` and `Arrow Down` can be used to increase or decrease the value according to the configured `step`.

`Tab` moves focus to and from the input. The native number input behavior is preserved so users can interact with the control using their preferred input method.

## Usage

```tsx
import { NumberInput } from './components/FormControls/NumberInput';

<NumberInput label="Age" name="age" placeholder="Enter your age" />;
```
