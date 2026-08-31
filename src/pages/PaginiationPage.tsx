import { PageLayout } from '../components/PageLayout/PageLayout';
import { PaginationExamples } from '../examples';

export function PaginationPage() {
  return (
    <PageLayout title="Pagination">
      <p>
        A reusable pagination component for navigating between pages of content,
        with support for previous and next controls, page selection, and current
        page indication.
      </p>

      <PaginationExamples />
    </PageLayout>
  );
}
