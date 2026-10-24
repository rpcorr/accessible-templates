import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Statistic.module.css';

export interface StatisticProps {
  label: string;
  value: ReactNode;
  description?: string;
  className?: string;
  animate?: boolean;
  duration?: number;
}

const Statistic = ({
  label,
  value,
  description,
  className,
  animate = false,
  duration = 1000,
}: StatisticProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedValue, setAnimatedValue] = useState<number | null>(null);
  const [animationTarget, setAnimationTarget] = useState<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const lastTargetRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);
  const currentAnimatedValueRef = useRef<number | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const canAnimate =
    animate && typeof value === 'number' && Number.isFinite(value);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);

      if (event.matches) {
        // Stop showing an intermediate animation value.
        currentAnimatedValueRef.current = null;
        setAnimatedValue(null);
        setAnimationTarget(null);
        hasAnimatedRef.current = false;
      }
    };

    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      motionPreference.removeEventListener(
        'change',
        handleMotionPreferenceChange,
      );
    };
  }, []);

  useEffect(() => {
    if (!canAnimate || !containerRef.current) {
      return;
    }

    const element = containerRef.current;
    const target = value as number;
    const animationDuration = Math.max(0, duration);

    if (lastTargetRef.current !== target) {
      lastTargetRef.current = target;
      hasAnimatedRef.current = false;
    }

    if (prefersReducedMotion || animationDuration === 0) {
      hasAnimatedRef.current = true;
      return;
    }

    if (hasAnimatedRef.current) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (cancelled) {
          return;
        }

        isVisibleRef.current = entry.isIntersecting;

        if (!isVisibleRef.current || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        const startValue = currentAnimatedValueRef.current ?? 0;

        setAnimationTarget(target);
        currentAnimatedValueRef.current = startValue;
        setAnimatedValue(startValue);

        const animateFrame = (timestamp: number) => {
          if (cancelled) {
            return;
          }

          if (startTime === null) {
            startTime = timestamp;
          }

          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          // Ease out so the count slows as it approaches the target.
          const easedProgress = 1 - (1 - progress) ** 3;

          if (progress < 1) {
            const nextValue =
              startValue + (target - startValue) * easedProgress;

            currentAnimatedValueRef.current = nextValue;
            setAnimatedValue(nextValue);
            frameId = window.requestAnimationFrame(animateFrame);
          } else {
            currentAnimatedValueRef.current = target;
            setAnimatedValue(target);
          }
        };

        //observer.unobserve(element);
        frameId = window.requestAnimationFrame(animateFrame);
      },
      { threshold: 0.25 },
    );

    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [canAnimate, value, duration, prefersReducedMotion]);

  const classNames = [styles.statistic, className].filter(Boolean).join(' ');

  const decimalPlaces =
    typeof value === 'number' && Number.isFinite(value)
      ? (String(value).split('.')[1]?.length ?? 0)
      : 0;

  const formattedAnimatedValue =
    animatedValue === null
      ? null
      : new Intl.NumberFormat(undefined, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(animatedValue);

  const isAnimating =
    canAnimate && animatedValue !== null && animationTarget === value;

  return (
    <div ref={containerRef} className={classNames}>
      <p className={styles.label}>{label}</p>

      <p className={styles.value}>
        {isAnimating ? (
          <>
            <span aria-hidden="true">{formattedAnimatedValue}</span>
            <span className={styles.srOnly}>{value}</span>
          </>
        ) : (
          value
        )}
      </p>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default Statistic;
