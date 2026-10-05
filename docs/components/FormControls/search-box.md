# Search Box

The Search Box is an accessible search field that allows users to enter a search query and submit it for processing.

## Features

- Native `<input type="search">` semantics
- `search` landmark for the search form
- Visible label associated with the input
- Search button with Enter-to-submit support
- Optional search icon
- Optional search icon positioned inside the input
- Rounded styling
- Optional expanding-on-focus behavior
- Controlled and uncontrolled values
- Default values
- Required, disabled, and read-only states
- Optional description and error messaging
- `aria-describedby` support for descriptions and errors
- `aria-invalid` support for validation errors
- Visible keyboard focus indicators
- Reduced-motion support
- Responsive expanding behavior

## Usage

```tsx
import { SearchBox } from './SearchBox';

function Example() {
  function handleSearch(value: string) {
    console.log('Search:', value);
  }

  return (
    <SearchBox
      label="Search"
      name="search"
      placeholder="Enter a search term"
      onSearch={handleSearch}
    />
  );
}
```
