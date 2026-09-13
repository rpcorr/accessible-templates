import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Link } from 'react-router';

export function ButtonsActionsPage() {
  return (
    <PageLayout
      title="Buttons & Actions"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/buttons-actions">
            Buttons & Actions
          </BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Accessible components for triggering actions, submitting forms, and
          interacting with interface controls.
        </p>

        <h3>Components</h3>

        <ul>
          <li>
            <strong>
              <Link to="/buttons-actions/button">Button</Link>
            </strong>
            <p>
              An accessible button for triggering an action or submitting a
              form.
            </p>
          </li>
        </ul>
      </main>
    </PageLayout>
  );
}
