export const passwordRequirements = [
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

export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  accountType: string;
  termsAccepted: boolean;
};

export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationFormValues, string>
>;

export function validateRegistrationForm(
  values: RegistrationFormValues,
): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'Enter your first name.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Enter your last name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  const passwordMeetsRequirements = passwordRequirements.every((requirement) =>
    requirement.validate(values.password),
  );

  if (!passwordMeetsRequirements) {
    errors.password = 'Your password does not meet all the requirements.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!values.country) {
    errors.country = 'Select your country.';
  }

  if (!values.accountType) {
    errors.accountType = 'Select an account type.';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must agree to the terms and conditions.';
  }

  return errors;
}
