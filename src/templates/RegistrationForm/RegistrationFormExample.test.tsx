import {
  basicRegistrationConfig,
  extendedRegistrationConfig,
} from '../../data/registrationFormConfigs';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RegistrationFormExample } from './RegistrationFormExamples';
import {
  validateRegistrationForm,
  type RegistrationField,
  type RegistrationFormConfig,
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
  it('allows an enabled optional textarea to remain empty', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
    });

    const errors = validateRegistrationForm({ message: '' }, config);

    expect(errors.message).toBeUndefined();
  });
  it('requires a value in a required textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    });

    const errors = validateRegistrationForm({ message: '' }, config);

    expect(errors.message).toBe('Enter message.');
  });
  // Length validation: textarea, text, email, and telephone fields.
  it('accepts textarea content within the configured maximum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      maxLength: 100,
    });

    const errors = validateRegistrationForm(
      { message: 'This is a test message.' },
      config,
    );

    expect(errors.message).toBeUndefined();
  });

  it('rejects textarea content below the configured minimum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      minLength: 10,
    });

    const errors = validateRegistrationForm({ message: 'Too short' }, config);

    expect(errors.message).toBe('Message must be at least 10 characters.');
  });

  it('accepts textarea content meeting the configured minimum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      minLength: 10,
    });

    const errors = validateRegistrationForm({ message: 'Exactly ten' }, config);

    expect(errors.message).toBeUndefined();
  });

  it('allows an empty optional textarea with a configured minimum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      minLength: 10,
    });

    const errors = validateRegistrationForm({ message: '' }, config);

    expect(errors.message).toBeUndefined();
  });

  it('shows the required-field error for an empty required textarea with a minimum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      minLength: 10,
    });

    const errors = validateRegistrationForm({ message: '' }, config);

    expect(errors.message).toBe('Enter message.');
  });

  it('rejects textarea content exceeding the configured maximum length', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      maxLength: 10,
    });

    const errors = validateRegistrationForm(
      { message: 'This message is too long.' },
      config,
    );

    expect(errors.message).toBe('Message must be 10 characters or fewer.');
  });

  it('rejects text field content below the configured minimum length', () => {
    const config = createConfig({
      id: 'first-name',
      name: 'firstName',
      label: 'First name',
      type: 'text',
      minLength: 2,
    });

    const errors = validateRegistrationForm({ firstName: 'A' }, config);

    expect(errors.firstName).toBe('First name must be at least 2 characters.');
  });

  it('rejects text field content exceeding the configured maximum length', () => {
    const config = createConfig({
      id: 'first-name',
      name: 'firstName',
      label: 'First name',
      type: 'text',
      maxLength: 15,
    });

    const errors = validateRegistrationForm(
      { firstName: 'This name is too long' },
      config,
    );

    expect(errors.firstName).toBe('First name must be 15 characters or fewer.');
  });

  it('rejects email content below the configured minimum length', () => {
    const config = createConfig({
      id: 'email',
      name: 'email',
      label: 'Email address',
      type: 'email',
      minLength: 6,
    });

    const errors = validateRegistrationForm({ email: 'a@b.c' }, config);

    expect(errors.email).toBe('Email address must be at least 6 characters.');
  });

  it('rejects email content exceeding the configured maximum length', () => {
    const config = createConfig({
      id: 'email',
      name: 'email',
      label: 'Email address',
      type: 'email',
      maxLength: 254,
    });

    const longEmail = `${'a'.repeat(245)}@example.com`;

    const errors = validateRegistrationForm({ email: longEmail }, config);

    expect(errors.email).toBe('Email address must be 254 characters or fewer.');
  });

  it('rejects telephone content below the configured minimum length', () => {
    const config = createConfig({
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      minLength: 10,
    });

    const errors = validateRegistrationForm({ phone: '123456789' }, config);

    expect(errors.phone).toBe('Phone number must be at least 10 characters.');
  });

  it('rejects telephone content exceeding the configured maximum length', () => {
    const config = createConfig({
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      maxLength: 15,
    });

    const errors = validateRegistrationForm(
      { phone: '1234567890123456' },
      config,
    );

    expect(errors.phone).toBe('Phone number must be 15 characters or fewer.');
  });
  // Native minLength and maxLength attributes passed to rendered controls.
  it('passes the configured minimum length to a text input', () => {
    const config = createConfig({
      id: 'first-name',
      name: 'firstName',
      label: 'First name',
      type: 'text',
      minLength: 2,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('First name')).toHaveAttribute(
      'minLength',
      '2',
    );
  });

  it('passes the configured maximum length to a text input', () => {
    const config = createConfig({
      id: 'first-name',
      name: 'firstName',
      label: 'First name',
      type: 'text',
      maxLength: 15,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('First name')).toHaveAttribute(
      'maxLength',
      '15',
    );
  });

  it('passes the configured minimum length to an email input', () => {
    const config = createConfig({
      id: 'email',
      name: 'email',
      label: 'Email address',
      type: 'email',
      minLength: 6,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Email address')).toHaveAttribute(
      'minLength',
      '6',
    );
  });

  it('passes the configured maximum length to an email input', () => {
    const config = createConfig({
      id: 'email',
      name: 'email',
      label: 'Email address',
      type: 'email',
      maxLength: 254,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Email address')).toHaveAttribute(
      'maxLength',
      '254',
    );
  });

  it('passes the configured minimum length to a telephone input', () => {
    const config = createConfig({
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      minLength: 10,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Phone number')).toHaveAttribute(
      'minLength',
      '10',
    );
  });

  it('passes the configured maximum length to a telephone input', () => {
    const config = createConfig({
      id: 'phone',
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      maxLength: 15,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Phone number')).toHaveAttribute(
      'maxLength',
      '15',
    );
  });

  it('applies the configured minimum length to a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      minLength: 10,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toHaveAttribute('minLength', '10');
  });

  it('applies the configured maximum length to a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      maxLength: 100,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toHaveAttribute(
      'maxLength',
      '100',
    );
  });
  it('applies the configured number of rows to a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      rows: 6,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toHaveAttribute('rows', '6');
  });
  it('applies the configured placeholder to a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Enter your message here',
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toHaveAttribute(
      'placeholder',
      'Enter your message here',
    );
  });
  it('disables a textarea when configured as disabled', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      disabled: true,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toBeDisabled();
  });
  it('renders a textarea as read-only when configured as read-only', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      readOnly: true,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message')).toHaveAttribute('readOnly');
  });
  it('renders the configured description for a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      description: 'Please provide details about your request.',
    });

    render(<RegistrationFormExample config={config} />);

    expect(
      screen.getByText('Please provide details about your request.'),
    ).toBeInTheDocument();

    const textarea = screen.getByLabelText('Message');
    const descriptionId = textarea.getAttribute('aria-describedby');

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId!)).toHaveTextContent(
      'Please provide details about your request.',
    );
  });
  it('shows the character count when configured for a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      maxLength: 100,
      showCharacterCount: true,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByText('0 / 100 characters')).toBeInTheDocument();
  });
  it('applies auto-resize styling when configured for a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: true,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message').className).toContain('autoResize');
  });
  it('passes the configured maximum auto-resize height to a textarea field', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: true,
      maxAutoResizeHeight: 300,
    });

    render(<RegistrationFormExample config={config} />);

    const textarea = screen.getByLabelText('Message');

    Object.defineProperty(textarea, 'scrollHeight', {
      configurable: true,
      value: 400,
    });

    fireEvent.change(textarea, {
      target: { value: 'A message that requires more space.' },
    });

    expect(textarea.style.height).toBe('300px');
  });
  it('allows vertical scrolling when the maximum auto-resize height is reached', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: true,
      maxAutoResizeHeight: 300,
    });

    render(<RegistrationFormExample config={config} />);

    const textarea = screen.getByLabelText('Message');

    Object.defineProperty(textarea, 'scrollHeight', {
      configurable: true,
      value: 400,
    });

    fireEvent.change(textarea, {
      target: { value: 'A message that requires more space.' },
    });

    expect(textarea.style.height).toBe('300px');
    expect(textarea.style.overflowY).toBe('auto');
  });
  it('hides vertical scrolling when content fits within the maximum auto-resize height', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: true,
      maxAutoResizeHeight: 300,
    });

    render(<RegistrationFormExample config={config} />);

    const textarea = screen.getByLabelText('Message');

    Object.defineProperty(textarea, 'scrollHeight', {
      configurable: true,
      value: 100,
    });

    fireEvent.change(textarea, {
      target: { value: 'A short message.' },
    });

    expect(textarea.style.height).toBe('100px');
    expect(textarea.style.overflowY).toBe('hidden');
  });
  it('does not apply auto-resize styling when disabled', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: false,
    });

    render(<RegistrationFormExample config={config} />);

    expect(screen.getByLabelText('Message').className).not.toContain(
      'autoResize',
    );
  });
  it('does not apply the maximum auto-resize height when auto-resize is disabled', () => {
    const config = createConfig({
      id: 'message',
      name: 'message',
      label: 'Message',
      type: 'textarea',
      autoResize: false,
      maxAutoResizeHeight: 300,
    });

    render(<RegistrationFormExample config={config} />);

    const textarea = screen.getByLabelText('Message');

    expect(textarea.style.height).toBe('');
    expect(textarea.style.overflowY).toBe('');
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
  it('rejects a select value that is not in the configured options', () => {
    const config = createConfig({
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      options: [
        { label: 'Canada', value: 'canada' },
        { label: 'United States', value: 'united-states' },
      ],
    });

    const errors = validateRegistrationForm({ country: 'australia' }, config);

    expect(errors.country).toBe('Select a valid country.');
  });
  it('rejects an invalid value in an optional select field', () => {
    const config = createConfig({
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'Canada', value: 'canada' },
        { label: 'United States', value: 'united-states' },
      ],
    });

    const errors = validateRegistrationForm({ country: 'australia' }, config);

    expect(errors.country).toBe('Select a valid country.');
  });

  it('allows a required terms checkbox to pass validation when checked', () => {
    render(
      <RegistrationFormExample
        config={createConfig({
          id: 'terms-accepted',
          name: 'termsAccepted',
          label: 'I agree to the terms and conditions',
          type: 'checkbox',
          required: true,
        })}
      />,
    );

    const termsCheckbox = screen.getByRole('checkbox', {
      name: 'I agree to the terms and conditions',
    });

    fireEvent.click(termsCheckbox);

    expect(termsCheckbox).toBeChecked();

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
