import { StackedBarChart } from '../../../components/DataDisplay/Charts/StackedBarChart';

const monthlySales = [
  { label: 'January', value: 25 },
  { label: 'February', value: 40 },
  { label: 'March', value: 65 },
  { label: 'April', value: 50 },
];

const websiteVisitCategories = [
  { label: 'Organic Search', value: 0 },
  { label: 'Direct', value: 0 },
  { label: 'Social Media', value: 0 },
  { label: 'Referral', value: 0 },
];

const websiteVisitsByDevice = [
  { label: 'Desktop', values: [520, 390, 240, 150] },
  { label: 'Mobile', values: [650, 480, 290, 180] },
  { label: 'Tablet', values: [120, 90, 60, 35] },
];

const quarterlyRevenueCategories = [
  { label: 'Q1', value: 0 },
  { label: 'Q2', value: 0 },
  { label: 'Q3', value: 0 },
  { label: 'Q4', value: 0 },
];

const quarterlyRevenueByProduct = [
  { label: 'Product A', values: [120, 180, 150, 240] },
  { label: 'Product B', values: [80, 110, 130, 160] },
  { label: 'Product C', values: [40, 60, 50, 90] },
];

const surveyCategories = [
  { label: 'Very satisfied', value: 0 },
  { label: 'Satisfied', value: 0 },
  { label: 'Neutral', value: 0 },
  { label: 'Dissatisfied', value: 0 },
];

const surveyResultsByAge = [
  { label: '18–34', values: [42, 31, 18, 9] },
  { label: '35–54', values: [35, 38, 20, 12] },
  { label: '55+', values: [28, 34, 24, 14] },
];

const monthlyProfitLoss = [
  { label: 'January', value: 30 },
  { label: 'February', value: -10 },
  { label: 'March', value: 45 },
  { label: 'April', value: -15 },
];

const monthlyRegistrations = [
  { label: 'January', value: 12 },
  { label: 'February', value: 0 },
  { label: 'March', value: 18 },
  { label: 'April', value: 7 },
];

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
          data={websiteVisitCategories}
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
          data={surveyCategories}
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
          data={monthlyProfitLoss}
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
