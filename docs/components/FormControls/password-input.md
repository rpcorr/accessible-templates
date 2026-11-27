# Password Input

The Password Input component provides an accessible way for users to enter and edit passwords. It uses a native HTML password input and includes an optional visibility toggle that allows users to show or hide their entered password. It supports controlled and uncontrolled values, validation constraints, autocomplete, descriptions, error messaging, configurable password requirements, and password strength estimation.

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
- Configurable password requirements using custom validation functions.
- Two password requirement display modes:
  - Checklist mode displays all requirements with individual status indicators.
  - Single-message mode displays a summary, the first unmet requirement, or a success message.
- Password strength estimation using the zxcvbn library.
- Five-level password strength indicator with a visual meter and text label.
- Delayed screen-reader announcements for password requirement and strength changes.
- Visible keyboard focus styling.
- Screen reader support.

## Accessibility

The Password Input component uses native HTML form controls and semantic elements to provide an accessible password entry experience.

- **Label association:** The input has an accessible label that identifies its purpose.
- **Password visibility:** A dedicated button allows users to show or hide the entered password without changing its value.
- **Toggle state:** The visibility button uses `aria-pressed` to communicate whether the password is currently visible.
- **Dynamic accessible name:** The button's accessible name changes between "Show password" and "Hide password" to reflect its action.
- **Focus management:** Activating the visibility toggle preserves focus on the password input.
- **Description:** Optional descriptive text is associated with the input using `aria-describedby`.
- **Error messaging:** Validation errors are associated with the input and communicated using `aria-invalid` and `aria-describedby`.
- **Required state:** The native `required` attribute communicates that a password is required.
- **Disabled state:** The native `disabled` attribute prevents interaction with the input.
- **Read-only state:** The native `readOnly` attribute allows users to view the password without editing it.
- **Password requirements:** Configured requirements communicate which password rules have been satisfied. Developers can choose between checklist and single-message display modes.
- **Requirements announcements:** Polite screen-reader announcements communicate requirement changes after the user pauses typing.
- **Password strength:** The strength indicator provides both a text label and a visual meter, ensuring strength is not communicated through colour alone.
- **Strength announcements:** A polite screen-reader announcement communicates changes in the estimated password strength after the user pauses typing.
- **Screen reader support:** Native input semantics, accessible descriptions, and status announcements communicate the input's purpose and relevant password information.

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
- The password is hidden again when the pointer leaves the input wrapper.

## Password Requirements

The component optionally supports configurable password requirements.

Developers define individual requirements using an identifier, descriptive label, and validation function.

Two display modes are available through the `requirementDisplay` prop:

### Checklist mode

Set `requirementDisplay="list"` to display all configured password requirements.

- Each requirement is evaluated against the current password value.
- Each requirement displays whether it has been met.
- Requirement statuses update as the user enters a password.
- Screen-reader announcements communicate requirement changes and overall progress after the user pauses typing.

Checklist mode is the default when `requirementDisplay` is not specified.

### Single-message mode

Set `requirementDisplay="message"` to display password requirements one message at a time.

- When the password is empty, a summary communicates all configured requirements.
- As the user types, the first unmet requirement is displayed.
- When a requirement is satisfied, the message advances to the next unmet requirement.
- When all requirements are satisfied, a success message is displayed.
- Polite screen-reader announcements communicate message changes after the user pauses typing.

The component does not impose a fixed set of password rules. Developers define requirements appropriate to their application.

## Password Strength

The component optionally provides a password strength indicator using the zxcvbn password estimation library.

The estimator evaluates the password and returns one of five strength levels:

| Score | Strength    |
| ----- | ----------- |
| 0     | Very weak   |
| 1     | Weak        |
| 2     | Fair        |
| 3     | Strong      |
| 4     | Very strong |

- A visual meter represents the estimated strength.
- A visible text label communicates the strength level.
- The meter exposes its value and text equivalent to assistive technologies.
- Screen readers receive a polite announcement when the estimated strength changes after the user pauses typing.

Password strength is an estimate, not a guarantee of security. Developers should select appropriate password requirements and validation policies for their applications.

## Validation

The component supports native HTML validation attributes:

- `required` makes password entry mandatory.
- `minLength` specifies the minimum number of characters.
- `maxLength` specifies the maximum number of characters.
- `error` displays an associated validation error message.

Custom password requirements are configurable separately from native HTML validation constraints.

## Autocomplete

The component supports the native HTML `autoComplete` attribute to help browsers and password managers identify the intended password field.

Common values include:

| Value              | Purpose                                                 |
| ------------------ | ------------------------------------------------------- |
| `current-password` | Identifies a field for an existing password.            |
| `new-password`     | Identifies a field for creating or changing a password. |

## Related Component

- [Text Input](text-input.md) – A general-purpose text input component supporting multiple input types, validation constraints, descriptions, and error messaging.
