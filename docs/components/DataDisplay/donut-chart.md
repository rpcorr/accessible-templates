# Donut Chart

The Donut Chart component provides an accessible way to visualize how individual categories contribute to a whole. It displays proportional ring-shaped segments, category labels, numerical values, and percentages. A visible legend provides the detailed category information, while an accessible SVG label identifies the chart and directs screen-reader users to the legend.

## Features

- Displays numerical values as proportional segments of a donut chart.
- Displays category labels, numerical values, and percentages in a visible legend.
- Supports a required chart title and an optional description.
- Supports an exploded presentation through the `exploded` prop, separating segments slightly to help distinguish categories.
- Supports custom CSS classes through the `className` prop.
- Handles empty datasets and datasets containing zero values.
- Excludes negative and non-finite values from the chart.
- Uses normalized values to calculate proportions safely when values are extremely large.
- Adapts to different viewport sizes with a responsive chart and legend layout.
- Displays the legend in two columns at viewport widths of 425px and smaller to reduce vertical space.

## Props

| Prop          | Type               | Required | Default     | Description                                                                                       |
| ------------- | ------------------ | -------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `title`       | `string`           | Yes      | —           | The chart title displayed above the chart.                                                        |
| `data`        | `DonutChartData[]` | Yes      | —           | The category data used to generate the chart. Each item contains a `label` and numerical `value`. |
| `description` | `string`           | No       | `undefined` | An optional description providing context about the chart.                                        |
| `className`   | `string`           | No       | `undefined` | An optional CSS class applied to the chart container.                                             |
| `exploded`    | `boolean`          | No       | `false`     | Separates chart segments slightly to help distinguish categories.                                 |

## Data Type

Each data item must provide a category label and numerical value.

```tsx
export interface DonutChartData {
  label: string;
  value: number;
}
```

Example data:

```tsx
const browserData = [
  { label: 'Chrome', value: 62 },
  { label: 'Safari', value: 20 },
  { label: 'Firefox', value: 8 },
  { label: 'Edge', value: 7 },
  { label: 'Other', value: 3 },
];
```

## Usage

### Basic Donut Chart

```tsx
import { DonutChart } from './DonutChart';

const data = [
  { label: 'Desktop', value: 55 },
  { label: 'Mobile', value: 35 },
  { label: 'Tablet', value: 10 },
];

export function Example() {
  return (
    <DonutChart
      title="Device Usage"
      description="Website visitors by device type."
      data={data}
    />
  );
}
```

### Exploded Donut Chart

Set `exploded` to separate the segments slightly when additional visual distinction is helpful.

```tsx
<DonutChart title="Browser Usage" data={browserData} exploded />
```

### Custom Styling

Use `className` to apply additional styling to the chart container.

```tsx
<DonutChart title="Device Usage" data={data} className="custom-donut-chart" />
```

## Accessibility

- Uses semantic `<figure>` and `<figcaption>` elements to group the chart and its caption.
- Provides an accessible name for the SVG graphic using `role="img"` and `aria-label`.
- Keeps the SVG's accessible label concise to avoid unnecessarily repeating the visible title and description.
- Informs screen-reader users that category values are available in the legend when positive values are present.
- Provides a visible legend with category labels, numerical values, and percentages.
- Uses a semantic list for the legend, with an accessible name identifying it as the chart categories.
- Hides decorative colour swatches from assistive technology because category information is provided by text.
- Displays an accessible empty-state message when no positive values are available.
- Avoids duplicating the empty-state message in the SVG's accessible label.
- Presents category information in text so the data is not communicated through colour alone.
- Supports responsive layouts, including a two-column legend at viewport widths of 425px and smaller.

## Data Handling

- Positive, finite values contribute to the chart proportions.
- Zero values do not produce visible chart segments.
- Negative, `NaN`, and infinite values are excluded from the chart.
- Values are normalized before percentage and angle calculations to reduce the risk of numerical overflow when values are extremely large.
- Percentages are calculated from the included positive values and displayed to one decimal place.
- If no positive values are present, the chart displays an empty visual state and the message "No positive values to display."
- An empty dataset displays the same empty-state message instead of a legend.

## Usage Guidelines

Use a Donut Chart to show how categories contribute to a meaningful whole, such as website traffic sources, budget allocation, or survey response distributions. The values should represent parts of the same whole.

Keep the number of categories manageable so users can distinguish the segments and understand the proportions. When there are many categories or precise comparisons between similar values are important, consider using a Bar Chart instead.

Provide a descriptive title and, when necessary, a description that explains the data and its context. Use meaningful category names and values, and do not rely on segment colours alone to communicate information.

Keep the legend visible so users can access each category's label, value, and percentage. The SVG accessible label helps screen-reader users discover the legend without repeating all the category data in the graphic's name.

Use the exploded presentation sparingly. Excessive separation can make it harder to understand that the segments contribute to a single whole.

## Responsive Behaviour

- The chart and legend use a responsive layout that adapts to the available viewport width.
- At narrower widths, the chart and legend stack vertically.
- At viewport widths of 425px and smaller, the legend displays in two columns to reduce vertical space.
- Long category labels and values can wrap to help prevent horizontal overflow.
- Check the chart and legend at narrow viewport widths and increased zoom to ensure content remains readable and usable.

## Testing Checklist

- [ ] Renders a chart with valid positive values.
- [ ] Displays category labels, values, and percentages in the legend.
- [ ] Renders an accessible legend containing all valid categories.
- [ ] Provides an accessible name for the chart graphic.
- [ ] Directs screen-reader users to the legend when positive values are present.
- [ ] Avoids unnecessary repetition when navigating the chart with a screen reader.
- [ ] Displays an appropriate empty-state message when no positive values are available.
- [ ] Supports optional descriptions.
- [ ] Supports the exploded presentation.
- [ ] Handles zero, negative, and non-finite values.
- [ ] Handles extremely large finite values without overflowing percentage calculations.
- [ ] Handles an empty dataset.
- [ ] Displays the legend in two columns at viewport widths of 425px and smaller.
- [ ] Avoids horizontal overflow at narrow viewport widths and increased zoom.
- [ ] Uses design tokens with suitable fallback values for chart colours and surfaces.
- [ ] Passes the component tests and full test suite.

## Related Components

- **[Bar Chart](../BarChart/bar-chart.md)** — Use to compare numerical values across categories, including single-series and grouped datasets.
- **[Pie Chart](../PieChart/pie-chart.md)** — Use to visualize how categories contribute to a whole using proportional pie slices.
- **[Table](../../Table/table.md)** — Use to present structured data in a semantic table when detailed values and direct comparisons are important.
