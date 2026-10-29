# Stacked Bar Chart

The Stacked Bar Chart component provides an accessible visual representation of data divided into multiple series. Each bar represents a category, with individual segments showing the contribution of each series to the category's total. It supports single-series and multi-series data, positive and negative values, optional gridlines, and a screen-reader-accessible data table.

## Features

- Vertical stacked bar chart rendered using SVG.
- Supports a single data series or multiple stacked datasets.
- Displays category labels and a numerical value axis.
- Supports positive and negative values, with segments extending from a zero baseline.
- Optional gridlines to help users compare values.
- Colour-coded segments and a legend for multiple datasets.
- Configurable chart title, description, and value label.
- SVG title information for chart segments.
- Semantic data table containing the underlying chart values.
- Displays category labels, series values, and totals for multiple datasets.
- Screen-reader-accessible table hidden visually to avoid duplicating the chart presentation.
- Handles empty or invalid numerical data with an appropriate message.
- Supports custom styling through `className`.
- Responsive layout for different viewport sizes.

## Usage

### Single Dataset

Use a single dataset when each category has one numerical value.

```tsx
import { StackedBarChart } from '@/components/DataDisplay/Charts/StackedBarChart';

const data = [
  { label: 'January', value: 120 },
  { label: 'February', value: 180 },
  { label: 'March', value: 150 },
];

function Example() {
  return (
    <StackedBarChart
      title="Monthly Visitors"
      description="Website visitors from January to March."
      data={data}
      valueLabel="Visitors"
    />
  );
}
```

### Multiple Datasets

Use multiple datasets to compare how different series contribute to each category's total.

```tsx
import { StackedBarChart } from '@/components/DataDisplay/Charts/StackedBarChart';

const data = [
  { label: 'January', value: 0 },
  { label: 'February', value: 0 },
  { label: 'March', value: 0 },
];

const datasets = [
  {
    label: 'Desktop',
    values: [120, 150, 180],
  },
  {
    label: 'Mobile',
    values: [80, 100, 90],
  },
  {
    label: 'Tablet',
    values: [30, 25, 40],
  },
];

function Example() {
  return (
    <StackedBarChart
      title="Monthly Website Traffic"
      description="Website traffic by device type from January to March."
      data={data}
      datasets={datasets}
      valueLabel="Visitors"
      showGridLines
    />
  );
}
```

When using multiple datasets, each dataset's `values` array must correspond to the category order in `data`. The `value` property in each category is a placeholder and is not used to calculate the stacked values.

## Props

| Prop            | Type                       | Required | Description                                                                          |
| --------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `title`         | `string`                   | Yes      | Chart title, used to identify the chart.                                             |
| `data`          | `StackedBarChartData[]`    | Yes      | Categories and their single-series values, or category labels for multiple datasets. |
| `datasets`      | `StackedBarChartDataset[]` | No       | Optional series to stack for each category.                                          |
| `description`   | `string`                   | No       | Additional context describing the chart's purpose or data.                           |
| `valueLabel`    | `string`                   | No       | Label describing the values, such as "Visitors" or "Sales".                          |
| `showGridLines` | `boolean`                  | No       | Displays gridlines to help users compare values.                                     |
| `className`     | `string`                   | No       | Additional CSS class for custom styling.                                             |

## Data Types

### StackedBarChartData

```tsx
interface StackedBarChartData {
  label: string;
  value: number;
}
```

Each item represents a category on the chart.

### StackedBarChartDataset

```tsx
interface StackedBarChartDataset {
  label: string;
  values: number[];
}
```

Each dataset represents one series in the stacked chart. The `label` identifies the series in the legend and data table. Each value corresponds to a category in the `data` array.

## Accessibility

The component is designed to support WCAG 2.2 AA accessibility practices.

### Semantic Structure

- Uses a figure-based structure to group the chart and its caption.
- Provides a chart title and optional description to establish context.
- Uses SVG title information to identify chart content and provide additional information about chart segments.
- Provides a semantic HTML table containing the underlying data.

### Screen Reader Support

- The underlying data table is visually hidden but remains available to assistive technology.
- The table includes a caption, column headers, category row headers, and numerical values.
- For multiple datasets, the table presents each series separately and includes a total for each category.
- The legend identifies the series represented by the stacked segments.
- An appropriate status message is provided when there is no valid numerical data to display.

### Colour and Visual Presentation

- Series are distinguished by colour, with a legend identifying each series.
- Colour is not intended to be the only means of understanding the chart; the data table provides the actual values.
- Optional gridlines help users compare values against the numerical axis.
- The chart supports positive and negative values around a zero baseline.

### Responsive Behaviour

- The chart adapts to the available display width.
- Test the chart at narrow viewport sizes and at high zoom levels to ensure that labels and data remain understandable.
- The visually hidden data table should remain accessible to screen readers without creating unnecessary visual duplication.

## Usage Guidelines

### When to Use a Stacked Bar Chart

Use a stacked bar chart when you want to show how individual series contribute to a category's overall value.

Suitable examples include:

- Website traffic by device type.
- Monthly revenue by product category.
- Budget allocation by department.
- Survey responses grouped by category.

### When to Choose Another Chart Type

- Use a standard bar chart when each category has only one value.
- Use a grouped bar chart when comparing individual series values side by side is more important than showing their combined total.
- Consider a line chart when the primary goal is to show trends over time.

### Data Considerations

- Ensure every dataset's `values` array follows the same order as the categories in `data`.
- Use meaningful category and dataset labels.
- Include a description when the chart's purpose or context is not obvious from its title.
- Use gridlines when they improve the ability to compare values.
- Check positive and negative values carefully, particularly when the chart includes a zero baseline.
- Review how zero values and invalid numerical values are represented.

## Testing Checklist

When validating the component, check the following:

- [ ] The chart title and optional description are meaningful.
- [ ] Single-dataset and multiple-dataset charts render correctly.
- [ ] Category labels and numerical values are accurate.
- [ ] Each series is represented by the correct colour and legend label.
- [ ] Positive and negative values render on the appropriate side of the zero baseline.
- [ ] The data table contains the correct values and totals.
- [ ] The data table is available to screen readers but is not visually displayed.
- [ ] Empty or invalid data produces an understandable message.
- [ ] The chart remains readable at narrow viewport widths and increased zoom.
- [ ] Screen-reader output is clear and does not repeat information unnecessarily.
- [ ] Automated tests and manual accessibility checks pass.

## Examples

See `StackedBarChartExamples.tsx` for interactive examples demonstrating the component's supported configurations.
