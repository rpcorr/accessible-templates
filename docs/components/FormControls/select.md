# 🔽 Select

An accessible select component for allowing users to choose one or more options from a list of choices. The component uses a native HTML `<select>` element while providing consistent styling, accessible labels and descriptions, placeholder support, selection states, disabled and required states, and error messaging.

## Features

- Native `<select>` semantics
- Single and multiple selection
- Accessible label association
- Placeholder option support
- Default selection
- Controlled and uncontrolled usage
- Disabled options
- Disabled select
- Required state
- Optional description text
- Error message support
- Keyboard accessibility
- Visible `:focus-visible` styling
- Screen reader support

## Accessibility

The Select component uses a native HTML `<select>` element, providing built-in keyboard interaction, selection behaviour, and screen reader support.

The select is associated with its visible label using a `<label>` element. Optional descriptions and error messages are associated with the select using `aria-describedby`.

The component supports required and disabled states using native HTML attributes. Individual options can also be disabled.

The select provides a visible focus indicator for keyboard users and supports screen readers such as NVDA.

Keyboard interaction is provided by the browser's native select behaviour, including moving between options and selecting an option.

## Usage

```tsx
import { Select } from './components/FormControls/Select';

<Select
  label="Choose a country"
  name="country"
  options={[
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>;
```
