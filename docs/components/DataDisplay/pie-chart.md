# Pie Chart

The Pie Chart component provides an accessible way to visualize how individual categories contribute to a whole. It displays proportional slices using SVG, with a category legend, numerical values, percentages, and a semantic data table. An optional exploded presentation separates slices slightly to help distinguish categories.

## Features

- Displays proportional slices for each category using SVG paths and shapes.
- Uses distinct colours to help differentiate categories.
- Supports an optional `exploded` prop to separate slices slightly for additional visual distinction.
- Displays a legend containing category labels, values, and percentages.
- Supports customizable data table value headings through the `valueLabel` prop.
- Supports an optional `className` for custom styling.
- Includes a semantic data table with category, value, and percentage columns.
- Displays a neutral chart state when no positive values are available.
- Handles zero, negative, and non-finite values by treating them as zero.
- Supports a single category representing the entire total.
- Provides a responsive layout for different screen sizes.
- Uses CSS custom properties for theme integration.

## Accessibility

- Uses a semantic `<figure>` element to group the chart and its associated information.
- Uses `<figcaption>` to provide the chart title and optional description.
- Provides an accessible name and summary for the graphical chart through `role="img"` and `aria-label`.
- Includes a visible legend with category labels, numerical values, and percentages, so categories are not identified by colour alone.
- Provides a semantic HTML data table with a caption, column headers, and row headers.
- Uses appropriate table semantics, including `scope="col"` and `scope="row"`.
- Marks decorative colour swatches as hidden from assistive technologies.
- Provides category information in text and tabular form for users who cannot perceive the graphical representation.
- Supports browser zoom and responsive layouts.

## Usage Guidelines

- Use a pie chart when showing how categories contribute to a meaningful whole.
- Keep the number of categories manageable so the slices and legend remain easy to understand.
- Use meaningful, concise category labels.
- Optionally set the `exploded` prop to separate slices slightly when additional visual distinction is helpful. Keep the separation subtle so the chart still communicates that the categories contribute to one whole.
- Provide a descriptive title and, where useful, a short description explaining the data.
- Ensure the values represent parts of the same whole and use a consistent measurement.
- Do not rely on colour alone to communicate category information.
- Choose a palette with clearly distinguishable colours.
- Consider a bar chart when users need to compare individual values precisely or when there are many categories.
- Include context for percentages when the chart is part of a report or dashboard.
- Avoid using a pie chart when categories overlap or do not represent parts of the same whole.

## Props

| Prop          | Type             | Required | Default   | Description                                                       |
| ------------- | ---------------- | -------- | --------- | ----------------------------------------------------------------- |
| `title`       | `string`         | Yes      | —         | Title displayed with the chart and used in its accessible name.   |
| `data`        | `PieChartData[]` | Yes      | —         | Array of category labels and numerical values.                    |
| `description` | `string`         | No       | —         | Optional description displayed below the title.                   |
| `valueLabel`  | `string`         | No       | `'Value'` | Column heading used for values in the semantic data table.        |
| `exploded`    | `boolean`        | No       | `false`   | Separates the pie slices slightly to help distinguish categories. |
| `className`   | `string`         | No       | —         | Optional CSS class applied to the chart container.                |

### PieChartData

Each item in the `data` array has the following properties:

| Property | Type     | Required | Description                                                                                                                           |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `label`  | `string` | Yes      | Name of the category.                                                                                                                 |
| `value`  | `number` | Yes      | Numerical value associated with the category. Positive finite values contribute to the chart total. Other values are treated as zero. |

## Usage

```tsx
import { PieChart } from '../../../components/DataDisplay/Charts/PieChart';

const deviceUsage = [
  { label: 'Desktop', value: 48 },
  { label: 'Mobile', value: 38 },
  { label: 'Tablet', value: 14 },
];

export function DeviceUsageExample() {
  return (
    <PieChart
      title="Device Usage"
      description="Distribution of users by device type."
      data={deviceUsage}
      valueLabel="Users"
    />
  );
}
```

## Examples

### Basic Pie Chart

Display how categories contribute to a total.

```tsx
<PieChart
  title="Device Usage"
  description="Distribution of users by device type."
  data={[
    { label: 'Desktop', value: 48 },
    { label: 'Mobile', value: 38 },
    { label: 'Tablet', value: 14 },
  ]}
  valueLabel="Users"
/>
```

### Budget Allocation

Show how a budget is distributed across expense categories.

```tsx
<PieChart
  title="Monthly Household Budget"
  description="Monthly spending by household expense category."
  data={[
    { label: 'Housing', value: 1450 },
    { label: 'Food', value: 620 },
    { label: 'Transportation', value: 380 },
    { label: 'Utilities', value: 250 },
    { label: 'Entertainment', value: 300 },
  ]}
  valueLabel="Amount"
/>
```

### Exploded Pie Chart

Use the `exploded` prop to separate slices slightly and help distinguish categories.

```tsx
<PieChart
  title="Monthly Household Budget"
  description="Monthly spending by household expense category."
  data={[
    { label: 'Housing', value: 1450 },
    { label: 'Food', value: 620 },
    { label: 'Transportation', value: 380 },
    { label: 'Utilities', value: 250 },
    { label: 'Entertainment', value: 300 },
  ]}
  valueLabel="Amount"
  exploded
/>
```

### Without a Description

The description is optional when the title and surrounding content provide sufficient context.

```tsx
<PieChart
  title="Project Status Overview"
  data={[
    { label: 'On Track', value: 72 },
    { label: 'At Risk', value: 18 },
    { label: 'Delayed', value: 10 },
  ]}
  valueLabel="Projects"
/>
```

### Empty Dataset

An empty dataset displays the chart's empty state.

```tsx
<PieChart
  title="Available Inventory"
  description="There is currently no inventory data to display."
  data={[]}
  valueLabel="Items"
/>
```

## Implementation Notes

- The component uses SVG paths and shapes to render proportional pie slices.
- Slice colours are selected from a palette using CSS custom properties with fallback colours.
- The optional `exploded` prop offsets slices from the centre and introduces small gaps between them.
- A small angular overlap helps reduce visible anti-aliasing seams between adjacent slices in the standard chart.
- Percentages are calculated from the total of positive, finite values.
- Values that are zero, negative, `NaN`, or infinite are treated as zero.
- When the dataset is empty or the total of valid positive values is zero, the chart displays a neutral background and an accessible message indicating that there are no positive values to display.
- The legend and semantic data table provide the underlying values in text form.
- The `valueLabel` prop changes the table's value column heading; it does not automatically format values as currency or append units.
- The component does not require a third-party charting library.

## Testing Checklist

- [ ] Renders a chart title and optional description.
- [ ] Calculates percentages correctly for positive values.
- [ ] Renders a legend with category labels, values, and percentages.
- [ ] Renders a semantic data table with the correct headings and data.
- [ ] Supports custom `valueLabel` and `className` props.
- [ ] Handles empty datasets and datasets containing only zero or invalid values.
- [ ] Handles a single category correctly.
- [ ] Keeps legend labels and their values visually close together at large screen sizes.
- [ ] Uses distinguishable colours and does not rely on colour alone.
- [ ] Remains usable at narrow viewport widths and when zoomed.
- [ ] Provides meaningful information to screen-reader users.
- [ ] Supports the `exploded` prop, separating slices while preserving their proportions and accessible information.
