import { useEffect, useRef, useState, type FormEvent } from 'react';

import styles from './RegistrationFormExamples.module.css';
import { Alert } from '../../components/ContentFeedback/Alert';
import { Button } from '../../components/ButtonsActions/Button';
import { Checkbox } from '../../components/FormControls/Checkbox';
import { PasswordInput } from '../../components/FormControls/PasswordInput';
import { RadioGroup } from '../../components/FormControls/RadioGroup';
import { Select } from '../../components/FormControls/Select';
import { TextInput } from '../../components/FormControls/TextInput';

const passwordRequirements = [
  {
    id: 'length',
    label: 'At least 12 characters',
    validate: (password: string) => password.length >= 12,
  },
  {
    id: 'uppercase',
    label: 'At least one uppercase letter',
    validate: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'At least one lowercase letter',
    validate: (password: string) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'At least one number',
    validate: (password: string) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'At least one special character',
    validate: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
];

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [country, setCountry] = useState('');
  const [accountType, setAccountType] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [errors]);

  const clearFieldError = (field: string) => {
    setErrors((previous) => {
      if (!previous[field]) return previous;

      const updatedErrors = { ...previous };
      delete updatedErrors[field];

      return updatedErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Enter your first name.';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Enter your last name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    const passwordMeetsRequirements = passwordRequirements.every(
      (requirement) => requirement.validate(password),
    );

    if (!passwordMeetsRequirements) {
      newErrors.password = 'Your password does not meet all the requirements.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!country) {
      newErrors.country = 'Select your country.';
    }

    if (!accountType) {
      newErrors.accountType = 'Select an account type.';
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = 'You must agree to the terms and conditions.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});

    // Clear the form fields.
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCountry('');
    setAccountType('');
    setTermsAccepted(false);

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
                value={firstName}
                onChange={(value) => {
                  setFirstName(value);
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
                value={lastName}
                onChange={(value) => {
                  setLastName(value);
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
                value={email}
                onChange={(value) => {
                  setEmail(value);
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
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  clearFieldError('password');
                }}
                autoComplete="new-password"
                error={errors.password}
                required
                requirements={passwordRequirements}
                showStrength
              />

              <PasswordInput
                ref={confirmPasswordRef}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
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
                value={country}
                onChange={(value) => {
                  setCountry(value);
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
                value={accountType}
                onChange={(value) => {
                  setAccountType(value);
                  clearFieldError('accountType');
                }}
                required
                error={errors.accountType}
              />

              <Checkbox
                id="termsAccepted"
                name="termsAccepted"
                label="I agree to the terms and conditions"
                checked={termsAccepted}
                onChange={(event) => {
                  setTermsAccepted(event.target.checked);
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
