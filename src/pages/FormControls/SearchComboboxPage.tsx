import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { SearchComboboxExamples } from '../../components/FormControls/SearchCombox/Examples/SearchComboboxExamples';

export function SearchComboboxPage() {
  return (
    <PageLayout
      title="Search Combobox"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Search Combobox</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible search combobox that allows users to enter a search
          query to filter a list of matching suggestions. Users can navigate the
          results and select an available option using the keyboard or mouse.
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

        <h3>When to Use Search Combobox</h3>

        <p>
          Use the Search Combobox when users primarily need to search or filter
          a list of suggestions. It is designed for search-oriented interactions
          where the entered text is the primary focus.
        </p>

        <p>
          For example, users can search for a product, location, or service by
          entering text and selecting a matching result. The component uses a
          search input and filters available suggestions as users type.
        </p>

        <h3>Usage Examples</h3>

        <p>
          The following examples demonstrate situations where a Search Combobox
          is appropriate because users primarily need to find information by
          entering a search query and filtering matching suggestions.
        </p>

        <h4>Searching for a Product</h4>

        <p>
          Use a Search Combobox when users need to find a product from a large
          list of available products. As users type, matching product
          suggestions are displayed.
        </p>

        <p>
          For example, entering <strong>lap</strong> could display suggestions
          such as <strong>Laptop</strong> and{' '}
          <strong>Laptop Accessories</strong>.
        </p>

        <h4>Finding a Location</h4>

        <p>
          Use a Search Combobox when users need to find a location by entering
          part of its name. The suggestions help users discover matching
          locations without browsing an entire list.
        </p>

        <p>
          For example, entering <strong>Tor</strong> could display suggestions
          such as <strong>Toronto</strong> and <strong>North York</strong>,
          depending on the available options.
        </p>

        <h4>Searching for a Service</h4>

        <p>
          Use a Search Combobox when users need to find a particular service
          from a list of available services. Users can enter keywords to narrow
          the suggestions and select a matching result.
        </p>

        <p>
          For example, entering <strong>web</strong> could display suggestions
          such as <strong>Web Development</strong> and{' '}
          <strong>Web Accessibility Consulting</strong>.
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
          A polite live region announces the number of matching results after a
          short delay when the user types. When no results are found, the live
          region announces <strong>No results found.</strong> This delay helps
          avoid interrupting users while they are typing.
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

        <p>
          When the field is required, the input must contain a value before the
          form can be submitted. Unlike the Combobox, the Search Combobox does
          not validate that the entered value corresponds to a selected option.
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
