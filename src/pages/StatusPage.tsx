import { PageLayout } from '../components/PageLayout/PageLayout';
import { StatusExamples } from '../examples';

export function StatusPage() {
  return (
    <PageLayout title="Status">
      <p>
        An accessible status component for communicating non-urgent updates
        without interrupting the user's current task.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Status component uses the <code>status</code> ARIA role to provide
          a polite live region. Updates are announced by screen readers without
          moving keyboard focus.
        </p>

        <p>
          The live region remains mounted while its content changes, allowing
          assistive technologies to detect and announce dynamic status updates.
        </p>

        <h3>Live Region</h3>

        <p>
          Status messages use <code>role="status"</code>, which provides a
          polite live region. The <code>aria-live="polite"</code> attribute
          reinforces this behavior, while <code>aria-atomic="true"</code>{' '}
          ensures the complete status message is announced when its content
          changes.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Status messages do not require keyboard interaction. They do not
          receive keyboard focus or interrupt the user's current task.
        </p>
      </div>

      <h3>Examples</h3>

      <StatusExamples />
    </PageLayout>
  );
}
