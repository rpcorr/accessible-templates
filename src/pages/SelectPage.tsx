import { PageLayout } from '../components/PageLayout/PageLayout';
import { SelectExamples } from '../examples';

export function SelectPage() {
  return (
    <PageLayout title="Select">
      <p>
        An accessible select component for allowing users to choose one option
        from a list of choices. The component uses a native HTML select element,
        providing built-in keyboard interaction and screen reader support.
      </p>

      <h3>Accessibility</h3>

      <p>
        The Select component uses a native <code>&lt;select&gt;</code> element,
        providing built-in keyboard navigation, selection behaviour, and screen
        reader support.
      </p>

      <p>
        The select is associated with its visible label using a
        <code>&lt;label&gt;</code> element. Optional descriptions and error
        messages are associated with the select using
        <code>aria-describedby</code>.
      </p>

      <h3>Selection and States</h3>

      <p>
        The Select component supports default selections, controlled selections,
        placeholder options, required selects, disabled options, disabled
        selects, descriptions, and error messages.
      </p>

      <h3>Keyboard Support</h3>

      <p>
        The Select component uses the browser&apos;s native keyboard behaviour.
        <kbd>Tab</kbd> moves focus to the select, while the arrow keys can be
        used to move through available options. Depending on the browser and
        operating system, users can also type to find an option or use
        <kbd>Alt</kbd> + <kbd>Arrow Down</kbd> to open the options list.
      </p>

      <h3>Examples</h3>

      <SelectExamples />
    </PageLayout>
  );
}
