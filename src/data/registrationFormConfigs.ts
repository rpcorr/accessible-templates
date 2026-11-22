import type { RegistrationFormConfig } from '../templates/RegistrationForm/registrationFormValidation';

export const basicRegistrationConfig: RegistrationFormConfig = {
  fields: [
    {
      id: 'first-name',
      name: 'firstName',
      label: 'First name',
      type: 'text',
      required: true,
      group: 'Personal information',
      autoComplete: 'given-name',
    },
    {
      id: 'last-name',
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      required: true,
      group: 'Personal information',
      autoComplete: 'family-name',
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      group: 'Personal information',
      autoComplete: 'email',
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      group: 'Account security',
      autoComplete: 'new-password',
    },
    {
      id: 'confirm-password',
      name: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      required: true,
      group: 'Account security',
      autoComplete: 'new-password',
      matches: 'password',
    },
    {
      id: 'terms-accepted',
      name: 'termsAccepted',
      label: 'I agree to the terms and conditions',
      type: 'checkbox',
      required: true,
    },
  ],
};

export const extendedRegistrationConfig: RegistrationFormConfig = {
  fields: [
    ...basicRegistrationConfig.fields.filter(
      (field) => field.id !== 'terms-accepted',
    ),
    {
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      required: false,
      group: 'Personal information',
      autoComplete: 'tel',
    },
    {
      id: 'company',
      name: 'company',
      label: 'Company name',
      type: 'text',
      required: false,
      group: 'Personal information',
      autoComplete: 'organization',
    },
    {
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      group: 'Account preferences',
      options: [
        { label: 'Canada', value: 'canada' },
        { label: 'United States', value: 'united-states' },
        { label: 'United Kingdom', value: 'united-kingdom' },
      ],
    },
    {
      id: 'account-type',
      name: 'accountType',
      label: 'Account type',
      type: 'select',
      required: true,
      group: 'Account preferences',
      options: [
        { label: 'Personal', value: 'personal' },
        { label: 'Business', value: 'business' },
      ],
    },
    {
      id: 'contact-method',
      name: 'contactMethod',
      label: 'Preferred contact method',
      type: 'select',
      required: true,
      group: 'Account preferences',
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
    ...basicRegistrationConfig.fields.filter(
      (field) => field.id === 'terms-accepted',
    ),
  ],
};
