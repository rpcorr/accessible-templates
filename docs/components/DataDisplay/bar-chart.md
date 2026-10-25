# Bar Chart

The Bar Chart component provides an accessible way to compare numerical values across distinct categories. It displays proportional vertical bars with category labels and numerical values, alongside a visually hidden semantic data table that provides access to the underlying information. Optional horizontal grid lines and a numerical axis help users estimate and compare values more precisely.

## Features

- Displays numerical values as proportional vertical bars.
- Supports category labels and numerical values above each bar.
- Requires a chart title and supports an optional description.
- Supports an optional value label, such as sales, visits, or responses.
- Supports optional horizontal grid lines and a numerical axis through the `showGridLines` prop.
- Includes a semantic data table containing the underlying categories and values.
- Handles empty datasets and zero values.
- Supports custom styling through the `className` prop.
- Uses responsive styling with horizontal scrolling when additional space is needed.
- Supports different viewport sizes and increased zoom levels.

## Accessibility

- Uses semantic `<figure>` and `<figcaption>` elements to structure the chart.
- Associates the figure with its title using `aria-labelledby`.
- Associates the optional description using `aria-describedby`.
- Provides a visually hidden semantic HTML table as an alternative way to access the chart data.
- Includes a table caption, column headers, category row headers, and numerical values.
- Uses text labels and numerical values so information is not communicated through bar colour alone.
- Keeps the underlying data available to screen reader users without requiring them to interpret the visual bars.
- Treats grid lines and the numerical axis as supplementary visual aids; the underlying data table remains available as a structured alternative.
- Supports sequential navigation through the page content using screen readers such as NVDA.
- Uses responsive styling to prevent category labels from overlapping at narrow viewport widths.

## Props

| Prop            | Type             | Required | Default | Description                                                                                     |
| --------------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| `title`         | `string`         | Yes      | —       | The chart title, used as its accessible name.                                                   |
| `data`          | `BarChartData[]` | Yes      | —       | An array of category labels and numerical values to display.                                    |
| `description`   | `string`         | No       | —       | An optional description providing additional context about the chart.                           |
| `valueLabel`    | `string`         | No       | —       | An optional label appended to each displayed numerical value, such as `sales` or `visits`.      |
| `showGridLines` | `boolean`        | No       | `false` | When enabled, displays horizontal grid lines and a numerical axis to help users compare values. |
| `className`     | `string`         | No       | —       | An optional CSS class for custom styling.                                                       |

## Data Structure

Each data item must contain a category label and a numerical value.

```tsx
interface BarChartData {
  label: string;
  value: number;
}
```

## Usage

Import the component:

```tsx
import { BarChart } from '../../components/DataDisplay/Charts/BarChart';
```

Provide a title and an array of data items:

```tsx
const monthlySales = [
  { label: 'January', value: 25 },
  { label: 'February', value: 40 },
  { label: 'March', value: 65 },
  { label: 'April', value: 50 },
];

<BarChart
  title="Monthly Sales"
  description="Sales totals for the first four months of the year."
  data={monthlySales}
  valueLabel="sales"
/>;
```

### Displaying Grid Lines

Set `showGridLines` to enable horizontal grid lines and a numerical axis. This is useful when users need to estimate values or make more precise comparisons.

```tsx
const quarterlyRevenue = [
  { label: 'Q1', value: 120 },
  { label: 'Q2', value: 180 },
  { label: 'Q3', value: 150 },
  { label: 'Q4', value: 240 },
];

<BarChart
  title="Quarterly Revenue"
  description="Revenue totals across four quarters."
  data={quarterlyRevenue}
  valueLabel="revenue"
  showGridLines
/>;
```

Grid lines are disabled by default to keep simpler charts visually uncluttered.

## Usage Guidelines

Use a Bar Chart when users need to compare numerical values across distinct categories, such as monthly sales, website visits, survey responses, or registration totals.

- Provide a descriptive title that clearly identifies the chart's purpose.
- Include a description when additional context is needed to understand the data.
- Use meaningful category labels and keep them concise where possible.
- Use a consistent scale so comparisons between bars are meaningful.
- Provide meaningful value labels when they help users interpret the numbers.
- Enable grid lines when a numerical reference scale improves comparisons.
- Ensure the underlying data is accurate and understandable without relying on the visual bars, grid lines, or colour.
- Consider horizontal scrolling when displaying several categories on narrow screens.

## Examples

The BarChart examples demonstrate:

- **Basic Bar Chart:** Comparing numerical values across categories.
- **Bar Chart with Grid Lines:** Comparing values against horizontal grid lines and a numerical axis.
- **Website Visits:** Comparing traffic sources using larger numerical values.
- **Survey Results:** Comparing response counts across satisfaction categories.
- **Zero Values:** Displaying categories whose values are zero.
- **Chart Without a Description:** Using the required title without the optional description.

## Testing

Automated tests should cover:

- Chart title and optional description.
- Category labels and numerical values.
- Optional value labels.
- Grid lines disabled by default.
- Grid lines and numerical axis when `showGridLines` is enabled.
- Empty datasets and zero values.
- Custom CSS classes.

Manual accessibility checks include NVDA screen reader testing, responsive layout testing at narrow viewport widths, and visual checks at 200% and 400% zoom.
