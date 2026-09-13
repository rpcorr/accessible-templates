import styles from './LoadingSpinner.module.css';

export type LoadingSpinnerVariant =
  | 'spinner'
  | 'dots'
  | 'pulse'
  | 'bars'
  | 'orbit'
  | 'comet';

export type LoadingSpinnerSize = 'small' | 'medium' | 'large';

export type LoadingSpinnerColour =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

interface LoadingSpinnerProps {
  label?: string;
  showLabel?: boolean;
  variant?: LoadingSpinnerVariant;
  size?: LoadingSpinnerSize;
  colour?: LoadingSpinnerColour;
}

const LoadingSpinner = ({
  label = 'Loading',
  showLabel = false,
  variant = 'spinner',
  size = 'medium',
  colour = 'default',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${styles[colour]}`}
      role="status"
    >
      {variant === 'spinner' && (
        <span className={styles.visual} aria-hidden="true" />
      )}

      {variant === 'dots' && (
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}

      {variant === 'pulse' && (
        <span className={styles.pulse} aria-hidden="true" />
      )}

      {variant === 'bars' && (
        <span className={styles.bars} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}

      {variant === 'orbit' && (
        <span className={styles.orbit} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      )}

      {variant === 'comet' && (
        <span className={styles.comet} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      )}

      {showLabel ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <span className={styles.visuallyHidden}>{label}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;
