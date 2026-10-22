import { useEffect, useState } from 'react';

import {
  Table,
  type TableColumn,
  type TableVariant,
} from '../../../../components/DataDisplay/Table';
import { Pagination } from '../../../../components/Navigations/Pagination/Pagination';
import { SearchBox } from '../../../../components/FormControls/SearchBox/SearchBox';
import { Tabs } from '../../../../components/ContentFeedback/Tab';

interface Student {
  id: number;
  name: string;
  program: string;
  average: number | null;
  startDate: string;
}

interface FinancialRecord {
  id: number;
  department: string;
  revenue: number;
  expenses: number;
  profitMargin: number;
}

const financialRecords: FinancialRecord[] = [
  {
    id: 1,
    department: 'Technology',
    revenue: 425000,
    expenses: 287000,
    profitMargin: 32.5,
  },
  {
    id: 2,
    department: 'Marketing',
    revenue: 185000,
    expenses: 142000,
    profitMargin: 23.2,
  },
  {
    id: 3,
    department: 'Operations',
    revenue: 310000,
    expenses: 248000,
    profitMargin: 20,
  },
  {
    id: 4,
    department: 'Finance',
    revenue: 265000,
    expenses: 198000,
    profitMargin: 25.3,
  },
  {
    id: 5,
    department: 'Sales',
    revenue: 520000,
    expenses: 364000,
    profitMargin: 30,
  },
];

const students: Student[] = [
  {
    id: 1,
    name: 'Stephanie',
    program: 'Business',
    average: 95,
    startDate: '2023-09-05',
  },
  {
    id: 2,
    name: 'Alex',
    program: 'Computer Science',
    average: 89,
    startDate: '2024-09-03',
  },
  {
    id: 3,
    name: 'Jordan',
    program: 'Accounting',
    average: 92,
    startDate: '2023-09-05',
  },
  {
    id: 4,
    name: 'Morgan',
    program: 'Marketing',
    average: 87,
    startDate: '2025-09-02',
  },
  {
    id: 5,
    name: 'Taylor',
    program: 'Finance',
    average: 91,
    startDate: '2024-09-03',
  },
  {
    id: 6,
    name: 'Casey',
    program: 'Accounting',
    average: null,
    startDate: '2025-09-02',
  },
];

const paginatedStudentsData: Student[] = [
  ...students,
  {
    id: 7,
    name: 'Riley',
    program: 'Business',
    average: 90,
    startDate: '2024-09-03',
  },
  {
    id: 8,
    name: 'Jamie',
    program: 'Finance',
    average: 88,
    startDate: '2025-09-02',
  },
  {
    id: 9,
    name: 'Avery',
    program: 'Marketing',
    average: 93,
    startDate: '2023-09-05',
  },
  {
    id: 10,
    name: 'Drew',
    program: 'Computer Science',
    average: 86,
    startDate: '2024-09-03',
  },
  {
    id: 11,
    name: 'Quinn',
    program: 'Business',
    average: 91,
    startDate: '2025-09-02',
  },
  {
    id: 12,
    name: 'Reese',
    program: 'Finance',
    average: 85,
    startDate: '2023-09-05',
  },
];

const studentColumns: TableColumn<Student>[] = [
  {
    key: 'name',
    header: 'Student',
    sortable: true,
  },
  {
    key: 'program',
    header: 'Program',
    sortable: true,
  },
  {
    key: 'average',
    header: 'Average',
    sortable: true,
    align: 'right',
    render: (student) =>
      student.average == null ? '—' : `${student.average}%`,
  },
  {
    key: 'startDate',
    header: 'Start date',
    sortable: true,
    sortValue: (student) => student.startDate,
    render: (student) =>
      new Date(`${student.startDate}T12:00:00`).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }),
  },
];

const unsortableColumns: TableColumn<Student>[] = [
  {
    key: 'name',
    header: 'Student',
  },
  {
    key: 'program',
    header: 'Program',
  },
  {
    key: 'average',
    header: 'Average',
    align: 'right',
    render: (student) =>
      student.average == null ? '—' : `${student.average}%`,
  },
];

const currencyFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

const financialColumns: TableColumn<FinancialRecord>[] = [
  {
    key: 'department',
    header: 'Department',
    sortable: true,
  },
  {
    key: 'revenue',
    header: 'Revenue',
    sortable: true,
    align: 'right',
    render: (record) => currencyFormatter.format(record.revenue),
  },
  {
    key: 'expenses',
    header: 'Expenses',
    sortable: true,
    align: 'right',
    render: (record) => currencyFormatter.format(record.expenses),
  },
  {
    key: 'profitMargin',
    header: 'Profit margin',
    sortable: true,
    align: 'right',
    render: (record) => `${record.profitMargin.toFixed(1)}%`,
  },
];

export default function TableExamples() {
  const [variant, setVariant] = useState<TableVariant>('basic');

  // Pagination example
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(paginatedStudentsData.length / pageSize);

  const paginatedStudents = paginatedStudentsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Filtering example
  const [studentSearch, setStudentSearch] = useState('');
  const [announcedCount, setAnnouncedCount] = useState(students.length);

  const filteredStudents = students.filter((student) => {
    const searchTerm = studentSearch.trim().toLowerCase();

    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm)
    );
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setAnnouncedCount(filteredStudents.length);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [filteredStudents.length]);

  // Combined filtering, sorting, and pagination example
  const [combinedSearch, setCombinedSearch] = useState('');
  const [combinedPage, setCombinedPage] = useState(1);

  const [combinedSort, setCombinedSort] = useState<{
    key: keyof Student;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const combinedPageSize = 5;

  const filteredCombinedStudents = paginatedStudentsData.filter((student) => {
    const searchTerm = combinedSearch.trim().toLowerCase();

    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm)
    );
  });

  const sortedCombinedStudents = [...filteredCombinedStudents].sort(
    (first, second) => {
      if (!combinedSort) return 0;

      const column = studentColumns.find(
        (item) => item.key === combinedSort.key,
      );

      if (!column) return 0;

      const firstValue = column.sortValue
        ? column.sortValue(first)
        : first[combinedSort.key];

      const secondValue = column.sortValue
        ? column.sortValue(second)
        : second[combinedSort.key];

      // Keep missing values at the bottom in either direction.
      if (firstValue == null && secondValue == null) return 0;
      if (firstValue == null) return 1;
      if (secondValue == null) return -1;

      let result: number;

      if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        result = firstValue - secondValue;
      } else {
        result = String(firstValue).localeCompare(
          String(secondValue),
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          },
        );
      }

      return combinedSort.direction === 'ascending' ? result : -result;
    },
  );

  const combinedTotalPages = Math.max(
    1,
    Math.ceil(sortedCombinedStudents.length / combinedPageSize),
  );

  // Paginate the globally sorted results, not just the filtered results.
  const paginatedCombinedStudents = sortedCombinedStudents.slice(
    (combinedPage - 1) * combinedPageSize,
    combinedPage * combinedPageSize,
  );

  const tabs = [
    {
      id: 'basic',
      label: 'Basic',
      content: (
        <div className="stack">
          <section aria-labelledby="table-variants-heading">
            <h4 id="table-variants-heading">Visual variants</h4>
            <p>Choose a style to see how the same data can be presented.</p>

            <div>
              <button
                type="button"
                aria-pressed={variant === 'basic'}
                onClick={() => setVariant('basic')}
              >
                Basic
              </button>

              <button
                type="button"
                aria-pressed={variant === 'striped'}
                onClick={() => setVariant('striped')}
              >
                Striped
              </button>
            </div>

            <Table
              columns={studentColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student results"
              variant={variant}
            />
          </section>

          <section aria-labelledby="table-unsortable-heading">
            <h4 id="table-unsortable-heading">Without sorting</h4>
            <p>
              Sorting is optional. When a column is not marked as sortable, its
              heading remains a regular semantic table header.
            </p>

            <Table
              columns={unsortableColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student results without sortable columns"
            />
          </section>

          <section aria-labelledby="table-hidden-caption-heading">
            <h4 id="table-hidden-caption-heading">Visually hidden caption</h4>
            <p>
              This table has a caption that is available to screen readers but
              is not displayed visually. The section heading identifies the
              example on screen.
            </p>

            <Table
              columns={studentColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student academic results"
              visuallyHiddenCaption
            />
          </section>

          <section aria-labelledby="table-empty-heading">
            <h4 id="table-empty-heading">Empty state</h4>
            <p>
              When there are no rows to display, the table presents a helpful
              message while retaining its column headers.
            </p>

            <Table
              columns={studentColumns}
              data={[]}
              getRowKey={(student) => student.id}
              caption="Student results with no records"
              emptyMessage="No student records are available."
            />
          </section>
        </div>
      ),
    },
    {
      id: 'sorting',
      label: 'Sorting',
      content: (
        <div className="stack">
          <section aria-labelledby="table-sorting-heading">
            <h4 id="table-sorting-heading">Sortable columns</h4>
            <p>
              Use Tab to reach a sortable column heading. Press Enter or Space
              to change the sort order. Activate the same heading again to
              reverse the direction.
            </p>

            <Table
              columns={studentColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student results with sortable columns"
            />
          </section>

          <section aria-labelledby="table-financial-heading">
            <h4 id="table-financial-heading">Financial data</h4>
            <p>
              This example demonstrates currency and percentage formatting,
              right-aligned numeric values, and sortable financial columns.
              Activate a column heading to change the sort order.
            </p>

            <Table
              columns={financialColumns}
              data={financialRecords}
              getRowKey={(record) => record.id}
              caption="Financial performance by department"
              variant="striped"
            />
          </section>
        </div>
      ),
    },
    {
      id: 'filtering',
      label: 'Filtering',
      content: (
        <section aria-labelledby="table-filter-heading">
          <h4 id="table-filter-heading">Filtering table data</h4>
          <p>
            Search by student name or program to filter the displayed records.
            The search is case-insensitive and updates as you type.
          </p>

          <SearchBox
            label="Filter students"
            name="student-search"
            value={studentSearch}
            onChange={setStudentSearch}
            placeholder="Search by name or program"
            description="Enter a student name or program, such as Stephanie or Accounting."
          />

          <p aria-live="polite" aria-atomic="true">
            {announcedCount} of {students.length} students shown.
          </p>

          <Table
            columns={studentColumns}
            data={filteredStudents}
            getRowKey={(student) => student.id}
            caption="Filterable student results"
            variant="striped"
            emptyMessage="No students match your search."
          />
        </section>
      ),
    },
    {
      id: 'pagination',
      label: 'Pagination',
      content: (
        <section aria-labelledby="table-pagination-heading">
          <h4 id="table-pagination-heading">Table with pagination</h4>
          <p>
            This example combines the Table and Pagination components. Five
            student records are displayed per page.
          </p>

          <Table
            columns={studentColumns}
            data={paginatedStudents}
            getRowKey={(student) => student.id}
            caption="Student records with pagination"
          />

          <p aria-live="polite" aria-atomic="true">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, paginatedStudentsData.length)} of{' '}
            {paginatedStudentsData.length} students.
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="basic"
          />
        </section>
      ),
    },
    {
      id: 'advanced',
      label: 'Advanced',
      content: (
        <div className="stack">
          <section aria-labelledby="table-combined-heading">
            <h4 id="table-combined-heading">
              Filtering, sorting, and pagination
            </h4>
            <p>
              Search by student name or program, sort all matching results by
              activating a column heading, and navigate through the results five
              records at a time. Filtering and sorting happen before pagination.
            </p>

            <SearchBox
              label="Filter student records"
              name="combined-student-search"
              value={combinedSearch}
              onChange={(value) => {
                setCombinedSearch(value);
                setCombinedPage(1);
              }}
              placeholder="Search by name or program"
              description="Try searching for Business, Finance, or a student's name."
            />

            <Table
              columns={studentColumns}
              data={paginatedCombinedStudents}
              getRowKey={(student) => student.id}
              caption="Student records with filtering, sorting, and pagination"
              variant="striped"
              emptyMessage="No students match your search."
              sortState={combinedSort}
              onSortChange={(key, direction) => {
                setCombinedSort({ key, direction });
                setCombinedPage(1);
              }}
            />

            <p aria-live="polite" aria-atomic="true">
              {sortedCombinedStudents.length === 0
                ? 'No students found.'
                : `Showing ${(combinedPage - 1) * combinedPageSize + 1} to ${Math.min(
                    combinedPage * combinedPageSize,
                    sortedCombinedStudents.length,
                  )} of ${sortedCombinedStudents.length} matching students.`}
            </p>

            <Pagination
              currentPage={combinedPage}
              totalPages={combinedTotalPages}
              onPageChange={setCombinedPage}
              variant="basic"
            />
          </section>

          <section aria-labelledby="table-frozen-heading">
            <h4 id="table-frozen-heading">Frozen columns</h4>
            <p>
              Keep important columns visible while scrolling horizontally
              through wider tables. Use the examples below to compare freezing
              the first column with freezing the first two columns.
            </p>

            <h5>Freeze the first column</h5>
            <p>
              The Student column remains visible while the other columns scroll
              horizontally.
            </p>

            <Table
              columns={studentColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student results with the first column frozen"
              variant="striped"
              freezeColumns={1}
            />

            <h5>Freeze the first two columns</h5>
            <p>
              Both the Student and Program columns remain visible while the
              remaining columns scroll horizontally.
            </p>

            <Table
              columns={studentColumns}
              data={students}
              getRowKey={(student) => student.id}
              caption="Student results with the first two columns frozen"
              variant="striped"
              freezeColumns={2}
              freezeColumnsSmallScreen={1}
            />
          </section>
        </div>
      ),
    },
  ];

  return (
    <main>
      <Tabs tabs={tabs} />
    </main>
  );
}
