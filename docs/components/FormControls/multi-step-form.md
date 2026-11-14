# Multi-Step Form

The Multi-Step Form component guides users through a sequence of related form steps, allowing them to enter information, navigate between sections, review their responses, and submit the completed form.

It supports parent-managed form values, individual step validation, progress indication, accessible navigation, asynchronous submission, and customizable completion feedback.

## Features

- Multi-step form navigation with Back, Next, and Submit controls.
- Parent-managed form values that persist when navigating between steps.
- Optional validation functions for individual steps.
- Error summaries with links to the corresponding form fields.
- Progress indication showing the current step and total number of steps.
- Screen reader announcements when users move between steps.
- Keyboard focus management for step headings and error summaries.
- Support for a review step before final submission.
- Asynchronous form submission.
- Submission state and error feedback.
- Customizable success message after submission.
- Accessible completion announcement following successful submission.

## Usage

The parent component manages the form values and provides the steps, validation functions, and submission handler.

```tsx
import { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import type { MultiStepFormStep } from './MultiStepForm';
import { TextInput } from '../TextInput/TextInput';

interface RegistrationValues {
  fullName: string;
  email: string;
}

export function RegistrationExample() {
  const [values, setValues] = useState<RegistrationValues>({
    fullName: '',
    email: '',
  });

  const steps: MultiStepFormStep<RegistrationValues>[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      content: () => (
        <>
          <TextInput
            id="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={(fullName) =>
              setValues((previous) => ({ ...previous, fullName }))
            }
            required
          />

          <TextInput
            id="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={(email) =>
              setValues((previous) => ({ ...previous, email }))
            }
            required
          />
        </>
      ),
      validate: (formValues) => {
        const errors: Record<string, string> = {};

        if (!formValues.fullName.trim()) {
          errors.fullName = 'Please enter your full name.';
        }

        if (!formValues.email.trim()) {
          errors.email = 'Please enter your email address.';
        }

        return errors;
      },
    },
    {
      id: 'review',
      title: 'Review and Submit',
      content: () => (
        <div>
          <h3>Review Your Information</h3>
          <p>Name: {values.fullName}</p>
          <p>Email: {values.email}</p>
        </div>
      ),
    },
  ];

  const handleSubmit = async (submittedValues: RegistrationValues) => {
    // Replace with your submission logic.
    await Promise.resolve(submittedValues);
  };

  return (
    <MultiStepForm
      steps={steps}
      values={values}
      onSubmit={handleSubmit}
      completionMessage="Your registration has been submitted successfully."
    />
  );
}
```

## Accessibility

The Multi-Step Form component is designed with accessibility in mind and incorporates the following features:

- **Semantic form structure:** Uses a native `<form>` element and semantic headings to organize each step.
- **Progress indication:** The current step is identified using `aria-current="step"`.
- **Screen reader announcements:** A polite live region announces the current step number, total number of steps, and step title when users navigate between steps.
- **Heading focus management:** Keyboard focus moves to the new step heading whenever the user moves between steps.
- **Error identification:** Validation errors are presented in an error summary with links to the corresponding form fields.
- **Error focus management:** Focus moves to the error summary when validation fails.
- **Completion announcement:** After successful submission, focus moves to the completion message, which is announced by screen readers.
- **Keyboard interaction:** Navigation controls support standard keyboard interaction, including Tab, Enter, and Space.

## Keyboard Support

| Key            | Behaviour                                                                   |
| -------------- | --------------------------------------------------------------------------- |
| Tab            | Moves focus between interactive controls.                                   |
| Shift + Tab    | Moves focus backwards between interactive controls.                         |
| Enter          | Advances to the next step when pressed in an input field, where applicable. |
| Enter          | Inserts a new line when pressed in a textarea.                              |
| Enter or Space | Activates the focused navigation button.                                    |

## Validation

Each step can define an optional `validate` function that receives the current form values and returns an object containing validation errors.

Errors are associated with field IDs and displayed in an error summary. Each error message links to its corresponding field.

Users cannot proceed to the next step until the current step passes validation.

## Submission

The final step provides a Submit button that invokes the supplied `onSubmit` callback.

The component supports synchronous or asynchronous submission handlers. While submission is in progress, the navigation controls are disabled and the Submit button displays a submitting label.

If submission fails, an error message is displayed. If submission succeeds, the form is replaced by a completion message and focus moves to that message.

## API Reference

### MultiStepForm Props

| Prop                | Type                                         | Default                                               | Description                                                     |
| ------------------- | -------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| `steps`             | `MultiStepFormStep<TValues>[]`               | Required                                              | Defines the sequence of form steps.                             |
| `values`            | `TValues`                                    | Required                                              | Current form values managed by the parent component.            |
| `onSubmit`          | `(values: TValues) => void \| Promise<void>` | Required                                              | Callback invoked when the final step is submitted successfully. |
| `completionMessage` | `string`                                     | `"Your information has been submitted successfully."` | Custom message displayed after successful submission.           |
| `isSubmitting`      | `boolean`                                    | `false`                                               | Allows the parent component to control the submitting state.    |
| `onStepChange`      | `(stepIndex: number) => void`                | `undefined`                                           | Optional callback invoked when the current step changes.        |

### MultiStepFormStep Properties

| Property      | Type                                                      | Description                                                                                  |
| ------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `id`          | `string`                                                  | Unique identifier for the step.                                                              |
| `title`       | `string`                                                  | Heading displayed for the step.                                                              |
| `description` | `string`                                                  | Optional description displayed below the heading.                                            |
| `content`     | `(context: { errors: MultiStepFormErrors }) => ReactNode` | Content rendered for the step. Receives the current validation errors.                       |
| `validate`    | `(values: TValues) => MultiStepFormErrors`                | Optional validation function that returns an object containing field IDs and error messages. |

### MultiStepFormErrors

```tsx
export type MultiStepFormErrors = Record<string, string>;
```

An object containing validation errors, where each key corresponds to a form field ID and each value contains its associated error message.

## Implementation Notes

- The parent component is responsible for managing form values and updating them as users enter information.
- Each step can define its own validation logic.
- A review step is supplied by the parent component; it is not automatically generated.
- The component does not prescribe the form fields used within each step. Developers are responsible for ensuring that individual fields have appropriate labels, instructions, and error associations.
- The component supports asynchronous submission but does not handle API requests or data storage itself.

**Accessibility target:** Designed and tested with WCAG 2.2 Level AA accessibility requirements in mind.
