import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  label: string;
  name: string;
  value?: Date | null;
  defaultValue?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
  error?: string;
  onChange?: (date: Date | null) => void;
}

const formatDate = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const parseDate = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const formatMonth = (date: Date): string =>
  new Intl.DateTimeFormat('en-CA', {
    month: 'long',
  }).format(date);

const formatShortMonth = (date: Date): string =>
  new Intl.DateTimeFormat('en-CA', {
    month: 'short',
  }).format(date);

const formatYear = (date: Date): string => String(date.getFullYear());

const formatMonthYear = (date: Date): string =>
  new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    year: 'numeric',
  }).format(date);

const isSameDay = (first: Date | null, second: Date | null): boolean => {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const isBefore = (first: Date, second: Date): boolean =>
  first.getTime() < second.getTime();

const isAfter = (first: Date, second: Date): boolean =>
  first.getTime() > second.getTime();

const isToday = (date: Date): boolean => isSameDay(date, new Date());

const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  if (minDate && isBefore(date, minDate)) {
    return true;
  }

  if (maxDate && isAfter(date, maxDate)) {
    return true;
  }

  return false;
};

const findEnabledDate = (
  date: Date,
  direction: number,
  minDate?: Date,
  maxDate?: Date,
): Date => {
  const nextDate = new Date(date);

  for (let index = 0; index < 3660; index += 1) {
    if (!isDateDisabled(nextDate, minDate, maxDate)) {
      return nextDate;
    }

    nextDate.setDate(nextDate.getDate() + direction);
  }

  return date;
};

const clampDate = (date: Date, minDate?: Date, maxDate?: Date): Date => {
  if (minDate && isBefore(date, minDate)) {
    return new Date(minDate);
  }

  if (maxDate && isAfter(date, maxDate)) {
    return new Date(maxDate);
  }

  return date;
};

const getInitialDate = (
  value?: Date | null,
  defaultValue?: Date | null,
  minDate?: Date,
  maxDate?: Date,
): Date => {
  const selectedDate = value ?? defaultValue ?? new Date();

  return clampDate(selectedDate, minDate, maxDate);
};

const getInitialInputValue = (
  value?: Date | null,
  defaultValue?: Date | null,
): string => formatDate(value ?? defaultValue ?? null);

const getMonthDate = (date: Date, monthOffset: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);

/**
 * Returns the enabled date in a month closest to the preferred day.
 * Returns null when the month contains no selectable dates.
 */
const getEnabledDateInMonth = (
  month: Date,
  preferredDay: number,
  minDate?: Date,
  maxDate?: Date,
): Date | null => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  let closestDate: Date | null = null;
  let smallestDistance = Infinity;

  for (let day = 1; day <= daysInMonth; day += 1) {
    const candidate = new Date(year, monthIndex, day);

    if (isDateDisabled(candidate, minDate, maxDate)) {
      continue;
    }

    const distance = Math.abs(day - preferredDay);

    if (distance < smallestDistance) {
      closestDate = candidate;
      smallestDistance = distance;
    }
  }

  return closestDate;
};

/**
 * Returns the enabled date in a year closest to the preferred month and day.
 * This also handles dates such as February 29 in non-leap years.
 */
const getEnabledDateInYear = (
  year: number,
  preferredMonth: number,
  preferredDay: number,
  minDate?: Date,
  maxDate?: Date,
): Date | null => {
  const preferredDate = new Date(
    year,
    preferredMonth,
    Math.min(preferredDay, new Date(year, preferredMonth + 1, 0).getDate()),
  );

  let closestDate: Date | null = null;
  let smallestDistance = Infinity;

  for (let month = 0; month < 12; month += 1) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day += 1) {
      const candidate = new Date(year, month, day);

      if (isDateDisabled(candidate, minDate, maxDate)) {
        continue;
      }

      const distance = Math.abs(candidate.getTime() - preferredDate.getTime());

      if (distance < smallestDistance) {
        closestDate = candidate;
        smallestDistance = distance;
      }
    }
  }

  return closestDate;
};

const getCalendarDays = (month: Date): Date[] => {
  const firstDayOfMonth = startOfMonth(month);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const firstCalendarDate = new Date(firstDayOfMonth);
  firstCalendarDate.setDate(firstCalendarDate.getDate() - firstDayOfWeek);

  const days: Date[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(firstCalendarDate);
    date.setDate(firstCalendarDate.getDate() + index);
    days.push(date);
  }

  return days;
};

const getDateLabel = (date: Date): string =>
  new Intl.DateTimeFormat('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const getWeekdayLabels = (): string[] => [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function DatePicker({
  label,
  name,
  value,
  defaultValue = null,
  minDate,
  maxDate,
  required = false,
  disabled = false,
  readOnly = false,
  description,
  error,
  onChange,
}: DatePickerProps) {
  const generatedId = useId();

  const inputId = `${generatedId}-input`;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const calendarId = `${generatedId}-calendar`;

  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dateButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);

  const selectedDate = isControlled ? (value ?? null) : internalValue;

  const [inputValue, setInputValue] = useState<string>(
    getInitialInputValue(value, defaultValue),
  );

  const [isOpen, setIsOpen] = useState(false);

  const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
    startOfMonth(getInitialDate(value, defaultValue, minDate, maxDate)),
  );

  const [focusedDate, setFocusedDate] = useState<Date>(() =>
    getInitialDate(value, defaultValue, minDate, maxDate),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dateKey = formatDate(focusedDate);
    dateButtonRefs.current[dateKey]?.focus();
  }, [focusedDate, isOpen]);

  const describedBy =
    [description ? descriptionId : '', error ? errorId : '']
      .filter(Boolean)
      .join(' ') || undefined;

  const moveFocus = (days: number) => {
    setFocusedDate((current) => {
      const direction = days < 0 ? -1 : 1;
      const nextDate = new Date(current);

      nextDate.setDate(nextDate.getDate() + days);

      const enabledDate = findEnabledDate(
        nextDate,
        direction,
        minDate,
        maxDate,
      );

      setVisibleMonth(startOfMonth(enabledDate));

      return enabledDate;
    });
  };

  const updateValue = (date: Date | null) => {
    if (!isControlled) {
      setInternalValue(date);
    }

    setInputValue(formatDate(date));
    onChange?.(date);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setInputValue(nextValue);

    if (nextValue.length !== 10) {
      return;
    }

    const parsedDate = parseDate(nextValue);

    if (!parsedDate) {
      return;
    }

    if (isDateDisabled(parsedDate, minDate, maxDate)) {
      return;
    }

    updateValue(parsedDate);
    setVisibleMonth(startOfMonth(parsedDate));
    setFocusedDate(parsedDate);
  };

  const handleInputBlur = () => {
    if (!inputValue) {
      updateValue(null);
      return;
    }

    const parsedDate = parseDate(inputValue);

    if (!parsedDate) {
      setInputValue(formatDate(selectedDate));
    }
  };

  const handleCalendarButtonClick = () => {
    if (disabled || readOnly) {
      return;
    }

    setIsOpen((current) => !current);
  };

  const handlePreviousMonth = () => {
    const previousMonth = getMonthDate(visibleMonth, -1);
    const targetDate = getEnabledDateInMonth(
      previousMonth,
      focusedDate.getDate(),
      minDate,
      maxDate,
    );

    if (!targetDate) {
      return;
    }

    setVisibleMonth(startOfMonth(targetDate));
  };

  const handleNextMonth = () => {
    const nextMonth = getMonthDate(visibleMonth, 1);
    const targetDate = getEnabledDateInMonth(
      nextMonth,
      focusedDate.getDate(),
      minDate,
      maxDate,
    );

    if (!targetDate) {
      return;
    }

    setVisibleMonth(startOfMonth(targetDate));
  };

  const handlePreviousYear = () => {
    const targetDate = getEnabledDateInYear(
      visibleMonth.getFullYear() - 1,
      focusedDate.getMonth(),
      focusedDate.getDate(),
      minDate,
      maxDate,
    );

    if (!targetDate) {
      return;
    }

    setVisibleMonth(startOfMonth(targetDate));
  };

  const handleNextYear = () => {
    const targetDate = getEnabledDateInYear(
      visibleMonth.getFullYear() + 1,
      focusedDate.getMonth(),
      focusedDate.getDate(),
      minDate,
      maxDate,
    );

    if (!targetDate) {
      return;
    }

    setVisibleMonth(startOfMonth(targetDate));
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date, minDate, maxDate)) {
      return;
    }

    setFocusedDate(date);
    updateValue(date);
    setVisibleMonth(startOfMonth(date));
    setIsOpen(false);

    requestAnimationFrame(() => {
      calendarButtonRef.current?.focus();
    });
  };

  const handleCalendarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus(-1);
        break;

      case 'ArrowRight':
        event.preventDefault();
        moveFocus(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        moveFocus(-7);
        break;

      case 'ArrowDown':
        event.preventDefault();
        moveFocus(7);
        break;

      case 'Home':
        event.preventDefault();
        setFocusedDate((current) => {
          const nextDate = new Date(current);
          nextDate.setDate(current.getDate() - current.getDay());

          const enabledDate = findEnabledDate(nextDate, 1, minDate, maxDate);

          setVisibleMonth(startOfMonth(enabledDate));

          return enabledDate;
        });
        break;

      case 'End':
        event.preventDefault();
        setFocusedDate((current) => {
          const nextDate = new Date(current);
          nextDate.setDate(current.getDate() + (6 - current.getDay()));

          const enabledDate = findEnabledDate(nextDate, -1, minDate, maxDate);

          setVisibleMonth(startOfMonth(enabledDate));

          return enabledDate;
        });
        break;

      case 'PageUp':
        event.preventDefault();
        setFocusedDate((current) => {
          const nextDate = new Date(
            current.getFullYear() + (event.shiftKey ? -1 : 0),
            current.getMonth() + (event.shiftKey ? 0 : -1),
            current.getDate(),
          );

          const enabledDate = findEnabledDate(nextDate, -1, minDate, maxDate);

          setVisibleMonth(startOfMonth(enabledDate));

          return enabledDate;
        });
        break;

      case 'PageDown':
        event.preventDefault();
        setFocusedDate((current) => {
          const nextDate = new Date(
            current.getFullYear() + (event.shiftKey ? 1 : 0),
            current.getMonth() + (event.shiftKey ? 0 : 1),
            current.getDate(),
          );

          const enabledDate = findEnabledDate(nextDate, 1, minDate, maxDate);

          setVisibleMonth(startOfMonth(enabledDate));

          return enabledDate;
        });
        break;

      case 'Enter':
      case ' ':
        if (!(event.target instanceof HTMLButtonElement)) {
          return;
        }

        if (!event.target.classList.contains(styles.dateButton)) {
          return;
        }

        event.preventDefault();

        if (!isDateDisabled(focusedDate, minDate, maxDate)) {
          handleDateSelect(focusedDate);
        }

        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);

        requestAnimationFrame(() => {
          calendarButtonRef.current?.focus();
        });

        break;

      default:
        break;
    }
  };

  const previousMonthDate = getEnabledDateInMonth(
    getMonthDate(visibleMonth, -1),
    focusedDate.getDate(),
    minDate,
    maxDate,
  );

  const nextMonthDate = getEnabledDateInMonth(
    getMonthDate(visibleMonth, 1),
    focusedDate.getDate(),
    minDate,
    maxDate,
  );

  const previousYearDate = getEnabledDateInYear(
    visibleMonth.getFullYear() - 1,
    focusedDate.getMonth(),
    focusedDate.getDate(),
    minDate,
    maxDate,
  );

  const nextYearDate = getEnabledDateInYear(
    visibleMonth.getFullYear() + 1,
    focusedDate.getMonth(),
    focusedDate.getDate(),
    minDate,
    maxDate,
  );

  const calendarDays = getCalendarDays(visibleMonth);
  const weekdayLabels = getWeekdayLabels();

  return (
    <div className={styles.datePicker}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            {' '}
            *
          </span>
        )}
      </label>

      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          value={inputValue}
          placeholder="YYYY-MM-DD"
          minLength={10}
          maxLength={10}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={styles.input}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />

        <button
          ref={calendarButtonRef}
          type="button"
          className={styles.calendarButton}
          aria-label={`${isOpen ? 'Close' : 'Open'} calendar for ${label}`}
          aria-expanded={isOpen}
          aria-controls={calendarId}
          disabled={disabled || readOnly}
          onClick={handleCalendarButtonClick}
        >
          <span aria-hidden="true">📅</span>
        </button>
      </div>

      {description && (
        <div id={descriptionId} className={styles.description}>
          {description}
        </div>
      )}

      {error && (
        <div id={errorId} className={styles.error} role="alert">
          {error}
        </div>
      )}

      {isOpen && (
        <div
          id={calendarId}
          className={styles.calendar}
          aria-label={`${label} calendar`}
          onKeyDown={handleCalendarKeyDown}
        >
          <div className={styles.calendarHeader}>
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
                  disabled={!nextMonthDate}
                  onClick={handleNextMonth}
                >
                  <span aria-hidden="true">↑</span>
                </button>

                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Previous month"
                  disabled={!previousMonthDate}
                  onClick={handlePreviousMonth}
                >
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>

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
                  disabled={!nextYearDate}
                  onClick={handleNextYear}
                >
                  <span aria-hidden="true">↑</span>
                </button>

                <button
                  type="button"
                  className={styles.monthButton}
                  aria-label="Previous year"
                  disabled={!previousYearDate}
                  onClick={handlePreviousYear}
                >
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={styles.calendarGrid}
            role="grid"
            aria-label={`${formatMonthYear(visibleMonth)} calendar`}
          >
            <div role="row" className={styles.weekdayRow}>
              {weekdayLabels.map((weekday) => (
                <div
                  key={weekday}
                  role="columnheader"
                  className={styles.weekday}
                  aria-label={weekday}
                >
                  {weekday.slice(0, 2)}
                </div>
              ))}
            </div>

            {Array.from({ length: 6 }, (_, weekIndex) => {
              const week = calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7);

              return (
                <div
                  key={`week-${weekIndex}`}
                  role="row"
                  className={styles.weekRow}
                >
                  {week.map((date) => {
                    const isCurrentMonth =
                      date.getMonth() === visibleMonth.getMonth();

                    const selected = isSameDay(date, selectedDate);
                    const today = isToday(date);
                    const dateDisabled = isDateDisabled(date, minDate, maxDate);
                    const isFocused = isSameDay(date, focusedDate);

                    return (
                      <div
                        key={formatDate(date)}
                        role="gridcell"
                        aria-selected={selected}
                        className={styles.dateCell}
                      >
                        <button
                          ref={(element) => {
                            dateButtonRefs.current[formatDate(date)] = element;
                          }}
                          type="button"
                          tabIndex={isFocused ? 0 : -1}
                          aria-label={getDateLabel(date)}
                          aria-current={today ? 'date' : undefined}
                          disabled={dateDisabled}
                          className={[
                            styles.dateButton,
                            !isCurrentMonth ? styles.outsideMonth : '',
                            selected ? styles.selected : '',
                            today ? styles.today : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onFocus={() => setFocusedDate(date)}
                          onClick={() => handleDateSelect(date)}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
