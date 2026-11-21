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

export type PasswordRequirement = {
  id: string;
  label: string;
  validate: (password: string) => boolean;
};

export type RegistrationField = {
  id: string;
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'password'
    | 'select'
    | 'checkbox'
    | 'textarea';
  required?: boolean;
  group?: string;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  autoComplete?: string;
  matches?: string;
  passwordRequirements?: PasswordRequirement[];
};

export type RegistrationFormValues = Record<string, string | boolean>;

export type RegistrationFormConfig = {
  fields: RegistrationField[];
};

export const defaultRegistrationFormConfig: RegistrationFormConfig = {
  fields: [],
};

export type RegistrationFormErrors = Record<string, string>;

export function validateRegistrationForm(
  values: RegistrationFormValues,
  config: RegistrationFormConfig = defaultRegistrationFormConfig,
): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  for (const field of config.fields) {
    const value = values[field.name];

    if (field.required) {
      if (field.type === 'checkbox' && value !== true) {
        errors[field.name] = `You must check ${field.label.toLowerCase()}.`;
        continue;
      }

      if (field.type === 'select' && (typeof value !== 'string' || !value)) {
        errors[field.name] = `Select ${field.label.toLowerCase()}.`;
        continue;
      }

      if (
        field.type !== 'checkbox' &&
        (typeof value !== 'string' || !value.trim())
      ) {
        errors[field.name] = `Enter ${field.label.toLowerCase()}.`;
        continue;
      }
    }

    if (
      field.type === 'email' &&
      typeof value === 'string' &&
      value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ) {
      errors[field.name] = `Enter a valid ${field.label.toLowerCase()}.`;
    }

    if (
      field.type === 'password' &&
      typeof value === 'string' &&
      value.trim()
    ) {
      const requirements = field.passwordRequirements ?? passwordRequirements;

      if (!requirements.every((requirement) => requirement.validate(value))) {
        errors[field.name] =
          'Your password does not meet all the requirements.';
      }
    }

    if (field.matches) {
      const matchingValue = values[field.matches];

      if (typeof matchingValue === 'string' && matchingValue.trim()) {
        if (typeof value !== 'string' || !value.trim()) {
          const confirmationLabel = field.label.replace(/^confirm\s+/i, '');

          errors[field.name] =
            `Confirm your ${confirmationLabel.toLowerCase()}.`;
        } else if (value !== matchingValue) {
          errors[field.name] = `${field.label} does not match.`;
        }
      }
    }
  }

  return errors;
}
