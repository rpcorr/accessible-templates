# Colour Picker

The Colour Picker component provides an accessible way for users to select a colour using the browser's native colour selection interface or enter a hexadecimal (HEX) colour value manually. It supports controlled and uncontrolled usage, optional HEX text input, helper text, validation messages, and required and disabled states.

## Features

- Uses a native `input type="color"` element for colour selection.
- Supports an optional text input for entering a six-digit hexadecimal colour value.
- Supports controlled and uncontrolled usage.
- Provides a visible label for the colour input and an accessible label for the optional HEX text input.
- Supports helper text and validation error messages.
- Associates helper text and validation messages with the relevant inputs using `aria-describedby`.
- Supports required and disabled states.
- Allows the optional HEX text input to be hidden.
- Handles incomplete and invalid HEX entries without replacing the last valid selected colour.
- Provides visible focus indicators for keyboard navigation.
- Supports custom HTML attributes and styling through `className`.

## Accessibility

The Colour Picker uses a native `input type="color"` element, providing built-in accessibility semantics and keyboard interaction.

The colour input is associated with a visible label using a `<label>` element. When enabled, the optional HEX text input has its own accessible label.

Helper text and validation messages are associated with the inputs using `aria-describedby`. The component also supports required and disabled states.

Both interactive inputs provide a visible `:focus-visible` indicator to help users identify the currently focused control.

## Colour Selection

Users can select a colour through the browser's native colour picker. The selected colour is displayed as a HEX value.

When the optional HEX text input is enabled, users can manually enter a six-digit hexadecimal colour value. Incomplete or invalid entries are handled as the user edits the value, preserving the last valid selected colour. An invalid or incomplete draft is reverted to the last valid colour when the text input loses focus.

The HEX text input can be hidden when manual colour entry is not required.

## Component States

The Colour Picker supports the following states and configurations:

- **Controlled:** The selected colour is provided through the `value` prop and changes are reported through `onChange`.
- **Uncontrolled:** The component manages its own selected colour, optionally initialized through `defaultValue`.
- **Required:** Marks the colour input as required.
- **Disabled:** Disables the colour input and optional HEX text input.
- **Helper text:** Provides additional instructions to users.
- **Validation error:** Displays an error message associated with the relevant inputs.
- **Optional HEX input:** Allows manual HEX entry to be enabled or hidden using `showHexInput`.

## Keyboard Support

The native colour input retains the browser's keyboard interaction. Users can press `Tab` to move focus between the colour picker and the optional HEX text input.

The browser's native colour selection interface provides its own keyboard interaction.

## API

| Prop           | Type                      | Default     | Description                                                |
| -------------- | ------------------------- | ----------- | ---------------------------------------------------------- |
| `label`        | `string`                  | Required    | Visible label for the colour input.                        |
| `value`        | `string`                  | —           | Controlled selected colour value.                          |
| `defaultValue` | `string`                  | `'#000000'` | Initial colour for uncontrolled usage.                     |
| `onChange`     | `(value: string) => void` | —           | Callback invoked when the selected colour changes.         |
| `instructions` | `string`                  | —           | Optional helper text displayed with the component.         |
| `error`        | `string`                  | —           | Optional validation error message.                         |
| `required`     | `boolean`                 | `false`     | Marks the colour input as required.                        |
| `disabled`     | `boolean`                 | `false`     | Disables the interactive inputs.                           |
| `showHexInput` | `boolean`                 | `false`     | Controls whether the optional HEX text input is displayed. |
| `name`         | `string`                  | —           | Name attribute for the colour input.                       |
| `className`    | `string`                  | —           | Optional CSS class applied to the component container.     |

The component also accepts applicable HTML attributes for its container element, except for `onChange`, which is defined by the component API.

## Usage

### Basic Colour Picker

```tsx
import { ColourPicker } from './ColourPicker';

function Example() {
  return <ColourPicker label="Choose a colour" />;
}
```

### Colour Picker with HEX Input

```tsx
import { ColourPicker } from './ColourPicker';

function Example() {
  return (
    <ColourPicker label="Choose a colour" defaultValue="#2563eb" showHexInput />
  );
}
```

### Controlled Colour Picker

```tsx
import { useState } from 'react';
import { ColourPicker } from './ColourPicker';

function Example() {
  const [colour, setColour] = useState('#2563eb');

  return (
    <ColourPicker
      label="Brand colour"
      value={colour}
      onChange={setColour}
      showHexInput
    />
  );
}
```

### Colour Picker with Instructions and Error Message

```tsx
import { ColourPicker } from './ColourPicker';

function Example() {
  return (
    <ColourPicker
      label="Choose a colour"
      instructions="Select a colour for your theme."
      error="Please choose a valid colour."
      showHexInput
    />
  );
}
```

## Related Components

- [Text Input](../TextInput/text-input.md) — Provides a single-line text input for entering and editing text.
- [Form Controls](../README.md) — Explore other accessible form control components.

## Testing

The component has been tested with automated unit tests and manual keyboard and NVDA testing.
