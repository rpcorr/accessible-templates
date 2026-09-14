# Switch

The Switch is a form control that allows users to toggle a setting between on and off states. Users can toggle the switch using the keyboard or mouse. The Switch also supports colour variants for different visual styles.

## Features

- Native checkbox semantics with `switch` role
- Keyboard accessibility
- On/off states
- Controlled and uncontrolled values
- Disabled and required states
- Optional description
- Colour variants
- Visible focus styling
- Screen reader support

## Accessibility

The Switch uses a native `<input type="checkbox">` with the `switch` role, providing appropriate semantics for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The visual switch track and thumb are decorative and hidden from assistive technologies using `aria-hidden="true"`.

Colour is used only as a visual indication and does not communicate the switch state by itself. The switch state is communicated through its native semantics and `switch` role.

## States

The Switch supports checked and unchecked states, default values, controlled values, disabled and required states, optional descriptions, and colour variants.

Available colour variants are `default`, `success`, `warning`, `error`, and `info`.

## Keyboard Support

| Key     | Action                                |
| ------- | ------------------------------------- |
| `Space` | Toggles the Switch between on and off |
| `Tab`   | Moves focus to and from the Switch    |

## Usage

```tsx
import { Switch } from './components/FormControls/Switch';

<Switch label="Enable notifications" />;
```
