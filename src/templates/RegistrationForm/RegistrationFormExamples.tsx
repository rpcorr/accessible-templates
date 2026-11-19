import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

import styles from './RegistrationFormExamples.module.css';
import { Alert } from '../../components/ContentFeedback/Alert';
import { Button } from '../../components/ButtonsActions/Button';
import { Checkbox } from '../../components/FormControls/Checkbox';
import { PasswordInput } from '../../components/FormControls/PasswordInput';
import { RadioGroup } from '../../components/FormControls/RadioGroup';
import { Select } from '../../components/FormControls/Select';
import { TextInput } from '../../components/FormControls/TextInput';
import {
  defaultRegistrationFormConfig,
  passwordRequirements,
  validateRegistrationForm,
  type RegistrationFormConfig,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from './registrationFormValidation';
import {
  accountTypeOptions,
  countryOptions,
} from '../../data/registrationFormExampleData';

type RegistrationFormExampleProps = {
  config?: RegistrationFormConfig;
};

const initialFormValues: RegistrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  accountType: '',
  termsAccepted: false,
};

export function RegistrationFormExample({
  config = defaultRegistrationFormConfig,
}: RegistrationFormExampleProps) {
  const idPrefix = useId().replace(/:/g, '');

  const [submitted, setSubmitted] = useState(false);

  const [formValues, setFormValues] =
    useState<RegistrationFormValues>(initialFormValues);

  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const shouldFocusErrorSummaryRef = useRef(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldFocusErrorSummaryRef.current && Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus({ preventScroll: true });

      errorSummaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      shouldFocusErrorSummaryRef.current = false;
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

  const updateField = <K extends keyof RegistrationFormValues>(
    field: K,
    value: RegistrationFormValues[K],
  ) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    clearFieldError(field);
  };

  const updatePasswordField = (
    field: 'password' | 'confirmPassword',
    value: string,
  ) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      const updatedErrors = { ...previous };

      delete updatedErrors[field];
      delete updatedErrors.confirmPassword;

      return updatedErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = validateRegistrationForm(formValues, config);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      shouldFocusErrorSummaryRef.current = true;
      return;
    }

    setErrors({});
    shouldFocusErrorSummaryRef.current = false;

    // Clear the form fields.
    setFormValues(initialFormValues);

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
              id={`${idPrefix}-error-summary`}
              ref={errorSummaryRef}
              className={styles.errorSummary}
              role="alert"
              tabIndex={-1}
              aria-labelledby={`${idPrefix}-error-summary-title`}
            >
              <h3 id={`${idPrefix}-error-summary-title`}>
                There is a problem submitting the form
              </h3>

              <p>Please correct the following errors:</p>

              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>
                    <a href={`#${idPrefix}-${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form
            className={styles.form}
            aria-labelledby={`${idPrefix}-registration-form-title`}
            noValidate
            onSubmit={handleSubmit}
          >
            <header className={styles.header}>
              <h2 id={`${idPrefix}-registration-form-title`}>
                Create an account
              </h2>
              <p>Complete the form below to register.</p>
            </header>

            {(config.firstName.enabled ||
              config.lastName.enabled ||
              config.email.enabled) && (
              <fieldset className={styles.fieldGroup}>
                <legend>Personal information</legend>

                {config.firstName.enabled && (
                  <TextInput
                    id={`${idPrefix}-firstName`}
                    name="firstName"
                    label="First name"
                    value={formValues.firstName}
                    onChange={(value) => updateField('firstName', value)}
                    autoComplete="given-name"
                    required={config.firstName.required}
                    error={errors.firstName}
                  />
                )}

                {config.lastName.enabled && (
                  <TextInput
                    id={`${idPrefix}-lastName`}
                    name="lastName"
                    label="Last name"
                    value={formValues.lastName}
                    onChange={(value) => updateField('lastName', value)}
                    autoComplete="family-name"
                    required={config.lastName.required}
                    error={errors.lastName}
                  />
                )}

                {config.email.enabled && (
                  <TextInput
                    id={`${idPrefix}-email`}
                    name="email"
                    label="Email address"
                    type="email"
                    value={formValues.email}
                    onChange={(value) => updateField('email', value)}
                    autoComplete="email"
                    required={config.email.required}
                    error={errors.email}
                  />
                )}
              </fieldset>
            )}

            {(config.password.enabled || config.confirmPassword.enabled) && (
              <fieldset className={styles.fieldGroup}>
                <legend>Account security</legend>

                {config.password.enabled && (
                  <PasswordInput
                    id={`${idPrefix}-password`}
                    name="password"
                    label="Password"
                    value={formValues.password}
                    onChange={(value) => updatePasswordField('password', value)}
                    autoComplete="new-password"
                    error={errors.password}
                    required={config.password.required}
                    requirements={passwordRequirements}
                    showStrength
                  />
                )}

                {config.confirmPassword.enabled && (
                  <PasswordInput
                    id={`${idPrefix}-confirmPassword`}
                    name="confirmPassword"
                    label="Confirm password"
                    value={formValues.confirmPassword}
                    onChange={(value) =>
                      updatePasswordField('confirmPassword', value)
                    }
                    autoComplete="new-password"
                    required={config.confirmPassword.required}
                    error={errors.confirmPassword}
                  />
                )}
              </fieldset>
            )}

            {(config.country.enabled ||
              config.accountType.enabled ||
              config.termsAccepted.enabled) && (
              <fieldset className={styles.fieldGroup}>
                <legend>Account preferences</legend>

                {config.country.enabled && (
                  <Select
                    id={`${idPrefix}-country`}
                    name="country"
                    label="Country"
                    options={countryOptions}
                    value={formValues.country}
                    onChange={(value) => updateField('country', value)}
                    placeholder="Select a country"
                    required={config.country.required}
                    error={errors.country}
                  />
                )}

                {config.accountType.enabled && (
                  <RadioGroup
                    id={`${idPrefix}-accountType`}
                    name="accountType"
                    label="Account type"
                    options={accountTypeOptions}
                    value={formValues.accountType}
                    onChange={(value) => updateField('accountType', value)}
                    required={config.accountType.required}
                    error={errors.accountType}
                  />
                )}

                {config.termsAccepted.enabled && (
                  <Checkbox
                    id={`${idPrefix}-termsAccepted`}
                    name="termsAccepted"
                    label="I agree to the terms and conditions"
                    checked={formValues.termsAccepted}
                    onChange={(event) =>
                      updateField('termsAccepted', event.target.checked)
                    }
                    required={config.termsAccepted.required}
                    error={errors.termsAccepted}
                  />
                )}
              </fieldset>
            )}

            <Button type="submit">Create account</Button>
          </form>
        </>
      )}
    </section>
  );
}

export default RegistrationFormExample;
