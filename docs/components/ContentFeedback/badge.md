# Badge

The Badge component provides a compact, accessible way to identify categories, statuses, and other contextual information. It supports six visual variants and two sizes, making it suitable for cards, tables, lists, notifications, and other interface elements.

## Features

- Six visual variants: default, success, warning, error, info, and neutral
- Two sizes: small and medium
- Semantic HTML using a non-interactive `<span>` element
- Configurable styling through CSS Modules and design tokens
- Text labels that communicate meaning without relying on colour alone
- Flexible content that can wrap when necessary
- Suitable for categorizing resources, displaying project statuses, and summarizing notification counts

## Accessibility

The Badge component follows accessibility best practices to support users with different needs.

- **Meaningful text:** Use descriptive labels so the meaning is understandable without relying on colour alone.
- **Colour contrast:** Ensure text and background combinations meet WCAG 2.2 Level AA contrast requirements, including a minimum contrast ratio of 4.5:1 for normal-sized text.
- **Non-interactive semantics:** Badges are informational labels and are not keyboard-focusable by default.
- **Screen reader support:** Badge text is available to assistive technologies through the text content of the element.
- **Dynamic updates:** Badges do not automatically announce changes. Use an appropriate status or alert component when updates need to be communicated to assistive technology.
- **Responsive content:** Labels can wrap when necessary to accommodate longer text and narrower layouts.

## Variants

| Variant   | Purpose                                | Example           |
| --------- | -------------------------------------- | ----------------- |
| `default` | General-purpose labels and categories  | Featured Resource |
| `success` | Successful outcomes or completed tasks | Completed         |
