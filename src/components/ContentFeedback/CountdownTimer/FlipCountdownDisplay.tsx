import { useEffect, useState } from 'react';
import type { CountdownTime } from './countdownUtils';
import styles from './FlipCountdownDisplay.module.css';

type FlipCountdownDisplayProps = {
  timeRemaining: CountdownTime;
};

type FlipDigitProps = {
  value: number;
};

function FlipDigit({ value }: FlipDigitProps) {
  const [displayedValue, setDisplayedValue] = useState(value);

  const isFlipping = value !== displayedValue;

  useEffect(() => {
    if (!isFlipping) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setDisplayedValue(value);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [value, isFlipping]);

  return (
    <div className={styles.flipCard} aria-hidden="true">
      <div className={styles.top}>{displayedValue}</div>
      <div className={styles.bottom}>{displayedValue}</div>

      {isFlipping && (
        <>
          <div className={styles.topFlip}>{displayedValue}</div>
          <div className={styles.bottomFlip}>{value}</div>
        </>
      )}
    </div>
  );
}

type CountdownUnitProps = {
  label: string;
  value: number;
  digits: number;
};

function CountdownUnit({ label, value, digits }: CountdownUnitProps) {
  const formattedValue = String(value).padStart(digits, '0');

  return (
    <div className={styles.containerSegment}>
      <span className={styles.segmentTitle}>{label}</span>

      <div className={styles.segment}>
        {formattedValue.split('').map((digit, index) => (
          <FlipDigit key={`${label}-${index}`} value={Number(digit)} />
        ))}
      </div>
    </div>
  );
}

export function FlipCountdownDisplay({
  timeRemaining,
}: FlipCountdownDisplayProps) {
  const dayDigits = String(timeRemaining.days).length > 2 ? 3 : 2;

  return (
    <div className={styles.container} aria-hidden="true">
      <CountdownUnit
        label="Days"
        value={timeRemaining.days}
        digits={dayDigits}
      />

      <CountdownUnit label="Hours" value={timeRemaining.hours} digits={2} />

      <CountdownUnit label="Minutes" value={timeRemaining.minutes} digits={2} />

      <CountdownUnit label="Seconds" value={timeRemaining.seconds} digits={2} />
    </div>
  );
}
