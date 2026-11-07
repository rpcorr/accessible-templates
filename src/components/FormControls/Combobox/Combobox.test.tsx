import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useState } from 'react';
import { Combobox } from './Combobox';

const countryOptions = [
  { value: 'ca', label: 'Canada' },
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ie', label: 'Ireland' },
];

describe('Combobox', () => {
  // Basic rendering

  it('renders the Combobox with a label', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    expect(
      screen.getByRole('combobox', { name: 'Choose a country' }),
    ).toBeInTheDocument();
  });

  it('renders a placeholder', () => {
    render(
      <Combobox
        label="Choose a country"
        placeholder="Start typing..."
        options={countryOptions}
      />,
    );

    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <Combobox
        label="Choose a country"
        description="Type a country name to find an option."
        options={countryOptions}
      />,
    );

    expect(
      screen.getByText('Type a country name to find an option.'),
    ).toBeInTheDocument();
  });

  it('associates the description with the input', () => {
    render(
      <Combobox
        label="Choose a country"
        description="Select a country."
        options={countryOptions}
      />,
    );

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-describedby');
  });

  it('supports a custom ID and name', () => {
    const { container } = render(
      <Combobox
        id="country"
        name="country"
        label="Choose a country"
        defaultValue="ca"
        options={countryOptions}
      />,
    );

    const input = screen.getByRole('combobox');
    const hiddenInput = container.querySelector<HTMLInputElement>(
      'input[type="hidden"]',
    );

    expect(input).toHaveAttribute('id', 'country');
    expect(input).not.toHaveAttribute('name');
    expect(hiddenInput).toHaveAttribute('name', 'country');
    expect(hiddenInput).toHaveValue('ca');
  });

  // Default and controlled values

  it('renders the label matching the default selected value', () => {
    render(
      <Combobox
        label="Choose a country"
        defaultValue="ca"
        options={countryOptions}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveValue('Canada');
  });

  it('supports controlled selected values', () => {
    function ControlledCombobox() {
      const [selectedCountry, setSelectedCountry] = useState('ca');

      return (
        <Combobox
          label="Choose a country"
          value={selectedCountry}
          onChange={setSelectedCountry}
          options={countryOptions}
        />
      );
    }

    render(<ControlledCombobox />);

    const input = screen.getByRole('combobox');

    expect(input).toHaveValue('Canada');

    fireEvent.change(input, { target: { value: 'Mex' } });

    expect(input).toHaveValue('Mex');

    fireEvent.click(screen.getByRole('option', { name: 'Mexico' }));

    expect(input).toHaveValue('Mexico');
  });

  it('calls onInputChange when the user types', () => {
    const handleInputChange = vi.fn();
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Can' },
    });

    expect(handleInputChange).toHaveBeenCalledWith('Can');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when the user types an unmatched value', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'XYZ' },
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  // Filtering

  it('opens the options list when the input receives focus', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('filters options as the user types', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Can' },
    });

    expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Mexico' }),
    ).not.toBeInTheDocument();
  });

  it('filters options without case sensitivity', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'can' },
    });

    expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument();
  });

  it('displays a no-results message when no options match', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'XYZ' },
    });

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('announces no results after a short delay', () => {
    vi.useFakeTimers();

    try {
      render(<Combobox label="Choose a country" options={countryOptions} />);

      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'XYZ' },
      });

      expect(screen.getByRole('status')).toBeEmptyDOMElement();

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.getByRole('status')).toHaveTextContent('No options found.');
    } finally {
      vi.useRealTimers();
    }
  });

  // Selection

  it('selects an option when clicked using its stored value', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
      />,
    );

    fireEvent.focus(screen.getByRole('combobox'));

    fireEvent.click(screen.getByRole('option', { name: 'Canada' }));

    expect(handleChange).toHaveBeenCalledWith('ca');
    expect(screen.getByRole('combobox')).toHaveValue('Canada');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('selects the active option using Enter', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenLastCalledWith('ca');
    expect(input).toHaveValue('Canada');
  });

  it('submits the stored value instead of the displayed label', () => {
    const { container } = render(
      <Combobox
        label="Choose a country"
        name="country"
        defaultValue="ca"
        options={countryOptions}
      />,
    );

    const hiddenInput = container.querySelector<HTMLInputElement>(
      'input[type="hidden"]',
    );

    expect(screen.getByRole('combobox')).toHaveValue('Canada');
    expect(hiddenInput).toHaveValue('ca');
  });

  it('does not submit a previously selected value after the user types', () => {
    const { container } = render(
      <Combobox
        label="Choose a country"
        name="country"
        defaultValue="ca"
        options={countryOptions}
      />,
    );

    const input = screen.getByRole('combobox');
    const hiddenInput = container.querySelector<HTMLInputElement>(
      'input[type="hidden"]',
    );

    expect(hiddenInput).toHaveValue('ca');

    fireEvent.change(input, { target: { value: 'Mex' } });

    expect(input).toHaveValue('Mex');
    expect(hiddenInput).toHaveValue('');
  });

  // Disabled options and states

  it('does not allow disabled options to be selected', () => {
    render(
      <Combobox
        label="Choose a country"
        options={[
          { value: 'ca', label: 'Canada' },
          { value: 'mx', label: 'Mexico', disabled: true },
        ]}
      />,
    );

    fireEvent.focus(screen.getByRole('combobox'));

    const disabledOption = screen.getByRole('option', { name: 'Mexico' });

    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('skips disabled options during keyboard navigation', () => {
    render(
      <Combobox
        label="Choose a country"
        options={[
          { value: 'ca', label: 'Canada' },
          { value: 'mx', label: 'Mexico', disabled: true },
          { value: 'ie', label: 'Ireland' },
        ]}
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining('-option-2'),
    );
  });

  it('renders a disabled Combobox', () => {
    render(
      <Combobox label="Choose a country" disabled options={countryOptions} />,
    );

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('supports required fields', () => {
    render(
      <Combobox label="Choose a country" required options={countryOptions} />,
    );

    expect(screen.getByRole('combobox')).toBeRequired();
  });

  // Keyboard support

  it('moves to the next option using ArrowDown', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining('-option-0'),
    );
  });

  it('moves to the previous option using ArrowUp', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining('-option-3'),
    );
  });

  it('closes the options list using Escape', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the options list using Tab', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Tab' });

    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the options list when clicking outside', () => {
    render(
      <>
        <Combobox label="Choose a country" options={countryOptions} />
        <button type="button">Outside button</button>
      </>,
    );

    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.pointerDown(
      screen.getByRole('button', { name: 'Outside button' }),
    );

    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  // Inline autocomplete

  it('uses list autocomplete by default', () => {
    render(<Combobox label="Choose a country" options={countryOptions} />);

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-autocomplete',
      'list',
    );
  });

  it('uses both autocomplete when inline completion is enabled', () => {
    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        inlineCompletion
      />,
    );

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-autocomplete',
      'both',
    );
  });

  it('displays the matching label as an inline completion', () => {
    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Can' } });

    expect(input).toHaveValue('Canada');
  });

  it('highlights only the suggested portion of the inline completion', () => {
    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Can' } });

    expect(input.selectionStart).toBe(3);
    expect(input.selectionEnd).toBe(6);
  });

  it('does not provide inline completion when there is no prefix match', () => {
    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'land' } });

    expect(input).toHaveValue('land');
  });

  it('accepts the inline completion using ArrowRight', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Can' } });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(handleChange).toHaveBeenLastCalledWith('ca');
    expect(input).toHaveValue('Canada');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not complete disabled options', () => {
    render(
      <Combobox
        label="Choose a country"
        options={[
          { value: 'ca', label: 'Canada', disabled: true },
          { value: 'ci', label: 'Canary Islands' },
        ]}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'Can' } });

    expect(input).toHaveValue('Canary Islands');
  });

  it('does not accept inline completion when the suggested suffix is not selected', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
        inlineCompletion
      />,
    );

    const input = screen.getByRole('combobox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Can' } });

    input.setSelectionRange(0, 0);

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(handleChange).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('rejects typed text when no option has been selected', () => {
    render(<Combobox label="Country" options={countryOptions} required />);

    const input = screen.getByRole('combobox', { name: 'Country' });

    fireEvent.change(input, {
      target: { value: 'Canada' },
    });

    expect(input).toBeInvalid();
    expect(input).toHaveAttribute('required');
    expect(input).toHaveValue('Canada');
    expect(input).toHaveProperty(
      'validationMessage',
      'Please select an option from the list.',
    );
  });

  it('accepts a valid option selection for a required field', () => {
    render(<Combobox label="Country" options={countryOptions} required />);

    const input = screen.getByRole('combobox', { name: 'Country' });

    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('option', { name: 'Canada' }));

    expect(input).toBeValid();
    expect(input).toHaveValue('Canada');
    expect(input).toHaveProperty('validationMessage', '');
  });

  it('rejects an empty required field', () => {
    render(<Combobox label="Country" options={countryOptions} required />);

    const input = screen.getByRole('combobox', { name: 'Country' });

    expect(input).toBeInvalid();
  });
});
