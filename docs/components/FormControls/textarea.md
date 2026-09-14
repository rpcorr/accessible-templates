# Textarea

An accessible textarea component for multi-line text input, designed with semantic HTML, keyboard accessibility, visible focus indicators, and accessible form labeling.

## Features

- Uses a native `<textarea>` element
- Keyboard accessible
- Supports accessible labels
- Supports required and disabled states
- Supports placeholder text
- Supports validation and error messaging
- Supports helper text
- Provides visible focus styling
- Supports controlled and uncontrolled usage
- Responsive across different screen sizes

## Accessibility

The Textarea component:

- Uses the native `<textarea>` element
- Supports accessible labeling through an associated `<label>`
- Provides a visible focus indicator
- Supports required and disabled states
- Associates helper and error messages with the textarea where applicable
- Preserves native keyboard interaction
- Supports assistive technology through semantic HTML and ARIA attributes where required

## Usage

```tsx
import { Textarea } from './components/FormControls/Textarea';

<Textarea id="message" label="Message" name="message" rows={5} />;
```
