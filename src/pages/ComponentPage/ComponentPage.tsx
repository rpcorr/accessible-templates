import { PageLayout } from '../../components/PageLayout/PageLayout';
import { SearchBox } from '../../components/FormControls/SearchBox/SearchBox';
import { useComponentFilters } from '../../hooks/useComponentFilters';
import { CategoryFilter } from './components/CategoryFilter';
import { ComponentResults } from './components/ComponentResults';
import styles from './ComponentPage.module.css';

export function ComponentPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    filteredGroups,
    resultCount,
    updateCategories,
    toggleCategory,
    clearFilters,
  } = useComponentFilters();

  return (
    <PageLayout title="Components" showCurrentBreadcrumb={false}>
      <main className="stack">
        <p className={styles.intro}>
          Explore the accessible UI components available in the Accessible
          Templates project.
        </p>

        <section aria-label="Search and filter components" className="stack">
          <SearchBox
            label="Search components"
            placeholder="Search by component name or description"
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <CategoryFilter
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onUpdateCategories={updateCategories}
          />

          <div className={styles.filterSummary}>
            <p aria-live="polite" aria-atomic="true">
              {resultCount === 1
                ? 'Showing 1 component'
                : `Showing ${resultCount} components`}
            </p>

            {(searchQuery || selectedCategories.length > 0) && (
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        </section>

        <ComponentResults groups={filteredGroups} />
      </main>
    </PageLayout>
  );
}
