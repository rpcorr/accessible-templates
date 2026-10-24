# Statistic

The Statistic component provides an accessible way to present key numbers, measurements, and summary information. It displays a descriptive label, a value, and an optional description to help users understand the information being presented.

The component can be used independently or combined with Card and Chart components to create dashboard summaries and data visualizations.

## Features

- Displays a descriptive label and value
- Supports numbers, percentages, currency, and other formatted values
- Optional description for additional context
- Accepts React content for flexible value formatting
- Supports custom styling through an optional CSS class
- Can be used independently or within cards and dashboard layouts
- Uses semantic HTML without unnecessary ARIA roles
- Does not introduce additional keyboard focus stops

## Accessibility

The Statistic component follows accessibility practices intended to support users with different needs.

- **Meaningful labels:** Each statistic should have a descriptive label that explains what its value represents.
- **Context:** Use the optional description to clarify units, reporting periods, or other relevant details.
- **Colour contrast:** Ensure text meets WCAG 2.2 Level AA contrast requirements. Normal-sized text requires a minimum contrast ratio of 4.5:1.
- **Semantic structure:** The label, value, and description are presented as text content without unnecessary ARIA attributes.
- **Keyboard access:** Statistics are non-interactive by default and do not require keyboard focus.
- **Dynamic updates:** The component does not automatically announce changes to its value. Use an appropriate status or live-region component when updates need to be announced to assistive technology.
- **Colour independence:** Do not rely on colour alone to communicate trends, status, or meaning.

## Usage

Import the Statistic component:

```tsx
import { Statistic } from '../../../components/DataDisplay/Statistic';
```

### Basic statistic

Display a label and value.

```tsx
<Statistic label="Total Users" value="1,250" />
```

### Statistic with description

Provide additional context using the optional description.

```tsx
<Statistic
  label="Completed Tasks"
  value="85%"
  description="Tasks completed this month"
/>
```

### Different value formats

The value can represent counts, percentages, currency, or other formatted content.

```tsx
<Statistic
  label="Total Projects"
  value={42}
  description="Across all teams"
/>

<Statistic
  label="Monthly Revenue"
  value="$24,500"
  description="Revenue this month"
/>

<Statistic
  label="Average Completion"
  value="92.5%"
  description="Across completed projects"
/>
```

### Using Statistic with Card

The Statistic component can be placed inside a Card to create dashboard summary panels.

```tsx
import { Card } from '../../../components/DataDisplay/Card';
import { Statistic } from '../../../components/DataDisplay/Statistic';

<Card>
  <Statistic label="Total Users" value="1,250" description="Registered users" />
</Card>;
```

## API Reference

### Props

| Prop          | Type        | Required | Default | Description                                              |
| ------------- | ----------- | -------- | ------- | -------------------------------------------------------- |
| `label`       | `string`    | Yes      | —       | Describes what the statistic value represents            |
| `value`       | `ReactNode` | Yes      | —       | The number, measurement, or formatted content to display |
| `description` | `string`    | No       | —       | Optional supporting context for the statistic            |
| `className`   | `string`    | No       | —       | Optional CSS class for custom styling                    |

## Styling

The component uses CSS Modules and the shared design tokens defined in `tokens.css`.

| Element                         | Token                |
| ------------------------------- | -------------------- |
| Primary text and value          | `--color-text`       |
| Label and description           | `--color-text-muted` |
| Label and description font size | `--text-sm`          |
| Value font size                 | `--text-xl`          |
| Element spacing                 | `--space-1`          |

Fallback values are provided in the CSS for cases where a design token is unavailable.

## Design Considerations

- Keep labels concise and descriptive.
- Include units or reporting periods when needed to interpret a value.
- Use the description to clarify meaning rather than repeat the label.
- Use consistent formatting for comparable values, such as percentages or currency.
- Avoid presenting a value without enough context for users to understand it.
- Combine statistics with charts when a visual representation of trends or relationships would be helpful.
- Keep the Statistic component independent of Card and Chart so it can be reused in different layouts.

## Testing Recommendations

Verify the component using the following checks:

- Confirm the label and value render correctly.
- Confirm the description is displayed when supplied and omitted when not supplied.
- Test numeric, string, and formatted React content as values.
- Verify custom CSS classes can be applied.
- Check that long labels, values, and descriptions wrap without causing horizontal overflow.
- Confirm text contrast meets WCAG 2.2 Level AA requirements.
- Verify that the component does not introduce unnecessary keyboard focus stops.
- Test combined layouts with Card and Chart components.
- If values update dynamically, verify that any required announcements are handled by an appropriate status or live-region component.
