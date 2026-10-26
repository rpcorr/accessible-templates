import styles from './BarChart.module.css';
import type { CSSProperties } from 'react';

export interface BarChartData {
  label: string;
  value: number;
}

/**
 * A named dataset for grouped bar chart comparisons.
 */
export interface BarChartDataset {
  /**
   * Label identifying this dataset, such as a year.
   */
  label: string;

  /**
   * Numerical values corresponding to the chart categories.
   * Values must follow the same order as the categories in data.
   */
  values: number[];
}

export interface BarChartProps {
  /**
   * Accessible title for the chart.
   */
  title: string;

  /**
   * Categories and values for a standard single-series chart.
   */
  data: BarChartData[];

  /**
   * Optional datasets for grouped comparisons.
   * Each dataset must provide one value for every category in data.
   */
  datasets?: BarChartDataset[];

  /**
   * Optional description providing additional context.
   */
  description?: string;

  /**
   * Optional label for the values in a single-series chart.
   */
  valueLabel?: string;

  /**
   * Whether to display grid lines and a numerical axis.
   * Defaults to false.
   */
  showGridLines?: boolean;

  /**
   * Bar orientation. Defaults to vertical.
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Optional class name for custom styling.
   */
  className?: string;
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
   * Whether to display grid lines and a numerical axis.
   * Defaults to false.
   */
  showGridLines?: boolean;

  /**
   * Bar orientation. Defaults to vertical.
   */
  orientation?: 'vertical' | 'horizontal';

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
  datasets,
  description,
  valueLabel,
  showGridLines = false,
  orientation = 'vertical',
  className,
}: BarChartProps) => {
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;
  const descriptionId = `${titleId}-description`;
  const tableCaption = `${title} data`;

  const allValues = datasets
    ? datasets.flatMap((dataset) => dataset.values)
    : data.map((item) => item.value);

  const maxValue = Math.max(...allValues, 0);
  const interval = getNiceInterval(maxValue);
  const axisMax =
    maxValue > 0 ? Math.ceil(maxValue / interval) * interval : interval;

  const ticks = Array.from({ length: 5 }, (_, index) =>
    orientation === 'horizontal'
      ? index * (axisMax / 4)
      : axisMax - index * (axisMax / 4),
  );

  return (
    <figure
      className={`${styles.container}${className ? ` ${className}` : ''}`}
      data-orientation={orientation}
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

      {datasets && datasets.length > 0 && (
        <ul className={styles.legend} aria-label="Chart data series">
          {datasets.map((dataset, index) => (
            <li key={`${dataset.label}-${index}`} className={styles.legendItem}>
              <span className={styles.legendSwatch} aria-hidden="true" />
              <span>{dataset.label}</span>
            </li>
          ))}
        </ul>
      )}

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
            {datasets
              ? data.map((item, index) => {
                  const scaleMax = showGridLines ? axisMax : maxValue;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className={styles.barGroup}
                    >
                      {orientation === 'horizontal' && (
                        <span className={styles.label}>{item.label}</span>
                      )}

                      <div className={styles.barContainer}>
                        {datasets.map((dataset, datasetIndex) => {
                          const value = dataset.values[index] ?? 0;
                          const percentage =
                            scaleMax > 0 ? (value / scaleMax) * 100 : 0;

                          return (
                            <div
                              key={`${dataset.label}-${datasetIndex}`}
                              className={styles.barSeries}
                              style={
                                {
                                  '--bar-width': `${percentage}%`,
                                } as CSSProperties
                              }
                            >
                              <div className={styles.valueRow}>
                                <span className={styles.value}>
                                  {value}
                                  {valueLabel && ` ${valueLabel}`}
                                </span>
                              </div>

                              <div className={styles.barArea}>
                                <div
                                  className={styles.bar}
                                  style={
                                    orientation === 'horizontal'
                                      ? ({
                                          '--bar-width': `${percentage}%`,
                                          '--series-index': datasetIndex,
                                        } as CSSProperties)
                                      : ({
                                          height: `${percentage}%`,
                                          '--series-index': datasetIndex,
                                        } as CSSProperties)
                                  }
                                  role="presentation"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {orientation === 'vertical' && (
                        <span className={styles.label}>{item.label}</span>
                      )}
                    </div>
                  );
                })
              : data.map((item, index) => {
                  const scaleMax = showGridLines ? axisMax : maxValue;
                  const percentage =
                    scaleMax > 0 ? (item.value / scaleMax) * 100 : 0;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className={styles.barGroup}
                    >
                      {orientation === 'horizontal' && (
                        <span className={styles.label}>{item.label}</span>
                      )}

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
                            style={
                              orientation === 'horizontal'
                                ? ({
                                    '--bar-width': `${percentage}%`,
                                  } as CSSProperties)
                                : { height: `${percentage}%` }
                            }
                            role="presentation"
                          />
                        </div>
                      </div>

                      {orientation === 'vertical' && (
                        <span className={styles.label}>{item.label}</span>
                      )}
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
            {datasets && datasets.length > 0 ? (
              datasets.map((dataset, index) => (
                <th key={`${dataset.label}-${index}`} scope="col">
                  {dataset.label}
                </th>
              ))
            ) : (
              <th scope="col">{valueLabel || 'Value'}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.label}-${index}`}>
              <th scope="row">{item.label}</th>
              {datasets && datasets.length > 0 ? (
                datasets.map((dataset, datasetIndex) => (
                  <td key={`${dataset.label}-${datasetIndex}`}>
                    {dataset.values[index] ?? 0}
                  </td>
                ))
              ) : (
                <td>{item.value}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};
