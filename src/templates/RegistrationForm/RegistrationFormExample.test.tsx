import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RegistrationFormExample } from './RegistrationFormExamples';

describe('RegistrationFormExample', () => {
  it('renders the registration form with its fields and submit button', () => {
    render(<RegistrationFormExample />);

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
      screen.getByRole('combobox', { name: 'Country' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Account type' }),
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

    expect(screen.getAllByText('Enter your first name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter your last name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter your email address.')).toHaveLength(2);
    expect(screen.getAllByText('Enter your password.')).toHaveLength(2);
    expect(screen.getAllByText('Confirm your password.')).toHaveLength(2);
    expect(screen.getAllByText('Select your country.')).toHaveLength(2);
    expect(screen.getAllByText('Select an account type.')).toHaveLength(2);
    expect(
      screen.getAllByText('You must agree to the terms and conditions.'),
    ).toHaveLength(2);

    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('hides fields excluded by the configuration', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: true, required: true },
          lastName: { enabled: false, required: false },
          email: { enabled: true, required: true },
          password: { enabled: true, required: true },
          confirmPassword: { enabled: true, required: true },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
      screen.queryByRole('group', { name: 'Account type' }),
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
        config={{
          firstName: { enabled: true, required: true },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Enter your first name.')).toHaveLength(2);

    expect(screen.queryByText('Enter your last name.')).not.toBeInTheDocument();

    expect(
      screen.queryByText('Enter your email address.'),
    ).not.toBeInTheDocument();

    expect(screen.queryByText('Enter your password.')).not.toBeInTheDocument();

    expect(
      screen.queryByText('Confirm your password.'),
    ).not.toBeInTheDocument();

    expect(screen.queryByText('Select your country.')).not.toBeInTheDocument();

    expect(
      screen.queryByText('Select an account type.'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText('You must agree to the terms and conditions.'),
    ).not.toBeInTheDocument();
  });

  it('does not render fieldsets when all their fields are disabled', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: true, required: true },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    expect(
      screen.getByRole('group', { name: 'Account preferences' }),
    ).toBeInTheDocument();

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
        config={{
          firstName: { enabled: true, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    const firstName = screen.getByRole('textbox', {
      name: 'First name',
    });

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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: true, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    const email = screen.getByRole('textbox', {
      name: 'Email address',
    });

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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: true, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    const email = screen.getByRole('textbox', {
      name: 'Email address',
    });

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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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

  it('requires password confirmation when an optional password is entered', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Passwords do not match.')).toHaveLength(2);
  });

  it('accepts matching passwords when both fields are optional', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: true, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: true, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    expect(
      screen.getByRole('group', { name: 'Account type' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(
      screen.getByRole('heading', { name: 'Registration successful' }),
    ).toBeInTheDocument();
  });

  it('allows an enabled optional terms checkbox to remain unchecked', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: true, required: false },
        }}
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
        config={{
          firstName: { enabled: true, required: true },
          lastName: { enabled: true, required: false },
          email: { enabled: true, required: true },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
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
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: true },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    expect(screen.getByLabelText('Password')).toBeRequired();
    expect(screen.getByLabelText('Confirm password')).not.toBeRequired();
  });

  it('reflects required settings on selection controls and checkbox', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: false, required: false },
          confirmPassword: { enabled: false, required: false },
          country: { enabled: true, required: true },
          accountType: { enabled: true, required: true },
          termsAccepted: { enabled: true, required: true },
        }}
      />,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toBeRequired();

    const accountType = screen.getByRole('group', { name: 'Account type' });
    expect(accountType).toBeInTheDocument();

    const accountTypeRadios = within(accountType).getAllByRole('radio');

    expect(accountTypeRadios.length).toBeGreaterThan(0);

    accountTypeRadios.forEach((radio) => {
      expect(radio).toBeRequired();
    });

    expect(
      screen.getByRole('checkbox', {
        name: 'I agree to the terms and conditions',
      }),
    ).toBeRequired();
  });

  it('clears the confirmation error when the password is changed to match', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Passwords do not match.')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'DifferentPassword123!' },
    });

    expect(
      screen.queryByText('Passwords do not match.'),
    ).not.toBeInTheDocument();
  });

  it('clears the confirmation error when the confirmation is changed to match', () => {
    render(
      <RegistrationFormExample
        config={{
          firstName: { enabled: false, required: false },
          lastName: { enabled: false, required: false },
          email: { enabled: false, required: false },
          password: { enabled: true, required: false },
          confirmPassword: { enabled: true, required: false },
          country: { enabled: false, required: false },
          accountType: { enabled: false, required: false },
          termsAccepted: { enabled: false, required: false },
        }}
      />,
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'StrongPassword123!' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'DifferentPassword123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(screen.getAllByText('Passwords do not match.')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'StrongPassword123!' },
    });

    expect(
      screen.queryByText('Passwords do not match.'),
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
