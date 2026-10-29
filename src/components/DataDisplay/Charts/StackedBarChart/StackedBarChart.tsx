import { useId } from 'react';
import styles from './StackedBarChart.module.css';

export interface StackedBarChartData {
  label: string;
  value: number;
}

export interface StackedBarChartDataset {
  label: string;
  values: number[];
}

export interface StackedBarChartProps {
  /** Accessible chart title. */
  title: string;
  /** Category labels and values for the default single-series chart. */
  data: StackedBarChartData[];
  /** Optional datasets to stack for each category. */
  datasets?: StackedBarChartDataset[];
  /** Additional context displayed below the title. */
  description?: string;
  /** Label for the numerical values in the data table. */
  valueLabel?: string;
  /** Whether to display horizontal grid lines. */
  showGridLines?: boolean;
  /** Additional CSS class for the chart container. */
  className?: string;
}

interface NormalizedDataset {
  label: string;
  values: number[];
}

interface StackSegment {
  datasetLabel: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;

const MARGIN = {
  top: 24,
  right: 24,
  bottom: 64,
  left: 64,
};

const PLOT_WIDTH = CHART_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;
const TICK_COUNT = 5;

const DEFAULT_VALUE_LABEL = 'Value';

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : Number(value.toFixed(2)).toString();
}

function getNiceStep(range: number): number {
  if (range <= 0 || !Number.isFinite(range)) {
    return 1;
  }

  const roughStep = range / TICK_COUNT;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;

  if (normalized <= 1) {
    return magnitude;
  }

  if (normalized <= 2) {
    return 2 * magnitude;
  }

  if (normalized <= 5) {
    return 5 * magnitude;
  }

  return 10 * magnitude;
}

function getScale(datasets: NormalizedDataset[], categoryCount: number) {
  let minStack = 0;
  let maxStack = 0;

  for (
    let categoryIndex = 0;
    categoryIndex < categoryCount;
    categoryIndex += 1
  ) {
    let positiveTotal = 0;
    let negativeTotal = 0;

    datasets.forEach((dataset) => {
      const value = dataset.values[categoryIndex] ?? 0;

      if (value >= 0) {
        positiveTotal += value;
      } else {
        negativeTotal += value;
      }
    });

    maxStack = Math.max(maxStack, positiveTotal);
    minStack = Math.min(minStack, negativeTotal);
  }

  if (minStack === 0 && maxStack === 0) {
    maxStack = 1;
  }

  const range = maxStack - minStack;
  const step = getNiceStep(range);
  const min = minStack < 0 ? Math.floor(minStack / step) * step : 0;
  const max = Math.max(step, Math.ceil(maxStack / step) * step);

  return { min, max, step };
}

export function StackedBarChart({
  title,
  data,
  datasets,
  description,
  valueLabel = DEFAULT_VALUE_LABEL,
  showGridLines = true,
  className,
}: StackedBarChartProps) {
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;
  const tableCaptionId = `${generatedId}-table-caption`;

  const categories = Array.isArray(data) ? data : [];

  const normalizedDatasets: NormalizedDataset[] =
    datasets && datasets.length > 0
      ? datasets.map((dataset) => ({
          label: dataset.label,
          values: categories.map((_, index) => {
            const value = dataset.values[index];
            return isFiniteNumber(value) ? value : 0;
          }),
        }))
      : [
          {
            label: valueLabel,
            values: categories.map((item) =>
              isFiniteNumber(item.value) ? item.value : 0,
            ),
          },
        ];

  const hasValidData =
    categories.length > 0 &&
    normalizedDatasets.length > 0 &&
    normalizedDatasets.some((dataset) =>
      dataset.values.some((value) => value !== 0),
    );

  const scale = getScale(normalizedDatasets, categories.length);
  const scaleRange = scale.max - scale.min || 1;

  const yPosition = (value: number) =>
    MARGIN.top + ((scale.max - value) / scaleRange) * PLOT_HEIGHT;

  const tickValues: number[] = [];

  for (
    let value = scale.min;
    value <= scale.max + scale.step * 0.001;
    value += scale.step
  ) {
    tickValues.push(Number(value.toFixed(10)));
  }

  if (!tickValues.includes(0)) {
    tickValues.push(0);
    tickValues.sort((a, b) => a - b);
  }

  const categoryWidth =
    categories.length > 0 ? PLOT_WIDTH / categories.length : PLOT_WIDTH;

  const barWidth = Math.min(56, categoryWidth * 0.62);
  const zeroY = yPosition(0);

  const chartClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <figure
      className={chartClassName}
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

      {normalizedDatasets.length > 1 && (
        <ul className={styles.legend} aria-label="Chart data series">
          {normalizedDatasets.map((dataset, index) => (
            <li className={styles.legendItem} key={dataset.label}>
              <span
                className={styles.legendSwatch}
                data-series-index={index % 6}
                aria-hidden="true"
              />
              <span>{dataset.label}</span>
            </li>
          ))}
        </ul>
      )}

      {!hasValidData && (
        <p className={styles.emptyState} role="status">
          No valid numerical data to display.
        </p>
      )}

      <div className={styles.chartContainer}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-labelledby={`${titleId}-svg-title`}
          aria-describedby={description ? descriptionId : undefined}
          focusable="false"
        >
          <title id={`${titleId}-svg-title`}>
            {hasValidData
              ? `${title}. Stacked bar chart. Category labels and numerical values are available in the accompanying data table.`
              : `${title}. Stacked bar chart. No valid numerical data is available.`}
          </title>

          {showGridLines &&
            hasValidData &&
            tickValues.map((tick) => (
              <line
                key={`grid-${tick}`}
                className={styles.gridLine}
                x1={MARGIN.left}
                y1={yPosition(tick)}
                x2={CHART_WIDTH - MARGIN.right}
                y2={yPosition(tick)}
              />
            ))}

          <line
            className={styles.axis}
            x1={MARGIN.left}
            y1={MARGIN.top}
            x2={MARGIN.left}
            y2={CHART_HEIGHT - MARGIN.bottom}
          />

          <line
            className={styles.axis}
            x1={MARGIN.left}
            y1={zeroY}
            x2={CHART_WIDTH - MARGIN.right}
            y2={zeroY}
          />

          {hasValidData &&
            tickValues.map((tick) => (
              <text
                key={`tick-${tick}`}
                className={styles.axisLabel}
                x={MARGIN.left - 10}
                y={yPosition(tick)}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {formatNumber(tick)}
              </text>
            ))}

          {hasValidData &&
            categories.map((category, categoryIndex) => {
              const centerX =
                MARGIN.left + categoryWidth * (categoryIndex + 0.5);
              let positiveTotal = 0;
              let negativeTotal = 0;

              const segments: StackSegment[] = normalizedDatasets.map(
                (dataset) => {
                  const value = dataset.values[categoryIndex] ?? 0;

                  let startValue: number;
                  let endValue: number;

                  if (value >= 0) {
                    startValue = positiveTotal;
                    positiveTotal += value;
                    endValue = positiveTotal;
                  } else {
                    startValue = negativeTotal;
                    negativeTotal += value;
                    endValue = negativeTotal;
                  }

                  const top = Math.min(
                    yPosition(startValue),
                    yPosition(endValue),
                  );

                  const height = Math.abs(
                    yPosition(startValue) - yPosition(endValue),
                  );

                  return {
                    datasetLabel: dataset.label,
                    value,
                    x: centerX - barWidth / 2,
                    y: top,
                    width: barWidth,
                    height,
                  };
                },
              );

              return (
                <g key={category.label}>
                  {segments.map((segment, datasetIndex) => (
                    <rect
                      key={`${segment.datasetLabel}-${categoryIndex}`}
                      className={styles.barSegment}
                      data-series-index={datasetIndex % 6}
                      x={segment.x}
                      y={segment.y}
                      width={segment.width}
                      height={segment.height}
                    >
                      <title>
                        {`${category.label}, ${segment.datasetLabel}: ${formatNumber(segment.value)}`}
                      </title>
                    </rect>
                  ))}

                  <text
                    className={styles.axisLabel}
                    x={centerX}
                    y={CHART_HEIGHT - MARGIN.bottom + 24}
                    textAnchor="middle"
                  >
                    {category.label}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      <div className={styles.visuallyHidden}>
        <table className={styles.dataTable}>
          <caption id={tableCaptionId}>{title} — chart data</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              {normalizedDatasets.map((dataset) => (
                <th scope="col" key={dataset.label}>
                  {dataset.label}
                </th>
              ))}
              {normalizedDatasets.length > 1 && <th scope="col">Total</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, categoryIndex) => {
              const total = normalizedDatasets.reduce(
                (sum, dataset) => sum + (dataset.values[categoryIndex] ?? 0),
                0,
              );

              return (
                <tr key={`${category.label}-${categoryIndex}`}>
                  <th scope="row">{category.label}</th>
                  {normalizedDatasets.map((dataset) => (
                    <td key={dataset.label}>
                      {formatNumber(dataset.values[categoryIndex] ?? 0)}
                    </td>
                  ))}
                  {normalizedDatasets.length > 1 && (
                    <td>{formatNumber(total)}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default StackedBarChart;
