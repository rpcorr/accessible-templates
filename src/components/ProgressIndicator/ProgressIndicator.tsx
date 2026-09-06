import type { CSSProperties, ReactNode } from 'react';
import styles from './ProgressIndicator.module.css';

export type ProgressIndicatorVariant = 'linear' | 'circular' | 'icon' | 'fill';

export type ProgressIndicatorColour =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

interface ProgressIndicatorProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressIndicatorVariant;
  colour?: ProgressIndicatorColour;
  wavy?: boolean;
  icon?: ReactNode;
}

const ProgressIndicator = ({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'linear',
  colour = 'default',
  wavy = false,
  icon,
}: ProgressIndicatorProps) => {
  const isDeterminate = value !== undefined;
  const percentage = isDeterminate
    ? Math.min(Math.max((value / max) * 100, 0), 100)
    : undefined;
  const accessibleLabel = label || 'Progress';
  if (variant === 'icon') {
    return (
      <div className={styles.iconContainer}>
        {label && <span className={styles.iconLabel}>{label}</span>}
        <div
          className={styles.iconProgress}
          role="progressbar"
          aria-label={accessibleLabel}
          aria-valuemin={0}
          aria-valuemax={max}
          {...(isDeterminate ? { 'aria-valuenow': value } : {})}
        >
          {showValue && isDeterminate && (
            <div className={styles.iconValue}>
              {Math.round(percentage ?? 0)}%
            </div>
          )}
          <div className={styles.iconTrack}>
            <div
              className={`${styles.iconBar} ${styles[colour]}`}
              style={
                isDeterminate
                  ? ({ '--progress': `${percentage}%` } as CSSProperties)
                  : undefined
              }
            />
          </div>
          {icon && (
            <div
              className={styles.progressIcon}
              style={
                isDeterminate
                  ? ({ '--progress': `${percentage}%` } as CSSProperties)
                  : undefined
              }
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
  if (variant === 'fill') {
    return (
      <div className={styles.fillContainer}>
        {label && <span className={styles.fillLabel}>{label}</span>}
        <div
          className={styles.fillProgress}
          role="progressbar"
          aria-label={accessibleLabel}
          aria-valuemin={0}
          aria-valuemax={max}
          {...(isDeterminate ? { 'aria-valuenow': value } : {})}
        >
          {showValue && isDeterminate && (
            <div className={styles.fillValue}>
              {Math.round(percentage ?? 0)}%
            </div>
          )}
          <div className={styles.fillShape}>
            <div
              className={`${styles.fillLevel} ${styles[colour]} ${wavy ? styles.wavy : ''}`}
              style={
                isDeterminate
                  ? ({ '--progress': `${percentage}%` } as CSSProperties)
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    );
  }
  if (variant === 'circular') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((percentage ?? 0) / 100) * circumference;
    return (
      <div className={styles.circularContainer}>
        {label && <span className={styles.circularLabel}>{label}</span>}
        <div
          className={styles.circularProgress}
          role="progressbar"
          aria-label={accessibleLabel}
          aria-valuemin={0}
          aria-valuemax={max}
          {...(isDeterminate ? { 'aria-valuenow': value } : {})}
        >
          <svg
            className={styles.circularSvg}
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              className={styles.circularTrack}
              cx="50"
              cy="50"
              r={radius}
            />
            <circle
              className={`${styles.circularBar} ${styles[colour]} ${!isDeterminate ? styles.circularIndeterminate : ''}`}
              cx="50"
              cy="50"
              r={radius}
              style={
                isDeterminate
                  ? ({
                      '--circumference': circumference,
                      '--offset': offset,
                    } as CSSProperties)
                  : undefined
              }
            />
          </svg>
          {showValue && isDeterminate && (
            <span className={styles.circularValue}>
              {Math.round(percentage ?? 0)}%
            </span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {label && (
        <div className={styles.label}>
          <span>{label}</span>
          {showValue && isDeterminate && (
            <span>{Math.round(percentage ?? 0)}%</span>
          )}
        </div>
      )}
      <div
        className={styles.progress}
        role="progressbar"
        aria-label={accessibleLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        {...(isDeterminate ? { 'aria-valuenow': value } : {})}
      >
        <div
          className={`${styles.bar} ${styles[colour]} ${wavy ? styles.wavy : ''} ${!isDeterminate ? styles.indeterminate : ''}`}
          style={
            isDeterminate
              ? ({ '--progress': `${percentage}%` } as CSSProperties)
              : undefined
          }
        />
      </div>
    </div>
  );
};
export default ProgressIndicator;
