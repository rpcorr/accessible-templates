import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import LineChartExamples from './Charts/LineChartExamples';

export function LineChartPage() {
  return (
    <PageLayout
      title="Line Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Line Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for displaying numerical values and identifying
        trends over time or across an ordered sequence. Supports multiple data
        series, positive and negative values, and optional grid lines. An
        accessible data table provides an alternative way to explore the
        underlying information.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Displays numerical values as connected points on a line chart.
          </li>
          <li>
            Supports category labels and numerical values for each data point.
          </li>
          <li>
            Supports multiple data series through the <code>datasets</code>{' '}
            prop.
          </li>
          <li>Displays a legend when multiple data series are provided.</li>
          <li>Supports a required chart title and an optional description.</li>
          <li>
            Supports an optional value label, such as visitors, revenue, or
            percentages.
          </li>
          <li>
            Supports optional grid lines through the <code>showGridLines</code>{' '}
            prop.
          </li>
          <li>
            Handles positive values, negative values, zero values, empty
            datasets, and non-finite numerical values.
          </li>
          <li>
            Supports custom CSS classes through the <code>className</code> prop.
          </li>
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
            Provides an accessible name for the chart and identifies the
            accompanying data table as an alternative way to access the data.
          </li>
          <li>
            Includes a semantic data table with a caption, column headers,
            category row headers, and numerical values.
          </li>
          <li>
            Makes the underlying data available without requiring users to
            interpret the visual lines, markers, or colours.
          </li>
          <li>
            Uses distinct line styles and markers to help distinguish multiple
            data series.
          </li>
          <li>
            Handles invalid numerical values without drawing misleading data
            points and indicates unavailable values in the data table.
          </li>
          <li>
            Provides an empty-state message when no valid numerical data is
            available.
          </li>
          <li>
            Supports responsive layouts and usability at increased zoom levels.
          </li>
        </ul>

        <h3>Usage Guidelines</h3>

        <p>
          Use a Line Chart when users need to understand how numerical values
          change over time or across an ordered sequence. Common examples
          include website traffic, monthly revenue, conversion rates, and
          performance measurements.
        </p>

        <p>
          Use multiple data series when comparing related trends, such as
          website visits across different years or traffic sources. Provide
          clear series labels and ensure the legend makes each series easy to
          identify.
        </p>

        <p>
          Include negative values when the data represents measurements that can
          fall below zero, such as profit and loss. Ensure the chart's numerical
          scale represents the values accurately.
        </p>

        <p>
          Enable <code>showGridLines</code> when users would benefit from
          estimating values against the numerical scale. Grid lines are optional
          and can be disabled when a simpler presentation is more appropriate.
        </p>

        <p>
          Provide a descriptive title and, when necessary, a description that
          explains the data and its context. Use meaningful category and series
          labels, and make the underlying data available in an accessible
          format. Do not rely on line colour or visual position alone to
          communicate important information.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Line Chart handles basic
          trends, multiple data series, positive and negative values, conversion
          rates, zero values, missing data, optional descriptions, and grid
          lines.
        </p>
      </div>

      <LineChartExamples />
    </PageLayout>
  );
}
