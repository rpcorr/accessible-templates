import { PageLayout } from '../../components/PageLayout/PageLayout';
import { SearchBoxExamples } from '../../components/FormControls/SearchBox/Examples/SearchBoxExamples';

export function SearchBoxPage() {
  return (
    <PageLayout title="Search Box">
      <main className="stack">
        <p>
          An accessible search field that allows users to enter a search query
          and submit it to find information.
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

        <h3>When to Use</h3>

        <p>
          Use a Search Box when users need to enter a search query and submit it
          to find information, rather than select an option from a predefined
          list or choose from suggestions while typing.
        </p>

        <h4>Searching a Website</h4>

        <p>
          Use a Search Box when users need to search website content, such as
          articles, news, documentation, or resources. Users enter keywords and
          submit their query to view matching results.
        </p>

        <h4>Searching a Knowledge Base</h4>

        <p>
          Use a Search Box when users need to find information in a collection
          of help articles, frequently asked questions, or support
          documentation.
        </p>

        <h4>Searching Products or Services</h4>

        <p>
          Use a Search Box when users can enter their own search terms to find
          products or services without needing to select from suggestions while
          typing.
        </p>

        <h3>Accessibility</h3>

        <p>
          The Search Box uses a native <code>input</code> with{' '}
          <code>type="search"</code> and is contained within a{' '}
          <code>search</code> landmark. The input is associated with its visible
          label using a <code>&lt;label&gt;</code> element.
        </p>

        <p>
          Optional descriptions and error messages are associated with the input
          using <code>aria-describedby</code>. When an error is present, the
          input also uses <code>aria-invalid</code> to communicate its invalid
          state to assistive technologies.
        </p>

        <p>
          The Search Box supports an optional search icon, including an icon
          positioned inside the input. The icon is decorative and hidden from
          assistive technologies when it is displayed.
        </p>

        <h3>Search</h3>

        <p>
          Users can enter a search query and submit it using the Search button
          or by pressing <kbd>Enter</kbd> while the input has focus.
        </p>

        <p>
          The <code>onChange</code> callback provides the current input value,
          while the <code>onSearch</code> callback provides the submitted search
          value.
        </p>

        <h3>States</h3>

        <p>
          The Search Box supports default values, controlled values, required
          fields, descriptions, error messages, disabled fields, and read-only
          fields. It also supports rounded styling and an optional expanding
          search field that increases in width when it receives focus.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          Users can type a search query normally and press <kbd>Enter</kbd> to
          submit the search. <kbd>Tab</kbd> moves focus between the search input
          and Search button and continues to the next focusable element.
        </p>

        <p>
          When the expanding search option is enabled, the search field expands
          when the input or search button receives focus. Keyboard focus remains
          within the search control while it expands.
        </p>

        <h3>Examples</h3>

        <SearchBoxExamples />
      </main>
    </PageLayout>
  );
}
