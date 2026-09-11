import { PageLayout } from '../components/PageLayout/PageLayout';
import { RadioGroupExamples } from '../examples';

export function RadioGroupPage() {
  return (
    <PageLayout title="Radio Group">
      <p>
        An accessible radio group component for allowing users to select one
        option from a set of mutually exclusive choices. Radio groups can be
        displayed vertically or horizontally.
      </p>

      <h3>Accessibility</h3>
      <p>
        The Radio Group uses native radio inputs grouped with a shared&nbsp;
        <code>name</code> attribute. This provides built-in keyboard navigation,
        selection behaviour, and screen reader support.
      </p>

      <p>
        The group uses a <code>fieldset</code> and <code>legend</code> to
        provide an accessible name for the set of radio buttons.
      </p>

      <h3>Orientation</h3>

      <p>
        Radio options are displayed vertically by default. The
        <code>orientation</code> prop can be set to <code>horizontal</code> to
        display the options in a row. Horizontal options wrap when necessary to
        remain usable at smaller screen sizes.
      </p>

      <h3>Selection and States</h3>

      <p>
        The Radio Group supports default selections, controlled selections,
        required groups, disabled options, and disabled groups. Only one option
        within a radio group can be selected at a time.
      </p>

      <h3>Keyboard Support</h3>

      <p>
        Radio buttons use the browser's native keyboard behaviour.
        <kbd>Tab</kbd> moves focus into the group, while the arrow keys move
        between radio options and select the focused option. <kbd>Space</kbd>
        can also be used to select the focused radio button.
      </p>

      <h3>Examples</h3>

      <RadioGroupExamples />
    </PageLayout>
  );
}
