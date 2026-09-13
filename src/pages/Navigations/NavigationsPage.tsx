import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Link } from 'react-router';

export function NavigationsPage() {
  return (
    <PageLayout
      title="Navigation"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/navigations">Navigations</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Accessible components that help users understand their location, move
          between pages, and navigate interface content.
        </p>

        <h3>Components</h3>

        <ul>
          <li>
            <strong>
              <Link to="/navigations/breadcrumbs">Breadcrumbs</Link>
            </strong>
            <p>
              A navigational trail that communicates the user's location within
              a website or application.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/navigations/navigation">Navigation</Link>
            </strong>
            <p>
              A component for providing links to pages or sections of an
              application.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/navigations/pagination">Pagination</Link>
            </strong>
            <p>A control for navigating between pages of related content.</p>
          </li>
        </ul>
      </main>
    </PageLayout>
  );
}
