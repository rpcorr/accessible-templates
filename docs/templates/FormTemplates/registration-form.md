# Registration Form

The Registration Form template demonstrates an accessible, configuration-driven registration form built with reusable form components.

It supports different field types, configurable field groups, client-side validation, password requirements, an accessible error summary, and submission feedback. Fields and their behaviour are defined through configuration rather than being hardcoded into the form implementation.

## Features

- Configuration-driven form fields and field groups.
- Support for text, email, telephone, password, select, checkbox, and textarea fields.
- Configurable field labels, descriptions, placeholders, and required settings.
- Configurable minimum and maximum character limits for supported text fields.
- Configurable textarea rows, character count, and auto-resize behaviour.
- Field-specific password requirements and password confirmation.
- Client-side validation on form submission.
- Error summary with links to invalid fields.
- Focus management that moves focus to the error summary after an unsuccessful submission.
- Inline field error messages associated with their respective fields.
- Field errors cleared when users correct their input.
- Success feedback announced through a polite live region.
- Semantic form structure using fieldsets and legends.
- Responsive layout.

## Supported field types

The form supports the following field types:

| Field type | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `text`     | Standard text input for information such as names.                            |
| `email`    | Email address input with email format validation.                             |
| `tel`      | Telephone number input.                                                       |
| `password` | Password input with configurable requirements and optional strength feedback. |
| `select`   | Select control populated with configured options.                             |
| `checkbox` | Checkbox control for agreement or other selection requirements.               |
| `textarea` | Multiline text input with optional character count and auto-resize behaviour. |

Fields are defined through configuration, allowing different forms to use different combinations of field types.

## Configuration

The form uses a configuration object to define its fields and their behaviour.

Each field can be configured independently. Depending on its type, available properties include:

- `id` – Unique identifier for the field.
- `name` – Field name used to identify its submitted value.
- `label` – Visible field label.
- `type` – Field type.
- `required` – Determines whether the field must be completed.
- `group` – Identifies the field group.
- `options` – Options for select fields.
- `placeholder` – Optional placeholder text.
- `description` – Additional explanatory text.
- `disabled` – Disables the field.
- `readOnly` – Makes the field read-only where supported.
- `minLength` – Minimum permitted character length.
- `maxLength` – Maximum permitted character length.
- `autoComplete` – Browser autocomplete setting.

Additional properties are available for specific field types.

### Textarea options

Textarea fields support:

- `rows` – Initial visible number of text rows.
- `showCharacterCount` – Displays the current character count.
- `autoResize` – Automatically adjusts the textarea height as content changes.
- `maxAutoResizeHeight` – Sets the maximum height for automatic resizing.

### Password options

Password fields support:

- `passwordRequirements` – Defines the password validation requirements.
- `matches` – Identifies another field that the current field must match, such as a password confirmation field.

### Field grouping

Related fields can be assigned to groups through their configuration. The form uses fieldsets and legends to provide semantic grouping without requiring fixed groups in the implementation.

## Data sources

Select field options are provided through the field configuration.

For example, country and account type options can be maintained separately in `src/data/registrationFormData.ts` and imported into the configuration.

Keeping static option data separate from the form implementation makes it easier to maintain and reuse.

## Validation

Validation takes place when the user submits the form. The form uses `noValidate` so that its custom validation logic controls the error messages and error summary.

### Required fields

- Required fields must contain an appropriate value.
- Text-based fields are checked for empty or whitespace-only values.
- Required select fields must have a selected option.
- Required checkbox fields must be checked.
- Optional fields may be left blank or unselected.

### Text, email, telephone and textarea validation

Text, email, telephone and textarea fields support configurable minimum and maximum character lengths.

- `minLength` specifies the minimum permitted number of characters.
- `maxLength` specifies the maximum permitted number of characters.
- Minimum-length validation is applied when a value has been entered.
- Maximum-length validation rejects values exceeding the configured limit.
- Empty optional fields are permitted.
- Required-field validation takes precedence when a required field is empty.

Email fields also undergo email format validation when a value is entered.

### Password requirements

Password requirements are configurable for individual password fields.

The example registration form includes the following requirements:

- At least 12 characters.
- At least one uppercase letter.
- At least one lowercase letter.
- At least one number.
- At least one special character.

An optional password may be left blank. If entered, it must meet the configured password requirements.

The password field includes a strength indicator and displays the password requirements.

### Password confirmation

The `matches` property allows a field to be compared with another field.

The example uses this functionality to confirm the password:

- The confirmation field must be completed when configured as required.
- If a password is entered, confirmation is required even when the confirmation field is optional.
- Both passwords must match when entered.

### Select and checkbox validation

- Required select fields must have a valid configured option selected.
- Required checkbox fields must be checked.
- Optional select and checkbox fields may be left unselected.

## Error handling

When the user submits the form with validation errors:

1. An error summary appears above the form.
2. The summary identifies the errors and provides links to the corresponding fields.
3. Focus moves to the error summary.
4. Each invalid field displays its associated inline error message.
5. Selecting an error summary link takes the user to the corresponding field.

When a user corrects a field, its existing error is cleared. Password confirmation errors are also cleared when either password field is edited.

Validation is performed again on the next submission.

## Successful submission

When all enabled fields pass validation:

- The form fields are cleared.
- The form is hidden.
- A registration success message is displayed.
- The success message is announced through a polite live region.

**Implementation note:** This is a front-end demonstration. It does not connect to a registration API, create an account, or persist submitted information.

## Accessibility

The template incorporates accessibility practices including:

- Semantic form elements and appropriate input types.
- Explicit field labels.
- Required-state communication.
- Fieldsets and legends to group related controls.
- Inline error messages associated with their respective fields.
- An error summary with links to invalid fields.
- Keyboard-accessible form controls.
- Programmatic focus management after unsuccessful submission.
- A polite live region for successful submission feedback.

**Accessibility target:** Designed and tested with WCAG 2.2 Level AA accessibility requirements in mind.

The template should be manually reviewed using keyboard navigation and NVDA screen reader testing. Automated tests alone do not establish complete WCAG conformance.

## Components used

The Registration Form uses the following reusable components:

- `Alert`
- `Button`
- `Checkbox`
- `PasswordInput`
- `Select`
- `TextInput`
- `Textarea`

## Files

- `RegistrationFormExamples.tsx` – Registration form implementation and examples.
- `RegistrationFormExamples.module.css` – Component styling.
- `registrationFormValidation.ts` – Field configuration types, password requirements, initial values, and validation logic.
- `src/data/registrationFormData.ts` – Static option data used by the registration examples.
- `RegistrationFormExample.test.tsx` – Automated tests covering rendering, configuration, validation, field behaviour, and submission feedback.
