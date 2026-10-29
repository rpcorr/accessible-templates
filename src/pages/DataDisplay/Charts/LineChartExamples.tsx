import { LineChart } from '../../../components/DataDisplay/Charts/LineChart';

const monthlyVisitors = [
  { label: 'January', value: 120 },
  { label: 'February', value: 150 },
  { label: 'March', value: 135 },
  { label: 'April', value: 180 },
  { label: 'May', value: 210 },
  { label: 'June', value: 195 },
];

const quarterlyRevenue = [
  { label: 'Q1', value: 120 },
  { label: 'Q2', value: 180 },
  { label: 'Q3', value: 150 },
  { label: 'Q4', value: 240 },
];

const websiteVisitsByYear = [
  { label: '2024', values: [520, 390, 240, 150] },
  { label: '2025', values: [650, 480, 290, 180] },
  { label: '2026', values: [820, 540, 360, 210] },
];

const websiteVisitCategories = [
  { label: 'January', value: 0 },
  { label: 'February', value: 0 },
  { label: 'March', value: 0 },
  { label: 'April', value: 0 },
];

const profitAndLoss = [
  { label: 'January', value: 20 },
  { label: 'February', value: -10 },
  { label: 'March', value: 15 },
  { label: 'April', value: -5 },
  { label: 'May', value: 30 },
  { label: 'June', value: 25 },
];

const conversionRates = [
  { label: 'January', value: 2.4 },
  { label: 'February', value: 2.8 },
  { label: 'March', value: 2.6 },
  { label: 'April', value: 3.1 },
  { label: 'May', value: 3.5 },
  { label: 'June', value: 3.8 },
];

const monthlyRegistrations = [
  { label: 'January', value: 12 },
  { label: 'February', value: 0 },
  { label: 'March', value: 18 },
  { label: 'April', value: 7 },
];

export default function LineChartExamples() {
  return (
    <div className="stack">
      <section className="stack">
        <h3>Basic Line Chart</h3>

        <p>
          Show how a numerical value changes over time using connected data
          points. Line charts are useful for identifying trends and patterns.
        </p>

        <LineChart
          title="Monthly Website Visitors"
          description="Website visitor totals for the first six months of the year."
          data={monthlyVisitors}
          valueLabel="visitors"
        />
      </section>

      <section className="stack">
        <h3>Line Chart with Grid Lines</h3>

        <p>
          Use horizontal grid lines to help users estimate values and compare
          changes between data points.
        </p>

        <LineChart
          title="Quarterly Revenue"
          description="Revenue totals across four quarters."
          data={quarterlyRevenue}
          valueLabel="revenue"
          showGridLines
        />
      </section>

      <section className="stack">
        <h3>Multiple Line Chart</h3>

        <p>
          Compare several data series on the same chart. Each series has a
          legend entry and a distinct line style to help users distinguish the
          data.
        </p>

        <LineChart
          title="Website Visits by Traffic Source"
          description="Compare website visits from different traffic sources over four months."
          data={websiteVisitCategories}
          datasets={websiteVisitsByYear}
          showGridLines
        />
      </section>

      <section className="stack">
        <h3>Profit and Loss</h3>

        <p>
          Display positive and negative values to show changes above and below
          zero.
        </p>

        <LineChart
          title="Monthly Profit and Loss"
          description="Monthly financial results, including profitable and loss-making periods."
          data={profitAndLoss}
          valueLabel="dollars"
          showGridLines
        />
      </section>

      <section className="stack">
        <h3>Conversion Rates</h3>

        <p>
          Track percentage changes over time to identify improvements or
          declines in performance.
        </p>

        <LineChart
          title="Monthly Conversion Rate"
          description="Percentage of website visitors who completed a desired action."
          data={conversionRates}
          valueLabel="%"
          showGridLines
        />
      </section>

      <section className="stack">
        <h3>Zero Values</h3>

        <p>
          Ensure data points with zero values remain represented in the chart
          and its accompanying data table.
        </p>

        <LineChart
          title="Monthly Registrations"
          description="Registration totals, including a month with no registrations."
          data={monthlyRegistrations}
          valueLabel="registrations"
        />
      </section>

      <section className="stack">
        <h3>Chart Without a Description</h3>

        <p>
          A chart can omit its optional description when its title provides
          sufficient context.
        </p>

        <LineChart
          title="Tasks Completed"
          data={[
            { label: 'Monday', value: 8 },
            { label: 'Tuesday', value: 12 },
            { label: 'Wednesday', value: 10 },
            { label: 'Thursday', value: 9 },
            { label: 'Friday', value: 14 },
          ]}
        />
      </section>

      <section className="stack">
        <h3>Chart with Missing Data</h3>

        <p>
          Handle invalid numerical values without drawing misleading points. The
          accompanying data table indicates where a value is unavailable.
        </p>

        <LineChart
          title="Monthly Engagement"
          description="Engagement measurements with one unavailable data point."
          data={[
            { label: 'January', value: 45 },
            { label: 'February', value: 52 },
            { label: 'March', value: Number.NaN },
            { label: 'April', value: 61 },
            { label: 'May', value: 68 },
          ]}
          valueLabel="points"
        />
      </section>
    </div>
  );
}
