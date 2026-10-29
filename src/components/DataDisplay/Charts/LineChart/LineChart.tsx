import { useId } from 'react';
import styles from './LineChart.module.css';

export interface LineChartData {
  label: string;
  value: number;
}

export interface LineChartDataset {
  /**
   * Label identifying this data series, such as a year.
   */
  label: string;

  /**
   * Numerical values corresponding to the categories in data.
   */
  values: number[];
}

export interface LineChartProps {
  /**
   * Accessible title for the chart.
   */
  title: string;

  /**
   * Category labels and values for a single-series chart.
   */
  data: LineChartData[];

  /**
   * Optional datasets for comparing multiple lines.
   * Each value corresponds to the category at the same index in data.
   */
  datasets?: LineChartDataset[];

  /**
   * Optional description providing additional context.
   */
  description?: string;

  /**
   * Optional unit or label appended to values in the data table.
   */
  valueLabel?: string;

  /**
   * Whether to display grid lines and a numerical axis.
   * Defaults to true for line charts.
   */
  showGridLines?: boolean;

  /**
   * Optional class name for custom styling.
   */
  className?: string;
}

const CHART_WIDTH = 800;
const CHART_HEIGHT = 320;
const PLOT_LEFT = 64;
const PLOT_RIGHT = 20;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 55;

const PLOT_WIDTH = CHART_WIDTH - PLOT_LEFT - PLOT_RIGHT;
const PLOT_HEIGHT = CHART_HEIGHT - PLOT_TOP - PLOT_BOTTOM;

const SERIES_STYLES = [
  styles.series1,
  styles.series2,
  styles.series3,
  styles.series4,
  styles.series5,
];

const LINE_STYLES = [
  styles.seriesLine1,
  styles.seriesLine2,
  styles.seriesLine3,
  styles.seriesLine4,
  styles.seriesLine5,
];

const getNiceInterval = (range: number): number => {
  const roughInterval = range / 4;

  if (!Number.isFinite(roughInterval) || roughInterval <= 0) {
    return 1;
  }

  const magnitude = 10 ** Math.floor(Math.log10(roughInterval));
  const normalized = roughInterval / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;

  return 10 * magnitude;
};

const formatNumber = (value: number): string => {
  if (Object.is(value, -0)) return '0';

  return Number.isInteger(value)
    ? String(value)
    : String(Number(value.toPrecision(6)));
};

const getSeriesValues = (
  data: LineChartData[],
  datasets?: LineChartDataset[],
) => {
  if (datasets && datasets.length > 0) {
    return datasets.map((dataset) =>
      data.map((_, index) => {
        const value = dataset.values[index];
        return Number.isFinite(value) ? value : null;
      }),
    );
  }

  return [
    data.map((item) => (Number.isFinite(item.value) ? item.value : null)),
  ];
};

const buildLineSegments = (
  values: (number | null)[],
  xPositions: number[],
  getY: (value: number) => number,
): string[] => {
  const segments: string[] = [];
  let currentSegment: string[] = [];

  values.forEach((value, index) => {
    if (value === null) {
      if (currentSegment.length > 0) {
        segments.push(currentSegment.join(' '));
        currentSegment = [];
      }

      return;
    }

    const command = currentSegment.length === 0 ? 'M' : 'L';
    currentSegment.push(`${command} ${xPositions[index]} ${getY(value)}`);
  });

  if (currentSegment.length > 0) {
    segments.push(currentSegment.join(' '));
  }

  return segments;
};

export const LineChart = ({
  title,
  data,
  datasets,
  description,
  valueLabel,
  showGridLines = true,
  className,
}: LineChartProps) => {
  const uniqueId = useId();
  const titleId = `${uniqueId}-title`;
  const descriptionId = `${uniqueId}-description`;
  const tableCaption = `${title} data`;

  const hasDatasets = Boolean(datasets && datasets.length > 0);

  const series = getSeriesValues(data, datasets);
  const allValues = series.flatMap((values) =>
    values.filter((value): value is number => value !== null),
  );

  const hasValidValues = allValues.length > 0;
  const rawMin = hasValidValues ? Math.min(...allValues) : 0;
  const rawMax = hasValidValues ? Math.max(...allValues) : 1;

  const fallbackRange = Math.max(Math.abs(rawMin) * 0.1, 1);
  const range = rawMax - rawMin || fallbackRange;
  const interval = getNiceInterval(range);

  const axisMin = Math.floor(rawMin / interval) * interval;
  const axisMax = Math.ceil(rawMax / interval) * interval;
  const safeAxisMax = axisMax > axisMin ? axisMax : axisMin + interval;

  const ticks = Array.from(
    { length: 5 },
    (_, index) => safeAxisMax - (index * (safeAxisMax - axisMin)) / 4,
  );

  const xPositions = data.map((_, index) =>
    data.length <= 1
      ? PLOT_LEFT + PLOT_WIDTH / 2
      : PLOT_LEFT + (index / (data.length - 1)) * PLOT_WIDTH,
  );

  const getY = (value: number) =>
    PLOT_TOP + ((safeAxisMax - value) / (safeAxisMax - axisMin)) * PLOT_HEIGHT;

  const accessibleLabel = hasValidValues
    ? 'Line chart. Category labels and numerical values are available in the accompanying data table.'
    : 'Line chart. No valid numerical data is available.';

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

      {hasDatasets && (
        <ul className={styles.legend} aria-label="Chart data series">
          {datasets!.map((dataset, index) => {
            const seriesStyle = SERIES_STYLES[index % SERIES_STYLES.length];

            return (
              <li
                key={`${dataset.label}-${index}`}
                className={styles.legendItem}
              >
                <span
                  aria-hidden="true"
                  className={`${styles.legendSwatch} ${seriesStyle}`}
                />
                <span>{dataset.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles.chart}>
        <div className={styles.chartInner}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            role="img"
            aria-label={accessibleLabel}
          >
            <title id={`${titleId}-svg-title`}>{title}</title>

            {showGridLines &&
              ticks.map((tick, index) => {
                const y = PLOT_TOP + (index / 4) * PLOT_HEIGHT;

                return (
                  <g key={`tick-${index}`}>
                    <line
                      className={styles.gridLine}
                      x1={PLOT_LEFT}
                      y1={y}
                      x2={CHART_WIDTH - PLOT_RIGHT}
                      y2={y}
                    />
                    <text
                      className={`${styles.axisLabel} ${styles.yAxisLabel}`}
                      x={PLOT_LEFT - 10}
                      y={y + 4}
                    >
                      {formatNumber(tick)}
                    </text>
                  </g>
                );
              })}

            {!showGridLines && (
              <line
                className={styles.gridLine}
                x1={PLOT_LEFT}
                y1={PLOT_TOP + PLOT_HEIGHT}
                x2={CHART_WIDTH - PLOT_RIGHT}
                y2={PLOT_TOP + PLOT_HEIGHT}
              />
            )}

            {data.map((item, index) => (
              <text
                key={`${item.label}-${index}`}
                className={`${styles.axisLabel} ${styles.xAxisLabel}`}
                x={xPositions[index]}
                y={CHART_HEIGHT - 20}
              >
                {item.label}
              </text>
            ))}

            {hasValidValues &&
              series.map((values, seriesIndex) => {
                const seriesStyle =
                  SERIES_STYLES[seriesIndex % SERIES_STYLES.length];
                const lineStyle = LINE_STYLES[seriesIndex % LINE_STYLES.length];

                const segments = buildLineSegments(values, xPositions, getY);

                return (
                  <g key={`series-${seriesIndex}`} className={seriesStyle}>
                    {segments.map((segment, segmentIndex) => (
                      <path
                        key={`segment-${segmentIndex}`}
                        className={`${styles.line} ${lineStyle}`}
                        d={segment}
                      />
                    ))}

                    {values.map((value, index) =>
                      value === null ? null : (
                        <circle
                          key={`point-${index}`}
                          className={styles.marker}
                          cx={xPositions[index]}
                          cy={getY(value)}
                          r={4}
                        />
                      ),
                    )}
                  </g>
                );
              })}
          </svg>
        </div>
      </div>

      {!hasValidValues && (
        <p role="status">No valid numerical data to display.</p>
      )}

      <table className={styles.visuallyHidden}>
        <caption>{tableCaption}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            {hasDatasets ? (
              datasets!.map((dataset, index) => (
                <th key={`${dataset.label}-${index}`} scope="col">
                  {dataset.label}
                  {valueLabel ? ` (${valueLabel})` : ''}
                </th>
              ))
            ) : (
              <th scope="col">
                {valueLabel ? `Value (${valueLabel})` : 'Value'}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.label}-${index}`}>
              <th scope="row">{item.label}</th>
              {hasDatasets ? (
                datasets!.map((dataset, datasetIndex) => {
                  const value = dataset.values[index];

                  return (
                    <td key={`${dataset.label}-${datasetIndex}`}>
                      {Number.isFinite(value) ? formatNumber(value) : '—'}
                    </td>
                  );
                })
              ) : (
                <td>
                  {Number.isFinite(item.value) ? formatNumber(item.value) : '—'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};
