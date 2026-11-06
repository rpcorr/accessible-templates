# Textarea

An accessible textarea component for multi-line text input, designed with semantic HTML, keyboard accessibility, visible focus indicators, and accessible form labeling.

## Features

- Uses a native `<textarea>` element
- Keyboard accessible
- Supports accessible labels
- Supports required, disabled, and read-only states
- Supports placeholder text
- Supports validation and error messaging
- Supports helper and description text
- Supports minimum and maximum character limits
- Provides an optional character counter when `showCharacterCount` is enabled and `maxLength` is provided
- Updates the character count as users type
- Supports optional automatic height adjustment through the `autoResize` prop
- Automatically expands as content is entered and shrinks when content is removed
- Retains native vertical resizing when automatic resizing is disabled
- Supports controlled and uncontrolled usage
- Supports custom row heights
- Forwards refs to the native textarea element
- Responsive across different screen sizes

## Accessibility

The Textarea component:

- Uses the native `<textarea>` element
- Supports accessible labeling through an associated `<label>`
- Provides a visible focus indicator
- Supports required, disabled, and read-only states
- Associates description, error, and character count text with the textarea using `aria-describedby` where applicable
- Uses `aria-invalid` when an error is present
- Preserves native keyboard interaction
- Uses native HTML character limits through `maxLength` and `minLength`
- Makes the initial character count available to screen-reader users
- Avoids continuous live announcements when the character count changes, reducing unnecessary interruptions for screen-reader users
- Supports assistive technology through semantic HTML and ARIA attributes where required

## Usage

```tsx
import { Textarea } from './components/FormControls/Textarea';

<Textarea id="message" label="Message" name="message" rows={5} />;
```

## Character Count

Enable the optional character counter by setting `showCharacterCount` and providing a `maxLength`.

```tsx
<Textarea
  id="biography"
  label="Biography"
  name="biography"
  description="Tell us a little about yourself."
  maxLength={200}
  showCharacterCount
/>
```

The counter displays the current character count and maximum character limit. It updates as the user types and is associated with the textarea for assistive technology.

The initial character count is available to screen-reader users when the textarea receives focus. The counter does not use continuous live announcements.

## Auto-Resizing

Enable automatic height adjustment by setting the `autoResize` prop.

```tsx
<Textarea
  id="comments"
  label="Comments"
  name="comments"
  rows={2}
  placeholder="Enter your comments..."
  autoResize
/>
```

When enabled:

- The textarea expands vertically as content is entered.
- The textarea shrinks when content is removed.
- The initial height is based on the configured `rows` value and existing content.
- Manual resizing is disabled while automatic resizing is active.

When `autoResize` is omitted or set to `false`, the textarea retains its default behaviour and allows native vertical resizing.

## Controlled Usage

The component supports controlled input through the `value` and `onChange` props.

```tsx
import { useState } from 'react';
import { Textarea } from './components/FormControls/Textarea';

function MessageForm() {
  const [message, setMessage] = useState('');

  return <Textarea label="Message" value={message} onChange={setMessage} />;
}
```
