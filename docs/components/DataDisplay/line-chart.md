# Line Chart

The Line Chart component provides an accessible way to visualize trends and changes in numerical values across categories or over time. It supports single-series and multiple-series datasets, distinct line styles and markers, labelled axes, grid lines, a series legend, and an accompanying semantic data table.

## Features

- Semantic HTML `<figure>` and `<figcaption>` structure
- Accessible chart title and optional description
- SVG-based line chart rendering
- Support for single-series and multiple-series datasets
- Category labels and numerical axis labels
- Grid lines to support value comparison
- Distinct line styles and markers for differentiating data series
- Accessible legend identifying multiple data series
- Optional value label for identifying the units represented by the data
- Semantic data table containing the underlying chart values
- Accessible empty-state messaging when no valid numerical data is available
- Handling of positive, negative, zero, and non-finite numerical values
- Responsive layout with horizontal scrolling on smaller screens
- CSS Modules and CSS custom properties for styling
- Reduced-motion preference support
- Screen reader support

## Installation

Import the component from the Line Chart component directory:

```tsx
import { LineChart } from '../../components/DataDisplay/Charts/LineChart';
```

Adjust the import path as necessary for your project structure.

## Basic Usage

Provide a title and an array of category labels and numerical values.

```tsx
import { LineChart } from '../../components/DataDisplay/Charts/LineChart';

const data = [
  { label: 'January', value: 120 },
  { label: 'February', value: 180 },
  { label: 'March', value: 150 },
  { label: 'April', value: 240 },
];

export const MonthlyVisitors = () => (
  <LineChart
    title="Monthly Visitors"
    description="Website visitors recorded during the first four months of the year."
    data={data}
  />
);
```

Each data item contains a `label` for the category and a numerical `value` for the corresponding point on the line.

## Multiple Data Series

The Line Chart supports multiple datasets so that users can compare trends across different groups.

Each dataset has a `label` identifying the series and a `values` array containing the numerical values corresponding to the categories in `data`.

```tsx
import { LineChart } from '../../components/DataDisplay/Charts/LineChart';

const data = [
  { label: '2024', value: 100 },
  { label: '2025', value: 150 },
];

const datasets = [
  {
    label: 'Desktop',
    values: [100, 150],
  },
  {
    label: 'Mobile',
    values: [80, 120],
  },
];

export const AnnualVisitors = () => (
  <LineChart
    title="Annual Visitors"
    description="Comparison of desktop and mobile visitors."
    data={data}
    datasets={datasets}
  />
);
```

The category labels establish the positions along the horizontal axis. Each dataset supplies the values plotted for those categories. Keep the number and order of values in each dataset aligned with the categories in `data`.

The legend identifies each dataset. Distinct line styles and markers help users distinguish series without relying on colour alone.

## Component Props

| Prop          | Type                 | Required | Description                                                                           |
| ------------- | -------------------- | -------- | ------------------------------------------------------------------------------------- |
| `title`       | `string`             | Yes      | Chart title used to identify the chart.                                               |
| `data`        | `LineChartData[]`    | Yes      | Category labels and numerical values used to establish the chart's data points.       |
| `datasets`    | `LineChartDataset[]` | No       | Additional labelled data series for comparing multiple datasets.                      |
| `description` | `string`             | No       | Additional context about the chart.                                                   |
| `valueLabel`  | `string`             | No       | Optional label identifying the units or type of values represented in the data table. |
| `className`   | `string`             | No       | Additional CSS class for custom styling.                                              |

### Data Types

The single-series data structure uses a label and numerical value:

```tsx
interface LineChartData {
  label: string;
  value: number;
}
```

A multiple-series dataset uses a label and an array of numerical values:

```tsx
interface LineChartDataset {
  label: string;
  values: number[];
}
```

Use the component's exported TypeScript interfaces where available rather than redefining these types in your application.

## Accessibility

The Line Chart is designed to make numerical information available to people who cannot easily interpret the visual chart.

### Semantic Structure

The component uses a semantic `<figure>` with a `<figcaption>` containing the chart title and optional description. The figure is associated with its title and, when provided, its description.

This structure helps assistive technology users identify the chart and understand its purpose.

### SVG Chart

The chart is rendered using SVG. The SVG has an accessible image role and label, and includes a title associated with the chart title.

The chart's accessible labeling also directs users to the accompanying data table for the category labels and numerical values.

### Data Table

A semantic HTML data table provides an alternative to interpreting the visual chart.

The table includes:

- A descriptive caption identifying the chart data
- Column headers for categories and data series
- Row headers identifying each category
- Numerical values corresponding to each data series

The table is visually hidden while remaining available to assistive technologies. This allows screen reader users to access the underlying information in a structured format.

### Multiple Data Series

When multiple datasets are provided, the component displays a legend identifying each series.

Different line styles and point markers provide additional visual distinctions between datasets, reducing reliance on colour as the only means of identification.

### Empty and Invalid Data

When the component has no valid numerical values to display, it provides an empty-state message and retains the chart's accessible structure and data table.

Non-finite numerical values are handled so they do not produce invalid plotted points. Negative and zero values are also supported.

### Keyboard Accessibility

The chart is a data visualization rather than an interactive control. It does not require keyboard interaction for users to read its content.

The accompanying semantic data table provides a structured alternative for understanding the chart's values.

## Responsive Behaviour

The Line Chart is designed to remain usable across desktop, tablet, and mobile screen sizes.

- The chart adapts to the available container width.
- A minimum chart width preserves space for axis labels and data points.
- Horizontal scrolling allows users to inspect the chart on narrow screens.
- Axis labels use the project's typography tokens and text colour tokens.
- The legend can wrap when space is limited.
- The data table remains available to assistive technologies.
- Reduced-motion preferences are respected.

When testing at smaller viewport widths, verify that axis labels remain legible, chart content is not clipped, and horizontal scrolling works as expected.

## Usage Guidelines

- Provide a meaningful chart title that describes the information being presented.
- Include a description when additional context is needed to understand the data.
- Use clear category labels and meaningful dataset names.
- Keep the values in each dataset aligned with the category order in `data`.
- Use line charts when showing trends or changes across ordered categories or time periods.
- Provide the value units when they are important for interpreting the data.
- Do not rely on colour alone to distinguish multiple series.
- Use the accompanying data table as an accessible alternative to the visual representation.
- Avoid presenting a line chart as the only means of communicating important numerical information.

## Accessibility Testing

The Line Chart has been tested with NVDA screen reader to verify that its content and accessible structure are announced as expected.

The component's automated tests cover chart rendering, chart titles and descriptions, single and multiple datasets, line paths and markers, grid lines, data table content, empty datasets, and handling of numerical values.

Continue to verify the component with:

- Keyboard-only navigation
- NVDA screen reader
- Responsive layouts, including narrow mobile viewports
- Browser zoom at 200% and 400%
- Colour contrast and differentiation between data series
- Reduced-motion settings

## Related Components

- [Bar Chart](./bar-chart.md) — Displays numerical comparisons across categories using vertical or horizontal bars, with support for single-series and grouped datasets.
- [Donut Chart](./donut-chart.md) — Displays proportions across categories using a donut-shaped chart with a legend and percentage information.
- [Pie Chart](./pie-chart.md) — Displays proportions across categories using pie slices, with category labels, values, and percentages.
- [Statistic](./statistic.md) — Presents key numbers, measurements, and summary information.
- [Table](./table.md) — Displays structured data in a semantic table with features such as sorting and responsive horizontal scrolling.
