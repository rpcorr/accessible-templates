# List

The List component provides an accessible way to present related items in an ordered or unordered list. It supports configurable list markers, custom styling, rich React content, and standard HTML attributes.

## Features

- Semantic unordered and ordered list structure
- Configurable list variants through the `variant` prop
- Default, none, circle, and decimal marker styles through the `listStyle` prop
- Support for arrays of React content through the `items` prop
- Rich content, including JSX and custom SVG icons
- Custom CSS classes through the `className` prop
- Support for standard HTML attributes, including IDs and ARIA attributes

## Props

| Prop        | Type                                           | Default       | Description                                                            |
| ----------- | ---------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| `items`     | `ReactNode[]`                                  | Required      | An array of list items. Supports text, JSX, and rich React content.    |
| `variant`   | `'unordered' \| 'ordered'`                     | `'unordered'` | Determines whether the component renders an unordered or ordered list. |
| `listStyle` | `'default' \| 'none' \| 'circle' \| 'decimal'` | `'default'`   | Controls the visual list marker style.                                 |
| `className` | `string`                                       | —             | Optional custom CSS class applied to the list element.                 |

The component also accepts standard HTML attributes appropriate to the rendered list element, including IDs and ARIA attributes.

## Accessibility

- Uses semantic `ul` and `ol` elements to communicate list structure to assistive technologies.
- Preserves native list semantics rather than recreating lists with generic elements.
- Maintains the natural reading order of list items.
- Supports accessible naming and other ARIA attributes when appropriate.
- Uses native list markers by default, with CSS options for alternative presentation.
- Supports rich content and interactive elements within list items.
- Decorative SVG icons should use `aria-hidden="true"` when adjacent text already communicates their meaning.
- Icons that communicate information not available in the accompanying text should have an accessible text equivalent.

## Usage Guidelines

Use an unordered list when the sequence of items does not matter, and an ordered list when the sequence or ranking is meaningful.

Choose list marker styles that suit the content without relying on visual styling alone to communicate meaning.

Use the `items` prop to provide list content. List items can include rich React content, links, and decorative SVG icons.

When list items contain interactive elements, ensure those elements have clear accessible names and visible keyboard focus indicators.

Custom SVG icons can be used to communicate visual meaning, such as completed requirements, warnings, or sequential steps. These icons are examples of content that can be supplied to the List component rather than built-in component features.

## Examples

### Unordered List

```tsx
<List items={['Accessible navigation', 'Semantic HTML', 'Keyboard support']} />
```

### Ordered List

```tsx
<List
  variant="ordered"
  items={[
    'Review the requirements',
    'Implement the component',
    'Test with assistive technology',
  ]}
/>
```

### List Without Markers

```tsx
<List listStyle="none" items={['First item', 'Second item', 'Third item']} />
```

### Unordered List with Circle Markers

```tsx
<List listStyle="circle" items={['Design', 'Development', 'Testing']} />
```

### Ordered List with Decimal Markers

```tsx
<List
  variant="ordered"
  listStyle="decimal"
  items={['First step', 'Second step', 'Third step']}
/>
```

### List with Rich Content

```tsx
<List
  items={[
    <>
      <strong>Semantic HTML:</strong> use the correct element for the content.
    </>,
    <>
      <strong>Keyboard access:</strong> ensure interactive controls are keyboard
      accessible.
    </>,
    <>
      <strong>Testing:</strong> verify behaviour with assistive technologies.
    </>,
  ]}
/>
```

### Checkmark List

```tsx
<List
  listStyle="none"
  items={[
    <span className={styles.listWithIcon}>
      <CheckIcon />
      Semantic HTML structure
    </span>,
    <span className={styles.listWithIcon}>
      <CheckIcon />
      Keyboard-accessible interactions
    </span>,
    <span className={styles.listWithIcon}>
      <CheckIcon />
      Screen reader compatibility
    </span>,
  ]}
/>
```

### Warning List

```tsx
<List
  listStyle="none"
  items={[
    <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
      <WarningIcon />
      Review form fields before submitting
    </span>,
    <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
      <WarningIcon />
      Provide text alternatives for meaningful images
    </span>,
    <span className={`${styles.listWithIcon} ${styles.warningIcon}`}>
      <WarningIcon />
      Ensure error messages identify the problem
    </span>,
  ]}
/>
```

### Process Steps with Arrows

```tsx
<List
  listStyle="none"
  items={[
    <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
      <ArrowIcon />
      Review the requirements
    </span>,
    <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
      <ArrowIcon />
      Implement the solution
    </span>,
    <span className={`${styles.listWithIcon} ${styles.arrowIcon}`}>
      <ArrowIcon />
      Test keyboard and screen reader access
    </span>,
  ]}
/>
```

## Styling

The List component uses CSS Modules for component styling and supports custom CSS classes through the `className` prop.

List marker styles can be configured using the `listStyle` prop. Additional styling can be applied to list items and their content, including custom SVG icons.

Icon examples use inline SVG with decorative icons hidden from assistive technologies when appropriate.

## Testing

The List component should be tested for:

- Correct rendering of unordered and ordered lists
- Default list marker behaviour
- Alternative marker styles
- Rendering of text and rich React content
- Custom class application
- Standard HTML and ARIA attribute forwarding
- Correct list semantics in the accessibility tree
- Reading order with assistive technologies
- Keyboard accessibility of interactive elements within list items
- Decorative SVG icons being hidden from assistive technologies
- Accessible text alternatives for meaningful icons

## Related Components

- [Card](card.md) – Groups related content into a flexible, accessible container.
- [Statistic](statistic.md) – Presents key numbers, measurements, and summary information.
- [Table](table.md) – Displays structured information in rows and columns.
