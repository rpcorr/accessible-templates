import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Link } from 'react-router';

export function OverlaysMenusPage() {
  return (
    <PageLayout
      title="Overlays & Menus"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/overlays-menus">
            Overlays & Menus
          </BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          Accessible components for displaying additional content, presenting
          actions, and managing temporary interface layers.
        </p>

        <h3>Components</h3>

        <ul>
          <li>
            <strong>
              <Link to="/overlays-menus/dropdown">Dropdown</Link>
            </strong>
            <p>A menu component for presenting a list of actions or options.</p>
          </li>

          <li>
            <strong>
              <Link to="/overlays-menus/modal">Modal Dialog</Link>
            </strong>
            <p>
              A dialog that temporarily interrupts the page to present
              information or request user interaction.
            </p>
          </li>

          <li>
            <strong>
              <Link to="/overlays-menus/tooltip">Tooltip</Link>
            </strong>
            <p>
              A component for providing additional contextual information about
              an interface element.
            </p>
          </li>
        </ul>
      </main>
    </PageLayout>
  );
}
