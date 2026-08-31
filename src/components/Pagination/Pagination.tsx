import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageRange(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (currentPage <= 2) {
    pages.push(2, 3, 'ellipsis');
  } else if (currentPage === 3) {
    pages.push(2, 3, 4, 'ellipsis');
  } else if (currentPage === totalPages - 2) {
    pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1);
  } else if (currentPage >= totalPages - 1) {
    pages.push('ellipsis', totalPages - 2, totalPages - 1);
  } else {
    pages.push(
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
    );
  }

  pages.push(totalPages);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav aria-label="Pagination">
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Previous
          </button>
        </li>

        {getPageRange(currentPage, totalPages).map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} aria-hidden="true">
                <span className={styles.ellipsis}>…</span>
              </li>
            );
          }

          return (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={
                  currentPage === page
                    ? `Page ${page}, current page`
                    : `Go to page ${page}`
                }
              >
                {page}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
