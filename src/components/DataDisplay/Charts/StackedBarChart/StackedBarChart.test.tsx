import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StackedBarChart from './StackedBarChart';
import type {
  StackedBarChartData,
  StackedBarChartDataset,
} from './StackedBarChart';

const mockData: StackedBarChartData[] = [
  { label: 'January', value: 30 },
  { label: 'February', value: 45 },
  { label: 'March', value: 60 },
];

const mockDatasets: StackedBarChartDataset[] = [
  {
    label: 'Desktop',
    values: [20, 25, 35],
  },
  {
    label: 'Mobile',
    values: [10, 20, 25],
  },
];

describe('StackedBarChart', () => {
  it('renders the chart title', () => {
    render(<StackedBarChart title="Monthly Visitors" data={mockData} />);

    expect(
      screen.getByRole('heading', { name: 'Monthly Visitors' }),
    ).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <StackedBarChart
        title="Monthly Visitors"
        description="Visitors by month."
        data={mockData}
      />,
    );

    expect(screen.getByText('Visitors by month.')).toBeInTheDocument();
  });

  it('renders category labels', () => {
    const { container } = render(
      <StackedBarChart title="Monthly Visitors" data={mockData} />,
    );

    const chart = container.querySelector('svg');

    expect(chart).toBeInTheDocument();

    expect(chart?.textContent).toContain('January');
    expect(chart?.textContent).toContain('February');
    expect(chart?.textContent).toContain('March');
  });

  it('renders the data values in the accessible table', () => {
    render(<StackedBarChart title="Monthly Visitors" data={mockData} />);

    expect(screen.getByRole('table')).toBeInTheDocument();

    const table = screen.getByRole('table');

    expect(within(table).getByText('January')).toBeInTheDocument();
    expect(within(table).getByText('30')).toBeInTheDocument();
    expect(within(table).getByText('February')).toBeInTheDocument();
    expect(within(table).getByText('45')).toBeInTheDocument();
    expect(within(table).getByText('March')).toBeInTheDocument();
    expect(within(table).getByText('60')).toBeInTheDocument();
  });

  it('renders a custom value label when provided', () => {
    render(
      <StackedBarChart
        title="Monthly Visitors"
        data={mockData}
        valueLabel="Visitors"
      />,
    );

    expect(screen.getByText('Visitors')).toBeInTheDocument();
  });

  it('renders the dataset legend when multiple datasets are provided', () => {
    render(
      <StackedBarChart
        title="Monthly Visitors"
        data={mockData}
        datasets={mockDatasets}
      />,
    );

    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('renders multiple datasets in the accessible table', () => {
    render(
      <StackedBarChart
        title="Monthly Visitors"
        data={mockData}
        datasets={mockDatasets}
      />,
    );

    const table = screen.getByRole('table');

    expect(within(table).getByText('Desktop')).toBeInTheDocument();
    expect(within(table).getByText('Mobile')).toBeInTheDocument();
    expect(within(table).getByText('January')).toBeInTheDocument();
    expect(within(table).getByText('February')).toBeInTheDocument();
    expect(within(table).getByText('March')).toBeInTheDocument();

    expect(within(table).getByText('20')).toBeInTheDocument();
    expect(within(table).getByText('10')).toBeInTheDocument();
    expect(within(table).getByText('25')).toBeInTheDocument();
  });

  it('renders a zero value correctly', () => {
    render(
      <StackedBarChart
        title="Zero Values"
        data={[
          { label: 'January', value: 0 },
          { label: 'February', value: 15 },
        ]}
      />,
    );

    const table = screen.getByRole('table');

    expect(within(table).getByText('0')).toBeInTheDocument();
    expect(within(table).getByText('15')).toBeInTheDocument();
  });

  it('renders negative values in the accessible table', () => {
    render(
      <StackedBarChart
        title="Profit and Loss"
        data={[
          { label: 'January', value: -10 },
          { label: 'February', value: 25 },
        ]}
      />,
    );

    const table = screen.getByRole('table');

    expect(within(table).getByText('-10')).toBeInTheDocument();
    expect(within(table).getByText('25')).toBeInTheDocument();
  });

  it('shows an empty state when no data is provided', () => {
    render(<StackedBarChart title="Empty Chart" data={[]} />);

    expect(
      screen.getByRole('status', {
        name: /no valid numerical data to display/i,
      }),
    ).toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    const { container } = render(
      <StackedBarChart
        title="Monthly Visitors"
        data={mockData}
        className="custom-chart"
      />,
    );

    expect(container.querySelector('.custom-chart')).toBeInTheDocument();
  });
});
