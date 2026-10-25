import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BarChart } from './BarChart';

import type { BarChartData } from './BarChart';

const mockData: BarChartData[] = [
  { label: 'January', value: 25 },
  { label: 'February', value: 40 },
  { label: 'March', value: 65 },
];

describe('BarChart', () => {
  it('renders the chart title', () => {
    render(<BarChart title="Monthly Sales" data={mockData} />);

    expect(
      screen.getByRole('heading', { name: 'Monthly Sales' }),
    ).toBeInTheDocument();
  });

  it('renders the chart description when provided', () => {
    render(
      <BarChart
        title="Monthly Sales"
        description="Sales totals for each month."
        data={mockData}
      />,
    );

    expect(
      screen.getByText('Sales totals for each month.'),
    ).toBeInTheDocument();
  });

  it('renders all category labels', () => {
    const { container } = render(
      <BarChart title="Monthly Sales" data={mockData} />,
    );

    const chart = container.querySelector('[class*="chart"]');

    expect(chart).not.toBeNull();

    const chartContent = within(chart as HTMLElement);

    expect(chartContent.getByText('January')).toBeInTheDocument();
    expect(chartContent.getByText('February')).toBeInTheDocument();
    expect(chartContent.getByText('March')).toBeInTheDocument();
  });

  it('renders all data values', () => {
    const { container } = render(
      <BarChart title="Monthly Sales" data={mockData} />,
    );

    const chart = container.querySelector('[class*="chart"]');

    expect(chart).not.toBeNull();

    const chartContent = within(chart as HTMLElement);

    expect(chartContent.getByText('25')).toBeInTheDocument();
    expect(chartContent.getByText('40')).toBeInTheDocument();
    expect(chartContent.getByText('65')).toBeInTheDocument();
  });

  it('renders the value label when provided', () => {
    const { container } = render(
      <BarChart title="Monthly Sales" data={mockData} valueLabel="sales" />,
    );

    const chart = container.querySelector('[class*="chart"]');

    expect(chart).not.toBeNull();

    const chartContent = within(chart as HTMLElement);

    expect(chartContent.getByText('25 sales')).toBeInTheDocument();
    expect(chartContent.getByText('40 sales')).toBeInTheDocument();
    expect(chartContent.getByText('65 sales')).toBeInTheDocument();
  });

  it('renders without data', () => {
    render(<BarChart title="Monthly Sales" data={[]} />);

    expect(
      screen.getByRole('heading', { name: 'Monthly Sales' }),
    ).toBeInTheDocument();
  });

  it('renders zero values', () => {
    const zeroData: BarChartData[] = [
      { label: 'January', value: 0 },
      { label: 'February', value: 0 },
    ];

    const { container } = render(
      <BarChart title="Monthly Sales" data={zeroData} />,
    );

    const chart = container.querySelector('[class*="chart"]');

    expect(chart).not.toBeNull();

    const chartContent = within(chart as HTMLElement);

    expect(chartContent.getAllByText('0')).toHaveLength(2);
  });

  it('applies a custom class name', () => {
    const { container } = render(
      <BarChart
        title="Monthly Sales"
        data={mockData}
        className="custom-chart"
      />,
    );

    expect(container.querySelector('figure')).toHaveClass('custom-chart');
  });
});
