# 📊 Progress Indicator

An accessible progress indicator for communicating the progress of ongoing operations. The component supports determinate and indeterminate progress, multiple visual presentations, accessible labels, optional visible progress values, colour variants, an optional wavy leading edge, and reduced-motion support.

## Features

- Determinate and indeterminate progress
- Linear progress bar
- Circular progress indicator
- Icon-based progress indicator
- Fill-container progress indicator
- Optional wavy leading edge for linear and fill progress
- Colour variants
- Custom maximum values
- Optional visible percentage values
- Accessible `role="progressbar"` semantics
- `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` for determinate progress
- Accessible labels using the `label` prop
- Decorative icons excluded from the accessibility tree
- Dynamic progress updates
- `prefers-reduced-motion` support
- Screen reader support with NVDA

## Usage

```tsx
import { ProgressIndicator } from './components/ProgressIndicator';

<ProgressIndicator value={50} label="Uploading files" showValue />;
```
