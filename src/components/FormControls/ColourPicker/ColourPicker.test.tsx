import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColourPicker } from './ColourPicker';

describe('ColourPicker', () => {
  it('renders the colour picker with an accessible label', () => {
    render(<ColourPicker label="Choose a colour" />);

    expect(screen.getByLabelText('Choose a colour')).toBeInTheDocument();
  });

  it('renders the default colour when no value is provided', () => {
    render(<ColourPicker label="Choose a colour" />);

    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#000000');
  });

  it('renders the provided default value', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#2563eb" />);

    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#2563eb');
  });

  it('renders a controlled colour value', () => {
    render(<ColourPicker label="Choose a colour" value="#ff0000" />);

    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#ff0000');
  });

  it('calls onChange when a colour is selected', () => {
    const handleChange = vi.fn();

    render(
      <ColourPicker
        label="Choose a colour"
        defaultValue="#000000"
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Choose a colour'), {
      target: { value: '#2563eb' },
    });

    expect(handleChange).toHaveBeenCalledWith('#2563eb');
  });

  it('updates the colour in uncontrolled mode', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#000000" />);

    const colourInput = screen.getByLabelText('Choose a colour');

    fireEvent.change(colourInput, {
      target: { value: '#2563eb' },
    });

    expect(colourInput).toHaveValue('#2563eb');
  });

  it('does not update a controlled value without a parent update', () => {
    const handleChange = vi.fn();

    render(
      <ColourPicker
        label="Choose a colour"
        value="#000000"
        onChange={handleChange}
      />,
    );

    const colourInput = screen.getByLabelText('Choose a colour');

    fireEvent.change(colourInput, {
      target: { value: '#2563eb' },
    });

    expect(handleChange).toHaveBeenCalledWith('#2563eb');
    expect(colourInput).toHaveValue('#000000');
  });

  it('renders the HEX text input by default', () => {
    render(<ColourPicker label="Choose a colour" />);

    expect(
      screen.getByRole('textbox', {
        name: 'Choose a colour hexadecimal value',
      }),
    ).toBeInTheDocument();
  });

  it('hides the HEX text input when showHexInput is false', () => {
    render(<ColourPicker label="Choose a colour" showHexInput={false} />);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('displays the selected colour in the HEX input', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#2563eb" />);

    expect(
      screen.getByRole('textbox', {
        name: 'Choose a colour hexadecimal value',
      }),
    ).toHaveValue('#2563EB');
  });

  it('updates the colour when a valid HEX value is entered', () => {
    const handleChange = vi.fn();

    render(
      <ColourPicker
        label="Choose a colour"
        defaultValue="#000000"
        onChange={handleChange}
      />,
    );

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Choose a colour hexadecimal value',
      }),
      { target: { value: '#2563EB' } },
    );

    expect(handleChange).toHaveBeenCalledWith('#2563EB');
    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#2563eb');
  });

  it('allows incomplete HEX values while editing', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#000000" />);

    const hexInput = screen.getByRole('textbox', {
      name: 'Choose a colour hexadecimal value',
    });

    fireEvent.change(hexInput, {
      target: { value: '#12' },
    });

    expect(hexInput).toHaveValue('#12');
    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#000000');
  });

  it('allows invalid HEX values while editing', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#000000" />);

    const hexInput = screen.getByRole('textbox', {
      name: 'Choose a colour hexadecimal value',
    });

    fireEvent.change(hexInput, {
      target: { value: '#12GGGG' },
    });

    expect(hexInput).toHaveValue('#12GGGG');
    expect(screen.getByLabelText('Choose a colour')).toHaveValue('#000000');
  });

  it('restores the last valid colour when invalid HEX input loses focus', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#000000" />);

    const hexInput = screen.getByRole('textbox', {
      name: 'Choose a colour hexadecimal value',
    });

    fireEvent.change(hexInput, {
      target: { value: '#12GGGG' },
    });

    fireEvent.blur(hexInput);

    expect(hexInput).toHaveValue('#000000');
  });

  it('restores the last valid colour when incomplete HEX input loses focus', () => {
    render(<ColourPicker label="Choose a colour" defaultValue="#000000" />);

    const hexInput = screen.getByRole('textbox', {
      name: 'Choose a colour hexadecimal value',
    });

    fireEvent.change(hexInput, {
      target: { value: '#12' },
    });

    fireEvent.blur(hexInput);

    expect(hexInput).toHaveValue('#000000');
  });

  it('renders the instructions when provided', () => {
    render(
      <ColourPicker
        label="Choose a colour"
        instructions="Select your preferred colour."
      />,
    );

    expect(
      screen.getByText('Select your preferred colour.'),
    ).toBeInTheDocument();
  });

  it('associates instructions with the colour input', () => {
    render(
      <ColourPicker
        label="Choose a colour"
        instructions="Select your preferred colour."
      />,
    );

    const colourInput = screen.getByLabelText('Choose a colour');

    expect(colourInput).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('instructions'),
    );
  });

  it('renders an error message when provided', () => {
    render(
      <ColourPicker
        label="Choose a colour"
        error="Please select a valid colour."
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please select a valid colour.',
    );
  });

  it('sets aria-invalid when an error is present', () => {
    render(
      <ColourPicker
        label="Choose a colour"
        error="Please select a valid colour."
      />,
    );

    expect(screen.getByLabelText('Choose a colour')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('associates the error message with the colour input', () => {
    render(
      <ColourPicker
        label="Choose a colour"
        error="Please select a valid colour."
      />,
    );

    const colourInput = screen.getByLabelText('Choose a colour');

    expect(colourInput).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('error'),
    );
  });

  it('renders the required state', () => {
    render(<ColourPicker label="Choose a colour" required />);

    const colourInput = screen.getByLabelText(/^Choose a colour/, {
      selector: 'input[type="color"]',
    });

    expect(colourInput).toHaveAttribute('required');
  });

  it('renders the disabled state', () => {
    render(<ColourPicker label="Choose a colour" disabled />);

    expect(screen.getByLabelText('Choose a colour')).toBeDisabled();

    expect(
      screen.getByRole('textbox', {
        name: 'Choose a colour hexadecimal value',
      }),
    ).toBeDisabled();
  });

  it('does not call onChange when the HEX input is disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <ColourPicker label="Choose a colour" disabled onChange={handleChange} />,
    );

    await user.click(
      screen.getByRole('textbox', {
        name: 'Choose a colour hexadecimal value',
      }),
    );

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <ColourPicker label="Choose a colour" className="custom-picker" />,
    );

    expect(container.firstChild).toHaveClass('custom-picker');
  });

  it('renders the supplied id on the colour input', () => {
    render(<ColourPicker label="Choose a colour" id="brand-colour" />);

    expect(screen.getByLabelText('Choose a colour')).toHaveAttribute(
      'id',
      'brand-colour',
    );
  });

  it('renders the supplied name attribute', () => {
    render(<ColourPicker label="Choose a colour" name="brandColour" />);

    expect(screen.getByLabelText('Choose a colour')).toHaveAttribute(
      'name',
      'brandColour',
    );
  });
});
