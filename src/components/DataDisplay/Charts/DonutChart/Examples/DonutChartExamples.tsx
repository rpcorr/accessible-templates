import { DonutChart } from '..';
import {
  browserUsage,
  monthlyBudgetBreakdown,
  supportRequestsByChannel,
} from '../../../../../data/chartExampleData';

export function DonutChartExamples() {
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
          data={browserUsage}
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
          data={monthlyBudgetBreakdown}
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
          data={supportRequestsByChannel}
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
