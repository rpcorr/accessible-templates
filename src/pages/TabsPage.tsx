import { PageLayout } from '../components/PageLayout/PageLayout';
import { TabsExamples } from '../examples/Tab/TabExamples';

export function TabsPage() {
  return (
    <PageLayout title="Tab">
      <p>
        Accessible tabs supporting horizontal and vertical orientations,
        keyboard navigation, disabled tabs, focus management, and responsive
        behaviour.
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
