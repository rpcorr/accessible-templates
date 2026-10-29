import { DonutChart } from '../../../components/DataDisplay/Charts/DonutChart';

export function DonutChartExamples() {
  const browserData = [
    { label: 'Chrome', value: 62 },
    { label: 'Safari', value: 20 },
    { label: 'Firefox', value: 8 },
    { label: 'Edge', value: 7 },
    { label: 'Other', value: 3 },
  ];

  const budgetData = [
    { label: 'Housing', value: 1800 },
    { label: 'Food', value: 650 },
    { label: 'Transportation', value: 350 },
    { label: 'Utilities', value: 200 },
    { label: 'Entertainment', value: 150 },
  ];

  const zeroValueData = [
    { label: 'Category A', value: 0 },
    { label: 'Category B', value: 0 },
    { label: 'Category C', value: 0 },
  ];

  return (
    <div>
      <section>
        <h4>Standard Donut Chart</h4>
        <p>
          A donut chart displays each category as a proportion of the total,
          with a central space that distinguishes it from a pie chart.
        </p>

        <DonutChart
          title="Browser Usage"
          description="Example distribution of browser usage."
          data={browserData}
        />
      </section>

      <section>
        <h4>Exploded Donut Chart</h4>
        <p>
          The exploded variant separates slices slightly to help distinguish the
          categories.
        </p>

        <DonutChart
          title="Monthly Budget"
          description="Example monthly expenses by category."
          data={budgetData}
          exploded
        />
      </section>

      <section>
        <h4>Zero-Value Data</h4>
        <p>
          When all values are zero, the chart displays an empty state rather
          than presenting misleading proportions.
        </p>

        <DonutChart
          title="Category Distribution"
          description="An example where no category has a positive value."
          data={zeroValueData}
        />
      </section>

      <section>
        <h4>Empty Dataset</h4>
        <p>
          An empty dataset demonstrates how the component handles the absence of
          category data.
        </p>

        <DonutChart
          title="No Data Available"
          description="There are currently no categories to display."
          data={[]}
        />
      </section>
    </div>
  );
}

export default DonutChartExamples;
