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

export type AdditionalRegistrationField = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'checkbox';
  required: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};

export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  accountType: string;
  termsAccepted: boolean;
  additionalFields: Record<string, string | boolean>;
};

export type RegistrationFormConfig = {
  firstName: {
    enabled: boolean;
    required: boolean;
  };
  lastName: {
    enabled: boolean;
    required: boolean;
  };
  email: {
    enabled: boolean;
    required: boolean;
  };
  password: {
    enabled: boolean;
    required: boolean;
  };
  confirmPassword: {
    enabled: boolean;
    required: boolean;
  };
  country: {
    enabled: boolean;
    required: boolean;
  };
  accountType: {
    enabled: boolean;
    required: boolean;
  };
  termsAccepted: {
    enabled: boolean;
    required: boolean;
  };
  additionalFields?: AdditionalRegistrationField[];
};

export const defaultRegistrationFormConfig: RegistrationFormConfig = {
  firstName: { enabled: true, required: true },
  lastName: { enabled: true, required: true },
  email: { enabled: true, required: true },
  password: { enabled: true, required: true },
  confirmPassword: { enabled: true, required: true },
  country: { enabled: true, required: true },
  accountType: { enabled: true, required: true },
  termsAccepted: { enabled: true, required: true },
  additionalFields: [],
};

export type RegistrationFormErrors = Partial<
  Record<keyof Omit<RegistrationFormValues, 'additionalFields'>, string>
> & {
  additionalFields?: Record<string, string>;
};

export function validateRegistrationForm(
  values: RegistrationFormValues,
  config: RegistrationFormConfig = defaultRegistrationFormConfig,
): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (config.firstName.enabled && config.firstName.required) {
    if (!values.firstName.trim()) {
      errors.firstName = 'Enter your first name.';
    }
  }

  if (config.lastName.enabled && config.lastName.required) {
    if (!values.lastName.trim()) {
      errors.lastName = 'Enter your last name.';
    }
  }

  if (config.email.enabled) {
    if (config.email.required && !values.email.trim()) {
      errors.email = 'Enter your email address.';
    } else if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      errors.email = 'Enter a valid email address.';
    }
  }

  if (config.password.enabled) {
    const passwordIsEmpty = !values.password;
    const passwordMeetsRequirements = passwordRequirements.every(
      (requirement) => requirement.validate(values.password),
    );

    if (
      (config.password.required && passwordIsEmpty) ||
      (!passwordIsEmpty && !passwordMeetsRequirements)
    ) {
      errors.password =
        config.password.required && passwordIsEmpty
          ? 'Enter your password.'
          : 'Your password does not meet all the requirements.';
    }
  }

  if (config.confirmPassword.enabled) {
    if (
      (config.confirmPassword.required || values.password) &&
      !values.confirmPassword
    ) {
      errors.confirmPassword = 'Confirm your password.';
    } else if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = 'Passwords do not match.';
    }
  }

  if (config.country.enabled && config.country.required && !values.country) {
    errors.country = 'Select your country.';
  }

  if (
    config.accountType.enabled &&
    config.accountType.required &&
    !values.accountType
  ) {
    errors.accountType = 'Select an account type.';
  }

  if (
    config.termsAccepted.enabled &&
    config.termsAccepted.required &&
    !values.termsAccepted
  ) {
    errors.termsAccepted = 'You must agree to the terms and conditions.';
  }

  if (config.additionalFields) {
    for (const field of config.additionalFields) {
      const value = values.additionalFields[field.name];

      if (field.required) {
        if (field.type === 'checkbox' && value !== true) {
          errors.additionalFields ??= {};
          errors.additionalFields[field.name] =
            `You must check ${field.label.toLowerCase()}.`;
        } else if (
          field.type === 'select' &&
          (typeof value !== 'string' || !value)
        ) {
          errors.additionalFields ??= {};
          errors.additionalFields[field.name] =
            `Select ${field.label.toLowerCase()}.`;
        } else if (
          field.type !== 'checkbox' &&
          field.type !== 'select' &&
          (typeof value !== 'string' || !value.trim())
        ) {
          errors.additionalFields ??= {};
          errors.additionalFields[field.name] =
            `Enter ${field.label.toLowerCase()}.`;
        }
      }

      if (
        field.type === 'email' &&
        typeof value === 'string' &&
        value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ) {
        errors.additionalFields ??= {};
        errors.additionalFields[field.name] =
          `Enter a valid ${field.label.toLowerCase()}.`;
      }
    }
  }

  return errors;
}
