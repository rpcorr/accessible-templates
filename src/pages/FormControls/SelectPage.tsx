import { PageLayout } from '../../components/PageLayout/PageLayout';
import { SelectExamples } from '../../examples';

export function SelectPage() {
  return (
    <PageLayout title="Select">
      <p>
        An accessible select component for allowing users to choose one or
        multiple options from a list of choices. The component uses a native
        HTML select element, providing built-in keyboard interaction and screen
        reader support.
      </p>

      <h3>Accessibility</h3>

      <p>
        The Select component uses a native <code>&lt;select&gt;</code> element,
        providing built-in keyboard navigation, selection behaviour, and screen
        reader support.
      </p>

      <p>
        The select is associated with its visible label using a{' '}
        <code>&lt;label&gt;</code> element. Optional descriptions and error
        messages are associated with the select using{' '}
        <code>aria-describedby</code>.
      </p>

      <h3>Selection and States</h3>

      <p>
        The Select component supports single and multiple selection, default
        selections, controlled selections, placeholder options, required
        selects, disabled options, disabled selects, descriptions, and error
        messages.
      </p>

      <p>
        Multiple selection returns an array of selected values through the
        <code>onChange</code> callback. The native multiple-select interaction
        allows users to select more than one option.
      </p>

      <h3>Keyboard Support</h3>

      <p>
        The Select component uses the browser&apos;s native keyboard behaviour.
        <kbd>Tab</kbd> moves focus to the select, while the arrow keys can be
        used to move through available options.
      </p>

      <p>
        For multiple selection, users can use modifier keys such as{' '}
        <kbd>Ctrl</kbd> or <kbd>Command</kbd>, together with the arrow keys or
        mouse, depending on the browser and operating system. Users can also
        type to find an option. For single selects, <kbd>Alt</kbd> +{' '}
        <kbd>Arrow Down</kbd> may open the options list.
      </p>

      <h3>Examples</h3>

      <SelectExamples />
    </PageLayout>
  );
}
