import { PageLayout } from '../components/PageLayout/PageLayout';
import { AccordionExamples } from '../examples';

export function AccordionPage() {
  return (
    <PageLayout title="Accordion">
      <p>
        An accessible accordion component supporting expandable content,
        multiple open sections, disabled items, keyboard interaction, and screen
        reader support.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Accordion component uses native buttons to provide reliable
          keyboard and screen reader support. Each button communicates whether
          its associated panel is expanded or collapsed using{' '}
          <code>aria-expanded</code>.
        </p>

        <p>
          Each accordion button is associated with its content panel using{' '}
          <code>aria-controls</code>, while each panel identifies its
          controlling button using <code>aria-labelledby</code>.
        </p>

        <p>
          Disabled accordion sections remain visible but cannot be activated and
          are skipped when moving between enabled sections with the arrow keys.
        </p>

        <h3>Keyboard Support</h3>

        <ul>
          <li>
            <strong>Tab:</strong> Move between focusable elements and accordion
            triggers.
          </li>
          <li>
            <strong>Shift + Tab:</strong> Move backward through focusable
            elements.
          </li>
          <li>
            <strong>Enter:</strong> Open or close the focused accordion panel.
          </li>
          <li>
            <strong>Space:</strong> Open or close the focused accordion panel.
          </li>
          <li>
            <strong>Arrow Down:</strong> Move focus to the next enabled
            accordion trigger.
          </li>
          <li>
            <strong>Arrow Up:</strong> Move focus to the previous enabled
            accordion trigger.
          </li>
          <li>
            <strong>Home:</strong> Move focus to the first enabled accordion
            trigger.
          </li>
          <li>
            <strong>End:</strong> Move focus to the last enabled accordion
            trigger.
          </li>
        </ul>
      </div>

      <h3>Examples</h3>

      <AccordionExamples />
    </PageLayout>
  );
}
