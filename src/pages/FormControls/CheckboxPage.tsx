import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { CheckboxExamples } from '../../examples';

export function CheckboxPage() {
  return (
    <PageLayout
      title="Checkbox"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/form-controls">Form Controls</BreadcrumbItem>
          <BreadcrumbItem current>Checkbox</BreadcrumbItem>
        </>
      }
    >
      <p>
        An accessible checkbox component for allowing users to select one or
        more options from a set of choices.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Checkbox component uses a native{' '}
          <code>&lt;input type="checkbox"&gt;</code> element, providing built-in
          accessibility semantics and keyboard interaction.
        </p>

        <p>
          Each checkbox is associated with its visible label using a{' '}
          <code>&lt;label&gt;</code> element. Optional descriptions are
          associated with the checkbox using <code>aria-describedby</code>.
        </p>

        <h3>Checkbox States</h3>

        <p>
          The Checkbox component supports checked, unchecked, disabled,
          required, and indeterminate states. The indeterminate state represents
          a mixed selection, such as when some but not all items in a group are
          selected.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Checkbox interaction uses the browser's native keyboard behaviour.
          Users can press <kbd>Tab</kbd> to move focus to a checkbox and{' '}
          <kbd>Space</kbd> to check or uncheck it. Disabled checkboxes cannot
          receive keyboard focus or be changed.
        </p>

        <h3>Focus Management</h3>

        <p>
          Checkboxes provide a visible <code>:focus-visible</code> indicator
          when focused using the keyboard, making the current control clear to
          keyboard users.
        </p>
      </div>

      <CheckboxExamples />
    </PageLayout>
  );
}
