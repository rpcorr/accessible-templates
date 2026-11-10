import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Tabs } from '../../components/ContentFeedback/Tab';
import { ComboboxExamples } from '../../components/FormControls/Combobox/Examples/ComboboxExamples';
import { AutocompleteExamples } from '../../components/FormControls/Combobox/Examples/AutocompleteExample';

export function ComboboxPage() {
  return (
    <PageLayout title="Combobox">
      <main className="stack">
        <p>
          An accessible combobox component that allows users to type into an
          input to filter a list of available options. Users can navigate and
          select suggestions using the keyboard or mouse. The component also
          supports optional inline autocomplete, which displays the remaining
          text of a matching option label as the user types.
        </p>

        <p>
          <strong>Accessibility target:</strong> Designed and tested with WCAG
          2.2 Level AA accessibility requirements in mind.
        </p>

        <h3>Choosing the Right Component</h3>

        <p>
          These components support different types of search and selection
          interactions:
        </p>

        <ul>
          <li>
            <strong>Search Box:</strong> Use when users enter a search query and
            submit it to find information. Suggestions are not presented as the
            user types.
          </li>
          <li>
            <strong>Search Combobox:</strong> Use when users enter text to
            filter matching suggestions and select a result.
          </li>
          <li>
            <strong>Combobox:</strong> Use when users need to select a
            predefined option, particularly when its displayed label is
            different from its underlying value.
          </li>
        </ul>

        <h3>When to Use Combobox</h3>

        <p>
          Use the Combobox when users need to select a specific option from a
          list, particularly when each option has a separate underlying value
          and display label. The component maintains the selected value
          independently from the text displayed in the input.
        </p>

        <p>
          For example, selecting a province can display <strong>Ontario</strong>{' '}
          in the input while storing <code>ON</code> as the selected value. This
          makes the component suitable for forms where a specific option must be
          selected rather than simply entering search text.
        </p>

        <h3>Usage Examples</h3>

        <p>
          The following examples demonstrate situations where a Combobox is
          appropriate because users need to select a specific option with a
          distinct underlying value and display label.
        </p>

        <h4>Selecting a Province or Territory</h4>

        <p>
          Use a Combobox when users need to select a province or territory from
          a predefined list. The selected option can display its full name while
          storing its abbreviation as the underlying value.
        </p>

        <p>
          For example, selecting <strong>Ontario</strong> displays the province
          name while storing <code>ON</code> as the selected value.
        </p>

        <h4>Selecting a Department</h4>

        <p>
          Use a Combobox when users must select a department from a list of
          available choices. The component maintains the selected department's
          underlying value separately from its displayed label.
        </p>

        <p>
          For example, selecting <strong>Human Resources</strong> can store{' '}
          <code>HR</code> as the selected value.
        </p>

        <h4>Choosing a Category</h4>

        <p>
          Use a Combobox when a form requires users to select a specific
          category, such as a product category or service type. Optional inline
          autocomplete can help users complete matching option labels as they
          type.
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
          the input. The suggested completion is visually distinguished to
          distinguish it from the text entered by the user.
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
          situations where no matching options are found. When a field is
          required, users must select an available option rather than simply
          entering text.
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
