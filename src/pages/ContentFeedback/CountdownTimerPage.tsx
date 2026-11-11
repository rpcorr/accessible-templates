import { PageLayout } from '../../components/PageLayout/PageLayout';
import { CountdownTimerExamples } from '../../components/ContentFeedback/CountdownTimer/Examples/CountdownTimerExamples';

export function CountdownTimerPage() {
  return (
    <PageLayout title="Countdown Timer">
      <p>
        An accessible countdown timer that displays the remaining days, hours,
        minutes, and seconds until a specified date and time. Supports custom
        labels and completion messages.
      </p>

      <p>
        <strong>Accessibility target:</strong> Designed and tested with WCAG 2.2
        Level AA accessibility requirements in mind.
      </p>

      <div className="stack">
        <h3>Accessibility</h3>

        <p>
          The Countdown Timer uses a semantic section with an accessible name
          provided by its heading. This helps screen reader users identify the
          purpose of the countdown.
        </p>

        <p>
          A separate polite live region announces when the countdown starts,
          including its initial remaining time. It also provides periodic
          updates without announcing every second. This helps prevent excessive
          announcements while keeping screen reader users informed.
        </p>

        <p>
          When the countdown reaches zero, the live region announces the
          completion message. The timer also displays the completion message
          visually while preserving the section's accessible name and heading.
        </p>

        <h3>Keyboard Support</h3>

        <p>
          The Countdown Timer does not introduce interactive controls and
          therefore does not require additional keyboard interaction. Its
          content remains available through normal reading and navigation.
        </p>
      </div>

      <h3>Examples</h3>

      <CountdownTimerExamples />
    </PageLayout>
  );
}
