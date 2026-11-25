import { useEffect, useId, useMemo, useRef, useState } from 'react';

import styles from './SearchResultsExamples.module.css';

import { SearchCombobox } from '../../../components/FormControls/SearchCombobox/SearchCombobox';
import { Pagination } from '../../../components/Navigations/Pagination/Pagination';
import { Breadcrumbs } from '../../../components/Navigations/Breadcrumbs/Breadcrumbs';
import Status from '../../../components/ContentFeedback/Status/Status';

import { searchResources } from '../../../data/searchResults';

const RESULTS_PER_PAGE = 5;

export function SearchResultsExamples() {
  const idPrefix = useId().replace(/:/g, '');

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [announcement, setAnnouncement] = useState('');

  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusResultsRef = useRef(false);

  const searchOptions = useMemo(
    () =>
      searchResources.map((resource) => ({
        value: resource.title,
        label: resource.title,
      })),
    [],
  );

  const filteredResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return searchResources;
    }

    return searchResources.filter((resource) => {
      const searchableContent = [
        resource.title,
        resource.description,
        resource.category,
        ...resource.keywords,
      ]
        .join(' ')
        .toLowerCase();

      return searchableContent.includes(query);
    });
  }, [searchTerm]);

  const totalResults = filteredResources.length;

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;

  const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, totalResults);

  const currentResults = filteredResources.slice(startIndex, endIndex);

  useEffect(() => {
    if (shouldFocusResultsRef.current) {
      resultsHeadingRef.current?.focus({ preventScroll: true });

      resultsHeadingRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      shouldFocusResultsRef.current = false;
    }
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const message =
        totalResults === 0
          ? 'No matching resources found.'
          : totalResults === 1
            ? '1 result found.'
            : totalPages === 1
              ? `${totalResults} results found.`
              : `Showing results ${startIndex + 1} to ${endIndex} of ${totalResults}.`;

      setAnnouncement(message);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm, totalResults, startIndex, endIndex, totalPages]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    shouldFocusResultsRef.current = true;
    setCurrentPage(page);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <section className={styles.container}>
      <Breadcrumbs ariaLabel="Search results breadcrumb" separator="chevron">
        <li>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
        </li>

        <li>
          <a href="/resources" className={styles.breadcrumbLink}>
            Resources
          </a>
        </li>

        <li>
          <span aria-current="page">Search Results</span>
        </li>
      </Breadcrumbs>

      <div className={styles.header}>
        <h2 id={`${idPrefix}-title`}>Search Resources</h2>

        <p>
          Explore our library of accessibility resources and web development
          guides.
        </p>
      </div>

      <div
        className={styles.searchSection}
        aria-labelledby={`${idPrefix}-title`}
      >
        <SearchCombobox
          label="Search resources"
          name="search"
          options={searchOptions}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter a title, keyword or topic"
          description="Search by resource title, description, category or keyword."
        />
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <h3
            id={`${idPrefix}-results-heading`}
            ref={resultsHeadingRef}
            tabIndex={-1}
          >
            Search Results
          </h3>

          <span className={styles.resultCount}>
            {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </span>
        </div>

        <Status visuallyHidden>{announcement}</Status>

        {totalResults > 0 ? (
          <>
            <ul className={styles.resultsList}>
              {currentResults.map((resource) => (
                <li key={resource.id} className={styles.resultItem}>
                  <article>
                    <h4>
                      <a
                        href={`/resources/${resource.id}`}
                        className={styles.resultLink}
                      >
                        {resource.title}
                      </a>
                    </h4>

                    <p>{resource.description}</p>

                    <span className={styles.category}>{resource.category}</span>
                  </article>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  variant="basic"
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <h4>No resources found</h4>

            <p>
              Try a different search term or clear your search to browse all
              available resources.
            </p>

            <button type="button" onClick={handleClearSearch}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchResultsExamples;
