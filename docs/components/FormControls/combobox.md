# Combobox

The Combobox is an editable form control that allows users to type into an input and filter a list of available options. Users can select an option using the keyboard or mouse.

## Features

- Editable typeahead filtering
- Combobox and listbox ARIA semantics
- Keyboard navigation
- Mouse selection
- Disabled options
- Controlled and uncontrolled values
- Required and disabled states
- Optional description
- No-results feedback
- Visible focus styling
- Screen reader support

## Accessibility

The Combobox uses an input with the `combobox` role and a popup `listbox` containing the available options. ARIA relationships connect the input to the listbox and identify the currently active option for assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

When filtering produces no matching options, a polite live region announces **"No options found."** after a short delay. The delayed announcement prevents unnecessary announcements while the user is actively typing.

## Keyboard Support

| Key          | Action                                                      |
| ------------ | ----------------------------------------------------------- |
| `Arrow Down` | Moves to the next available option                          |
| `Arrow Up`   | Moves to the previous available option                      |
| `Enter`      | Selects the active option                                   |
| `Escape`     | Closes the options list                                     |
| `Tab`        | Closes the options list and moves focus out of the Combobox |

Users can type at any time to filter the available options. Disabled options cannot be selected or reached using the arrow-key navigation.

## Usage

```tsx
import { Combobox } from './components/FormControls/Combobox';

const countryOptions = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Ireland', label: 'Ireland' },
];

<Combobox
  label="Choose a country"
  name="country"
  placeholder="Start typing..."
  options={countryOptions}
/>;
```
