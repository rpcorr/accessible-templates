import { createRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('renders the password input with a label', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('masks the password by default', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('shows the password when the toggle is activated', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" />);

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('hides the password when the toggle is activated again', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" />);

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    await user.click(screen.getByRole('button', { name: 'Hide password' }));

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('preserves the password value when toggling visibility', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" defaultValue="Secret123!" />);

    const input = screen.getByLabelText('Password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(input).toHaveValue('Secret123!');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));

    expect(input).toHaveValue('Secret123!');
  });

  it('supports keyboard activation of the visibility toggle', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" />);

    const toggle = screen.getByRole('button', { name: 'Show password' });

    toggle.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');

    await user.keyboard(' ');

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('preserves input focus when the visibility toggle is clicked', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" />);

    const input = screen.getByLabelText('Password');
    const toggle = screen.getByRole('button', { name: 'Show password' });

    input.focus();

    await user.click(toggle);

    expect(input).toHaveFocus();
  });

  it('supports controlled input values', async () => {
    const user = userEvent.setup();

    function ControlledPasswordInput() {
      const [password, setPassword] = useState('Initial');

      return (
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
        />
      );
    }

    render(<ControlledPasswordInput />);

    const input = screen.getByLabelText('Password');

    await user.type(input, '123');

    expect(input).toHaveValue('Initial123');
  });

  it('supports uncontrolled input values', async () => {
    const user = userEvent.setup();

    render(<PasswordInput label="Password" defaultValue="Initial" />);

    const input = screen.getByLabelText('Password');

    expect(input).toHaveValue('Initial');

    await user.type(input, '123');

    expect(input).toHaveValue('Initial123');
  });

  it('supports a placeholder', () => {
    render(<PasswordInput label="Password" placeholder="Enter password" />);

    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('renders a description and associates it with the input', () => {
    render(
      <PasswordInput
        label="Password"
        description="Use at least 8 characters."
      />,
    );

    const input = screen.getByLabelText('Password');
    const description = screen.getByText('Use at least 8 characters.');

    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  it('renders an error and associates it with the input', () => {
    render(<PasswordInput label="Password" error="Password is required." />);

    const input = screen.getByLabelText('Password');
    const error = screen.getByText('Password is required.');

    expect(error).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('associates both description and error with the input', () => {
    render(
      <PasswordInput
        label="Password"
        id="Password"
        description="Use at least 8 characters."
        error="Password is too short."
      />,
    );

    const input = screen.getByLabelText('Password');

    const description = screen.getByText('Use at least 8 characters.');

    const error = screen.getByText('Password is too short.');

    expect(input.getAttribute('aria-describedby')).toBe(
      `${description.id} ${error.id}`,
    );
  });

  it('supports the required attribute', () => {
    render(<PasswordInput label="Password" required />);

    expect(screen.getByLabelText('Password')).toBeRequired();
  });

  it('supports the disabled attribute', () => {
    render(<PasswordInput label="Password" disabled />);

    expect(screen.getByLabelText('Password')).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeDisabled();
  });

  it('supports the read-only attribute', () => {
    render(<PasswordInput label="Password" readOnly />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('readonly');
  });

  it('supports maxLength and minLength', () => {
    render(<PasswordInput label="Password" maxLength={20} minLength={8} />);

    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('maxLength', '20');
    expect(input).toHaveAttribute('minLength', '8');
  });

  it('supports autocomplete', () => {
    render(<PasswordInput label="Password" autoComplete="new-password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'autocomplete',
      'new-password',
    );
  });

  it('defaults autocomplete to current-password', () => {
    render(<PasswordInput label="Password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'autocomplete',
      'current-password',
    );
  });

  it('supports a custom id and name', () => {
    render(
      <PasswordInput label="Password" id="account-password" name="password" />,
    );

    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('id', 'account-password');
    expect(input).toHaveAttribute('name', 'password');
  });

  it('forwards a ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();

    render(<PasswordInput label="Password" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText('Password'));
  });

  it('does not call onChange when toggling password visibility', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<PasswordInput label="Password" onChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(handleChange).not.toHaveBeenCalled();
  });
});
