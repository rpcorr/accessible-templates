# 🔄 Loading Spinner

An accessible loading indicator for communicating that an operation is currently in progress when the amount of progress cannot be determined. The component supports multiple animation variants, different visual sizes, colour variants, accessible labels, optional visible loading messages, and reduced-motion support.

## Features

- Spinner animation
- Dots animation
- Pulse animation
- Bars animation
- Orbit animation
- Comet animation
- Small, medium, and large sizes
- Colour variants
- Accessible `role="status"` semantics
- Accessible labels using the `label` prop
- Optional visible loading messages using the `showLabel` prop
- Decorative animations excluded from the accessibility tree
- Non-interactive and does not receive keyboard focus
- `prefers-reduced-motion` support
- Screen reader support with NVDA

## Usage

```tsx
import { LoadingSpinner } from './components/LoadingSpinner';

<LoadingSpinner label="Loading content" />;
```
