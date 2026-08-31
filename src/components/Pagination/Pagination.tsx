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
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
