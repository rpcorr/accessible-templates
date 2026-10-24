import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import StatisticExamples from './Statistic/examples/StatisticExamples';

export function StatisticPage() {
  return (
    <PageLayout
      title="Statistic"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Statistic</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible Statistic component for presenting key numbers,
        measurements, and summary information. Statistics can be used
        independently or combined with Card and Chart components to communicate
        meaningful information.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          Each statistic should have a meaningful label that explains what its
          value represents. Optional descriptions can provide additional
          context, such as units, time periods, or the population being
          measured.
        </p>

        <p>
          Use sufficient text contrast and do not rely on colour alone to
          communicate meaning. Statistics are non-interactive by default and
          should not introduce unnecessary keyboard focus stops.
        </p>

        <p>
          Dynamic value changes are not automatically announced by the
          component. When updates need to be communicated to assistive
          technology, use an appropriate status or live-region component.
        </p>

        <h3>Features</h3>

        <ul>
          <li>Displays a descriptive label and value.</li>
          <li>
            Supports numbers, percentages, currency, and formatted values.
          </li>
          <li>Provides an optional description for additional context.</li>
          <li>Supports custom styling through an optional CSS class.</li>
          <li>
            Can be used independently or within a Card or dashboard layout.
          </li>
        </ul>
      </div>

      <h3>Examples</h3>
      <StatisticExamples />
    </PageLayout>
  );
}

export default StatisticPage;
