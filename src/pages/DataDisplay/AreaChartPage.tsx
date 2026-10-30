import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import AreaChartExamples from './Charts/AreaChartExamples';

export function AreaChartPage() {
  return (
    <PageLayout
      title="Area Chart"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Area Chart</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible chart for displaying numerical values and emphasizing
        changes in magnitude over time or across an ordered sequence using
        filled areas. Supports multiple overlapping data series, positive and
        negative values, and optional grid lines. An accessible data table
        provides an alternative way to explore the underlying information.
      </p>

      <div className="stack">
        <h3>Features</h3>

        <ul>
          <li>
            Displays numerical values as a line with a filled area extending to
            the zero baseline.
          </li>
          <li>
            Supports category labels and numerical values for each data point.
          </li>
          <li>
            Supports multiple overlapping data series through the{' '}
            <code>datasets</code> prop.
          </li>
          <li>Displays a legend when multiple data series are provided.</li>
          <li>
            Uses semi-transparent fills to help distinguish overlapping areas.
          </li>
          <li>Supports a required chart title and an optional description.</li>
          <li>
            Supports an optional value label, such as visitors, revenue, or
            percentages.
          </li>
          <li>
            Supports optional grid lines through the <code>showGridLines</code>{' '}
            prop. Grid lines are disabled by default.
          </li>
          <li>
            Handles positive values, negative values, zero values, empty
            datasets, and non-finite numerical values.
          </li>
          <li>
            Creates separate area segments when invalid values interrupt a data
            series.
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
          <li>Provides an accessible name for the chart.</li>
          <li>
            Includes a semantic data table with a caption, column headers,
            category row headers, and numerical values.
          </li>
          <li>
            Makes the underlying data available without requiring users to
            interpret the visual areas, markers, or colours.
          </li>
          <li>
            Provides a legend with descriptive labels when multiple data series
            are displayed.
          </li>
          <li>
            Uses distinct series colours and semi-transparent fills to help
            distinguish overlapping data series.
          </li>
          <li>
            Handles invalid numerical values without drawing misleading
            connections across missing data and indicates unavailable values in
            the data table.
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
          Use an Area Chart when users need to understand how numerical values
          change over time or across an ordered sequence, particularly when
          emphasizing the magnitude of values is important. Common examples
          include website traffic, monthly revenue, conversion rates, and
          performance measurements.
        </p>

        <p>
          Use multiple data series when comparing related trends, such as
          website visits across different years or traffic sources. The areas
          overlap rather than stack, so use clear series labels and ensure the
          legend makes each series easy to identify.
        </p>

        <p>
          Be mindful that overlapping filled areas can obscure underlying
          information. Semi-transparent fills help users distinguish series, but
          avoid displaying too many datasets in a single chart.
        </p>

        <p>
          Include negative values when the data represents measurements that can
          fall below zero, such as profit and loss. The chart uses zero as its
          baseline, allowing positive and negative areas to extend in different
          directions.
        </p>

        <p>
          Enable <code>showGridLines</code> when users would benefit from
          estimating values against the numerical scale. Grid lines are disabled
          by default and can be enabled when a more detailed visual reference is
          appropriate.
        </p>

        <p>
          Provide a descriptive title and, when necessary, a description that
          explains the data and its context. Use meaningful category and series
          labels, and make the underlying data available in an accessible
          format. Do not rely on area colour, transparency, or visual position
          alone to communicate important information.
        </p>

        <h3>Examples</h3>

        <p>
          Explore the examples below to see how the Area Chart handles basic
          trends, multiple overlapping data series, positive and negative
          values, conversion rates, zero values, missing data, optional
          descriptions, and grid lines.
        </p>
      </div>

      <AreaChartExamples />
    </PageLayout>
  );
}
