import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import BarChartExamples from './Charts/BarChartExamples';

export function BarChartPage() {
  return (
    <PageLayout
      title="Bar Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Bar Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for comparing numerical values across categories.
        Displays proportional vertical bars with category labels and numerical
        values, alongside an accessible data table that provides an alternative
        way to explore the underlying information. Optional horizontal grid
        lines and a numerical axis help users compare values more precisely.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>Displays numerical values as proportional vertical bars.</li>
          <li>Displays category labels and numerical values.</li>
          <li>Supports a required chart title and an optional description.</li>
          <li>
            Supports an optional value label, such as sales, visits, or
            responses.
          </li>
          <li>
            Supports optional horizontal grid lines and a numerical axis through
            the <code>showGridLines</code> prop.
          </li>
          <li>
            Supports custom CSS classes through the <code>className</code> prop.
          </li>
          <li>Handles empty datasets and zero values.</li>
          <li>
            Adapts to different viewport sizes and supports horizontal scrolling
            when additional space is needed.
          </li>
        </ul>

        <h3>Accessibility</h3>

        <ul>
          <li>
            Uses semantic <code>figure</code> and <code>figcaption</code>{' '}
            elements to identify and describe the chart.
          </li>
          <li>
            Provides a chart title and an optional description for additional
            context.
          </li>
          <li>
            Includes a visually hidden semantic data table with a caption,
            column headers, category row headers, and numerical values.
          </li>
          <li>
            Makes the underlying data available without requiring users to
            interpret the visual bars.
          </li>
          <li>
            Displays category labels and numerical values so information is not
            communicated through bar colour alone.
          </li>
          <li>
            Treats the grid lines and numerical axis as supplementary visual
            aids, while preserving the accessible data table as an alternative
            way to access the chart information.
          </li>
          <li>
            Supports responsive layouts and usability at increased zoom levels.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use a Bar Chart when users need to compare numerical values across
          distinct categories, such as monthly sales, website visits, or survey
          results. Use a consistent scale and provide clear category labels so
          comparisons are meaningful.
        </p>

        <p>
          Enable <code>showGridLines</code> when users would benefit from
          estimating values against a numerical scale. Grid lines are optional
          and are disabled by default to keep simpler charts visually
          uncluttered.
        </p>

        <p>
          Provide a descriptive title and, when necessary, a description that
          explains the data and its context. Keep labels concise where possible,
          and ensure the underlying data remains available in an accessible
          format. Do not rely on visual bars, grid lines, or colour alone to
          communicate information.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Bar Chart handles different
          datasets, optional descriptions, value labels, zero values, optional
          grid lines, and responsive layouts.
        </p>
      </div>

      <BarChartExamples />
    </PageLayout>
  );
}
