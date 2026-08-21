import { PageLayout } from '../components';
import { TooltipExamples } from '../examples/Tooltip/TooltipExamples';

export function TooltipPage() {
  return (
    <PageLayout title="Tooltip">
      <p>
        Accessible tooltips with keyboard and mouse support, configurable
        positioning, hover delay, Escape key dismissal, and responsive
        viewport-aware positioning.
      </p>

      <h3>Accessibility</h3>

      <ul>
        <li>
          Uses the semantic <code>role="tooltip"</code>.
        </li>
        <li>
          Associates the tooltip with its trigger using{' '}
          <code>aria-describedby</code>.
        </li>
        <li>Displays the tooltip when the trigger receives keyboard focus.</li>
        <li>
          Supports screen reader users without adding the tooltip to the tab
          order.
        </li>
        <li>Supports long tooltip content without overflowing the viewport.</li>
        <li>
          Automatically adjusts tooltip positioning when space is limited.
        </li>
        <li>Supports browser zoom up to 400%.</li>
      </ul>

      <h3>Keyboard Support</h3>

      <ul>
        <li>Tab moves focus to the tooltip trigger.</li>
        <li>Shift + Tab moves focus to the previous focusable element.</li>
        <li>Escape dismisses the visible tooltip.</li>
        <li>Focus remains on the trigger when the tooltip is dismissed.</li>
        <li>
          The tooltip itself is not included in the keyboard navigation order.
        </li>
      </ul>

      <TooltipExamples />
    </PageLayout>
  );
}
