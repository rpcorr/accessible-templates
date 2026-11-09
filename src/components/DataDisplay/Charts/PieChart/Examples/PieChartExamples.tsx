import { PieChart } from '..';
import {
  monthlyBudgetBreakdown,
  deviceUsage,
  projectStatus,
  projectHealthStatus,
  newsletterSources,
  surveyResults,
  singleCategoryData,
  supportRequestsByChannel,
} from '../../../../../data/chartExampleData';

export default function PieChartExamples() {
  return (
    <div className="stack">
      <section className="stack">
        <h3>Basic Pie Chart</h3>

        <p>
          Show how individual categories contribute to a whole using
          proportional slices, category labels, and percentages.
        </p>

        <PieChart
          title="Device Usage"
          description="Distribution of users by device type."
          data={deviceUsage}
          valueLabel="users"
        />
      </section>

      <section className="stack">
        <h3>Budget Allocation</h3>

        <p>
          Visualize how a budget is distributed across different spending
          categories, with numerical values and percentages.
        </p>

        <PieChart
          title="Monthly Household Budget"
          description="Monthly spending by household expense category."
          data={monthlyBudgetBreakdown}
          valueLabel="amount"
        />
      </section>

      <section className="stack">
        <h3>Exploded Pie Chart</h3>

        <p>
          Separate the slices slightly to help distinguish individual categories
          while retaining their proportional sizes.
        </p>

        <PieChart
          title="Monthly Household Budget"
          description="Monthly spending by household expense category."
          data={monthlyBudgetBreakdown}
          valueLabel="amount"
          exploded
        />
      </section>

      <section className="stack">
        <h3>Project Status</h3>

        <p>
          Show the proportion of projects in each status to provide a quick
          overview of progress.
        </p>

        <PieChart
          title="Project Status Distribution"
          description="Breakdown of projects by completion status."
          data={projectStatus}
          valueLabel="projects"
        />
      </section>

      <section className="stack">
        <h3>Newsletter Signup Sources</h3>

        <p>
          Compare the contribution of different channels to newsletter
          subscriptions using larger numerical values.
        </p>

        <PieChart
          title="Newsletter Signups by Source"
          description="Number of subscriptions attributed to each signup channel."
          data={newsletterSources}
          valueLabel="signups"
        />
      </section>

      <section className="stack">
        <h3>Survey Results</h3>

        <p>
          Display the distribution of survey responses across satisfaction
          ratings.
        </p>

        <PieChart
          title="Service Satisfaction"
          description="Distribution of customer ratings from a recent survey."
          data={surveyResults}
          valueLabel="responses"
        />
      </section>

      <section className="stack">
        <h3>Single Category</h3>

        <p>
          Handle a dataset containing one category, which represents the entire
          total.
        </p>

        <PieChart
          title="Successful Payments"
          description="All recorded payments were successful."
          data={singleCategoryData}
          valueLabel="payments"
        />
      </section>

      <section className="stack">
        <h3>Zero Values</h3>

        <p>
          Ensure categories with zero values remain visible in the legend and
          data table without affecting the proportions of positive values.
        </p>

        <PieChart
          title="Support Requests by Channel"
          description="Number of requests received through each support channel."
          data={supportRequestsByChannel}
          valueLabel="requests"
        />
      </section>

      <section className="stack">
        <h3>Chart Without a Description</h3>

        <p>
          A chart can omit its optional description when the title and
          surrounding context provide sufficient information.
        </p>

        <PieChart
          title="Project Status Overview"
          data={projectHealthStatus}
          valueLabel="projects"
        />
      </section>

      <section className="stack">
        <h3>Empty Dataset</h3>

        <p>Demonstrate the empty state when no category data is available.</p>

        <PieChart
          title="Available Inventory"
          description="There is currently no inventory data to display."
          data={[]}
          valueLabel="items"
        />
      </section>
    </div>
  );
}
