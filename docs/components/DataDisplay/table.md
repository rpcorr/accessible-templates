# Table

The Table component provides an accessible way to display structured information in rows and columns. It supports sorting, basic and striped styling, custom cell rendering, horizontal scrolling, frozen columns, and empty-state messaging.

## Features

- Semantic HTML table structure with column headers
- Optional accessible table captions, including visually hidden captions
- Basic and striped visual variants
- Optional column sorting with ascending and descending directions
- Internal sorting by default, with optional controlled sorting through `sortState` and `onSortChange`
- Custom sort values through the `sortValue` column property
- Custom cell rendering through the `render` column property
- Left, center, and right column alignment
- Horizontal scrolling for wide tables
- Conditional keyboard focus for the scrollable region when horizontal overflow exists
- Frozen columns to keep important information visible while scrolling
- Responsive frozen-column configuration for screens 375 pixels wide or narrower
- A visual separator beside frozen columns after horizontal scrolling begins
- Configurable empty-state messaging
- Custom row keys through `getRowKey`
- Default rendering of `null` and `undefined` values as an em dash (—)
- Missing values remain at the bottom when sorting in either direction

## Basic Usage

Import the Table component and its types from your project.

```tsx
import { Table } from '@/components/DataDisplay/Table/Table';
import type { TableColumn } from '@/components/DataDisplay/Table/Table';

interface Person {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<Person>[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'email',
    header: 'Email',
  },
];

const people: Person[] = [
  {
    id: 1,
    name: 'Alex Morgan',
    email: 'alex@example.com',
  },
  {
    id: 2,
    name: 'Jordan Lee',
    email: 'jordan@example.com',
  },
];

export function PeopleTable() {
  return (
    <Table
      columns={columns}
      data={people}
      getRowKey={(person) => person.id}
      caption="Contact directory"
    />
  );
}
```

The example assumes the component is exported as a named export. Adjust the import path or export style if your project uses a different convention.

## Variants

The `variant` prop controls the table's visual presentation.

### Basic

```tsx
<Table
  columns={columns}
  data={people}
  getRowKey={(person) => person.id}
  variant="basic"
  caption="Contact directory"
/>
```

### Striped

```tsx
<Table
  columns={columns}
  data={people}
  getRowKey={(person) => person.id}
  variant="striped"
  caption="Contact directory"
/>
```

The striped variant helps users distinguish adjacent rows visually. Check that the row and cell colours maintain sufficient contrast, including when frozen columns are enabled.

## Sorting

Columns can be made sortable by setting `sortable: true`.

By default, the Table component manages its own sorting state and sorts the supplied data internally. Activating a sortable column heading sorts the data in ascending order. Activating the same heading again switches to descending order.

For controlled sorting, provide `sortState` and `onSortChange`. The parent component manages the sorting state, while the Table component applies that state to the supplied data.

```tsx
const [sortState, setSortState] = useState<{
  key: keyof Person;
  direction: 'ascending' | 'descending';
} | null>(null);

<Table
  columns={columns}
  data={people}
  getRowKey={(person) => person.id}
  sortState={sortState}
  onSortChange={(key, direction) => {
    setSortState({ key, direction });
  }}
  caption="Sortable contact directory"
/>;
```

When sorting is active, the component communicates the current direction through `aria-sort` on the relevant column header.

For columns that need a different value for sorting, use the optional `sortValue` property. For example, a column displaying formatted currency can sort using its underlying numeric value.

Missing values represented by `null` or `undefined` remain at the bottom in either sort direction.

When combining sorting with pagination, sort the full dataset before selecting the records for the current page if the intention is to sort across all pages. If only the current page is supplied to the Table, its internal sorting applies only to those supplied records.

## Related Components

- [Card](./card.md) – Presents related information in a flexible, self-contained layout when a table is not the best fit.
- [Pagination](../Navigations/pagination.md) – Divides large datasets into manageable pages.
- [Status](../ContentFeedback/status.md) – Communicates the current state of an item in a table.
- [Badge](../ContentFeedback/badge.md) – Displays compact labels or categories alongside table data.
- [Progress](../ContentFeedback/progress.md) – Shows progress toward a goal or completion of a task.
- [Checkbox](../FormControls/checkbox.md) – Allows users to select rows or options when selection is supported by the surrounding interface.
