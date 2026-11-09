import { StackedBarChart } from '..';
import {
  monthlyProfitAndLoss,
  monthlyRegistrations,
  monthlySales,
  quarterlyRevenueByProduct,
  quarterlyRevenueCategories,
  surveyResults,
  surveyResultsByAge,
  websiteVisitsByDevice,
  websiteTrafficSources,
} from '../../../../../data/chartExampleData';

export default function StackedBarChartExamples() {
  return (
    <div className="stack">
      <section className="stack">
        <h4>Basic Stacked Bar Chart</h4>

        <p>
          Display values across categories using a single series. This example
          demonstrates the chart's basic rendering and numerical axis.
        </p>

        <StackedBarChart
          title="Monthly Sales"
          description="Sales totals for the first four months of the year."
          data={monthlySales}
          valueLabel="sales"
          showGridLines
        />
      </section>

      <section className="stack">
        <h4>Stacked Bar Chart with Multiple Datasets</h4>

        <p>
          Compare website visits by traffic source and device type. Each bar
          combines the individual series into a stacked total.
        </p>

        <StackedBarChart
          title="Website Visits by Device"
          description="Website visits by traffic source, broken down by device type."
          data={websiteTrafficSources}
          datasets={websiteVisitsByDevice}
          showGridLines
        />
      </section>

      <section className="stack">
        <h4>Quarterly Revenue by Product</h4>

        <p>
          Compare quarterly revenue contributions from multiple products, with
          each segment representing one product's contribution to the total.
        </p>

        <StackedBarChart
          title="Quarterly Revenue"
          description="Revenue contributions from three products across four quarters."
          data={quarterlyRevenueCategories}
          datasets={quarterlyRevenueByProduct}
          valueLabel="revenue"
          showGridLines
        />
      </section>

      <section className="stack">
        <h4>Customer Satisfaction Survey</h4>

        <p>
          Compare satisfaction response counts across age groups using stacked
          segments for each response category.
        </p>

        <StackedBarChart
          title="Customer Satisfaction by Age Group"
          description="Survey responses grouped by satisfaction level and age group."
          data={surveyResults}
          datasets={surveyResultsByAge}
          showGridLines
        />
      </section>

      <section className="stack">
        <h4>Positive and Negative Values</h4>

        <p>
          Display positive and negative values around a zero baseline to
          illustrate monthly profit and loss.
        </p>

        <StackedBarChart
          title="Monthly Profit and Loss"
          description="Monthly profit and loss values, including negative results."
          data={monthlyProfitAndLoss}
          valueLabel="amount"
          showGridLines
        />
      </section>

      <section className="stack">
        <h4>Zero Values</h4>

        <p>
          Ensure categories with zero values remain visible and clearly labelled
          in the chart and accompanying data table.
        </p>

        <StackedBarChart
          title="Monthly Registrations"
          description="Registration counts, including a month with no registrations."
          data={monthlyRegistrations}
          valueLabel="registrations"
        />
      </section>

      <section className="stack">
        <h4>Chart Without Grid Lines</h4>

        <p>
          Simplify the chart's appearance by hiding horizontal grid lines while
          retaining the axes and category labels.
        </p>

        <StackedBarChart
          title="Monthly Sales Without Grid Lines"
          data={monthlySales}
          valueLabel="sales"
          showGridLines={false}
        />
      </section>

      <section className="stack">
        <h4>Chart Without a Description</h4>

        <p>
          A chart can omit its optional description when its title provides
          sufficient context.
        </p>

        <StackedBarChart
          title="Tasks Completed"
          data={[
            { label: 'Monday', value: 8 },
            { label: 'Tuesday', value: 12 },
            { label: 'Wednesday', value: 10 },
          ]}
        />
      </section>

      <section className="stack">
        <h4>Empty Chart</h4>

        <p>Provide clear feedback when no data is available to visualize.</p>

        <StackedBarChart title="No Available Data" data={[]} />
      </section>
    </div>
  );
}
