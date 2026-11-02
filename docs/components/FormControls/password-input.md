# Password Input

The Password Input component provides an accessible way for users to enter and edit passwords. It uses a native HTML password input and includes an optional visibility toggle that allows users to show or hide their entered password. It supports controlled and uncontrolled values, validation constraints, autocomplete, descriptions, and error messaging.

## Features

- Native HTML password input semantics.
- Accessible label association.
- Show and hide password functionality.
- Visibility toggle implemented with a native button.
- Dynamic toggle labels (`Show password` and `Hide password`).
- `aria-pressed` state communicates the visibility toggle state.
- Controlled and uncontrolled values.
- Required, disabled, and read-only states.
- Optional description and error messaging.
- Minimum and maximum character length constraints.
- Autocomplete support for current and new passwords.
- Visible keyboard focus styling.
- Screen reader support.

## Accessibility

The Password Input component uses native HTML form controls and semantic elements to provide an accessible password entry experience.

- **Label association:** The input has an accessible label that identifies its purpose.
- **Password visibility:** A dedicated button allows users to show or hide the entered password without changing its value.
- **Toggle state:** The visibility button uses `aria-pressed` to communicate whether the password is currently visible.
- **Dynamic accessible name:** The button's accessible name changes between "Show password" and "Hide password" to reflect its action.
- **Description:** Optional descriptive text is associated with the input using `aria-describedby`.
- **Error messaging:** Validation errors are associated with the input and communicated using `aria-invalid` and `aria-describedby`.
- **Required state:** The native `required` attribute communicates that a password is required.
- **Disabled state:** The native `disabled` attribute prevents interaction with the input.
- **Read-only state:** The native `readOnly` attribute allows users to view the password without editing it.
- **Focus management:** Activating the visibility toggle preserves focus on the password input.
- **Screen reader support:** Native input semantics and accessible button attributes communicate the input's purpose and visibility state.

## Keyboard Support

The component supports standard keyboard interaction:

| Key         | Behaviour                                                      |
| ----------- | -------------------------------------------------------------- |
| Tab         | Moves focus between the password input and visibility toggle.  |
| Shift + Tab | Moves focus backwards through the input and visibility toggle. |
| Enter       | Activates the visibility toggle when the button has focus.     |
| Space       | Activates the visibility toggle when the button has focus.     |

## Password Visibility

The visibility toggle allows users to switch between masked and visible password text.

- By default, the password is masked using the native password input type.
- Activating the visibility button changes the input type to text.
- Activating the button again restores password masking.
- The entered password value is preserved when switching between visibility states.
- The button's accessible name and `aria-pressed` state update to reflect the current visibility state.

## Validation

The component supports native HTML validation attributes:

- `required` makes password entry mandatory.
- `minLength` specifies the minimum number of characters.
- `maxLength` specifies the maximum number of characters.
- `error` displays an associated validation error message.

## Autocomplete

The component supports the native HTML `autoComplete` attribute to help browsers and password managers identify the intended password field.

Common values include:

| Value              | Purpose                                                 |
| ------------------ | ------------------------------------------------------- |
| `current-password` | Identifies a field for an existing password.            |
| `new-password`     | Identifies a field for creating or changing a password. |

## Related Component

- [Text Input](text-input.md) – A general-purpose text input component supporting multiple input types, validation constraints, descriptions, and error messaging.
