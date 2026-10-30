import { useId } from 'react';
import styles from './AreaChart.module.css';

export interface AreaChartData {
  label: string;
  value: number;
}

export interface AreaChartDataset {
  /**
   * Label identifying this data series, such as a year.
   */
  label: string;

  /**
   * Numerical values corresponding to the categories in data.
   */
  values: number[];
}

export interface AreaChartProps {
  /**
   * Accessible title for the chart.
   */
  title: string;

  /**
   * Category labels and values for a single-series chart.
   */
  data: AreaChartData[];

  /**
   * Optional datasets for comparing multiple areas.
   * Each value corresponds to the category at the same index in data.
   */
  datasets?: AreaChartDataset[];

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
   * Defaults to true for area charts.
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

const AREA_STYLES = [
  styles.area1,
  styles.area2,
  styles.area3,
  styles.area4,
  styles.area5,
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
  data: AreaChartData[],
  datasets?: AreaChartDataset[],
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

/**
 * Builds separate filled SVG paths for contiguous valid data points.
 * Invalid values break the area instead of connecting across missing data.
 */
const buildAreaSegments = (
  values: (number | null)[],
  xPositions: number[],
  getY: (value: number) => number,
  baselineY: number,
): string[] => {
  const segments: string[] = [];
  let currentSegment: { index: number; value: number }[] = [];

  const finishSegment = () => {
    if (currentSegment.length === 0) return;

    const firstIndex = currentSegment[0].index;
    const lastIndex = currentSegment[currentSegment.length - 1].index;

    const areaPath = [
      `M ${xPositions[firstIndex]} ${baselineY}`,
      ...currentSegment.map(
        ({ index, value }) => `L ${xPositions[index]} ${getY(value)}`,
      ),
      `L ${xPositions[lastIndex]} ${baselineY}`,
      'Z',
    ].join(' ');

    segments.push(areaPath);
    currentSegment = [];
  };

  values.forEach((value, index) => {
    if (value === null) {
      finishSegment();
      return;
    }

    currentSegment.push({ index, value });
  });

  finishSegment();

  return segments;
};

export const AreaChart = ({
  title,
  data,
  datasets,
  description,
  valueLabel,
  showGridLines = false,
  className,
}: AreaChartProps) => {
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

  // Include zero so the filled areas have a consistent baseline.
  const rawMin = hasValidValues ? Math.min(0, ...allValues) : 0;
  const rawMax = hasValidValues ? Math.max(0, ...allValues) : 1;

  const range = rawMax - rawMin || 1;
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

  const baselineY = getY(0);

  const accessibleLabel = hasValidValues
    ? 'Area chart. Category labels and numerical values are available in the accompanying data table.'
    : 'Area chart. No valid numerical data is available.';

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

            {description && <desc>{description}</desc>}

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
                y1={baselineY}
                x2={CHART_WIDTH - PLOT_RIGHT}
                y2={baselineY}
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

                const areaStyle = AREA_STYLES[seriesIndex % AREA_STYLES.length];

                const segments = buildAreaSegments(
                  values,
                  xPositions,
                  getY,
                  baselineY,
                );

                return (
                  <g key={`series-${seriesIndex}`} className={seriesStyle}>
                    {segments.map((segment, segmentIndex) => (
                      <path
                        key={`area-${segmentIndex}`}
                        className={`${styles.area} ${areaStyle}`}
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
