import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from '.';
import styles from './Textarea.module.css';

describe('Textarea', () => {
  // Rendering
  it('renders the textarea with its label', () => {
    render(<Textarea label="Message" />);

    expect(
      screen.getByRole('textbox', { name: 'Message' }),
    ).toBeInTheDocument();
  });

  it('renders a placeholder when provided', () => {
    render(<Textarea label="Message" placeholder="Enter your message" />);

    expect(
      screen.getByPlaceholderText('Enter your message'),
    ).toBeInTheDocument();
  });

  it('generates a unique ID when no ID is provided', () => {
    render(
      <>
        <Textarea label="First message" />
        <Textarea label="Second message" />
      </>,
    );

    const first = screen.getByRole('textbox', { name: 'First message' });
    const second = screen.getByRole('textbox', { name: 'Second message' });

    expect(first.id).toBeTruthy();
    expect(second.id).toBeTruthy();
    expect(first.id).not.toBe(second.id);
  });

  it('uses the provided ID when supplied', () => {
    render(<Textarea label="Message" id="message-input" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'message-input');
  });

  // Value handling
  it('renders an initial value when provided', () => {
    render(<Textarea label="Message" value="Hello world" />);

    expect(screen.getByRole('textbox')).toHaveValue('Hello world');
  });

  it('renders a default value when provided', () => {
    render(<Textarea label="Message" defaultValue="Initial message" />);

    expect(screen.getByRole('textbox')).toHaveValue('Initial message');
  });

  it('calls onChange with the updated value', () => {
    const handleChange = vi.fn();

    render(<Textarea label="Message" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Updated message' },
    });

    expect(handleChange).toHaveBeenCalledWith('Updated message');
  });

  it('supports controlled usage', () => {
    const handleChange = vi.fn();

    render(
      <Textarea
        label="Message"
        value="Controlled message"
        onChange={handleChange}
      />,
    );

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveValue('Controlled message');

    fireEvent.change(textarea, {
      target: { value: 'New message' },
    });

    expect(handleChange).toHaveBeenCalledWith('New message');
  });

  // Description
  it('renders a description when provided', () => {
    render(
      <Textarea
        label="Comments"
        description="Provide additional information."
      />,
    );

    expect(
      screen.getByText('Provide additional information.'),
    ).toBeInTheDocument();
  });

  it('associates the description using aria-describedby', () => {
    render(
      <Textarea
        label="Comments"
        id="comments"
        description="Provide additional information."
      />,
    );

    const textarea = screen.getByRole('textbox');
    const description = screen.getByText('Provide additional information.');

    expect(textarea.getAttribute('aria-describedby')).toContain(description.id);
  });

  // Error handling
  it('renders an error message when provided', () => {
    render(<Textarea label="Message" error="Please enter a message." />);

    expect(screen.getByText('Please enter a message.')).toBeInTheDocument();
  });

  it('sets aria-invalid when an error is present', () => {
    render(<Textarea label="Message" error="This field is invalid." />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when there is no error', () => {
    render(<Textarea label="Message" />);

    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('associates the error message using aria-describedby', () => {
    render(
      <Textarea label="Message" id="message" error="Please enter a message." />,
    );

    const textarea = screen.getByRole('textbox');
    const error = screen.getByText('Please enter a message.');

    expect(textarea.getAttribute('aria-describedby')).toContain(error.id);
  });

  it('associates both description and error messages', () => {
    render(
      <Textarea
        label="Message"
        id="message"
        description="Enter your message."
        error="This field is required."
      />,
    );

    const textarea = screen.getByRole('textbox');
    const describedBy = textarea.getAttribute('aria-describedby');

    expect(describedBy).toContain('message-description');
    expect(describedBy).toContain('message-error');
  });

  // Native attributes
  it('supports the required attribute', () => {
    render(<Textarea label="Message" required />);

    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('supports the disabled attribute', () => {
    render(<Textarea label="Message" disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('supports the readOnly attribute', () => {
    render(<Textarea label="Message" readOnly />);

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('supports custom rows', () => {
    render(<Textarea label="Message" rows={6} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });

  it('uses four rows by default', () => {
    render(<Textarea label="Message" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });

  it('supports maxLength and minLength', () => {
    render(<Textarea label="Message" minLength={10} maxLength={200} />);

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('minLength', '10');
    expect(textarea).toHaveAttribute('maxLength', '200');
  });

  it('supports name and autoComplete', () => {
    render(<Textarea label="Message" name="message" autoComplete="off" />);

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('name', 'message');
    expect(textarea).toHaveAttribute('autocomplete', 'off');
  });

  // Ref forwarding
  it('forwards a ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();

    render(<Textarea label="Message" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  // Error styling
  it('applies invalid styling when an error is present', () => {
    render(<Textarea label="Message" error="Please enter a message." />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not apply invalid styling when there is no error', () => {
    render(<Textarea label="Message" />);

    expect(screen.getByRole('textbox')).not.toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('applies the error styling to the error message', () => {
    render(<Textarea label="Message" error="Please enter a message." />);

    expect(screen.getByText('Please enter a message.')).toHaveClass(
      styles.error,
    );
  });

  // Character counter
  it('does not display a character counter by default', () => {
    render(<Textarea label="Message" maxLength={200} />);

    expect(screen.queryByText('0 / 200 characters')).not.toBeInTheDocument();
  });

  it('displays the character counter when enabled', () => {
    render(<Textarea label="Message" maxLength={200} showCharacterCount />);

    expect(screen.getByText('0 / 200 characters')).toBeInTheDocument();
  });

  it('displays the initial character count from defaultValue', () => {
    render(
      <Textarea
        label="Message"
        defaultValue="Hello"
        maxLength={200}
        showCharacterCount
      />,
    );

    expect(screen.getByText('5 / 200 characters')).toBeInTheDocument();
  });

  it('updates the character counter when an uncontrolled value changes', () => {
    render(<Textarea label="Message" maxLength={200} showCharacterCount />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Hello world' },
    });

    expect(screen.getByText('11 / 200 characters')).toBeInTheDocument();
  });

  it('updates the character counter when a controlled value changes', () => {
    const { rerender } = render(
      <Textarea
        label="Message"
        value="Hello"
        maxLength={200}
        showCharacterCount
      />,
    );

    expect(screen.getByText('5 / 200 characters')).toBeInTheDocument();

    rerender(
      <Textarea
        label="Message"
        value="Hello world"
        maxLength={200}
        showCharacterCount
      />,
    );

    expect(screen.getByText('11 / 200 characters')).toBeInTheDocument();
  });

  it('does not display the character counter without maxLength', () => {
    render(<Textarea label="Message" showCharacterCount />);

    expect(screen.queryByText(/characters/)).not.toBeInTheDocument();
  });

  it('associates the character counter using aria-describedby', () => {
    render(
      <Textarea
        label="Message"
        id="message"
        maxLength={200}
        showCharacterCount
      />,
    );

    const textarea = screen.getByRole('textbox');

    expect(textarea.getAttribute('aria-describedby')).toContain(
      'message-character-count',
    );
  });

  it('does not use aria-live for the character counter', () => {
    render(<Textarea label="Message" maxLength={200} showCharacterCount />);

    const counter = screen.getByText('0 / 200 characters');

    expect(counter).not.toHaveAttribute('aria-live');
  });
});
