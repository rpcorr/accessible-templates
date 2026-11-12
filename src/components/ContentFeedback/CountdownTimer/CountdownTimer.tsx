import { useEffect, useId, useState } from 'react';
import { getTimeRemaining, type CountdownTime } from './countdownUtils';
import { FlipCountdownDisplay } from './FlipCountdownDisplay';
import styles from './CountdownTimer.module.css';

export type CountdownTimerProps = {
  targetDate: string | Date;
  label?: string;
  completionMessage?: string;
  variant?: 'standard' | 'flip';
};

export function CountdownTimer(props: CountdownTimerProps) {
  return <CountdownTimerDisplay key={String(props.targetDate)} {...props} />;
}

function formatCountdownAnnouncement(time: CountdownTime): string {
  const units = [
    { label: 'day', value: time.days },
    { label: 'hour', value: time.hours },
    { label: 'minute', value: time.minutes },
    { label: 'second', value: time.seconds },
  ];

  const remaining = units
    .filter((unit) => unit.value > 0)
    .map((unit) => `${unit.value} ${unit.label}${unit.value === 1 ? '' : 's'}`);

  return remaining.length > 0
    ? `${remaining.join(', ')} remaining.`
    : 'Less than a second remaining.';
}

function CountdownTimerDisplay({
  targetDate,
  label = 'Time remaining',
  completionMessage = 'The countdown has ended.',
  variant = 'standard',
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<CountdownTime | null>(() =>
    getTimeRemaining(targetDate),
  );

  const [announcement, setAnnouncement] = useState('');
  const headingId = useId();

  useEffect(() => {
    const initialTime = getTimeRemaining(targetDate);

    if (!initialTime) {
      return;
    }

    let lastAnnouncementTime = Date.now();

    const announcementTimeout = window.setTimeout(() => {
      setAnnouncement(
        initialTime.isComplete
          ? completionMessage
          : `Countdown timer started. ${formatCountdownAnnouncement(initialTime)}`,
      );
    }, 500);

    if (initialTime.isComplete) {
      return () => window.clearTimeout(announcementTimeout);
    }

    const intervalId = window.setInterval(() => {
      const nextTime = getTimeRemaining(targetDate);

      setTimeRemaining(nextTime);

      if (!nextTime || nextTime.isComplete) {
        window.clearTimeout(announcementTimeout);

        if (nextTime?.isComplete) {
          setAnnouncement(completionMessage);
        }

        window.clearInterval(intervalId);
        return;
      }

      const elapsed = Date.now() - lastAnnouncementTime;
      const remainingMilliseconds = new Date(targetDate).getTime() - Date.now();

      const announcementInterval =
        remainingMilliseconds <= 60_000 ? 15_000 : 300_000;

      if (elapsed >= announcementInterval) {
        setAnnouncement(
          `Countdown timer update. ${formatCountdownAnnouncement(nextTime)}`,
        );

        lastAnnouncementTime = Date.now();
      }
    }, 1000);

    return () => {
      window.clearTimeout(announcementTimeout);
      window.clearInterval(intervalId);
    };
  }, [targetDate, completionMessage]);

  if (!timeRemaining) {
    return null;
  }

  return (
    <section className={styles.countdown} aria-labelledby={headingId}>
      <h2 id={headingId}>{label}</h2>

      {timeRemaining.isComplete ? (
        <p>{completionMessage}</p>
      ) : variant === 'flip' ? (
        <FlipCountdownDisplay timeRemaining={timeRemaining} />
      ) : (
        <div className={styles.timeUnits} role="timer">
          {[
            { label: 'Days', value: timeRemaining.days },
            { label: 'Hours', value: timeRemaining.hours },
            { label: 'Minutes', value: timeRemaining.minutes },
            { label: 'Seconds', value: timeRemaining.seconds },
          ].map((unit) => (
            <div className={styles.timeUnit} key={unit.label}>
              <span className={styles.value}>
                {String(unit.value).padStart(2, '0')}
              </span>

              <span className={styles.unitLabel}>{unit.label}</span>
            </div>
          ))}
        </div>
      )}

      <div
        className={styles.srOnly}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
    </section>
  );
}
