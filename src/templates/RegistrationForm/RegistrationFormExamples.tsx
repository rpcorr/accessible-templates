import { useState, type FormEvent } from 'react';

import styles from './RegistrationFormExamples.module.css';
import { Alert } from '../../components/ContentFeedback/Alert';
import { TextInput } from '../../components/FormControls/TextInput';
import { Button } from '../../components/ButtonsActions/Button';
import { PasswordInput } from '../../components/FormControls/PasswordInput';

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

export function RegistrationFormExample() {
  const [submitted, setSubmitted] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setSubmitted(false);
      return;
    }

    setPasswordError('');
    setSubmitted(true);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Create an account</h2>
        <p>Complete the form below to register.</p>
      </header>

      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted && (
          <Alert variant="success" title="Registration successful">
            Your registration form has been submitted successfully.
          </Alert>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <h3>Personal information</h3>

          <TextInput
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName}
            onChange={setFirstName}
            autoComplete="given-name"
            required
          />

          <TextInput
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={setLastName}
            autoComplete="family-name"
            required
          />

          <TextInput
            id="email"
            name="email"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <h3>Password</h3>

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
            requirements={passwordRequirements}
            showStrength
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={(value: string) => {
              setConfirmPassword(value);
            }}
            autoComplete="new-password"
            required
            error={passwordError}
          />
        </div>

        <Button type="submit">Create account</Button>
      </form>
    </section>
  );
}

export default RegistrationFormExample;
