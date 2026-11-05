import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useState } from 'react';
import { Combobox } from './Combobox';

const countryOptions = [
  { value: 'Canada', label: 'Canada' },
  { value: 'United States', label: 'United States' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Ireland', label: 'Ireland' },
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

    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining(''),
    );

    expect(input.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('supports a custom ID and name', () => {
    render(
      <Combobox
        id="country"
        name="country"
        label="Choose a country"
        options={countryOptions}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'country');
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'country');
  });

  // Default and controlled values

  it('renders a default value', () => {
    render(
      <Combobox
        label="Choose a country"
        defaultValue="Canada"
        options={countryOptions}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveValue('Canada');
  });

  it('supports controlled values', () => {
    function ControlledCombobox() {
      const [selectedCountry, setSelectedCountry] = useState('Canada');

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

    fireEvent.change(input, { target: { value: 'Mexico' } });

    expect(input).toHaveValue('Mexico');
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = vi.fn();

    render(
      <Combobox
        label="Choose a country"
        options={countryOptions}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Canada' },
    });

    expect(handleChange).toHaveBeenCalledWith('Canada');
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

    render(<Combobox label="Choose a country" options={countryOptions} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'XYZ' },
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByRole('status')).toHaveTextContent('No options found.');

    vi.useRealTimers();
  });

  // Selection

  it('selects an option when clicked', () => {
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

    expect(handleChange).toHaveBeenCalledWith('Canada');
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

    expect(handleChange).toHaveBeenLastCalledWith('Canada');
    expect(input).toHaveValue('Canada');
  });

  // Disabled options and states

  it('does not allow disabled options to be selected', () => {
    render(
      <Combobox
        label="Choose a country"
        options={[
          { value: 'Canada', label: 'Canada' },
          { value: 'Mexico', label: 'Mexico', disabled: true },
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
          { value: 'Canada', label: 'Canada' },
          { value: 'Mexico', label: 'Mexico', disabled: true },
          { value: 'Ireland', label: 'Ireland' },
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

    expect(handleChange).toHaveBeenLastCalledWith('Canada');
    expect(input).toHaveValue('Canada');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not complete disabled options', () => {
    render(
      <Combobox
        label="Choose a country"
        options={[
          { value: 'Canada', label: 'Canada', disabled: true },
          { value: 'Canary Islands', label: 'Canary Islands' },
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

    expect(handleChange).toHaveBeenLastCalledWith('Can');
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });
});
