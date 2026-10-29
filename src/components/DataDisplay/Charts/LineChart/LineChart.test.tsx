import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LineChart } from './LineChart';

describe('LineChart', () => {
  it('renders the chart title', () => {
    render(
      <LineChart
        title="Monthly visitors"
        data={[
          { label: 'January', value: 120 },
          { label: 'February', value: 150 },
        ]}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Monthly visitors' }),
    ).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <LineChart
        title="Monthly visitors"
        description="Website visits over two months."
        data={[{ label: 'January', value: 120 }]}
      />,
    );

    expect(
      screen.getByText('Website visits over two months.'),
    ).toBeInTheDocument();
  });

  it('renders category labels in the chart and data table', () => {
    render(
      <LineChart
        title="Monthly visitors"
        data={[
          { label: 'January', value: 120 },
          { label: 'February', value: 150 },
        ]}
      />,
    );

    const table = screen.getByRole('table', {
      name: 'Monthly visitors data',
    });

    expect(within(table).getByText('January')).toBeInTheDocument();
    expect(within(table).getByText('February')).toBeInTheDocument();
    expect(within(table).getByText('120')).toBeInTheDocument();
    expect(within(table).getByText('150')).toBeInTheDocument();
  });

  it('renders multiple dataset labels and values', () => {
    render(
      <LineChart
        title="Annual visitors"
        data={[
          { label: '2024', value: 100 },
          { label: '2025', value: 150 },
        ]}
        datasets={[
          { label: 'Desktop', values: [100, 150] },
          { label: 'Mobile', values: [80, 120] },
        ]}
      />,
    );

    const legend = screen.getByRole('list', {
      name: 'Chart data series',
    });

    expect(within(legend).getByText('Desktop')).toBeInTheDocument();
    expect(within(legend).getByText('Mobile')).toBeInTheDocument();

    const table = screen.getByRole('table', {
      name: 'Annual visitors data',
    });

    expect(within(table).getByText('100')).toBeInTheDocument();
    expect(within(table).getByText('150')).toBeInTheDocument();
    expect(within(table).getByText('80')).toBeInTheDocument();
    expect(within(table).getByText('120')).toBeInTheDocument();
  });

  it('renders an SVG line chart with point markers', () => {
    const { container } = render(
      <LineChart
        title="Monthly visitors"
        data={[
          { label: 'January', value: 120 },
          { label: 'February', value: 150 },
          { label: 'March', value: 135 },
        ]}
      />,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelectorAll('circle')).toHaveLength(3);
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  it('renders grid lines by default', () => {
    const { container } = render(
      <LineChart
        title="Monthly visitors"
        data={[{ label: 'January', value: 120 }]}
      />,
    );

    expect(container.querySelectorAll('line').length).toBeGreaterThan(0);
  });

  it('can hide grid lines', () => {
    const { container } = render(
      <LineChart
        title="Monthly visitors"
        data={[{ label: 'January', value: 120 }]}
        showGridLines={false}
      />,
    );

    expect(container.querySelectorAll('line')).toHaveLength(1);
  });

  it('renders negative values', () => {
    render(
      <LineChart
        title="Profit and loss"
        data={[
          { label: 'January', value: -20 },
          { label: 'February', value: 30 },
        ]}
      />,
    );

    const table = screen.getByRole('table', {
      name: 'Profit and loss data',
    });

    expect(within(table).getByText('-20')).toBeInTheDocument();
    expect(within(table).getByText('30')).toBeInTheDocument();
  });

  it('handles non-finite values without drawing invalid points', () => {
    const { container } = render(
      <LineChart
        title="Test values"
        data={[
          { label: 'A', value: 10 },
          { label: 'B', value: Number.NaN },
          { label: 'C', value: 20 },
        ]}
      />,
    );

    expect(container.querySelectorAll('circle')).toHaveLength(2);

    const table = screen.getByRole('table', {
      name: 'Test values data',
    });

    expect(within(table).getByText('—')).toBeInTheDocument();
  });

  it('shows an empty-state message when no valid values exist', () => {
    render(
      <LineChart
        title="Empty chart"
        data={[
          { label: 'A', value: Number.NaN },
          { label: 'B', value: Number.POSITIVE_INFINITY },
        ]}
      />,
    );

    expect(
      screen.getByText('No valid numerical data to display.'),
    ).toBeInTheDocument();
  });

  it('handles empty data', () => {
    render(<LineChart title="Empty chart" data={[]} />);

    expect(
      screen.getByText('No valid numerical data to display.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('table', { name: 'Empty chart data' }),
    ).toBeInTheDocument();
  });

  it('includes the optional unit in the table heading', () => {
    render(
      <LineChart
        title="Conversion rate"
        valueLabel="%"
        data={[{ label: 'January', value: 12 }]}
      />,
    );

    const table = screen.getByRole('table', {
      name: 'Conversion rate data',
    });

    expect(
      within(table).getByRole('columnheader', {
        name: 'Value (%)',
      }),
    ).toBeInTheDocument();
  });
});
