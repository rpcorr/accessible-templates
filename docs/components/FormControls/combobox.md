# Combobox

The Combobox is an editable form control that allows users to type into an input and filter a list of available options. Users can navigate and select suggestions using the keyboard or mouse. It also supports optional inline autocomplete, which suggests and completes matching option labels as the user types.

## Features

- Editable typeahead filtering
- Optional inline autocomplete
- Combobox and listbox ARIA semantics
- Keyboard navigation
- Inline completion using the keyboard
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

The `aria-autocomplete` attribute identifies the supported autocomplete behaviour. It uses `list` for standard filtering and `both` when inline completion is enabled.

When filtering produces no matching options, a polite live region announces **"No options found."** after a short delay. The delayed announcement prevents unnecessary announcements while the user is actively typing.

### Inline Autocomplete

Inline autocomplete is an optional enhancement enabled through the `inlineCompletion` prop. As users type, the component suggests the remainder of the first matching enabled option's label directly in the input. The suggested text is highlighted to distinguish it from the text entered by the user.

Users can accept the suggested completion by pressing `Arrow Right`. Accepting an inline completion updates the input value to the completed option label.

Standard filtering and option selection remain available when inline autocomplete is enabled.

## Keyboard Support

| Key           | Action                                                      |
| ------------- | ----------------------------------------------------------- |
| `Arrow Down`  | Moves to the next available option                          |
| `Arrow Up`    | Moves to the previous available option                      |
| `Enter`       | Selects the active option                                   |
| `Arrow Right` | Accepts the inline completion when one is available         |
| `Escape`      | Closes the options list                                     |
| `Tab`         | Closes the options list and moves focus out of the Combobox |

Users can type at any time to filter the available options. Disabled options cannot be selected or reached using arrow-key navigation.

When inline autocomplete is enabled, `Arrow Right` accepts the highlighted completion. Pressing `Tab` closes the options list without accepting the inline completion.

## Usage

### Standard Combobox

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

### Combobox with Inline Autocomplete

```tsx
<Combobox
  label="Choose a country"
  name="country"
  placeholder="Start typing..."
  options={countryOptions}
  inlineCompletion
/>
```

## Related Components

- [Search Combobox](./search-combobox.md) — Use when providing a searchable selection interface with a dedicated search experience.
- [Select](./select.md) — Use when users should choose from a predefined list without editing the value.
