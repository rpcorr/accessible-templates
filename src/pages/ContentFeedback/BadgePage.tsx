import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import BadgeExamples from './examples/BadgeExamples';

export function BadgePage() {
  return (
    <PageLayout
      title="Badge"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Badge</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible Badge component for displaying compact labels that
        identify categories, statuses, and other contextual information. Badges
        support multiple visual variants and sizes.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          Badges are non-interactive labels and do not receive keyboard focus by
          default. Use meaningful text so their purpose is understandable
          without relying on colour alone.
        </p>

        <p>
          Ensure badge text and background colour combinations provide
          sufficient contrast to meet WCAG 2.2 AA requirements.
        </p>

        <p>
          Badges do not automatically use live-region semantics. When dynamic
          updates need to be announced to assistive technology, use an
          appropriate status or alert component.
        </p>

        <h3>Badge Variants</h3>

        <ul>
          <li>
            <strong>Default:</strong> Displays general-purpose labels and
            categories.
          </li>
          <li>
            <strong>Success:</strong> Identifies completed tasks or successful
            outcomes.
          </li>
          <li>
            <strong>Warning:</strong> Highlights information that may require
            attention.
          </li>
          <li>
            <strong>Error:</strong> Identifies unsuccessful outcomes or
            problems.
          </li>
          <li>
            <strong>Info:</strong> Displays informational labels and updates.
          </li>
          <li>
            <strong>Neutral:</strong> Displays secondary or inactive
            information.
          </li>
        </ul>

        <h3>Sizes</h3>

        <ul>
          <li>
            <strong>Small:</strong> Suitable for compact labels in cards,
            tables, and lists.
          </li>
          <li>
            <strong>Medium:</strong> Suitable for general-purpose labels.
          </li>
        </ul>
      </div>

      <h3>Examples</h3>

      <BadgeExamples />
    </PageLayout>
  );
}

export default BadgePage;
