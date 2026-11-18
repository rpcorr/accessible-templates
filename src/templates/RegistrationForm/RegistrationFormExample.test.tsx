import { fireEvent, render, screen } from '@testing-library/react';
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

    expect(screen.getAllByText('Enter your first name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter your last name.')).toHaveLength(2);
    expect(screen.getAllByText('Enter your email address.')).toHaveLength(2);
    expect(
      screen.getAllByText('Your password does not meet all the requirements.'),
    ).toHaveLength(2);
    expect(screen.getAllByText('Confirm your password.')).toHaveLength(2);
    expect(screen.getAllByText('Select your country.')).toHaveLength(2);
    expect(screen.getAllByText('Select an account type.')).toHaveLength(2);
    expect(
      screen.getAllByText('You must agree to the terms and conditions.'),
    ).toHaveLength(2);

    expect(scrollIntoView).toHaveBeenCalled();
  });
});
