# Tree View

The Tree View component provides an accessible way to display and navigate hierarchical information. It supports expandable and collapsible branches, keyboard navigation, and optional single or multiple selection. It follows the WAI-ARIA Tree View pattern and provides keyboard interaction for navigating parent and child items.

## Features

- Displays hierarchical data using nested tree items.
- Supports expandable and collapsible parent items.
- Supports single, multiple, or no selection.
- Supports controlled and uncontrolled expansion states.
- Supports controlled and uncontrolled selection states.
- Provides callbacks when expanded items or selections change.
- Supports disabled tree items.
- Supports optional icons and descriptions for individual items.
- Maintains focus using roving tab index.
- Supports keyboard navigation using arrow keys, Home, End, Enter, Space, and Asterisk.
- Provides visual indicators for expanded and collapsed branches.
- Supports custom styling through an optional `className` prop.
- Responsive layout and reduced-motion support.

## Accessibility

- Follows the WAI-ARIA Tree View pattern using `role="tree"`, `role="treeitem"`, and `role="group"`.
- Provides an accessible name for the tree using `aria-label`.
- Provides individual accessible names for tree items using `aria-label`.
- Uses roving tab index so only one tree item participates in the normal Tab sequence.
- Communicates expanded and collapsed states using `aria-expanded`.
- Communicates selection using `aria-selected` when selection is enabled.
- Identifies disabled items using `aria-disabled`.
- Provides hierarchical information using `aria-level`, `aria-posinset`, and `aria-setsize`.
- Hides decorative icons and expansion indicators from assistive technology.
- Maintains keyboard focus when expanding and collapsing branches.
- Provides a visible keyboard focus indicator.
- Supports screen readers and keyboard-only interaction.

## Keyboard Support

| Key                                    | Action                                                         |
| -------------------------------------- | -------------------------------------------------------------- |
| Tab                                    | Moves focus into and out of the tree.                          |
| Arrow Down                             | Moves focus to the next visible tree item.                     |
| Arrow Up                               | Moves focus to the previous visible tree item.                 |
| Arrow Right                            | Expands a collapsed parent item.                               |
| Arrow Right (expanded parent)          | Moves focus to the first child item.                           |
| Arrow Left                             | Collapses an expanded parent item.                             |
| Arrow Left (collapsed parent or child) | Moves focus to the parent item.                                |
| Home                                   | Moves focus to the first visible tree item.                    |
| End                                    | Moves focus to the last visible tree item.                     |
| Enter                                  | Selects the focused item when selection is enabled.            |
| Space                                  | Selects or toggles the focused item when selection is enabled. |
| Asterisk (\*)                          | Expands sibling parent items at the current level.             |

## Usage

```tsx
import { TreeView } from '../../components/Navigations/TreeView';
import type { TreeViewItem } from '../../components/Navigations/TreeView';

const items: TreeViewItem[] = [
  {
    id: 'documents',
    label: 'Documents',
    children: [
      {
        id: 'work',
        label: 'Work',
        children: [
          {
            id: 'report',
            label: 'Annual Report.docx',
          },
        ],
      },
      {
        id: 'personal',
        label: 'Personal',
      },
    ],
  },
  {
    id: 'pictures',
    label: 'Pictures',
    children: [
      {
        id: 'vacation',
        label: 'Vacation',
      },
    ],
  },
];

export function Example() {
  return (
    <TreeView
      items={items}
      ariaLabel="File explorer"
      selectionMode="single"
      defaultExpandedIds={['documents']}
    />
  );
}
```

## Selection Modes

The Tree View supports three selection modes:

- `none`: Selection is disabled. Items can still receive keyboard focus and be expanded or collapsed.
- `single`: Only one item can be selected at a time.
- `multiple`: Multiple items can be selected independently.

The default selection mode is `none`.

## Controlled and Uncontrolled State

The component supports both controlled and uncontrolled state management.

### Expansion

- `defaultExpandedIds` sets the initially expanded items for uncontrolled usage.
- `expandedIds` controls the expanded items externally.
- `onExpandedChange` reports changes to the expanded item IDs.

### Selection

- `defaultSelectedIds` sets the initially selected items for uncontrolled usage.
- `selectedIds` controls the selected items externally.
- `onSelectionChange` reports changes to the selected item IDs.

When using controlled state, the parent component is responsible for updating the corresponding values in response to callbacks.

## Tree View Item Structure

Each tree item supports the following properties:

| Property      | Type             | Description                                                 |
| ------------- | ---------------- | ----------------------------------------------------------- |
| `id`          | `string`         | Unique identifier for the item.                             |
| `label`       | `string`         | Accessible label and visible text for the item.             |
| `children`    | `TreeViewItem[]` | Optional nested child items.                                |
| `disabled`    | `boolean`        | Prevents the item from being selected or expanded.          |
| `icon`        | `ReactNode`      | Optional decorative icon displayed alongside the label.     |
| `description` | `string`         | Optional supplementary description displayed with the item. |

## Props

| Prop                 | Type                               | Default  | Description                                         |
| -------------------- | ---------------------------------- | -------- | --------------------------------------------------- |
| `items`              | `TreeViewItem[]`                   | Required | Hierarchical data used to render the tree.          |
| `ariaLabel`          | `string`                           | Required | Accessible name for the tree.                       |
| `selectionMode`      | `'none' \| 'single' \| 'multiple'` | `'none'` | Determines the selection behaviour.                 |
| `expandedIds`        | `string[]`                         | —        | Controlled list of expanded item IDs.               |
| `defaultExpandedIds` | `string[]`                         | `[]`     | Initially expanded item IDs for uncontrolled usage. |
| `onExpandedChange`   | `(expandedIds: string[]) => void`  | —        | Callback when the expanded items change.            |
| `selectedIds`        | `string[]`                         | —        | Controlled list of selected item IDs.               |
| `defaultSelectedIds` | `string[]`                         | `[]`     | Initially selected item IDs for uncontrolled usage. |
| `onSelectionChange`  | `(selectedIds: string[]) => void`  | —        | Callback when the selected items change.            |
| `className`          | `string`                           | —        | Optional CSS class applied to the tree container.   |

## Related Component

- [Breadcrumbs](breadcrumbs.md) – Provides accessible navigation links that help users understand their location within a website or application hierarchy.
