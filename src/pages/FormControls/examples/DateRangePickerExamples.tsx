import { useState, useRef } from 'react';
import { DateRangePicker } from '../../../components/FormControls/DatePickers/DateRangePicker/DateRangePicker';
import { Tabs } from '../../../components/ContentFeedback/Tab';

type DateRangeSelection = {
  startDate: Date | null;
  endDate: Date | null;
};

export function DateRangePickerExamples() {
  const [selectedRange, setSelectedRange] = useState<DateRangeSelection>({
    startDate: new Date(2026, 8, 10),
    endDate: new Date(2026, 8, 20),
  });

  const [appointmentRange, setAppointmentRange] = useState<DateRangeSelection>({
    startDate: null,
    endDate: null,
  });

  const [appointmentError, setAppointmentError] = useState<
    string | undefined
  >();

  const validateAppointmentRange = () => {
    const { startDate, endDate } = appointmentRange;

    if (!startDate || !endDate) {
      setAppointmentError('Please select both a start date and an end date.');

      if (!startDate) {
        appointmentStartRef.current?.focus();
      } else {
        appointmentEndRef.current?.focus();
      }

      return;
    }

    const minDate = new Date(2026, 8, 1);
    const maxDate = new Date(2026, 8, 30);

    if (startDate < minDate || endDate > maxDate) {
      setAppointmentError(
        'Please select a date range between September 1 and September 30, 2026.',
      );
      return;
    }

    if (endDate < startDate) {
      setAppointmentError('The end date must be on or after the start date.');
      return;
    }

    setAppointmentError(undefined);
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString('en-CA') : 'None';

  const appointmentStartRef = useRef<HTMLInputElement>(null);
  const appointmentEndRef = useRef<HTMLInputElement>(null);

  return (
    <Tabs
      tabs={[
        {
          id: 'basic-selection',
          label: 'Basic & Selection',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Date Range Picker</h4>

                <DateRangePicker
                  label="Select a date range"
                  name="basicRange"
                />
              </div>

              <div>
                <h4>Default Value</h4>

                <DateRangePicker
                  label="Event date range"
                  name="defaultRange"
                  defaultValue={{
                    startDate: new Date(2026, 8, 10),
                    endDate: new Date(2026, 8, 20),
                  }}
                />
              </div>

              <div>
                <h4>Controlled Date Range Picker</h4>

                <DateRangePicker
                  label="Choose a date range"
                  name="controlledRange"
                  value={selectedRange}
                  onChange={setSelectedRange}
                />

                <p>Start date: {formatDate(selectedRange.startDate)}</p>
                <p>End date: {formatDate(selectedRange.endDate)}</p>
              </div>

              <div>
                <h4>Optional Date Range</h4>

                <DateRangePicker
                  label="Optional date range"
                  name="optionalRange"
                  description="Choose a date range if one is applicable."
                />
              </div>
            </div>
          ),
        },
        {
          id: 'states-constraints',
          label: 'States & Constraints',
          content: (
            <div className="stack">
              <div>
                <h4>Minimum Date</h4>

                <DateRangePicker
                  label="Date range starting no earlier than September 1"
                  name="minimumRange"
                  minDate={new Date(2026, 8, 1)}
                  description="Dates before September 1, 2026 are unavailable."
                />
              </div>

              <div>
                <h4>Minimum Date — Today Onward</h4>

                <DateRangePicker
                  label="Travel dates"
                  name="travelDates"
                  minDate={new Date()}
                  description="Choose a travel date range starting today or later. Past dates are unavailable."
                />
              </div>

              <div>
                <h4>Maximum Date</h4>

                <DateRangePicker
                  label="Date range ending by October 31"
                  name="maximumRange"
                  maxDate={new Date(2026, 9, 31)}
                  description="Dates after October 31, 2026 are unavailable."
                />
              </div>

              <div>
                <h4>Restricted Date Range</h4>

                <DateRangePicker
                  label="September booking range"
                  name="restrictedRange"
                  minDate={new Date(2026, 8, 1)}
                  maxDate={new Date(2026, 8, 30)}
                  description="Choose dates between September 1 and September 30, 2026."
                />
              </div>

              <div>
                <h4>Required</h4>

                <DateRangePicker
                  label="Required date range"
                  name="requiredRange"
                  required
                />
              </div>

              <div>
                <h4>Disabled</h4>

                <DateRangePicker
                  label="Unavailable date range"
                  name="disabledRange"
                  defaultValue={{
                    startDate: new Date(2026, 8, 10),
                    endDate: new Date(2026, 8, 20),
                  }}
                  disabled
                />
              </div>

              <div>
                <h4>Read Only</h4>

                <DateRangePicker
                  label="Read-only date range"
                  name="readOnlyRange"
                  defaultValue={{
                    startDate: new Date(2026, 8, 10),
                    endDate: new Date(2026, 8, 20),
                  }}
                  readOnly
                />
              </div>
            </div>
          ),
        },
        {
          id: 'description-errors',
          label: 'Description & Errors',
          content: (
            <div className="stack">
              <div>
                <h4>With Description</h4>

                <DateRangePicker
                  label="Conference date range"
                  name="describedRange"
                  description="Enter dates in YYYY-MM-DD format or select dates from the calendar."
                />
              </div>

              <div>
                <h4>With Error</h4>

                <DateRangePicker
                  label="Date range with an error"
                  name="errorRange"
                  error="Please select a valid start date and end date."
                />
              </div>

              <div>
                <h4>Interactive Validation</h4>

                <DateRangePicker
                  label="Appointment date range"
                  name="appointmentRange"
                  value={appointmentRange}
                  minDate={new Date(2026, 8, 1)}
                  maxDate={new Date(2026, 8, 30)}
                  description="Choose an appointment range between September 1 and September 30, 2026."
                  error={appointmentError}
                  required
                  startDateInputRef={appointmentStartRef}
                  endDateInputRef={appointmentEndRef}
                  onChange={(range) => {
                    setAppointmentRange(range);
                    setAppointmentError(undefined);
                  }}
                />
                <button type="button" onClick={validateAppointmentRange}>
                  Validate date range
                </button>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
