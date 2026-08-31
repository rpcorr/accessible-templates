import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

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
