# Card

The Card component provides a flexible container for grouping related content into a clear, structured presentation. It supports optional headers and footers, default and elevated visual variants, and flexible content composition for a variety of interface patterns.

## Features

- Semantic content structure for grouping related information
- Optional header and footer regions
- Default and elevated visual variants
- Flexible content through React children
- Support for headings, paragraphs, lists, links, and form controls
- Suitable for resource directories, profiles, events, settings, notifications, recent activity, and dashboard statistics
- Customizable styling through CSS Modules
- Responsive layouts when used within responsive parent layouts
- Supports independently accessible interactive elements, including links, buttons, and form controls
- Does not make the entire card clickable by default

## Accessibility

- Uses semantic HTML structure to group related content
- Supports meaningful heading hierarchies within card content
- Allows links and interactive controls to retain their native keyboard behaviour
- Supports accessible form components within card content
- Avoids requiring users to interact with the entire card when only an individual action is intended
- Supports descriptive text and accessible names through the content and components supplied by the developer

## Variants

| Variant    | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| `default`  | Standard card presentation                                         |
| `elevated` | Card presentation with increased visual emphasis through elevation |

## Examples

The Card examples demonstrate a range of common interface patterns:

- **Basic Card:** Presents simple grouped content.
- **Card with Header and Footer:** Organizes content into distinct regions.
- **Elevated Card:** Demonstrates the elevated visual variant.
- **Product or Resource Card:** Presents a category, image placeholder, title, description, and action link.
- **Profile Card:** Groups a person's name, role, descriptive information, and profile action.
- **Featured Content Card:** Emphasizes important content through a more prominent presentation. It shares several elements with the Product or Resource Card but places greater emphasis on featured content.
- **Event Card:** Presents event details, including date, time, location, and a registration link.
- **Settings Card:** Groups a preference with an accessible switch and explanatory text.
- **Notification Summary Card:** Groups multiple notifications into a single card.
- **Recent Activity Card:** Presents a chronological list of updates, uploads, and milestones.
- **Statistics Cards:** Displays summary metrics with descriptions and status indicators.

## Usage Guidelines

- Use cards to group related information into distinct sections.
- Choose a card layout based on the content's purpose rather than using cards for every section.
- Use headings that fit the surrounding page's heading hierarchy.
- Keep card content concise and organize information in a logical order.
- Use descriptive link text that communicates the destination or action.
- Keep interactive elements independently accessible rather than making the whole card clickable unnecessarily.
- Ensure text, backgrounds, focus indicators, and status indicators meet applicable accessibility requirements.
- Use responsive layouts to prevent content from overflowing on smaller screens.

## Testing

Test the Card component to confirm that:

- Header, content, and footer render

## Related Components

- [Table](./table.md) – Displays structured information in rows and columns.
- [Tabs](../ContentFeedback/tab.md) – Organizes related content into switchable panels.
- [Accordion](../Navigations/accordion.md) – Expands and collapses sections of content.
- [Alert](../ContentFeedback/alert.md) – Communicates important information or status messages.
- [Status](../ContentFeedback/status.md) – Displays the current state of an item or process.
- [Progress](../ContentFeedback/progress.md) – Communicates progress toward a goal.
- [Button](../Actions/button.md) – Provides an action within a card.
- [Switch](../FormControls/switch.md) – Allows users to change a setting within a card.
- [Checkbox](../FormControls/checkbox.md) – Allows users to select an option within a card.
