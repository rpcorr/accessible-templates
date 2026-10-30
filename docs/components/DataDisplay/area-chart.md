# Area Chart

The Area Chart component provides an accessible way to visualize changes in numerical values across categories or over time, emphasizing the magnitude of values using filled areas. It supports single-series and multiple-series datasets, positive and negative values, semi-transparent fills, optional grid lines, a series legend, and an accompanying semantic data table.

## Features

- Semantic HTML `<figure>` and `<figcaption>` structure
- Accessible chart title and optional description
- SVG-based area chart rendering
- Support for single-series and multiple-series datasets
- Filled areas extending to a zero baseline
- Support for positive, negative, and zero values
- Support for multiple overlapping data series
- Semi-transparent fills to help distinguish overlapping datasets
- Accessible legend identifying multiple data series
- Category labels and numerical axis labels when grid lines are enabled
- Optional grid lines through the `showGridLines` prop, disabled by default
- Optional value label for identifying the units represented by the data
- Semantic data table containing the underlying chart values
- Accessible empty-state messaging when no valid numerical data is available
- Handling of non-finite numerical values and missing data
- Separate area segments when invalid values interrupt a data series
- Responsive layout with horizontal scrolling on smaller screens
- CSS Modules and CSS custom properties for styling
- Screen reader support

## Installation

Import the component from the Area Chart component directory:

```tsx
import { AreaChart } from '../../components/DataDisplay/Charts/AreaChart';
```

Adjust the import path as necessary for your project structure.

## Basic Usage

Provide a title and an array of category labels and numerical values.

```tsx
import { AreaChart } from '../../components/DataDisplay/Charts/AreaChart';

const data = [
  { label: 'January', value: 120 },
  { label: 'February', value: 180 },
  { label: 'March', value: 150 },
  { label: 'April', value: 240 },
];

export const MonthlyVisitors = () => (
  <AreaChart
    title="Monthly Visitors"
    description="Website visitors recorded during the first four months of the year."
    data={data}
    valueLabel="visitors"
  />
);
```

Each data item contains a `label` for the category and a numerical `value` for the corresponding point in the chart.

By default, grid lines are disabled. The area is filled from each data point to the zero baseline.

## Multiple Data Series

The Area Chart supports multiple datasets so that users can compare related trends across different groups.

Each dataset has a `label` identifying the series and a `values` array containing the numerical values corresponding to the categories in `data`.

```tsx
import { AreaChart } from '../../components/DataDisplay/Charts/AreaChart';

const data = [
  { label: 'January', value: 0 },
  { label: 'February', value: 0 },
  { label: 'March', value: 0 },
  { label: 'April', value: 0 },
];

const datasets = [
  {
    label: '2025',
    values: [100, 150, 130, 180],
  },
  {
    label: '2026',
    values: [120, 170, 160, 210],
  },
];

export const AnnualVisitors = () => (
  <AreaChart
    title="Monthly Visitors by Year"
    description="Comparison of website visitors across two years."
    data={data}
    datasets={datasets}
  />
);
```

When using multiple datasets, the category labels in `data` establish the positions along the horizontal axis. Each dataset supplies the numerical values plotted for those categories.

The number and order of values in each dataset should align with the categories in `data`.

The legend identifies each dataset. Semi-transparent fills and distinct series colours help users distinguish overlapping areas.

**Note:** Multiple datasets overlap rather than stack. Consider the potential for one filled area to obscure another when comparing several datasets.

## Grid Lines

Grid lines can be enabled using the `showGridLines` prop. They provide a visual reference to help users estimate numerical values and compare changes between data points.

```tsx
<AreaChart
  title="Quarterly Revenue"
  description="Revenue totals across four quarters."
  data={[
    { label: 'Q1', value: 12000 },
    { label: 'Q2', value: 18000 },
    { label: 'Q3', value: 15000 },
    { label: 'Q4', value: 22000 },
  ]}
  valueLabel="dollars"
  showGridLines
/>
```

Grid lines are disabled by default. When `showGridLines` is enabled, the chart displays horizontal grid lines and numerical axis labels.

When grid lines are disabled, a horizontal zero-baseline line remains available to distinguish positive and negative values.

## Component Props

| Prop            | Type                 | Required | Description                                                                           |
| --------------- | -------------------- | -------- | ------------------------------------------------------------------------------------- |
| `title`         | `string`             | Yes      | Chart title used to identify the chart.                                               |
| `data`          | `AreaChartData[]`    | Yes      | Category labels and numerical values used to establish the chart's data points.       |
| `datasets`      | `AreaChartDataset[]` | No       | Additional labelled data series for comparing multiple datasets.                      |
| `description`   | `string`             | No       | Additional context about the chart.                                                   |
| `valueLabel`    | `string`             | No       | Optional label identifying the units or type of values represented in the data table. |
| `showGridLines` | `boolean`            | No       | Controls the display of grid lines and numerical axis labels. Defaults to `false`.    |
| `className`     | `string`             | No       | Additional CSS class for custom styling.                                              |

### Data Types

The single-series data structure uses a label and numerical value:

```tsx
interface AreaChartData {
  label: string;
  value: number;
}
```

A multiple-series dataset uses a label and an array of numerical values:

```tsx
interface AreaChartDataset {
  label: string;
  values: number[];
}
```

Use the component's exported TypeScript interfaces where available rather than redefining these types in your application.

## Accessibility

The Area Chart is designed to make numerical information available to people who cannot easily interpret the visual chart.

### Semantic Structure

The component uses a semantic `<figure>` with a `<figcaption>` containing the chart title and optional description. The figure is associated with its title and, when provided, its description.

This structure helps assistive technology users identify the chart and understand its purpose.

### SVG Chart

The chart is rendered using SVG. The SVG has an accessible image role and label and includes a title identifying the chart.

The chart's accessible label also informs users that category labels and numerical values are available in the accompanying data table.

### Data Table

A semantic HTML data table provides an alternative to interpreting the visual chart.

The table includes:

- A descriptive caption identifying the chart data
- Column headers for categories and data series
- Row headers identifying each category
- Numerical values corresponding to each data series
- An indication when a numerical value is unavailable

The table is visually hidden while remaining available to assistive technologies. This allows screen reader users to access the underlying information in a structured format.

### Multiple Data Series

When multiple datasets are provided, the component displays a legend identifying each series.

Distinct series colours and semi-transparent fills help users distinguish datasets. The legend provides descriptive labels so that users do not have to rely on colour alone.

### Empty and Invalid Data

When the component has no valid numerical values to display, it provides an empty-state message and retains the chart's accessible structure and data table.

Non-finite numerical values are handled so they do not produce invalid plotted points. Invalid values interrupt an area segment rather than allowing the chart to draw a potentially misleading area across missing data.

Negative and zero values are also supported.

### Keyboard Accessibility

The chart is a data visualization rather than an interactive control. It does not require keyboard interaction for users to read its content.

The accompanying semantic data table provides a structured alternative for understanding the chart's values.

## Responsive Behaviour

The Area Chart is designed to remain usable across desktop, tablet, and mobile screen sizes.

- The chart adapts to the available container width.
- A minimum chart width preserves space for axis and category labels.
- Horizontal scrolling allows users to inspect the chart on narrow screens.
- Axis labels use the project's typography and text colour tokens.
- The legend can wrap when space is limited.
- The data table remains available to assistive technologies.

When testing at smaller viewport widths, verify that category labels remain legible, chart content is not clipped, and horizontal scrolling works as expected.

## Usage Guidelines

- Provide a meaningful chart title that describes the information being presented.
- Include a description when additional context is needed to understand the data.
- Use clear category labels and meaningful dataset names.
- Keep the values in each dataset aligned with the category order in `data`.
- Use area charts when emphasizing the magnitude of values and changes over time or across an ordered sequence.
- Use multiple datasets when comparing related trends.
- Remember that multiple areas overlap rather than stack.
- Avoid displaying too many datasets, as overlapping fills can obscure underlying information.
- Use the `showGridLines` prop when users would benefit from a numerical reference for estimating values. Grid lines are disabled by default.
- Include negative values when the data represents measurements that can fall below zero, such as profit and loss.
- Provide the value units when they are important for interpreting the data.
- Do not rely on area colour, transparency, or visual position alone to communicate important information.
- Make the underlying data available through the accompanying semantic data table.
- Avoid presenting an area chart as the only means of communicating important numerical information.

## Accessibility Testing

The Area Chart's automated tests cover chart rendering, chart titles and descriptions, single and multiple datasets, area paths and markers, category labels, grid lines, data table content, empty datasets, and handling of numerical values.

Continue to verify the component with:

- Keyboard-only navigation
- NVDA screen reader
- Responsive layouts, including narrow mobile viewports
- Browser zoom at 200% and 400%
- Colour contrast and differentiation between data series
- Verification of the semantic data table
- Testing with positive, negative, zero, and missing numerical values

## Related Components

- [Bar Chart](./bar-chart.md) — Displays numerical comparisons across categories using vertical or horizontal bars, with support for single-series and grouped datasets.
- [Line Chart](./line-chart.md) — Displays trends and changes in numerical values across categories or over time using lines and markers.
- [Stacked Bar Chart](./stacked-bar-chart.md) — Compares category totals and individual contributions using stacked bar segments and multiple datasets.
- [Donut Chart](./donut-chart.md) — Displays proportions across categories using a donut-shaped chart with a legend and percentage information.
- [Pie Chart](./pie-chart.md) — Displays proportions across categories using pie slices, with category labels, values, and percentages.
- [Statistic](./statistic.md) — Presents key numbers, measurements, and summary information.
- [Table](./table.md) — Displays structured data in a semantic table with features such as sorting and responsive horizontal scrolling.
