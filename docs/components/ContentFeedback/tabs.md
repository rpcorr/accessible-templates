# Tabs

An accessible tabs component supporting horizontal and vertical orientations, keyboard navigation, disabled tabs, focus management, screen reader support, and responsive horizontal scrolling on smaller screens.

## Features

- Horizontal and vertical orientations
- Keyboard navigation
- Disabled tab support
- Focus management
- Screen reader support
- Accessible tab and tab panel relationships
- Responsive horizontal scrolling on smaller screens
- Automatic scrolling to bring keyboard-focused tabs into view
- Visual right-edge gradient and chevron indicator when additional tabs are available
- Scroll indicator updates as users navigate through the tab list
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

When navigating horizontally with the keyboard, focused tabs are automatically brought into view without requiring users to scroll manually.

The visual scroll indicator is decorative and does not interfere with keyboard navigation or screen reader interaction.

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

Tabs are designed to remain usable across different screen sizes and increased browser zoom levels.

### Horizontal Tabs

- On larger screens, tabs wrap onto multiple rows when necessary.
- On smaller screens, tabs remain on a single line and can be scrolled horizontally.
- A right-edge gradient and chevron indicate when additional tabs are available beyond the visible area.
- The scroll indicator disappears when all tabs are visible or the end of the tab list is reached.
- Users can swipe horizontally on touch devices to reach additional tabs.
- Keyboard navigation automatically scrolls focused tabs into view.

### Vertical Tabs

Vertical tabs maintain the tab list beside the panel while retaining their existing layout.

The component has been tested at:

- 100% browser zoom
- 200% browser zoom
- 400% browser zoom

Long tab labels and panel content wrap naturally while maintaining access to the full content.

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

## Related Components

- **[Accordion](accordion.md):** Organizes content into expandable and collapsible sections, allowing users to reveal content as needed.
- **[Carousel](../Navigations/carousel.md):** Presents content in a sequence of slides with previous and next controls and optional slide indicators.
- **[Multi-Item Carousel](../Navigations/multi-item-carousel.md):** Displays multiple items in a responsive carousel layout, with item-by-item or page-by-page navigation, optional looping, and a CoverFlow presentation.
- **[Pagination](../Navigation/pagination.md):** Allows users to navigate between separate pages of content rather than switching between panels on the same page.
