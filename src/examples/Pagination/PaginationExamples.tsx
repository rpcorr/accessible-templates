import { useState } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';

export function PaginationExamples() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      <h2>Basic Pagination</h2>

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />

      <p>Current page: {currentPage}</p>
    </section>
  );
}
