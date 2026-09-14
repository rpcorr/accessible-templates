# Text Input

The Text Input is an accessible form control that allows users to enter and edit text. It uses the native HTML `<input>` element and supports multiple input types, descriptions, error messages, validation constraints, and common form states.

## Features

- Native `<input>` semantics
- Label association
- Text, email, password, telephone, and URL input types
- Controlled and uncontrolled values
- Required state
- Disabled state
- Read-only state
- Description support
- Error messaging
- Minimum and maximum length constraints
- Visible focus styling
- Screen reader support

## Accessibility

The Text Input uses a native `<input>` element, which provides appropriate semantics and accessibility information to assistive technologies.

The input is associated with its visible label using a native `<label>` element. Optional descriptions and error messages are associated with the input using `aria-describedby`.

When an error is provided, the input uses `aria-invalid` to communicate its invalid state to assistive technologies.

The Text Input relies on the native input element for keyboard interaction and does not add custom keyboard handling.

## Input Types

The Text Input supports the following input types:

- `text`
- `email`
- `password`
- `tel`
- `url`

## Usage

```tsx
import { TextInput } from './components/FormControls/TextInput';

<TextInput label="Name" placeholder="Enter your name" />;
```
