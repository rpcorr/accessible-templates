import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { TabsExamples } from './examples/TabExamples';

export function TabsPage() {
  return (
    <PageLayout
      title="Tab"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Tab</BreadcrumbItem>
        </>
      }
    >
      <p>
        Accessible tabs supporting horizontal and vertical orientations,
        keyboard navigation, disabled tabs, focus management, and responsive
        horizontal scrolling on smaller screens.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>Uses the semantic tab, tablist, and tabpanel roles.</li>
        <li>
          Associates each tab with its corresponding panel using
          <code>aria-controls</code> and <code>aria-labelledby</code>.
        </li>
        <li>
          Uses <code>aria-selected</code> to identify the active tab.
        </li>
        <li>Supports keyboard navigation between enabled tabs.</li>
        <li>Supports both horizontal and vertical tab orientations.</li>
        <li>Disabled tabs are excluded from keyboard navigation.</li>
        <li>Tab panels can receive focus for screen reader navigation.</li>
        <li>Focus remains visible when navigating with the keyboard.</li>
        <li>
          Focused tabs are brought into view when navigating horizontally with
          the keyboard.
        </li>
      </ul>

      <h3>Responsive Behaviour</h3>

      <ul>
        <li>
          Horizontal tabs wrap onto multiple rows on larger screens when
          necessary.
        </li>
        <li>
          On smaller screens, horizontal tabs remain on a single line and can be
          scrolled horizontally to reach additional tabs.
        </li>
        <li>
          A right-edge gradient and chevron indicate when additional tabs are
          available beyond the visible area.
        </li>
        <li>
          The scroll indicator disappears when all tabs are visible or the end
          of the tab list is reached.
        </li>
        <li>Vertical tab orientation retains its existing layout.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>
          <strong>Left / Right Arrow:</strong> Move between tabs in horizontal
          orientation.
        </li>
        <li>
          <strong>Up / Down Arrow:</strong> Move between tabs in vertical
          orientation.
        </li>
        <li>
          <strong>Home:</strong> Move to the first enabled tab.
        </li>
        <li>
          <strong>End:</strong> Move to the last enabled tab.
        </li>
        <li>
          <strong>Tab:</strong> Move from the active tab to its tab panel.
        </li>
        <li>
          <strong>Shift + Tab:</strong> Return from the tab panel to the active
          tab.
        </li>
      </ul>

      <h3>Examples</h3>

      <TabsExamples />
    </PageLayout>
  );
}
