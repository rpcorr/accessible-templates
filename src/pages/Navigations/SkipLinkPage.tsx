import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { SkipLinkExamples } from './examples/SkipLinkExamples';

export function SkipLinkPage() {
  return (
    <PageLayout
      title="Skip Link"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Skip Link</BreadcrumbItem>
        </>
      }
    >
      <p>
        A reusable skip links component that allows keyboard users to bypass
        repeated content, such as site headers and navigation, and move directly
        to important sections of a page.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses native HTML anchor elements for navigation to page sections.
        </li>
        <li>Provides a default link labelled "Skip to main content".</li>
        <li>
          Supports multiple skip links through a configurable list of labels and
          destination URLs.
        </li>
        <li>
          Keeps skip links visually hidden until they receive keyboard focus.
        </li>
        <li>
          Makes the skip links visible when keyboard focus enters the component.
        </li>
        <li>Provides a visible focus indicator for keyboard users.</li>
        <li>Uses descriptive link text to communicate each link's purpose.</li>
        <li>
          Allows the component to be omitted when the supplied links list is
          empty.
        </li>
        <li>
          Requires each link destination to match a unique ID on the page.
        </li>
        <li>
          Supports reduced-motion preferences by avoiding animated transitions
          when reduced motion is requested.
        </li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Tab moves focus to the skip links, revealing them visually.</li>
        <li>Shift + Tab moves focus to the previous focusable element.</li>
        <li>
          Enter activates the focused skip link and navigates to its target.
        </li>
        <li>
          After navigation, keyboard users can continue through the page from
          the destination when the target is configured appropriately.
        </li>
      </ul>

      <SkipLinkExamples />
    </PageLayout>
  );
}
