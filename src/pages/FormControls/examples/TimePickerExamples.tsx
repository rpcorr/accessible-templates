import { useState } from 'react';
import { TimePicker } from '../../../components/FormControls/TimePicker';

export function TimePickerExamples() {
  const [controlledTime, setControlledTime] = useState('09:30');

  const [appointmentTime, setAppointmentTime] = useState('');

  const appointmentError =
    appointmentTime !== '' &&
    (appointmentTime < '09:00' || appointmentTime > '17:00')
      ? 'Please select a time between 9:00 AM and 5:00 PM.'
      : undefined;

  return (
    <section aria-labelledby="time-picker-examples-heading">
      <div>
        <h4>Basic time picker</h4>

        <TimePicker label="Start time" name="start-time" />
      </div>

      <div>
        <h4>Required input</h4>

        <TimePicker label="Meeting time" name="meeting-time" required />
      </div>

      <div>
        <h4>15-minute step</h4>

        <form>
          <TimePicker
            label="Appointment time"
            name="step-time"
            description="Enter a time in 15-minute increments."
            step={900}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h4>Validation</h4>

        <TimePicker
          label="Appointment time"
          name="validated-time"
          description="Appointments are available between 9:00 AM and 5:00 PM."
          value={appointmentTime}
          onChange={setAppointmentTime}
          error={appointmentError}
          min="09:00"
          max="17:00"
        />
      </div>

      <div>
        <h4>Disabled input</h4>

        <TimePicker
          label="Unavailable time"
          name="disabled-time"
          value="12:00"
          disabled
          onChange={() => undefined}
        />
      </div>

      <div>
        <h4>Read-only input</h4>

        <TimePicker
          label="Scheduled time"
          name="scheduled-time"
          value="14:30"
          readOnly
          onChange={() => undefined}
        />
      </div>

      <div>
        <h4>Controlled input</h4>

        <TimePicker
          label="Selected time"
          name="controlled-time"
          value={controlledTime}
          onChange={setControlledTime}
        />

        <p aria-live="polite">Current value: {controlledTime || 'empty'}</p>
      </div>
    </section>
  );
}
