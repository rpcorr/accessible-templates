import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { PieChart } from './PieChart';

describe('PieChart', () => {
  const sampleData = [
    { label: 'Organic Search', value: 50 },
    { label: 'Direct', value: 30 },
    { label: 'Social Media', value: 20 },
  ];

  it('renders the chart title', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    expect(
      screen.getByRole('heading', { name: 'Website Traffic' }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <PieChart
        title="Website Traffic"
        description="Traffic sources for this month."
        data={sampleData}
      />,
    );

    expect(
      screen.getByText('Traffic sources for this month.'),
    ).toBeInTheDocument();
  });

  it('does not render a description when one is not provided', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    expect(
      screen.queryByText('Traffic sources for this month.'),
    ).not.toBeInTheDocument();
  });

  it('renders each category in the legend', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getByText('Organic Search')).toBeInTheDocument();
    expect(within(legend).getByText('Direct')).toBeInTheDocument();
    expect(within(legend).getByText('Social Media')).toBeInTheDocument();
  });

  it('calculates and displays the correct percentages', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getByText('50 (50.0%)')).toBeInTheDocument();
    expect(within(legend).getByText('30 (30.0%)')).toBeInTheDocument();
    expect(within(legend).getByText('20 (20.0%)')).toBeInTheDocument();
  });

  it('renders the pie graphic with an accessible label', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    expect(
      screen.getByRole('img', {
        name: /Website Traffic.*Organic Search: 50, 50\.0%/,
      }),
    ).toBeInTheDocument();
  });

  it('renders a semantic data table with category, value, and percentage', () => {
    render(
      <PieChart
        title="Website Traffic"
        data={sampleData}
        valueLabel="Visits"
      />,
    );

    const table = screen.getByRole('table', {
      name: 'Website Traffic data',
    });

    expect(
      within(table).getByRole('columnheader', { name: 'Category' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Visits' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Percentage' }),
    ).toBeInTheDocument();

    const organicSearchRow = within(table).getByRole('row', {
      name: /Organic Search/,
    });

    expect(within(organicSearchRow).getByText('50')).toBeInTheDocument();
    expect(within(organicSearchRow).getByText('50.0%')).toBeInTheDocument();
  });

  it('renders a single category correctly', () => {
    render(
      <PieChart
        title="Single Category"
        data={[{ label: 'Completed', value: 100 }]}
      />,
    );

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getByText('Completed')).toBeInTheDocument();
    expect(within(legend).getByText('100 (100.0%)')).toBeInTheDocument();
  });

  it('handles an empty dataset', () => {
    render(<PieChart title="Empty Chart" data={[]} />);

    expect(
      screen.getByRole('img', {
        name: 'Empty Chart. No positive values to display.',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  it('handles zero values without producing invalid percentages', () => {
    const zeroData = [
      { label: 'Category A', value: 0 },
      { label: 'Category B', value: 0 },
    ];

    render(<PieChart title="Zero Values" data={zeroData} />);

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getAllByText('0 (0.0%)')).toHaveLength(2);

    expect(
      screen.getByRole('img', {
        name: 'Zero Values. No positive values to display.',
      }),
    ).toBeInTheDocument();
  });

  it('treats negative and non-finite values as zero', () => {
    const invalidData = [
      { label: 'Negative', value: -10 },
      { label: 'Not a Number', value: Number.NaN },
      { label: 'Infinite', value: Number.POSITIVE_INFINITY },
      { label: 'Valid', value: 25 },
    ];

    render(<PieChart title="Validated Values" data={invalidData} />);

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getByText('Negative')).toBeInTheDocument();
    expect(within(legend).getByText('Not a Number')).toBeInTheDocument();
    expect(within(legend).getByText('Infinite')).toBeInTheDocument();
    expect(within(legend).getByText('Valid')).toBeInTheDocument();
    expect(within(legend).getByText('25 (100.0%)')).toBeInTheDocument();
    expect(within(legend).getAllByText('0 (0.0%)')).toHaveLength(3);
  });

  it('applies the supplied class name', () => {
    const { container } = render(
      <PieChart
        title="Custom Class"
        data={sampleData}
        className="custom-pie-chart"
      />,
    );

    expect(container.firstElementChild).toHaveClass('custom-pie-chart');
  });

  it('renders the correct number of legend items', () => {
    render(<PieChart title="Website Traffic" data={sampleData} />);

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getAllByRole('listitem')).toHaveLength(3);
  });

  it('offsets slice geometry when exploded is enabled', () => {
    const { container, unmount } = render(
      <PieChart title="Website Traffic" data={sampleData} />,
    );

    const standardPaths = Array.from(
      container.querySelectorAll('svg path'),
      (path) => path.getAttribute('d'),
    );

    expect(standardPaths).toHaveLength(3);

    unmount();

    const { container: explodedContainer } = render(
      <PieChart title="Website Traffic" data={sampleData} exploded />,
    );

    const explodedPaths = Array.from(
      explodedContainer.querySelectorAll('svg path'),
      (path) => path.getAttribute('d'),
    );

    expect(explodedPaths).toHaveLength(3);
    expect(explodedPaths).not.toEqual(standardPaths);
  });

  it('preserves accessible chart information when exploded is enabled', () => {
    render(<PieChart title="Website Traffic" data={sampleData} exploded />);

    expect(
      screen.getByRole('img', {
        name: /Website Traffic.*Organic Search: 50, 50\.0%/,
      }),
    ).toBeInTheDocument();

    const legend = screen.getByRole('list', {
      name: 'Chart categories',
    });

    expect(within(legend).getByText('Organic Search')).toBeInTheDocument();
    expect(within(legend).getByText('50 (50.0%)')).toBeInTheDocument();
    expect(within(legend).getByText('Direct')).toBeInTheDocument();
    expect(within(legend).getByText('Social Media')).toBeInTheDocument();

    expect(
      screen.getByRole('table', {
        name: 'Website Traffic data',
      }),
    ).toBeInTheDocument();
  });

  it('renders the standard chart when exploded is omitted', () => {
    const { container: defaultContainer } = render(
      <PieChart title="Website Traffic" data={sampleData} />,
    );

    const defaultPaths = Array.from(
      defaultContainer.querySelectorAll('svg path'),
      (path) => path.getAttribute('d'),
    );

    expect(defaultPaths).toHaveLength(3);

    defaultContainer.remove();

    const { container: explicitFalseContainer } = render(
      <PieChart title="Website Traffic" data={sampleData} exploded={false} />,
    );

    const explicitFalsePaths = Array.from(
      explicitFalseContainer.querySelectorAll('svg path'),
      (path) => path.getAttribute('d'),
    );

    expect(explicitFalsePaths).toEqual(defaultPaths);
  });

  it('handles very large finite values without invalid percentages', () => {
    render(
      <PieChart
        title="Large Values"
        data={[
          { label: 'Category A', value: Number.MAX_VALUE },
          { label: 'Category B', value: Number.MAX_VALUE },
        ]}
      />,
    );

    expect(screen.getAllByText('50.0%', { selector: 'td' })).toHaveLength(2);
  });
});
