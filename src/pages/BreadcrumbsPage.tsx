import { PageLayout } from '../components/PageLayout/PageLayout';
import { BreadcrumbsExamples } from '../examples/Breadcrumbs/BreadcrumbsExamples';

export function BreadcrumbsPage() {
  return (
    <PageLayout title="Breadcrumbs">
      <p>
        A reusable breadcrumb navigation component that uses semantic HTML,
        supports keyboard navigation, identifies the current page, and provides
        multiple visual styles.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses a semantic navigation landmark with an accessible label.</li>
        <li>Uses an ordered list to represent the breadcrumb hierarchy.</li>
        <li>Uses native HTML links for previous pages.</li>
        <li>
          Uses <code>aria-current="page"</code> to identify the current page.
        </li>
        <li>
          Uses decorative separators that are not meaningful to screen readers.
        </li>
        <li>The current page is not presented as a link.</li>
        <li>Supports responsive wrapping for smaller screens.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Tab moves focus to and from each breadcrumb link.</li>
        <li>Shift + Tab moves focus to the previous breadcrumb link.</li>
        <li>Enter activates the focused breadcrumb link.</li>
        <li>Space activates the focused breadcrumb link.</li>
        <li>The current page is not focusable because it is not a link.</li>
      </ul>

      <BreadcrumbsExamples />
    </PageLayout>
  );
}
