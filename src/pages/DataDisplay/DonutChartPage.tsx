import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import DonutChartExamples from './Charts/DonutChartExamples';

export function DonutChartPage() {
  return (
    <PageLayout
      title="Donut Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Donut Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for visualizing how individual categories contribute
        to a whole. Displays category values and percentages through
        proportional ring-shaped segments, with a hollow centre that
        distinguishes it from a pie chart. A visible legend provides category
        labels, numerical values, and percentages.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Displays numerical values as proportional segments of a donut chart.
          </li>
          <li>
            Displays category labels, numerical values, and percentages in a
            visible legend.
          </li>
          <li>Supports a required chart title and an optional description.</li>
          <li>
            Supports an exploded donut chart presentation through the{' '}
            <code>exploded</code> prop, which separates segments slightly to
            help distinguish categories.
          </li>
          <li>
            Supports custom CSS classes through the <code>className</code> prop.
          </li>
          <li>
            Handles empty datasets, zero values, negative values, and non-finite
            values.
          </li>
          <li>
            Normalizes values to reduce the risk of numerical overflow when
            values are extremely large.
          </li>
          <li>
            Adapts to different viewport sizes with a responsive chart and
            legend layout.
          </li>
          <li>
            Displays the legend in two columns at viewport widths of 425px and
            smaller to reduce vertical space.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>
            Uses semantic <code>figure</code> and <code>figcaption</code>{' '}
            elements to group the chart and its caption.
          </li>
          <li>
            Provides an accessible name for the SVG graphic using{' '}
            <code>role="img"</code> and <code>aria-label</code>.
          </li>
          <li>
            Directs screen-reader users to the legend when positive values are
            present, without repeating all category data in the graphic's
            accessible name.
          </li>
          <li>
            Uses a semantic list with an accessible name for the category
            legend.
          </li>
          <li>
            Provides category labels, numerical values, and percentages in text
            so information is not communicated through colour alone.
          </li>
          <li>Hides decorative colour swatches from assistive technology.</li>
          <li>
            Provides an accessible message when there are no positive values to
            display.
          </li>
          <li>
            Supports responsive layouts and usability at increased zoom levels.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use a Donut Chart to show how categories contribute to a meaningful
          whole, such as website traffic sources, budget allocation, or survey
          response distributions. The values should represent parts of the same
          whole.
        </p>

        <p>
          Set the <code>exploded</code> prop to separate the segments slightly
          when additional visual distinction between categories is helpful. Keep
          the separation subtle so the chart still communicates that the
          categories contribute to one whole.
        </p>

        <p>
          Keep the number of categories manageable so users can distinguish the
          segments and understand the proportions. When there are many
          categories or the values are difficult to compare, consider using a
          Bar Chart instead.
        </p>

        <p>
          Provide a descriptive title and, when necessary, a description that
          explains the data and its context. Ensure category names and values
          are meaningful, and do not rely on segment colours alone to
          communicate information.
        </p>

        <p>
          Keep the legend visible so users can access each category's label,
          value, and percentage. The SVG's accessible label helps screen-reader
          users discover the legend without unnecessarily repeating its
          contents. Avoid using a donut chart when precise comparisons between
          similar values are important.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Donut Chart handles
          different datasets, category proportions, optional descriptions,
          exploded segments, zero values, invalid values, and empty datasets.
        </p>
      </div>

      <DonutChartExamples />
    </PageLayout>
  );
}

export default DonutChartPage;
