import { useState } from 'react';
import { Card, Statistic } from '../../../../components/DataDisplay';

export const StatisticExamples = () => {
  const [testValue, setTestValue] = useState(92.5);
  return (
    <section className="stack">
      <h4>Basic Statistic</h4>
      <p>A simple statistic with a label and value.</p>

      <Statistic label="Total Users" value="1,250" />

      <h4>Statistic with Description</h4>
      <p>An optional description provides additional context for the value.</p>

      <Statistic
        label="Completed Tasks"
        value="85%"
        description="Tasks completed this month"
      />

      <h4>Different Value Formats</h4>
      <p>
        Statistics can display counts, percentages, currency, and other
        formatted values.
      </p>

      <div className="stack">
        <Statistic
          label="Total Projects"
          value={42}
          description="Across all teams"
        />

        <Statistic
          label="Monthly Revenue"
          value="$24,500"
          description="Revenue this month"
        />

        <Statistic
          label="Average Completion"
          value="92.5%"
          description="Across completed projects"
        />
      </div>

      <h4>Statistics in Cards</h4>
      <p>
        The Statistic component can be combined with Card to create dashboard
        summary panels.
      </p>

      <div className="stack">
        <Card>
          <Statistic
            label="Total Users"
            value="1,250"
            description="Registered users"
          />
        </Card>

        <Card>
          <Statistic
            label="Tasks Completed"
            value="85%"
            description="15% remaining"
          />
        </Card>

        <Card>
          <Statistic
            label="Open Issues"
            value={12}
            description="Issues requiring attention"
          />
        </Card>

        <h4>Animated Statistic</h4>
        <p>
          Numeric values can animate when they enter the viewport. Use the
          buttons to test how the component handles changing values.
        </p>

        <div className="stack">
          <Statistic
            label="Test Value"
            value={testValue}
            description="Use the buttons below to change the value."
            animate
            duration={2000}
          />

          <div className="stack">
            <button
              type="button"
              onClick={() => setTestValue((current) => current + 250)}
            >
              Increase Value
            </button>

            <button type="button" onClick={() => setTestValue(250)}>
              Reset Value
            </button>
          </div>
        </div>
      </div>

      <h4>Accessibility</h4>
      <ul>
        <li>
          Each statistic includes a meaningful label that identifies what the
          value represents.
        </li>
        <li>Optional descriptions provide context where necessary.</li>
        <li>
          Values and statuses should not rely on colour alone to convey meaning.
        </li>
        <li>
          Statistics are non-interactive and do not introduce additional
          keyboard focus stops.
        </li>
        <li>
          Dynamic changes are not automatically announced. Use an appropriate
          status or live-region component when announcements are necessary.
        </li>
      </ul>
    </section>
  );
};

export default StatisticExamples;
