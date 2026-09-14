# Slider

The Slider is an accessible single-value form control that allows users to select a numeric value from a defined range. It uses the native HTML range input and supports horizontal and vertical orientations.

## Features

- Native `<input type="range>` semantics
- Keyboard accessibility
- Horizontal and vertical orientations
- Custom minimum and maximum values
- Custom step increments
- Controlled and uncontrolled values
- Disabled state
- Optional description
- Optional visible value
- Formatted value output
- Colour variants
- Visible focus styling
- Screen reader support

## Accessibility

The Slider uses a native `<input type="range">`, which provides the appropriate slider semantics and accessibility information to assistive technologies.

The input is associated with its visible label using a native `<label>` element. An optional description is associated with the input using `aria-describedby`.

The current value can optionally be displayed alongside the label using the native `<output>` element.

Custom value formatting affects only the visible value displayed to users. The underlying Slider continues to use the numeric value provided by the native range input.

The Slider relies on the native range input for keyboard interaction and does not add custom keyboard handling.

## Values

The Slider supports custom minimum and maximum values for the range, step increments, default values, and controlled values.

By default:

- Minimum: `0`
- Maximum: `100`
- Step: `1`
- Default value: `50`

## Formatted Values

The Slider supports custom formatting for the visible value using the `formatValue` prop. This can be used to display values with units, currency symbols, percentages, or other meaningful formats.

For example:

```tsx
<Slider
  label="Opacity"
  defaultValue={75}
  formatValue={(value) => `${value}%`}
/>

<Slider
  label="Price"
  min={0}
  max={1000}
  step={10}
  defaultValue={500}
  formatValue={(value) => `$${value}`}
/>

<Slider
  label="Temperature"
  min={0}
  max={40}
  defaultValue={20}
  formatValue={(value) => `${value}°C`}
/>
```

The `formatValue` function changes only the visible representation of the value. The underlying Slider value remains numeric.

## Colour Variants

The Slider supports colour variants for different visual styles.

Available colour variants are:

- `default`
- `success`
- `warning`
- `error`
- `info`

Colour is used only as a visual styling option and does not communicate the Slider's value or state by itself. The value and slider semantics remain available through the native range input.

## Orientation

The Slider supports horizontal and vertical orientations.

The default orientation is `horizontal`.

To create a vertical Slider, set the `orientation` prop to `vertical`.

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} />
```

## Keyboard Support

The native range input provides keyboard support.

| Key           | Action                                   |
| ------------- | ---------------------------------------- |
| `Arrow Left`  | Decrease the value                       |
| `Arrow Down`  | Decrease the value                       |
| `Arrow Right` | Increase the value                       |
| `Arrow Up`    | Increase the value                       |
| `Home`        | Move to the minimum value                |
| `End`         | Move to the maximum value                |
| `Page Up`     | Increase the value by a larger increment |
| `Page Down`   | Decrease the value by a larger increment |
| `Tab`         | Move focus to or from the Slider         |

## Usage

```tsx
import { Slider } from './components/FormControls/Slider';

<Slider label="Volume" />;
```

## Custom Range

```tsx
<Slider label="Temperature" min={10} max={30} defaultValue={20} />
```

## Step Values

```tsx
<Slider label="Rating" min={0} max={10} step={1} defaultValue={5} />
```

## Controlled Usage

```tsx
const [volume, setVolume] = useState(50);

<Slider label="Volume" value={volume} onChange={setVolume} />;
```

## Colour Variants Examples

```tsx
<Slider
  label="Default"
  colour="default"
  defaultValue={50}
/>

<Slider
  label="Success"
  colour="success"
  defaultValue={60}
/>

<Slider
  label="Warning"
  colour="warning"
  defaultValue={40}
/>

<Slider
  label="Error"
  colour="error"
  defaultValue={70}
/>

<Slider
  label="Info"
  colour="info"
  defaultValue={30}
/>
```

## Vertical Slider

```tsx
<Slider label="Volume" orientation="vertical" defaultValue={65} colour="info" />
```

## Description

```tsx
<Slider
  label="Notification volume"
  description="Adjust the volume used for notification sounds."
  defaultValue={60}
/>
```

## Disabled

```tsx
<Slider label="Disabled slider" defaultValue={50} disabled />
```

## Hide Visible Value

```tsx
<Slider label="Brightness" defaultValue={75} showValue={false} />
```
