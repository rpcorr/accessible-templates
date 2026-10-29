import styles from './DonutChart.module.css';

export interface DonutChartData {
  label: string;
  value: number;
}

export interface DonutChartProps {
  title: string;
  data: DonutChartData[];
  description?: string;
  className?: string;
  exploded?: boolean;
}

const colors = [
  'var(--color-primary, #2563eb)',
  'var(--color-series-2, #0f766e)',
  'var(--color-series-3, #9333ea)',
  'var(--color-series-4, #c2410c)',
  'var(--color-series-5, #ca8a04)',
  'var(--color-series-6, #db2777)',
];

const CENTER = 100;
const RADIUS = 78;
const INNER_RADIUS = 44;
const EXPLODE_DISTANCE = 1;
const GAP_ANGLE = 1.5;

function getPoint(angle: number, radius: number, offsetX = 0, offsetY = 0) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: CENTER + Math.cos(radians) * radius + offsetX,
    y: CENTER + Math.sin(radians) * radius + offsetY,
  };
}

function createSlicePath(
  startAngle: number,
  endAngle: number,
  offsetX: number,
  offsetY: number,
) {
  const overlap = 0.35;
  const adjustedStartAngle = startAngle - overlap;
  const adjustedEndAngle = endAngle + overlap;

  const outerStart = getPoint(adjustedStartAngle, RADIUS, offsetX, offsetY);
  const outerEnd = getPoint(adjustedEndAngle, RADIUS, offsetX, offsetY);
  const innerEnd = getPoint(adjustedEndAngle, INNER_RADIUS, offsetX, offsetY);
  const innerStart = getPoint(
    adjustedStartAngle,
    INNER_RADIUS,
    offsetX,
    offsetY,
  );

  const largeArc = adjustedEndAngle - adjustedStartAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export function DonutChart({
  title,
  data,
  description,
  className,
  exploded = false,
}: DonutChartProps) {
  const chartData = data.filter(
    (item) => Number.isFinite(item.value) && item.value > 0,
  );

  const maxValue = chartData.reduce(
    (maximum, item) => Math.max(maximum, item.value),
    0,
  );

  const normalizedValues = chartData.map((item) => item.value / maxValue);

  const total = normalizedValues.reduce((sum, value) => sum + value, 0);

  const slices = chartData.map((item, index) => {
    const normalizedValue = normalizedValues[index];
    const percentage = (normalizedValue / total) * 100;
    const angle = (normalizedValue / total) * 360;

    const precedingTotal = normalizedValues
      .slice(0, index)
      .reduce((sum, value) => sum + value, 0);

    const startAngle = -90 + (precedingTotal / total) * 360;

    const middleAngle = startAngle + angle / 2;
    const gap = exploded && angle >= GAP_ANGLE * 2 ? GAP_ANGLE : 0;

    const sliceStartAngle = startAngle + gap;
    const sliceEndAngle = startAngle + angle - gap;

    const offset = exploded ? EXPLODE_DISTANCE : 0;
    const radians = (middleAngle * Math.PI) / 180;
    const offsetX = Math.cos(radians) * offset;
    const offsetY = Math.sin(radians) * offset;

    return {
      ...item,
      percentage,
      color: colors[index % colors.length],
      path:
        angle < 360
          ? createSlicePath(sliceStartAngle, sliceEndAngle, offsetX, offsetY)
          : '',
      fullCircle: angle >= 360,
      offsetX,
      offsetY,
    };
  });

  const hasPositiveValues = slices.length > 0;

  const containerClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  const accessibleLabel = hasPositiveValues
    ? 'Donut chart. Category values are listed in the legend following the chart.'
    : 'Donut chart.';

  return (
    <figure className={containerClassName}>
      <figcaption className={styles.caption}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </figcaption>

      <div className={styles.chartLayout}>
        <svg
          className={styles.donut}
          viewBox="0 0 200 200"
          shapeRendering="geometricPrecision"
          role="img"
          aria-label={accessibleLabel}
        >
          {hasPositiveValues ? (
            <>
              {slices.map((slice, index) =>
                slice.fullCircle ? (
                  <circle
                    key={`${slice.label}-${index}`}
                    cx={CENTER + slice.offsetX}
                    cy={CENTER + slice.offsetY}
                    r={RADIUS}
                    fill={slice.color}
                    stroke={
                      exploded ? 'var(--color-background, #ffffff)' : 'none'
                    }
                    strokeWidth={exploded ? 1.5 : 0}
                  />
                ) : (
                  <path
                    key={`${slice.label}-${index}`}
                    d={slice.path}
                    fill={slice.color}
                    stroke={
                      exploded ? 'var(--color-background, #ffffff)' : 'none'
                    }
                    strokeWidth={exploded ? 1.5 : 0}
                    strokeLinejoin="round"
                  />
                ),
              )}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={INNER_RADIUS}
                fill="var(--color-background, #ffffff)"
                stroke="none"
              />
            </>
          ) : (
            <>
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="var(--color-surface, #f5f5f5)"
                stroke="var(--color-border, #d1d5db)"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={INNER_RADIUS}
                fill="var(--color-background, #ffffff)"
                stroke="none"
              />
            </>
          )}
        </svg>

        {!hasPositiveValues ? (
          <p role="status">No positive values to display.</p>
        ) : (
          <ul
            className={styles.legend}
            role="list"
            aria-label="Chart categories"
          >
            {slices.map((slice, index) => (
              <li key={`${slice.label}-${index}`} className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{ backgroundColor: slice.color }}
                  aria-hidden="true"
                />
                <span className={styles.legendLabel}>{slice.label}</span>
                <span className={styles.legendValue}>
                  {slice.value} ({slice.percentage.toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
}
