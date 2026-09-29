# Search Combobox

An accessible search combobox that allows users to enter a search query and filter a list of matching suggestions. Users can select a result using the keyboard or mouse.

## Features

- Uses a native `<input type="search">` element
- Uses the ARIA `combobox` role
- Provides a popup `listbox` containing matching results
- Filters results as the user types
- Supports keyboard navigation
- Supports mouse selection
- Supports disabled results
- Supports required fields
- Supports disabled state
- Supports descriptions
- Supports error messages
- Announces the number of matching results to screen readers
- Announces when no results are found
- Uses a polite live region for search result announcements
- Supports controlled and uncontrolled values
- Automatically generates unique IDs when an `id` is not provided

## Accessibility

The Search Combobox uses a native search input with the `combobox` role and a popup `listbox` for search suggestions.

The input uses:

- `aria-autocomplete="list"` to indicate that matching suggestions are provided.
- `aria-controls` to associate the input with the listbox.
- `aria-expanded` to indicate whether the results list is open.
- `aria-activedescendant` to identify the currently highlighted result.
- `aria-describedby` to associate descriptions and error messages with the input.
- `aria-invalid` when an error is present.

Each result uses the `option` role. Disabled results are identified with `aria-disabled`.

The visible label is associated with the input using a native `<label>` element.

### Screen Reader Announcements

A visually hidden live region uses:

```html
role="status" aria-live="polite" aria-atomic="true"
```

After the user stops typing for a short period, the Search Combobox announces the number of matching results.

For example:

- `1 result available.`
- `5 results available.`
- `No results found.`

The short delay prevents the screen reader from announcing a new result count for every keystroke when users type quickly.

## Search and Filtering

Results are filtered by matching the search text against each option's label.

Matching is case-insensitive and includes partial matches.

For example, with the following options:

```tsx
const cities = [
  { value: 'toronto', label: 'Toronto' },
  { value: 'ottawa', label: 'Ottawa' },
  { value: 'montreal', label: 'Montreal' },
];
```

Entering `tor` matches:

```text
Toronto
```

Entering `ott` matches:

```text
Ottawa
```

If no options match the search text, the results list displays:

```text
No results found
```

and the live region announces:

```text
No results found.
```

## Keyboard Support

| Key          | Action                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| `Arrow Down` | Moves to the next available result.                                    |
| `Arrow Up`   | Moves to the previous available result.                                |
| `Enter`      | Selects the currently highlighted result.                              |
| `Escape`     | Closes the results list.                                               |
| `Tab`        | Closes the results list and moves focus to the next focusable element. |

Disabled results are skipped when navigating with the arrow keys.

## Props

| Prop           | Type                      | Default   | Description                                                   |
| -------------- | ------------------------- | --------- | ------------------------------------------------------------- |
| `label`        | `string`                  | —         | Visible label for the search input.                           |
| `options`      | `SearchComboboxOption[]`  | —         | Results displayed in the listbox.                             |
| `id`           | `string`                  | Generated | Optional ID for the input.                                    |
| `name`         | `string`                  | —         | Optional name for the input.                                  |
| `value`        | `string`                  | —         | Controlled value.                                             |
| `defaultValue` | `string`                  | `''`      | Initial value for an uncontrolled Search Combobox.            |
| `onChange`     | `(value: string) => void` | —         | Called when the search value changes or a result is selected. |
| `placeholder`  | `string`                  | —         | Optional placeholder text.                                    |
| `description`  | `string`                  | —         | Optional descriptive text associated with the input.          |
| `error`        | `string`                  | —         | Optional error message associated with the input.             |
| `required`     | `boolean`                 | `false`   | Marks the input as required.                                  |
| `disabled`     | `boolean`                 | `false`   | Disables the Search Combobox.                                 |

### SearchComboboxOption

Each option accepts:

| Property   | Type      | Description                                                       |
| ---------- | --------- | ----------------------------------------------------------------- |
| `value`    | `string`  | Value returned when the option is selected.                       |
| `label`    | `string`  | Text displayed to the user and used for filtering.                |
| `disabled` | `boolean` | Prevents the option from being selected or keyboard-navigated to. |

## Basic Usage

```tsx
import { SearchCombobox } from '../../components/FormControls/SearchCombobox/SearchCombobox';

const cities = [
  { value: 'toronto', label: 'Toronto' },
  { value: 'ottawa', label: 'Ottawa' },
  { value: 'montreal', label: 'Montreal' },
  { value: 'vancouver', label: 'Vancouver' },
];

function Example() {
  return (
    <SearchCombobox
      label="Search cities"
      options={cities}
      placeholder="Search cities"
      description="Start typing to see matching cities."
    />
  );
}
```

## Controlled Usage

The Search Combobox can be controlled using `value` and `onChange`.

```tsx
import { useState } from 'react';
import { SearchCombobox } from '../../components/FormControls/SearchCombobox/SearchCombobox';

const cities = [
  { value: 'toronto', label: 'Toronto' },
  { value: 'ottawa', label: 'Ottawa' },
  { value: 'montreal', label: 'Montreal' },
];

function Example() {
  const [value, setValue] = useState('');

  return (
    <SearchCombobox
      label="Search cities"
      options={cities}
      value={value}
      onChange={setValue}
      placeholder="Search cities"
    />
  );
}
```

## Disabled Results

Individual results can be disabled.

```tsx
const cities = [
  { value: 'toronto', label: 'Toronto' },
  { value: 'ottawa', label: 'Ottawa', disabled: true },
  { value: 'montreal', label: 'Montreal' },
];
```

Disabled results remain visible but cannot be selected and are skipped during keyboard navigation.

## Required and Error State

The Search Combobox supports required fields and associated error messages.

```tsx
<SearchCombobox
  label="Choose a city"
  options={cities}
  required
  error="Please select a city."
/>
```

When an error is provided:

- The input receives `aria-invalid="true"`.
- The error message is associated with the input using `aria-describedby`.
- The error is displayed visually below the input.

## Testing Considerations

The Search Combobox should be tested with both keyboard and assistive technology.

Recommended tests include:

- Navigate through results using `Arrow Down` and `Arrow Up`.
- Select a result using `Enter`.
- Close the results using `Escape`.
- Move away from the component using `Tab`.
- Verify disabled results cannot be selected.
- Verify the listbox and active result are correctly announced by a screen reader.
- Type a search term quickly and verify that the final result count is announced after typing pauses.
- Enter a search term with no matches and verify that `No results found.` is announced.
- Verify descriptions and error messages are announced when applicable.
- Test the component with NVDA, JAWS, or VoiceOver.
- Test with keyboard-only interaction.
- Verify the component remains usable at increased zoom levels.

## Related Components

- [Combobox](./combobox.md)
- [Select](./select.md)
