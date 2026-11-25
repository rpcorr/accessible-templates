import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchCombobox } from './SearchCombobox';

const options = [
  { value: 'accessibility', label: 'Web Accessibility' },
  { value: 'react', label: 'React Development' },
  { value: 'wordpress', label: 'WordPress Development' },
];

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('SearchCombobox', () => {
  it('renders the combobox with a label', () => {
    render(<SearchCombobox label="Search resources" options={options} />);

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toBeInTheDocument();
  });

  it('renders a description and associates it with the input', () => {
    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        description="Search by title or keyword."
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    const description = screen.getByText('Search by title or keyword.');

    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  it('supports a placeholder', () => {
    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        placeholder="Enter a search term"
      />,
    );

    expect(
      screen.getByPlaceholderText('Enter a search term'),
    ).toBeInTheDocument();
  });

  it('supports a custom id and name', () => {
    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        id="resource-search"
        name="search"
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    expect(input).toHaveAttribute('id', 'resource-search');
    expect(input).toHaveAttribute('name', 'search');
  });

  it('supports the required attribute', () => {
    render(
      <SearchCombobox label="Search resources" options={options} required />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toBeRequired();
  });

  it('supports the disabled attribute', () => {
    render(
      <SearchCombobox label="Search resources" options={options} disabled />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toBeDisabled();
  });

  it('supports a default value', () => {
    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        defaultValue="React Development"
      />,
    );

    expect(
      screen.getByRole('combobox', { name: 'Search resources' }),
    ).toHaveValue('React Development');
  });

  it('supports controlled input values', async () => {
    const user = userEvent.setup();

    function ControlledSearchCombobox() {
      const [search, setSearch] = useState('React');

      return (
        <SearchCombobox
          label="Search resources"
          options={options}
          value={search}
          onChange={setSearch}
        />
      );
    }

    render(<ControlledSearchCombobox />);

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.type(input, ' Development');

    expect(input).toHaveValue('React Development');
  });

  it('supports uncontrolled input values', async () => {
    const user = userEvent.setup();

    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        defaultValue="React"
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.type(input, ' Development');

    expect(input).toHaveValue('React Development');
  });

  it('opens the suggestions when the input receives focus', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    await user.click(
      screen.getByRole('combobox', { name: 'Search resources' }),
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters suggestions based on the input value', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    await user.type(
      screen.getByRole('combobox', { name: 'Search resources' }),
      'React',
    );

    expect(
      screen.getByRole('option', { name: 'React Development' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Web Accessibility' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'WordPress Development' }),
    ).not.toBeInTheDocument();
  });

  it('navigates suggestions using the ArrowDown key', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', { name: 'Search resources' });

    await user.click(input);
    await user.keyboard('{ArrowDown}');

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      `${input.id}-option-0`,
    );
  });

  it('selects the active suggestion when Enter is pressed', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', { name: 'Search resources' });

    await user.click(input);
    await user.keyboard('{ArrowDown}{Enter}');

    expect(input).toHaveValue('accessibility');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the suggestions when Escape is pressed', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', { name: 'Search resources' });

    await user.click(input);
    await user.keyboard('{Escape}');

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('displays a no results message when there are no matching suggestions', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    await user.type(
      screen.getByRole('combobox', { name: 'Search resources' }),
      'xyz123',
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('navigates suggestions using the ArrowUp key', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.click(input);
    await user.keyboard('{ArrowUp}');

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      `${input.id}-option-2`,
    );
  });

  it('selects a suggestion when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'React Development' }));

    expect(input).toHaveValue('react');
    expect(handleChange).toHaveBeenCalledWith('react');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the suggestions when clicking outside the combobox', async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchCombobox label="Search resources" options={options} />
        <button type="button">Outside button</button>
      </>,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.click(input);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Outside button' }));

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select a disabled suggestion', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const optionsWithDisabled = [
      { value: 'accessibility', label: 'Web Accessibility' },
      { value: 'react', label: 'React Development', disabled: true },
      { value: 'wordpress', label: 'WordPress Development' },
    ];

    render(
      <SearchCombobox
        label="Search resources"
        options={optionsWithDisabled}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.click(input);

    await user.click(screen.getByRole('option', { name: 'React Development' }));

    expect(input).toHaveValue('');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('updates aria-expanded when the suggestions open and close', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    expect(input).toHaveAttribute('aria-expanded', 'false');

    await user.click(input);

    expect(input).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');

    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('associates the combobox with its listbox', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.click(input);

    const listbox = screen.getByRole('listbox');

    expect(input).toHaveAttribute('aria-controls', listbox.id);
  });

  it('identifies the selected option with aria-selected', async () => {
    const user = userEvent.setup();

    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        defaultValue="react"
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.clear(input);
    await user.click(input);

    expect(
      screen.getByRole('option', { name: 'Web Accessibility' }),
    ).toHaveAttribute('aria-selected', 'false');

    expect(
      screen.getByRole('option', { name: 'React Development' }),
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('associates an error message with the input', () => {
    render(
      <SearchCombobox
        label="Search resources"
        options={options}
        error="Please enter a search term."
      />,
    );

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    const error = screen.getByText('Please enter a search term.');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${input.id}-error`);
    expect(error).toHaveAttribute('id', `${input.id}-error`);
  });

  it('exposes disabled suggestions through aria-disabled', async () => {
    const user = userEvent.setup();

    const optionsWithDisabled = [
      { value: 'accessibility', label: 'Web Accessibility' },
      { value: 'react', label: 'React Development', disabled: true },
    ];

    render(
      <SearchCombobox label="Search resources" options={optionsWithDisabled} />,
    );

    await user.click(
      screen.getByRole('combobox', { name: 'Search resources' }),
    );

    expect(
      screen.getByRole('option', { name: 'React Development' }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('keeps aria-controls associated with the listbox when no suggestions match', async () => {
    const user = userEvent.setup();

    render(<SearchCombobox label="Search resources" options={options} />);

    const input = screen.getByRole('combobox', {
      name: 'Search resources',
    });

    await user.type(input, 'xyz123');

    const listbox = screen.getByRole('listbox');

    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(listbox).toBeInTheDocument();
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
