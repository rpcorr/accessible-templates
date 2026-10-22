import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import styles from './Table.module.css';

export type TableVariant = 'basic' | 'striped';

export type TableSortDirection = 'ascending' | 'descending';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | null | undefined;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  caption?: string;
  visuallyHiddenCaption?: boolean;
  variant?: TableVariant;
  emptyMessage?: string;
  ariaLabel?: string;
  freezeColumns?: number;
  freezeColumnsSmallScreen?: number;
  sortState?: {
    key: keyof T;
    direction: TableSortDirection;
  } | null;
  onSortChange?: (key: keyof T, direction: TableSortDirection) => void;
}

interface SortState<T> {
  key: keyof T;
  direction: TableSortDirection;
}

function compareValues(
  first: string | number | null | undefined,
  second: string | number | null | undefined,
): number {
  if (first == null && second == null) return 0;
  if (first == null) return 1;
  if (second == null) return -1;

  if (typeof first === 'number' && typeof second === 'number') {
    return first - second;
  }

  return String(first).localeCompare(String(second), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function Table<T>({
  columns,
  data,
  getRowKey,
  caption,
  visuallyHiddenCaption = false,
  variant = 'basic',
  emptyMessage = 'No records found.',
  ariaLabel,
  freezeColumns = 0,
  freezeColumnsSmallScreen,
  sortState,
  onSortChange,
}: TableProps<T>) {
  const [internalSort, setInternalSort] = useState<SortState<T> | null>(null);

  const sort = sortState !== undefined ? sortState : internalSort;

  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const [showFrozenBoundary, setShowFrozenBoundary] = useState(false);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);
  const [columnOffsets, setColumnOffsets] = useState<number[]>([]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const requestedFrozenColumns =
    isSmallScreen && freezeColumnsSmallScreen !== undefined
      ? freezeColumnsSmallScreen
      : freezeColumns;

  const frozenColumnCount = Math.min(
    Math.max(0, Math.floor(requestedFrozenColumns)),
    columns.length,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 375px)');

    const updateScreenSize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const table = tableRef.current;

    if (!container || !table) return;

    const updateOverflow = () => {
      setHasHorizontalOverflow(container.scrollWidth > container.clientWidth);
    };

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);

    resizeObserver.observe(container);
    resizeObserver.observe(table);

    return () => resizeObserver.disconnect();
  }, [columns, data]);

  useEffect(() => {
    const container = containerRef.current;
    const table = tableRef.current;

    if (!container || !table || frozenColumnCount === 0) {
      setShowFrozenBoundary(false);
      return;
    }

    const updateFrozenBoundary = () => {
      const hasHorizontalOverflow =
        container.scrollWidth > container.clientWidth;

      const hasScrolled = container.scrollLeft > 0;

      setShowFrozenBoundary(hasHorizontalOverflow && hasScrolled);
    };

    updateFrozenBoundary();

    container.addEventListener('scroll', updateFrozenBoundary, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateFrozenBoundary);
    resizeObserver.observe(container);
    resizeObserver.observe(table);

    return () => {
      container.removeEventListener('scroll', updateFrozenBoundary);
      resizeObserver.disconnect();
    };
  }, [frozenColumnCount]);

  useLayoutEffect(() => {
    const table = tableRef.current;

    if (!table || frozenColumnCount === 0) {
      setColumnOffsets([]);
      return;
    }

    const updateColumnOffsets = () => {
      const headerCells =
        table.querySelectorAll<HTMLTableCellElement>('thead th');

      let offset = 0;
      const offsets: number[] = [];

      for (let index = 0; index < frozenColumnCount; index += 1) {
        offsets.push(offset);
        offset += headerCells[index]?.getBoundingClientRect().width ?? 0;
      }

      setColumnOffsets(offsets);
    };

    updateColumnOffsets();

    const resizeObserver = new ResizeObserver(updateColumnOffsets);

    resizeObserver.observe(table);

    const headerCells =
      table.querySelectorAll<HTMLTableCellElement>('thead th');

    headerCells.forEach((cell) => resizeObserver.observe(cell));

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [columns, frozenColumnCount, data]);

  const sortedData = useMemo(() => {
    if (!sort) return data;

    const column = columns.find((item) => item.key === sort.key);

    if (!column) return data;

    const getValue = (row: T) =>
      column.sortValue
        ? column.sortValue(row)
        : (row[sort.key] as string | number | null | undefined);

    return [...data].sort((first, second) => {
      const firstValue = getValue(first);
      const secondValue = getValue(second);

      // Keep empty values at the bottom in either sort direction.
      if (firstValue == null && secondValue == null) return 0;
      if (firstValue == null) return 1;
      if (secondValue == null) return -1;

      const result = compareValues(firstValue, secondValue);

      return sort.direction === 'ascending' ? result : -result;
    });
  }, [columns, data, sort]);

  function handleSort(column: TableColumn<T>) {
    if (!column.sortable) return;

    const nextDirection: TableSortDirection =
      sort?.key === column.key && sort.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    if (sortState !== undefined) {
      onSortChange?.(column.key, nextDirection);
    } else {
      setInternalSort({
        key: column.key,
        direction: nextDirection,
      });
    }
  }

  // return (

  //   <div
  //     ref={containerRef}
  //     className={styles.container}
  //     tabIndex={hasHorizontalOverflow ? 0 : undefined}
  //     role={hasHorizontalOverflow ? 'region' : undefined}
  //     aria-label={
  //       hasHorizontalOverflow
  //         ? `Scrollable table: ${caption || ariaLabel || 'Table'}`
  //         : undefined
  //     }
  //   >
  //     <table
  //       ref={tableRef}
  //       className={`${styles.table} ${styles[variant]}`}
  //       aria-label={caption ? undefined : ariaLabel}
  //     >
  //       {caption && (
  //         <caption
  //           className={
  //             visuallyHiddenCaption
  //               ? `${styles.caption} ${styles.visuallyHidden}`
  //               : styles.caption
  //           }
  //         >
  //           {caption}
  //         </caption>
  //       )}

  //       <thead>
  //         <tr>
  //           {columns.map((column, columnIndex) => {
  //             const isSorted = sort?.key === column.key;
  //             const sortDirection = isSorted ? sort.direction : undefined;

  //             const isFrozenBoundary =
  //               columnIndex === frozenColumnCount - 1 && showFrozenBoundary;

  //             return (
  //               <th
  //                 key={String(column.key)}
  //                 scope="col"
  //                 aria-sort={sortDirection}
  //                 className={[
  //                   styles[column.align ?? 'left'],
  //                   columnIndex < frozenColumnCount ? styles.frozenCell : '',
  //                   isFrozenBoundary ? styles.frozenBoundary : '',
  //                 ]
  //                   .filter(Boolean)
  //                   .join(' ')}
  //                 style={
  //                   columnIndex < frozenColumnCount
  //                     ? {
  //                         left: columnOffsets[columnIndex] ?? 0,
  //                       }
  //                     : undefined
  //                 }
  //               >
  //                 {column.sortable ? (
  //                   <button
  //                     type="button"
  //                     className={styles.sortButton}
  //                     onClick={() => handleSort(column)}
  //                     aria-label={
  //                       isSorted
  //                         ? `${column.header}, sorted ${
  //                             sort.direction === 'ascending'
  //                               ? 'ascending'
  //                               : 'descending'
  //                           }. Activate to sort ${
  //                             sort.direction === 'ascending'
  //                               ? 'descending'
  //                               : 'ascending'
  //                           }.`
  //                         : `Sort by ${column.header}, ascending`
  //                     }
  //                   >
  //                     <span>{column.header}</span>

  //                     <span
  //                       className={`${styles.sortIndicator} ${
  //                         isSorted ? styles.activeSortIndicator : ''
  //                       }`}
  //                       aria-hidden="true"
  //                     >
  //                       {isSorted
  //                         ? sort.direction === 'ascending'
  //                           ? '▲'
  //                           : '▼'
  //                         : '↕'}
  //                     </span>
  //                   </button>
  //                 ) : (
  //                   column.header
  //                 )}
  //               </th>
  //             );
  //           })}
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {sortedData.length > 0 ? (
  //           sortedData.map((row) => (
  //             <tr key={getRowKey(row)}>
  //               {columns.map((column, columnIndex) => {
  //                 const isFrozenBoundary =
  //                   columnIndex === frozenColumnCount - 1 && showFrozenBoundary;

  //                 return (
  //                   <td
  //                     key={String(column.key)}
  //                     style={
  //                       columnIndex < frozenColumnCount
  //                         ? {
  //                             left: columnOffsets[columnIndex] ?? 0,
  //                           }
  //                         : undefined
  //                     }
  //                     className={[
  //                       styles[column.align ?? 'left'],
  //                       columnIndex < frozenColumnCount
  //                         ? styles.frozenCell
  //                         : '',
  //                       isFrozenBoundary ? styles.frozenBoundary : '',
  //                     ]
  //                       .filter(Boolean)
  //                       .join(' ')}
  //                   >
  //                     {column.render
  //                       ? (column.render(row) ?? '—')
  //                       : row[column.key] == null
  //                         ? '—'
  //                         : String(row[column.key])}
  //                   </td>
  //                 );
  //               })}
  //             </tr>
  //           ))
  //         ) : (
  //           <tr>
  //             <td
  //               colSpan={Math.max(columns.length, 1)}
  //               className={styles.empty}
  //             >
  //               {emptyMessage}
  //             </td>
  //           </tr>
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    <div className={styles.tableWrapper}>
      {caption && !visuallyHiddenCaption && (
        <div className={styles.captionLabel}>{caption}</div>
      )}

      <div
        ref={containerRef}
        className={styles.container}
        tabIndex={hasHorizontalOverflow ? 0 : undefined}
        role={hasHorizontalOverflow ? 'region' : undefined}
        aria-label={
          hasHorizontalOverflow
            ? `Scrollable table: ${caption || ariaLabel || 'Table'}`
            : undefined
        }
      >
        <table
          ref={tableRef}
          className={`${styles.table} ${styles[variant]}`}
          aria-label={caption ? undefined : ariaLabel}
        >
          {caption && (
            <caption className={styles.visuallyHidden}>{caption}</caption>
          )}

          <thead>
            <tr>
              {columns.map((column, columnIndex) => {
                const isSorted = sort?.key === column.key;
                const sortDirection = isSorted ? sort.direction : undefined;

                const isFrozenBoundary =
                  columnIndex === frozenColumnCount - 1 && showFrozenBoundary;

                return (
                  <th
                    key={String(column.key)}
                    scope="col"
                    aria-sort={sortDirection}
                    className={[
                      styles[column.align ?? 'left'],
                      columnIndex < frozenColumnCount ? styles.frozenCell : '',
                      isFrozenBoundary ? styles.frozenBoundary : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={
                      columnIndex < frozenColumnCount
                        ? {
                            left: columnOffsets[columnIndex] ?? 0,
                          }
                        : undefined
                    }
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(column)}
                        aria-label={
                          isSorted
                            ? `${column.header}, sorted ${
                                sort.direction === 'ascending'
                                  ? 'ascending'
                                  : 'descending'
                              }. Activate to sort ${
                                sort.direction === 'ascending'
                                  ? 'descending'
                                  : 'ascending'
                              }.`
                            : `Sort by ${column.header}, ascending`
                        }
                      >
                        <span>{column.header}</span>

                        <span
                          className={`${styles.sortIndicator} ${
                            isSorted ? styles.activeSortIndicator : ''
                          }`}
                          aria-hidden="true"
                        >
                          {isSorted
                            ? sort.direction === 'ascending'
                              ? '▲'
                              : '▼'
                            : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <tr key={getRowKey(row)}>
                  {columns.map((column, columnIndex) => {
                    const isFrozenBoundary =
                      columnIndex === frozenColumnCount - 1 &&
                      showFrozenBoundary;

                    return (
                      <td
                        key={String(column.key)}
                        style={
                          columnIndex < frozenColumnCount
                            ? {
                                left: columnOffsets[columnIndex] ?? 0,
                              }
                            : undefined
                        }
                        className={[
                          styles[column.align ?? 'left'],
                          columnIndex < frozenColumnCount
                            ? styles.frozenCell
                            : '',
                          isFrozenBoundary ? styles.frozenBoundary : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {column.render
                          ? (column.render(row) ?? '—')
                          : row[column.key] == null
                            ? '—'
                            : String(row[column.key])}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className={styles.empty}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
