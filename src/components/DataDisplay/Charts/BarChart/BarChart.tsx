import styles from './BarChart.module.css';

export interface BarChartData {
  label: string;
  value: number;
}

export interface BarChartProps {
  /**
   * Accessible title for the chart.
   */
  title: string;

  /**
   * Data values displayed in the chart.
   */
  data: BarChartData[];

  /**
   * Optional description providing additional context.
   */
  description?: string;

  /**
   * Optional label for the values.
   */
  valueLabel?: string;

  /**
   * Whether to display horizontal grid lines and a numerical axis.
   * Defaults to false.
   */
  showGridLines?: boolean;

  /**
   * Optional class name for custom styling.
   */
  className?: string;
}

const getNiceInterval = (maxValue: number): number => {
  const roughInterval = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughInterval || 1));
  const normalized = roughInterval / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;

  return 10 * magnitude;
};

export const BarChart = ({
  title,
  data,
  description,
  valueLabel,
  showGridLines = false,
  className,
}: BarChartProps) => {
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;
  const descriptionId = `${titleId}-description`;
  const tableCaption = `${title} data`;

  const maxValue = Math.max(...data.map((item) => item.value), 0);
  const interval = getNiceInterval(maxValue);
  const axisMax =
    maxValue > 0 ? Math.ceil(maxValue / interval) * interval : interval;

  const ticks = Array.from(
    { length: 5 },
    (_, index) => axisMax - index * (axisMax / 4),
  );

  return (
    <figure
      className={`${styles.container}${className ? ` ${className}` : ''}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <figcaption className={styles.caption}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>

        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}
      </figcaption>

      <div className={styles.chart}>
        {showGridLines && (
          <div className={styles.axis} aria-hidden="true">
            {ticks.map((tick) => (
              <span key={tick} className={styles.axisLabel}>
                {Number.isInteger(tick) ? tick : Number(tick.toFixed(2))}
              </span>
            ))}
          </div>
        )}

        <div className={styles.plotArea}>
          {showGridLines && (
            <div className={styles.gridLines} aria-hidden="true">
              {ticks.map((tick) => (
                <div key={tick} className={styles.gridLine} />
              ))}
            </div>
          )}

          <div className={styles.bars}>
            {data.map((item, index) => {
              const scaleMax = showGridLines ? axisMax : maxValue;
              const percentage =
                scaleMax > 0 ? (item.value / scaleMax) * 100 : 0;

              return (
                <div key={`${item.label}-${index}`} className={styles.barGroup}>
                  <div className={styles.barContainer}>
                    <div className={styles.valueRow}>
                      <span className={styles.value}>
                        {item.value}
                        {valueLabel && ` ${valueLabel}`}
                      </span>
                    </div>

                    <div className={styles.barArea}>
                      <div
                        className={styles.bar}
                        style={{ height: `${percentage}%` }}
                        role="presentation"
                      />
                    </div>
                  </div>

                  <span className={styles.label}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <table className={styles.visuallyHidden}>
        <caption>{tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">{valueLabel || 'Value'}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.label}-${index}`}>
              <th scope="row">{item.label}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};
