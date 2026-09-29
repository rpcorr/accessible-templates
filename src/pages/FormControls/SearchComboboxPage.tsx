import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { SearchComboboxExamples } from './examples/SearchComboboxExamples';

export function SearchComboboxPage() {
  return (
    <PageLayout
      title="Search Combobox"
      breadcrumbs={
        <>
          {' '}
          <BreadcrumbItem href="/">Home</BreadcrumbItem>{' '}
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>{' '}
          <BreadcrumbItem current>Search Combobox</BreadcrumbItem>
        </>
      }
    >
      {' '}
      <main className="stack">
        {' '}
        <p>
          An accessible search combobox that allows users to enter a search
          query and filter a list of matching suggestions. Users can select a
          result using the keyboard or mouse.{' '}
        </p>
        <h3>Accessibility</h3>
        <p>
          The Search Combobox uses a search input with the <code>combobox</code>{' '}
          role and a popup <code>listbox</code> containing matching results.
          ARIA relationships connect the input to the listbox and identify the
          currently active result for assistive technologies.
        </p>
        <p>
          The input is associated with its visible label using a{' '}
          <code>&lt;label&gt;</code> element. Optional descriptions and error
          messages are associated with the input using{' '}
          <code>aria-describedby</code>.
        </p>
        <p>
          A persistent polite live region announces the number of matching
          results after the user types. When no results are found, the live
          region announces <strong>No results found.</strong> after a short
          delay to avoid interrupting users while they are typing.
        </p>
        <h3>Search and Selection</h3>
        <p>
          Users can type into the Search Combobox to filter results based on
          their labels. The list updates as the user types.
        </p>
        <p>
          Users can select an available result using the arrow keys and{' '}
          <kbd>Enter</kbd>, or by clicking a result with the mouse.
        </p>
        <h3>States</h3>
        <p>
          The Search Combobox supports default values, controlled values,
          disabled results, disabled Search Comboboxes, required fields,
          descriptions, error messages, and situations where no matching results
          are found.
        </p>
        <h3>Keyboard Support</h3>
        <p>
          <kbd>Arrow Down</kbd> moves to the next available result, while{' '}
          <kbd>Arrow Up</kbd> moves to the previous result. <kbd>Enter</kbd>{' '}
          selects the active result and <kbd>Escape</kbd> closes the results
          list.
        </p>
        <p>
          <kbd>Tab</kbd> moves focus out of the Search Combobox and closes the
          results list. Users can continue typing at any time to update the
          search results.
        </p>
        <h3>Examples</h3>
        <SearchComboboxExamples />
      </main>
    </PageLayout>
  );
}
