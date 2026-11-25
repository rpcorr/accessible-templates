import { PageLayout } from '../../components/PageLayout/PageLayout';
import { SearchResultsExamples } from './Examples/SearchResultsExamples';

export function SearchResultsPage() {
  return (
    <PageLayout title="Search and Results Page">
      <p>
        An example search and results page that combines accessible search,
        pagination, breadcrumbs, and status components to help users find
        relevant information and navigate through search results.
      </p>

      <p>
        <strong>Accessibility target:</strong> Designed and tested with WCAG 2.2
        Level AA accessibility requirements in mind.
      </p>

      <div className="stack">
        <h3>Components</h3>

        <p>Search Combobox, Pagination, Breadcrumbs and Status.</p>

        <h3>Data sources</h3>

        <p>
          Search resource titles, descriptions, categories, and keywords are
          provided through a separate data file and imported into the search
          results example.
        </p>

        <h3>Demonstrates</h3>

        <ul>
          <li>
            Searching and filtering resources using an interactive search field.
          </li>
          <li>
            Matching search terms against resource titles, descriptions,
            categories, and keywords.
          </li>
          <li>
            Displaying search results across multiple pages using pagination.
          </li>
          <li>Resetting pagination when the search criteria change.</li>
          <li>Providing clear navigation through breadcrumbs.</li>
          <li>Communicating search result counts and completion status.</li>
          <li>
            Displaying a helpful message when no matching resources are found.
          </li>
          <li>
            Allowing users to clear their search and return to all available
            resources.
          </li>
          <li>
            Supporting keyboard navigation throughout the search experience.
          </li>
          <li>Managing focus when users navigate between result pages.</li>
        </ul>
      </div>

      <h3>Search and Results Example</h3>

      <SearchResultsExamples />
    </PageLayout>
  );
}
