# Accordion

An accessible accordion component supporting expandable and collapsible content sections, keyboard navigation, disabled sections, screen reader support, focus management, and responsive behaviour.

## Features

- Expandable and collapsible panels
- Multiple panels can be open at the same time
- Native button controls
- Keyboard navigation
- Disabled section support
- Focus management
- Screen reader support
- Accessible button and panel relationships
- Visible expand/collapse indicators
- Responsive behaviour at increased browser zoom levels
- Support for long section titles and panel content
- Home and End navigation
- Focus-visible keyboard interaction
- Configurable single-panel or multiple-panel behaviour

## Keyboard Support

| Key         | Action                                               |
| ----------- | ---------------------------------------------------- |
| Tab         | Move to the next focusable element                   |
| Shift + Tab | Move to the previous focusable element               |
| Enter       | Open or close the focused accordion panel            |
| Space       | Open or close the focused accordion panel            |
| Arrow Down  | Move focus to the next enabled accordion trigger     |
| Arrow Up    | Move focus to the previous enabled accordion trigger |
| Home        | Move focus to the first enabled accordion trigger    |
| End         | Move focus to the last enabled accordion trigger     |

Focus remains on the accordion trigger when a panel is opened or closed.

Arrow-key navigation skips disabled accordion sections.

Expanded panel content can be read by screen reader users using Browse Mode reading commands.

## Usage

The `Accordion` component accepts an array of accordion items. Each item includes an `id`, `title`, and `content`. Items can optionally be disabled.

By default, multiple panels can be open at the same time.

```tsx
import { Accordion } from './components/Accordion';

const items = [
  {
    id: 'overview',
    title: 'Overview',
    content: <p>Overview content.</p>,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    content: <p>Accessibility information.</p>,
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    disabled: true,
    content: <p>Advanced settings.</p>,
  },
];

<Accordion items={items} />;
```
