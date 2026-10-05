import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { SearchBoxExamples } from './examples/SearchBoxExamples';

export function SearchBoxPage() {
  return (
    <PageLayout
      title="Search Box"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Search Box</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <p>
          An accessible search field that allows users to enter a search query
          and submit it for processing.
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
