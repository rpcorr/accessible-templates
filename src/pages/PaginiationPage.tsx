import { PageLayout } from '../components/PageLayout/PageLayout';
import { PaginationExamples } from '../examples';

export function PaginationPage() {
  return (
    <PageLayout title="Pagination">
      <p>
        A reusable pagination component for navigating between pages of content,
        with support for previous and next controls, page selection, and current
        page indication.
      </p>
      <h3>Accessibility</h3>
      <ul>
        <li>Uses a semantic navigation landmark with an accessible label.</li>
        <li>Uses native HTML buttons for pagination controls.</li>
        <li>
          Identifies the current page using <code>aria-current="page"</code>.
        </li>
        <li>
          Provides accessible names for Previous, Next, and page controls.
        </li>
        <li>Provides a visible focus indicator for keyboard users.</li>
        <li>Previous is disabled on the first page.</li>
        <li>Next is disabled on the last page.</li>
      </ul>
      <h3>Keyboard Support</h3>
      <ul>
        <li>Tab moves focus to and from the pagination controls.</li>
        <li>Shift + Tab moves focus to the previous pagination control.</li>
        <li>Enter activates the focused pagination control.</li>
        <li>Space activates the focused pagination control.</li>
      </ul>
      <PaginationExamples />
    </PageLayout>
  );
}
