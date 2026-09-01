import { PageLayout } from '../components/PageLayout/PageLayout';
import { AlertExamples } from '../examples';

export function AlertPage() {
  return (
    <PageLayout title="Alert">
      <p>
        An accessible alert component for communicating important information,
        feedback, warnings, and errors to users.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Alert component uses appropriate ARIA roles to communicate the
          importance of each message to assistive technologies. Informational
          and success messages use <code>role="status"</code>, while warning and
          error messages use <code>role="alert"</code>.
        </p>

        <p>
          Dismissible alerts include a native button with an accessible name,
          allowing keyboard and screen reader users to dismiss the message.
        </p>

        <p>
          The alert content remains accessible to users of assistive
          technologies and does not rely on colour alone to communicate the
          message type.
        </p>

        <h3>Alert Variants</h3>

        <ul>
          <li>
            <strong>Info:</strong> Communicates general information or updates.
          </li>
          <li>
            <strong>Success:</strong> Confirms that an action or operation was
            completed successfully.
          </li>
          <li>
            <strong>Warning:</strong> Communicates a condition that may require
            the user's attention.
          </li>
          <li>
            <strong>Error:</strong> Communicates a problem or failed operation
            that may require corrective action.
          </li>
        </ul>

        <h3>Keyboard Support</h3>

        <ul>
          <li>
            <strong>Tab:</strong> Move focus to the dismiss button when an alert
            is dismissible.
          </li>
          <li>
            <strong>Shift + Tab:</strong> Move focus backward through focusable
            elements.
          </li>
          <li>
            <strong>Enter:</strong> Dismiss the alert when the dismiss button is
            focused.
          </li>
          <li>
            <strong>Space:</strong> Dismiss the alert when the dismiss button is
            focused.
          </li>
        </ul>
      </div>

      <h3>Examples</h3>

      <AlertExamples />
    </PageLayout>
  );
}
