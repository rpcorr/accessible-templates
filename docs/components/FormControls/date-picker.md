# Date Picker

An accessible date picker that allows users to enter a date directly or select a date from a calendar.

## Features

- Uses a visible `<label>` associated with the date input
- Supports direct date entry using `YYYY-MM-DD` format
- Supports calendar-based date selection
- Supports controlled and uncontrolled values
- Supports default values
- Supports minimum and maximum date constraints
- Supports required, disabled, and read-only states
- Supports description and error messages
- Associates descriptions and errors with the input using `aria-describedby`
- Announces errors using `role="alert"`
- Provides keyboard-accessible calendar navigation
- Uses a roving `tabIndex` for calendar date buttons
- Supports screen readers
- Supports month and year navigation
- Automatically skips dates outside the allowed date range during keyboard navigation
- Returns focus to the calendar button after selecting a date
- Returns focus to the calendar button when the calendar is closed with Escape
- Uses native buttons for calendar controls

## Usage

```tsx
import DatePicker from './DatePicker';

<DatePicker label="Appointment date" name="appointmentDate" />;
```

The user can either enter a date directly or open the calendar to select one.

Dates should be entered using the `YYYY-MM-DD` format.

## Controlled Date Picker

The Date Picker supports controlled values using `value` and `onChange`.

```tsx
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  label="Appointment date"
  name="appointmentDate"
  value={selectedDate}
  onChange={setSelectedDate}
/>;
```

The `onChange` callback receives either a `Date` object or `null`.

## Default Value

Use `defaultValue` when the Date Picker should start with a selected date but does not need to be controlled.

```tsx
<DatePicker
  label="Event date"
  name="eventDate"
  defaultValue={new Date(2026, 8, 25)}
/>
```

## Date Constraints

Use `minDate` and `maxDate` to restrict the dates that can be selected.

```tsx
<DatePicker
  label="Booking date"
  name="bookingDate"
  minDate={new Date(2026, 8, 1)}
  maxDate={new Date(2026, 8, 30)}
/>
```

Dates outside the allowed range:

- Cannot be selected from the calendar
- Are disabled in the calendar
- Are skipped during keyboard navigation
- Cannot be committed through direct date entry

## Required

Use `required` when a date must be provided.

```tsx
<DatePicker label="Date of birth" name="dateOfBirth" required />
```

The required indicator is displayed visually and hidden from assistive technology using `aria-hidden`.

The native `required` attribute is also applied to the input.

## Disabled

Use `disabled` when the Date Picker should not be available for interaction.

```tsx
<DatePicker label="Unavailable date" name="unavailableDate" disabled />
```

When disabled:

- The input cannot be edited.
- The calendar button cannot be activated.
- The Date Picker cannot be changed.

## Read Only

Use `readOnly` when the selected date should be displayed but not changed.

```tsx
<DatePicker
  label="Selected date"
  name="selectedDate"
  defaultValue={new Date(2026, 8, 25)}
  readOnly
/>
```

The input is read-only and the calendar button is unavailable.

## Description

Use `description` to provide additional instructions or context.

```tsx
<DatePicker
  label="Conference date"
  name="conferenceDate"
  description="Enter a date in YYYY-MM-DD format or select a date from the calendar."
/>
```

The description is associated with the input using `aria-describedby`.

## Error

Use `error` to display a validation error.

```tsx
<DatePicker
  label="Appointment date"
  name="appointmentDate"
  error="Please select an available appointment date."
/>
```

When an error is provided:

- The input receives `aria-invalid="true"`.
- The error is associated with the input through `aria-describedby`.
- The error uses `role="alert"` so that the message can be announced by assistive technologies.

Validation is controlled by the consuming application. The Date Picker does not automatically decide when an error should be displayed.

## Description and Error

Both a description and an error can be provided.

```tsx
<DatePicker
  label="Appointment date"
  name="appointmentDate"
  description="Choose an appointment date within the available date range."
  error="Please select an available appointment date."
/>
```

Both messages are included in `aria-describedby`.

## Date Entry

Dates can be entered directly into the text input using:

```text
YYYY-MM-DD
```

The Date Picker waits until the complete date has been entered before attempting to parse it. This prevents automatic formatting from interfering with normal typing.

For example:

```text
2026-09-10
```

is accepted as a valid date.

Invalid calendar dates such as:

```text
2026-09-31
```

are rejected.

The component also correctly handles leap years. For example:

```text
2028-02-29
```

is valid, while:

```text
2026-02-29
```

is invalid.

If an incomplete or invalid value remains when the input loses focus, the input is restored to the current selected date.

## Calendar

The calendar uses semantic grid structure:

```text
grid
└── row
    └── gridcell
        └── button
```

Each date is represented by a native button.

The calendar identifies:

- The currently selected date
- Today's date
- Dates outside the current month
- Dates disabled by `minDate` or `maxDate`

The current month and year are presented as a live region so that month changes can be announced by assistive technologies.

## Keyboard Support

### Input

The text input is a standard text field and supports normal browser text editing.

### Calendar Button

When the calendar button has focus:

- `Enter` opens the calendar.
- `Space` opens the calendar.

### Calendar Date Navigation

When a date has focus:

| Key                 | Action                                                     |
| ------------------- | ---------------------------------------------------------- |
| `Arrow Left`        | Move to the previous enabled date                          |
| `Arrow Right`       | Move to the next enabled date                              |
| `Arrow Up`          | Move to the same day in the previous week                  |
| `Arrow Down`        | Move to the same day in the following week                 |
| `Home`              | Move to the first enabled date of the current week         |
| `End`               | Move to the last enabled date of the current week          |
| `Page Up`           | Move to the same day in the previous month                 |
| `Page Down`         | Move to the same day in the next month                     |
| `Shift + Page Up`   | Move to the same day in the previous year                  |
| `Shift + Page Down` | Move to the same day in the next year                      |
| `Enter`             | Select the focused date                                    |
| `Space`             | Select the focused date                                    |
| `Escape`            | Close the calendar and return focus to the calendar button |

Keyboard navigation automatically skips dates that are outside the configured `minDate` and `maxDate` range.

### Month Navigation Buttons

The Previous month and Next month controls are native buttons.

When either button has focus:

- `Enter` activates the button.
- `Space` activates the button.

The calendar remains open when changing months.

The month navigation buttons do not interfere with the custom keyboard navigation used by the date grid.

## Focus Management

The calendar uses a roving `tabIndex` pattern.

Only the currently focused date has:

```html
tabindex="0"
```

Other dates have:

```html
tabindex="-1"
```

When keyboard navigation changes the focused date, focus is moved to the corresponding date button.

When a date is selected:

1. The selected value is updated.
2. The calendar closes.
3. Focus returns to the calendar button.

When Escape closes the calendar, focus also returns to the calendar button.

## Accessibility

The Date Picker is designed to support keyboard and screen-reader users.

### Labels

Every Date Picker requires a visible `label`.

The label is programmatically associated with the text input using `htmlFor` and `id`.

### Calendar Button

The calendar button provides an accessible name based on the Date Picker label and identifies whether the calendar is currently open or closed.

It uses:

- `aria-expanded`
- `aria-controls`
- A descriptive `aria-label`

### Calendar Grid

The calendar uses:

- `role="grid"`
- `role="row"`
- `role="columnheader"`
- `role="gridcell"`

Dates are interactive native buttons within the grid cells.

### Selected Date

The selected date is identified using the calendar's selected state.

### Today

Today's date is identified using:

```html
aria-current="date"
```

### Descriptions and Errors

Descriptions and errors are programmatically associated with the input through `aria-describedby`.

Errors also use:

```html
role="alert"
```

and the input receives:

```html
aria-invalid="true"
```

when an error is present.

## Accessibility Testing

The Date Picker should be tested using:

### Keyboard

- Open and close the calendar without a mouse.
- Navigate dates using Arrow keys.
- Test Home and End.
- Test Page Up and Page Down.
- Test Shift + Page Up and Shift + Page Down.
- Activate Previous and Next month using Enter and Space.
- Select a date using Enter and Space.
- Close the calendar using Escape.
- Verify focus returns to the calendar button.
- Verify disabled dates cannot be selected.

### Screen Reader

Test with NVDA and verify:

- The Date Picker label is announced.
- The calendar button has a meaningful accessible name.
- The current month is announced when it changes.
- Focused dates are announced with their complete date.
- Selected dates are identifiable.
- Today's date is identifiable.
- Disabled dates are identified as unavailable.
- Error messages are announced.
- Description and error text are associated with the input.

### Zoom and Responsive Testing

Test at:

- 100% browser zoom
- 200% browser zoom
- 400% browser zoom
- Desktop viewport
- Narrow/mobile viewport

Verify that:

- Content remains usable.
- Focus indicators remain visible.
- Date buttons remain large enough to interact with.
- The calendar does not require unnecessary horizontal scrolling.
- Text remains readable.
- No information is lost when the calendar is resized.

## Props

| Prop           | Type                           | Default | Description                                            |
| -------------- | ------------------------------ | ------- | ------------------------------------------------------ |
| `label`        | `string`                       | —       | Visible label for the Date Picker.                     |
| `name`         | `string`                       | —       | Name attribute for the input.                          |
| `value`        | `Date \| null`                 | —       | Controlled selected date.                              |
| `defaultValue` | `Date \| null`                 | `null`  | Initial selected date for an uncontrolled Date Picker. |
| `minDate`      | `Date`                         | —       | Earliest selectable date.                              |
| `maxDate`      | `Date`                         | —       | Latest selectable date.                                |
| `required`     | `boolean`                      | `false` | Makes the date input required.                         |
| `disabled`     | `boolean`                      | `false` | Disables the Date Picker.                              |
| `readOnly`     | `boolean`                      | `false` | Prevents changing the selected date.                   |
| `description`  | `string`                       | —       | Additional descriptive or instructional text.          |
| `error`        | `string`                       | —       | Validation error message.                              |
| `onChange`     | `(date: Date \| null) => void` | —       | Called when the selected date changes.                 |

## Notes

- Dates are represented using JavaScript `Date` objects.
- Date entry uses the `YYYY-MM-DD` format.
- The Date Picker validates that entered dates actually exist in the specified month and year.
- Date constraints are applied to both calendar selection and direct date entry.
- Validation errors are controlled by the consuming application.
- The component uses native HTML buttons for interactive calendar controls.

## Related Components

- [Text Input](./text-input.md) — Use for general text entry when date-specific calendar functionality is not required.
