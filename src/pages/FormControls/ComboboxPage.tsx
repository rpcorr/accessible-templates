import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { Tabs } from '../../components/ContentFeedback/Tab';
import { ComboboxExamples } from '../../components/FormControls/Combobox/Examples/ComboboxExamples';
import { AutocompleteExamples } from '../../components/FormControls/Combobox/Examples/AutocompleteExample';

export function ComboboxPage() {
  return (
    <PageLayout
      title="Combobox"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Combobox</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible combobox component that allows users to type into an
          input to filter a list of available options. Users can navigate and
          select suggestions using the keyboard or mouse. The component also
          supports optional inline autocomplete, which suggests matching option
          labels as the user types.
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
          The <code>aria-autocomplete</code> attribute identifies the
          autocomplete behaviour. It uses <code>list</code> for standard
          filtering and <code>both</code> when inline completion is enabled.
        </p>

        <p>
          When no matching options are found after filtering, a polite live
          region announces <strong>No options found.</strong> after a short
          delay to avoid interrupting users while they are typing.
        </p>

        <h3>Filtering and Selection</h3>

        <p>
          Users can type into the Combobox to filter options based on their
          labels. The list updates as the user types, displaying matching
          suggestions.
        </p>

        <p>
          Users can select an available option using the arrow keys and{' '}
          <kbd>Enter</kbd>, or by clicking an option with the mouse.
        </p>

        <h3>Inline Autocomplete</h3>

        <p>
          Inline autocomplete is an optional enhancement enabled through the{' '}
          <code>inlineCompletion</code> prop. As users type, the component
          suggests the remainder of the first matching option label directly in
          the input. The suggested text is highlighted to distinguish it from
          the text entered by the user.
        </p>

        <p>
          Users can accept the suggested completion by pressing{' '}
          <kbd>Arrow Right</kbd>. Standard filtering and option selection remain
          available when inline autocomplete is enabled.
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
          When inline autocomplete is enabled, <kbd>Arrow Right</kbd> accepts
          the suggested completion. <kbd>Tab</kbd> moves focus out of the
          Combobox and closes the options list without accepting the inline
          completion.
        </p>

        <h3>Examples</h3>

        <Tabs
          tabs={[
            {
              id: 'combobox',
              label: 'Combobox',
              content: <ComboboxExamples />,
            },
            {
              id: 'autocomplete',
              label: 'Autocomplete',
              content: <AutocompleteExamples />,
            },
          ]}
        />
      </main>
    </PageLayout>
  );
}
