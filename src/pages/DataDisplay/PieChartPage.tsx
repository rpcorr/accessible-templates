import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import PieChartExamples from './Charts/PieChartExamples';

export function PieChartPage() {
  return (
    <PageLayout
      title="Pie Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Pie Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for visualizing how individual categories contribute
        to a whole. Displays category values and percentages through
        proportional pie slices and a legend. An accessible data table provides
        an alternative way to explore the underlying information.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Displays numerical values as proportional slices of a pie chart.
          </li>
          <li>
            Displays category labels, numerical values, and percentages in a
            legend.
          </li>
          <li>Supports a required chart title and an optional description.</li>
          <li>
            Supports a custom value label for the data table through the{' '}
            <code>valueLabel</code> prop.
          </li>
          <li>
            Supports an exploded pie chart presentation through the{' '}
            <code>exploded</code> prop, which separates slices slightly to help
            distinguish categories.
          </li>
          <li>
            Supports custom CSS classes through the <code>className</code> prop.
          </li>
          <li>Handles empty datasets and zero values.</li>
          <li>Treats negative and non-finite values as zero.</li>
          <li>
            Adapts to different viewport sizes with a responsive chart and
            legend layout.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>
            Uses semantic <code>figure</code> and <code>figcaption</code>{' '}
            elements to identify and describe the chart.
          </li>
          <li>
            Provides an accessible label for the pie graphic, including category
            values and percentages when positive values are present.
          </li>
          <li>
            Includes a visually hidden semantic data table with a caption,
            column headers, category row headers, numerical values, and
            percentages.
          </li>
          <li>
            Makes the underlying data available without requiring users to
            interpret the visual slices.
          </li>
          <li>
            Displays category labels, numerical values, and percentages so
            information is not communicated through slice colour alone.
          </li>
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
          Use a Pie Chart to show how categories contribute to a meaningful
          whole, such as website traffic sources, budget allocation, or survey
          response distributions. The values should represent parts of the same
          whole.
        </p>

        <p>
          Set the <code>exploded</code> prop to separate the slices slightly
          when additional visual distinction between categories is helpful. Keep
          the separation subtle so the chart still communicates that the
          categories contribute to one whole.
        </p>

        <p>
          Keep the number of categories manageable so users can distinguish the
          slices and understand the proportions. When there are many categories
          or the values are difficult to compare, consider using a Bar Chart
          instead.
        </p>

        <p>
          Provide a descriptive title and, when necessary, a description that
          explains the data and its context. Ensure category names and values
          are meaningful, and do not rely on slice colours alone to communicate
          information.
        </p>

        <p>
          Make the underlying data available in an accessible format through the
          legend and semantic data table. Avoid using a pie chart when precise
          comparisons between similar values are important.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Pie Chart handles different
          datasets, category proportions, optional descriptions, custom value
          labels, exploded slices, single-category data, zero values, and empty
          datasets.
        </p>
      </div>

      <PieChartExamples />
    </PageLayout>
  );
}
