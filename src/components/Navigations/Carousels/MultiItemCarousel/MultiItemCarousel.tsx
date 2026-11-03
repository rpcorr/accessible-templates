import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './MultiItemCarousel.module.css';
export type MultiItemCarouselItem = {
  id: string;
  label?: string;
  announcement?: string;
  content: React.ReactNode;
};
export type MultiItemCarouselVariant = 'default' | 'coverflow';
export type MultiItemCarouselProps = {
  items: MultiItemCarouselItem[];
  label: string;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  scrollMode?: 'item' | 'page';
  initialIndex?: number;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  showControls?: boolean;
  showIndicators?: boolean;
  showSideArrows?: boolean;
  loop?: boolean;
  className?: string;
  variant?: MultiItemCarouselVariant;
};
const BREAKPOINT_TABLET = '(min-width: 40rem)';
const BREAKPOINT_DESKTOP = '(min-width: 64rem)';
function normalizeCount(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(1, Math.floor(value));
}
function clampIndex(index: number, maxIndex: number) {
  if (!Number.isFinite(index)) {
    return 0;
  }
  return Math.min(Math.max(Math.floor(index), 0), maxIndex);
}
export function MultiItemCarousel({
  items,
  label,
  itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  scrollMode = 'item',
  initialIndex = 0,
  activeIndex,
  onIndexChange,
  showControls = true,
  showIndicators = true,
  showSideArrows = false,
  loop = false,
  className,
  variant = 'default',
}: MultiItemCarouselProps) {
  const carouselId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(() =>
    clampIndex(initialIndex, Math.max(0, items.length - 1)),
  );

  const [visibleCount, setVisibleCount] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [itemStep, setItemStep] = useState(0);
  const mobileCount = normalizeCount(itemsPerView.mobile, 1);
  const tabletCount = normalizeCount(itemsPerView.tablet, 2);
  const desktopCount = normalizeCount(itemsPerView.desktop, 3);
  const isControlled = activeIndex !== undefined;
  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);
  const requestedIndex = isControlled ? activeIndex : internalIndex;
  const currentIndex = clampIndex(requestedIndex, maxIndex);
  // const activeItem = items[currentIndex];

  // const announcement = activeItem
  //   ? `Slide ${currentIndex + 1} of ${totalItems}${
  //       activeItem.label ? `: ${activeItem.label}` : ''
  //     }`
  //   : '';

  const activeItem = items[currentIndex];

  const announcement = activeItem
    ? [
        `Slide ${currentIndex + 1} of ${totalItems}`,
        activeItem.label,
        activeItem.announcement,
      ]
        .filter(Boolean)
        .join('. ')
    : '';

  const pageSize = visibleCount;
  const getNextIndex = useCallback(
    (direction: -1 | 1) => {
      if (totalItems <= visibleCount) {
        return currentIndex;
      }
      if (scrollMode === 'item') {
        if (direction === 1) {
          if (currentIndex >= maxIndex) {
            return loop ? 0 : maxIndex;
          }
          return currentIndex + 1;
        }
        if (currentIndex <= 0) {
          return loop ? maxIndex : 0;
        }
        return currentIndex - 1;
      }
      // Build the valid page starting positions, including the
      // final partial page when the item count doesn't divide evenly.
      const positions: number[] = [];
      for (let index = 0; index <= maxIndex; index += pageSize) {
        positions.push(index);
      }
      if (positions[positions.length - 1] !== maxIndex) {
        positions.push(maxIndex);
      }
      if (direction === 1) {
        const nextPosition = positions.find(
          (position) => position > currentIndex,
        );
        if (nextPosition !== undefined) {
          return nextPosition;
        }
        return loop ? positions[0] : maxIndex;
      }
      const previousPositions = positions.filter(
        (position) => position < currentIndex,
      );
      if (previousPositions.length > 0) {
        return previousPositions[previousPositions.length - 1];
      }
      return loop ? positions[positions.length - 1] : 0;
    },
    [
      currentIndex,
      loop,
      maxIndex,
      pageSize,
      scrollMode,
      totalItems,
      visibleCount,
    ],
  );
  const goToIndex = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index, maxIndex);
      if (nextIndex === currentIndex) {
        return;
      }
      if (!isControlled) {
        setInternalIndex(nextIndex);
      }
      onIndexChange?.(nextIndex);
    },
    [currentIndex, isControlled, maxIndex, onIndexChange],
  );

  // useEffect(() => {
  //   // Record the initial index without announcing on first render.
  //   if (previousIndexRef.current === null) {
  //     previousIndexRef.current = currentIndex;
  //     return;
  //   }

  //   // Only announce when the active slide changes.
  //   if (previousIndexRef.current === currentIndex) {
  //     return;
  //   }

  //   previousIndexRef.current = currentIndex;

  //   const activeItem = items[currentIndex];

  //   if (!activeItem) {
  //     setAnnouncement('');
  //     return;
  //   }

  //   setAnnouncement(
  //     `Slide ${currentIndex + 1} of ${totalItems}${
  //       activeItem.label ? `: ${activeItem.label}` : ''
  //     }`,
  //   );
  // }, [currentIndex, items, totalItems]);

  useEffect(() => {
    const tabletQuery = window.matchMedia(BREAKPOINT_TABLET);
    const desktopQuery = window.matchMedia(BREAKPOINT_DESKTOP);
    const updateVisibleCount = () => {
      if (variant === 'coverflow') {
        setVisibleCount(1);
        return;
      }
      const nextCount = desktopQuery.matches
        ? desktopCount
        : tabletQuery.matches
          ? tabletCount
          : mobileCount;
      setVisibleCount(Math.min(nextCount, Math.max(totalItems, 1)));
    };
    updateVisibleCount();
    tabletQuery.addEventListener('change', updateVisibleCount);
    desktopQuery.addEventListener('change', updateVisibleCount);
    return () => {
      tabletQuery.removeEventListener('change', updateVisibleCount);
      desktopQuery.removeEventListener('change', updateVisibleCount);
    };
  }, [desktopCount, mobileCount, tabletCount, totalItems, variant]);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const firstItem = track.firstElementChild as HTMLElement | null;
    if (!firstItem) {
      setItemStep(0);
      return;
    }
    const trackStyles = window.getComputedStyle(track);
    const gap = Number.parseFloat(trackStyles.columnGap) || 0;
    setItemStep(firstItem.getBoundingClientRect().width + gap);
  }, [viewportWidth, visibleCount, totalItems]);
  const snapPositions: number[] = [];
  if (totalItems > visibleCount) {
    if (scrollMode === 'item') {
      for (let index = 0; index <= maxIndex; index += 1) {
        snapPositions.push(index);
      }
    } else {
      for (let index = 0; index <= maxIndex; index += pageSize) {
        snapPositions.push(index);
      }
      if (snapPositions[snapPositions.length - 1] !== maxIndex) {
        snapPositions.push(maxIndex);
      }
    }
  }
  const previousIndex = getNextIndex(-1);
  const nextIndex = getNextIndex(1);
  const translateX = currentIndex * itemStep;
  const getCoverflowDistance = (index: number) => {
    const distance = index - currentIndex;
    if (!loop || totalItems < 2) {
      return distance;
    }
    const halfCount = Math.floor(totalItems / 2);
    if (distance > halfCount) {
      return distance - totalItems;
    }
    if (distance < -halfCount) {
      return distance + totalItems;
    }
    return distance;
  };
  return (
    <section
      className={`${styles.carousel}${className ? ` ${className}` : ''}`}
      data-variant={variant}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      style={
        {
          '--items-visible': visibleCount,
          '--track-offset': `${translateX}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.srOnly} role="status" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.carouselStage}>
        {showSideArrows && totalItems > visibleCount && (
          <button
            type="button"
            className={`${styles.control} ${styles.sideArrow} ${styles.previousArrow}`}
            onClick={() => goToIndex(previousIndex)}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.track} ref={trackRef}>
            {items.map((item, index) => {
              const isActive = index === currentIndex;
              const distance =
                variant === 'coverflow'
                  ? getCoverflowDistance(index)
                  : index - currentIndex;
              const isVisible =
                variant === 'coverflow'
                  ? Math.abs(distance) <= 2
                  : index >= currentIndex &&
                    index < currentIndex + visibleCount;
              return (
                <div
                  key={item.id}
                  id={`${carouselId}-item-${index}`}
                  className={styles.item}
                  data-active={isActive}
                  data-distance={distance}
                  style={
                    variant === 'coverflow'
                      ? ({
                          '--coverflow-distance': distance,
                          '--coverflow-offset': `${distance * 78}%`,
                          '--coverflow-rotation': `${-Math.sign(distance) * 18}deg`,
                          '--coverflow-scale': Math.max(
                            0.5,
                            1 - Math.abs(distance) * 0.25,
                          ),
                        } as React.CSSProperties)
                      : undefined
                  }
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${totalItems}${
                    item.label ? `: ${item.label}` : ''
                  }`}
                  aria-hidden={!isVisible}
                  inert={!isVisible}
                >
                  {item.content}
                </div>
              );
            })}
          </div>
        </div>
        {showSideArrows && totalItems > visibleCount && (
          <button
            type="button"
            className={`${styles.control} ${styles.sideArrow} ${styles.nextArrow}`}
            onClick={() => goToIndex(nextIndex)}
            disabled={!loop && currentIndex >= maxIndex}
            aria-label="Next slide"
          >
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>
      {totalItems > visibleCount && (
        <div className={styles.navigation}>
          {showControls && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.control}
                onClick={() => goToIndex(previousIndex)}
                disabled={!loop && currentIndex === 0}
                aria-label="Previous items"
              >
                Previous
              </button>
              <button
                type="button"
                className={styles.control}
                onClick={() => goToIndex(nextIndex)}
                disabled={!loop && currentIndex >= maxIndex}
                aria-label="Next items"
              >
                Next
              </button>
            </div>
          )}
          {showIndicators && snapPositions.length > 1 && (
            <div
              className={styles.indicators}
              role="group"
              aria-label="Choose carousel position"
            >
              {snapPositions.map((position, indicatorIndex) => (
                <button
                  key={position}
                  type="button"
                  className={styles.indicator}
                  onClick={() => goToIndex(position)}
                  aria-label={`Go to position ${indicatorIndex + 1} of ${snapPositions.length}`}
                  aria-controls={`${carouselId}-item-${position}`}
                  aria-current={position === currentIndex ? 'true' : undefined}
                >
                  <span className={styles.indicatorDot} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
