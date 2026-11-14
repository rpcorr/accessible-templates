import { useState } from 'react';
import { MultiStepForm } from '../MultiStepForm';
import type { MultiStepFormStep } from '../MultiStepForm';
import { TextInput } from '../../TextInput/TextInput';
import { Checkbox } from '../../Checkbox/Checkbox';

interface RegistrationValues {
  fullName: string;
  email: string;
  phone: string;
  receiveUpdates: boolean;
}

const initialValues: RegistrationValues = {
  fullName: '',
  email: '',
  phone: '',
  receiveUpdates: false,
};

export function MultiStepFormExamples() {
  const [values, setValues] = useState<RegistrationValues>(initialValues);

  const steps: MultiStepFormStep<RegistrationValues>[] = [
    {
      id: 'personal-information',
      title: 'Personal Information',
      description: 'Enter your contact details.',

      content: ({ errors }) => (
        <>
          <TextInput
            id="fullName"
            label="Full name"
            name="fullName"
            value={values.fullName}
            onChange={(value) =>
              setValues((previous) => ({
                ...previous,
                fullName: value,
              }))
            }
            autoComplete="name"
            required
            error={errors.fullName}
          />

          <TextInput
            id="email"
            label="Email address"
            name="email"
            type="email"
            value={values.email}
            onChange={(value) =>
              setValues((previous) => ({
                ...previous,
                email: value,
              }))
            }
            autoComplete="email"
            required
            error={errors.email}
          />

          <TextInput
            id="phone"
            label="Phone number (optional)"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(value) =>
              setValues((previous) => ({
                ...previous,
                phone: value,
              }))
            }
            autoComplete="tel"
          />
        </>
      ),

      validate: (formValues) => {
        const errors: Record<string, string> = {};

        if (!formValues.fullName.trim()) {
          errors.fullName = 'Enter your full name.';
        }

        if (!formValues.email.trim()) {
          errors.email = 'Enter your email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
          errors.email = 'Enter a valid email address.';
        }

        return errors;
      },
    },

    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Choose how you would like to receive updates.',

      content: () => (
        <Checkbox
          id="receiveUpdates"
          name="receiveUpdates"
          label="Receive email updates"
          description="Receive occasional news and updates about our services."
          checked={values.receiveUpdates}
          onChange={(event) =>
            setValues((previous) => ({
              ...previous,
              receiveUpdates: event.target.checked,
            }))
          }
        />
      ),
    },

    {
      id: 'review',
      title: 'Review and Submit',
      description: 'Review your information before submitting.',

      content: () => (
        <div>
          <h3>Personal Information</h3>

          <p>
            <strong>Full name:</strong> {values.fullName}
          </p>

          <p>
            <strong>Email address:</strong> {values.email}
          </p>

          <p>
            <strong>Phone number:</strong> {values.phone || 'Not provided'}
          </p>

          <h3>Preferences</h3>

          <p>
            <strong>Email updates:</strong>{' '}
            {values.receiveUpdates ? 'Yes' : 'No'}
          </p>
        </div>
      ),
    },
  ];

  const handleSubmit = async (submittedValues: RegistrationValues) => {
    // Replace with an API request or other submission logic.
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
