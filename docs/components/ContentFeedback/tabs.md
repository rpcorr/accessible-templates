# Tabs

An accessible tabs component supporting horizontal and vertical orientations, keyboard navigation, disabled tabs, focus management, screen reader support, and responsive behaviour.

## Features

- Horizontal and vertical orientations
- Keyboard navigation
- Disabled tab support
- Focus management
- Screen reader support
- Accessible tab and tab panel relationships
- Responsive wrapping at increased browser zoom levels
- Support for long tab labels and panel content
- Home and End navigation
- Visible keyboard focus indicators

## Accessibility

The Tabs component uses the semantic `tablist`, `tab`, and `tabpanel` roles.

Each tab is associated with its corresponding panel using:

- `aria-selected` to identify the active tab
- `aria-controls` to identify the associated panel
- `aria-labelledby` to associate the panel with its tab
- `aria-orientation` to identify horizontal or vertical orientation

Disabled tabs remain visible but are excluded from keyboard navigation and cannot be activated.

Tab panels can receive keyboard focus so that screen reader users can access and read their content.

## Keyboard Support

### Horizontal Tabs

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| Arrow Right | Move to the next enabled tab                |
| Arrow Left  | Move to the previous enabled tab            |
| Home        | Move to the first enabled tab               |
| End         | Move to the last enabled tab                |
| Tab         | Move from the active tab to the tab panel   |
| Shift + Tab | Return from the tab panel to the active tab |

### Vertical Tabs

| Key         | Action                                      |
| ----------- | ------------------------------------------- |
| Arrow Down  | Move to the next enabled tab                |
| Arrow Up    | Move to the previous enabled tab            |
| Home        | Move to the first enabled tab               |
| End         | Move to the last enabled tab                |
| Tab         | Move from the active tab to the tab panel   |
| Shift + Tab | Return from the tab panel to the active tab |

## Disabled Tabs

Disabled tabs:

- Remain visible in the tab list
- Are announced as unavailable by assistive technologies
- Cannot be activated
- Are skipped during arrow-key navigation
- Do not become the active tab

## Responsive Behaviour

Tabs are designed to remain usable at increased browser zoom levels.

Horizontal tabs wrap when necessary rather than creating unnecessary horizontal page scrolling.

The component has been tested at:

- 100% browser zoom
- 200% browser zoom
- 400% browser zoom

Long tab labels and panel content wrap naturally while maintaining access to the full content.

Vertical tabs maintain the tab list beside the panel while remaining usable at increased zoom levels.

## Usage

The `Tabs` component accepts an array of tab objects. Each tab includes an `id`, `label`, and `content`. Tabs can optionally be disabled.

Horizontal tabs are the default orientation. To create vertical tabs, set the `orientation` prop to `vertical`.

```tsx
import { Tabs } from './components/Tab';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <p>Overview content.</p>,
  },
  {
    id: 'details',
    label: 'Details',
    content: <p>Details content.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <p>Settings content.</p>,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    disabled: true,
    content: <p>Advanced settings.</p>,
  },
];

<Tabs tabs={tabs} />;
```
