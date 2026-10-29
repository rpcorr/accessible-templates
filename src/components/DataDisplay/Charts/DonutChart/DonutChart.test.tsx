import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { DonutChart } from './DonutChart';

describe('DonutChart', () => {
  const sampleData = [
    { label: 'Desktop', value: 60 },
    { label: 'Mobile', value: 30 },
    { label: 'Tablet', value: 10 },
  ];

  it('renders the chart title', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    expect(
      screen.getByRole('heading', { name: 'Device Usage' }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <DonutChart
        title="Device Usage"
        description="Visitors by device type"
        data={sampleData}
      />,
    );

    expect(screen.getByText('Visitors by device type')).toBeInTheDocument();
  });

  it('renders category labels in the legend', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    const legend = screen.getByRole('list', { name: /chart categories/i });

    expect(within(legend).getByText('Desktop')).toBeInTheDocument();
    expect(within(legend).getByText('Mobile')).toBeInTheDocument();
    expect(within(legend).getByText('Tablet')).toBeInTheDocument();
  });

  it('renders category values in the legend', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    const legend = screen.getByRole('list', { name: /chart categories/i });

    expect(within(legend).getByText(/60\s*\(/)).toBeInTheDocument();
    expect(within(legend).getByText(/30\s*\(/)).toBeInTheDocument();
    expect(within(legend).getByText(/10\s*\(/)).toBeInTheDocument();
  });

  it('renders category values accessibly in the legend', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    const legend = screen.getByRole('list', { name: /chart categories/i });

    expect(within(legend).getByText(/60\s*\(/)).toBeInTheDocument();
    expect(within(legend).getByText(/30\s*\(/)).toBeInTheDocument();
    expect(within(legend).getByText(/10\s*\(/)).toBeInTheDocument();
  });

  it('renders the chart categories in an accessible legend', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    const legend = screen.getByRole('list', {
      name: /chart categories/i,
    });

    expect(legend).toBeInTheDocument();
    expect(within(legend).getByText('Desktop')).toBeInTheDocument();
    expect(within(legend).getByText('Mobile')).toBeInTheDocument();
    expect(within(legend).getByText('Tablet')).toBeInTheDocument();
  });

  it('provides an accessible chart graphic', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders percentage values for each category', () => {
    render(<DonutChart title="Device Usage" data={sampleData} />);

    const legend = screen.getByRole('list', {
      name: /chart categories/i,
    });

    const legendItems = within(legend).getAllByRole('listitem');

    expect(legendItems[0]).toHaveTextContent('Desktop');
    expect(legendItems[0]).toHaveTextContent('60 (60.0%)');

    expect(legendItems[1]).toHaveTextContent('Mobile');
    expect(legendItems[1]).toHaveTextContent('30 (30.0%)');

    expect(legendItems[2]).toHaveTextContent('Tablet');
    expect(legendItems[2]).toHaveTextContent('10 (10.0%)');
  });

  it('handles an empty dataset', () => {
    render(<DonutChart title="Empty Chart" data={[]} />);

    expect(
      screen.getByText(/no positive values to display/i),
    ).toBeInTheDocument();
  });

  it('handles data containing only zero values', () => {
    render(
      <DonutChart
        title="Zero Values"
        data={[
          { label: 'Desktop', value: 0 },
          { label: 'Mobile', value: 0 },
        ]}
      />,
    );

    expect(
      screen.getByText(/no positive values to display/i),
    ).toBeInTheDocument();
  });

  it('handles negative and non-finite values without crashing', () => {
    render(
      <DonutChart
        title="Invalid Values"
        data={[
          { label: 'Negative', value: -5 },
          { label: 'Not a Number', value: Number.NaN },
          { label: 'Infinite', value: Number.POSITIVE_INFINITY },
        ]}
      />,
    );

    expect(
      screen.getByText(/no positive values to display/i),
    ).toBeInTheDocument();
  });

  it('renders positive values when invalid values are also present', () => {
    render(
      <DonutChart
        title="Mixed Values"
        data={[
          { label: 'Valid', value: 25 },
          { label: 'Negative', value: -5 },
          { label: 'Invalid', value: Number.NaN },
        ]}
      />,
    );

    const legend = screen.getByRole('list', { name: /chart categories/i });

    expect(within(legend).getByText('Valid')).toBeInTheDocument();
    expect(within(legend).queryByText('Negative')).not.toBeInTheDocument();
    expect(within(legend).queryByText('Invalid')).not.toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    const { container } = render(
      <DonutChart
        title="Device Usage"
        data={sampleData}
        className="custom-donut-chart"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-donut-chart');
  });

  it('supports the exploded layout', () => {
    const { container } = render(
      <DonutChart title="Device Usage" data={sampleData} exploded />,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles very large finite values without crashing', () => {
    render(
      <DonutChart
        title="Large Values"
        data={[
          { label: 'Category A', value: Number.MAX_VALUE },
          { label: 'Category B', value: Number.MAX_VALUE },
        ]}
      />,
    );

    const legend = screen.getByRole('list', { name: /chart categories/i });

    expect(within(legend).getByText('Category A')).toBeInTheDocument();
    expect(within(legend).getByText('Category B')).toBeInTheDocument();
  });
});
