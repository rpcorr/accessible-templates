import { useState } from 'react';
import DatePicker from '../../components/FormControls/DatePicker';
import { Tabs } from '../../components/ContentFeedback/Tab';

export function DatePickerExamples() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2026, 8, 25),
  );

  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [appointmentError, setAppointmentError] = useState<
    string | undefined
  >();

  const validateAppointmentDate = () => {
    if (!appointmentDate) {
      setAppointmentError('Please select an appointment date.');
      return;
    }

    const minDate = new Date(2026, 8, 1);
    const maxDate = new Date(2026, 8, 30);

    if (appointmentDate < minDate || appointmentDate > maxDate) {
      setAppointmentError(
        'Please select an appointment date between September 1 and September 30, 2026.',
      );
      return;
    }

    setAppointmentError(undefined);
  };

  return (
    <Tabs
      tabs={[
        {
          id: 'basic-selection',
          label: 'Basic & Selection',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Date Picker</h4>

                <DatePicker label="Select a date" name="basicDate" />
              </div>

              <div>
                <h4>Default Value</h4>

                <DatePicker
                  label="Event date"
                  name="eventDate"
                  defaultValue={new Date(2026, 8, 25)}
                />
              </div>

              <div>
                <h4>Controlled Date Picker</h4>

                <DatePicker
                  label="Choose a date"
                  name="controlledDate"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />

                <p>
                  Selected date:{' '}
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-CA')
                    : 'None'}
                </p>
              </div>

              <div>
                <h4>Empty Date</h4>

                <DatePicker
                  label="Optional date"
                  name="optionalDate"
                  description="Choose a date if one is applicable."
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

                <DatePicker
                  label="Start date"
                  name="minimumDate"
                  minDate={new Date(2026, 8, 1)}
                  description="Dates before September 1, 2026 are unavailable."
                />
              </div>

              <div>
                <h4>Maximum Date</h4>

                <DatePicker
                  label="Appointment date"
                  name="maximumDate"
                  maxDate={new Date(2026, 9, 31)}
                  description="Dates after October 31, 2026 are unavailable."
                />
              </div>

              <div>
                <h4>Date Range</h4>

                <DatePicker
                  label="Booking date"
                  name="bookingDate"
                  minDate={new Date(2026, 8, 1)}
                  maxDate={new Date(2026, 8, 30)}
                  description="Choose a date between September 1 and September 30, 2026."
                />
              </div>

              <div>
                <h4>Required</h4>

                <DatePicker label="Date of birth" name="dateOfBirth" required />
              </div>

              <div>
                <h4>Disabled</h4>

                <DatePicker
                  label="Unavailable date"
                  name="disabledDate"
                  defaultValue={new Date(2026, 8, 25)}
                  disabled
                />
              </div>

              <div>
                <h4>Read Only</h4>

                <DatePicker
                  label="Selected date"
                  name="readOnlyDate"
                  defaultValue={new Date(2026, 8, 25)}
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

                <DatePicker
                  label="Conference date"
                  name="conferenceDate"
                  description="Enter a date in YYYY-MM-DD format or select a date from the calendar."
                />
              </div>

              <div>
                <h4>With Error</h4>

                <DatePicker
                  label="Start date"
                  name="startDate"
                  error="Please select a valid start date."
                />
              </div>

              <div>
                <h4>Description and Error</h4>

                <DatePicker
                  label="Appointment date"
                  name="appointmentDate"
                  value={appointmentDate}
                  description="Choose an appointment date between September 1 and September 30, 2026."
                  error={appointmentError}
                  required
                  onChange={(date) => {
                    setAppointmentDate(date);
                    setAppointmentError(undefined);
                  }}
                />

                <button type="button" onClick={validateAppointmentDate}>
                  Validate
                </button>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
