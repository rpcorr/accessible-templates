import { useState } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';

export function PaginationExamples() {
  const [currentPage, setCurrentPage] = useState(3);
  const [longRangePage, setLongRangePage] = useState(25);
  const [pillLongRangePage, setPillLongRangePage] = useState(15);
  const [pillPage, setPillPage] = useState(3);
  const [outlinePage, setOutlinePage] = useState(3);
  const [outlineLongRangePage, setOutlineLongRangePage] = useState(25);

  return (
    <section>
      <h3>Examples</h3>

      <h4>Basic</h4>

      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />

      <p>Current page: {currentPage}</p>

      <h4>Long Range — Basic</h4>

      <Pagination
        currentPage={longRangePage}
        totalPages={100}
        onPageChange={setLongRangePage}
      />

      <p>Current page: {longRangePage}</p>

      <h4>Pill</h4>

      <Pagination
        currentPage={pillPage}
        totalPages={5}
        onPageChange={setPillPage}
        variant="pill"
      />

      <p>Current page: {pillPage}</p>

      <h4>Long Range — Pill</h4>

      <Pagination
        currentPage={pillLongRangePage}
        totalPages={100}
        onPageChange={setPillLongRangePage}
        variant="pill"
      />

      <p>Current page: {pillLongRangePage}</p>

      <h4>Outline</h4>

      <Pagination
        currentPage={outlinePage}
        totalPages={5}
        onPageChange={setOutlinePage}
        variant="outline"
      />

      <p>Current page: {outlinePage}</p>

      <h4>Long Range — Outline</h4>

      <Pagination
        currentPage={outlineLongRangePage}
        totalPages={100}
        onPageChange={setOutlineLongRangePage}
        variant="outline"
      />

      <p>Current page: {outlineLongRangePage}</p>
    </section>
  );
}
