# Signature Field

The Signature Field component allows users to provide a signature by drawing with a mouse, finger, or stylus, or by entering a typed signature as an alternative. It supports controlled and uncontrolled usage, clearing the signature, required and disabled states, custom instructions, and error messaging.

## Features

- Draw signatures using mouse, touch, or stylus input
- Type a signature as an alternative to drawing
- Store drawn signatures as PNG data URLs
- Distinguish drawn and typed signatures using a discriminated union
- Clear the current signature
- Support controlled and uncontrolled values
- Support required and disabled states
- Display custom instructions and error messages
- Provide visible focus styling for interactive controls
- Support CSS Modules and project design tokens
- Restore saved drawn signatures when editing an existing form

## Basic Usage

```tsx
import { useState } from 'react';
import { SignatureField } from '../../components/FormControls/SignatureField';
import type { SignatureValue } from '../../components/FormControls/SignatureField';

export function SignatureForm() {
  const [signature, setSignature] = useState<SignatureValue>(null);

  return (
    <SignatureField
      label="Your signature"
      instructions="Draw your signature or choose the typed alternative."
      value={signature}
      onChange={setSignature}
      required
    />
  );
}
```

## Props

| Prop           | Type                              | Default     | Description                                                |
| -------------- | --------------------------------- | ----------- | ---------------------------------------------------------- |
| `label`        | `string`                          | —           | Visible label describing the signature field.              |
| `value`        | `SignatureValue`                  | `undefined` | Current signature value. Omit for uncontrolled usage.      |
| `onChange`     | `(value: SignatureValue) => void` | `undefined` | Callback invoked when the signature changes or is cleared. |
| `required`     | `boolean`                         | `false`     | Indicates that a signature is required.                    |
| `disabled`     | `boolean`                         | `false`     | Disables signature interaction.                            |
| `error`        | `string`                          | `undefined` | Optional validation error message.                         |
| `instructions` | `string`                          | `undefined` | Additional instructions associated with the field.         |
| `id`           | `string`                          | Generated   | Optional HTML ID for the component container.              |
| `className`    | `string`                          | `undefined` | Optional CSS class for the component container.            |

The component also accepts other `HTMLAttributes<HTMLDivElement>` properties, except `onChange`, which is reserved for the signature value callback.

## Signature Value

The `SignatureValue` type distinguishes between drawn and typed signatures.

```tsx
export type SignatureValue =
  | {
      type: 'drawn';
      value: string;
    }
  | {
      type: 'typed';
      value: string;
    }
  | null;
```

- `drawn`: Contains a PNG data URL generated from the drawing canvas.
- `typed`: Contains the text entered by the user.
- `null`: Represents an empty or cleared signature.

For example:

```tsx
const handleSignatureChange = (value: SignatureValue) => {
  if (!value) {
    console.log('No signature provided');
    return;
  }

  if (value.type === 'drawn') {
    console.log('Drawn signature image:', value.value);
  } else {
    console.log('Typed signature:', value.value);
  }
};
```

## Controlled and Uncontrolled Usage

### Controlled

Provide `value` and `onChange` to manage the signature in the parent component.

```tsx
const [signature, setSignature] = useState<SignatureValue>(null);

<SignatureField label="Signature" value={signature} onChange={setSignature} />;
```

### Uncontrolled

Omit `value` to allow the component to manage its internal signature state.

```tsx
<SignatureField
  label="Signature"
  onChange={(value) => {
    console.log('Signature updated:', value);
  }}
/>
```

## Switching Between Signature Modes

The component allows users to switch between drawing a signature and entering a typed signature.

- Selecting **Type signature** clears the current signature and opens the typed input.
- Selecting **Draw signature instead** clears the typed signature and returns to the drawing canvas.
- Switching modes does not preserve the previous mode's signature. Applications that need to retain a signature should save its value before switching modes.

## Required and Disabled States

### Required

```tsx
<SignatureField
  label="Required signature"
  required
  instructions="Please provide your signature."
/>
```

The `required` prop indicates that a signature is expected. The consuming form should validate the value before submission and prevent submission when a required signature is missing.

### Disabled

```tsx
<SignatureField
  label="Signature"
  disabled
  instructions="Signature entry is currently unavailable."
/>
```

The disabled state should prevent drawing, typing, and clearing the signature.

## Error Messaging

Pass an error message when validation fails.

```tsx
<SignatureField
  label="Signature"
  error="Please provide a signature."
  required
/>
```

The consuming form is responsible for determining when an error should be displayed and clearing it after the user corrects the input.

## Saving and Restoring Signatures

Drawn signatures are stored as PNG data URLs, while typed signatures are stored as text. The parent application is responsible for saving the signature value and supplying it again when an existing form is edited.

For a controlled component, provide the saved value through the `value` prop.

```tsx
const savedSignature: SignatureValue = {
  type: 'drawn',
  value: savedSignatureDataUrl,
};

<SignatureField
  label="Your signature"
  value={savedSignature}
  onChange={setSignature}
/>;
```

The application must replace `savedSignatureDataUrl` with the previously saved PNG data URL.

When restoring a drawn signature, the component should load the image and draw it onto the canvas. Verify that this works with actual saved signature data in a browser, not only through automated tests.

## Persistence and Data Handling

- The component does not persist signatures independently. The consuming application is responsible for saving and retrieving signature values.
- Drawn signatures are represented by PNG data URLs, which can be relatively large.
- Typed signatures are represented as text and are not equivalent to handwritten signature images.
- Applications should protect signature data and avoid logging sensitive signature content unnecessarily.
- A signature field alone does not establish identity, consent, or legal enforceability. Applications should determine any additional requirements for their particular use case.

## Accessibility

### Labels and Instructions

- Provide a meaningful visible label for every signature field.
- Use concise instructions to explain how to draw or enter a signature.
- Make the typed-signature alternative easy to find.
- Associate instructions and error messages with the relevant input or drawing surface.

### Pointer Interaction

The drawing area uses pointer events to support mouse, touch, and stylus input. Touch interaction should be tested on real mobile devices as well as desktop browsers.

### Canvas Accessibility Limitations

Drawing with a pointer is not inherently keyboard-operable. Users who cannot draw should be able to choose the typed-signature alternative using standard keyboard controls.

The typed-signature alternative should be reachable using keyboard navigation, and the canvas should have a meaningful accessible name. Verify that instructions and validation errors are available to assistive technology. The canvas's image role should not be interpreted as evidence that drawing itself is keyboard-operable.

- Interactive buttons must be keyboard accessible.
- Focus indicators should remain clearly visible.
- Labels, instructions, and errors should be available to assistive technology.
- Changes to signature status should be communicated appropriately when relevant.

### Validation

The component's `required` prop does not replace form-level validation. The consuming application must validate the signature value and prevent submission when a required signature is missing.

## Testing Checklist

- [x] Draw with a mouse.
- [x] Draw using touch input on a mobile device.
- [x] Draw using a stylus where available.
- [x] Enter a typed signature.
- [x] Clear a drawn or typed signature.
- [x] Confirm controlled values and `onChange` callbacks behave correctly.
- [x] Confirm the required state and form-level validation work correctly.
- [x] Confirm the disabled state prevents signature interaction.
- [x] Confirm instructions and errors are announced or accessible to screen readers.
- [x] Confirm keyboard users can reach and operate all buttons.
- [x] Add an automated test for restoring a saved drawn signature.
- [ ] Verify saved-signature restoration visually in a real browser.
- [ ] Complete a final keyboard and screen-reader review across supported browsers and devices.

## Implementation Status

The component provides an initial drawing implementation, a typed-signature alternative, controlled and uncontrolled usage, and support for restoring saved drawn signatures.

Automated tests cover the component's current behaviour, including the saved-signature restoration path. Before considering the component fully complete, verify that saved signatures render correctly in a real browser, disabled behaviour is enforced on the drawing surface, and accessibility has been reviewed with keyboard navigation and screen readers.
