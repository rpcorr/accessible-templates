import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AreaChart } from './AreaChart';

describe('AreaChart', () => {
  const sampleData = [
    { label: 'January', value: 10 },
    { label: 'February', value: 20 },
    { label: 'March', value: 15 },
  ];

  it('renders the chart title', () => {
    render(<AreaChart title="Monthly Sales" data={sampleData} />);

    expect(
      screen.getByRole('heading', { name: 'Monthly Sales' }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <AreaChart
        title="Monthly Sales"
        description="Sales figures for the first quarter."
        data={sampleData}
      />,
    );

    expect(
      screen.getByText('Sales figures for the first quarter.'),
    ).toBeInTheDocument();
  });

  it('associates the figure with its title and description', () => {
    render(
      <AreaChart
        title="Monthly Sales"
        description="Quarterly sales figures."
        data={sampleData}
      />,
    );

    const figure = screen.getByRole('figure', {
      name: 'Monthly Sales',
    });

    expect(figure).toHaveAttribute('aria-describedby');
  });

  it('renders the SVG chart with an accessible label', () => {
    render(<AreaChart title="Monthly Sales" data={sampleData} />);

    expect(
      screen.getByRole('img', {
        name: /area chart/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders category labels on the chart', () => {
    const { container } = render(
      <AreaChart title="Monthly Sales" data={sampleData} />,
    );

    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();

    const labels = Array.from(svg!.querySelectorAll('text')).map(
      (element) => element.textContent,
    );

    expect(labels).toContain('January');
    expect(labels).toContain('February');
    expect(labels).toContain('March');
  });

  it('renders an area path for valid data', () => {
    const { container } = render(
      <AreaChart title="Monthly Sales" data={sampleData} />,
    );

    expect(container.querySelector('path')).toBeInTheDocument();
    expect(container.querySelector('path')).toHaveAttribute('d');
  });

  it('renders data markers for valid values', () => {
    const { container } = render(
      <AreaChart title="Monthly Sales" data={sampleData} />,
    );

    expect(container.querySelectorAll('circle')).toHaveLength(3);
  });

  it('renders a semantic data table', () => {
    render(<AreaChart title="Monthly Sales" data={sampleData} />);

    const table = screen.getByRole('table', {
      name: 'Monthly Sales data',
    });

    expect(table).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Category' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: 'Value' }),
    ).toBeInTheDocument();
  });

  it('renders data values in the accessible table', () => {
    render(<AreaChart title="Monthly Sales" data={sampleData} />);

    const table = screen.getByRole('table');

    expect(within(table).getByText('10')).toBeInTheDocument();
    expect(within(table).getByText('20')).toBeInTheDocument();
    expect(within(table).getByText('15')).toBeInTheDocument();
  });

  it('appends the value label to the table column heading', () => {
    render(
      <AreaChart
        title="Monthly Sales"
        data={sampleData}
        valueLabel="thousands"
      />,
    );

    expect(
      screen.getByRole('columnheader', {
        name: 'Value (thousands)',
      }),
    ).toBeInTheDocument();
  });

  it('renders gridlines by default', () => {
    const { container } = render(
      <AreaChart title="Monthly Sales" data={sampleData} />,
    );

    expect(container.querySelectorAll('line')).toHaveLength(5);
  });

  it('hides numerical gridlines when showGridLines is false', () => {
    const { container } = render(
      <AreaChart
        title="Monthly Sales"
        data={sampleData}
        showGridLines={false}
      />,
    );

    // Only the zero-baseline line remains.
    expect(container.querySelectorAll('line')).toHaveLength(1);
  });

  it('renders a legend for multiple datasets', () => {
    render(
      <AreaChart
        title="Annual Sales"
        data={[
          { label: 'January', value: 0 },
          { label: 'February', value: 0 },
        ]}
        datasets={[
          { label: '2025', values: [10, 20] },
          { label: '2026', values: [15, 25] },
        ]}
      />,
    );

    const legend = screen.getByRole('list', {
      name: 'Chart data series',
    });

    expect(within(legend).getByText('2025')).toBeInTheDocument();
    expect(within(legend).getByText('2026')).toBeInTheDocument();
  });

  it('renders multiple area paths for multiple datasets', () => {
    const { container } = render(
      <AreaChart
        title="Annual Sales"
        data={[
          { label: 'January', value: 0 },
          { label: 'February', value: 0 },
        ]}
        datasets={[
          { label: '2025', values: [10, 20] },
          { label: '2026', values: [15, 25] },
        ]}
      />,
    );

    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('renders multiple dataset values in the accessible table', () => {
    render(
      <AreaChart
        title="Annual Sales"
        data={[
          { label: 'January', value: 0 },
          { label: 'February', value: 0 },
        ]}
        datasets={[
          { label: '2025', values: [10, 20] },
          { label: '2026', values: [15, 25] },
        ]}
      />,
    );

    const table = screen.getByRole('table');

    expect(
      within(table).getByRole('columnheader', { name: '2025' }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', { name: '2026' }),
    ).toBeInTheDocument();

    expect(within(table).getByText('10')).toBeInTheDocument();
    expect(within(table).getByText('20')).toBeInTheDocument();
    expect(within(table).getByText('15')).toBeInTheDocument();
    expect(within(table).getByText('25')).toBeInTheDocument();
  });

  it('displays an empty-state message when there is no data', () => {
    render(<AreaChart title="Empty Chart" data={[]} />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'No valid numerical data to display.',
    );
  });

  it('displays an empty-state message when all values are invalid', () => {
    render(
      <AreaChart
        title="Invalid Chart"
        data={[
          { label: 'January', value: Number.NaN },
          { label: 'February', value: Number.POSITIVE_INFINITY },
        ]}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      'No valid numerical data to display.',
    );
  });

  it('does not render area paths when all values are invalid', () => {
    const { container } = render(
      <AreaChart
        title="Invalid Chart"
        data={[
          { label: 'January', value: Number.NaN },
          { label: 'February', value: Number.POSITIVE_INFINITY },
        ]}
      />,
    );

    expect(container.querySelectorAll('path')).toHaveLength(0);
    expect(container.querySelectorAll('circle')).toHaveLength(0);
  });

  it('shows a dash for invalid values in the accessible table', () => {
    render(
      <AreaChart
        title="Partial Data"
        data={[
          { label: 'January', value: 10 },
          { label: 'February', value: Number.NaN },
          { label: 'March', value: 15 },
        ]}
      />,
    );

    const table = screen.getByRole('table');

    expect(within(table).getByText('10')).toBeInTheDocument();
    expect(within(table).getByText('15')).toBeInTheDocument();
    expect(within(table).getByText('—')).toBeInTheDocument();
  });

  it('breaks the area into separate paths when values are invalid', () => {
    const { container } = render(
      <AreaChart
        title="Partial Data"
        data={[
          { label: 'January', value: 10 },
          { label: 'February', value: Number.NaN },
          { label: 'March', value: 15 },
        ]}
      />,
    );

    const paths = container.querySelectorAll('path');

    expect(paths).toHaveLength(2);
    expect(paths[0]).toHaveAttribute('d');
    expect(paths[1]).toHaveAttribute('d');

    expect(container.querySelectorAll('circle')).toHaveLength(2);
  });

  it('handles negative values', () => {
    const { container } = render(
      <AreaChart
        title="Monthly Losses"
        data={[
          { label: 'January', value: -10 },
          { label: 'February', value: -20 },
          { label: 'March', value: -5 },
        ]}
      />,
    );

    expect(container.querySelector('path')).toBeInTheDocument();

    const table = screen.getByRole('table');

    expect(within(table).getByText('-10')).toBeInTheDocument();
    expect(within(table).getByText('-20')).toBeInTheDocument();
    expect(within(table).getByText('-5')).toBeInTheDocument();
  });

  it('handles a mixture of positive and negative values', () => {
    const { container } = render(
      <AreaChart
        title="Monthly Results"
        data={[
          { label: 'January', value: -10 },
          { label: 'February', value: 20 },
          { label: 'March', value: -5 },
        ]}
      />,
    );

    expect(container.querySelector('path')).toBeInTheDocument();
    expect(container.querySelectorAll('circle')).toHaveLength(3);
  });

  it('handles a single data point', () => {
    const { container } = render(
      <AreaChart
        title="Single Point"
        data={[{ label: 'January', value: 10 }]}
      />,
    );

    expect(container.querySelector('path')).toBeInTheDocument();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    const { container } = render(
      <AreaChart
        title="Monthly Sales"
        data={sampleData}
        className="custom-chart"
      />,
    );

    expect(container.querySelector('figure')).toHaveClass('custom-chart');
  });

  it('handles datasets with missing values', () => {
    render(
      <AreaChart
        title="Annual Sales"
        data={[
          { label: 'January', value: 0 },
          { label: 'February', value: 0 },
          { label: 'March', value: 0 },
        ]}
        datasets={[{ label: '2025', values: [10, Number.NaN, 30] }]}
      />,
    );

    const table = screen.getByRole('table');

    expect(within(table).getByText('10')).toBeInTheDocument();
    expect(within(table).getByText('30')).toBeInTheDocument();
    expect(within(table).getByText('—')).toBeInTheDocument();
  });

  it('does not render a legend when datasets are not provided', () => {
    render(<AreaChart title="Monthly Sales" data={sampleData} />);

    expect(
      screen.queryByRole('list', { name: 'Chart data series' }),
    ).not.toBeInTheDocument();
  });
});
