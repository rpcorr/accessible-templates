# Registration Form

The Registration Form template demonstrates an accessible account registration form built with reusable form components.

It includes configurable fields, client-side validation, password-strength requirements, an error summary, and submission feedback.

## Features

- Eight configurable form fields.
- Independent field visibility and required settings.
- Client-side validation on form submission.
- Password-strength requirements and password confirmation.
- Error summary with links to invalid fields.
- Focus management that moves focus to the error summary after an unsuccessful submission.
- Inline field error messages.
- Success feedback announced through a live region.
- Semantic form structure using fieldsets and legends.
- Responsive layout.

## Fields

The form contains eight fields organized into three logical groups.

| Section              | Field            | Description                       |
| -------------------- | ---------------- | --------------------------------- |
| Personal information | First name       | User's first name                 |
| Personal information | Last name        | User's last name                  |
| Personal information | Email address    | User's email address              |
| Account security     | Password         | New account password              |
| Account security     | Confirm password | Confirms the entered password     |
| Account preferences  | Country          | Country selection                 |
| Account preferences  | Account type     | Personal or business account      |
| Account preferences  | Terms acceptance | Agreement to terms and conditions |

## Data sources

Static option data is maintained separately from the form implementation in `src/data/registrationFormData.ts`.

This file exports:

- `countryOptions` – Options displayed in the Country select field.
- `accountTypeOptions` – Options displayed in the Account type radio group.

The form imports these datasets and passes them to the corresponding reusable components. Keeping static data in `src/data/` separates content from presentation and makes it easier to maintain and reuse.

## Configuration

Each field has two configuration properties:

- `enabled`: Determines whether the field is displayed.
- `required`: Determines whether the field must be completed.

By default, all fields are enabled and required.

### Default configuration

```tsx
import { defaultRegistrationFormConfig } from './registrationFormValidation';

const config = defaultRegistrationFormConfig;
```

### Custom configuration

The following example disables the last name field and makes the email address optional.

```tsx
import {
  defaultRegistrationFormConfig,
  type RegistrationFormConfig,
} from './registrationFormValidation';

const customConfig: RegistrationFormConfig = {
  ...defaultRegistrationFormConfig,
  lastName: {
    enabled: false,
    required: false,
  },
  email: {
    enabled: true,
    required: false,
  },
};
```

Pass the configuration to the example component:

```tsx
<RegistrationFormExample config={customConfig} />
```

A disabled field is excluded from validation and is not displayed.

## Validation

Validation takes place when the user submits the form. The form uses `noValidate` so that its custom validation logic controls the error messages and error summary.

### Personal information

- First name and last name are checked for empty or whitespace-only values when required.
- Email is required when configured as required.
- An optional email address may be left blank, but must have a valid email format if entered.

### Password requirements

Passwords must meet the following requirements:

- At least 12 characters.
- At least one uppercase letter.
- At least one lowercase letter.
- At least one number.
- At least one special character.

An optional password may be left blank. If entered, it must meet all password requirements.

The password field includes a strength indicator and displays the password requirements.

### Password confirmation

- Confirmation is required when the confirmation field is configured as required.
- If a password is entered, confirmation is required even when the confirmation field is optional.
- Both passwords must match when entered.

### Account preferences

- Country must be selected when required.
- Account type must be selected when required.
- Terms and conditions must be accepted when required.

Optional fields may be left blank or unselected.

## Error handling

When the user submits the form with validation errors:

1. An error summary appears above the form.
2. The summary identifies the errors and provides links to the corresponding fields.
3. Focus moves to the error summary.
4. Each invalid field displays its associated inline error message.
5. Selecting an error summary link takes the user to the corresponding field.

When a user corrects a field, its existing error is cleared. Password confirmation errors are also cleared when either password field is edited. Validation is performed again on the next submission.

## Successful submission

When all enabled and required fields pass validation:

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

The template has been manually reviewed using keyboard navigation and NVDA screen reader testing. This does not constitute a claim of complete WCAG conformance.

## Components used

The Registration Form uses the following reusable components:

- `Alert`
- `Button`
- `Checkbox`
- `PasswordInput`
- `RadioGroup`
- `Select`
- `TextInput`

## Files

- `RegistrationFormExamples.tsx` – Registration form implementation.
- `RegistrationFormExamples.module.css` – Component styling.
- `registrationFormValidation.ts` – Configuration, password requirements, types, and validation logic.
- `src/data/registrationFormData.ts` – Static country and account type option data.
- `RegistrationFormExample.test.tsx` – Automated tests.
