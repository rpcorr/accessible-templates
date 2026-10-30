import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type Ref,
} from 'react';

import styles from './DateRangePicker.module.css';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  label: string;
  name: string;
  value?: DateRange;
  defaultValue?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
  error?: string;
  startDateInputRef?: Ref<HTMLInputElement>;
  endDateInputRef?: Ref<HTMLInputElement>;
  onValidationError?: (field: 'startDate' | 'endDate') => void;
  onChange?: (range: DateRange) => void;
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(first: Date | null, second: Date | null): boolean {
  return (
    first !== null && second !== null && toDateKey(first) === toDateKey(second)
  );
}

function isBefore(first: Date, second: Date): boolean {
  return normalizeDate(first).getTime() < normalizeDate(second).getTime();
}

function isAfter(first: Date, second: Date): boolean {
  return normalizeDate(first).getTime() > normalizeDate(second).getTime();
}

// function formatMonthYear(date: Date): string {
//   return new Intl.DateTimeFormat('en', {
//     month: 'long',
//     year: 'numeric',
//   }).format(date);
// }

function formatMonth(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
  }).format(date);
}

function formatShortMonth(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
  }).format(date);
}

function formatYear(date: Date): string {
  return String(date.getFullYear());
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function getMonthDays(month: Date): Date[] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);

  const gridStart = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() - firstDay.getDay(),
  );

  return Array.from({ length: 42 }, (_, index) => {
    return new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
  });
}

function getWeekdayLabels(): string[] {
  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  return (
    (minDate !== undefined && isBefore(date, minDate)) ||
    (maxDate !== undefined && isAfter(date, maxDate))
  );
}

function clampDateToBounds(date: Date, minDate?: Date, maxDate?: Date): Date {
  const normalizedDate = normalizeDate(date);

  if (minDate && isBefore(normalizedDate, minDate)) {
    return normalizeDate(minDate);
  }

  if (maxDate && isAfter(normalizedDate, maxDate)) {
    return normalizeDate(maxDate);
  }

  return normalizedDate;
}

function getInitialRange(
  value?: DateRange,
  defaultValue?: DateRange,
): DateRange {
  const initial = value ?? defaultValue;

  return {
    startDate: initial?.startDate ? normalizeDate(initial.startDate) : null,
    endDate: initial?.endDate ? normalizeDate(initial.endDate) : null,
  };
}

export function DateRangePicker({
  label,
  name,
  value,
  defaultValue,
  minDate,
  maxDate,
  required = false,
  disabled = false,
  readOnly = false,
  description,
  error,
  startDateInputRef,
  endDateInputRef,
  onValidationError,
  onChange,
}: DateRangePickerProps) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const startId = `${generatedId}-start`;
  const endId = `${generatedId}-end`;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const calendarId = `${generatedId}-calendar`;

  const calendarRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dateButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const monthNavigationRef = useRef(false);

  const isControlled = value !== undefined;

  const [internalRange, setInternalRange] = useState<DateRange>(() =>
    getInitialRange(value, defaultValue),
  );

  const range = isControlled ? getInitialRange(value) : internalRange;

  const [startText, setStartText] = useState(
    range.startDate ? toDateKey(range.startDate) : '',
  );
  const [endText, setEndText] = useState(
    range.endDate ? toDateKey(range.endDate) : '',
  );

  const controlledSignature = isControlled
    ? `${value?.startDate ? toDateKey(value.startDate) : ''}|${
        value?.endDate ? toDateKey(value.endDate) : ''
      }`
    : '';

  const [previousControlledSignature, setPreviousControlledSignature] =
    useState(controlledSignature);

  const [startError, setStartError] = useState('');
  const [endError, setEndError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<Date>(
    range.startDate ?? normalizeDate(new Date()),
  );
  const [announcement, setAnnouncement] = useState('');

  // Keep draft input text synchronized when a controlled value changes.
  if (isControlled && controlledSignature !== previousControlledSignature) {
    setPreviousControlledSignature(controlledSignature);
    setStartText(value?.startDate ? toDateKey(value.startDate) : '');
    setEndText(value?.endDate ? toDateKey(value.endDate) : '');
    setStartError('');
    setEndError('');
  }

  const activeYear = activeDate.getFullYear();
  const activeMonth = activeDate.getMonth();

  const visibleMonth = useMemo(
    () => new Date(activeYear, activeMonth, 1),
    [activeYear, activeMonth],
  );

  const days = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);
  const weekdays = getWeekdayLabels();

  const previousMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() - 1,
    1,
  );

  const nextMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1,
  );

  const previousMonthDisabled =
    minDate !== undefined &&
    isAfter(
      normalizeDate(minDate),
      new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0),
    );

  const nextMonthDisabled =
    maxDate !== undefined && isBefore(normalizeDate(maxDate), nextMonth);

  const previousYear = visibleMonth.getFullYear() - 1;
  const nextYear = visibleMonth.getFullYear() + 1;

  const previousYearStart = new Date(previousYear, 0, 1);
  const previousYearEnd = new Date(previousYear, 11, 31);

  const nextYearStart = new Date(nextYear, 0, 1);
  const nextYearEnd = new Date(nextYear, 11, 31);

  const previousYearDisabled =
    (minDate !== undefined &&
      isAfter(normalizeDate(minDate), previousYearEnd)) ||
    (maxDate !== undefined &&
      isBefore(normalizeDate(maxDate), previousYearStart));

  const nextYearDisabled =
    (minDate !== undefined && isAfter(normalizeDate(minDate), nextYearEnd)) ||
    (maxDate !== undefined && isBefore(normalizeDate(maxDate), nextYearStart));

  useEffect(() => {
    if (!isOpen || monthNavigationRef.current) {
      return;
    }

    const activeIndex = days.findIndex((date) => sameDay(date, activeDate));

    if (activeIndex >= 0) {
      dateButtonRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeDate, days]);

  function updateRange(nextRange: DateRange) {
    const normalizedRange: DateRange = {
      startDate: nextRange.startDate
        ? normalizeDate(nextRange.startDate)
        : null,
      endDate: nextRange.endDate ? normalizeDate(nextRange.endDate) : null,
    };

    if (!isControlled) {
      setInternalRange(normalizedRange);
    }

    setStartText(
      normalizedRange.startDate ? toDateKey(normalizedRange.startDate) : '',
    );
    setEndText(
      normalizedRange.endDate ? toDateKey(normalizedRange.endDate) : '',
    );

    onChange?.(normalizedRange);
  }

  function selectDate(date: Date) {
    if (disabled || readOnly || isDateDisabled(date, minDate, maxDate)) {
      return;
    }

    const selectedDate = normalizeDate(date);

    if (!range.startDate || range.endDate !== null) {
      updateRange({
        startDate: selectedDate,
        endDate: null,
      });

      setStartError('');
      setEndError('');
      setAnnouncement(
        `Start date selected: ${formatDateLabel(selectedDate)}. Select an end date.`,
      );

      return;
    }

    if (isBefore(selectedDate, range.startDate)) {
      updateRange({
        startDate: selectedDate,
        endDate: null,
      });

      setStartError('');
      setEndError('');
      setAnnouncement(
        `New start date selected: ${formatDateLabel(selectedDate)}. Select an end date.`,
      );

      return;
    }

    updateRange({
      startDate: range.startDate,
      endDate: selectedDate,
    });

    setStartError('');
    setEndError('');
    setAnnouncement(
      `Date range selected: ${formatDateLabel(range.startDate)} to ${formatDateLabel(selectedDate)}.`,
    );

    setIsOpen(false);
    toggleRef.current?.focus();
  }

  function validateDateInput(
    text: string,
    field: 'startDate' | 'endDate',
  ): string {
    if (!text) {
      if (required) {
        return field === 'startDate'
          ? 'Enter a start date.'
          : 'Enter an end date.';
      }

      return '';
    }

    const parsedDate = parseDate(text);

    if (!parsedDate) {
      return 'Enter a valid date in YYYY-MM-DD format.';
    }

    if (minDate && isBefore(parsedDate, minDate)) {
      return `Date must be on or after ${toDateKey(minDate)}.`;
    }

    if (maxDate && isAfter(parsedDate, maxDate)) {
      return `Date must be on or before ${toDateKey(maxDate)}.`;
    }

    if (
      field === 'endDate' &&
      range.startDate &&
      isBefore(parsedDate, range.startDate)
    ) {
      return 'End date must be on or after the start date.';
    }

    if (
      field === 'startDate' &&
      range.endDate &&
      isAfter(parsedDate, range.endDate)
    ) {
      return 'Start date must be on or before the end date.';
    }

    return '';
  }

  function handleDateBlur(field: 'startDate' | 'endDate') {
    const text = field === 'startDate' ? startText : endText;
    const validationError = validateDateInput(text, field);

    if (field === 'startDate') {
      setStartError(validationError);
    } else {
      setEndError(validationError);
    }

    if (validationError) {
      onValidationError?.(field);
    }
  }

  function handleDateInput(
    event: ChangeEvent<HTMLInputElement>,
    field: 'startDate' | 'endDate',
  ) {
    const text = event.target.value;

    if (field === 'startDate') {
      setStartText(text);
      setStartError('');
    } else {
      setEndText(text);
      setEndError('');
    }

    // Preserve partial or invalid draft text while the user types.
    if (text !== '' && !parseDate(text)) {
      return;
    }

    const parsedDate = text ? parseDate(text) : null;

    if (parsedDate && isDateDisabled(parsedDate, minDate, maxDate)) {
      return;
    }

    if (field === 'startDate') {
      const endDate =
        parsedDate && range.endDate && isBefore(range.endDate, parsedDate)
          ? null
          : range.endDate;

      updateRange({
        startDate: parsedDate,
        endDate,
      });

      if (endDate === null && range.endDate !== null) {
        setEndError('');
      }

      return;
    }

    if (
      parsedDate &&
      range.startDate &&
      isBefore(parsedDate, range.startDate)
    ) {
      return;
    }

    updateRange({
      startDate: range.startDate,
      endDate: parsedDate,
    });
  }

  function moveMonth(amount: number) {
    monthNavigationRef.current = true;

    setActiveDate((current) => {
      const nextMonth = new Date(
        current.getFullYear(),
        current.getMonth() + amount,
        1,
      );

      const lastDay = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1,
        0,
      ).getDate();

      const candidateDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        Math.min(current.getDate(), lastDay),
      );

      return clampDateToBounds(candidateDate, minDate, maxDate);
    });
  }

  function moveYear(amount: number) {
    monthNavigationRef.current = true;

    setActiveDate((current) => {
      const targetYear = current.getFullYear() + amount;

      const lastDay = new Date(targetYear, current.getMonth() + 1, 0).getDate();

      const candidateDate = new Date(
        targetYear,
        current.getMonth(),
        Math.min(current.getDate(), lastDay),
      );

      return clampDateToBounds(candidateDate, minDate, maxDate);
    });
  }

  function handleCalendarKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      toggleRef.current?.focus();
      return;
    }

    const offsets: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 7,
      ArrowUp: -7,
    };

    if (event.key in offsets) {
      event.preventDefault();
      monthNavigationRef.current = false;

      setActiveDate(
        clampDateToBounds(
          new Date(
            activeDate.getFullYear(),
            activeDate.getMonth(),
            activeDate.getDate() + offsets[event.key],
          ),
          minDate,
          maxDate,
        ),
      );

      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();

      const dayOffset =
        event.key === 'Home' ? -activeDate.getDay() : 6 - activeDate.getDay();

      monthNavigationRef.current = false;

      setActiveDate(
        clampDateToBounds(
          new Date(
            activeDate.getFullYear(),
            activeDate.getMonth(),
            activeDate.getDate() + dayOffset,
          ),
          minDate,
          maxDate,
        ),
      );

      return;
    }

    if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();

      const amount = event.key === 'PageUp' ? -1 : 1;
      const multiplier = event.shiftKey ? 12 : 1;

      monthNavigationRef.current = false;

      setActiveDate((current) => {
        const targetMonth = new Date(
          current.getFullYear(),
          current.getMonth() + amount * multiplier,
          1,
        );

        const lastDay = new Date(
          targetMonth.getFullYear(),
          targetMonth.getMonth() + 1,
          0,
        ).getDate();

        const candidateDate = new Date(
          targetMonth.getFullYear(),
          targetMonth.getMonth(),
          Math.min(current.getDate(), lastDay),
        );

        return clampDateToBounds(candidateDate, minDate, maxDate);
      });
    }
  }

  const startDescribedBy =
    [
      description ? descriptionId : null,
      error ? errorId : null,
      startError ? `${startId}-error` : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const endDescribedBy =
    [
      description ? descriptionId : null,
      error ? errorId : null,
      endError ? `${endId}-error` : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className={styles.dateRangePicker}>
      <div className={styles.fieldGroup} role="group" aria-labelledby={labelId}>
        <span id={labelId} className={styles.groupLabel}>
          {label}
        </span>

        <div className={styles.dateFields}>
          <div className={styles.field}>
            <label htmlFor={startId} className={styles.fieldLabel}>
              Start date
            </label>

            <input
              ref={startDateInputRef}
              id={startId}
              name={`${name}Start`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY-MM-DD"
              value={startText}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              aria-describedby={startDescribedBy}
              aria-invalid={Boolean(error || startError)}
              onChange={(event) => handleDateInput(event, 'startDate')}
              onBlur={() => handleDateBlur('startDate')}
            />

            {startError && (
              <p id={`${startId}-error`} className={styles.error}>
                {startError}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={endId} className={styles.fieldLabel}>
              End date
            </label>

            <input
              ref={endDateInputRef}
              id={endId}
              name={`${name}End`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="YYYY-MM-DD"
              value={endText}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              aria-describedby={endDescribedBy}
              aria-invalid={Boolean(error || endError)}
              onChange={(event) => handleDateInput(event, 'endDate')}
              onBlur={() => handleDateBlur('endDate')}
            />

            {endError && (
              <p id={`${endId}-error`} className={styles.error}>
                {endError}
              </p>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.calendarControls}>
        <button
          ref={toggleRef}
          type="button"
          className={styles.calendarToggle}
          aria-label={`${isOpen ? 'Close' : 'Open'} calendar for ${label}`}
          aria-expanded={isOpen}
          aria-controls={calendarId}
          disabled={disabled || readOnly}
          onClick={() => {
            if (!isOpen) {
              monthNavigationRef.current = false;
              setActiveDate(range.startDate ?? normalizeDate(new Date()));
            }

            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? 'Close calendar' : 'Choose dates'}
        </button>
      </div>

      {isOpen && (
        <div
          ref={calendarRef}
          id={calendarId}
          className={styles.calendar}
          role="group"
          aria-label={`${label} calendar`}
          onKeyDown={handleCalendarKeyDown}
        >
          <div className={styles.calendarHeader}>
            {/* Month navigation - left */}
            <div className={styles.headerSection}>
              <div
                className={styles.headerValue}
                aria-live="polite"
                aria-atomic="true"
              >
                <span className={styles.fullMonth}>
                  {formatMonth(visibleMonth)}
                </span>

                <span className={styles.shortMonth}>
                  {formatShortMonth(visibleMonth)}
                </span>
              </div>

              <div className={styles.navigationButtons}>
                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Next month"
                  disabled={disabled || readOnly || nextMonthDisabled}
                  onClick={() => moveMonth(1)}
                >
                  <span aria-hidden="true">↑</span>
                </button>

                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Previous month"
                  disabled={disabled || readOnly || previousMonthDisabled}
                  onClick={() => moveMonth(-1)}
                >
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>

            {/* Year navigation - right */}
            <div className={styles.headerSection}>
              <div
                className={styles.headerValue}
                aria-live="polite"
                aria-atomic="true"
              >
                {formatYear(visibleMonth)}
              </div>

              <div className={styles.navigationButtons}>
                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Next year"
                  disabled={disabled || readOnly || nextYearDisabled}
                  onClick={() => moveYear(1)}
                >
                  <span aria-hidden="true">↑</span>
                </button>

                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Previous year"
                  disabled={disabled || readOnly || previousYearDisabled}
                  onClick={() => moveYear(-1)}
                >
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={styles.calendarGrid}
            role="grid"
            aria-label={formatMonthYear(visibleMonth)}
          >
            <div className={styles.weekdays} role="row">
              {weekdays.map((weekday, index) => (
                <div
                  key={`${weekday}-${index}`}
                  role="columnheader"
                  aria-label={
                    [
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ][index]
                  }
                  className={styles.weekday}
                >
                  {weekday}
                </div>
              ))}
            </div>

            {Array.from({ length: 6 }, (_, weekIndex) => (
              <div key={`week-${weekIndex}`} className={styles.week} role="row">
                {days
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((date, dayIndex) => {
                    const index = weekIndex * 7 + dayIndex;
                    const inVisibleMonth =
                      date.getMonth() === visibleMonth.getMonth();

                    const isStart = sameDay(date, range.startDate);
                    const isEnd = sameDay(date, range.endDate);

                    const inRange =
                      range.startDate !== null &&
                      range.endDate !== null &&
                      !isBefore(date, range.startDate) &&
                      !isAfter(date, range.endDate);

                    const isToday = sameDay(date, normalizeDate(new Date()));
                    const dateDisabled = isDateDisabled(date, minDate, maxDate);

                    const classNames = [
                      styles.dateButton,
                      !inVisibleMonth ? styles.outsideMonth : '',
                      inRange ? styles.inRange : '',
                      isStart ? styles.rangeStart : '',
                      isEnd ? styles.rangeEnd : '',
                      isToday ? styles.today : '',
                      dateDisabled ? styles.disabled : '',
                    ]
                      .filter(Boolean)
                      .join(' ');

                    return (
                      <div
                        key={toDateKey(date)}
                        role="gridcell"
                        aria-selected={inRange}
                        className={styles.dateCell}
                      >
                        <button
                          ref={(element) => {
                            dateButtonRefs.current[index] = element;
                          }}
                          type="button"
                          className={classNames}
                          aria-label={`${formatDateLabel(date)}${
                            isStart ? ', start date' : ''
                          }${isEnd ? ', end date' : ''}${
                            inRange && !isStart && !isEnd
                              ? ', within selected range'
                              : ''
                          }`}
                          aria-current={isToday ? 'date' : undefined}
                          tabIndex={sameDay(date, activeDate) ? 0 : -1}
                          disabled={dateDisabled}
                          onFocus={() => {
                            if (!sameDay(date, activeDate)) {
                              setActiveDate(date);
                            }
                          }}
                          onClick={() => {
                            monthNavigationRef.current = false;
                            selectDate(date);
                          }}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>

          <p className={styles.calendarHint}>
            {!range.startDate || range.endDate
              ? 'Select a start date.'
              : 'Select an end date.'}
          </p>
        </div>
      )}

      <p
        className={styles.srOnly}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </div>
  );
}
