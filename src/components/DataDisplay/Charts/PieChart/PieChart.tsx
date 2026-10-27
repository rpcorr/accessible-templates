import styles from './PieChart.module.css';

export interface PieChartData {
  label: string;
  value: number;
}

export interface PieChartProps {
  title: string;
  data: PieChartData[];
  description?: string;
  valueLabel?: string;
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
const EXPLODE_DISTANCE = 1; // controls white space between slices
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

  const start = getPoint(adjustedStartAngle, RADIUS, offsetX, offsetY);
  const end = getPoint(adjustedEndAngle, RADIUS, offsetX, offsetY);

  const largeArc = adjustedEndAngle - adjustedStartAngle > 180 ? 1 : 0;

  return [
    `M ${CENTER + offsetX} ${CENTER + offsetY}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export function PieChart({
  title,
  data,
  description,
  valueLabel = 'Value',
  className,
  exploded = false,
}: PieChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    value: Number.isFinite(item.value) && item.value > 0 ? item.value : 0,
  }));

  const maxValue = Math.max(0, ...chartData.map((item) => item.value));

  const normalizedValues = chartData.map((item) =>
    maxValue > 0 ? item.value / maxValue : 0,
  );

  const total = normalizedValues.reduce((sum, value) => sum + value, 0);

  const slices = chartData.map((item, index) => {
    const normalizedValue = normalizedValues[index];
    const percentage = total > 0 ? (normalizedValue / total) * 100 : 0;
    const angle = total > 0 ? (normalizedValue / total) * 360 : 0;

    const startAngle =
      -90 +
      (total > 0
        ? (normalizedValues
            .slice(0, index)
            .reduce((sum, value) => sum + value, 0) /
            total) *
          360
        : 0);

    const middleAngle = startAngle + angle / 2;
    const gap = exploded && angle >= GAP_ANGLE * 2 ? GAP_ANGLE : 0;
    const sliceStartAngle = startAngle + gap;
    const sliceEndAngle = startAngle + angle - gap;

    const offset = exploded && item.value > 0 ? EXPLODE_DISTANCE : 0;
    const radians = (middleAngle * Math.PI) / 180;
    const offsetX = Math.cos(radians) * offset;
    const offsetY = Math.sin(radians) * offset;

    return {
      ...item,
      percentage,
      color: colors[index % colors.length],
      path:
        item.value > 0 && angle < 360
          ? createSlicePath(sliceStartAngle, sliceEndAngle, offsetX, offsetY)
          : '',
      fullCircle: item.value > 0 && angle >= 360,
      offsetX,
      offsetY,
    };
  });

  const containerClassName = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={containerClassName}>
      <figcaption className={styles.caption}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </figcaption>

      <div className={styles.chartLayout}>
        <svg
          className={styles.pie}
          viewBox="0 0 200 200"
          shapeRendering="geometricPrecision"
          role="img"
          aria-label={
            total > 0
              ? [
                  title,
                  description,
                  slices
                    .filter((slice) => slice.value > 0)
                    .map(
                      (slice) =>
                        `${slice.label}: ${slice.value}, ${slice.percentage.toFixed(1)}%`,
                    )
                    .join('; '),
                ]
                  .filter(Boolean)
                  .join('. ')
              : [title, description, 'No positive values to display.']
                  .filter(Boolean)
                  .join('. ')
          }
        >
          {total > 0 ? (
            <>
              {/* Base circle helps mask faint gaps between slices. */}
              {!exploded && (
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill={
                    slices.find((slice) => slice.value > 0)?.color ?? '#ffffff'
                  }
                />
              )}

              {slices.map((slice, index) =>
                slice.value <= 0 ? null : slice.fullCircle ? (
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
            </>
          ) : (
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="var(--color-surface, #f5f5f5)"
              stroke="var(--color-border, #d1d5db)"
            />
          )}
        </svg>

        <ul className={styles.legend} role="list" aria-label="Chart categories">
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
      </div>

      <table className={styles.dataTable}>
        <caption>{title} data</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">{valueLabel}</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {slices.map((slice, index) => (
            <tr key={`${slice.label}-${index}`}>
              <th scope="row">{slice.label}</th>
              <td>{slice.value}</td>
              <td>{slice.percentage.toFixed(1)}%</td>
            </tr>
          ))}
          {slices.length === 0 && (
            <tr>
              <td colSpan={3}>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </figure>
  );
}
