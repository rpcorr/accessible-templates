import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PopoverExamples } from './examples/PopoverExamples';

export function PopoverPage() {
  return (
    <PageLayout
      title="Popover"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Popover</BreadcrumbItem>
        </>
      }
    >
      <p>
        Accessible non-modal popovers for displaying contextual information,
        actions, and interactive content without trapping keyboard focus.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses the semantic dialog role for interactive popover content.</li>
        <li>
          Associates the trigger with the popover using
          <code> aria-controls</code> and <code>aria-expanded</code>.
        </li>
        <li>Supports keyboard and pointer interaction.</li>
        <li>Supports closing with the Escape key.</li>
        <li>Supports closing when the user interacts outside the popover.</li>
        <li>
          Restores focus to the element that opened the popover when it is
          dismissed.
        </li>
        <li>
          Interactive content can trigger actions and close the popover while
          returning focus to the original trigger.
        </li>
        <li>
          Does not trap keyboard focus, allowing users to move naturally through
          the surrounding page.
        </li>
        <li>Supports top, bottom, left, and right placement.</li>
        <li>
          Adjusts its position to remain within the viewport when space is
          limited.
        </li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Enter activates the popover trigger.</li>
        <li>Space activates the popover trigger.</li>
        <li>Tab moves focus through interactive content within the popover.</li>
        <li>Shift + Tab moves focus backward through interactive content.</li>
        <li>Escape closes the popover.</li>
        <li>
          Focus returns to the element that opened the popover when the popover
          is dismissed.
        </li>
        <li>
          Focus is not trapped inside the popover, allowing users to continue
          navigating the page.
        </li>
      </ul>

      <PopoverExamples />
    </PageLayout>
  );
}
