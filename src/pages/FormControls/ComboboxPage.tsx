import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { ComboboxExamples } from '../../examples';

export function ComboboxPage() {
  return (
    <PageLayout
      title="Combobox"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/form-controls">Form Controls</BreadcrumbItem>
          <BreadcrumbItem current>Combobox</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible combobox component that allows users to type into an
          input and filter a list of available options. Users can select an
          option using the keyboard or mouse.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Combobox uses an input with the <code>combobox</code> role and a
          popup <code>listbox</code> containing the available options. ARIA
          relationships connect the input to the listbox and identify the
          currently active option for assistive technologies.
        </p>

        <p>
          The input is associated with its visible label using a{' '}
          <code>&lt;label&gt;</code> element. An optional description is
          associated with the input using <code>aria-describedby</code>.
        </p>

        <p>
          When no matching options are found after filtering, a polite live
          region announces <strong>No options found.</strong> after a short
          delay to avoid interrupting users while they are typing.
        </p>

        <h3>Filtering and Selection</h3>

        <p>
          Users can type into the Combobox to filter options based on their
          labels. The list updates as the user types.
        </p>

        <p>
          Users can select an available option using the arrow keys and{' '}
          <kbd>Enter</kbd>, or by clicking an option with the mouse.
        </p>

        <h3>States</h3>

        <p>
          The Combobox supports default values, controlled values, disabled
          options, disabled Comboboxes, required fields, descriptions, and
          situations where no matching options are found.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          <kbd>Arrow Down</kbd> moves to the next available option, while{' '}
          <kbd>Arrow Up</kbd> moves to the previous option. <kbd>Enter</kbd>{' '}
          selects the active option and <kbd>Escape</kbd> closes the list.
        </p>

        <p>
          <kbd>Tab</kbd> moves focus out of the Combobox and closes the options
          list. Users can continue typing at any time to filter the available
          options.
        </p>

        <h3>Examples</h3>

        <ComboboxExamples />
      </main>
    </PageLayout>
  );
}
