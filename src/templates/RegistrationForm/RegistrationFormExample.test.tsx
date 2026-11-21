import {
  basicRegistrationConfig,
  extendedRegistrationConfig,
} from '../../data/registrationFormConfigs';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RegistrationFormExample } from './RegistrationFormExamples';
import type {
  RegistrationField,
  RegistrationFormConfig,
} from './registrationFormValidation';

const createConfig = (
  ...fields: RegistrationField[]
): RegistrationFormConfig => ({
  fields,
});

describe('RegistrationFormExample', () => {
  it('renders the registration form with its fields and submit button', () => {
    render(<RegistrationFormExample config={basicRegistrationConfig} />);

    expect(
      screen.getByRole('heading', { name: 'Create an account' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: 'First name' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Last name' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();

    expect(
      screen.getByRole('group', { name: 'Personal information' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('group', { name: 'Account security' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', {
        name: 'I agree to the terms and conditions',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Create account' }),
    ).toBeInTheDocument();
  });

  it('renders the additional fields supplied by the extended configuration', () => {
    render(<RegistrationFormExample config={extendedRegistrationConfig} />);

    expect(
      screen.getByRole('textbox', { name: 'Phone number' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: 'Company name' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Country' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Account type' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Preferred contact method' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: 'Subscribe to the newsletter' }),
    ).toBeInTheDocument();
  });

  it('displays validation errors when the form is submitted empty', () => {
    const scrollIntoView = vi.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });

    render(<RegistrationFormExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', {
        name: 'There is a problem submitting the form',
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveFocus();

    expect(screen.getAllByText('Enter first name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter last name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter email address.')).toHaveLength(2);
    expect(screen.getAllByText('Enter password.')).toHaveLength(2);
    expect(screen.getAllByText('Enter confirm password.')).toHaveLength(2);
    expect(
      screen.getAllByText(
        'You must check i agree to the terms and conditions.',
      ),
    ).toHaveLength(2);

    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('hides fields excluded by the configuration', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'first-name',
            name: 'firstName',
            label: 'First name',
            type: 'text',
            required: true,
            group: 'Personal information',
          },
          {
            id: 'email',
            name: 'email',
            label: 'Email address',
            type: 'email',
            required: true,
            group: 'Personal information',
          },
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            group: 'Account security',
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: true,
            group: 'Account security',
            matches: 'password',
          },
        )}
      />,
    );

    expect(
      screen.getByRole('textbox', { name: 'First name' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('textbox', { name: 'Last name' }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: 'Email address' }),
    ).toBeInTheDocument();

    expect(screen.queryByLabelText('Country')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('combobox', { name: 'Account type' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('checkbox', {
        name: 'I agree to the terms and conditions',
      }),
    ).not.toBeInTheDocument();
  });

  it('does not validate fields excluded by the configuration', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'first-name',
          name: 'firstName',
          label: 'First name',
          type: 'text',
          required: true,
        })}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Enter first name.')).toHaveLength(2);

    expect(screen.queryByText('Enter your last name.')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Enter your email address.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Enter your password.')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Confirm your password.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Select your country.')).not.toBeInTheDocument();
    expect(screen.queryByText('Select account type.')).not.toBeInTheDocument();
    expect(
      screen.queryByText('You must agree to the terms and conditions.'),
    ).not.toBeInTheDocument();
  });

  it('does not render fieldsets when all their fields are disabled', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'country',
          name: 'country',
          label: 'Country',
          type: 'select',
          required: true,
          options: [
            { label: 'Canada', value: 'canada' },
            { label: 'United States', value: 'united-states' },
          ],
        })}
      />,
    );

    expect(
      screen.queryByRole('group', { name: 'Account preferences' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('group', { name: 'Personal information' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('group', { name: 'Account security' }),
    ).not.toBeInTheDocument();
  });

  it('allows enabled optional fields to remain empty', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'first-name',
          name: 'firstName',
          label: 'First name',
          type: 'text',
          required: false,
        })}
      />,
    );

    const firstName = screen.getByRole('textbox', { name: 'First name' });

    expect(firstName).toBeInTheDocument();
    expect(firstName).not.toBeRequired();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.queryByText('Enter your first name.'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'There is a problem submitting the form',
      }),
    ).not.toBeInTheDocument();
  });

  it('allows an enabled optional email field to remain empty', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'email',
          name: 'email',
          label: 'Email address',
          type: 'email',
          required: false,
        })}
      />,
    );

    const email = screen.getByRole('textbox', { name: 'Email address' });

    expect(email).toBeInTheDocument();
    expect(email).not.toBeRequired();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.queryByText('Enter your email address.'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('validates the format of an enabled optional email field', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'email',
          name: 'email',
          label: 'Email address',
          type: 'email',
          required: false,
        })}
      />,
    );

    const email = screen.getByRole('textbox', { name: 'Email address' });

    expect(email).not.toBeRequired();

    fireEvent.change(email, {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Enter a valid email address.')).toHaveLength(2);
  });

  it('allows an enabled optional password field to remain empty', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'password',
          name: 'password',
          label: 'Password',
          type: 'password',
          required: false,
        })}
      />,
    );

    const password = screen.getByLabelText('Password');

    expect(password).toBeInTheDocument();
    expect(password).not.toBeRequired();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.queryByText('Enter your password.')).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('validates the requirements of an enabled optional password field', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'password',
          name: 'password',
          label: 'Password',
          type: 'password',
          required: false,
        })}
      />,
    );

    const password = screen.getByLabelText('Password');

    fireEvent.change(password, {
      target: { value: 'weak' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getAllByText('Your password does not meet all the requirements.'),
    ).toHaveLength(2);
  });

  it('uses custom password requirements supplied by the configuration', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'password',
          name: 'password',
          label: 'Password',
          type: 'password',
          required: false,
          passwordRequirements: [
            {
              id: 'length',
              label: 'At least 8 characters',
              validate: (password) => password.length >= 8,
            },
            {
              id: 'number',
              label: 'At least one number',
              validate: (password) => /\d/.test(password),
            },
          ],
        })}
      />,
    );

    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('At least one number')).toBeInTheDocument();

    expect(
      screen.queryByText('At least 12 characters'),
    ).not.toBeInTheDocument();

    const password = screen.getByLabelText('Password');

    fireEvent.change(password, {
      target: { value: 'weak' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getAllByText('Your password does not meet all the requirements.'),
    ).toHaveLength(2);
  });

  it('requires password confirmation when an optional password is entered', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: false,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Confirm your password.')).toHaveLength(2);
  });

  it('rejects mismatched passwords when confirmation is optional', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: false,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getAllByText('Confirm password does not match.'),
    ).toHaveLength(2);
  });

  it('accepts matching passwords when both fields are optional', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: false,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('allows an enabled optional country field to remain empty', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'country',
          name: 'country',
          label: 'Country',
          type: 'select',
          required: false,
          options: [
            { label: 'Canada', value: 'canada' },
            { label: 'United States', value: 'united-states' },
          ],
        })}
      />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Country' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('allows an enabled optional account type to remain unselected', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'account-type',
          name: 'accountType',
          label: 'Account type',
          type: 'select',
          required: false,
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Business', value: 'business' },
          ],
        })}
      />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Account type' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('allows an enabled optional terms checkbox to remain unchecked', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'terms-accepted',
          name: 'termsAccepted',
          label: 'I agree to the terms and conditions',
          type: 'checkbox',
          required: false,
        })}
      />,
    );

    const termsCheckbox = screen.getByRole('checkbox', {
      name: 'I agree to the terms and conditions',
    });

    expect(termsCheckbox).toBeInTheDocument();
    expect(termsCheckbox).not.toBeChecked();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('reflects required settings on text fields', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'first-name',
            name: 'firstName',
            label: 'First name',
            type: 'text',
            required: true,
          },
          {
            id: 'last-name',
            name: 'lastName',
            label: 'Last name',
            type: 'text',
            required: false,
          },
          {
            id: 'email',
            name: 'email',
            label: 'Email address',
            type: 'email',
            required: true,
          },
        )}
      />,
    );

    expect(screen.getByRole('textbox', { name: 'First name' })).toBeRequired();
    expect(
      screen.getByRole('textbox', { name: 'Last name' }),
    ).not.toBeRequired();
    expect(
      screen.getByRole('textbox', { name: 'Email address' }),
    ).toBeRequired();
  });

  it('reflects required settings on password fields', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    expect(screen.getByLabelText('Password')).toBeRequired();
    expect(screen.getByLabelText('Confirm password')).not.toBeRequired();
  });

  it('reflects required settings on selection controls and checkbox', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'country',
            name: 'country',
            label: 'Country',
            type: 'select',
            required: true,
            options: [
              { label: 'Canada', value: 'canada' },
              { label: 'United States', value: 'united-states' },
            ],
          },
          {
            id: 'account-type',
            name: 'accountType',
            label: 'Account type',
            type: 'select',
            required: true,
            options: [
              { label: 'Personal', value: 'personal' },
              { label: 'Business', value: 'business' },
            ],
          },
          {
            id: 'terms-accepted',
            name: 'termsAccepted',
            label: 'I agree to the terms and conditions',
            type: 'checkbox',
            required: true,
          },
        )}
      />,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toBeRequired();
    expect(
      screen.getByRole('combobox', { name: 'Account type' }),
    ).toBeRequired();

    expect(
      screen.getByRole('checkbox', {
        name: 'I agree to the terms and conditions',
      }),
    ).toBeRequired();
  });

  it('clears the confirmation error when the password is changed to match', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: false,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getAllByText('Confirm password does not match.'),
    ).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'DifferentPassword123!' },
    });

    expect(
      screen.queryByText('Confirm password does not match.'),
    ).not.toBeInTheDocument();
  });

  it('clears the confirmation error when the confirmation is changed to match', () => {
    render(
      <RegistrationFormExample
        config={createConfig(
          {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            required: false,
          },
          {
            id: 'confirm-password',
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            required: false,
            matches: 'password',
          },
        )}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getAllByText('Confirm password does not match.'),
    ).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'StrongPassword123!' },
    });

    expect(
      screen.queryByText('Confirm password does not match.'),
    ).not.toBeInTheDocument();
  });

  it('keeps focus on the field when correcting an error', () => {
    render(<RegistrationFormExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    const firstNameInput = screen.getByLabelText('First name');

    firstNameInput.focus();

    fireEvent.change(firstNameInput, {
      target: { value: 'Ronan' },
    });

    expect(firstNameInput).toHaveFocus();
    expect(
      screen.getByRole('alert', {
        name: 'There is a problem submitting the form',
      }),
    ).toBeInTheDocument();
  });
});
