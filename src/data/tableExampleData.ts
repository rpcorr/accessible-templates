import type { TableColumn } from '../components/DataDisplay/Table';

export interface Student {
  id: number;
  name: string;
  program: string;
  average: number | null;
  startDate: string;
}

export interface FinancialRecord {
  id: number;
  department: string;
  revenue: number;
  expenses: number;
  profitMargin: number;
}

export const tableExamplePageSize = 5;

export const financialRecords: FinancialRecord[] = [
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

export const students: Student[] = [
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

export const paginatedStudentsData: Student[] = [
  ...students,
  // Move the remaining student records (IDs 7–12) here.
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

export const studentColumns: TableColumn<Student>[] = [
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

export const unsortableColumns: TableColumn<Student>[] = [
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

export const currencyFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

export const financialColumns: TableColumn<FinancialRecord>[] = [
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

export const filterStudents = (students: Student[], searchTerm: string) => {
  const search = searchTerm.trim().toLowerCase();

  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(search) ||
      student.program.toLowerCase().includes(search),
  );
};
