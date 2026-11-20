import type { RegistrationFormConfig } from '../templates/RegistrationForm/registrationFormValidation';

export const basicRegistrationConfig: RegistrationFormConfig = {
  firstName: { enabled: true, required: true },
  lastName: { enabled: true, required: true },
  email: { enabled: true, required: true },
  password: { enabled: true, required: true },
  confirmPassword: { enabled: true, required: true },
  country: { enabled: false, required: false },
  accountType: { enabled: false, required: false },
  termsAccepted: { enabled: true, required: true },
};

export const extendedRegistrationConfig: RegistrationFormConfig = {
  firstName: { enabled: true, required: true },
  lastName: { enabled: true, required: true },
  email: { enabled: true, required: true },
  password: { enabled: true, required: true },
  confirmPassword: { enabled: true, required: true },
  country: { enabled: true, required: true },
  accountType: { enabled: true, required: true },
  termsAccepted: { enabled: true, required: true },
  additionalFields: [
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      required: false,
    },
    {
      id: 'company',
      name: 'company',
      label: 'Company name',
      type: 'text',
      required: false,
    },
    {
      id: 'contact-method',
      name: 'contactMethod',
      label: 'Preferred contact method',
      type: 'select',
      required: true,
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
      ],
    },
    {
      id: 'newsletter',
      name: 'newsletter',
      label: 'Subscribe to the newsletter',
      type: 'checkbox',
      required: false,
    },
  ],
};
