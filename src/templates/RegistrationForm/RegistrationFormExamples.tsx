import { useEffect, useRef, useState, type FormEvent } from 'react';

import styles from './RegistrationFormExamples.module.css';
import { Alert } from '../../components/ContentFeedback/Alert';
import { Button } from '../../components/ButtonsActions/Button';
import { Checkbox } from '../../components/FormControls/Checkbox';
import { PasswordInput } from '../../components/FormControls/PasswordInput';
import { RadioGroup } from '../../components/FormControls/RadioGroup';
import { Select } from '../../components/FormControls/Select';
import { TextInput } from '../../components/FormControls/TextInput';
import {
  passwordRequirements,
  validateRegistrationForm,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from './registrationFormValidation';

const countryOptions = [
  { value: 'canada', label: 'Canada' },
  { value: 'united-states', label: 'United States' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'australia', label: 'Australia' },
  { value: 'other', label: 'Other' },
];

const accountTypeOptions = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
];

export function RegistrationFormExample() {
  const [submitted, setSubmitted] = useState(false);

  const [formValues, setFormValues] = useState<RegistrationFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    accountType: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [errors]);

  const clearFieldError = (field: keyof RegistrationFormValues) => {
    setErrors((previous) => {
      if (!previous[field]) return previous;

      const updatedErrors = { ...previous };
      delete updatedErrors[field];

      return updatedErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validateRegistrationForm(formValues);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});

    // Clear the form fields.
    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      accountType: '',
      termsAccepted: false,
    });

    // Display the success message and hide the form.
    setSubmitted(true);
  };

  return (
    <section className={styles.container}>
      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <Alert variant="success" title="Registration successful">
            Your registration form has been submitted successfully.
          </Alert>
        )}
      </div>

      {!submitted && (
        <>
          {Object.keys(errors).length > 0 && (
            <div
              id="registration-error-summary"
              ref={errorSummaryRef}
              className={styles.errorSummary}
              role="alert"
              tabIndex={-1}
              aria-labelledby="error-summary-title"
            >
              <h3 id="error-summary-title">
                There is a problem submitting the form
              </h3>

              <p>Please correct the following errors:</p>

              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form
            className={styles.form}
            aria-labelledby="registration-form-title"
            noValidate
            onSubmit={handleSubmit}
          >
            <header className={styles.header}>
              <h2 id="registration-form-title">Create an account</h2>
              <p>Complete the form below to register.</p>
            </header>

            <fieldset className={styles.fieldGroup}>
              <legend>Personal information</legend>

              <TextInput
                id="firstName"
                name="firstName"
                label="First name"
                value={formValues.firstName}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    firstName: value,
                  }));
                  clearFieldError('firstName');
                }}
                autoComplete="given-name"
                required
                error={errors.firstName}
              />

              <TextInput
                id="lastName"
                name="lastName"
                label="Last name"
                value={formValues.lastName}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    lastName: value,
                  }));
                  clearFieldError('lastName');
                }}
                autoComplete="family-name"
                required
                error={errors.lastName}
              />

              <TextInput
                id="email"
                name="email"
                label="Email address"
                type="email"
                value={formValues.email}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    email: value,
                  }));
                  clearFieldError('email');
                }}
                autoComplete="email"
                required
                error={errors.email}
              />
            </fieldset>

            <fieldset className={styles.fieldGroup}>
              <legend>Account security</legend>

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                value={formValues.password}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    password: value,
                  }));
                  clearFieldError('password');
                }}
                autoComplete="new-password"
                error={errors.password}
                required
                requirements={passwordRequirements}
                showStrength
              />

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                value={formValues.confirmPassword}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    confirmPassword: value,
                  }));
                  clearFieldError('confirmPassword');
                }}
                autoComplete="new-password"
                required
                error={errors.confirmPassword}
              />
            </fieldset>

            <fieldset className={styles.fieldGroup}>
              <legend>Account preferences</legend>

              <Select
                id="country"
                name="country"
                label="Country"
                options={countryOptions}
                value={formValues.country}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    country: value,
                  }));
                  clearFieldError('country');
                }}
                placeholder="Select a country"
                required
                error={errors.country}
              />

              <RadioGroup
                id="accountType"
                name="accountType"
                label="Account type"
                options={accountTypeOptions}
                value={formValues.accountType}
                onChange={(value) => {
                  setFormValues((previous) => ({
                    ...previous,
                    accountType: value,
                  }));
                  clearFieldError('accountType');
                }}
                required
                error={errors.accountType}
              />

              <Checkbox
                id="termsAccepted"
                name="termsAccepted"
                label="I agree to the terms and conditions"
                checked={formValues.termsAccepted}
                onChange={(event) => {
                  setFormValues((previous) => ({
                    ...previous,
                    termsAccepted: event.target.checked,
                  }));
                  clearFieldError('termsAccepted');
                }}
                required
                error={errors.termsAccepted}
              />
            </fieldset>

            <Button type="submit">Create account</Button>
          </form>
        </>
      )}
    </section>
  );
}

export default RegistrationFormExample;
