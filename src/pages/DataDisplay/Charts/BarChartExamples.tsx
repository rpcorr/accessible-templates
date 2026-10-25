import { BarChart } from '../../../components/DataDisplay/Charts/BarChart/BarChart';

const monthlySales = [
  { label: 'January', value: 25 },
  { label: 'February', value: 40 },
  { label: 'March', value: 65 },
  { label: 'April', value: 50 },
];

const websiteVisits = [
  { label: 'Organic Search', value: 820 },
  { label: 'Direct', value: 540 },
  { label: 'Social Media', value: 360 },
  { label: 'Referral', value: 210 },
];

const surveyResults = [
  { label: 'Very satisfied', value: 42 },
  { label: 'Satisfied', value: 31 },
  { label: 'Neutral', value: 18 },
  { label: 'Dissatisfied', value: 9 },
];

const quarterlyRevenue = [
  { label: 'Q1', value: 120 },
  { label: 'Q2', value: 180 },
  { label: 'Q3', value: 150 },
  { label: 'Q4', value: 240 },
];

export default function BarChartExamples() {
  return (
    <div className="stack">
      <section className="stack">
        <h3>Basic Bar Chart</h3>

        <p>
          Compare values across categories using vertical bars and numerical
          labels.
        </p>

        <BarChart
          title="Monthly Sales"
          description="Sales totals for the first four months of the year."
          data={monthlySales}
          valueLabel="sales"
        />
      </section>

      <section className="stack">
        <h3>Bar Chart with Grid Lines</h3>
        <p>
          Display horizontal grid lines and a numerical axis to help users
          estimate and compare values across categories.
        </p>
        <BarChart
          title="Quarterly Revenue"
          description="Revenue totals across four quarters."
          data={quarterlyRevenue}
          valueLabel="revenue"
          showGridLines
        />
      </section>

      <section className="stack">
        <h3>Website Visits</h3>

        <p>
          Display larger numerical values and compare different traffic sources.
        </p>

        <BarChart
          title="Website Visits by Source"
          description="Number of visits attributed to each traffic source."
          data={websiteVisits}
          valueLabel="visits"
        />
      </section>

      <section className="stack">
        <h3>Survey Results</h3>

        <p>Compare response counts across satisfaction categories.</p>

        <BarChart
          title="Customer Satisfaction"
          description="Number of survey responses by satisfaction level."
          data={surveyResults}
          valueLabel="responses"
        />
      </section>

      <section className="stack">
        <h3>Zero Values</h3>

        <p>
          Ensure categories with zero values remain visible and clearly
          labelled.
        </p>

        <BarChart
          title="Monthly Registrations"
          description="Registration counts, including a month with no registrations."
          data={[
            { label: 'January', value: 12 },
            { label: 'February', value: 0 },
            { label: 'March', value: 18 },
            { label: 'April', value: 7 },
          ]}
          valueLabel="registrations"
        />
      </section>

      <section className="stack">
        <h3>Chart Without a Description</h3>

        <p>
          A chart can omit its optional description when its title provides
          sufficient context.
        </p>

        <BarChart
          title="Tasks Completed"
          data={[
            { label: 'Monday', value: 8 },
            { label: 'Tuesday', value: 12 },
            { label: 'Wednesday', value: 10 },
          ]}
        />
      </section>
    </div>
  );
}
