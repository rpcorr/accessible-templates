# Pagination

A reusable pagination component for navigating between pages of content, with support for previous and next controls, page selection, current page indication, long page ranges, and visual variants.

## Features

- Previous and Next controls
- Page selection
- Current page indication using `aria-current="page"`
- Long page range support with ellipsis
- Accessible names for pagination controls
- Disabled Previous control on the first page
- Disabled Next control on the last page
- Keyboard accessibility
- Visible focus indicator
- Current page remains keyboard focusable
- Screen reader-friendly ellipsis indicators
- Basic, pill, and outline visual variants
- Responsive wrapping for long pagination ranges

## Keyboard Support

| Key         | Action                                  |
| ----------- | --------------------------------------- |
| Tab         | Move to the next pagination control     |
| Shift + Tab | Move to the previous pagination control |
| Enter       | Activate the focused pagination control |
| Space       | Activate the focused pagination control |

The current page remains keyboard focusable and displays a visible focus indicator when focused using the keyboard.

Disabled Previous and Next controls cannot receive keyboard focus.

Ellipsis indicators are hidden from screen readers because they are visual separators rather than interactive controls.

## Usage

The `Pagination` component accepts the current page, total number of pages, and a callback function that is called when the user selects a different page.

```tsx
import { useState } from 'react';

import { Pagination } from './components/Pagination';

function Example() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Related Components

- **[Multi-Item Carousel](../Navigations/multi-item-carousel.md):** Displays multiple items in a responsive carousel layout, with item-by-item or page-by-page navigation, optional looping, and a CoverFlow presentation.
- **[Carousel](../Navigations/carousel.md):** Displays content in a navigable sequence of slides, with optional automatic rotation and Pause/Play controls.
- **[Progress Indicator](../ContentFeedback/progress-indicator.md):** Communicates progress through a process or sequence rather than allowing users to navigate directly between pages.
