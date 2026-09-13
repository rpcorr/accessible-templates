import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Link } from 'react-router';

export function ContentFeedbackPage() {
  return (
    <PageLayout
      title="Content & Feedback"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/content-feedback">
            Content & Feedback
          </BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Accessible components for presenting information, communicating
          status, and providing feedback about user actions or system processes.
        </p>

        <h3>Components</h3>

        <ul>
          <li>
            <strong>
              <Link to="/content-feedback/accordion">Accordion</Link>
            </strong>
            <p>
              An expandable and collapsible section for showing and hiding
              related content.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/content-feedback/alert">Alert</Link>
            </strong>
            <p>
              A component for communicating important messages and feedback to
              users.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/content-feedback/loading-spinner">
                Loading Spinner
              </Link>
            </strong>
            <p>
              Visual indicators that communicate that an operation is in
              progress.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/content-feedback/progress-indicator">
                Progress Indicator
              </Link>
            </strong>
            <p>
              A component for communicating the progress of an operation or
              task.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/content-feedback/status">Status</Link>
            </strong>
            <p>
              A component for communicating the current status of an item or
              process.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/content-feedback/tab">Tab</Link>
            </strong>
            <p>
              A component for organizing related content into selectable
              sections.
            </p>
          </li>
        </ul>
      </main>
    </PageLayout>
  );
}
