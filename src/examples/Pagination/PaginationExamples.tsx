import { useState } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';

export function PaginationExamples() {
  const [currentPage, setCurrentPage] = useState(1);
  const [longRangePage, setLongRangePage] = useState(25);

  return (
    <section>
      <h3>Examples</h3>

      <h4>Basic Pagination</h4>

      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />

      <p>Current page: {currentPage}</p>

      <h4>Long Page Range</h4>

      <Pagination
        currentPage={longRangePage}
        totalPages={100}
        onPageChange={setLongRangePage}
      />

      <p>Current page: {longRangePage}</p>
    </section>
  );
}
