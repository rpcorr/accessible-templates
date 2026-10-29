import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import StackedBarChartExamples from './Charts/StackedBarChartExamples';

export function StackedBarChartPage() {
  return (
    <PageLayout
      title="Stacked Bar Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Stacked Bar Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for comparing numerical values across categories
        using stacked bar segments. Supports single-series and multiple-dataset
        charts, including positive and negative values. A visually hidden
        semantic data table provides an alternative way for screen-reader users
        to access the underlying information.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Displays numerical values as proportional stacked vertical bars.
          </li>
          <li>
            Supports multiple datasets, with each dataset represented by a
            separate segment in each category.
          </li>
          <li>
            Displays category labels and numerical axis values, with individual
            segment values available in SVG title elements.
          </li>
          <li>Supports a required chart title and an optional description.</li>
          <li>Supports an optional value label for single-series charts.</li>
          <li>
            Supports optional horizontal grid lines through the{' '}
            <code>showGridLines</code> prop.
          </li>
          <li>
            Displays a colour-coded legend when multiple datasets are provided.
          </li>
          <li>Supports positive and negative values around a zero baseline.</li>
          <li>
            Includes a visually hidden data table with category values and
            totals for multiple datasets.
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
            Provides an SVG title and associates the chart with its title and
            optional description.
          </li>
          <li>
            Includes a visually hidden semantic data table with a caption,
            column headers, category row headers, numerical values, and totals
            for multiple datasets.
          </li>
          <li>
            Keeps the data table available to screen readers without displaying
            it visually, allowing users to explore the underlying values using
            their assistive technology.
          </li>
          <li>
            Provides a legend to identify individual datasets in multi-series
            charts, with colours corresponding to the stacked segments.
          </li>
          <li>
            Includes individual segment values in SVG title elements to provide
            additional context when inspecting the chart.
          </li>
          <li>
            Provides a status message when no valid numerical data is available.
          </li>
          <li>
            Does not rely on colour alone to communicate the underlying data;
            category labels, series labels, and the data table provide
            additional context.
          </li>
          <li>
            Supports responsive layouts and horizontal scrolling at narrower
            viewport widths.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use a Stacked Bar Chart when users need to compare totals across
          categories while also understanding how individual series contribute
          to those totals. Examples include website visits by device type,
          revenue by product, or survey responses by demographic group.
        </p>

        <p>
          Use multiple datasets when each category contains several related
          values. Keep series labels clear and consistent, and use the legend to
          help users distinguish between segments. Ensure each dataset's values
          correspond to the category labels in the same order.
        </p>

        <p>
          Stacked bars work best when users need to compare overall totals and
          component contributions. If precise comparisons between individual
          series are the main goal, consider a grouped bar chart instead,
          because segments that do not share a common baseline can be harder to
          compare.
        </p>

        <p>
          Enable <code>showGridLines</code> when users would benefit from
          estimating values against the numerical scale. Provide a descriptive
          title and, when necessary, a description that explains the data and
          its context. Use meaningful series labels and keep category labels
          concise where possible.
        </p>

        <p>
          Include negative values only when they are meaningful for the data,
          such as profit and loss. Review how positive and negative segments
          appear around the zero baseline, and verify that the data table
          communicates the underlying values clearly.
        </p>

        <p>
          Test the chart with keyboard navigation, a screen reader such as NVDA,
          and browser zoom. Confirm that the chart title, description, legend,
          empty-state message, and underlying data are presented appropriately.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Stacked Bar Chart handles
          single-series data, multiple datasets, quarterly revenue, survey
          results, positive and negative values, zero values, optional grid
          lines, missing descriptions, and empty data.
        </p>
      </div>

      <StackedBarChartExamples />
    </PageLayout>
  );
}

export default StackedBarChartPage;
