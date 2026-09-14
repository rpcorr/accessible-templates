# 📻 Radio Group

An accessible radio group component for allowing users to select one option from a set of mutually exclusive choices. The component uses native HTML radio buttons grouped with a `fieldset` and `legend`, while providing consistent styling, accessible descriptions, vertical and horizontal layouts, and support for controlled and uncontrolled selection.

## Features

- Native `<input type="radio">` semantics
- `fieldset` and `legend` grouping
- One-option selection within a group
- Vertical and horizontal orientations
- Controlled and uncontrolled usage
- Default selection
- Disabled options
- Disabled groups
- Required groups
- Optional description text
- Accessible label association
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

## Accessibility

The Radio Group uses native radio inputs with a shared `name` attribute, providing built-in keyboard interaction and screen reader support.

The radio buttons are grouped using a `fieldset` and `legend`, providing an accessible name for the group.

Users can press `Tab` to move focus into the radio group. The arrow keys move between radio options and select the focused option. `Space` can also be used to select the focused radio button.

Disabled options cannot be selected, and a disabled group prevents all of its radio buttons from being interacted with.

Optional descriptions are associated with the radio group using `aria-describedby`.

## Usage

```tsx
import { RadioGroup } from './components/FormControls/RadioGroup';

<RadioGroup
  label="Choose a size"
  name="size"
  options={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]}
/>;
```
